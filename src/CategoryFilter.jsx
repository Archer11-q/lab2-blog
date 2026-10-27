// src/CategoryFilter.jsx —— 分类过滤：当前分类提升到 App，经 props + 回调修改
export default function CategoryFilter({ categories, current, onChange }) {
  return (
    <div className="category-filter">
      {categories.map((c) => (
        <button
          key={c}
          className={"chip" + (c === current ? " chip-active" : "")}
          onClick={() => onChange(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
