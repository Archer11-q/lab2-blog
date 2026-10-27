// src/PostForm.jsx —— 写文章表单：受控表单，onSubmit 拦截默认刷新，发布后清空
import { useState } from "react";

const EMPTY = { title: "", category: "技术", summary: "", content: "" };

export default function PostForm({ categories, onPublish }) {
  const [draft, setDraft] = useState(EMPTY);

  function handleSubmit(e) {
    e.preventDefault();                    // 阻止默认刷新
    if (!draft.title.trim()) return;
    onPublish({ ...draft, title: draft.title.trim() });
    setDraft(EMPTY);                       // 发布成功清空表单
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <input
        className="field"
        placeholder="标题"
        value={draft.title}
        onChange={(e) => setDraft({ ...draft, title: e.target.value })}
      />
      <select
        className="field"
        value={draft.category}
        onChange={(e) => setDraft({ ...draft, category: e.target.value })}
      >
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <input
        className="field"
        placeholder="摘要"
        value={draft.summary}
        onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
      />
      <textarea
        className="field"
        placeholder="正文"
        rows={4}
        value={draft.content}
        onChange={(e) => setDraft({ ...draft, content: e.target.value })}
      />
      <button type="submit" className="btn-primary">发布</button>
    </form>
  );
}
