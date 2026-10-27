// 训练3：useState 渐进练习（计数器 / 受控输入 / 开关 / 数组增删改）
// 运行方式：复制到 lab2-blog 的 src/App.jsx 覆盖后 pnpm dev
import { useState } from "react";
import "./App.css";

function App() {
  // 1 计数器：点一次加 1
  const [count, setCount] = useState(0);

  // 2 受控输入：input 输入什么，p 就显示什么
  const [text, setText] = useState("");

  // 3 开关：按钮切换 开/关
  const [on, setOn] = useState(true);

  // 4 数组增删改：全用新数组（map/filter/展开），不用 push
  const [items, setItems] = useState(["A", "B"]);
  function addItem() {
    setItems([...items, `项${items.length + 1}`]);        // 展开生成新数组
  }
  function removeItem(i) {
    setItems(items.filter((_, idx) => idx !== i));        // filter 生成新数组
  }
  function renameItem(i) {
    setItems(items.map((it, idx) => (idx === i ? it + "!" : it)));  // map 生成新数组
  }

  return (
    <div className="app">
      <h1>useState 四连练</h1>

      <section>
        <h2>1 计数器：{count}</h2>
        <button className="btn-primary" onClick={() => setCount(count + 1)}>+1</button>
      </section>

      <section>
        <h2>2 受控输入</h2>
        <input className="field" value={text} onChange={(e) => setText(e.target.value)} />
        <p>输入的内容：{text}</p>
      </section>

      <section>
        <h2>3 开关：{on ? "开" : "关"}</h2>
        <button className="btn-primary" onClick={() => setOn(!on)}>切换</button>
      </section>

      <section>
        <h2>4 数组增删改</h2>
        <button className="btn-primary" onClick={addItem}>加一项</button>
        <ul>
          {items.map((it, i) => (
            <li key={i}>
              {it}
              <button className="btn-plain" onClick={() => renameItem(i)}>改</button>
              <button className="btn-danger" onClick={() => removeItem(i)}>删</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
