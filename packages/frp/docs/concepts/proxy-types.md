# 代理类型

在 frp 中，**一个代理对应一个需要对外暴露的内网服务**，在 `frpc.toml` 中用 `[[proxies]]` 声明，通过 `type` 指定协议行为。官方对照：[概念 · 代理类型](https://gofrp.org/zh-cn/docs/concepts/)。

## 类型总览

| 类型 | 适用场景 | 公网侧典型暴露方式 | 备注 |
|------|----------|-------------------|------|
| **tcp** | SSH、数据库、任意 TCP 服务 | frps 上监听 `remotePort` | 最常用，按端口区分服务 |
| **udp** | DNS、游戏、VoIP 等 UDP | frps 上 `remotePort`（UDP） | 与 TCP 类似，协议为 UDP |
| **http** | 内网 Web、需 Host/路径路由 | 域名或 `vhostHTTPPort` + Host | 支持 `customDomains`、`subdomain` |
| **https** | 需按域名路由的 HTTPS 内网服务 | 域名 + frps HTTPS 入口 | 常与 `plugin`、证书配置配合 |
| **stcp** | 仅授权用户可访问的 TCP | **不在** frps 上额外开端口 | 访问方也需运行 frpc |
| **sudp** | 安全的 UDP 内网代理 | 同 STCP，不暴露公网端口 | 访问方也需 frpc |
| **xtcp** | 点对点穿透、减中转带宽 | 经 frps 协商后尝试 P2P | 与 STCP 类似，流量可不经过 frps |
| **tcpmux** | 同一端口多路复用 | 单端口 + HTTP Connect 等 | 适合多服务共用一个入口 |

## 选型建议

**优先用 TCP**，当满足以下任一条件时：

- 只需「公网端口 → 内网端口」映射；
- 协议非 HTTP，或不需要按域名区分。

**选用 HTTP / HTTPS**，当：

- 内网是 Web 服务，且希望通过域名（`customDomains` 或 `subdomain`）访问多个站点；
- 需要修改 Host Header、按路径路由等 HTTP 层能力。

**选用 STCP / SUDP**，当：

- 不希望 frps 为每个服务单独暴露 `remotePort`；
- 愿意在**访问者机器**上也部署 frpc，通过密钥/访客模式连接。

**选用 XTCP**，当：

- 场景类似 STCP，且希望尽量走点对点链路（网络条件允许时）。

## 配置中的共同点

无论 `type` 为何，通常都需要：

- `name`：代理唯一标识；
- `localIP` / `localPort`：内网真实服务地址（部分类型另有专用字段）。

TCP/UDP 类型还需在 frpc 中设置 **`remotePort`**（或由 frps 分配），并在防火墙放行。HTTP/HTTPS 类型则需关注 **域名与 frps 的 `vhostHTTPPort` / `vhostHTTPSPort`**，见 [端口与域名](ports-domains)。

## 示例索引

| 场景 | 建议类型 | 本站章节 |
|------|----------|----------|
| SSH 远程登录 | tcp | [示例 · SSH](../examples)（后续子页） |
| 内网 Web | http | [示例](../examples) |
| 对外 HTTPS | https 或 http + 插件 | [示例](../examples) |

官方示例集：[examples](https://gofrp.org/zh-cn/docs/examples/)。
