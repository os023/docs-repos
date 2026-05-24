---
slug: /
---

# Midway 文档

[Midway](https://midwayjs.org) 是面向 Node.js 的企业级服务端框架，通过自研依赖注入容器与上层模块组合，覆盖 Web、微服务、RPC、Socket 等多种场景。本目录整理 **Midway v4**（Koa + 面向对象 + 函数式一体化入口）的中文安装、概念与开发笔记。

章节结构对照 [Midway 官方文档 · 介绍](https://midwayjs.org/docs/intro)。**v3、Egg、Serverless** 不在侧栏单独开大章，选型与迁移要点见 [FAQ](faq)。

## 文档导航

| 章节 | 说明 |
|------|------|
| [概览](overview) | v4 技术栈、Koa + OOP + 函数式一体化定位与阅读路径 |
| [安装](setup) | 脚手架选型（[快速开始](setup/quickstart)、[模板说明](setup/scaffold)）、`npm init midway@latest`、本地 `npm run dev` |
| [核心概念](concepts) | IoC、Controller、Service、配置等面向对象范式 |
| [函数式](functional) | `defineApi`、`apiDir`；[Workspace 与目录](functional/workspace) |
| [FAQ](faq) | v3→v4 升级摘要、Egg/Serverless 简述；[排错指南](faq/troubleshooting) |

## v4 推荐阅读路径

1. **[概览](overview)** — 确认 v4 技术栈、一体化入口与 Node.js ≥ 20 等先决条件。
2. **[安装 · 快速开始](setup/quickstart)** — 使用 `npm init midway@latest` 选择 **koa-v4**（或一体化模板），`npm run dev` 跑通并对照目录结构。
3. **[核心概念](concepts)** — 按 [IoC](concepts/ioc) → [Controller](concepts/controller) → [Service](concepts/service) → [Configuration](concepts/configuration) 掌握 OOP 分层与 v4 `detector` 显式扫描。
4. **[函数式](functional)** — `defineApi` 与 [apiDir / server 约定](functional/workspace)；与 OOP 共存。
5. 升级、Egg 或 Serverless 见 **[FAQ](faq)**；路由与扫描问题见 **[排错指南](faq/troubleshooting)**。细节以 [官方文档](https://midwayjs.org/docs) 为准。

## 官方链接

| 类型 | 地址 |
|------|------|
| 官方网站 | [midwayjs.org](https://midwayjs.org) |
| 官方文档 | [Midway 文档](https://midwayjs.org/docs) |
| 代码仓库 | [midwayjs/midway](https://github.com/midwayjs/midway) |
