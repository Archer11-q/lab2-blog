// src/App.jsx —— 组装所有组件；全局状态在 Zustand store；当前分类/查看文章提升到此
import { useState } from "react";
import "./App.css";
import Header from "./Header";
import PostForm from "./PostForm";
import CategoryFilter from "./CategoryFilter";
import PostList from "./PostList";
import PostDetail from "./PostDetail";
import RemotePosts from "./RemotePosts";
import usePostStore from "./usePostStore";

export default function App() {
  const posts = usePostStore((s) => s.posts);
  const publish = usePostStore((s) => s.publish);
  const update = usePostStore((s) => s.update);
  const remove = usePostStore((s) => s.remove);

  const [category, setCategory] = useState("全部");
  const [viewingId, setViewingId] = useState(null);

  // 分类从数据里取（不写死）；过滤后的列表是从 posts 算出来的，不设冗余 state
  const categories = ["全部", ...Array.from(new Set(posts.map((p) => p.category)))];
  const filtered = category === "全部" ? posts : posts.filter((p) => p.category === category);
  const viewing = viewingId ? posts.find((p) => p.id === viewingId) : null;

  function handleDelete(id) {
    remove(id);
    setViewingId(null);   // 删除后回列表
  }

  return (
    <div className="app">
      <Header total={posts.length} />
      <PostForm categories={categories.filter((c) => c !== "全部")} onPublish={publish} />
      <CategoryFilter categories={categories} current={category} onChange={setCategory} />
      {viewing ? (
        <PostDetail
          post={viewing}
          onBack={() => setViewingId(null)}
          onEdit={update}
          onDelete={handleDelete}
        />
      ) : (
        <PostList posts={filtered} onOpen={setViewingId} />
      )}
      <RemotePosts />
    </div>
  );
}
