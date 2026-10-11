'use strict';

const { describe, it, beforeEach, afterEach, mock } = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const request = require('supertest');
const axios = require('axios');
const dotenv = require('dotenv');

// 로컬 .env 파일 내용이 테스트 환경에 영향을 주지 않도록 dotenv.config를 무력화
dotenv.config = () => ({ parsed: {} });

const originalEnvOcId = process.env.LAW_API_OC_ID;

function createApp() {
  // 새 Express 앱 인스턴스 생성 및 라우터 마운트
  const app = express();
  app.use(express.json());

  // 깨끗한 상태로 라우터 및 의존 모듈 로드
  delete require.cache[require.resolve('../src/config')];
  delete require.cache[require.resolve('../src/services/lawApi.service')];
  delete require.cache[require.resolve('../src/routes/legal.routes')];

  const legalRouter = require('../src/routes/legal.routes');
  app.use('/api/legal', legalRouter);
  return app;
}

describe('legal.routes - GET /api/legal/statutes', () => {
  beforeEach(() => {
    mock.restoreAll();
  });

  afterEach(() => {
    mock.restoreAll();
    if (originalEnvOcId !== undefined) {
      process.env.LAW_API_OC_ID = originalEnvOcId;
    } else {
      delete process.env.LAW_API_OC_ID;
    }
    delete require.cache[require.resolve('../src/config')];
    delete require.cache[require.resolve('../src/services/lawApi.service')];
    delete require.cache[require.resolve('../src/routes/legal.routes')];
  });

  it('keyword 쿼리 파라미터가 없으면 400 상태 코드와 에러 메시지를 반환한다', async () => {
    const app = createApp();

    const response = await request(app).get('/api/legal/statutes');

    assert.equal(response.status, 400);
    assert.deepEqual(response.body, { error: 'keyword is required' });
  });

  it('서비스 조회 중 예외가 발생하면 500 상태 코드와 에러 메시지를 반환한다', async () => {
    // API 호출이 트리거되도록 인증키를 설정
    process.env.LAW_API_OC_ID = 'test-mock-key';
    const app = createApp();

    // axios.get이 에러를 발생시키도록 모킹
    const mockGet = mock.method(axios, 'get', async () => {
      throw new Error('법제처 서버 응답 시간 초과');
    });

    const response = await request(app).get('/api/legal/statutes?keyword=퇴직금');

    assert.equal(mockGet.mock.callCount(), 1);
    assert.equal(response.status, 500);
    assert.deepEqual(response.body, { error: 'law api unavailable' });
  });
});
