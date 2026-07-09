import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 5173,
    strictPort: false
  },
  preview: {
    // 로컬 확인용 서버 — 브라우저가 옛 index.html을 캐시해 구버전이 보이는 일 방지
    headers: { 'Cache-Control': 'no-store' }
  }
});
