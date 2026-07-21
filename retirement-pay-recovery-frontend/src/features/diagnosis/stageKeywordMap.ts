import type { Stage } from '../../stores/progressStore';

/**
 * 단계(Stage) → 법령·판례 검색 키워드 매핑
 *
 * - 매핑에 없는 단계는 법령·판례 섹션 자체를 렌더링하지 않는다.
 * - 키워드는 법제처 API가 잘 인식하는 공식 용어를 우선 사용한다.
 * - 백엔드(lawApi.service.js)가 실제 API 키로 교체되어도
 *   이 매핑은 그대로 유지된다.
 */
export const stageKeywordMap: Partial<Record<Stage, string>> = {
  received_check:     '퇴직금 체불',
  time_elapsed:       '임금채권 소멸시효',
  complaint_filed:    '임금체불 진정 근로감독',
  execution_title:    '집행권원 지급명령',
  forced_execution:   '강제집행 민사집행법',
  opponent_resisting: '재산압류 채권추심',
  advanced_tactics:   '간이대지급금 임금채권보장',
  resolved:           '퇴직금 청구 확정판결',
  // 'start'는 매핑 없음 → 법령·판례 섹션을 표시하지 않음
};
