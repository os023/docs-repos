# 主题

OpenCode TUI 支持多款内置主题、跟随终端配色的 **`system`** 主题，以及基于 JSON 的自定义主题。细节以 [官方文档 · Themes](https://opencode.ai/docs/themes) 为准。

## 终端要求

主题完整色板依赖终端 **真彩色（24-bit）** 支持：

```bash
echo $COLORTERM   # 期望输出 truecolor 或 24bit
```

若终端仅支持 256 色，主题可能退化为近似色。可在 shell 配置中设置 `export COLORTERM=truecolor`（视终端而定）。常见支持真彩色的终端包括 iTerm2、Alacritty、Kitty、Windows Terminal 及较新的 GNOME Terminal。

## 内置主题

默认使用 OpenCode 自有 **`opencode`** 主题。其他内置主题示例：

| 名称 | 说明 |
|------|------|
| `system` | 随终端背景与 ANSI 色自适应 |
| `tokyonight` | [Tokyonight](https://github.com/folke/tokyonight.nvim) |
| `everforest` | [Everforest](https://github.com/sainnhe/everforest) |
| `catppuccin` / `catppuccin-macchiato` | [Catppuccin](https://github.com/catppuccin) |
| `gruvbox` | [Gruvbox](https://github.com/morhetz/gruvbox) |
| `nord` | [Nord](https://github.com/nordtheme/nord) |
| `one-dark` | Atom One Dark 风格 |
| `matrix` | 黑客风绿字黑底 |

官方会持续增加主题；完整列表以 [Themes · Built-in](https://opencode.ai/docs/themes#built-in-themes) 为准。

## 选择主题

- **TUI 内**：执行 `/theme` 打开主题选择器。
- **配置文件**：在 `tui.json` 中设置 `theme` 字段（见 [配置文件](config)）：

```json
{
  "$schema": "https://opencode.ai/tui.json",
  "theme": "tokyonight"
}
```

## system 主题

`system` 会根据终端背景生成灰阶、使用 ANSI 0–15 做语法高亮，并将文本/背景设为 `"none"` 以保留终端原生配色。适合：

- 希望 OpenCode 与终端配色一致；
- 使用自定义终端配色方案；
- 追求各 CLI 工具视觉统一。

## 自定义主题

主题 JSON 可从多处加载，**后加载目录覆盖同名主题**：

1. 内置（编译进二进制）
2. 用户：`~/.config/opencode/themes/*.json` 或 `$XDG_CONFIG_HOME/opencode/themes/`
3. 项目：`<git 根>/.opencode/themes/*.json`
4. 当前工作目录：`./.opencode/themes/*.json`

### 创建步骤

用户级：

```bash
mkdir -p ~/.config/opencode/themes
# 编辑 ~/.config/opencode/themes/my-theme.json
```

项目级：

```bash
mkdir -p .opencode/themes
# 编辑 .opencode/themes/my-theme.json
```

### JSON 格式要点

- 使用 `"$schema": "https://opencode.ai/theme.json"`
- 颜色可为十六进制、`"none"`（继承终端默认）、ANSI 编号，或在 `defs` 中定义复用色
- `theme` 段中许多键支持 `{"dark": "...", "light": "..."}` 变体

完整示例见 [官方 Custom themes](https://opencode.ai/docs/themes#custom-themes)。

## 阅读顺序

1. 确认终端真彩色后，用 `/theme` 试用内置主题。
2. 需团队统一视觉时，将主题 JSON 放入 `.opencode/themes/` 并提交仓库。
3. 键位与主题无关的配置见 [快捷键](keybinds)、[配置文件](config)。

## 下一步

- 配置 Leader 与快捷键：[快捷键](keybinds)。
- 返回 [定制](.) 章导航。

## 官方参考

- [Themes](https://opencode.ai/docs/themes)
- [Theme schema](https://opencode.ai/theme.json)
