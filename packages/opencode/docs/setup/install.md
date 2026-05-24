# 安装方式详解

对照 [OpenCode 官方文档 · Install](https://opencode.ai/docs#install)，汇总在 macOS、Linux 与 Windows 上获取 `opencode` 的常用命令与注意点。安装完成后请执行 [安装后验证](#安装后验证)，再继续 [配置](../config)。

## 方式一：安装脚本（推荐）

官方提供的一键脚本，适合多数 Unix 环境（macOS、Linux 及 WSL 等）：

```bash
curl -fsSL https://opencode.ai/install | bash
```

脚本会将 `opencode` 安装到用户可执行路径；若安装后终端提示找不到命令，请重新打开终端或检查 `PATH` 是否包含安装目录。

## 方式二：Node.js 包管理器

需已安装对应运行时。全局安装包名均为 **`opencode-ai`**，安装后在终端使用 `opencode` 命令。

### npm

```bash
npm install -g opencode-ai
```

### Bun

```bash
bun install -g opencode-ai
```

### pnpm

```bash
pnpm add -g opencode-ai
```

### Yarn

```bash
yarn global add opencode-ai
```

**说明**：Windows 上通过 npm 安装是官方文档列出的方式之一；通过 Bun 在 Windows 上安装的支持仍在完善中，若遇问题可改用 [Chocolatey](#chocolatey)、[Scoop](#scoop) 或 [Release 二进制](#方式七github-release-二进制)。

## 方式三：Homebrew（macOS / Linux）

推荐使用 OpenCode 维护的 tap，版本更新更及时：

```bash
brew install anomalyco/tap/opencode
```

Homebrew 官方仓库中的 `brew install opencode` 由 Homebrew 团队维护，更新频率可能低于上述 tap；若更在意最新版本，优先使用 `anomalyco/tap`。

## 方式四：Arch Linux

### 稳定版（官方仓库）

```bash
sudo pacman -S opencode
```

### 最新构建（AUR）

使用 `paru` 等 AUR 助手安装二进制包：

```bash
paru -S opencode-bin
```

AUR 包通常跟踪上游最新发布，适合需要尝鲜的用户；生产环境请自行评估 AUR 包的维护者与签名策略。

## 方式五：Windows

### Chocolatey

```powershell
choco install opencode
```

### Scoop

```powershell
scoop install opencode
```

### npm

与 [方式二 · npm](#npm) 相同，在 PowerShell 或终端中执行：

```powershell
npm install -g opencode-ai
```

### Mise

[Mise](https://mise.jdx.dev/) 可按 Git 源全局安装：

```powershell
mise use -g github:anomalyco/opencode
```

安装后确保 Mise 的 shims 已加入 `PATH`（通常由 `mise activate` 完成）。

## 方式六：Docker

适合在隔离环境中快速体验，无需在本机长期安装二进制：

```bash
docker run -it --rm ghcr.io/anomalyco/opencode
```

镜像地址：`ghcr.io/anomalyco/opencode`。若需挂载本地项目目录或持久化配置，请自行添加 `-v` 等参数；长期开发仍建议在宿主机安装 CLI 并配合 [初始化](../init) 流程使用。

## 方式七：GitHub Release 二进制

1. 打开 [anomalyco/opencode Releases](https://github.com/anomalyco/opencode/releases)。
2. 下载与当前操作系统、CPU 架构匹配的压缩包或安装包。
3. 解压后将 `opencode`（或 Windows 下的 `opencode.exe`）放入已在 `PATH` 中的目录，或直接使用完整路径调用。

此方式不依赖 Node、Homebrew 等生态，适合无法使用包管理器或需要固定版本的生产环境。

## 安装后验证

在**新打开的终端**中执行：

```bash
opencode --version
```

若输出版本号，说明 CLI 已可用。接下来：

1. 阅读 [配置](../config)，在 TUI 中通过 `/connect` 绑定 API Key 或 OpenCode Zen。
2. 进入目标项目目录，运行 `opencode` 并执行 `/init`，见 [初始化](../init)。

## 方式对照表

| 环境 | 命令 / 来源 | 备注 |
|------|-------------|------|
| Unix 脚本 | `curl -fsSL https://opencode.ai/install \| bash` | 官方推荐的最快路径 |
| npm | `npm install -g opencode-ai` | 跨平台，需 Node.js |
| Bun | `bun install -g opencode-ai` | 需 Bun；Windows 支持完善中 |
| pnpm | `pnpm add -g opencode-ai` | 需 pnpm |
| Yarn | `yarn global add opencode-ai` | 需 Yarn |
| Homebrew | `brew install anomalyco/tap/opencode` | 优先 tap，非 `brew install opencode` |
| Arch 稳定 | `sudo pacman -S opencode` | 发行版仓库 |
| Arch 最新 | `paru -S opencode-bin` | AUR |
| Windows | `choco install opencode` | Chocolatey |
| Windows | `scoop install opencode` | Scoop |
| Windows | `mise use -g github:anomalyco/opencode` | Mise |
| Docker | `docker run -it --rm ghcr.io/anomalyco/opencode` | 一次性体验 |
| 二进制 | [GitHub Releases](https://github.com/anomalyco/opencode/releases) | 无额外运行时依赖 |

返回 [安装章首页](../setup)。
