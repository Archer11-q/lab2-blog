// 训练1：JSX 基础三件套（变量插值、map 渲染列表、className 样式）
// 运行方式：复制到 lab2-blog 的 src/App.jsx 覆盖后 pnpm dev
import "./App.css";

function App() {
  const name = "我的博客";
  const posts = ["第一篇", "第二篇", "第三篇"];
  return (
    <div className="app">
      <h1>欢迎来到{name}</h1>
      {/* JSX 里变量和表达式写在花括号里；key 用序号（本训练无增删改） */}
      <ul>
        {posts.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
