# 配置

本节说明如何在 OpenCode TUI 中连接 LLM 提供商：通过 `/connect` 选择 [OpenCode Zen](https://opencode.ai/docs/zen) 或其他厂商、在官网获取并粘贴 API Key。细节以 [官方文档 · Configure](https://opencode.ai/docs#configure) 为准。

## 本章导航

| 页面 | 内容 |
|------|------|
| [LLM 提供商要点](providers) | 凭据存储、`provider` 配置、Zen/Go 与主流厂商接入摘要 |

## 先决条件

- 已完成 [安装](../setup)，终端可执行 `opencode`。
- 准备好至少一家 LLM 提供商的 API Key，或打算使用 OpenCode 团队维护的 [OpenCode Zen](https://opencode.ai/docs/zen)（推荐新手）。

## 使用 `/connect` 连接提供商

在 TUI 中输入斜杠命令打开连接向导：

```txt
/connect
```

向导会列出可用提供商。常见选择：

| 选项 | 适用场景 |
|------|----------|
| **OpenCode Zen**（列表中可能显示为 `opencode`） | 新手首选：经团队验证的精选模型列表 |
| **OpenCode Go** | 低成本订阅，访问经验证的开源编码模型 |
| **其他厂商** | 已有 Anthropic、OpenAI、Groq 等账号时直接接入 |

选定提供商后，TUI 会提示输入 API Key（见下一节）。连接成功后，可用 `/models` 查看并切换该提供商下的模型。

## OpenCode Zen（推荐新手） {#opencode-zen}

若你刚接触 LLM 提供商，官方建议使用 **OpenCode Zen**：模型列表由 OpenCode 团队测试验证，与 TUI 协作体验一致。

1. 在 TUI 执行 `/connect`，选择 **OpenCode Zen**（或 `opencode`）。
2. 按提示打开 [opencode.ai/auth](https://opencode.ai/auth)（Zen 说明见 [OpenCode Zen](https://opencode.ai/docs/zen)）。
3. 登录账号，完成计费信息填写，复制页面上的 **API Key**。
4. 回到 TUI，在 API Key 输入框中粘贴密钥并按 Enter 确认。
5. 执行 `/models`，从推荐列表中选择要使用的模型。

Zen 与其他提供商一样完全可选；配置一次后，后续启动 OpenCode 会自动使用已保存的凭据。

## 粘贴 API Key

无论选择 Zen 还是其他厂商，粘贴流程相同。TUI 会显示类似界面：

```txt
┌ API key
│
│
└ enter
```

将密钥粘贴到输入区后按 **Enter**。请勿将 API Key 提交到版本库；OpenCode 会将凭据保存在本机（见 [凭据存储](providers#凭据存储)）。

若需更换密钥，可再次运行 `/connect` 选择同一提供商并覆盖保存的值。

## 连接其他提供商

除 Zen 外，OpenCode 通过 [AI SDK](https://ai-sdk.dev/) 与 [Models.dev](https://models.dev/) 支持 75+ 家 LLM 提供商。接入步骤通常为：

1. 在厂商控制台创建 API Key（或按文档配置 OAuth / 环境变量）。
2. TUI 中执行 `/connect`，搜索并选择对应提供商。
3. 按提示粘贴密钥或完成认证。
4. 执行 `/models` 选择模型。

各厂商的特殊要求（如 Amazon Bedrock 的 AWS 配置、GitHub Copilot 的 OAuth）见 [LLM 提供商要点](providers)。

## 推荐阅读顺序

1. 按上文完成 **Zen 或首选厂商** 的 `/connect` 与 API Key 粘贴。
2. 需要对比多家厂商或自定义 `baseURL` 时，阅读 [LLM 提供商要点](providers)。
3. 进入目标仓库，阅读 [初始化](../init) 执行 `/init`。

## 下一步

- 进入项目目录并生成 `AGENTS.md`，阅读 [初始化](../init)。
- 浏览厂商目录与高级配置，阅读 [LLM 提供商要点](providers)。
- 若尚未安装，返回 [安装](../setup)。

## 官方参考

- [Configure（入门）](https://opencode.ai/docs#configure)
- [Providers](https://opencode.ai/docs/providers)
- [OpenCode Zen](https://opencode.ai/docs/zen)
