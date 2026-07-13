#!/bin/sh
# 一键同步 demo 到 GitHub Pages：主文件 → index.html → commit → push
set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

MAIN="短剧管理平台-统一demo.html"
INDEX="index.html"
REMOTE_URL="https://chasejen.github.io/reconstruct-demo/"

if [ ! -f "$MAIN" ]; then
  echo "错误：找不到 $MAIN"
  exit 1
fi

# 1. 同步线上入口
cp "$MAIN" "$INDEX"
echo "✓ 已同步：$MAIN → $INDEX"

# 2. 检查 remote
if ! git remote get-url origin >/dev/null 2>&1; then
  echo "错误：未配置 git remote origin。请先关联仓库，例如："
  echo "  git remote add origin https://github.com/ChaseJen/reconstruct-demo.git"
  exit 1
fi

# 3. 暂存 demo 相关文件（不含大 PRD）
git add "$MAIN" "$INDEX"

# 4. 无变更则跳过
if git diff --cached --quiet; then
  echo "无变更，跳过 push（工作区与上次提交一致）"
  exit 0
fi

# 5. commit & push
MSG="update demo: $(date '+%Y-%m-%d %H:%M')"
git commit -m "$MSG"
echo "✓ 已提交：$MSG"

if ! git push; then
  echo ""
  echo "错误：git push 失败。常见原因："
  echo "  · 未登录 GitHub → 在终端运行：gh auth login"
  echo "  · 无推送权限 → 确认仓库 https://github.com/ChaseJen/reconstruct-demo 可写"
  exit 1
fi

echo ""
echo "✓ 已推送到 GitHub Pages"
echo "  线上链接：$REMOTE_URL"
echo "  约 1～2 分钟后刷新生效"
