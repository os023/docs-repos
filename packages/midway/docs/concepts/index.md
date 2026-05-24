# 核心概念

本章归纳 Midway v4 **面向对象（OOP）** 开发中的核心术语与目录约定，便于在写 Controller、Service 与配置前建立共同语言。完整说明见 [官方文档 · 介绍](https://midwayjs.org/docs/intro) 及「基础 / 进阶」相关章节。

## 本章导航

| 页面 | 内容 |
|------|------|
| [IoC 与依赖注入](ioc) | `@Provide`、`@Inject`、作用域、v4 `detector` 显式扫描 |
| [Controller](controller) | `@Controller`、路由方法、请求参数装饰器 |
| [Service](service) | 业务层拆分、`@Provide` / `@Inject` 协作 |
| [Configuration](configuration) | `src/configuration.ts`、组件 `imports`、多环境配置与生命周期 |

建议先完成 [安装](../setup) 与 [快速开始](../setup/quickstart)，再按上表顺序阅读；需要函数式入口时见 [函数式](../functional)。

## 核心术语速览

- **IoC 容器**：管理类实例与依赖关系；通过装饰器声明绑定，减少手动 `new`。
- **Controller**：对外暴露 HTTP 接口，负责参数解析与调用 Service；文件放在 `src/controller/`。
- **Service**：承载领域逻辑，可被多个 Controller 或其它 Service 注入复用；文件放在 `src/service/`。
- **Configuration**：`src/configuration.ts` 中的应用入口，负责组件开关、配置加载、**v4 文件探测器**与生命周期。
- **显式扫描（v4）**：不再隐式自动扫描，须在 `@Configuration` 中配置 `detector`（如 `CommonJSFileDetector`），框架才会绑定 `src` 下带 `@Provide` 的 Class。

## v4 显式扫描要点

从 v4 起，Midway 移除了隐式自动扫描。koa-v4 脚手架会在 `configuration.ts` 中声明探测器，默认递归扫描 `src` 下的 `.ts` / `.js` 等文件；导出为 Class 且含 `@Provide`（或 `@Controller` 等内置 Provide 能力的装饰器）时，才会注册到 IoC 容器。

```typescript
// src/configuration.ts
import { Configuration, CommonJSFileDetector } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import { join } from 'path';

@Configuration({
  imports: [koa],
  importConfigs: [join(__dirname, './config')],
  detector: new CommonJSFileDetector(),
})
export class MainConfiguration {}
```

约定目录与探测器选项详见 [IoC 与依赖注入](ioc#v4-scan) 与 [Configuration](configuration#v4-detector)。

## 与函数式入口的关系

OOP 与函数式 API（`defineApi`、`server` / `web` / `apiDir`）可在同一项目共存：HTTP 流量既可由 Controller 处理，也可由 `apiDir` 下的函数式路由处理。分工与选型见 [函数式](../functional)。

## 下一步

- 尚未创建项目 → [安装](../setup)。
- 需要 `defineApi` 与目录配置 → [函数式](../functional)。
- v3 升级、Egg 或 Serverless 选型 → [FAQ](../faq)。
