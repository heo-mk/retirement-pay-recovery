import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Zustand persist 미들웨어는 JSON 직렬화로 저장한다.
// 함수(파생 로직)를 스토어에 두면 새로고침 후 사라지므로,
// 스토어에는 순수 직렬화 가능한 데이터만 저장하고
// "지금 뭘 추천할지"같은 파생 로직은 useMemo를 쓰는 훅에서 계산한다.

export type Stage =
  | 'start'
  | 'received_check'
  | 'time_elapsed'
  | 'complaint_filed'
  | 'execution_title'
  | 'forced_execution'
  | 'opponent_resisting'
  | 'advanced_tactics'
  | 'resolved';

export interface CaseDetails {
  unpaidAmount: number | null;
  monthsElapsed: number | null;
  hasCorrectionOrderIgnored: boolean | null;
}

interface ProgressState {
  currentStage: Stage;
  caseDetails: CaseDetails;
  goToStage: (stage: Stage) => void;
  updateCaseDetails: (details: Partial<CaseDetails>) => void;
  reset: () => void;
}

const initialCaseDetails: CaseDetails = {
  unpaidAmount: null,
  monthsElapsed: null,
  hasCorrectionOrderIgnored: null,
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      currentStage: 'received_check',
      caseDetails: initialCaseDetails,
      goToStage: (stage) => set({ currentStage: stage }),
      updateCaseDetails: (details) =>
        set((state) => ({
          caseDetails: { ...state.caseDetails, ...details },
        })),
      reset: () =>
        set({ currentStage: 'received_check', caseDetails: initialCaseDetails }),
    }),
    { name: 'retirement-pay-progress' }
  )
);
