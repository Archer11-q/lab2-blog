// 任务3：Thinking in React 四步法（可搜索的产品表格，官网实例）
// 运行方式：复制到 lab2-blog 的 src/App.jsx 覆盖后 pnpm dev
// 第1步 拆组件：FilterableProductTable → SearchBar + ProductTable → ProductCategoryRow + ProductRow
// 第2步 写静态版：mock 数据写死，只画界面，不写 state
// 第3步 找 state：会变的是 searchText、inStockOnly；过滤后的列表能从 state 算出，不设 state
// 第4步 确定位置：state 放在用到它的共同最近父组件（FilterableProductTable）
import { useState } from "react";
import "./App.css";

const PRODUCTS = [
  { category: "水果", price: "$1", stocked: true, name: "苹果" },
  { category: "水果", price: "$1", stocked: true, name: "火龙果" },
  { category: "水果", price: "$2", stocked: false, name: "芒果" },
  { category: "蔬菜", price: "$2", stocked: true, name: "菠菜" },
  { category: "蔬菜", price: "$4", stocked: false, name: "南瓜" },
  { category: "蔬菜", price: "$1", stocked: true, name: "豌豆" },
];

function ProductCategoryRow({ category }) {
  return <tr><th colSpan="2">{category}</th></tr>;
}

function ProductRow({ product }) {
  return (
    <tr>
      <td style={{ color: product.stocked ? undefined : "red" }}>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;
  // 过滤从 props 算出来：searchText 匹配 + 只显示有货
  const filtered = products.filter((p) =>
    (inStockOnly ? p.stocked : true) && p.name.toLowerCase().includes(filterText.toLowerCase())
  );
  for (const p of filtered) {
    if (p.category !== lastCategory) {
      rows.push(<ProductCategoryRow key={p.category} category={p.category} />);
      lastCategory = p.category;
    }
    rows.push(<ProductRow key={p.name} product={p} />);
  }
  return (
    <table border="1" cellPadding="6">
      <thead><tr><th>名称</th><th>价格</th></tr></thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
  return (
    <div>
      <input className="field" placeholder="搜索…" value={filterText} onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input type="checkbox" checked={inStockOnly} onChange={(e) => onInStockOnlyChange(e.target.checked)} /> 只显示有货商品
      </label>
    </div>
  );
}

// state 放这里：SearchBar 和 ProductTable 都需要，共同最近父组件就是它
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  return (
    <div className="app">
      <h1>Thinking in React：可搜索产品表格</h1>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
    </div>
  );
}

function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}

export default App;
