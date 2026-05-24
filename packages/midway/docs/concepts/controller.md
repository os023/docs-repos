# Controller

在 Midway 中，**Controller** 同时承担 MVC 里的「控制器」与 **HTTP 路由** 职责：解析请求、调用 Service、组装响应。官方说明：[路由和控制器](https://midwayjs.org/docs/controller)。

## 文件位置

Controller 源码放在 **`src/controller/`**（或 detector 能扫描到的等价路径）。koa-v4 脚手架示例：

```text
src/
└── controller/
    └── home.controller.ts
```

## 路由装饰器

- **`@Controller(prefix?)`**：声明 Web 控制器，可选路由前缀。
- **方法装饰器**：`@Get`、`@Post`、`@Put`、`@Del`、`@Patch`、`@Options`、`@Head`、`@All`。

路由方法建议写为 **`async`**。

### 最小示例

```typescript
// src/controller/home.controller.ts
import { Controller, Get } from '@midwayjs/core';

@Controller('/')
export class HomeController {
  @Get('/')
  async home() {
    return 'Hello Midwayjs!';
  }
}
```

访问 `GET /` 即返回纯文本响应；同一方法可绑定多个路径：

```typescript
@Get('/')
@Get('/main')
async home() {
  return 'Hello Midwayjs!';
}
```

## 请求参数

常用参数装饰器（Koa 场景）：

| 装饰器 | 取值位置 |
|--------|----------|
| `@Query(key?)` | URL Query |
| `@Body(key?)` | 请求体 |
| `@Param(key?)` | 路径参数 |
| `@Headers(name?)` | 请求头 |
| `@Session(key?)` | Session |

```typescript
import { Controller, Get, Query } from '@midwayjs/core';

@Controller('/api/user')
export class UserController {
  @Get('/')
  async getUser(@Query('id') id: string) {
    // GET /api/user?id=1 → id === '1'
    return { id };
  }
}
```

不传 key 时返回整段对象，例如 `@Query()` 得到完整 query 对象。

## 注入 Koa Context

使用 `@midwayjs/koa` 时可注入 `Context`：

```typescript
import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/')
  async home() {
    return { ip: this.ctx.ip };
  }
}
```

## 与 Service 协作

Controller 应保持精简：参数校验、调用 Service、返回 DTO。业务逻辑放在 [Service](service)：

```typescript
import { Controller, Get, Inject, Query } from '@midwayjs/core';
import { UserService } from '../service/user.service';

@Controller('/api/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Get('/')
  async getUser(@Query('id') id: number) {
    const user = await this.userService.getUser(id);
    return { success: true, data: user };
  }
}
```

## v4 注意事项

- Controller 须位于 **detector 扫描范围**内，且类上带 `@Controller`（已含 Provide 能力），见 [IoC · v4 显式扫描](ioc#v4-scan)。
- **请求体自动转 DTO**：v4 默认不再隐式把 `@Body()` 转为 Class 实例；需启用 `@midwayjs/validate` 或 `@midwayjs/validation` 组件后才做校验与转换（见 [升级指南](https://midwayjs.org/docs/upgrade_v4#自动-dto-转换移除)）。

## 下一步

- 业务层拆分 → [Service](service)。
- 应用入口与组件 → [Configuration](configuration)。
