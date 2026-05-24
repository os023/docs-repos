# 安装

本节说明在 macOS、Linux 与 Windows 上获取 OpenCode 可执行文件的常用方式。内容以中文笔记为主，细节以 [官方文档 · Install](https://opencode.ai/docs#install) 为准。

## 本章导航

| 页面 | 内容 |
|------|------|
| [安装方式详解](install) | 安装脚本、Node 包管理器、Homebrew、Arch、Windows、Docker 与 Release 二进制 |

建议先阅读 [概览](../overview) 确认终端与 API Key 等先决条件，再按上表进入 [安装方式详解](install) 选择适合本机的安装路径。

## 推荐阅读顺序

1. **[安装方式详解](install)** — 按平台选择一种方式完成安装，并用 `opencode --version` 验证。
2. **[配置](../config)** — 在 TUI 中执行 `/connect`，绑定 OpenCode Zen 或其他 LLM 提供商。
3. **[初始化](../init)** — 进入项目目录运行 `opencode`，执行 `/init` 生成 `AGENTS.md`。

若已安装但命令不可用，优先对照 [安装方式详解](install#安装后验证) 中的 PATH 与版本检查；需要了解产品形态时，返回 [概览](../overview)。

## 方式速览

| 方式 | 适用场景 |
|------|----------|
| **安装脚本** | 最快上手：`curl -fsSL https://opencode.ai/install \| bash` |
| **npm / Bun / pnpm / Yarn** | 已安装 Node.js 生态时全局安装 `opencode-ai` |
| **Homebrew** | macOS / Linux：推荐 `anomalyco/tap` 获取较新版本 |
| **Arch Linux** | `pacman` 稳定包或 AUR 最新构建 |
| **Windows** | Chocolatey、Scoop、npm 或 Mise 等 |
| **Docker** | 容器内一次性体验：`ghcr.io/anomalyco/opencode` |
| **Release 二进制** | 从 [GitHub Releases](https://github.com/anomalyco/opencode/releases) 直接下载 |

各方式的命令示例、版本提示与注意事项见 [安装方式详解](install)。

## 下一步

- 安装完成后，阅读 [配置](../config) 连接 LLM 提供商。
- 需要了解终端要求与产品形态时，阅读 [概览](../overview)。
