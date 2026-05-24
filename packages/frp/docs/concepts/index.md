# 概念

理解 frp 的核心术语有助于正确编写配置并排查连通性问题。本章以中文笔记归纳要点，完整说明见 [官方文档 · 概念](https://gofrp.org/zh-cn/docs/concepts/)。

## 本章导航

| 页面 | 内容 |
|------|------|
| [架构与角色](architecture) | frps/frpc 职责、控制通道与数据流、典型拓扑 |
| [代理类型](proxy-types) | TCP/UDP/HTTP/HTTPS/STCP 等类型与选型 |
| [端口与域名](ports-domains) | `bindPort`、`remotePort`、`customDomains`、`subdomain` |
| [认证与安全](security) | `auth.token`、OIDC 择要、控制通道 TLS |

建议先完成 [安装](../setup) 与 [快速开始](../setup/quickstart)，再阅读本章，最后对照 [示例](../examples) 动手配置。

## 核心术语速览

- **frps**：部署在公网侧，接收外部访问并维护与 frpc 的控制连接。
- **frpc**：部署在内网侧，向 frps 注册代理，将流量转发到本地服务。
- **代理（Proxy）**：一条 `[[proxies]]` 配置，对应一个需要暴露的内网服务；以 `name` 区分。
- **控制通道**：frpc 与 frps 之间的长连接（默认 `serverPort` / `bindPort`，常为 7000），用于注册代理与协商；用户业务流量经此隧道或 P2P 转发。

## 下一步

- 需要最小可运行配置时，见 [示例](../examples)。
- 需要字段速查时，见 [常用配置](../config)。
- 连接失败、域名无法访问等问题，见 [FAQ](../faq)。
