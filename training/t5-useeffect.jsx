// 训练5：useEffect 渐进练习（三种依赖形态 + 闭包陷阱）
// 运行方式：复制到 lab2-blog 的 src/App.jsx 覆盖后 pnpm dev
// 观察：
// 1 改标题：count 变化时 document.title 跟着变
// 2 依赖数组：不写 / 写 [] / 写 [count] 各试一次，看控制台执行次数
// 3 定时器：每秒 +1，卸载时清理（本页不卸载，配合 DevTools 强制渲染观察）
// 4 闭包陷阱：setTimeout 里打印 count，连点 3 次看打印值，用函数式更新修复
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState("count");   // count | empty | none

  // 1 改标题：只要 count 变就同步 document.title
  useEffect(() => {
    document.title = `计数：${count}`;
  }, [count]);

  // 2 依赖数组三种形态的执行次数观察
  useEffect(() => {
    console.log(`[依赖 ${mode}] effect 执行，当前 count=${count}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, mode === "count" ? [count] : mode === "empty" ? [] : undefined);

  // 3 定时器：每秒 +1，卸载时清理
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => c + 1);                    // 函数式更新：不依赖闭包里的旧 count
    }, 1000);
    return () => clearInterval(timer);           // 卸载清理，避免泄漏
  }, []);

  // 4 闭包陷阱演示：打印的是本次渲染时的 count 快照
  function printOld() {
    setTimeout(() => console.log("闭包里的 count（旧值快照）=", count), 1000);
  }

  return (
    <div className="app">
      <h1>useEffect 练习：count = {count}</h1>
      <div className="btn-row">
        <button className="btn-primary" onClick={() => setCount((c) => c + 1)}>+1（点 3 次再点下方）</button>
        <button className="btn-plain" onClick={printOld}>1 秒后打印闭包里的 count</button>
        <button className="btn-plain" onClick={() => setMode(mode === "count" ? "empty" : mode === "empty" ? "none" : "count")}>
          依赖数组模式：{mode}
        </button>
      </div>
      <p className="empty">
        依赖数组告诉 React 什么时候重跑：不写 = 每次渲染都跑；写 [] = 只挂载跑一次；写 [count] = count 变了才跑。
        定时器每秒 +1 用了函数式更新，所以拿到的总是最新值；闭包陷阱里 setTimeout 拿到的是本次渲染的旧 count。
      </p>
    </div>
  );
}

export default App;
