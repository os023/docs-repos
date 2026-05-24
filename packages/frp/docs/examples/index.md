# 示例

本节提供常见内网穿透场景的**最小可运行配置**与注意事项，便于对照实验。官方完整示例集：[examples](https://gofrp.org/zh-cn/docs/examples/)。

## 本章导航

| 页面 | 场景 | 代理类型 |
|------|------|----------|
| [SSH 远程访问](ssh) | 将内网 22 映射到公网端口 | TCP |
| [HTTP / Web 内网服务](http) | 自定义域名访问内网 Web | HTTP |
| [HTTPS 与自定义域名](https-domains) | 对外 HTTPS 或 `https2http` 插件 | HTTPS |

## 前置条件

1. 已完成 [安装](../setup) 与 [快速开始](../setup/quickstart)，frpc 能在 frps 上线。
2. 已阅读 [概念](../concepts) 中的 [代理类型](../concepts/proxy-types) 与 [端口与域名](../concepts/ports-domains)。
3. 将下文中的 `x.x.x.x`、域名、端口替换为你的环境；生产环境请配置 [认证与安全](../concepts/security) 中的 `auth.token`。

## 更多场景

STCP、XTCP、DNS 转发等见 [官方示例目录](https://gofrp.org/zh-cn/docs/examples/)。配置字段说明见 [常用配置](../config)。
