# AI 交接 · 线上 Demo 同步（必读）

> **建议**：新建 Cursor 会话时，将本文 `@AI交接-线上同步.md` 加入上下文，或写入 Cursor Rules，确保改 demo 后自动 push。

---

## 强制规则（AI / 新会话必须遵守）

**只要修改了 `短剧管理平台-统一demo.html`（或任何会影响线上 demo 展示的文件），在本轮任务结束前必须执行：**

```bash
cd "/Users/celestejen/Desktop/经营者管理平台重构需求"
./deploy-demo.sh
```

- 脚本会：同步 `index.html` → `git commit` → `git push` → 更新 GitHub Pages
- 若无文件变更，脚本会提示「无变更，跳过 push」并正常退出
- **不得**在未同步的情况下结束「改 demo」类任务

---

## 链接

| 用途 | 地址 |
|------|------|
| **线上 Demo（分享给相关方）** | https://chasejen.github.io/reconstruct-demo/ |
| **GitHub 仓库** | https://github.com/ChaseJen/reconstruct-demo |
| **主开发文件** | `短剧管理平台-统一demo.html` |
| **线上入口（自动生成）** | `index.html`（由 deploy 脚本从主文件复制，勿单独手改） |

打开线上链接后默认进入：**内容页 · 剧目 tab** 列表，可体验详情、上传、售卖版本等完整交互（纯前端 demo）。

---

## 一键同步（推荐）

```bash
cd "/Users/celestejen/Desktop/经营者管理平台重构需求"
./deploy-demo.sh
```

成功输出示例：线上链接 +「约 1～2 分钟后生效」。

---

## 手动分步（备用）

```bash
cd "/Users/celestejen/Desktop/经营者管理平台重构需求"
cp 短剧管理平台-统一demo.html index.html
git add 短剧管理平台-统一demo.html index.html
git status   # 确认无大 PRD 文件被误 add
git commit -m "update demo: $(date '+%Y-%m-%d %H:%M')"
git push
```

---

## 注意事项

- **不要** `git push --force`
- **不要** 修改 `git config`
- **不要** commit 大 PRD 资源：`重构方案prd.png`、`短剧智投功能prd.png`、`*.docx` 等（已在 `.gitignore`）
- 只改文档/脚本且不影响 demo 时，可不跑 deploy；**改了 demo HTML 必须跑**

---

## push 失败排查

```bash
gh auth status    # 应显示已登录 github.com
git remote -v     # 应有 origin → ChaseJen/reconstruct-demo
```

未登录时：

```bash
gh auth login
# 选 GitHub.com → HTTPS → Login with a web browser
```

然后重新 `./deploy-demo.sh`。

---

## 相关文件

| 文件 | 说明 |
|------|------|
| `deploy-demo.sh` | 一键 sync + commit + push |
| `sync-demo.sh` | 仅复制主文件 → index.html（不 push） |
| `DEPLOY.md` | 首次部署 / Pages 配置说明 |
| `会话交接文档.md` | 项目整体交接 |
