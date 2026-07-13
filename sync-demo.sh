#!/bin/sh
# 将工作区 demo 同步为 GitHub Pages 入口 index.html，再 commit/push 即可更新线上
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"
cp "$ROOT/短剧管理平台-统一demo.html" "$ROOT/index.html"
echo "已同步：短剧管理平台-统一demo.html → index.html"
echo "下一步：git add index.html && git commit -m 'update demo' && git push"
