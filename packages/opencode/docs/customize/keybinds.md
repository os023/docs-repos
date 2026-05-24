# 快捷键

OpenCode TUI 的键位通过 **`tui.json`** 中的 `keybinds` 对象配置，支持 Leader 组合键、多快捷键、禁用绑定等。细节以 [官方文档 · Keybinds](https://opencode.ai/docs/keybinds) 为准。

## 配置文件

键位写在 `~/.config/opencode/tui.json` 或项目根 `tui.json`（见 [配置文件](config)）。最小示例：

```json
{
  "$schema": "https://opencode.ai/tui.json",
  "leader_timeout": 2000,
  "keybinds": {
    "leader": "ctrl+x",
    "session_new": "<leader>n",
    "theme_list": "<leader>t"
  }
}
```

完整默认键位列表以 [官方 Keybinds 示例](https://opencode.ai/docs/keybinds) 为准。

## Leader 键

默认 **Leader** 为 `ctrl+x`。许多操作需先按 Leader，再按第二键，例如 `<leader>n` 新建会话，以降低与终端自带快捷键冲突的概率。

`leader_timeout` 控制按下 Leader 后等待下一键的毫秒数，默认 **2000**。

部分导航键（如子 Agent 会话的 `session_child_cycle`）默认 **不使用** Leader，便于快速切换。

## 绑定值格式

| 形式 | 说明 |
|------|------|
| 字符串 | 单个快捷键，或多个逗号分隔等价键，如 `"ctrl+c,ctrl+d"` |
| 数组 | 多个等价快捷键 |
| 对象 | `{ "key": "ctrl+v", "preventDefault": false }` 等高级控制 |
| `"none"` 或 `false` | 禁用该绑定 |

禁用示例：

```json
{
  "$schema": "https://opencode.ai/tui.json",
  "keybinds": {
    "session_compact": "none"
  }
}
```

## 常用默认动作（摘录）

以下为便于记忆的摘录，完整表以官方文档为准：

| 键位 | 动作 |
|------|------|
| `ctrl+p` | 命令列表 `command_list` |
| `<leader>n` | 新建会话 `session_new` |
| `<leader>l` | 会话列表 `session_list` |
| `<leader>m` | 模型列表 `model_list` |
| `<leader>a` | Agent 列表 `agent_list` |
| `<leader>u` / `<leader>r` | 消息撤销/重做（对应 `/undo`、`/redo` 类操作） |
| `tab` / `shift+tab` | 切换 Agent `agent_cycle` |
| `escape` | 中断当前会话 `session_interrupt` |

与 [使用指南](../usage) 中的 Plan/Build 切换（**Tab**）为 TUI 模式切换，与 `keybinds` 中的 Agent 循环不同，请勿混淆。

## Windows 注意事项

- 未显式配置时，`input_undo` 默认可能包含 `ctrl+z`（因 Windows 终端不支持 POSIX 挂起）。
- `terminal_suspend` 在 Windows 上强制为 `none`。
- 若终端不把 **Shift+Enter** 传给应用，需在 Windows Terminal 等中配置发送转义序列；步骤见 [官方 Shift+Enter](https://opencode.ai/docs/keybinds#shiftenter)。

## 桌面端提示框快捷键

OpenCode **桌面应用**的输入框内置 Emacs/Readline 风格快捷键（如 `ctrl+a` 行首、`ctrl+k` 删至行尾），**目前不能**通过 `opencode.json` 修改，与 TUI `keybinds` 分开。

## 阅读顺序

1. 先使用默认键位熟悉 TUI，再按需覆盖 `tui.json`。
2. 与主题一并调整时，参阅 [主题](themes)。
3. 自定义工作流可结合 [自定义命令](commands)。

## 下一步

- 启用保存后自动格式化：[格式化器](formatters)。
- 返回 [定制](.) 章导航。

## 官方参考

- [Keybinds](https://opencode.ai/docs/keybinds)
- [TUI schema](https://opencode.ai/tui.json)
