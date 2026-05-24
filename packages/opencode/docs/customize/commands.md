# 自定义命令

除 `/init`、`/undo`、`/redo`、`/share`、`/help` 等内置斜杠命令外，OpenCode 支持通过 **Markdown 文件** 或 **`opencode.json` 的 `command` 段** 定义自定义命令。在 TUI 输入 `/命令名` 即可执行。细节以 [官方文档 · Commands](https://opencode.ai/docs/commands) 为准。

## 存放位置

| 范围 | 路径 |
|------|------|
| 全局 | `~/.config/opencode/commands/*.md` |
| 项目 | `.opencode/commands/*.md` |
| JSON 配置 | `opencode.json` 的 `command` 对象（见 [配置文件](config)） |

文件名（不含扩展名）即命令名，例如 `test.md` → `/test`。

## Markdown 定义

`.opencode/commands/test.md` 示例：

```markdown
---
description: 运行测试并查看覆盖率
agent: build
model: anthropic/claude-sonnet-4-5
---

运行完整测试套件并输出覆盖率报告。
若有失败用例，列出失败原因并建议修复。
```

Frontmatter 描述元数据；正文作为发给 LLM 的提示模板。在 TUI 中输入 `/test` 执行。

## JSON 定义

等价配置可写在 `opencode.json`：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "command": {
    "test": {
      "template": "运行完整测试套件并输出覆盖率报告。\n若有失败用例，列出失败原因并建议修复。",
      "description": "运行测试并查看覆盖率",
      "agent": "build",
      "model": "anthropic/claude-sonnet-4-5"
    }
  }
}
```

## 模板占位符

| 占位符 | 说明 |
|--------|------|
| `$ARGUMENTS` | 命令后的全部参数（空格连接） |
| `$1`、`$2`、`$3`… |  positional 参数 |
| `` !`command` `` | 执行 shell 并将输出注入提示（项目根目录下运行） |
| `@path/to/file` | 将文件内容并入提示 |

示例：创建组件 `/component Button` 时，`$ARGUMENTS` 替换为 `Button`。

```markdown
---
description: 创建新组件
---

创建名为 $ARGUMENTS 的 React 组件，使用 TypeScript，包含基础类型与目录结构。
```

引用最近提交：

```markdown
---
description: 审查最近提交
---

最近提交：
!`git log --oneline -10`

请审查上述变更并提出改进建议。
```

## 配置项

| 字段 | 必填 | 说明 |
|------|------|------|
| `template` | 是 | 发给 LLM 的提示正文 |
| `description` | 否 | TUI 命令列表中的说明 |
| `agent` | 否 | 指定执行的 [Agent](https://opencode.ai/docs/agents)；默认当前 Agent |
| `model` | 否 | 覆盖该次命令使用的模型 |
| `subtask` | 否 | `true` 时强制以子 Agent 执行，避免污染主会话上下文 |

## 与内置命令的关系

自定义命令与内置命令并存；若 **同名**，自定义定义会 **覆盖** 内置命令。内置命令说明见 [官方 TUI · Commands](https://opencode.ai/docs/tui#commands) 及本仓库 [使用指南](../usage)、[分享](../share)、[初始化](../init)。

## 阅读顺序

1. 将团队重复使用的检查清单写成 `.opencode/commands/*.md` 并提交仓库。
2. 需与 `provider`、`formatter` 等同文件管理时，改用 `opencode.json` 的 `command` 段。
3. 键位可绑定到命令列表：`ctrl+p`（默认 `command_list`），见 [快捷键](keybinds)。

## 下一步

- 返回 [定制](.) 章导航。
- 日常协作流程见 [使用指南](../usage)。

## 官方参考

- [Commands](https://opencode.ai/docs/commands)
- [TUI · Commands](https://opencode.ai/docs/tui#commands)
- [Agents](https://opencode.ai/docs/agents)
