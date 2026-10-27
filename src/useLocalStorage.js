// src/useLocalStorage.js —— 自定义 Hook：给 state 加 localStorage 持久化
import { useState, useEffect } from "react";

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved === null ? initial : JSON.parse(saved);  // 惰性读 + JSON 还原
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));     // 值变了 JSON 写入
  }, [key, value]);
  return [value, setValue];                               // 用法跟 useState 一样
}

export default useLocalStorage;
