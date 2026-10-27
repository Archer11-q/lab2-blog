// 训练6：自定义 Hook 练习（useWindowSize：复用逻辑，不是复用界面）
// 运行方式：复制到 lab2-blog 的 src/App.jsx 覆盖后 pnpm dev
// 必须以 use 开头：React 靠这个前缀识别 Hook，从而按声明顺序排队领号、检查规则。
import { useState, useEffect } from "react";
import "./App.css";

function useWindowSize() {
  // 用 useState 存窗口宽高
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  // 用 useEffect 监听 resize，卸载时清理
  useEffect(() => {
    function onResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);   // 卸载清理
  }, []);
  return size;   // 返回 { width, height }
}

function App() {
  const { width, height } = useWindowSize();
  return (
    <div className="app">
      <h1>useWindowSize 自定义 Hook</h1>
      <p>窗口宽：{width}px</p>
      <p>窗口高：{height}px</p>
      <p className="empty">拖动窗口，数字实时变化。自定义 Hook 复用的是逻辑（状态 + 副作用），不是界面。</p>
    </div>
  );
}

export default App;
