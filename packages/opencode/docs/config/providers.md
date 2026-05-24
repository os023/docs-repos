# LLM 提供商要点

对照 [OpenCode 官方文档 · Providers](https://opencode.ai/docs/providers)，汇总多厂商接入的通用流程、凭据与配置方式，以及 [Directory](https://opencode.ai/docs/providers#directory) 中常见提供商的中文索引。完整字段与每家厂商的分步说明以官方英文页为准。

## 通用接入流程

OpenCode 基于 [AI SDK](https://ai-sdk.dev/) 与 [Models.dev](https://models.dev/)，支持 **75+** 家 LLM 提供商及本地模型。新增提供商通常只需两步：

1. 在 TUI 执行 `/connect`，添加该提供商的 API Key 或完成 OAuth。
2. 如需代理、自定义端点或项目级覆盖，在 OpenCode 配置文件的 `provider` 段中调整（见 [配置段](#配置段)）。

连接后使用 `/models` 选择模型；切换提供商无需重启 TUI，重新 `/connect` 或改配置即可。

## 凭据存储

通过 `/connect` 录入的 API Key 等凭据保存在本机：

```txt
~/.local/share/opencode/auth.json
```

请勿将该文件提交到 Git。在 CI 或无图形界面的环境中，部分提供商支持环境变量或配置文件中的认证方式，详见官方各子页。

## 配置段

可在 OpenCode 配置（如项目或用户目录下的 `opencode.json`）中通过 `provider` 自定义行为，例如为某厂商设置代理或自定义 **Base URL**：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "anthropic": {
      "options": {
        "baseURL": "https://api.anthropic.com/v1"
      }
    }
  }
}
```

适用于使用代理服务、私有部署或兼容 OpenAI 协议的自建端点。各厂商支持的 `options` 以 [官方 Providers · Config](https://opencode.ai/docs/providers#config) 为准。

## OpenCode Zen 与 OpenCode Go

| 服务 | 说明 | 连接方式 |
|------|------|----------|
| **[OpenCode Zen](https://opencode.ai/docs/zen)** | 团队验证的精选模型，适合新手 | `/connect` → 选择 Zen → [opencode.ai/auth](https://opencode.ai/auth) 获取 Key → 粘贴 → `/models` |
| **OpenCode Go** | 低成本订阅，经验证的开源编码模型 | 同上，在 `/connect` 中选择 OpenCode Go |

二者在 OpenCode 中的用法与其他提供商相同，均为可选项。Zen 的逐步说明亦见 [配置 · OpenCode Zen](.#opencode-zen)。

## Directory 索引（常见提供商）

官方 [Directory](https://opencode.ai/docs/providers#directory) 持续扩充。下表按类型归纳常见条目，便于快速定位；未列出的厂商请直接在官方目录中搜索或向仓库提交 PR。

### OpenCode 与聚合网关

| 提供商 | 要点 |
|--------|------|
| **OpenCode Zen / Go** | 见上表；推荐先用 Zen 熟悉 TUI |
| **OpenRouter** | 单 Key 访问多家模型；适合快速试验 |
| **Vercel AI Gateway** | 统一网关与路由 |
| **Helicone** | 可观测与代理；支持自定义 Header、Session 跟踪 |
| **LLM Gateway** | 多模型路由与计费抽象 |

### 主流商业 API

| 提供商 | 要点 |
|--------|------|
| **Anthropic** | Claude 系列；`/connect` 粘贴 API Key |
| **OpenAI** | GPT 系列；支持 API Key 等方式 |
| **Google Vertex AI** | GCP 项目与区域配置 |
| **Azure OpenAI / Azure Cognitive Services** | 资源名、部署名与 API 版本 |
| **Amazon Bedrock** | 需在控制台开通模型；支持环境变量、`opencode.json` 或 VPC 端点 |
| **Groq** | 低延迟推理；API Key 接入 |
| **xAI** | 支持 SuperGrok OAuth、设备码或 API Key |
| **Cerebras / Fireworks AI / Together AI** | 高性能或开源权重托管 |
| **DeepSeek / Moonshot AI / MiniMax** | 国内常用 API；按官方子页获取 Key |

### 开发与协作平台

| 提供商 | 要点 |
|--------|------|
| **GitHub Copilot** | 按官方说明完成 Copilot 认证 |
| **GitLab Duo** | OAuth（推荐）、PAT 或自建实例配置 |
| **SAP AI Core** | 企业级 SAP 环境 |

### 云与区域厂商

| 提供商 | 要点 |
|--------|------|
| **Cloudflare AI Gateway / Workers AI** | 边缘与网关场景 |
| **DigitalOcean** | OAuth、Model Access Key 或推理路由 |
| **OVHcloud / Scaleway / STACKIT** | 欧洲云 AI 端点 |
| **NVIDIA** | 云端 API 或本地 NIM / 环境变量 |
| **Baseten** | 模型部署与推理 |

### 本地与自托管

| 提供商 | 要点 |
|--------|------|
| **Ollama / Ollama Cloud** | 本机或云端拉取模型；适合离线或私有部署 |
| **LM Studio** | 本地 GUI 与 OpenAI 兼容端点 |
| **llama.cpp** | 直接对接 llama.cpp 服务 |
| **IO.NET** | 分布式算力场景 |

### 其他常见条目

官方目录还包括 **302.AI**、**Atomic Chat**、**Cortecs**、**Deep Infra**、**FrogBot**、**Hugging Face**、**Nebius Token Factory**、**Venice AI** 等。每家均有独立子页，说明 Key 获取、`/connect` 步骤及特殊认证（OAuth、AWS Profile、Bearer Token 等）。

## 认证方式速查

部分提供商除「粘贴 API Key」外还支持：

| 方式 | 典型场景 |
|------|----------|
| **环境变量** | 如 `AWS_ACCESS_KEY_ID`、`AWS_PROFILE`、`AWS_BEARER_TOKEN_BEDROCK` 配合 `opencode` 启动 |
| **配置文件 `provider`** | 项目级持久化 Bedrock、Vertex 等区域与端点 |
| **OAuth / 设备码** | GitLab Duo、DigitalOcean、xAI SuperGrok 等 |
| **自建 Base URL** | 私有网关、Helicone、兼容 OpenAI 的本地服务 |

具体优先级与字段名见各厂商官方子页（例如 Bedrock 的 [Authentication Precedence](https://opencode.ai/docs/providers#amazon-bedrock)）。

## 阅读顺序

1. 若尚未连接任何厂商，先阅读 [配置](.) 完成 `/connect` 与 API Key 粘贴。
2. 确定目标厂商后，在 [官方 Directory](https://opencode.ai/docs/providers#directory) 打开对应子页，按步骤获取 Key 或配置 OAuth。
3. 需要自定义端点或项目级覆盖时，编辑 `opencode.json` 的 `provider` 段（进阶定制见后续 [定制](../customize) 章节）。

## 下一步

- 凭据就绪后，进入仓库阅读 [初始化](../init)。
- 返回 [配置](.) 查看 Zen 推荐流程与 `/connect` 说明。

## 官方参考

- [Providers 总览](https://opencode.ai/docs/providers)
- [Directory](https://opencode.ai/docs/providers#directory)
- [OpenCode Zen](https://opencode.ai/docs/zen)
