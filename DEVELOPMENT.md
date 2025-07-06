# 开发指南

## 自动化发布流程

### 发布新版本

#### 方法一：通过 Git Tag 触发 (推荐)
```bash
# 1. 提交所有更改
git add .
git commit -m "Release v1.x.x"

# 2. 创建并推送标签
git tag v1.x.x
git push origin v1.x.x
```

#### 方法二：手动触发
1. 访问 GitHub 仓库的 Actions 页面
2. 选择 "Build and Release Bob Plugin" 工作流
3. 点击 "Run workflow"
4. 输入版本号 (如 v1.0.3)
5. 点击 "Run workflow" 按钮

### 自动化流程说明

GitHub Actions 工作流会自动执行以下步骤：

1. **检出代码**: 获取最新的代码
2. **安装工具**: 安装 jq 用于 JSON 处理
3. **获取版本**: 从 Git tag 或手动输入获取版本号
4. **更新版本**: 自动更新 `info.json` 中的版本号
5. **创建插件包**: 
   - 复制 `info.json` 和 `main.js` 到临时目录
   - 创建 ZIP 文件
   - 重命名为 `.bobplugin` 扩展名
6. **生成 SHA256**: 计算文件的 SHA256 校验和
7. **创建 Release**: 在 GitHub 上创建新的 Release
8. **更新 appcast.json**: 自动更新 appcast.json 文件
   - 添加新版本信息到数组开头
   - 移除重复的版本条目
   - 包含版本号、描述、SHA256、下载URL、时间戳等信息
9. **提交更改**: 将更新后的 appcast.json 提交到仓库
10. **上传文件**: 将 `.bobplugin` 文件上传到 Release

### appcast.json 自动更新

每次发布新版本时，GitHub Actions 会自动：

- 在 `appcast.json` 的 `versions` 数组开头添加新版本
- 自动生成版本描述、SHA256 校验和、下载链接
- 设置当前时间戳
- 移除重复的版本条目（如果存在）
- 提交更改到 git 仓库

### 本地测试 appcast 更新

使用提供的测试脚本：

```bash
# 测试更新 appcast.json
./test-appcast-update.sh v1.0.3

# 查看更新结果
cat appcast.json

# 如果不满意，恢复备份
mv appcast.json.backup appcast.json
```

### 故障排除

#### GitHub Actions 权限问题
确保仓库设置中启用了正确的权限：
1. 访问 GitHub 仓库 > Settings > Actions > General
2. 在 "Workflow permissions" 选择 "Read and write permissions"

#### "detached HEAD" 错误
如果遇到 "You are not currently on a branch" 错误：
- 已使用 `stefanzweifel/git-auto-commit-action@v5` 解决
- 这个 Action 专门处理 GitHub Actions 中的 git 提交问题
- 无需手动处理分支切换

#### appcast.json 更新失败
1. 检查 jq 是否正确安装
2. 验证 JSON 格式是否正确
3. 确保工作流有写入权限

#### 版本重复
工作流会自动移除重复的版本条目，确保每个版本只出现一次。

#### 提交失败
如果 git 提交失败：
1. 检查是否有实际的文件更改
2. 确保 `git-auto-commit-action` 有正确的权限
3. 查看 Actions 日志了解具体错误

## 文件结构

```
bob-plugin-openai-tts/
├── .github/workflows/release.yml  # 自动化发布流程
├── appcast.json                   # 版本更新信息 (自动维护)
├── info.json                      # 插件配置
├── main.js                        # 插件代码
├── test-appcast-update.sh         # 本地测试脚本
└── README.md                      # 项目说明
```
