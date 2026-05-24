# 定制

本节索引 OpenCode 的个性化能力：全局/项目级配置文件、主题、快捷键、代码格式化器与自定义斜杠命令。各子主题的字段与示例以官方专题页为准。

## 本章导航

| 页面 | 内容 |
|------|------|
| [配置文件](config) | `opencode.json` / `tui.json` 位置、合并优先级与常用字段 |
| [主题](themes) | 内置主题、`system` 自适应、自定义 JSON 主题 |
| [快捷键](keybinds) | `tui.json` 中的 `keybinds`、Leader 键与禁用绑定 |
| [格式化器](formatters) | 写入/编辑后自动格式化、内置列表与 `formatter` 配置 |
| [自定义命令](commands) | Markdown / JSON 定义斜杠命令、占位符与内置命令 |

## 推荐阅读顺序

1. 先阅读 [配置文件](config)，弄清全局 `~/.config/opencode/` 与项目根 `opencode.json` 的合并关系。
2. 按需调整 [主题](themes) 与 [快捷键](keybinds)（均在 `tui.json` 或主题目录）。
3. 若希望 Agent 改码后自动跑 Prettier 等工具，启用 [格式化器](formatters)。
4. 将团队常用提示词固化为 [自定义命令](commands)，放在 `.opencode/commands/` 或配置 `command` 段。

建议先确定日常使用的终端与编辑器，再按需调整主题与键位，最后配置格式化器与常用命令以贴合团队规范。

## 与其他章节的关系

| 场景 | 参见 |
|------|------|
| 连接 LLM、`provider` 段 | [配置](../config) |
| `/init`、`AGENTS.md` | [初始化](../init) |
| `/undo`、`/redo`、Plan/Build | [使用指南](../usage) |
| `/share` 与 `share` 字段 | [分享](../share) |

## 下一步

- 回到日常编码协作，阅读 [使用指南](../usage)。
- 首次使用 OpenCode 时，从 [概览](../overview) 与 [安装](../setup) 开始。

## 官方参考

- [Config](https://opencode.ai/docs/config)
- [Themes](https://opencode.ai/docs/themes)
- [Keybinds](https://opencode.ai/docs/keybinds)
- [Formatters](https://opencode.ai/docs/formatters)
- [Commands](https://opencode.ai/docs/commands)
