# 概览

本节说明 OpenCode 的产品定位、可用形态与使用先决条件，便于在安装前先建立整体认识。内容结构对照 [官方文档 · Intro](https://opencode.ai/docs)。

## OpenCode 是什么？

[OpenCode](https://opencode.ai/) 是一款**开源 AI 编程助手**（coding agent），在本地终端或 IDE 中与 LLM 协作，可理解项目结构、回答问题、制定计划并直接修改代码。与仅提供聊天的工具不同，OpenCode 面向**真实代码库**上的开发与重构场景。

## 可用形态

| 形态 | 说明 |
|------|------|
| **终端 TUI** | 在现代化终端中运行 `opencode`，通过文本界面提问、切换 Plan/Build 模式并执行 `/init`、`/share` 等命令 |
| **桌面应用** | 图形界面版本，适合不习惯纯终端交互的用户 |
| **IDE 扩展** | 在编辑器内集成 OpenCode 能力，与日常编码工作流衔接 |

本中文笔记以**终端 TUI** 为主线展开；桌面与 IDE 形态的交互细节以 [官方文档](https://opencode.ai/docs) 为准。

## 先决条件

在终端中使用 OpenCode 前，建议准备：

### 现代化终端

推荐使用支持良好渲染与键位绑定的终端，例如：

- [WezTerm](https://wezterm.org/)（跨平台）
- [Alacritty](https://alacritty.org/)（跨平台）
- [Ghostty](https://ghostty.org/)（Linux / macOS）
- [Kitty](https://sw.kovidgoyal.net/kitty/)（Linux / macOS）

### LLM 提供商 API Key

OpenCode 需连接至少一家 LLM 提供商。新手可优先使用团队维护的 [OpenCode Zen](https://opencode.ai/docs/zen) 模型列表；也可在 TUI 中通过 `/connect` 配置其他厂商密钥，详见 [配置](../config)。

## 阅读路径

| 顺序 | 章节 | 目标 |
|------|------|------|
| 1 | [安装](../setup) | 获取 `opencode` 可执行文件 |
| 2 | [配置](../config) | 绑定 API Key 或 OpenCode Zen |
| 3 | [初始化](../init) | 为当前项目生成 `AGENTS.md` |
| 4 | [使用指南](../usage) | 提问、规划与改代码 |
| 5 | [分享](../share) / [定制](../customize) | 协作分享与个性化设置 |

返回 [文档首页](..)。
