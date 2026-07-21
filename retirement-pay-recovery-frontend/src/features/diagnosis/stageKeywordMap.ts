import type { Stage } from '../../stores/progressStore';

/**
 * 단계(Stage) → 법령·판례 검색 키워드 매핑
 *
 * - 매핑에 없는 단계는 법령·판례 섹션 자체를 렌더링하지 않는다.
 * - 키워드는 법제처 API(law.go.kr)에서 실제 결과를 반환하는 공식 법률명을 사용한다.
 *   복합 키워드는 법제처가 OR 검색해 무관한 법령이 섞이므로 단일 법률명을 우선한다.
 * - 백엔드(lawApi.service.js)가 실제 API 키로 교체되어도 이 매핑은 그대로 유지된다.
 */
export const stageKeywordMap: Partial<Record<Stage, string>> = {
  received_check:     '근로자퇴직급여 보장법',   // 퇴직금 체불 → 퇴직급여 보장 근거 법령
  time_elapsed:       '임금채권보장법',           // 임금채권 소멸시효 → 임금채권보장 법령
  complaint_filed:    '근로기준법',               // 임금체불 진정 → 근로기준법 체불 제재 규정
  execution_title:    '민사소송법',               // 집행권원(지급명령) → 민사소송법
  forced_execution:   '민사집행법',               // 강제집행 → 민사집행법
  opponent_resisting: '채무자 회생 및 파산에 관한 법률', // 재산압류 저항 → 도산법
  advanced_tactics:   '임금채권보장법',           // 간이대지급금 → 임금채권보장법
  resolved:           '근로자퇴직급여 보장법',   // 해결 완료 → 퇴직급여 보장 법령 최종 확인
  // 'start'는 매핑 없음 → 법령·판례 섹션을 표시하지 않음
};

