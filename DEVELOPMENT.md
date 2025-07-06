# 开发指南

## 项目结构

```
bob-plugin-openai-tts/
├── .github/
│   └── workflows/
│       └── release.yml      # GitHub Actions 自动化发布流程
├── .gitignore              # Git 忽略文件
├── DEVELOPMENT.md          # 开发指南 (本文件)
├── LICENSE                 # MIT 许可证
├── README.md               # 项目说明文档
├── info.json              # Bob 插件配置文件
└── main.js                # 插件主要功能代码
```

## 本地开发

### 1. 克隆项目
```bash
git clone https://github.com/EmccK/bob-plugin-openai-tts.git
cd bob-plugin-openai-tts
```

### 2. 修改代码
- 编辑 `info.json` 修改插件配置
- 编辑 `main.js` 修改插件功能

### 3. 本地测试
1. 手动创建 `.bobplugin` 文件进行测试：
   ```bash
   # 创建临时目录
   mkdir temp_plugin
   
   # 复制文件
   cp info.json main.js temp_plugin/
   
   # 创建插件包
   cd temp_plugin
   zip -r ../bob-plugin-openai-tts.bobplugin .
   cd ..
   rm -rf temp_plugin
   ```

2. 双击 `bob-plugin-openai-tts.bobplugin` 文件安装到 Bob 进行测试

## 自动化发布

### 发布新版本

#### 方法一：通过 Git Tag 触发 (推荐)
```bash
# 1. 更新版本号 (可选，GitHub Actions 会自动更新)
# 编辑 info.json 中的 version 字段

# 2. 提交更改
git add .
git commit -m "Release v1.x.x"

# 3. 创建并推送标签
git tag v1.x.x
git push origin v1.x.x
```

#### 方法二：手动触发
1. 访问 GitHub 仓库的 Actions 页面
2. 选择 "Build and Release Bob Plugin" 工作流
3. 点击 "Run workflow"
4. 输入版本号 (如 v1.0.1)
5. 点击 "Run workflow" 按钮

### 自动化流程说明

GitHub Actions 工作流 (`.github/workflows/release.yml`) 会自动执行以下步骤：

1. **检出代码**: 获取最新的代码
2. **获取版本**: 从 Git tag 或手动输入获取版本号
3. **更新版本**: 自动更新 `info.json` 中的版本号
4. **创建插件包**: 
   - 复制 `info.json` 和 `main.js` 到临时目录
   - 创建 ZIP 文件
   - 重命名为 `.bobplugin` 扩展名
5. **生成 SHA256**: 计算文件的 SHA256 校验和
6. **创建 Release**: 在 GitHub 上创建新的 Release
7. **上传文件**: 将 `.bobplugin` 文件上传到 Release

### Release 内容

每个 Release 包含：
- **插件文件**: `bob-plugin-openai-tts.bobplugin`
- **SHA256 校验和**: 用于验证文件完整性
- **版本说明**: 包含功能特性和安装方法
- **更新日志**: 基于 commit 历史

## 版本管理

### 版本号规则
使用语义化版本 (Semantic Versioning):
- `v1.0.0`: 主版本.次版本.修订版本
- `v1.0.1`: 修复 bug
- `v1.1.0`: 新增功能
- `v2.0.0`: 重大更改

### 更新 info.json
发布前确保 `info.json` 中的以下字段正确：
- `version`: 版本号 (不包含 v 前缀)
- `minBobVersion`: 最低支持的 Bob 版本
- `summary`: 插件描述

## 故障排除

### GitHub Actions 失败

#### "Resource not accessible by integration" 错误
这个错误通常是权限问题导致的：

1. **检查工作流权限**：
   - 确保 `.github/workflows/release.yml` 中包含 `permissions: contents: write`
   - 这已经在当前版本中修复

2. **检查仓库设置**：
   - 访问 GitHub 仓库 > Settings > Actions > General
   - 在 "Workflow permissions" 部分选择 "Read and write permissions"
   - 或者选择 "Read repository contents and packages permissions" 并勾选 "Allow GitHub Actions to create and approve pull requests"

3. **检查个人访问令牌**：
   - 如果使用 fork 的仓库，可能需要在 fork 的仓库中重新配置

#### 其他常见问题
1. 检查 Actions 页面的错误日志
2. 验证 `info.json` 格式正确
3. 确保 tag 格式正确 (如 v1.0.0)

### 插件安装失败
1. 检查 `.bobplugin` 文件是否包含 `info.json` 和 `main.js`
2. 验证 `info.json` 格式
3. 确保 Bob 版本满足 `minBobVersion` 要求

### API 调用失败
1. 检查 API Key 是否正确
2. 验证 API Base URL 设置
3. 查看 Bob 的错误日志
