// src/RemotePosts.jsx —— 服务端状态：json-server mock 后台，TanStack Query 三态渲染 + 乐观更新
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API = "http://localhost:3000/posts";   // json-server：pnpm json-server db.json --port 3000 --delay 500

export default function RemotePosts() {
  const qc = useQueryClient();
  const [draft, setDraft] = useState("");

  // 三态之一：pending / error / success
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch(API + "?_limit=10").then((r) => r.json()),
  });

  // 乐观更新：先秒出、失败回滚、成功后重拉对齐
  const addPost = useMutation({
    mutationFn: (post) =>
      fetch(API, {
        method: "POST",
        body: JSON.stringify(post),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }).then((r) => r.json()),
    onMutate: async (post) => {
      await qc.cancelQueries({ queryKey: ["posts"] });
      const prev = qc.getQueryData(["posts"]);
      qc.setQueryData(["posts"], (old) => [post, ...(old ?? [])]);   // 乐观插入（界面秒出）
      return { prev };
    },
    onError: (_e, _t, ctx) => qc.setQueryData(["posts"], ctx.prev),   // 失败回滚
    onSettled: () => qc.invalidateQueries({ queryKey: ["posts"] }),   // 重新拉取对齐
  });

  if (isPending) return <p className="empty">服务端文章加载中…</p>;
  if (isError) return <p className="empty">出错了：{error.message}</p>;

  return (
    <section className="remote">
      <h2>服务端文章（json-server · TanStack Query）</h2>
      <form
        className="post-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!draft.trim()) return;
          addPost.mutate({ title: draft.trim(), category: "技术" });
          setDraft("");
        }}
      >
        <input className="field" placeholder="快速新增一篇（乐观更新演示）" value={draft} onChange={(e) => setDraft(e.target.value)} />
        <button type="submit" className="btn-primary">新增</button>
      </form>
      <ul className="post-list">
        {data.map((p) => (
          <li key={p.id} className="post-item">
            <div className="post-card">
              <span className="badge">{p.category}</span>
              <h3>{p.title}</h3>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
