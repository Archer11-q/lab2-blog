// src/PostDetail.jsx —— 文章详情：读全文、编辑、删除；编辑为行内表单
import { useState } from "react";

export default function PostDetail({ post, onBack, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ title: post.title, category: post.category, summary: post.summary, content: post.content });

  if (!post) return null;

  if (editing) {
    return (
      <div className="detail">
        <h2>编辑文章</h2>
        <form
          className="post-form"
          onSubmit={(e) => {
            e.preventDefault();
            onEdit(post.id, draft);   // 交给 App：新对象更新到 store
            setEditing(false);
          }}
        >
          <input className="field" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          <input className="field" value={draft.summary} onChange={(e) => setDraft({ ...draft, summary: e.target.value })} />
          <textarea className="field" rows={5} value={draft.content} onChange={(e) => setDraft({ ...draft, content: e.target.value })} />
          <div className="btn-row">
            <button type="submit" className="btn-primary">保存</button>
            <button type="button" className="btn-plain" onClick={() => setEditing(false)}>取消</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="detail">
      <button className="btn-plain" onClick={onBack}>← 返回列表</button>
      <div className="post-row">
        <span className="badge">{post.category}</span>
        <span className="date">{post.publishedAt}</span>
      </div>
      <h2>{post.title}</h2>
      <p>{post.summary}</p>
      <p className="content">{post.content}</p>
      <div className="btn-row">
        <button className="btn-primary" onClick={() => setEditing(true)}>编辑</button>
        <button className="btn-danger" onClick={() => onDelete(post.id)}>删除</button>
      </div>
    </div>
  );
}
