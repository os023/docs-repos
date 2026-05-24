# 端口与域名

frp 在公网侧暴露服务时，**TCP/UDP** 主要靠端口映射，**HTTP/HTTPS** 则靠端口 + 主机名（域名）路由。本节归纳常用字段，官方特性说明见 [自定义二级域名](https://gofrp.org/zh-cn/docs/features/http-https/subdomain/) 等文档。

## 服务端与客户端端口

| 字段 / 概念 | 所在侧 | 含义 |
|-------------|--------|------|
| **bindPort** | frps | frpc 连接 frps 时使用的端口（控制通道），常见默认 `7000` |
| **serverPort** | frpc | 与 frps 的 `bindPort` 对应，指向公网地址上的控制端口 |
| **remotePort** | frpc（tcp/udp） | frps 在公网监听的端口；用户访问 `公网IP:remotePort` 即进入该代理 |
| **localPort** | frpc | 内网服务端口，如 `22`、`8080` |
| **vhostHTTPPort** | frps | HTTP 虚拟主机入口端口（如 `80` 或 `8080`），按 Host 转发 |
| **vhostHTTPSPort** | frps | HTTPS 虚拟主机入口端口（如 `443`） |

**防火墙**：除放行 `bindPort` 外，每个 TCP/UDP 代理的 **`remotePort`** 也须在公网机与安全组中开放；HTTP/HTTPS 需放行对应的 vhost 端口。

## TCP/UDP 端口映射要点

```toml
# frpc.toml 片段（TCP）
[[proxies]]
name = "ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
remotePort = 6000
```

- 同一 frps 上，不同代理的 **`remotePort` 不可冲突**。
- `remotePort` 可与 `localPort` 不同（上例将公网 `6000` 转到内网 `22`）。
- 若 frps 配置了 `allowPorts` 等限制，frpc 只能使用允许范围内的端口（详见官方 Reference）。

## HTTP：自定义域名 customDomains

在 HTTP/HTTPS 代理中，通过 **`customDomains`** 声明该代理负责的 Host 列表，并将 DNS **A/AAAA 记录** 解析到 frps 公网 IP：

```toml
[[proxies]]
name = "web"
type = "http"
localPort = 80
customDomains = ["www.example.com"]
```

用户访问 `http://www.example.com`（端口为 frps 的 `vhostHTTPPort`）时，frps 按 Host 匹配代理并转发到对应 frpc。

## HTTP：二级域名 subdomain

多人共用一台 frps 时，可在 frps 配置 **`subdomainHost`**，由 frpc 只填 **`subdomain`**，无需每人单独申请完整域名：

```toml
# frps.toml
subdomainHost = "frps.example.com"
```

```toml
# frpc.toml
[[proxies]]
name = "web"
type = "http"
localPort = 80
subdomain = "alice"
```

将泛域名 `*.frps.example.com` 解析到 frps 后，可通过 `http://alice.frps.example.com` 访问。注意：启用 `subdomainHost` 后，`customDomains` 中不宜再使用属于该主机名下的子域或泛域规则，详见 [官方说明](https://gofrp.org/zh-cn/docs/features/http-https/subdomain/)。

同一代理可同时配置 `customDomains` 与 `subdomain`（视版本与场景而定）。

## HTTPS 与证书

- **HTTPS 类型代理**：常用于将 TLS 流量按域名路由到内网；证书可在 frps 或 frpc 侧配置，取决于架构（官方 [HTTPS 示例](https://gofrp.org/zh-cn/docs/examples/)）。
- **仅 HTTP 内网、对外要 HTTPS**：可能结合 frps 终止 TLS、或前置 Nginx/Caddy，具体见 [示例](../examples) 与 [常用配置](../config)。

## 对照小结

| 访问方式 | 典型配置 | 用户访问示例 |
|----------|----------|----------------|
| 公网 IP + 端口 | `type = "tcp"` + `remotePort` | `ssh -p 6000 user@公网IP` |
| 自有完整域名 | `customDomains` | `http://www.example.com` |
| 共享父域名下的子域 | `subdomain` + `subdomainHost` | `http://alice.frps.example.com` |

配置完成后，若域名无法访问，除检查 frpc 是否上线外，还应核对 **DNS 解析、vhost 端口、Host 是否与配置一致**（参见 [FAQ](../faq)）。
