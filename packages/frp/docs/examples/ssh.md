# SSH 远程访问

通过 **TCP** 代理将内网 SSH（默认 22）映射到 frps 公网端口，从外网执行 `ssh -p <remotePort> user@公网IP` 即可登录。官方对照：[通过 SSH 访问内网机器](https://gofrp.org/zh-cn/docs/examples/ssh/)。

## 拓扑

```text
用户 ──► 公网 x.x.x.x:6000 ──► frps ──► frpc ──► 127.0.0.1:22 (sshd)
```

## 最小配置

**公网服务器 `frps.toml`：**

```toml
bindPort = 7000
```

**内网机器 `frpc.toml`：**

```toml
serverAddr = "x.x.x.x"
serverPort = 7000

[[proxies]]
name = "ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
remotePort = 6000
```

- `localIP` / `localPort`：内网 SSH 监听地址（本机一般为 `127.0.0.1:22`）。
- `remotePort`：frps 对外监听的端口；访问 `x.x.x.x:6000` 即转发到内网 22。

## 启动与验证

```bash
# 公网
./frps -c ./frps.toml

# 内网
./frpc -c ./frpc.toml
```

确认 frpc 日志显示已连接 frps 后，在**外网机器**执行：

```bash
ssh -o Port=6000 test@x.x.x.x
```

将 `test` 换为内网系统用户名。连通性自检步骤见 [快速开始](../setup/quickstart)。

## 注意事项

| 项 | 说明 |
|----|------|
| **防火墙** | 公网需放行 `7000`（控制通道）与 `6000`（`remotePort`）；内网需能出站访问 frps |
| **端口冲突** | 同一 frps 上各 TCP 代理的 `remotePort` 不可重复 |
| **安全** | SSH 仍依赖密钥/密码；建议 frps/frpc 配置 `auth.token`，并限制 `remotePort` 的访问来源（安全组/防火墙） |
| **非 22 端口** | 若 sshd 监听其它端口，修改 `localPort` 即可 |
| **随机远程端口** | 可设 `remotePort = 0` 由 frps 分配（见官方 [Reference](https://gofrp.org/zh-cn/docs/reference/client-configures/)） |

## 相关阅读

- [代理类型 · TCP](../concepts/proxy-types)
- [端口与域名](../concepts/ports-domains)
- 连接失败时见 [FAQ](../faq)
