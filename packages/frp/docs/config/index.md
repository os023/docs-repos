# 常用配置

本节汇总 frp **TOML** 配置的整体结构与高频字段，便于查阅与复制片段。完整字段说明以 [官方 Reference](https://gofrp.org/zh-cn/docs/reference/) 为准。

## 本章导航

| 页面 | 内容 |
|------|------|
| [配置结构与字段](fields) | TOML 分层、`frps.toml` / `frpc.toml` 常用项、代理段字段 |

## 格式与文件

| 项目 | 说明 |
|------|------|
| **推荐格式** | TOML（亦支持 YAML、JSON） |
| **典型文件名** | `frps.toml`、`frpc.toml` |
| **加载方式** | `frps -c ./frps.toml`、`frpc -c ./frpc.toml` |
| **INI** | 旧版仍可用，新项目不建议 |

配置文件路径无系统默认值，须通过 `-c` 指定；相对路径相对于**启动时工作目录**。

## 阅读顺序

1. 先完成 [安装](../setup) 与任一 [示例](../examples)（如 [SSH](../examples/ssh)）。
2. 阅读 [配置结构与字段](fields)，对照本机 `frps.toml` / `frpc.toml` 修改。
3. 遇连通性、认证、域名等问题时，见 [FAQ](../faq) 与 [排错指南](../faq/troubleshooting)。

## 官方参考

- [通用配置](https://gofrp.org/zh-cn/docs/reference/common/)
- [服务端配置](https://gofrp.org/zh-cn/docs/reference/server-configures/)
- [客户端配置](https://gofrp.org/zh-cn/docs/reference/client-configures/)
- [代理配置](https://gofrp.org/zh-cn/docs/reference/proxy/)
