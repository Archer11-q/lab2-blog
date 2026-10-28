import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// base 由 VITE_BASE 注入：GitHub Pages 需子路径 /lab2-blog/，腾讯云（EdgeOne Makers / CloudBase 静态托管）用根路径
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
})
