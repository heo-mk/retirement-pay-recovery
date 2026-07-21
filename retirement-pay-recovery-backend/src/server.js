'use strict';

const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');
const legalRoutes = require('./routes/legal.routes');

const app = express();

// ── 미들웨어 ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── 헬스체크 ──────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// ── 라우터 연결 ───────────────────────────────────────────
app.use('/api/legal', legalRoutes);

// ── 서버 기동 ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[server] 퇴직금 회수 가이드 백엔드가 포트 ${PORT} 에서 실행 중입니다.`);
  console.log(`[server] 헬스체크: http://localhost:${PORT}/health`);
});

module.exports = app;
