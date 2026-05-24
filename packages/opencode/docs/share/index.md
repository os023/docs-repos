# 分享

本节说明如何在 OpenCode 中将当前对话生成可分享的公开链接，便于团队协作、求助与复盘。细节以 [官方文档 · Share](https://opencode.ai/docs/share) 为准。

## 先决条件

- 已在 TUI 中完成至少一轮对话（有会话内容可分享）。
- 团队若禁止外发对话，请在项目 `opencode.json` 中将 `share` 设为 `disabled`（见下文「分享模式」）。

## 使用 `/share` 生成链接

在 TUI 中输入：

```txt
/share
```

OpenCode 会：

1. 为**当前会话**创建唯一的公开 URL；
2. 将对话历史同步到 OpenCode 服务端；
3. 把链接**复制到剪贴板**，可直接粘贴给同事。

链接形式类似 `https://opncd.ai/s/<id>`（亦可能显示为 `opencode.ai/s/...`，以 TUI 实际输出为准）。收到链接的人**无需安装 OpenCode** 即可在浏览器中查看该次对话的上下文。

官方 [示例对话](https://opencode.ai/s/4XP1fce5) 可预览分享页的展示效果。

## 对话链接能做什么

| 能力 | 说明 |
|------|------|
| **查看完整上下文** | 消息、回复与协作过程对持有链接者可见 |
| **减少重复说明** | 队友无需你口头复述「我让它改了什么、它怎么回的」 |
| **异步协作** | 适合 Code Review 前讨论、排错时把 TUI 对话甩给熟悉模块的人 |

分享的是**对话记录**，不是把整个 Git 仓库托管出去；仓库权限、API Key 等仍由本机与环境变量管控，勿在对话里粘贴密钥。

## 停止分享：`/unshare`

若不再需要公开访问，在 TUI 输入：

```txt
/unshare
```

会移除该会话的分享链接，并删除服务端上与此分享相关的数据。协作结束后建议执行，尤其是对话里曾讨论过内部实现细节时。

## 分享模式（配置）

除默认的「手动 `/share`」外，可在项目根 `opencode.json` 中设置 `share` 字段（字段说明见 [配置文件](../customize/config) 与 [定制](../customize) 章）：

| 值 | 行为 |
|----|------|
| `manual`（默认） | 不自动分享；需要时用 `/share` |
| `auto` | 每个新会话自动分享并生成链接 |
| `disabled` | 完全禁止分享；团队可在仓库中提交该配置以统一策略 |

示例（手动模式，与默认一致）：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "share": "manual"
}
```

自动分享：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "share": "auto"
}
```

禁用分享：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "share": "disabled"
}
```

## 隐私与安全建议

- 持有链接者均可访问，**视为公开内容**；勿分享含 API Key、客户数据、未公开商业逻辑的会话。
- 分享前快速浏览对话；协作结束后使用 `/unshare`。
- 涉密或专有代码项目，优先在配置中使用 `share: "disabled"`，或由企业部署限制分享能力（见 [官方 Enterprise 说明](https://opencode.ai/docs/enterprise)）。

分享保留的数据通常包括：完整对话历史、消息与回复、会话元数据，直至你 `/unshare` 或按平台策略清理。

## 与使用指南的关系

日常开发仍以 [使用指南](../usage) 中的提问、Plan/Build 与 `/undo` 为主；分享是**可选**的协作能力，不影响本地改代码流程。

## 推荐阅读顺序

1. 在 TUI 完成一段有意义的对话（例如一次 Plan + Build）。
2. 执行 `/share`，在浏览器打开剪贴板中的链接自检是否可接受对外展示。
3. 协作结束后执行 `/unshare`；若团队有合规要求，在 `opencode.json` 中设置 `share` 策略。

## 下一步

- 继续日常开发，返回 [使用指南](../usage)。
- 个性化界面、命令与 `opencode.json`，阅读 [定制](../customize)。

## 官方参考

- [Share](https://opencode.ai/docs/share)
- [示例对话](https://opencode.ai/s/4XP1fce5)
