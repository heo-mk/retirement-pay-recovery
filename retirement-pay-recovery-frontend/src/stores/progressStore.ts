import { create } from 'zustand';

// 사용자의 진단 진행 상황(클라이언트 상태)을 Zustand로 관리
// 서버 상태(법령·판례 검색)는 TanStack Query가 담당하고, 이 store는 순수 클라이언트 UI 상태만 다룬다.
interface ProgressState {
  currentStep: number;
  answers: Record<string, string>;
  setCurrentStep: (step: number) => void;
  setAnswer: (questionId: string, answer: string) => void;
  reset: () => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  currentStep: 0,
  answers: {},
  setCurrentStep: (step) => set({ currentStep: step }),
  setAnswer: (questionId, answer) =>
    set((state) => ({ answers: { ...state.answers, [questionId]: answer } })),
  reset: () => set({ currentStep: 0, answers: {} }),
}));
