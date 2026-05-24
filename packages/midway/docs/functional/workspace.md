# Workspace 与目录约定

本节说明 Midway v4 中与 **函数式入口** 相关的目录与配置名词：`server`、`web`、`apiDir`，以及 **Workspace 多包** 下的常见布局。本库主线为 Koa + v4；Egg（`@midwayjs/web`）与 Serverless 仅作对照，详见 [FAQ](../faq)。

## 名词对照

| 名词 | 含义 | 本库关注点 |
|------|------|------------|
| **server** | 后端运行时侧：Koa 应用、IoC 容器、HTTP 监听 | `configuration.ts`、`imports: [koa]`、端口与生命周期 |
| **web** | 常指 Web 层组件或 **Egg** 栈（`@midwayjs/web`） | 本库以 **`@midwayjs/koa`** 为主线；选用 Egg 时请读官方 Egg 集成文档 |
| **apiDir** | 存放 `defineApi` 文件的目录，启动时扫描注册路由 | 配置项或模板默认值，见下文 |

在 **一体化模板**（react-functional-v4 / vue-functional-v4）中，`server` 侧通常同时包含 `apiDir` 与前端联调脚本；在 **koa-v4** 中可仅保留 `controller` + `service`，按需增加 `apiDir`。

## 单应用典型目录

### koa-v4（OOP 为主，可增函数式）

```text
my-midway-app/
├── src/
│   ├── configuration.ts
│   ├── config/
│   ├── controller/
│   ├── service/
│   └── server/              # 可选：函数式子树
│       └── api/             # apiDir 常指向此处
│           └── home.api.ts
├── package.json
└── tsconfig.json
```

### react-functional-v4 / vue-functional-v4（一体化）

```text
my-fullstack-app/
├── src/
│   ├── configuration.ts
│   ├── config/
│   ├── server/
│   │   └── api/             # defineApi 路由（apiDir）
│   └── …                    # 其它服务端目录视模板而定
├── client/                  # 或模板约定的前端目录
│   └── …
├── package.json
└── tsconfig.json
```

创建项目后请以 **实际生成路径** 为准，并在 `config.default.ts` 中将 `apiDir` 与目录对齐。

## apiDir 配置要点

1. **路径**：使用相对 `src` 或项目根的路径字符串，与模板 README 一致。
2. **扫描时机**：随应用启动注册到 Koa，与 Controller 路由并列；注意路径前缀不要与 `@Controller` 全局前缀冲突。
3. **开发热更新**：一体化模板可能配合 `web-bridge` 做 dev 联调；修改 `defineApi` 后若未生效，可重启 `npm run dev` 并查看官方一体化文档中的热更新说明。

```typescript
// src/config/config.default.ts
import { MidwayConfig } from '@midwayjs/core';

export default {
  koa: {
    port: 7001,
  },
  apiDir: 'src/server/api',
} as MidwayConfig;
```

## server 与 configuration

`src/configuration.ts` 是 **server 侧的装配入口**，负责：

- `imports`：如 `@midwayjs/koa`；
- `importConfigs`：加载 `src/config`；
- `detector`：v4 **显式扫描** OOP 类（`controller`、`service` 等）。

函数式路由依赖 **apiDir 配置 + 对应组件**，而不是仅靠 `detector` 扫描 `.api.ts` 文件。升级 v3 项目时，既要补 `detector`，也要核对是否已启用函数式相关组件，见 [FAQ · v3→v4](../faq#v3-v4-summary) 与 [排错指南](../faq/troubleshooting#v4-scan-routes)。

## Workspace 多包（Monorepo）

官方 **Workspace** 允许在仓库内放置多个 Midway 应用或共享包。常见模式：

```text
my-workspace/
├── package.json           # workspaces 根
├── packages/
│   ├── api-service/       # 独立 Midway 应用
│   │   └── src/
│   │       ├── configuration.ts
│   │       └── server/api/
│   └── shared/            # 共享类型或工具（非 Midway 应用）
└── pnpm-workspace.yaml
```

每个子包的 `configuration.ts`、`apiDir`、`koa.port` **独立配置**；共享代码通过 workspace 依赖引用，避免跨包直接相对路径引用 `src`。

本库不展开 Workspace 脚手架的逐步命令；创建多包项目时请对照 [官方文档](https://midwayjs.org/docs) 中的 Workspace / Monorepo 说明，并保证各子包 Node.js ≥ 20、依赖均为 **4.x**。

## web（Egg）与 Serverless（仅对照）

| 栈 | 包 / 模板 | 本库 |
|----|-----------|------|
| **Koa（主线）** | `@midwayjs/koa`、**koa-v4** | [安装](../setup)、[核心概念](../concepts) |
| **Egg** | `@midwayjs/web`、**web-v4** 等 | [FAQ · Egg](../faq#egg-serverless) |
| **Serverless** | `@midwayjs/faas`、**faas-v4** 等 | [FAQ · Serverless](../faq#egg-serverless) |

若在 Workspace 中混用多种栈，请为每个子应用单独选择 `imports` 与模板，勿默认共用 koa-v4 的 `apiDir` 约定。

## 与 OOP 目录的协作

| 能力 | OOP | 函数式 |
|------|-----|--------|
| 路由声明 | `@Controller`、`@Get` | `defineApi`、`api.get` |
| 业务逻辑 | `@Provide` Service | `useInject(Service)` |
| 扫描 / 注册 | `detector` + `src/controller` 等 | `apiDir` 下 `defineApi` 模块 |

同一 Workspace 内可让一个包纯 OOP、另一个包偏函数式；跨包调用应通过 HTTP、消息或共享 npm 包，而不是跨目录直接 import 未导出的 Controller。

## 下一步

- `defineApi` 用法与共存：[函数式 · 索引](..)。
- 创建项目：[安装 · 脚手架](../setup/scaffold)。
- 升级与排错：[FAQ](../faq) · [排错指南](../faq/troubleshooting)
