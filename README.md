# 中文技术文档集

使用 [Docusaurus](https://docusaurus.io/) 整理常用库、组件与开源系统的中文文档，采用 **pnpm workspace** 管理 monorepo。

## 目录结构

```
.
├── website/              # 主站（Docusaurus 应用）
└── packages/
    ├── prisma/           # 各库的文档子包
    ├── pgrest/
    ├── docusaurus/
    ├── opencode/
    └── midscene/
```

每个 `packages/<name>/` 子包包含：

- `docs/` — Markdown 文档
- `sidebars.ts` — 该库的侧边栏配置
- `package.json` — workspace 成员标识（`@docs/<name>`）

主站通过多个 `@docusaurus/plugin-content-docs` 实例，将各子包文档挂载到独立路由（如 `/prisma/...`）。

## 开发

```bash
pnpm install
pnpm start      # 本地预览 http://localhost:3000
pnpm build      # 生产构建
pnpm serve      # 预览构建结果
```

## 新增文档库

1. 在 `packages/` 下新建目录，参照现有子包添加 `package.json`、`sidebars.ts`、`docs/`。
2. 在 `website/docusaurus.config.ts` 的 `docPackages` 数组中注册新库。
3. 在 `website/src/pages/index.tsx` 首页卡片中补充入口（可选）。
