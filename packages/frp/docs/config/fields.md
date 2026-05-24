# 配置结构与字段

frp 配置按**角色**分为服务端 `frps.toml` 与客户端 `frpc.toml`；客户端中通过 `[[proxies]]` 声明多个代理。仓库内完整示例可参考 [frps_full_example.toml](https://github.com/fatedier/frp/blob/dev/conf/frps_full_example.toml)、[frpc_full_example.toml](https://github.com/fatedier/frp/blob/dev/conf/frpc_full_example.toml)。

## TOML 整体结构

```text
frps.toml                          frpc.toml
├── 全局（监听、鉴权、日志…）          ├── 全局（serverAddr、auth、transport…）
├── vhost / 端口策略等               ├── [[proxies]]  代理 1
└── [[httpPlugins]] 等（可选）       ├── [[proxies]]  代理 2
                                     ├── [[visitors]] （STCP/XTCP 等，可选）
                                     └── [proxies.plugin]（插件，可选）
```

**原则**：

- 全局段键名在 frps / frpc 上**不同**（如 `bindPort` 仅服务端，`serverAddr` 仅客户端）。
- 每个 `[[proxies]]` 必须含 **`name`**（唯一）与 **`type`**。
- 嵌套表使用点号或子表，如 `auth.token`、`log.level`、`transport.tls.enable`。

## frps 常用字段

| 字段 | 含义 | 备注 |
|------|------|------|
| `bindAddr` | 控制通道监听地址 | 默认 `0.0.0.0` |
| `bindPort` | frpc 连接端口 | 常见 `7000`，须与 frpc `serverPort` 一致 |
| `vhostHTTPPort` | HTTP 虚拟主机入口 | 与 [HTTP 示例](../examples/http) 配合 |
| `vhostHTTPSPort` | HTTPS 虚拟主机入口 | 与 [HTTPS 示例](../examples/https-domains) 配合 |
| `subdomainHost` | 二级域名父域 | 如 `frps.example.com`，见 [概念 · 端口与域名](../concepts/ports-domains) |
| `auth.method` | 鉴权方式 | 默认 `token`，可选 `oidc` |
| `auth.token` | 与 frpc 一致的密钥 | 生产环境务必修改 |
| `allowPorts` | 允许 frpc 使用的远程端口范围 | 未配置则通常不限制 |
| `maxPortsPerClient` | 单客户端可用端口数上限 | `0` 表示不限制 |
| `transport.tls.*` | 控制通道 TLS | 见 [概念 · 认证与安全](../concepts/security) |
| `webServer.port` | 管理面板 / Dashboard | 默认常监听 `7500`（若启用） |
| `log.level` | 日志级别 | `trace` / `debug` / `info` / `warn` / `error` |
| `log.to` | 日志输出 | 文件路径或控制台 |

**最小示例：**

```toml
bindPort = 7000

# 生产环境建议启用
auth.token = "请替换为强随机字符串"
```

启用 HTTP 穿透时增加：

```toml
vhostHTTPPort = 8080
```

## frpc 常用字段

| 字段 | 含义 | 备注 |
|------|------|------|
| `serverAddr` | frps 地址 | 公网 IP 或域名 |
| `serverPort` | frps `bindPort` | 常见 `7000` |
| `auth.token` | 与服务端相同 | 不一致则无法上线 |
| `transport.protocol` | 与 frps 通信协议 | `tcp`、`quic`、`websocket` 等 |
| `transport.tls.enable` | 控制通道 TLS | 新版默认多为 `true` |
| `log.level` | 日志级别 | 排错时可临时设为 `debug` |
| `webServer.port` | 本机管理 API | 可选，用于 reload 等 |

**最小示例：**

```toml
serverAddr = "x.x.x.x"
serverPort = 7000

auth.token = "请替换为强随机字符串"
```

## 代理段 `[[proxies]]` 常用字段

| 字段 | 适用类型 | 含义 |
|------|----------|------|
| `name` | 全部 | 代理名，日志与路由标识，不可重复 |
| `type` | 全部 | `tcp`、`udp`、`http`、`https`、`stcp`、`xtcp` 等 |
| `localIP` | 多数 | 内网服务 IP，常 `127.0.0.1` |
| `localPort` | 多数 | 内网服务端口 |
| `remotePort` | tcp / udp | frps 对外监听端口 |
| `customDomains` | http / https | 域名列表，须解析到 frps |
| `subdomain` | http / https | 与 frps `subdomainHost` 组合 |
| `secretKey` | stcp / xtcp 等 | 访客连接密钥（新版字段名，旧版或为 `sk`） |

**TCP 片段：**

```toml
[[proxies]]
name = "ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
remotePort = 6000
```

**HTTP 片段：**

```toml
[[proxies]]
name = "web"
type = "http"
localPort = 80
customDomains = ["www.example.com"]
```

**插件**（如 `https2http`）在同一代理下增加 `[proxies.plugin]`，见 [HTTPS 示例](../examples/https-domains)。

## 配置检查清单

| 检查项 | frps | frpc |
|--------|------|------|
| 端口可达 | `bindPort` 已在防火墙放行 | 能访问 `serverAddr:serverPort` |
| 鉴权一致 | `auth.token` 或 OIDC 配置 | 与 frps 完全相同 |
| 代理有效 | `vhostHTTPPort` 等与代理类型匹配 | `localPort` 上服务已启动 |
| 版本 | 与 frpc 主版本相近 | 混版本见 Release 兼容说明 |

修改配置后通常需**重启** `frps` / `frpc` 进程；是否支持热重载以当前版本官方文档为准。

## 相关阅读

- [概念](../concepts) · [示例](../examples)
- [FAQ · 排错](../faq/troubleshooting)
