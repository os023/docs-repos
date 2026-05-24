# 排错指南

按「环境 → 依赖与扫描 → 路由注册 → 运行时日志」顺序排查，可覆盖多数 v4 与迁移问题。建议临时将日志级别调高，复现后恢复。

## v3 升级到 v4 检查清单 {#v3-v4-checklist}

对照 [官方升级指南](https://midwayjs.org/docs/upgrade_v4) 与本库 [FAQ · v3→v4 摘要](../faq#v3-v4-summary)，逐项确认：

| 步骤 | 检查项 | 说明 |
|------|--------|------|
| 1 | Node.js ≥ 20 | `node -v` |
| 2 | 依赖均为 4.x | `package.json` 中 `@midwayjs/*` 版本 |
| 3 | 移除 `@midwayjs/decorator` | 装饰器改从 `@midwayjs/core` 导入 |
| 4 | 配置 `detector` | `configuration.ts` 中 `new CommonJSFileDetector()` |
| 5 | 调整 `@App` / `@Config(ALL)` | 改为 `@MainApp()`、`@AllConfig()` |
| 6 | 日志配置迁移 | `contextLoggerFormat` → `midwayLogger` |
| 7 | 单测 `createApp` 参数 | 额外组件写入 `options.imports` |
| 8 | 函数式（若使用） | 配置 `apiDir` 并放置 `defineApi` 文件 |

升级后执行 `npm install`、`npm run dev`，访问原有路由与新增 `defineApi` 路径各测一次。

## v4 显式扫描与路由未注册 {#v4-scan-routes}

**现象**：Controller / Service 注入失败；访问 `@Get` 路由 404；日志提示类未绑定到容器。

| 步骤 | 操作 |
|------|------|
| 1 | 确认 `src/configuration.ts` 含 `detector: new CommonJSFileDetector()` |
| 2 | 确认类文件在 `src/controller`、`src/service` 等约定目录，且导出 Class |
| 3 | 确认类上有 `@Provide` 或 `@Controller`（等内置 Provide 能力） |
| 4 | 若自定义 `ignore`，确认未排除目标目录 |
| 5 | 重启 `npm run dev`，避免只改文件未触发热更新 |

详见 [核心概念 · Configuration](../concepts/configuration#v4-detector)。

### 函数式路由 404

**现象**：`defineApi` 已编写，但路径无响应。

| 步骤 | 操作 |
|------|------|
| 1 | 核对 `config.default.ts` 中 **`apiDir`** 与磁盘目录一致 |
| 2 | 确认文件在 `apiDir` 下且导出 `defineApi` 结果 |
| 3 | 检查路由前缀是否与 Controller 路径冲突 |
| 4 | 一体化项目确认 `imports` 含 Koa / 函数式相关组件 |

详见 [函数式 · apiDir](../functional#api-dir) 与 [Workspace](../functional/workspace)。

## 启动失败与端口占用

| 现象 | 处理 |
|------|------|
| `EADDRINUSE` | 修改 `config.default.ts` 中 `koa.port` 或结束占用进程 |
| 依赖版本冲突 | 删除 `node_modules` 后重新 `npm install`，确保无 3.x 与 4.x 混用 |
| TypeScript 编译错误 | 先 `npm run build` 查看具体文件；对照升级指南调整装饰器导入 |

## 配置未生效

| 现象 | 处理 |
|------|------|
| 改了 `config.*.ts` 无变化 | 确认当前 `NODE_ENV` / Midway 环境名与文件名匹配（如 `local`、`prod`） |
| `@Config` 在构造函数中为 `undefined` | 改在 `@Init()` 或方法内读取，见 [Configuration](../concepts/configuration) |
| 数组配置被“合并丢失” | v4 多环境配置对 **数组为覆盖** 而非深度合并 |

## 日志与本地调试

```typescript
// config.default.ts 片段：临时提高日志级别（字段以项目所用 logger 为准）
export default {
  midwayLogger: {
    clients: {
      appLogger: { level: 'debug' },
    },
  },
} as MidwayConfig;
```

- 开发命令：`npm run dev`（默认 [http://127.0.0.1:7001](http://127.0.0.1:7001)）。
- 提问时请注明：Node 版本、模板名（koa-v4 / react-functional-v4 等）、是否 Serverless。

## Egg / Serverless 相关问题

本库不展开专题排错，仅列常见指向：

| 场景 | 建议 |
|------|------|
| Egg 中间件、插件不加载 | 使用 **web-v4** 与 `@midwayjs/web` 官方文档，勿照搬 koa-v4 的 `configuration` |
| Serverless 冷启动超时 | 精简 `imports`、避免在 `onReady` 做重初始化；查阅对应云平台限制 |
| 本地与线上行为不一致 | 核对环境变量、VPC、触发器路径与打包入口 |

更多选型说明见 [FAQ · Egg 与 Serverless](../faq#egg-serverless)。

## 延伸阅读

- [FAQ 索引](../faq) · [安装 · 快速开始](../setup/quickstart) · [升级官方文档](https://midwayjs.org/docs/upgrade_v4)
