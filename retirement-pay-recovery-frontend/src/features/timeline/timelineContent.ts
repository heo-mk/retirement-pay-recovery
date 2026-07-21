import type { Stage } from '../../stores/progressStore';

export interface TimelineEntry {
  id: string;
  stageKey: Stage;        // progressStore의 Stage 값과 동일 — 두 기능 연결 키
  title: string;
  body: string;           // 실제 경험 서술 (작성자가 직접 채울 것)
  pitfall?: string;       // "이때 하지 않아도 될 일" / 시행착오
  worstCase?: string;     // 최악의 상황에서 고려할 점
}

export const timelineContent: TimelineEntry[] = [
  {
    id: 'entry-start',
    stageKey: 'start',
    title: '퇴직금을 못 받았다는 것을 처음 깨달은 날',
    body: 'TODO: 내용 작성',
  },
  {
    id: 'entry-received-check',
    stageKey: 'received_check',
    title: '체불 확인서를 손에 넣다',
    body: 'TODO: 내용 작성',
    pitfall: 'TODO: 이때 하지 않아도 될 일 작성',
  },
  {
    id: 'entry-time-elapsed',
    stageKey: 'time_elapsed',
    title: '시간이 흘러도 해결이 안 될 때',
    body: 'TODO: 내용 작성',
    worstCase: 'TODO: 시효가 임박했을 때 고려할 점 작성',
  },
  {
    id: 'entry-complaint-filed',
    stageKey: 'complaint_filed',
    title: '고용노동부에 진정을 넣다',
    body: 'TODO: 내용 작성',
    pitfall: 'TODO: 진정 과정에서 피했어야 할 실수 작성',
  },
  {
    id: 'entry-execution-title',
    stageKey: 'execution_title',
    title: '지급명령(집행권원)을 받다',
    body: 'TODO: 내용 작성',
    pitfall: 'TODO: 지급명령 신청 시 흔한 실수 작성',
  },
  {
    id: 'entry-forced-execution',
    stageKey: 'forced_execution',
    title: '강제집행을 신청하다',
    body: 'TODO: 내용 작성',
    worstCase: 'TODO: 재산이 없을 때 대안 작성',
  },
  {
    id: 'entry-opponent-resisting',
    stageKey: 'opponent_resisting',
    title: '사업주가 버티기 시작했을 때',
    body: 'TODO: 내용 작성',
    pitfall: 'TODO: 버티기 국면에서 감정적으로 대응했던 실수 작성',
    worstCase: 'TODO: 상대방이 폐업·재산 은닉 시 고려할 점 작성',
  },
  {
    id: 'entry-advanced-tactics',
    stageKey: 'advanced_tactics',
    title: '마지막 수단: 고강도 압박 수단들',
    body: 'TODO: 내용 작성',
    worstCase: 'TODO: 비용 대비 회수 가능성을 저울질해야 하는 상황 작성',
  },
  {
    id: 'entry-resolved',
    stageKey: 'resolved',
    title: '드디어 해결됐다',
    body: 'TODO: 내용 작성',
    pitfall: 'TODO: 합의 과정에서 조심해야 했던 점 작성',
  },
];
