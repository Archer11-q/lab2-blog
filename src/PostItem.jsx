// src/PostItem.jsx —— 文章卡片：全部内容来自 props，组件内不写死数据
export default function PostItem({ post, onOpen }) {
  const excerpt = post.summary || post.content.slice(0, 60);  // 无摘要时取正文前 60 字
  return (
    <li className="post-item">
      <button className="post-card" onClick={onOpen}>
        <div className="post-row">
          <span className="badge">{post.category}</span>
          <span className="date">{post.publishedAt}</span>
        </div>
        <h3>{post.title}</h3>
        <p>{excerpt}</p>
      </button>
    </li>
  );
}
