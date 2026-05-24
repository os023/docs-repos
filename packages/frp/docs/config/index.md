# 常用配置

本节汇总 frp 配置文件的总体结构与高频字段，便于查阅与复制片段。字段级说明以 [官方参考 · 通用/服务端/客户端配置](https://gofrp.org/zh-cn/docs/reference/) 为准；后续章节将补充 TOML 示例与排错对照。

## 配置文件结构（TOML）

典型布局分为三层：

1. **全局段**：`serverAddr`、`serverPort`、`auth`（token 等）、日志、传输层参数。
2. **代理列表**：在 frpc 中以 `[[proxies]]` 声明多个代理，每个代理含 `name`、`type` 及类型相关字段。
3. **插件 / 访问者**：按需增加 `[[visitors]]` 或客户端插件配置。

服务端 `frps.toml` 侧重 `bindPort`、鉴权、子域名 host、端口范围等；客户端 `frpc.toml` 侧重连接目标与本地 `localIP` / `localPort`。

## 常用字段速查（客户端代理）

| 字段 | 含义 |
|------|------|
| `name` | 代理唯一名称，日志与路由标识 |
| `type` | `tcp`、`udp`、`http`、`https` 等 |
| `localIP` / `localPort` | 内网真实服务地址 |
| `remotePort` | （TCP/UDP）在 frps 上监听的端口 |
| `customDomains` | （HTTP/HTTPS）绑定的域名列表 |

## 下一步

- 结合 [示例](../examples) 查看完整片段。
- `auth`、`transport.tls` 等见 [概念 · 认证与安全](../concepts/security)。
- 连接失败、认证错误等问题见 [FAQ](../faq)；典型日志排查将在 FAQ 章节进一步展开。
