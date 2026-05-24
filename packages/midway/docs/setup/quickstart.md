# 快速开始与本地启动

本节用最少步骤完成 **Midway v4** 项目创建与首次访问。对照官方 [创建第一个应用](https://midwayjs.org/docs/quickstart)；模板差异与一体化选型见 [脚手架与模板选型](scaffold)。

## 创建项目

在空目录下执行官方脚手架（`-y` 可跳过部分确认，仍会在模板列表中交互选择）：

```bash
npm init midway@latest
```

在模板列表中选择 **`koa-v4`**（v4 + Koa + OOP 主线，本库默认以此为例）。若需前后端一体化、以函数式为主的模板，可选 **`react-functional-v4`** 或 **`vue-functional-v4`**，见 [脚手架与模板选型](scaffold#模板选型对照)。

非交互快速创建示例（项目名自定）：

```bash
npm init midway@latest my-midway-app -y
# 随后在提示中选择 koa-v4
```

> **注意**：v4 依赖 Node.js **≥ 20**，创建前请执行 `node -v` 确认。

## 安装依赖与启动

进入生成目录后安装依赖（部分脚手架已自动执行 `npm install`）：

```bash
cd my-midway-app
npm install   # 若尚未安装
npm run dev
```

开发服务器默认监听 **7001**。浏览器访问：

- http://127.0.0.1:7001  
- 或 http://localhost:7001  

默认首页应返回脚手架自带的欢迎信息（如 `Hello midwayjs!` 一类文案，以所选模板为准）。

### 修改开发端口

在 `package.json` 的 `scripts.dev` 中调整端口参数。常见写法（以模板实际脚本为准）：

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=local mwtsc --watch --run @midwayjs/mock/app.js --port 6001"
  }
}
```

保存后重新执行 `npm run dev`，使用新端口访问。

## 最小目录结构（koa-v4）

脚手架生成后，最精简的 v4 项目通常类似：

```text
my-midway-app/
├── src/
│   ├── configuration.ts      # 生命周期与组件开关
│   ├── config/               # 环境配置
│   └── controller/
│       └── home.controller.ts
├── test/
├── package.json
└── tsconfig.json
```

| 路径 | 说明 |
|------|------|
| `src/` | 业务源码根目录 |
| `src/configuration.ts` | Midway 入口：加载 Koa 等组件、生命周期钩子 |
| `src/controller/` | Web Controller（OOP 路由） |
| `test/` | 单元 / 集成测试 |
| `package.json` | 依赖与 `dev` / `test` / `build` 脚本 |

更多约定目录（`service`、`middleware`、`filter` 等）见 [脚手架与模板选型 · 目录结构](scaffold#src-下常用目录)。

## 首次自检

按下列顺序确认环境正常：

| 步骤 | 操作 | 预期 |
|------|------|------|
| 1 | `node -v` | 主版本 ≥ 20 |
| 2 | `npm run dev` | 无报错，日志显示 HTTP 已监听 |
| 3 | 浏览器打开 `http://127.0.0.1:7001` | 有 HTTP 200 与欢迎内容 |
| 4 | 修改 `src/controller` 中某路由后保存 | 热更新后刷新可见变化（watch 模式） |

### 常见问题速查

| 现象 | 可能方向 |
|------|----------|
| 启动报 Node 版本不满足 | 升级至 Node 20+ LTS |
| 7001 端口被占用 | 修改 `dev` 脚本端口或释放占用进程 |
| Windows 下 ESLint 换行报错 | 见官方 [Git 换行说明](https://midwayjs.org/docs/faq/git_problem) 与 [FAQ](../faq) |

## 继续学习

- 需要走一遍 Controller → Service 示例流程，可参考官方 [快速指南](https://midwayjs.org/docs/quick_guide)（天气示例）；本库 [核心概念](../concepts) 将归纳 OOP 要点。
- 对比 **react-functional-v4** / **vue-functional-v4** 目录与 `defineApi` 约定，见 [脚手架与模板选型](scaffold) 与 [函数式](../functional)。
