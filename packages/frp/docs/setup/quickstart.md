# 快速开始与自检

本节给出推荐的目录布局、配置文件路径约定、最小可运行配置，以及启动后如何确认 frpc 已成功注册、代理端口可访问。配置字段详解见 [常用配置](../config)；完整示例见官方 [示例](https://gofrp.org/zh-cn/docs/examples/)。

## 推荐目录结构

frp **不强制**安装路径，实践中常将同一角色的二进制与配置放在同一目录，便于备份与 systemd 引用：

```text
/usr/local/frp/          # 或 /opt/frp、~/frp 等
├── frps                 # 仅公网服务器需要
├── frpc                 # 仅内网机器需要
├── frps.toml
├── frpc.toml
└── logs/                # 可选：若配置中指定 file 日志
```

Release 压缩包解压后往往已是「二进制 + 示例 toml」同级结构，可直接在该目录启动，或移动到上述路径。

## 配置文件路径

| 说明 | 要点 |
|------|------|
| **无系统默认路径** | 必须通过 `-c` 传入配置文件，例如 `./frps -c ./frps.toml` |
| **相对路径** | 相对于**启动时的工作目录**解析；建议在配置目录下执行命令，或写绝对路径 |
| **推荐文件名** | `frps.toml`、`frpc.toml`（与官方仓库 `conf/` 示例一致） |
| **格式** | 优先 TOML；亦可用 `.yaml` / `.json`，扩展名与格式需一致 |

Windows 在「命令提示符」或 PowerShell 中同样使用 `frps -c frps.toml`、`frpc -c frpc.toml`。

## 最小配置示例

以下示例用于验证「frpc 能连上 frps 且 TCP 代理可访问」，将内网 SSH（22）映射到公网 6000 端口。官方对照：[通过 SSH 访问内网机器](https://gofrp.org/zh-cn/docs/examples/ssh/)。

**公网服务器 `frps.toml`：**

```toml
bindPort = 7000
```

**内网机器 `frpc.toml`：**

```toml
serverAddr = "你的公网IP或域名"
serverPort = 7000

[[proxies]]
name = "ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
remotePort = 6000
```

将 `serverAddr` 改为 frps 所在机器对外可达的地址。若 frps 启用了 `auth`（生产环境建议配置 token），frpc 须配置相同的 `auth.token`，否则无法上线，见 [FAQ](../faq)。

## 首次启动

在**各自机器**的配置目录下执行（先 frps，后 frpc）：

```bash
# 公网服务器
./frps -c ./frps.toml

# 内网机器（另开终端或后台运行）
./frpc -c ./frpc.toml
```

前台运行时，终端会输出日志；需要长期后台运行可结合 [systemd](https://gofrp.org/zh-cn/docs/setup/systemd/)、supervisor 等，官方示例：[使用 systemd](https://gofrp.org/zh-cn/docs/setup/systemd/)。

## 连通性自检

按下列顺序排查，可快速区分「控制通道未建立」与「代理端口不可达」。

### 1. 确认 frps 已监听

在公网服务器上：

```bash
./frps --version
ss -tlnp | grep 7000    # 或 netstat；7000 为 bindPort
```

日志中应出现服务启动、监听 `bindPort` 等信息（具体措辞因版本而异）。

### 2. 确认 frpc 已注册

在内网机器上查看 frpc 日志，应能看到**已成功连接 frps**、代理 `ssh`（或你配置的 `name`）已启动之类的提示。若持续重连，检查：

- `serverAddr` / `serverPort` 是否正确；
- 公网安全组、防火墙是否放行 **7000**（`bindPort`）；
- 双方 `auth` 配置是否一致（若已启用）。

### 3. 确认代理端口对外可访问

在公网服务器上确认 `remotePort` 已监听：

```bash
ss -tlnp | grep 6000
```

从**外网或另一台机器**测试（将 `公网IP` 替换为实际地址）：

```bash
nc -zv 公网IP 6000
# 若映射的是 SSH：
ssh -o Port=6000 用户名@公网IP
```

能连通说明 TCP 代理路径正常；若 frpc 已上线但 `nc` 失败，重点检查公网机是否放行 **6000**（`remotePort`）及云厂商安全组。

### 4. 版本与兼容性

```bash
./frps --version
./frpc --version
```

两端主版本宜一致；若使用较新的 `transport.wireProtocol` 等特性，须两端同时支持，详见对应 [Release 说明](https://github.com/fatedier/frp/releases)。

## 自检结果对照

| 现象 | 可能方向 |
|------|----------|
| frpc 无法连接 frps | 地址/端口、防火墙、`auth`、版本不兼容 |
| frpc 已上线，外网访问 `remotePort` 失败 | 未放行 `remotePort`、本地 `localIP`/`localPort` 错误、目标服务未启动 |
| 连接不稳定 | 网络 MTU、中间设备限流；可查 frps/frpc 日志级别 |

更多排错步骤见 [FAQ](../faq)。验证通过后，可在 [示例](../examples) 中按场景扩展 HTTP、HTTPS 等配置。
