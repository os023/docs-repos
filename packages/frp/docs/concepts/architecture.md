# 架构与角色

frp 采用典型的 **C/S（客户端/服务端）** 模型：公网侧运行 **frps**，内网侧运行 **frpc**。官方说明：[概念 · 工作原理](https://gofrp.org/zh-cn/docs/concepts/)。

## frps 与 frpc

| 组件 | 部署位置 | 主要职责 |
|------|----------|----------|
| **frps** | 具有公网 IP 或可被内网访问的机器 | 监听 `bindPort` 接受 frpc 连接；按配置在公网暴露 `remotePort`、HTTP/HTTPS 虚拟主机等 |
| **frpc** | 内网服务所在机器 | 连接 frps，注册一个或多个代理，将访问流量转发到 `localIP:localPort` |

内网服务本身**没有公网 IP**，外部用户不直接访问 frpc，而是访问 frps 上的端口或域名，由 frp 将请求路由到对应 frpc 背后的服务。

## 典型拓扑

```text
                    公网 / 互联网
                          │
                          ▼
              ┌───────────────────────┐
              │  frps（公网服务器）      │
              │  bindPort: 7000        │
              │  remotePort / vhost…   │
              └───────────┬───────────┘
                          │ 控制通道 + 隧道
                          ▼
              ┌───────────────────────┐
              │  frpc（内网机器）        │
              │  localIP:localPort     │
              └───────────┬───────────┘
                          │
                          ▼
                   内网应用（SSH、Web…）
```

**访问路径（以 TCP 代理为例）**：

1. 用户连接 `公网IP:remotePort`。
2. frps 根据已注册的代理规则，经与 frpc 之间的隧道转发。
3. frpc 将连接转到本机 `127.0.0.1:22`（或其它 `localIP:localPort`）。

## 控制通道与业务流量

- **控制通道**：frpc 启动后主动连接 frps 的 `bindPort`（配置中 frpc 侧为 `serverAddr` + `serverPort`），用于登录、心跳、代理注册等。该通道异常时，所有代理会不可用。
- **业务流量**：多数代理类型的用户数据与控制通道复用同一套 frp 隧道；**XTCP** 等类型在协商后可尝试点对点传输，减轻 frps 带宽压力（见 [代理类型](proxy-types)）。

## 多客户端与多代理

- 一台 **frps** 可同时接受多台 **frpc** 连接（需正确配置鉴权，见 [认证与安全](security)）。
- 一台 **frpc** 可在同一配置文件中声明多个 `[[proxies]]`，例如同时暴露 SSH（TCP）与内网 Web（HTTP），彼此以 `name` 区分，不可重复。

## 与安装章节的衔接

部署顺序、配置文件路径与首次自检见 [安装](../setup) 与 [快速开始](../setup/quickstart)。确认控制通道正常后，再按 [代理类型](proxy-types) 选择具体 `type` 并配置端口或域名。
