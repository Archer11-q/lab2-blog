// src/Header.jsx —— 顶部博客名，纯展示组件，无 state
export default function Header({ total }) {
  return (
    <header className="header">
      <h1>我的博客</h1>
      <p className="subtitle">共 {total} 篇文章</p>
    </header>
  );
}
