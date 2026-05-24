# 配置文件

OpenCode 通过 **JSON / JSONC** 配置文件管理模型、提供商、权限、格式化器、自定义命令等运行时行为；TUI 外观与键位则使用独立的 **`tui.json`**。细节以 [官方文档 · Config](https://opencode.ai/docs/config) 为准。

## 文件格式

支持 `.json` 与带注释的 `.jsonc`，建议包含 schema 以便编辑器补全：

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "autoupdate": true
}
```

TUI 专用配置示例：

```json
{
  "$schema": "https://opencode.ai/tui.json",
  "theme": "tokyonight"
}
```

## 配置位置与合并

多个来源的配置会 **合并**（非整体替换）：仅冲突键由优先级更高的来源覆盖，其余键保留。

| 优先级（低 → 高） | 位置 | 典型用途 |
|-------------------|------|----------|
| 1 | 远程 `.well-known/opencode` | 组织默认（认证后自动拉取） |
| 2 | 全局 `~/.config/opencode/opencode.json` | 用户级模型、提供商、权限 |
| 3 | 环境变量 `OPENCODE_CONFIG` | 自定义配置文件路径 |
| 4 | 项目根 `opencode.json` | 仓库级覆盖（可提交 Git） |
| 5 | `.opencode/` 目录 | `agents/`、`commands/`、`plugins/` 等 |
| 6 | `OPENCODE_CONFIG_CONTENT` | 运行时内联 JSON |
| 7+ | 系统托管目录 / macOS MDM | 企业强制策略，用户不可改 |

启动时 OpenCode 会在当前目录向上查找 `opencode.json`，直至最近的 Git 根目录。

### 全局与项目

| 文件 | 路径 |
|------|------|
| 全局运行时 | `~/.config/opencode/opencode.json` |
| 全局 TUI | `~/.config/opencode/tui.json` |
| 项目运行时 | `<项目根>/opencode.json` |
| 项目 TUI | `<项目根>/tui.json` |

### 自定义目录

通过 `OPENCODE_CONFIG_DIR` 指定额外配置目录，其下的 `agents/`、`commands/` 等与标准 `.opencode` 结构相同，可覆盖更早层级的同名资源。

## 常用字段（索引）

完整字段以官方 schema 为准。中文笔记中常涉及的段包括：

| 字段 | 说明 |
|------|------|
| `model` | 默认 LLM 模型 |
| `provider` | 各厂商 `baseURL`、选项等（见 [LLM 提供商要点](../config/providers)） |
| `formatter` | 是否启用及覆盖内置格式化器（见 [格式化器](formatters)） |
| `command` | JSON 形式自定义斜杠命令（见 [自定义命令](commands)） |
| `share` | 对话分享策略（见 [分享](../share)） |
| `mcp` | MCP 服务器列表与启用状态 |
| `permission` | 工具调用、文件访问等权限策略 |

连接提供商仍推荐在 TUI 使用 `/connect`；`provider` 段多用于代理或自建端点，见 [配置](../config)。

## 与定制子页的关系

| 主题 | 配置文件 |
|------|----------|
| 主题名、自定义主题 JSON | `tui.json` 的 `theme`；主题文件见 [主题](themes) |
| 快捷键 | `tui.json` 的 `keybinds`（见 [快捷键](keybinds)） |
| 格式化器开关与命令 | `opencode.json` 的 `formatter`（见 [格式化器](formatters)） |
| 斜杠命令 | `opencode.json` 的 `command` 或 `.opencode/commands/*.md`（见 [自定义命令](commands)） |

## 阅读顺序

1. 若尚未连接 LLM，先完成 [配置](../config) 中的 `/connect`。
2. 确定要全局还是项目级覆盖后，编辑对应 `opencode.json`。
3. 仅改 TUI 外观或键位时，编辑 `tui.json` 并参阅 [主题](themes)、[快捷键](keybinds)。

## 下一步

- 调整界面与键位：[主题](themes)、[快捷键](keybinds)。
- 返回 [定制](.) 章导航。

## 官方参考

- [Config](https://opencode.ai/docs/config)
- [Config schema](https://opencode.ai/config.json)
- [TUI schema](https://opencode.ai/tui.json)
