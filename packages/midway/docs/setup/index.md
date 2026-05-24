# 安装

本节说明如何通过官方脚手架创建 **Midway v4** 项目、选择模板并完成首次本地启动。内容以中文笔记为主，步骤细节对照 [官方快速开始](https://midwayjs.org/docs/quickstart) 与 [快速指南](https://midwayjs.org/docs/quick_guide)。

## 本章导航

| 页面 | 内容 |
|------|------|
| [快速开始与本地启动](quickstart) | `npm init midway@latest`、**koa-v4** 选型、`npm run dev`、默认端口与首次自检 |
| [脚手架与模板选型](scaffold) | 交互式创建、**koa-v4** / **react-functional-v4** / **vue-functional-v4** 等模板差异与目录结构要点 |

建议按上表顺序阅读：先用快速开始页跑通最小项目，再在脚手架页对照模板与目录约定。

## 环境要求（择要）

| 项目 | 说明 |
|------|------|
| **Node.js** | v4 要求 **≥ 20.0.0**（推荐当前 LTS）；与 [概览](../overview#环境先决条件) 一致 |
| **操作系统** | macOS、Linux、Windows 均可 |
| **包管理器** | npm、pnpm、yarn 均可；脚手架会生成对应 lockfile |
| **TypeScript** | 新项目默认启用；IDE 建议开启类型检查 |

## 应用骨架速览

创建 **koa-v4** 项目后，常见目录职责如下（完整说明见 [脚手架与模板选型](scaffold#目录结构要点)）：

| 部分 | 典型路径 | 作用 |
|------|----------|------|
| **configuration** | `src/configuration.ts` | 应用生命周期、组件 `imports` 与全局配置入口 |
| **controller** | `src/controller/` | HTTP 路由与请求处理（OOP） |
| **service** | `src/service/` | 可注入的业务逻辑 |
| **config** | `src/config/` | 分环境配置（如 `config.default.ts`） |
| **api（函数式）** | 由 `apiDir` 等配置指定 | `defineApi` 路由（见 [函数式](../functional)） |
| **test** | `test/` | Jest 等测试用例 |

## 下一步

- 本地跑通后，阅读 [核心概念](../concepts) 掌握 IoC、Controller/Service 与 v4 显式扫描目录。
- 需要函数式或前后端一体化入口时，见 [函数式](../functional)。
- 脚手架报错、Node 版本或 Windows 换行等问题，见 [FAQ](../faq)。
