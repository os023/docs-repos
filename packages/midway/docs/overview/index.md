# 概览

本节说明 Midway v4 的定位、技术栈与在本中文文档库中的阅读路径。要点对照 [官方文档 · 介绍](https://midwayjs.org/docs/intro)。

## Midway 是什么？

Midway 是阿里巴巴团队长期维护的 Node.js 企业级框架：基于 **渐进式** 理念，用自研 **IoC 容器** 串联配置、生命周期与各类组件，在 TypeScript 下同时支持 **面向对象（OOP + Class + IoC）** 与 **函数式（FP + Function + Hooks）** 两种范式，可按场景选用或混用。

官方还覆盖 Web / 全栈 / 微服务 / RPC / Socket / Serverless 等形态；**本库以 v4 + Koa 一体化入口为主线**，其余场景以官方文档为准，不在此逐章展开。

## v4 技术栈（择要）

| 层次 | 说明 |
|------|------|
| **运行时** | Node.js **≥ 20**（开发与部署均建议 LTS，见官方版本表） |
| **语言** | TypeScript 优先，类型与工具链深度集成 |
| **Web 内核** | **Koa**（v4 脚手架如 **koa-v4** 以 Koa 为默认 HTTP 栈） |
| **依赖注入** | 自研 IoC 容器，`@Inject`、装饰器与生命周期管理 |
| **面向对象层** | `@Controller` / `@Get`、Service、Configuration 等，约定目录扫描 |
| **函数式层** | `defineApi`、`useContext` / `useInject` 等，通常置于 `apiDir`（如 `src/server/api`） |
| **工程化** | 官方 CLI、组件生态、多环境配置与部署相关能力 |

## Koa + OOP + 函数式：一体化入口

v4 的核心变化之一，是在 **同一 Koa 应用** 内并列支持两类写法，而无需拆成两套项目：

- **面向对象**：在 `src/controller`、`src/service` 等约定目录下用装饰器声明路由与业务；适合分层清晰、团队协作习惯 Class 的领域服务。
- **函数式**：通过 `defineApi` 在 `apiDir` 中声明接口契约，在 handler 内用 `useContext`、`useInject` 取上下文与依赖；适合少量接口、BFF 或与前端契约贴近的场景。

脚手架选择 **koa-v4**（或同等 v4 模板）后，两种范式可 **共存**：复杂模块走 Controller + Service，边缘 HTTP 入口可走 `defineApi`。本库 [核心概念](../concepts) 与 [函数式](../functional) 分章说明，避免在一处堆叠全部 API。

对照官方示例（节选思路，完整代码见官方文档）：

```typescript
// OOP：src/controller/home.ts
@Controller('/')
export class HomeController {
  @Inject() ctx: Context;
  @Get('/') async home() { /* ... */ }
}
```

```typescript
// FP：src/server/api/home.api.ts
export const homeApi = defineApi('/', api => ({
  getHome: api.get('/', async () => { const ctx = useContext(); /* ... */ }),
}));
```

## 官方优势与本库的取舍

官方强调的能力包括：大促级稳定性、丰富组件（数据库、缓存、定时任务、部署等）、一体化前后端协同、完善 TS 类型与国内文档社区等。本库 **不替代** 官方逐 API 说明，而是按「概览 → 安装 → 概念 → 函数式 → FAQ」整理 **v4 日常开发路径** 的中文笔记。

## 本库章节与官方对照

| 本库章节 | 将涵盖的内容 | 官方参考 |
|----------|--------------|----------|
| [安装](../setup) | 脚手架、本地启动、目录结构 | [quickstart](https://midwayjs.org/docs/quickstart)、[quick_guide](https://midwayjs.org/docs/quick_guide) |
| [核心概念](../concepts) | IoC、Controller、Service、配置 | 官方「基础」与「进阶」相关章节 |
| [函数式](../functional) | `defineApi`、`apiDir` 与 OOP 共存 | 官方函数式 / Workspace 相关说明 |
| [FAQ](../faq) | v3→v4 摘要、Egg/Serverless 选型提示 | 官方 FAQ 与升级指南 |

## 范围说明：v3、Egg、Serverless

以下主题 **不在本库侧栏单独开大章**，避免与 v4 主线混淆：

| 主题 | 本库处理方式 |
|------|----------------|
| **Midway v3** | 老项目请以官方 v3 文档与升级指南为主；本库仅在 [FAQ](../faq) 提供 v3→v4 摘要 |
| **Egg** | 历史渊源与 Egg 集成见官方与 [eggjs.org](https://eggjs.org)；本库不重复 Egg 专题 |
| **Serverless** | 触发器、云平台绑定等请参阅 [官方 Serverless 章节](https://midwayjs.org/docs)；本库 FAQ 仅作选型与常见坑摘要 |

新项目请直接以 **v4 + koa-v4** 为准；维护旧栈或选型问题请先阅读 [FAQ](../faq)。

## 环境先决条件

- **操作系统**：macOS、Linux、Windows
- **Node.js**：v4 要求 **≥ 20.0.0**（推荐 LTS）；包管理可用 npm、pnpm 等
- **提问与社区**：可追踪问题请优先 [GitHub Issues](https://github.com/midwayjs/midway/issues)；版本与场景（是否 Serverless）需写清

## 建议阅读顺序

1. 先读本节建立 v4 整体认识。
2. 按 [安装](../setup) 创建项目并本地跑通。
3. 阅读 [核心概念](../concepts) 掌握 OOP 与目录扫描约定。
4. 需要函数式入口时继续 [函数式](../functional)。
5. 升级、Egg 或 Serverless 见 [FAQ](../faq)。
