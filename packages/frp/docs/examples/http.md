# HTTP / Web 内网服务

通过 **HTTP** 代理，按域名（`customDomains`）将流量转到内网 Web，多个站点可共用 frps 的 `vhostHTTPPort`，无需为每个站点单独占用一个 `remotePort`。官方对照：[通过自定义域名访问内网的 Web 服务](https://gofrp.org/zh-cn/docs/examples/vhost-http/)。

## 拓扑

```text
浏览器 ──► http://www.example.com:8080 ──► frps:8080 (vhostHTTPPort)
         ──► 按 Host 匹配 ──► frpc ──► 内网 :80
```

## 最小配置

**公网服务器 `frps.toml`：**

```toml
bindPort = 7000
vhostHTTPPort = 8080
```

**内网机器 `frpc.toml`：**

```toml
serverAddr = "x.x.x.x"
serverPort = 7000

[[proxies]]
name = "web"
type = "http"
localIP = "127.0.0.1"
localPort = 80
customDomains = ["www.example.com"]
```

同一 frpc 可配置多个 `[[proxies]]`，分别绑定不同 `customDomains` 与 `localPort`（例如 80 与 8080 两个内网站点）。

## DNS 与访问

1. 将 `www.example.com` 的 **A 记录** 解析到 frps 公网 IP `x.x.x.x`（或使用 CNAME 指向已有域名）。
2. 启动 frps、frpc 后，浏览器访问：

```text
http://www.example.com:8080
```

端口 `8080` 来自 `vhostHTTPPort`；若 frps 使用 80，可改为 `vhostHTTPPort = 80`，访问时省略端口。

也可通过修改请求 **Host** 头在测试阶段指向该域名（无需立即改 DNS），但生产环境仍建议正确解析。

## 使用二级域名（可选）

多人共用 frps 时，可在 frps 设置 `subdomainHost`，frpc 只填 `subdomain`，详见 [概念 · 端口与域名](../concepts/ports-domains) 与官方 [自定义二级域名](https://gofrp.org/zh-cn/docs/features/http-https/subdomain/)。

## 注意事项

| 项 | 说明 |
|----|------|
| **Host 匹配** | 浏览器地址栏域名须与 `customDomains` 一致，否则 frps 无法路由 |
| **防火墙** | 放行 `vhostHTTPPort`（如 8080）及 `bindPort`（7000） |
| **内网服务** | 确认本机 `curl http://127.0.0.1:80` 可访问 |
| **与 TCP 区别** | HTTP 代理按域名复用端口；纯端口映射请用 [SSH 示例](ssh) 的 TCP 方式 |
| **HTTPS** | 本页为明文 HTTP 入口；对外 HTTPS 见 [HTTPS 与自定义域名](https-domains) |

## 相关阅读

- [代理类型 · HTTP](../concepts/proxy-types)
- [常用配置](../config) 中的 HTTP 字段
- [FAQ](../faq)（域名无法访问等）
