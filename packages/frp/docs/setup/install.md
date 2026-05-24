# 获取与安装

frp 使用 Go 编写，官方在各平台提供**预编译二进制**，一般无需安装额外运行时。官方说明：[安装 · 下载与部署](https://gofrp.org/zh-cn/docs/setup/)。

## 系统要求

与当前 Go 版本支持的平台一致（Linux、Windows、macOS 及常见 CPU 架构等）。具体平台列表见 [Go 系统要求](https://go.dev/doc/install/source#environment)。

## 方式一：GitHub Release（推荐）

1. 打开 [fatedier/frp Releases](https://github.com/fatedier/frp/releases)，下载与目标机器 OS/架构匹配的压缩包（例如 `frp_*_linux_amd64.tar.gz`）。
2. 解压后得到 `frps`、`frpc` 可执行文件，以及包内附带的示例配置（通常为 `frps.toml`、`frpc.toml` 或 `conf/` 目录下的同名文件）。
3. 将 **frps** 复制到公网服务器，**frpc** 复制到内网机器；可执行文件放在任意目录，通过 `-c` 指定配置文件即可。

```bash
# 示例：Linux amd64
tar -xzf frp_*_linux_amd64.tar.gz
cd frp_*_linux_amd64
chmod +x frps frpc
./frps --version
./frpc --version
```

**版本提示**：frpc 与 frps 宜使用**相同或相近的小版本**（例如均为 0.69.x）。混版本部署时，建议**先升级 frps，再升级 frpc**；跨多小版本混用可能无法连接，详见各 Release 说明中的兼容性策略。

## 方式二：包管理器（择要）

以下方式便于本机试用，版本可能略滞后于 GitHub Release，生产环境仍建议以 Release 为准。

| 环境 | 常见命令 | 说明 |
|------|----------|------|
| macOS（Homebrew） | `brew install frp` | 安装后 `frps`、`frpc` 通常在 PATH 中 |
| Arch Linux | `sudo pacman -S frp` | 社区仓库提供，安装路径遵循发行版规范 |
| Windows（Scoop 等） | 视第三方 bucket 而定 | 亦可直接解压 Release 中的 `windows_amd64` 包 |

安装完成后执行 `frps --version` / `frpc --version` 确认命令可用。

## 方式三：容器（可选）

可将 Release 中的二进制打入自有镜像，或使用社区维护的 Docker 镜像运行 frps/frpc。容器场景下仍需挂载配置文件（如 `frps.toml`）并映射 `bindPort`、各 `remotePort` 等端口。镜像与编排细节因环境而异，此处不展开；需要时对照官方仓库中的 `dockerfiles` 与 [安装](https://gofrp.org/zh-cn/docs/setup/) 说明。

## 部署检查清单

| 步骤 | frps（公网） | frpc（内网） |
|------|----------------|----------------|
| 二进制就位 | `frps` 可执行 | `frpc` 可执行 |
| 配置文件 | 准备 `frps.toml`（见 [快速开始](quickstart)） | 准备 `frpc.toml`，`serverAddr` 指向公网 IP 或域名 |
| 防火墙 / 安全组 | 放行 `bindPort`（默认 7000）及业务 `remotePort` | 能访问 frps 的 `serverPort`（出站） |
| 版本 | 与 frpc 版本匹配或符合 Release 兼容说明 | 同上 |

完成安装后，继续阅读 [快速开始与自检](quickstart) 编写配置并启动服务。
