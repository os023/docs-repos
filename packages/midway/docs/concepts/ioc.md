# IoC 与依赖注入

Midway 通过 **IoC（控制反转）** 与 **依赖注入（DI）** 组织 Class 之间的协作：由容器负责实例化与属性赋值，业务代码只需声明「谁依赖谁」。官方说明：[依赖注入](https://midwayjs.org/docs/container)。

## 基本装饰器

| 装饰器 | 作用 |
|--------|------|
| `@Provide()` | 将 Class 注册到 IoC 容器，可被注入 |
| `@Inject()` | 在属性上声明依赖，容器自动赋值对应实例 |

`@Controller` 等入口装饰器已内置 Provide 能力，Controller 上通常可省略 `@Provide`。

### 最小示例

```typescript
// src/service/user.service.ts
import { Provide } from '@midwayjs/core';

@Provide()
export class UserService {
  async getUser(id: number) {
    return { id, name: 'Harry' };
  }
}
```

```typescript
// src/controller/user.controller.ts
import { Controller, Get, Inject, Query } from '@midwayjs/core';
import { UserService } from '../service/user.service';

@Controller('/api/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Get('/')
  async getUser(@Query('id') id: number) {
  return await this.userService.getUser(id);
  }
}
```

容器在请求链路中自动 `new` 并关联 `UserController` 与 `UserService`，无需手动初始化。

## 工作原理（简版）

1. **启动阶段**：创建 `MidwayContainer`，通过 **detector** 扫描 `src` 下文件，将带 `@Provide` 的 Class 绑定到容器。
2. **请求阶段**：按作用域实例化 Class，处理 `@Inject` 属性赋值，再执行业务方法。

这与手动编写 `const svc = new UserService(); ctrl.userService = svc` 等价，但由框架统一完成。

## 作用域

默认未声明时，`@Provide` 的 Class 为 **请求作用域（Request）**：每次请求首次使用时实例化，请求结束销毁。Controller 固定为请求作用域。

| 作用域 | 说明 | 典型用途 |
|--------|------|----------|
| **Request**（默认） | 请求链路内单例 | Controller、大部分 Service |
| **Singleton** | 进程级单例 | 连接池、缓存、无请求态的工具 |
| **Prototype** | 每次注入新建 | 特殊场景，使用较少 |

```typescript
import { Provide, Scope, ScopeEnum } from '@midwayjs/core';

@Provide()
@Scope(ScopeEnum.Singleton)
export class CacheService {
  private store = new Map<string, unknown>();
  // ...
}
```

## v4 显式扫描与目录约定 {#v4-scan}

v3 及更早版本存在隐式扫描；**v4 起必须在 `configuration.ts` 中配置 `detector`**，否则容器不会自动发现业务 Class。详见 [3.x 升级指南 · 入口自动扫描](https://midwayjs.org/docs/upgrade_v4#入口自动扫描能力)。

### 探测器配置

```typescript
// src/configuration.ts
import { Configuration, CommonJSFileDetector } from '@midwayjs/core';

@Configuration({
  detector: new CommonJSFileDetector(),
})
export class MainConfiguration {}
```

- **CommonJSFileDetector**：加载 CommonJS 格式源码（koa-v4 默认）。
- **ESModuleFileDetector**：ESM 项目使用。

可选参数：

| 选项 | 说明 |
|------|------|
| `ignore` | 额外忽略的路径 glob，如 `'**/logs/**'` |
| `pattern` | 扩展扫描后缀，如 `'**/**.jsx'` |
| `conflictCheck` | 导出 Class 重名检查，默认开启 |

默认扫描 `src` 下 `**/*.ts`、`**/*.js` 等，并忽略 `node_modules`、`**/*.test.ts`、`public` 等目录（完整列表见 [官方 · 文件探测器](https://midwayjs.org/docs/container#文件探测器)）。

### 推荐目录布局

虽无强制目录名，但社区约定将可注入 Class 放在 `src` 下固定文件夹，便于扫描与协作：

| 目录 | 内容 |
|------|------|
| `src/controller/` | `@Controller` 路由 |
| `src/service/` | `@Provide` 业务服务 |
| `src/middleware/` | 中间件 |
| `src/filter/` | 异常 / 响应过滤器 |
| `src/aspect/` | 拦截器 |

完整目录说明见 [脚手架 · 目录结构](../setup/scaffold#src-下常用目录)。

> **注意**：Class 必须被 detector 扫描到且带有 `@Provide`（或 `@Controller` 等）才会注册；放在 `src` 外或 `ignore` 匹配的路径下不会生效。

## 与 Configuration 的关系

组件开关、配置加载、detector 声明均在 `src/configuration.ts` 的 `@Configuration` 中完成，见 [Configuration](configuration)。

## 下一步

- 编写 HTTP 路由 → [Controller](controller)。
- 拆分业务逻辑 → [Service](service)。
- 函数式入口与 OOP 共存 → [函数式](../functional)。
