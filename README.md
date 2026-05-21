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
    ├── midscene/
    └── frp/
```

每个 `packages/<name>/` 子包包含：

- `docs/` — Markdown 文档
- `sidebars.ts` — 该库的侧边栏配置
- `package.json` — workspace 成员标识（`@docs/<name>`），且**必须**包含 `officialLinks`（官方网站、官方文档、代码仓库）

详细规范见 [docs/package-convention.md](./docs/package-convention.md)。

主站通过多个 `@docusaurus/plugin-content-docs` 实例，将各子包文档挂载到独立路由（如 `/prisma/...`）。

## 开发

```bash
pnpm install
pnpm start      # 本地预览 http://localhost:3000
pnpm build      # 生产构建
pnpm serve      # 预览构建结果
```

## 校验与构建

```bash
pnpm validate   # 检查各文档包的 officialLinks 是否齐全
pnpm build      # 构建前会自动执行 validate
```

## 新增文档库

1. 复制 `packages/_template/` 为新目录，填写真实的 `officialLinks` 与 `docs/intro.md` 官方链接表。
2. 在 `website/docusaurus.config.ts` 的 `docPackages` 数组中注册新库。
3. 在 `website/src/data/doc-packages.ts` 中同步首页展示数据。
