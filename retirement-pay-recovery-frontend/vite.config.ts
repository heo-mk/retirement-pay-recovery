import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // 스마트스토어 프로젝트가 3000번을 사용하므로 3001로 지정
    proxy: {
      // /api로 시작하는 모든 요청을 백엔드(포트 5001)로 전달한다.
      // VITE_API_BASE_URL은 axios baseURL로 사용하지만, 개발 환경에서는
      // 이 프록시를 통해 CORS 없이 같은 오리진처럼 요청이 처리된다.
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
});
