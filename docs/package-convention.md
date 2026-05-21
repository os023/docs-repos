# 文档包规范

`packages/<name>/` 下的每个文档子包**必须**声明所记录项目的三条官方地址。

## 必填字段

在子包 `package.json` 中设置 `officialLinks` 对象：

| 字段 | 说明 |
|------|------|
| `website` | 项目**官方网站**（产品主页、品牌站） |
| `documentation` | **官方文档**入口（厂商维护的文档站根路径或入门页） |
| `repository` | **官方代码仓库**（通常为 GitHub / GitLab 主仓库） |

示例：

```json
{
  "name": "@docs/prisma",
  "private": true,
  "description": "Prisma 中文文档",
  "officialLinks": {
    "website": "https://www.prisma.io",
    "documentation": "https://www.prisma.io/docs",
    "repository": "https://github.com/prisma/prisma"
  }
}
```

## 文档页展示

每个子包的 `docs/intro.md`（或首页文档）须包含 **「官方链接」** 小节，以表格或列表形式列出上述三项，并与 `package.json` 保持一致。

## 校验

在仓库根目录执行：

```bash
pnpm validate
```

脚本会扫描 `packages/*`（跳过 `_template`），检查 `officialLinks` 是否存在且三项均为合法 `http(s)` URL。

## 新增文档包

1. 复制 `packages/_template/` 为新目录。
2. 填写真实的 `officialLinks` 与 `docs/intro.md` 中的官方链接表。
3. 在 `website/docusaurus.config.ts` 注册插件，并更新首页数据（若使用 `website/src/data/doc-packages.ts`）。
