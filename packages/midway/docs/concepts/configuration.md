# Configuration

Midway 应用的 **装配中心** 是 `src/configuration.ts`：通过 `@Configuration` 声明要加载的 **组件**、**多环境配置**、**v4 文件探测器** 以及 **生命周期** 钩子。官方相关章节：[生命周期](https://midwayjs.org/docs/lifecycle)、[多环境配置](https://midwayjs.org/docs/env_config)。

## configuration.ts 职责

| 能力 | 配置项 / API | 说明 |
|------|----------------|------|
| Web 框架等组件 | `imports` | 如 `@midwayjs/koa` |
| 业务配置 | `importConfigs` | `src/config` 下分环境文件 |
| 文件扫描（v4） | `detector` | 如 `CommonJSFileDetector` |
| 启动钩子 | `ILifeCycle` 方法 | `onConfigLoad`、`onReady` 等 |

### koa-v4 典型入口

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

- **`imports`**：启用 Koa、ORM、校验等官方组件。
- **`importConfigs`**：加载 `config.default.ts` 及当前环境配置（见下文）。
- **`detector`**：v4 **必填**（或等价配置），用于扫描并绑定 `src` 下的 `@Provide` Class。

## v4 文件探测器（detector） {#v4-detector}

v4 移除隐式扫描，须在 `@Configuration` 中显式声明探测器。升级说明：[入口自动扫描能力](https://midwayjs.org/docs/upgrade_v4#入口自动扫描能力)。

```typescript
import { Configuration, CommonJSFileDetector } from '@midwayjs/core';

@Configuration({
  detector: new CommonJSFileDetector({
    ignore: ['**/logs/**'],
    conflictCheck: true,
  }),
})
export class MainConfiguration {}
```

默认递归扫描 `src` 下 `.ts` / `.js` 等；导出 Class 且带 `@Provide`（或 `@Controller`）时执行 `container.bind`。更多 `pattern` / `ignore` 选项见 [IoC · v4 显式扫描](ioc#v4-scan)。

## 多环境配置

配置文件建议放在 **`src/config/`**：

```text
src/config/
├── config.default.ts   # 所有环境加载
├── config.local.ts     # 本地开发
├── config.prod.ts      # 生产
└── config.unittest.ts  # 单测
```

### 对象形式（推荐）

```typescript
// src/config/config.default.ts
import { MidwayConfig } from '@midwayjs/core';

export default {
  keys: 'your-cookie-keys',
  koa: {
    port: 7001,
  },
} as MidwayConfig;
```

### 在 configuration 中显式引入

v3 起推荐 **对象形式** 显式列出环境（利于 ESM / 单文件构建）：

```typescript
import { Configuration } from '@midwayjs/core';
import * as DefaultConfig from './config/config.default';
import * as LocalConfig from './config/config.local';

@Configuration({
  importConfigs: [
    {
      default: DefaultConfig,
      local: LocalConfig,
    },
  ],
})
export class MainConfiguration {}
```

也可使用目录路径（传统方式）：

```typescript
import { join } from 'path';

@Configuration({
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {}
```

加载顺序：先 `config.default`，再按当前运行环境合并 `config.{env}`（如 `prod`）。合并规则为深度拷贝，**数组会被覆盖而非合并**。

### 在代码中读取配置

```typescript
import { Provide, Config } from '@midwayjs/core';

@Provide()
export class UserService {
  @Config('koa.port')
  port: number;

  async demo() {
    console.log(this.port); // 7001
  }
}
```

- **`@Config('a.b.c')`**：按路径取单项。
- **`@AllConfig()`**（v4）：获取完整配置对象，替代 v3 的 `@Config(ALL)`。

不要在 **constructor** 中读取 `@Config` 注入值（此时尚未赋值）；可在 **`@Init()`** 方法中使用。

## 生命周期（择要）

实现 `ILifeCycle` 可在应用启动 / 停止时执行初始化与清理：

| 钩子 | 时机 | 典型用途 |
|------|------|----------|
| `onConfigLoad` | 配置加载后 | 合并远端配置、动态改配置 |
| `onReady` | 依赖注入容器就绪 | 连库、注册中间件、预热缓存 |
| `onServerReady` | HTTP 服务已监听 | 获取 server、打印端口 |
| `onStop` | 应用关闭 | 关闭连接、释放资源 |

```typescript
import { Configuration, CommonJSFileDetector, ILifeCycle, IMidwayContainer } from '@midwayjs/core';

@Configuration({
  imports: [/* ... */],
  importConfigs: [/* ... */],
  detector: new CommonJSFileDetector(),
})
export class MainConfiguration implements ILifeCycle {
  async onReady(container: IMidwayContainer) {
    // 容器已就绪，可 getAsync 其它 Bean
  }

  async onStop() {
    // 清理资源
  }
}
```

v4 为各生命周期内置超时（如 `onReady` 默认 30s），可通过 `core.readyTimeout` 等配置调整，见 [生命周期 · 超时机制](https://midwayjs.org/docs/lifecycle#超时机制)。

## 与 OOP 各层的关系

```text
configuration.ts  →  imports（Koa 等）+ importConfigs + detector
       ↓
   IoC 容器扫描 src/controller、src/service …
       ↓
   Controller / Service / Middleware …
```

## 下一步

- 依赖注入细节 → [IoC](ioc)。
- 创建项目与目录 → [安装 · 脚手架](../setup/scaffold)。
- 函数式 `defineApi` → [函数式](../functional)。
