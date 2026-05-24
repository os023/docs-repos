# 安装

本节说明 frp 服务端（frps）与客户端（frpc）的获取、部署与首次启动思路。详细步骤与 systemd 等进阶部署将在后续章节补充；官方对照：[安装](https://gofrp.org/zh-cn/docs/setup/)。

## 系统与获取方式

frp 使用 Go 编写，官方在各平台 [Release](https://github.com/fatedier/frp/releases) 提供预编译二进制，一般无需额外运行时依赖。请根据内网机器与公网服务器的操作系统与架构选择对应压缩包。

## 部署角色

| 组件 | 典型部署位置 | 作用 |
|------|----------------|------|
| **frps** | 拥有公网 IP 的服务器 | 接收外部连接，按配置转发到对应客户端 |
| **frpc** | 内网服务所在机器 | 与 frps 建立隧道，将本地端口或 HTTP 服务暴露出去 |

解压后将 `frps` 放到公网节点、`frpc` 放到内网节点即可；二者可放在任意目录，通过 `-c` 指定配置文件路径。

## 配置文件格式

当前推荐使用 **TOML**（亦支持 YAML、JSON）；旧版 INI 仍可用但不建议新项目采用。默认示例文件名常为 `frps.toml` / `frpc.toml`，具体路径以你本机约定为准。

## 首次启动（示意）

```bash
# 公网服务器
./frps -c ./frps.toml

# 内网客户端
./frpc -c ./frpc.toml
```

启动后应能在 frps 日志中看到客户端注册成功，再按代理类型访问对应端口或域名。长期运行可结合 systemd、supervisor 等进程管理工具，见官方 [systemd 示例](https://gofrp.org/zh-cn/docs/setup/systemd/)。
