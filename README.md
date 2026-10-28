# lab2-blog —— 实验二 React 博客（Vite + React 19 + Zustand + TanStack Query）

实验二「React 项目实战与 Zustand 状态管理」的博客项目。功能：文章列表、写文章、分类过滤、详情、编辑、删除、localStorage/Zustand 持久化；服务端状态用 TanStack Query + json-server 演示（三态渲染 + 乐观更新）。

## 本地运行

```bash
pnpm install
pnpm dev            # http://localhost:5173
```

服务端文章区需要 mock 后台（可选）：

```bash
pnpm json-server --watch db.json --port 3000 --delay 500
```

## 目录结构

```
src/
├── api/            # 统一请求封装 + 博客接口 + mock 后台（接入真实后台只改 BASE_URL）
├── useLocalStorage.js   # 任务4：持久化 Hook
├── usePostStore.js      # 任务5：Zustand 全局 store（persist）
├── Header.jsx / PostForm.jsx / CategoryFilter.jsx / PostList.jsx / PostItem.jsx / PostDetail.jsx
├── RemotePosts.jsx      # 任务5：TanStack Query 三态 + 乐观更新
└── App.jsx / main.jsx
training/           # 任务2 六个渐进练习 + 任务3 Thinking in React
docs/               # 实验报告、AI 使用声明
ai-review.md        # 任务6 AI 审查五检查点
```

## 构建与部署

```bash
pnpm build
pnpm preview
```

已部署：

| 平台 | 地址 | 备注 |
|---|---|---|
| 腾讯云 EdgeOne Makers | https://lab2-blog-aqpkucok.edgeone.cool?eo_token=e7d8f319b0cd760be2589fa032c071a8&eo_time=1793154247 | 默认域名带访问令牌，须整串打开；每次进入续 3 小时会话 |
| 腾讯云 CloudBase 静态网站托管 | https://exp1-ssr-lab-d4giuf63la426d285-1492091570.tcloudbaseapp.com/ | 首次访问有「风险提醒」中间页，点「确定访问」进站点；长期有效 |
| GitHub Pages | https://archer11-q.github.io/lab2-blog/ | 子路径部署，`VITE_BASE=/lab2-blog/` |

云端两个地址都用根路径构建（`pnpm build` 默认 `base: '/'`），因此互不冲突；只有 GitHub Pages 需要子路径，由工作流注入 `VITE_BASE`。

## 提交信息规范

`feat: 完成发布文章` / `fix: 修复闭包陷阱` 格式。
