// src/usePostStore.js —— Zustand 全局状态：posts 跨组件共享，persist 持久化到 localStorage
import { create } from "zustand";
import { persist } from "zustand/middleware";

// 首次进入（localStorage 无数据）时的示例文章；persist 恢复后以本地数据为准
const SEED = [
  { id: "seed-1", title: "我的第一篇博客", category: "技术", summary: "React 上手记录", content: "从 create-vite 到第一个组件，一步一步来。", publishedAt: "2026-09-01" },
  { id: "seed-2", title: "为什么学前端框架", category: "随笔", summary: "框架的价值", content: "组件化让界面像积木一样拼装。", publishedAt: "2026-09-03" },
];

const usePostStore = create(
  persist(
    (set) => ({
      posts: SEED,
      publish: (post) =>
        set((s) => ({
          posts: [
            { ...post, id: crypto.randomUUID(), publishedAt: new Date().toISOString().slice(0, 10) },
            ...s.posts,
          ],
        })),
      update: (id, patch) =>
        set((s) => ({ posts: s.posts.map((p) => (p.id === id ? { ...p, ...patch } : p)) })),
      remove: (id) => set((s) => ({ posts: s.posts.filter((p) => p.id !== id) })),
    }),
    {
      name: "posts",            // persist：自动存 localStorage
      partialize: (s) => ({ posts: s.posts }),   // 只持久化 posts，动作函数不落盘
    },
  ),
);

export default usePostStore;
