# HTTPS 与自定义域名

对外提供 **HTTPS** 时有两种常见做法：

1. **`type = "https"` 且内网已是 HTTPS**：frp 按域名转发到本地 HTTPS 服务（frps **不做** TLS 终止）。
2. **内网仅为 HTTP，对外要 HTTPS**：使用 **`https2http` 插件**，在 frps 的 HTTPS 入口终止 TLS，再转发明文到内网 HTTP。

官方说明：[通过自定义域名访问内网的 Web 服务](https://gofrp.org/zh-cn/docs/examples/vhost-http/)（含 HTTPS 与插件提及）、[HTTP & HTTPS 特性](https://gofrp.org/zh-cn/docs/features/http-https/)。

## 方式一：内网已是 HTTPS 服务

**`frps.toml`：**

```toml
bindPort = 7000
vhostHTTPSPort = 443
```

**`frpc.toml`：**

```toml
serverAddr = "x.x.x.x"
serverPort = 7000

[[proxies]]
name = "web-https"
type = "https"
localIP = "127.0.0.1"
localPort = 8443
customDomains = ["www.example.com"]
```

- 内网 `8443` 上须为 **HTTPS** 服务（自签或正式证书均可）。
- 将 `www.example.com` 解析到 `x.x.x.x`，访问 `https://www.example.com`（端口为 `vhostHTTPSPort`）。
- frps 将加密流量转发到 frpc，由本地 HTTPS 服务完成 TLS。

## 方式二：内网 HTTP，对外 HTTPS（https2http 插件）

适合内网只有 `http://127.0.0.1:80`，希望用户通过 `https://www.example.com` 访问。

**`frps.toml`：**

```toml
bindPort = 7000
vhostHTTPSPort = 443
```

**`frpc.toml`：**

```toml
serverAddr = "x.x.x.x"
serverPort = 7000

[[proxies]]
name = "web-https2http"
type = "https"
customDomains = ["www.example.com"]

[proxies.plugin]
type = "https2http"
localAddr = "127.0.0.1:80"
# 对外 HTTPS 证书（可由 Let's Encrypt 等签发，路径按实际填写）
crtPath = "./server.crt"
keyPath = "./server.key"
hostHeaderRewrite = "127.0.0.1"
```

- 插件在 frpc 侧处理 TLS 与到内网 HTTP 的转发；`crtPath` / `keyPath` 为**对外**域名使用的证书。
- DNS：将 `www.example.com` A 记录指向 frps 公网 IP。
- 公网防火墙放行 **443**（`vhostHTTPSPort`）与 **7000**。

配置结构参考官方仓库 [frpc_full_example.toml · plugin_https2http](https://github.com/fatedier/frp/blob/dev/conf/frpc_full_example.toml)。

## 方式对比

| 方式 | 内网服务 | frps 角色 | 典型场景 |
|------|----------|-----------|----------|
| `type = "https"` | 本地 HTTPS | 按 Host 转发加密流 | 内网已部署 TLS |
| `https2http` 插件 | 本地 HTTP | 经插件在 frpc 终结 TLS | 内网仅 HTTP，对外要 HTTPS |

若需在 **HTTP 入口** 跳转到内网 HTTPS，可使用 `http2https` 插件（见官方完整示例）。

## 注意事项

| 项 | 说明 |
|----|------|
| **证书** | 浏览器信任的证书须与访问域名匹配；自签证书需手动信任 |
| **勿混淆** | `type = "https"` 时本地必须是 HTTPS；内网只有 HTTP 时请用 `https2http` |
| **与 HTTP 代理** | 明文 Web 见 [HTTP / Web 内网服务](http)；`vhostHTTPPort` 与 `vhostHTTPSPort` 可同时配置 |
| **生产安全** | 配置 `auth.token`；敏感站点可叠加 HTTP 基本认证等（见官方 HTTP 特性） |

## 相关阅读

- [概念 · 端口与域名](../concepts/ports-domains)
- [概念 · 认证与安全](../concepts/security)
- [常用配置](../config)
