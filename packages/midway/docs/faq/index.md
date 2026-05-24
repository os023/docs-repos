# FAQ

本节汇总阅读与使用本中文文档库时的常见问题，并对 **v3→v4**、**Egg**、**Serverless** 等主题做摘要性说明（不替代官方升级指南）。分步排错见 [排错指南](troubleshooting)；官方入口：[Midway 文档](https://midwayjs.org/docs)。

## 本章导航

| 页面 | 内容 |
|------|------|
| [排错指南](troubleshooting) | v3→v4 迁移检查清单、路由/扫描/依赖常见问题 |

## 本库文档范围

| 主题 | 本库处理方式 |
|------|----------------|
| **Midway v4** | 主线：安装、OOP 概念、函数式入口 |
| **Midway v3** | 不在侧栏单独开章；升级要点见下文与 [排错指南](troubleshooting#v3-v4-checklist) |
| **Egg** | 仅 FAQ 简述与官方链接，不展开 Egg 专题 |
| **Serverless** | 仅 FAQ 简述；部署细节以官方 Serverless 文档为准 |

## v3 → v4 升级要点（摘要） {#v3-v4-summary}

以下为阅读 [官方 3.x 升级指南](https://midwayjs.org/docs/upgrade_v4) 前的速览；实施时务必对照官方文档与发布说明。

| 类别 | 变化要点 |
|------|----------|
| **运行时** | Node.js **≥ 20**（推荐 LTS） |
| **依赖版本** | `@midwayjs/core`、`@midwayjs/koa` 等统一升至 **4.x** |
| **装饰器包** | 移除 `@midwayjs/decorator`，改从 `@midwayjs/core` 导入 |
| **目录扫描** | 移除隐式扫描，须在 `@Configuration` 中配置 `detector: new CommonJSFileDetector()` |
| **装饰器 API** | `@App()` 空参 → `@MainApp()`；`@Config(ALL)` → `@AllConfig()` |
| **日志** | 上下文日志格式迁移到 `midwayLogger.clients.*.contextFormat` |
| **函数式** | v4 支持 `defineApi`、`apiDir` 与 OOP 并列；可按需渐进引入 |
| **测试** | `createApp` 额外组件改写到 `options.imports`；可用 `createLegacyApp` 过渡 |

完整 Breaking Change 列表（validate 替换、Pipeline 移除、各组件包变更等）以官方升级页为准。本库 [排错指南](troubleshooting#v3-v4-checklist) 提供可勾选的迁移检查项。

## Egg 与 Serverless（简述） {#egg-serverless}

- **Egg**：Midway 与 Egg 有历史渊源（`@midwayjs/web`、**web-v4** 模板），但本库以 **v4 + Koa** 为主线。若项目基于 Egg，请使用 [Egg 官方文档](https://eggjs.org) 与 Midway 官方 Egg 集成说明，不在此重复专题章节。
- **Serverless**：Midway 提供 `@midwayjs/faas`、**faas-v4** 等形态，配置与云平台、触发器强相关。选型、冷启动、部署包体积等请参阅 [官方 Serverless 相关章节](https://midwayjs.org/docs)；本库不展开部署流水线。

## 快速问答

### 应该读 v3 还是 v4 文档？

新项目请直接以 **v4** 为准，并从本库 [概览](../overview)、[安装](../setup) 开始。维护 v3 老项目时，以官方 v3 文档与 [upgrade_v4](https://midwayjs.org/docs/upgrade_v4) 为主，本库 FAQ 仅作迁移摘要。

### 函数式和 Controller 选哪个？

二者可共存：复杂领域模型与团队习惯 OOP 时优先 Controller + Service；少量接口或 BFF 层可优先 [函数式](../functional) 的 `defineApi`。分工见 [函数式 · 索引](../functional) 与 [核心概念](../concepts)。

### 升级后接口 404 或 Bean 未注册？

优先检查 v4 **`detector`** 与 **`apiDir`** 配置，见 [排错指南 · v4 显式扫描与路由未注册](troubleshooting#v4-scan-routes)。

### 官方示例在哪里？

- 官方网站：[midwayjs.org](https://midwayjs.org)
- 文档入口：[midwayjs.org/docs](https://midwayjs.org/docs)
- 源码与示例：[github.com/midwayjs/midway](https://github.com/midwayjs/midway)

## 延伸阅读

- [概览](../overview) · [安装](../setup) · [核心概念](../concepts) · [函数式](../functional)
- [排错指南](troubleshooting)
