# FAQ

本节汇总使用 frp 时的常见问题与排查入口。更细化的日志与步骤见 [排错指南](troubleshooting)；官方页面：[FAQ](https://gofrp.org/zh-cn/docs/faq/)。

## 本章导航

| 页面 | 内容 |
|------|------|
| [排错指南](troubleshooting) | 典型现象、日志关键字、分步排查 |

## 快速问答

### 客户端无法连接 frps？

**常见原因**：`serverAddr` / `serverPort` 错误；公网未放行 `bindPort`；frps 未启动；`auth.token` 不一致；frpc/frps 版本不兼容。

**先做**：`nc -zv <serverAddr> <serverPort>`；将 `log.level` 设为 `debug` 查看两端日志。详见 [排错指南 · 控制通道](troubleshooting#控制通道无法建立)。

### 代理已注册但访问不通？

**常见原因**：内网 `localPort` 无服务；`remotePort` 未放行；HTTP 的域名或端口与 `customDomains` / `vhostHTTPPort` 不匹配。

**先做**：在本机 `curl` 或 `ssh` 直连 `localIP:localPort`；外网测试 `remotePort` 或带 Host 的 HTTP。详见 [排错指南 · 代理不可用](troubleshooting#代理已注册但无法访问)。

### HTTP 域名打不开？

核对 DNS 是否指向 frps、访问 URL 是否包含正确的 `vhostHTTPPort`、浏览器 Host 是否与 `customDomains` 一致。见 [示例 · HTTP](../examples/http)、[概念 · 端口与域名](../concepts/ports-domains)。

### 配置改了不生效？

多数项需**重启** frps/frpc。确认编辑的是 `-c` 指向的文件，且启动目录与相对路径一致。

### 如何开启日志排错？

在对应配置中设置：

```toml
log.level = "debug"
log.to = "./frpc.log"   # 或 frps.log
```

重启后复现问题，再对照 [排错指南](troubleshooting) 中的关键字。

## 延伸阅读

- [常用配置](../config) · [安装 · 快速开始](../setup/quickstart)
- [认证与安全](../concepts/security)
