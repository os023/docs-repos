# AGENTS.md

## Cursor Cloud specific instructions

Docusaurus 中文文档 monorepo（pnpm workspace）。

### 环境

- **Node.js**: >= 20（VM 预装 v22）
- **包管理器**: pnpm（根目录 `packageManager` 字段锁定版本）

### 常用命令

在仓库根目录执行：

| 命令 | 说明 |
|------|------|
| `pnpm install` | 安装全部 workspace 依赖 |
| `pnpm start` | 启动开发服务器（`website`，默认 http://localhost:3000） |
| `pnpm build` | 生产构建 |
| `pnpm serve` | 预览构建产物 |
| `pnpm clear` | 清理 Docusaurus 缓存 |

### 目录约定

- `website/` — 主站 Docusaurus 应用，在 `docusaurus.config.ts` 中注册各文档插件
- `packages/<name>/` — 各库文档子包（`docs/` + `sidebars.ts`）

### 文档包规范（必遵）

每个 `packages/<name>/` 子包的 `package.json` **必须**包含 `officialLinks`：

- `website` — 官方网站
- `documentation` — 官方文档
- `repository` — 官方代码仓库

`docs/intro.md` 须含「官方链接」小节，与 `package.json` 一致。完整说明见 `docs/package-convention.md`。

新增文档库时：

1. 从 `packages/_template/` 复制并填写 `officialLinks`
2. 更新 `website/docusaurus.config.ts` 中的 `docPackages`
3. 更新 `website/src/data/doc-packages.ts` 首页元数据
4. 运行 `pnpm validate` 通过后再构建

### 构建验证

`pnpm build` 应无错误完成；`onBrokenLinks` 已设为 `throw`，请勿保留失效内部链接。
