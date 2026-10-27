# 实验二基础训练说明

本目录是实验二「任务2 基础训练营」与「任务3 Thinking in React」的练习代码。

## 运行方式

六个训练和任务3都是独立的 App 组件，验证时复制对应文件内容覆盖 `lab2-blog/src/App.jsx`，然后：

```bash
pnpm dev
```

浏览器打开 http://localhost:5173 观察效果，用 React DevTools / 控制台配合验收。

## 文件对照

| 文件 | 对应训练 | 验收要点 |
|---|---|---|
| t1-jsx.jsx | 训练1 JSX 基础三件套 | h1 显示变量、列表三项无 key 警告、样式生效 |
| t2-es6.js | 训练2 ES6 七语法 | 浏览器控制台 / babeljs.io/repl 输出正确 |
| t3-usestate.jsx | 训练3 useState 四连 | 计数器/受控输入/开关/数组增删改全用新数组 |
| t4-key.jsx | 训练4 列表 + key | index 版串位截图 vs id 版正常截图 |
| t5-useeffect.jsx | 训练5 useEffect 三形态 | 依赖数组执行次数、定时器清理、闭包陷阱 |
| t6-usewindowsize.jsx | 训练6 自定义 Hook | 拖窗数字实时变、卸载无报错 |
| task3-thinking-in-react.jsx | 任务3 四步法 | 组件树、静态版、state 定位 |

## 训练报告一句话

- 训练1：JSX 里变量和表达式写在花括号里。
- 训练2：博客开发最常用的 ES6 语法是展开与 map。
- 训练3：数组操作必须用新数组替换（map/filter/展开），否则 React 不会重新渲染。
- 训练4：key 的作用是给 React 认节点。
- 训练5：依赖数组告诉 React 什么时候重跑。
- 训练6：自定义 Hook 复用的是逻辑，不是界面。
