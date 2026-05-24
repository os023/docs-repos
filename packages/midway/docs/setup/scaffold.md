# 脚手架与模板选型

本节说明 `npm init midway@latest` 的交互流程、**v4 常用模板**差异，以及生成项目的目录约定。对照官方 [创建第一个应用](https://midwayjs.org/docs/quickstart) 与 [快速入门](https://midwayjs.org/docs/quick_guide)；本地启动步骤见 [快速开始与本地启动](quickstart)。

## 脚手架命令

| 命令 | 用途 |
|------|------|
| `npm init midway@latest` | 交互式创建项目（推荐首次使用） |
| `npm init midway@latest <项目名> -y` | 指定目录名并减少确认项，模板类型仍在列表中选择 |
| `npm init midway` | 查看可用模板列表（版本以 `@latest` 为准） |

执行后脚手架会：生成示例代码、写入 `package.json` / `tsconfig.json`、并尝试安装依赖。

## 技术路线（官方分类）

官方按部署与研发形态区分多套方案；**本库以纯 Node.js + Koa 的 v4 为主线**：

| 路线 | 代表模块 / 范式 | 本库侧栏 |
|------|-----------------|----------|
| **纯 Node.js（传统后端）** | `@midwayjs/koa`，依赖注入 + Class | **主线**（koa-v4） |
| **一体化（前后端同仓）** | `@midwayjs/core/functional`、`web-bridge` 等，函数式为主 | 模板 **react-functional-v4** / **vue-functional-v4**；详见 [函数式](../functional) |
| **Serverless** | `@midwayjs/faas` 等 | 不在侧栏展开，见 [FAQ](../faq) |

后续章节默认以 **koa-v4** 为例；一体化模板在目录上会增加前端工程与 `apiDir` 等约定。

## 模板选型对照

在 `npm init midway@latest` 的模板列表中，v4 日常开发常见选项如下：

| 模板名 | 适用场景 | 要点 |
|--------|----------|------|
| **koa-v4** | 标准后端 API、微服务、需要完整 OOP 分层 | Koa + IoC + `src/controller`；本库 **默认推荐** |
| **react-functional-v4** | 同仓 React 前端 + 函数式 API | 前后端一体化；路由多用 `defineApi`，见 [函数式](../functional) |
| **vue-functional-v4** | 同仓 Vue 前端 + 函数式 API | 同上，前端栈为 Vue |

选型建议：

- **只做后端或习惯 Class + 装饰器** → **koa-v4**。
- **希望减少联调、前后端同仓库、偏好函数式 HTTP** → **react-functional-v4** 或 **vue-functional-v4**（按团队前端栈二选一）。
- **Egg、Express、Serverless 专用模板** → 请参阅 [官方文档](https://midwayjs.org/docs) 与 [FAQ](../faq)；本库不逐模板展开。

创建完成后，任意模板均可先执行：

```bash
npm install
npm run dev
```

默认开发地址仍为 `http://127.0.0.1:7001`（端口可在 `package.json` 的 `dev` 脚本中修改，见 [快速开始](quickstart#修改开发端口)）。

## 目录结构要点

### koa-v4 典型布局

```text
my-midway-app/
├── src/
│   ├── configuration.ts       # @Configuration：imports 组件、生命周期
│   ├── config/
│   │   └── config.default.ts
│   ├── controller/
│   │   └── home.controller.ts
│   ├── service/               # 随业务增加
│   ├── middleware/
│   ├── filter/
│   └── interface.ts           # 业务类型定义（可选）
├── test/
│   └── *.test.ts
├── package.json
└── tsconfig.json
```

### 一体化模板额外内容（择要）

**react-functional-v4** / **vue-functional-v4** 在 koa-v4 骨架基础上，通常还会包含：

- 前端工程目录（如 `client` 或模板内约定路径）与构建脚本；
- **`apiDir`** 下的 `defineApi` 文件（函数式路由）；
- 与 `web-bridge` 相关的开发 / 联调脚本。

具体路径以所选模板生成结果为准；函数式约定见 [函数式](../functional)。

## `src/` 下常用目录

Midway 不强制固定目录名，但社区约定将源码放在 `src/` 下并按职责分文件夹。v4 扫描与装饰器注册依赖这些约定，新建文件时请放在对应目录：

| 目录 / 文件 | 用途 |
|-------------|------|
| `controller/` | Web Controller，OOP 路由（`@Controller`、`@Get` 等） |
| `service/` | 可 `@Provide` 的业务服务 |
| `middleware/` | 中间件 |
| `filter/` | 异常 / 响应过滤器 |
| `aspect/` | 拦截器 |
| `config/` | `config.default.ts` 等环境配置 |
| `entity/` / `model/` | 数据库实体（使用 ORM 组件时） |
| `decorator/` | 自定义装饰器 |
| `util/` | 工具函数 |
| `interface.ts` | 共享 TypeScript 类型 |
| `configuration.ts` | 应用入口：组件开关、`importConfigs`、生命周期 |

> v4 对 **controller、service** 等目录采用显式扫描；新增类须放在约定路径下才会被容器发现，详见 [核心概念](../concepts)。

## Web 框架组件（了解即可）

Midway 通过 **组件** 接入上层 Web 框架。v4 示例与 **koa-v4** 默认使用 **`@midwayjs/koa`**。亦可选用 `@midwayjs/web`（Egg）、`@midwayjs/express` 等，需在 `configuration.ts` 的 `imports` 中替换并遵循对应官方章节。

本库主线固定为 **Koa**；迁移 Egg / Express 请以官方扩展文档为准。

## 与官方教程的衔接

官方 [快速指南](https://midwayjs.org/docs/quick_guide) 以 **koa-v4** 为例演示 Controller → Service → 组件（如 view-nunjucks）→ Filter → Mock → 测试的完整链路。本库 [核心概念](../concepts) 与 [函数式](../functional) 将分别提炼 OOP 与 `defineApi` 要点，避免在此重复长篇教程代码。

## 下一步

- 尚未本地跑通 → [快速开始与本地启动](quickstart)。
- 已跑通 → [核心概念](../concepts) 或 [函数式](../functional)（视模板而定）。
