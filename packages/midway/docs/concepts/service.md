# Service

**Service** 用于承载可复用的业务逻辑，使 Controller 保持薄层：只做参数处理与结果组装。官方说明：[服务和注入](https://midwayjs.org/docs/service)。

## 为什么使用 Service

- Controller 逻辑更清晰，便于测试与维护。
- 同一套业务可被多个 Controller、定时任务或其它 Service 调用。
- 与展现层解耦，单元测试可针对 Service 编写。

## 文件位置

Service 通常放在 **`src/service/`**：

```text
src/
├── controller/
│   └── user.controller.ts
└── service/
    └── user.service.ts
```

## 定义 Service

Service 是普通 Class，加上 `@Provide()` 即可被容器托管：

```typescript
// src/service/user.service.ts
import { Provide } from '@midwayjs/core';

export interface User {
  id: number;
  name: string;
}

@Provide()
export class UserService {
  async getUser(id: number): Promise<User> {
    return { id, name: 'Harry' };
  }
}
```

类型定义可放在 `src/interface.ts` 等共享文件中。

## 在 Controller 中注入

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
    const user = await this.userService.getUser(id);
    return { success: true, message: 'OK', data: user };
  }
}
```

要点：

1. Service 类使用 **`@Provide()`** 注册。
2. 使用方属性使用 **`@Inject()`**，类型为 Class（非接口实例）。
3. **`@Provide` 与 `@Inject` 成对**：被注入的类型必须在容器中有对应绑定。

Controller 上的 `@Provide` 可省略（`@Controller` 已包含 Provide 能力），Service 上必须显式 `@Provide`。

## Service 之间互相注入

```typescript
@Provide()
export class OrderService {
  @Inject()
  userService: UserService;

  async createOrder(userId: number) {
    const user = await this.userService.getUser(userId);
    // ...
  }
}
```

避免循环依赖；若不可避免，可考虑事件、门面层或拆分模块。

## 作用域

默认 **Request** 作用域。无请求态、可进程级复用的服务（如连接管理）可设为 **Singleton**：

```typescript
import { Provide, Scope, ScopeEnum } from '@midwayjs/core';

@Provide()
@Scope(ScopeEnum.Singleton)
export class DbConnectionService {
  // ...
}
```

Controller 不能改为 Singleton。详见 [IoC · 作用域](ioc#作用域)。

## v4 与目录约定

- 新建 Service 文件须放在 **detector 可扫描**的目录（默认整个 `src`），并带 `@Provide`。
- 推荐统一使用 `src/service/` 命名，与团队及官方示例一致。

## 下一步

- HTTP 路由写法 → [Controller](controller)。
- 多环境配置与入口 → [Configuration](configuration)。
