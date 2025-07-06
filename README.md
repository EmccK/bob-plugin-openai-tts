# OpenAI TTS Plugin for Bob

<div align="center">

![Bob](https://img.shields.io/badge/Bob-1.8.0+-blue)
![OpenAI](https://img.shields.io/badge/OpenAI-TTS-green)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Release](https://img.shields.io/github/v/release/EmccK/bob-plugin-openai-tts)

一个为 [Bob](https://bobtranslate.com/) 翻译软件提供的 OpenAI TTS (文本转语音) 插件

[English](#english) | [中文](#中文)

</div>

## 中文

### 📖 简介

OpenAI TTS Plugin 是一个专为 Bob 翻译软件设计的文本转语音插件，使用 OpenAI 的先进 TTS API 提供高质量的语音合成服务。

### ✨ 功能特性

- 🎯 **多模型支持**: 支持 `tts-1`、`tts-1-hd`、`gpt-4o-mini-tts` 等模型
- 🎵 **丰富声音选择**: 内置 11 种预设声音 (alloy, ash, ballad, coral, echo, fable, onyx, nova, sage, shimmer, verse)
- 🎨 **自定义选项**: 支持自定义模型和声音
- 💬 **语音提示词**: 支持 prompt 功能，可指导语音生成的风格和语调
- 🌐 **自定义 API**: 支持自定义 API Base URL，兼容各种 OpenAI 兼容服务
- 🌍 **多语言支持**: 支持 100+ 种语言的文本转语音
- 🔒 **安全配置**: API Key 安全存储

### 🚀 快速开始

#### 1. 安装 Bob
首先安装 [Bob](https://bobtranslate.com/guide/#%E5%AE%89%E8%A3%85) (版本 >= 1.8.0)

#### 2. 下载插件
从 [Releases](https://github.com/EmccK/bob-plugin-openai-tts/releases/latest) 页面下载最新的 `bob-plugin-openai-tts.bobplugin` 文件

#### 3. 安装插件
双击下载的 `.bobplugin` 文件即可自动安装

#### 4. 获取 API Key
从 [OpenAI Platform](https://platform.openai.com/api-keys) 获取您的 API Key

#### 5. 配置插件
在 Bob 的偏好设置 > 服务 > OpenAI TTS 中填入您的 API Key 和其他配置

### ⚙️ 配置选项

| 选项 | 描述 | 默认值 | 必填 |
|------|------|--------|------|
| **API Key** | OpenAI API 密钥 | - | ✅ |
| **API Base URL** | 自定义 API 地址 | `https://api.openai.com` | ❌ |
| **模型** | TTS 模型选择 | `gpt-4o-mini-tts` | ❌ |
| **自定义模型** | 自定义模型名称 | - | ❌ |
| **声音** | 预设声音选择 | `alloy` | ❌ |
| **自定义声音** | 自定义声音名称 | - | ❌ |
| **语音提示词** | 指导语音风格的提示词 | - | ❌ |

### 🎵 可用声音

| 声音名称 | 特点 |
|----------|------|
| `alloy` | 中性、平衡 |
| `ash` | 清晰、权威 |
| `ballad` | 温暖、抒情 |
| `coral` | 温和、友善 |
| `echo` | 清脆、明亮 |
| `fable` | 叙述性、戏剧化 |
| `onyx` | 深沉、稳重 |
| `nova` | 年轻、活力 |
| `sage` | 智慧、成熟 |
| `shimmer` | 轻柔、优雅 |
| `verse` | 诗意、富有表现力 |

### 💡 使用技巧

1. **语音提示词示例**:
   - "请用温和友善的语调朗读"
   - "用专业的播音员语调"
   - "模仿新闻主播的语调"

2. **自定义 API**: 如果无法直接访问 OpenAI，可以使用代理服务或兼容的 API 服务

3. **模型选择**:
   - `tts-1`: 速度快，适合实时应用
   - `tts-1-hd`: 高质量，音质更佳
   - `gpt-4o-mini-tts`: 最新模型，平衡速度和质量

### 🔧 开发

#### 项目结构
```
bob-plugin-openai-tts/
├── info.json          # 插件配置文件
├── main.js            # 主要功能代码
├── README.md          # 说明文档
└── .github/
    └── workflows/
        └── release.yml # 自动化发布流程
```

#### 本地开发
1. 克隆仓库
2. 修改代码
3. 将 `info.json` 和 `main.js` 打包成 `.bobplugin` 文件进行测试

#### 发布新版本
1. 更新 `info.json` 中的版本号
2. 创建并推送新的 git tag: `git tag v1.x.x && git push origin v1.x.x`
3. GitHub Actions 将自动构建并发布新版本

### 📝 更新日志

查看 [Releases](https://github.com/EmccK/bob-plugin-openai-tts/releases) 页面了解详细的更新历史。

### 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

### 🙏 致谢

- 感谢 [ripperhe](https://github.com/ripperhe) 开发的优秀翻译软件 Bob
- 感谢 [OpenAI](https://openai.com/) 提供的强大 TTS API
- 参考了 [bob-plugin-openai-translator](https://github.com/openai-translator/bob-plugin-openai-translator) 的实现

---

## English

### 📖 Introduction

OpenAI TTS Plugin is a text-to-speech plugin designed for Bob translation software, providing high-quality speech synthesis using OpenAI's advanced TTS API.

### ✨ Features

- 🎯 **Multiple Models**: Support for `tts-1`, `tts-1-hd`, `gpt-4o-mini-tts` and more
- 🎵 **Rich Voice Options**: 11 built-in voices (alloy, ash, ballad, coral, echo, fable, onyx, nova, sage, shimmer, verse)
- 🎨 **Customization**: Support for custom models and voices
- 💬 **Voice Prompts**: Prompt support for guiding speech generation style and tone
- 🌐 **Custom API**: Support for custom API Base URL, compatible with various OpenAI-compatible services
- 🌍 **Multi-language**: Support for 100+ languages text-to-speech
- 🔒 **Secure**: Secure API Key storage

### 🚀 Quick Start

#### 1. Install Bob
First install [Bob](https://bobtranslate.com/guide/#%E5%AE%89%E8%A3%85) (version >= 1.8.0)

#### 2. Download Plugin
Download the latest `bob-plugin-openai-tts.bobplugin` file from [Releases](https://github.com/EmccK/bob-plugin-openai-tts/releases/latest)

#### 3. Install Plugin
Double-click the downloaded `.bobplugin` file to install automatically

#### 4. Get API Key
Get your API Key from [OpenAI Platform](https://platform.openai.com/api-keys)

#### 5. Configure Plugin
Fill in your API Key and other settings in Bob's Preferences > Services > OpenAI TTS

### ⚙️ Configuration Options

| Option | Description | Default | Required |
|--------|-------------|---------|----------|
| **API Key** | OpenAI API key | - | ✅ |
| **API Base URL** | Custom API address | `https://api.openai.com` | ❌ |
| **Model** | TTS model selection | `gpt-4o-mini-tts` | ❌ |
| **Custom Model** | Custom model name | - | ❌ |
| **Voice** | Preset voice selection | `alloy` | ❌ |
| **Custom Voice** | Custom voice name | - | ❌ |
| **Prompt** | Voice style guidance prompt | - | ❌ |

### 🤝 Contributing

Issues and Pull Requests are welcome!

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 🙏 Acknowledgments

- Thanks to [ripperhe](https://github.com/ripperhe) for the excellent Bob translation software
- Thanks to [OpenAI](https://openai.com/) for the powerful TTS API
- Inspired by [bob-plugin-openai-translator](https://github.com/openai-translator/bob-plugin-openai-translator)
