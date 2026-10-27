// src/PostList.jsx —— 文章列表：map 渲染，key={post.id}；空态提示
import PostItem from "./PostItem";

export default function PostList({ posts, onOpen }) {
  if (posts.length === 0) {
    return <p className="empty">还没有文章，写下第一篇吧。</p>;
  }
  return (
    <ul className="post-list">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onOpen={() => onOpen(post.id)} />
      ))}
    </ul>
  );
}
