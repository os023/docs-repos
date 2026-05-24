# FAQ

本节收集使用 frp 时的常见问题与排查入口。详细问答与版本差异以 [官方 FAQ](https://gofrp.org/zh-cn/docs/faq/) 为准；本仓库将在后续章节补充更完整的中文排错笔记。

## 客户端无法连接 frps

**可能原因**：`serverAddr` / `serverPort` 填写错误；公网防火墙未放行 frps 端口；frps 未启动或监听地址绑定不当；双方 `auth.token` 不一致。

**建议步骤**：在客户端机器用 `telnet` 或 `nc` 测试到 frps 端口的连通性；查看 frps、frpc 日志中的 `login` 与 `authorization failed` 字样；确认配置文件路径与启动命令中的 `-c` 一致。

## 代理已注册但访问不通

**可能原因**：`localPort` 指向的服务未监听；`remotePort` 被占用或与防火墙规则冲突；HTTP 代理的 `customDomains` 与访问 URL 不匹配。

**建议步骤**：在本机直接访问 `localIP:localPort` 验证内网服务正常；检查 frps 安全组/iptables；对 HTTP 类型核对 Host 头与 frps 的 `vhostHTTPPort` 等设置。

## 配置修改不生效

frpc/frps 多数配置需**重启进程**后生效。若使用热重载能力，请以当前版本官方文档为准。修改配置后建议先执行语法检查再重启，并保留一份可回滚的配置副本。

更多现象与日志解读将在「常用配置」与 FAQ 后续小节中补充。
