# 函数式

本节说明 Midway v4 **函数式 API** 的定位：在保留 Koa 与 IoC 能力的同时，用 `defineApi` 声明 HTTP 入口，并与面向对象的 Controller / Service **共存**。官方说明分散在函数式配置、一体化模板与 Workspace 相关章节；本库将常用约定整理为中文笔记。

## 本章导航

| 页面 | 内容 |
|------|------|
| [Workspace 与目录约定](workspace) | `server` / `web` / `apiDir`、一体化模板目录、多包 Workspace |

建议先完成 [安装](../setup) 与 [核心概念](../concepts)，再读本章；v3 升级与 Egg / Serverless 选型见 [FAQ](../faq)。

## 函数式与 OOP 的分工

| 范式 | 典型目录 | 适用场景 |
|------|----------|----------|
| **OOP** | `src/controller`、`src/service` | 分层清晰、装饰器路由、团队习惯 Class |
| **函数式** | `apiDir`（如 `src/server/api`） | BFF、少量接口、前后端一体化、与前端契约贴近 |

二者注册到 **同一 Koa 应用**，无需拆项目。复杂领域逻辑仍建议放在 Service，由 Controller 或函数式 handler 共同调用。

## defineApi 是什么？

`defineApi` 来自 `@midwayjs/core`（或一体化模板中的函数式入口包），用于把 **一组 HTTP 方法** 绑定到同一路由前缀，并在 handler 内通过 **Hooks** 访问请求上下文与 IoC：

| Hook | 作用 |
|------|------|
| `useContext()` | 获取当前 Koa `Context`（query、body、params 等） |
| `useInject()` | 按标识从容器解析 Service 等依赖 |
| `useConfig()` / `useLogger()` | 读取配置、打日志（函数式配置组件中常见） |

### 最小示例

```typescript
// src/server/api/home.api.ts
import { defineApi, useContext } from '@midwayjs/core';

export const homeApi = defineApi('/', api => ({
  getHome: api.get('/', async () => {
    const ctx = useContext();
    return { message: 'Hello Midway', path: ctx.path };
  }),

  getHealth: api.get('/health', async () => ({ status: 'ok' }),
}));
```

- 第一个参数为 **路由前缀**（如 `'/'` 或 `'/api'`）。
- 第二个参数是工厂函数，返回以方法名为键的路由定义；`api.get` / `api.post` 等与 HTTP 动词对应。
- handler 为 `async` 函数，返回值由框架序列化为响应体（与 Controller 类似）。

一体化脚手架（**react-functional-v4** / **vue-functional-v4**）默认以 `defineApi` 为主；**koa-v4** 以 Controller 为主，可按需新增 `apiDir` 文件。

## apiDir：函数式路由放哪？ {#api-dir}

函数式路由文件应放在配置项 **`apiDir`** 所指向的目录下（常见默认：`src/server/api` 或模板内 `src/api`，以生成结果为准）。应用启动时框架会扫描该目录下导出 `defineApi(...)` 的模块，并注册到 Koa。

在 `src/config/config.default.ts` 中可显式指定（字段名以所用组件文档为准，以下为常见写法）：

```typescript
// src/config/config.default.ts
import { MidwayConfig } from '@midwayjs/core';

export default {
  koa: { port: 7001 },
  // 函数式 API 扫描目录（路径相对项目根或 src，以官方/模板为准）
  apiDir: 'src/server/api',
} as MidwayConfig;
```

若路由未生效，请依次检查：

1. 文件是否在 `apiDir` 目录内，且 **默认导出或具名导出** 的 `defineApi` 结果被框架识别；
2. `configuration.ts` 是否已 `imports` Koa（或一体化相关组件）；
3. v4 **`detector`** 是否已配置（OOP 类扫描与函数式扫描机制不同，但应用入口均需正确装配），见 [Configuration](../concepts/configuration#v4-detector)。

更细的 `server` / `web` 与多包目录见 [Workspace 与目录约定](workspace)。

## 与 OOP 共存

同一项目可同时存在：

```text
src/
├── configuration.ts
├── controller/          # @Controller、@Get …
├── service/             # @Provide 业务类
└── server/api/          # defineApi（apiDir）
    └── user.api.ts
```

**推荐做法**：

- **Controller**：对外 REST 资源、需要大量参数装饰器与 Filter 的接口。
- **defineApi**：聚合查询、BFF、与前端同仓的轻量接口。
- **Service**：两种入口都通过 `useInject()` 或 `@Inject()` 调用同一套业务类，避免重复逻辑。

```typescript
// src/service/user.service.ts
import { Provide } from '@midwayjs/core';

@Provide()
export class UserService {
  async findById(id: string) {
    return { id, name: 'demo' };
  }
}
```

```typescript
// src/server/api/user.api.ts
import { defineApi, useContext, useInject } from '@midwayjs/core';
import { UserService } from '../../service/user.service';

export const userApi = defineApi('/api/users', api => ({
  getUser: api.get('/:id', async () => {
    const userService = await useInject(UserService);
    const id = useContext().params.id;
    return userService.findById(id);
  }),
}));
```

实际项目请以官方类型与模板为准。

## 与官方文档的对照

| 主题 | 本库 | 官方 |
|------|------|------|
| `defineApi`、Hooks | 本章 + [workspace](workspace) | 函数式 API / 一体化相关章节 |
| 脚手架 | [安装 · 脚手架](../setup/scaffold) | [quickstart](https://midwayjs.org/docs/quickstart) |
| v3→v4、Egg、Serverless | [FAQ](../faq) | [upgrade_v4](https://midwayjs.org/docs/upgrade_v4) |

## 下一步

- 目录与多包：[Workspace 与目录约定](workspace)。
- OOP 细节：[核心概念](../concepts)。
- 升级与排错：[FAQ](../faq) · [排错指南](../faq/troubleshooting#v4-scan-routes)。
