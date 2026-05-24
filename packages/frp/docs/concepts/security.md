# 认证与安全

frp 的安全分两层：**frpc 与 frps 之间的控制通道**（谁可以注册代理），以及**业务流量**（是否加密、是否仅授权用户可连）。生产环境应至少配置控制通道鉴权，并视威胁模型启用 TLS。官方文档：[身份认证](https://gofrp.org/zh-cn/docs/features/common/authentication/)、[TLS 加密](https://gofrp.org/zh-cn/docs/features/common/network/network-tls/)。

## 控制通道身份认证

frpc 连接 frps 时须通过鉴权，否则无法注册代理。默认方式为 **token**；亦支持 **OIDC**。

### Token（推荐入门）

在 frps 与 frpc 中配置**相同**的 `auth.token`：

```toml
# frps.toml
bindPort = 7000

[auth]
token = "请使用足够长的随机字符串"
```

```toml
# frpc.toml
serverAddr = "公网IP"
serverPort = 7000

[auth]
token = "请使用足够长的随机字符串"
```

任一端缺失或不一致时，frpc 无法上线（参见 [FAQ](../faq)）。

**避免明文落盘**：自 v0.64.0 起可使用 `auth.tokenSource` 从文件或外部命令读取 token（`token` 与 `tokenSource` 互斥）。文件权限建议设为 `600`。详见 [官方 · Token](https://gofrp.org/zh-cn/docs/features/common/authentication/)。

### OIDC（择要）

适合已有身份提供商、需集中签发凭据的环境。双方配置 `auth.method = "oidc"` 及 issuer、clientID、clientSecret 等字段，流程为 Client Credentials 类校验。配置示例见 [官方 · OIDC](https://gofrp.org/zh-cn/docs/features/common/authentication/)。

## 控制通道 TLS

自 v0.50.0 起，**`transport.tls.enable` 默认多为 `true`**：frpc 与 frps 之间控制流量常已 TLS 加密。未配置证书时，frps 可能使用临时生成的证书；默认情况下 frpc **加密但不校验** frps 证书。

| 目标 | 配置思路 |
|------|----------|
| 仅加密、快速试用 | 使用默认 TLS 行为即可 |
| frpc 校验 frps 身份 | frps 配置 `transport.tls.certFile` / `keyFile`；frpc 配置 `transport.tls.trustedCaFile` |
| frps 只接受合法 frpc | frps 配置 `transport.tls.trustedCaFile`，并视需要 `transport.tls.force = true` |
| 双向校验 | 双方均配置证书与 CA |

启用全局 TLS 后，除 XTCP 等特例外，一般**不必**再对每个代理单独开启 `useEncryption` 重复加密。证书生成与 SAN 说明见 [官方 · TLS](https://gofrp.org/zh-cn/docs/features/common/network/network-tls/)。

## 业务层安全（择要）

| 机制 | 作用 |
|------|------|
| **STCP / SUDP** | 不在 frps 暴露业务端口；访问方 frpc 需携带密钥连接 |
| **代理级 `secretKey`** | 部分类型用于访客/密钥校验（见官方 STCP 文档） |
| **HTTP 插件鉴权** | 对 Web 代理增加 Basic 等鉴权（见官方 HTTP 特性） |

这些与 `auth.token` **互补**：token 解决「谁能连上 frps 并注册代理」，STCP 等解决「谁能访问某一内网服务」。

## 生产环境检查清单

- [ ] frps、frpc 均已设置强随机 **token**（或 OIDC），且未提交到版本库
- [ ] 公网防火墙仅开放必要端口（`bindPort`、业务 `remotePort`、vhost 端口）
- [ ] 需要防中间人时，配置 **TLS 证书校验**（至少 frpc 校验 frps）
- [ ] 敏感内网服务优先考虑 **STCP** 或网络层 ACL，而非单纯依赖「隐藏端口」

字段速查见 [常用配置](../config)；连通性排错见 [FAQ](../faq)。
