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

已部署：https://Archer11-q.github.io/lab2-blog/ （GitHub Pages）

## 提交信息规范

`feat: 完成发布文章` / `fix: 修复闭包陷阱` 格式。
