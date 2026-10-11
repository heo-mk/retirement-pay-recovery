'use strict';

const { describe, it, beforeEach, afterEach, mock } = require('node:test');
const assert = require('node:assert/strict');
const axios = require('axios');
const dotenv = require('dotenv');

// 로컬 .env 파일 내용이 테스트 환경에 영향을 주지 않도록 dotenv.config를 무력화
dotenv.config = () => ({ parsed: {} });

const originalEnvOcId = process.env.LAW_API_OC_ID;

function loadLawApiService(ocId) {
  if (ocId !== undefined && ocId !== null && ocId !== '') {
    process.env.LAW_API_OC_ID = ocId;
  } else {
    delete process.env.LAW_API_OC_ID;
  }
  delete require.cache[require.resolve('../src/config')];
  delete require.cache[require.resolve('../src/services/lawApi.service')];
  return require('../src/services/lawApi.service');
}

describe('lawApi.service - searchStatutes', () => {
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
  });

  it('인증키 환경변수(LAW_API_OC_ID)가 없으면 가짜(Mock) 결과를 반환한다', async () => {
    const lawApiService = loadLawApiService('');
    const mockGet = mock.method(axios, 'get', async () => ({ data: {} }));

    const result = await lawApiService.searchStatutes('퇴직금');

    assert.equal(mockGet.mock.callCount(), 0);
    assert.equal(Array.isArray(result), true);
    assert.equal(result.length, 3);
    assert.equal(result[0].id, 'mock-law-1');
    assert.equal(result[0].title, '근로자퇴직급여 보장법');
  });

  it('인증키 환경변수가 있고 법제처 응답이 단일 객체이면 단일 요소를 가진 배열로 정규화하여 반환한다', async () => {
    const lawApiService = loadLawApiService('test-mock-key');
    const singleResponse = {
      data: {
        LawSearch: {
          law: {
            법령ID: '001',
            법령명한글: '근로자퇴직급여 보장법',
            소관부처명: '고용노동부',
            시행일자: '20240101',
          },
        },
      },
    };
    const mockGet = mock.method(axios, 'get', async () => singleResponse);

    const result = await lawApiService.searchStatutes('퇴직금');

    assert.equal(mockGet.mock.callCount(), 1);
    const [calledUrl, calledConfig] = mockGet.mock.calls[0].arguments;
    assert.equal(calledUrl, 'http://www.law.go.kr/DRF/lawSearch.do');
    assert.deepEqual(calledConfig, {
      params: {
        OC: 'test-mock-key',
        target: 'law',
        type: 'JSON',
        query: '퇴직금',
      },
      timeout: 10000,
    });
    assert.deepEqual(result, [
      {
        id: '001',
        title: '근로자퇴직급여 보장법',
        department: '고용노동부',
        effectiveDate: '20240101',
      },
    ]);
  });

  it('인증키 환경변수가 있고 법제처 응답이 배열이면 배열 형태로 정규화하여 반환한다', async () => {
    const lawApiService = loadLawApiService('test-mock-key');
    const arrayResponse = {
      data: {
        LawSearch: {
          law: [
            {
              법령ID: '001',
              법령명한글: '근로자퇴직급여 보장법',
              소관부처명: '고용노동부',
              시행일자: '20240101',
            },
            {
              법령ID: '002',
              법령명한글: '근로기준법',
              소관부처명: '고용노동부',
              시행일자: '20230808',
            },
          ],
        },
      },
    };
    const mockGet = mock.method(axios, 'get', async () => arrayResponse);

    const result = await lawApiService.searchStatutes('퇴직금');

    assert.equal(mockGet.mock.callCount(), 1);
    const [calledUrl, calledConfig] = mockGet.mock.calls[0].arguments;
    assert.equal(calledUrl, 'http://www.law.go.kr/DRF/lawSearch.do');
    assert.deepEqual(calledConfig, {
      params: {
        OC: 'test-mock-key',
        target: 'law',
        type: 'JSON',
        query: '퇴직금',
      },
      timeout: 10000,
    });
    assert.deepEqual(result, [
      {
        id: '001',
        title: '근로자퇴직급여 보장법',
        department: '고용노동부',
        effectiveDate: '20240101',
      },
      {
        id: '002',
        title: '근로기준법',
        department: '고용노동부',
        effectiveDate: '20230808',
      },
    ]);
  });
});
