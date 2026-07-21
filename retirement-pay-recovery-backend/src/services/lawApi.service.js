'use strict';

const axios = require('axios');
const { LAW_API_OC_ID } = require('../config');

const LAW_SEARCH_BASE = 'http://www.law.go.kr/DRF/lawSearch.do';

// ─── Mock 데이터 ──────────────────────────────────────────────────────────────
const MOCK_STATUTES = [
  { id: 'mock-law-1', title: '근로자퇴직급여 보장법', department: '고용노동부', effectiveDate: '2024-01-01' },
  { id: 'mock-law-2', title: '근로기준법', department: '고용노동부', effectiveDate: '2023-08-08' },
  { id: 'mock-law-3', title: '임금채권보장법', department: '고용노동부', effectiveDate: '2023-06-01' },
];

const MOCK_PRECEDENTS = [
  {
    id: 'mock-prec-1',
    caseName: '퇴직금 청구',
    caseNumber: '대법원 2020다12345',
    court: '대법원',
    judgmentDate: '2020-09-15',
    summary: '퇴직금 지급의무 불이행에 대한 손해배상 인정',
  },
  {
    id: 'mock-prec-2',
    caseName: '임금체불 손해배상',
    caseNumber: '서울고법 2021나67890',
    court: '서울고등법원',
    judgmentDate: '2021-04-22',
    summary: '사용자의 임금체불 행위가 불법행위를 구성한다고 판단',
  },
  {
    id: 'mock-prec-3',
    caseName: '퇴직금 우선변제',
    caseNumber: '서울중앙지법 2022가합11111',
    court: '서울중앙지방법원',
    judgmentDate: '2022-11-30',
    summary: '퇴직금 채권의 최우선변제권 인정 범위 확인',
  },
];

// ─── 헬퍼 ────────────────────────────────────────────────────────────────────

/**
 * 빈 문자열, null, undefined를 안전하게 문자열로 변환한다.
 * 숫자 계산에 사용하는 값이 아닌 화면 표시용이므로 '' 대신 null을 반환한다.
 */
function safeStr(value) {
  if (value === null || value === undefined || value === '') return null;
  return String(value).trim();
}

/**
 * 법제처 API를 호출한다.
 * @param {'law'|'prec'} target
 * @param {string} keyword
 */
async function callLawSearch(target, keyword) {
  const params = {
    OC: LAW_API_OC_ID,
    target,
    type: 'JSON',
    query: keyword,
  };

  let response;
  try {
    response = await axios.get(LAW_SEARCH_BASE, { params, timeout: 10000 });
  } catch (err) {
    console.error(`[lawApi] 외부 API 호출 실패 (target=${target}):`, err.message);
    throw new Error('law api unavailable');
  }

  // 법제처는 Accept 무관하게 Content-Type이 불일치할 수 있으므로 직접 파싱
  const data = response.data;
  if (typeof data !== 'object' || data === null) {
    console.error('[lawApi] JSON 파싱 실패 — 응답이 객체가 아님:', typeof data);
    throw new Error('law api unavailable');
  }

  return data;
}

// ─── 공개 함수 ────────────────────────────────────────────────────────────────

/**
 * 법령 목록 검색
 * @param {string} keyword
 * @returns {Promise<Array<{id,title,department,effectiveDate}>>}
 */
async function searchStatutes(keyword) {
  if (!LAW_API_OC_ID) {
    console.warn('[lawApi] LAW_API_OC_ID 미설정 → mock 데이터 반환');
    return MOCK_STATUTES;
  }

  const data = await callLawSearch('law', keyword);

  // 법제처 JSON 구조: data.LawSearch.law = 배열 또는 단일 객체
  const rawList = data?.LawSearch?.law;
  if (!rawList) return [];

  const list = Array.isArray(rawList) ? rawList : [rawList];

  return list.map((item) => ({
    id: safeStr(item.법령ID),
    title: safeStr(item.법령명한글),
    department: safeStr(item.소관부처명),
    effectiveDate: safeStr(item.시행일자),
  }));
}

/**
 * 판례 목록 검색
 * @param {string} keyword
 * @returns {Promise<Array<{id,caseName,caseNumber,court,judgmentDate,summary}>>}
 */
async function searchPrecedents(keyword) {
  if (!LAW_API_OC_ID) {
    console.warn('[lawApi] LAW_API_OC_ID 미설정 → mock 데이터 반환');
    return MOCK_PRECEDENTS;
  }

  const data = await callLawSearch('prec', keyword);

  // 법제처 JSON 구조: data.PrecSearch.prec = 배열 또는 단일 객체
  const rawList = data?.PrecSearch?.prec;
  if (!rawList) return [];

  const list = Array.isArray(rawList) ? rawList : [rawList];

  return list.map((item) => ({
    id: safeStr(item.판례일련번호),
    caseName: safeStr(item.사건명),
    caseNumber: safeStr(item.사건번호),
    court: safeStr(item.법원명),
    judgmentDate: safeStr(item.선고일자),
    summary: safeStr(item.판시사항),
  }));
}

module.exports = { searchStatutes, searchPrecedents };
