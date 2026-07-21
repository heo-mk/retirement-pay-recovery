import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // 스마트스토어 프로젝트가 3000번을 사용하므로 3001로 지정
  },
});
