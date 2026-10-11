import { describe, it, expect, beforeEach } from 'vitest';
import { useProgressStore } from '../stores/progressStore';

describe('progressStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useProgressStore.getState().reset();
  });

  describe('goToStage', () => {
    it('단계 이동 시 이전 단계가 stageHistory에 기록되고 currentStage가 새 단계로 변경된다', () => {
      expect(useProgressStore.getState().currentStage).toBe('received_check');
      expect(useProgressStore.getState().stageHistory).toEqual([]);

      useProgressStore.getState().goToStage('time_elapsed');

      expect(useProgressStore.getState().currentStage).toBe('time_elapsed');
      expect(useProgressStore.getState().stageHistory).toEqual(['received_check']);
    });
  });

  describe('goBack', () => {
    it('이력이 비어 있을 때 goBack을 호출하면 현재 단계 상태가 그대로 유지된다', () => {
      expect(useProgressStore.getState().stageHistory).toEqual([]);
      expect(useProgressStore.getState().currentStage).toBe('received_check');

      useProgressStore.getState().goBack();

      expect(useProgressStore.getState().currentStage).toBe('received_check');
      expect(useProgressStore.getState().stageHistory).toEqual([]);
    });

    it('이력이 있을 때 goBack을 호출하면 이전 단계로 복원되고 이력에서 제거된다', () => {
      useProgressStore.getState().goToStage('time_elapsed');
      useProgressStore.getState().goToStage('agreement_check');
      expect(useProgressStore.getState().currentStage).toBe('agreement_check');
      expect(useProgressStore.getState().stageHistory).toEqual(['received_check', 'time_elapsed']);

      useProgressStore.getState().goBack();

      expect(useProgressStore.getState().currentStage).toBe('time_elapsed');
      expect(useProgressStore.getState().stageHistory).toEqual(['received_check']);
    });
  });
});
