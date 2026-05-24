# 格式化器

OpenCode 可在 Agent **写入或编辑文件后** 按语言调用对应格式化工具。格式化器 **默认关闭**，须在 `opencode.json` 中启用。细节以 [官方文档 · Formatters](https://opencode.ai/docs/formatters) 为准。

## 工作流程

启用后，每次改文件时 OpenCode 会：

1. 根据扩展名匹配已启用的格式化器；
2. 在后台执行对应命令；
3. 将格式化结果写回文件。

## 内置格式化器（摘录）

官方内置多种语言格式化器；下表为常见条目，完整列表见 [Built-in](https://opencode.ai/docs/formatters#built-in)。

| 格式化器 | 扩展名（示例） | 要求 |
|----------|----------------|------|
| `prettier` | `.js`、`.ts`、`.md`、`.json` 等 | `package.json` 中含 `prettier` 依赖 |
| `biome` | 与 Prettier 类似的多类前端文件 | 存在 `biome.json(c)` |
| `gofmt` / `cargofmt` / `rustfmt` | `.go` / `.rs` | 对应 CLI 可用 |
| `ruff` / `uv` | `.py`、`.pyi` | `ruff` 等工具与配置 |
| `ktlint` | `.kt`、`.kts` | `ktlint` 命令可用 |
| `rubocop` / `standardrb` | `.rb` 等 | 对应 Ruby 工具 |
| `terraform` | `.tf`、`.tfvars` | `terraform` CLI |
| `shfmt` | `.sh`、`.bash` | `shfmt` 命令可用 |

当多个格式化器匹配时，例如前端项目若 `package.json` 含 `prettier`，会优先使用 `prettier`。

## 启用与配置

在 `opencode.json`（见 [配置文件](config)）中设置 `formatter` 段。

**启用全部内置格式化器：**

```json
{
  "$schema": "https://opencode.ai/config.json",
  "formatter": true
}
```

**保留内置并覆盖或新增：**

```json
{
  "$schema": "https://opencode.ai/config.json",
  "formatter": {
    "prettier": {
      "command": ["npx", "prettier", "--write", "$FILE"],
      "extensions": [".js", ".ts", ".jsx", ".tsx"]
    }
  }
}
```

| 属性 | 说明 |
|------|------|
| `disabled` | `true` 时禁用该格式化器 |
| `command` | 命令数组；`$FILE` 替换为当前文件路径（自定义格式化器必填） |
| `environment` | 执行时的环境变量 |
| `extensions` | 处理的文件扩展名列表 |

**全部关闭：** 省略 `formatter` 或设为 `false`：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "formatter": false
}
```

**禁用单个内置项：**

```json
{
  "formatter": {
    "prettier": { "disabled": true }
  }
}
```

部分实验性格式化器（如 `oxfmt`）需配合官方 [CLI 实验性标志](https://opencode.ai/docs/cli/#experimental)。

## 阅读顺序

1. 确认本机已安装目标语言的格式化 CLI 或项目依赖。
2. 在 `opencode.json` 启用 `formatter` 后，让 Agent 修改文件并观察是否自动格式化。
3. 团队规范可通过项目级 `opencode.json` 提交到 Git。

## 下一步

- 将常用提示词固化为斜杠命令：[自定义命令](commands)。
- 返回 [定制](.) 章导航。

## 官方参考

- [Formatters](https://opencode.ai/docs/formatters)
