#!/bin/bash

# 测试appcast.json更新脚本
# 用法: ./test-appcast-update.sh v1.0.3

if [ $# -eq 0 ]; then
    echo "用法: $0 <version_tag>"
    echo "示例: $0 v1.0.3"
    exit 1
fi

VERSION_TAG="$1"
VERSION_NUMBER="${VERSION_TAG#v}"
TIMESTAMP=$(date +%s)000
DOWNLOAD_URL="https://github.com/EmccK/bob-plugin-openai-tts/releases/download/$VERSION_TAG/bob-plugin-openai-tts.bobplugin"
SHA256="test_sha256_hash_placeholder"

echo "测试更新 appcast.json..."
echo "版本: $VERSION_NUMBER"
echo "时间戳: $TIMESTAMP"
echo "下载URL: $DOWNLOAD_URL"

# 检查jq是否安装
if ! command -v jq &> /dev/null; then
    echo "错误: 需要安装 jq"
    echo "macOS: brew install jq"
    echo "Ubuntu: sudo apt-get install jq"
    exit 1
fi

# 备份原文件
if [ -f appcast.json ]; then
    cp appcast.json appcast.json.backup
    echo "已备份原文件为 appcast.json.backup"
fi

# 创建新的版本条目JSON
NEW_VERSION_JSON=$(jq -n \
  --arg version "$VERSION_NUMBER" \
  --arg desc "版本 $VERSION_NUMBER 发布" \
  --arg sha256 "$SHA256" \
  --arg url "$DOWNLOAD_URL" \
  --arg minBobVersion "1.8.0" \
  --argjson timestamp "$TIMESTAMP" \
  '{
    version: $version,
    desc: $desc,
    sha256: $sha256,
    url: $url,
    minBobVersion: $minBobVersion,
    timestamp: $timestamp
  }')

echo "新版本条目:"
echo "$NEW_VERSION_JSON" | jq '.'

# 更新appcast.json
if [ -f appcast.json ]; then
  # 如果文件存在，添加新版本到开头，并移除重复版本
  jq --argjson newVersion "$NEW_VERSION_JSON" \
     --arg currentVersion "$VERSION_NUMBER" \
     '.versions = [$newVersion] + (.versions | map(select(.version != $currentVersion)))' \
     appcast.json > appcast_temp.json && mv appcast_temp.json appcast.json
  echo "已更新现有的 appcast.json"
else
  # 如果文件不存在，创建新文件
  jq -n \
     --argjson newVersion "$NEW_VERSION_JSON" \
     '{
       identifier: "com.emcck.bob.tts",
       versions: [$newVersion]
     }' > appcast.json
  echo "已创建新的 appcast.json"
fi

echo ""
echo "更新后的 appcast.json:"
cat appcast.json | jq '.'

echo ""
echo "测试完成！"
echo "如果满意结果，可以提交更改。"
echo "如果不满意，可以恢复备份: mv appcast.json.backup appcast.json"
