# 排错指南

按「控制通道 → 代理注册 → 业务访问」顺序排查，可快速定位多数问题。建议同时将 frps、frpc 的 `log.level` 临时设为 **`debug`**，复现后恢复为 `info`。

## 控制通道无法建立

**现象**：frpc 日志反复重连；frps 无客户端上线；`nc` 测试 `serverPort` 失败。

| 步骤 | 操作 |
|------|------|
| 1 | 确认 frps 已启动：`ss -tlnp \| grep <bindPort>`（默认 7000） |
| 2 | 从内网机器测试：`nc -zv <serverAddr> <serverPort>` |
| 3 | 检查云安全组 / 防火墙是否放行 **入站** `bindPort` |
| 4 | 核对 `serverAddr`（IP 或域名）、`serverPort` 与 `bindPort` 一致 |
| 5 | 核对 `auth.token`（或 OIDC）两端完全一致，无多余空格 |
| 6 | 执行 `frps --version`、`frpc --version`，确认版本在 Release 兼容范围内 |

**日志关键字（措辞因版本而异）**：

- `authorization failed`、`token` mismatch → 鉴权配置错误
- `connection refused` → frps 未监听或端口被拦
- `timeout` → 网络不通或地址错误

参考：[快速开始 · 连通性自检](../setup/quickstart)、[配置 · auth](../config/fields)。

## 代理已注册但无法访问

**现象**：frpc 显示代理已启动；外网访问 `remotePort` 或域名失败。

### TCP / UDP（如 SSH）

| 步骤 | 操作 |
|------|------|
| 1 | 内网验证：`ssh -p 22 127.0.0.1` 或 `nc -zv 127.0.0.1 22` |
| 2 | frps 上确认监听：`ss -tlnp \| grep <remotePort>` |
| 3 | 公网放行 **remotePort**（与安全组规则） |
| 4 | 确认无其它代理占用同一 `remotePort` |
| 5 | 外网测试：`nc -zv <公网IP> <remotePort>` |

见 [示例 · SSH](../examples/ssh)。

### HTTP / HTTPS

| 步骤 | 操作 |
|------|------|
| 1 | 内网：`curl -H "Host: www.example.com" http://127.0.0.1:80` |
| 2 | 确认 `customDomains` / `subdomain` 与浏览器地址栏 **Host** 一致 |
| 3 | 访问 URL 端口是否为 `vhostHTTPPort` / `vhostHTTPSPort`（如 `:8080`） |
| 4 | DNS A 记录是否指向 frps 公网 IP |
| 5 | HTTPS：区分内网 HTTPS 与 `https2http` 插件，见 [HTTPS 示例](../examples/https-domains) |

**日志关键字**：

- `no route found`、`host` → Host 与 `customDomains` 不匹配
- `connection refused`（访问阶段）→ 内网 `localPort` 无进程监听

## 性能与连接不稳定

| 可能原因 | 处理建议 |
|----------|----------|
| 带宽或延迟 | 检查 frps 出口带宽；大流量可考虑 XTCP |
| 连接数过多 | 调整 `transport.maxPoolCount` 等（见官方 Reference） |
| MTU / 丢包 | 检查中间网络；尝试更换 `transport.protocol` |
| 心跳超时 | 勿随意缩短 `heartbeatTimeout`；检查 NAT 会话保持 |

## 配置与进程

| 现象 | 处理 |
|------|------|
| 改了配置无效果 | 确认修改的是 `-c` 指定文件；重启进程 |
| 启动报错 parse | 检查 TOML 语法、引号、表名拼写 |
| 端口 bind 失败 | 端口被占用或无权监听（如 `<1024` 需 root） |

## 日志查看示例

```bash
# 前台运行时直接看终端输出

# 若配置了 log.to
tail -f ./frpc.log

# systemd 部署时
journalctl -u frps -f
```

排错完成后将 `log.level` 改回 `info`，避免磁盘占满。

## 仍无法解决时

1. 用 **最小配置**（仅 `bindPort` + 一条 TCP 代理）复现，排除其它代理干扰。
2. 对照 [官方 FAQ](https://gofrp.org/zh-cn/docs/faq/) 与 [GitHub Issues](https://github.com/fatedier/frp/issues)。
3. 提交 issue 时附上：**版本号**、脱敏后的配置、相关 **debug 日志** 片段。

## 相关阅读

- [FAQ 首页](../faq)
- [常用配置 · 字段](../config/fields)
- [概念 · 认证与安全](../concepts/security)
