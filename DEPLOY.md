# 短剧管理平台统一 Demo · 线上部署说明

## 入口文件

| 文件 | 用途 |
|------|------|
| `短剧管理平台-统一demo.html` | 本地开发与日常修改（主文件） |
| `index.html` | 线上 GitHub Pages 入口（由 `sync-demo.sh` 从主文件复制） |

相关方打开 Pages 链接后，直接看到**付费短剧列表**（内容页 · 剧目 tab），可切换版本 tab、进入详情、上传/编辑、售卖版本表单等完整交互（纯前端 demo，无真实后端）。

## 每次改 demo 后如何同步线上

```bash
cd "/Users/celestejen/Desktop/经营者管理平台重构需求"
./deploy-demo.sh
```

（仅复制不同步 push 时可用 `./sync-demo.sh` + 手动 git。）

约 1～2 分钟后 GitHub Pages 自动更新。

## 从零部署到 GitHub Pages（首次）

### 1. 登录 GitHub CLI（若尚未登录）

```bash
gh auth login
```

### 2. 在本目录创建仓库并推送

```bash
cd "/Users/celestejen/Desktop/经营者管理平台重构需求"
git init
git add index.html .gitignore sync-demo.sh DEPLOY.md 会话交接文档.md
git add 短剧管理平台-统一demo.html 售卖版本设置-demo.html *.svg
git commit -m "Add short drama management platform demo for GitHub Pages"
gh repo create reconstruct-demo --public --source=. --remote=origin --push
```

（仓库名可自定；`--private` 可改为私有，Pages 仍可用但需账号权限。）

### 3. 开启 GitHub Pages

```bash
gh api repos/{owner}/reconstruct-demo/pages -X POST \
  -f build_type=legacy \
  -f source[branch]=main \
  -f source[path]=/
```

或在 GitHub 网页：**Settings → Pages → Source: Deploy from branch → main → / (root)**。

### 4. 访问链接

```
https://<你的GitHub用户名>.github.io/reconstruct-demo/
```

## 备选：不用 Git，Netlify Drop

1. 打开 https://app.netlify.com/drop  
2. 把 `index.html` 拖进去（或整个文件夹）  
3. 获得 `https://随机名.netlify.app`  
4. 下次改完再拖一次覆盖（无自动同步，适合偶尔更新）
