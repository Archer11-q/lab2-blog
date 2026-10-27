# ai-review.md —— AI 生成代码五检查点审查（实验二任务6）

按实验要求：让 AI 自由生成一版博客组件代码（提示词不写要求），放进项目跑起来，按五个检查点审查并整改。以下每条均含三件套：AI 代码原文（问题片段）+ 违反的官方规则 + 修改前后对比 + 修改后运行时行为变化。

## 检查点 1：组件职责（是否超 200 行、多职责）

**AI 代码原文**（App.jsx 问题片段）：

```jsx
function App() {
  const [posts, setPosts] = useState([...]);
  const [category, setCategory] = useState("全部");
  const [draft, setDraft] = useState({ title: "", category: "技术", summary: "", content: "" });
  const [viewingId, setViewingId] = useState(null);
  // 300 行里同时干了：渲染头部、写表单、分类按钮、列表、详情、编辑、删除、持久化……
  return (
    <div>
      {/* 头部 */}
      {/* 表单 */}
      {/* 列表 */}
      {/* 详情 */}
      {/* …… 全部堆在一个 return 里 */}
    </div>
  );
}
```

**违反的官方规则**：违反组件化的基本思想（`learn/your-first-component`：一个组件只做一件事，多个职责要拆开）。

**修改前后对比**：

```diff
-// 所有 UI 和逻辑堆在 App 里（约 300 行）
-function App() { ... }
+// 拆成职责单一的组件
+<Header total={posts.length} />
+<PostForm categories={categories} onPublish={publish} />
+<CategoryFilter categories={categories} current={category} onChange={setCategory} />
+<PostList posts={filtered} onOpen={setViewingId} />
+<PostDetail post={viewing} onBack={...} onEdit={update} onDelete={handleDelete} />
```

**修改后运行时行为变化**：每个文件单独维护，改表单不会牵动列表；组件树在 React DevTools 里层次清晰，高亮重渲染时能区分哪个组件因 state 变化而重跑。

## 检查点 2：Hook 调用顺序（是否在 if/for/嵌套函数里调 Hook）

**AI 代码原文**：

```jsx
function PostDetail({ post }) {
  if (!post) return null;
  const [editing, setEditing] = useState(false);   // Hook 写在条件 return 之后
  return <button onClick={() => setEditing(true)}>编辑</button>;
}
```

**违反的官方规则**：`Rules of Hooks`（zh-hans.react.dev/reference/rules/rules-of-hooks）：「不要在循环、条件或嵌套函数中调用 Hook」。post 为 null 时该渲染只调用了 0 次 Hook，post 存在时调用 1 次，hookIndex 对不上，轻则状态错乱、重则报错。

**修改前后对比**：

```diff
function PostDetail({ post }) {
+ const [editing, setEditing] = useState(false);   // Hook 移到组件顶层，无条件调用
- if (!post) return null;
- const [editing, setEditing] = useState(false);
+ if (!post) return null;                          // 提前 return 的只是渲染结果
  return <button onClick={() => setEditing(true)}>编辑</button>;
}
```

**修改后运行时行为变化**：修改前在详情页与列表间切换偶发「状态错位」（编辑按钮点不动、显示异常）；修改后每次渲染 Hook 调用次数恒定，行为稳定。

## 检查点 3：依赖数组（useEffect 依赖是否写全、有无闭包旧值）

**AI 代码原文**：

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    setCount(count + 1);          // 闭包旧值：每秒拿到的都是本次渲染的 count
  }, 1000);
  return () => clearInterval(timer);
}, []);                            // 依赖数组写 []：定时器只挂载一次
```

**违反的官方规则**：`learn/synchronizing-with-effects`（依赖数组要诚实，写全依赖）＋ 函数式更新才是修闭包旧值的正确方式。

**修改前后对比**：

```diff
- setCount(count + 1);             // 闭包里的 count 永远是本渲染的快照 → 永远 +1
+ setCount((c) => c + 1);          // 函数式更新：React 传入最新值
```

**修改后运行时行为变化**：修改前定时器每秒都执行 `setCount(count+1)`，但 count 一直是初始值，界面永远停在 1；修改后每秒 +1 正常累加（本项目训练5 中肉眼可见，井字棋同理）。

## 检查点 4：状态最小化（有无冗余 state）

**AI 代码原文**：

```jsx
const [posts, setPosts] = useState([...]);
const [total, setTotal] = useState(0);          // 冗余：能从 posts.length 算出
const [filtered, setFiltered] = useState([]);   // 冗余：能从 posts + category 算出
const [categoryCount, setCategoryCount] = useState({});  // 冗余：分类统计能从 posts 算出
```

**违反的官方规则**：`learn/choosing-the-state-structure`（避免冗余 state：能从其它 state 算出来的就不存）。

**修改前后对比**：

```diff
-const [total, setTotal] = useState(0);
-const [filtered, setFiltered] = useState([]);
+const total = posts.length;                                  // 现算
+const filtered = category === "全部" ? posts : posts.filter(p => p.category === category);  // 现算
```

**修改后运行时行为变化**：少了一堆 setTotal/setFiltered 的同步调用，不会再出现「posts 改了但 total 忘更新」的 bug；React DevTools 里 state 只剩真正会变的三份（posts、category、viewingId）。

## 检查点 5：AI 代码是否附使用声明、审查留痕

**AI 代码原文**：无任何声明。

**整改**：仓库根目录补 `docs/AI使用声明.md`，写明 AI 使用范围（解释概念、翻译报错、对照官网核对）与整段代码审查留痕；本文件 `ai-review.md` 即审查记录。运行截图存档在实验截图目录。

## 自增检查：状态是否误存服务端数据

AI 生成的 RemotePosts 初版把 json-server 返回的数据 `setPosts` 进了 useState 再渲染，导致切页/刷新后与后台不同步。整改为 TanStack Query 的 `useQuery` 三态 + 缓存（`queryKey` 区分数据），写操作走 `useMutation` 乐观更新。修改后：切分类缓存秒出、刷新后仍与 db.json 一致、停掉 json-server 出现 error 态而非白屏。
