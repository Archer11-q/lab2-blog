// 训练4：列表 + key 练习（亲眼看到 index 作 key 的坑）
// 运行方式：复制到 lab2-blog 的 src/App.jsx 覆盖后 pnpm dev
// 现象：输入框输入文字后删除第一项，观察输入框内容串位（index 版）
//      换成 id 作 key 后，现象消失。
// 原因：key 认错节点。index 作 key 时 React 把删除后的第一项当成原第一项，DOM 复用了输入框。
import { useState } from "react";
import "./App.css";

let nextId = 3;
const seed = [
  { id: 1, text: "" },
  { id: 2, text: "" },
  { id: 3, text: "" },
];

function App() {
  const [useIndex, setUseIndex] = useState(true);
  const [items, setItems] = useState(seed);

  function addItem() {
    nextId += 1;
    setItems([...items, { id: nextId, text: "" }]);
  }
  function removeFirst() {
    setItems(items.slice(1));
  }
  function change(i, v) {
    setItems(items.map((it, idx) => (idx === i ? { ...it, text: v } : it)));
  }

  return (
    <div className="app">
      <h1>key 练习：{useIndex ? "index 作 key（会串位）" : "id 作 key（正常）"}</h1>
      <div className="btn-row">
        <button className="btn-primary" onClick={() => setUseIndex(!useIndex)}>切换 key 模式</button>
        <button className="btn-plain" onClick={addItem}>加一项</button>
        <button className="btn-danger" onClick={removeFirst}>删除第一项</button>
      </div>
      <ul>
        {items.map((it, idx) => (
          // useIndex 时用 idx 作 key；否则用稳定的 id 作 key
          <li key={useIndex ? idx : it.id}>
            <input className="field" value={it.text} onChange={(e) => change(idx, e.target.value)} />
          </li>
        ))}
      </ul>
      <p className="empty">操作步骤：先给某几个输入框输入文字 → 点「删除第一项」→ 看输入框内容是否串位。</p>
    </div>
  );
}

export default App;
