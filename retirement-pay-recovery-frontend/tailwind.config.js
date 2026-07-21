/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // preflight(base reset)를 비활성화한다.
  // 이유: 기존 index.css에 직접 작성된 디자인 토큰(색상, 테두리, 그림자 등)이
  // Tailwind의 브라우저 리셋과 충돌하지 않도록 하기 위함이다.
  // 반응형 레이아웃 유틸리티(flex, grid, max-w, px 등)는 preflight 없이도 정상 동작한다.
  corePlugins: {
    preflight: false,
  },
};
