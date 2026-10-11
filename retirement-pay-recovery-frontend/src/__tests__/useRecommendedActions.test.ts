import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRecommendedActions } from '../features/diagnosis/useRecommendedActions';
import { useProgressStore } from '../stores/progressStore';
import { statuteWarningText, statuteExpiredText } from '../features/diagnosis/statuteWarning';

describe('useRecommendedActions', () => {
  beforeEach(() => {
    localStorage.clear();
    useProgressStore.getState().reset();
  });

  it('경과 개월이 null이면 소멸시효 관련 긴급 항목이 추가되지 않는다', () => {
    useProgressStore.getState().updateCaseDetails({ monthsElapsed: null });
    const { result } = renderHook(() => useRecommendedActions());

    const statuteAction = result.current.find(
      (action) => action.id === 'statute-warning' || action.id === 'statute-expired'
    );
    expect(statuteAction).toBeUndefined();
  });

  it('경과 개월이 24 미만이면 소멸시효 관련 긴급 항목이 추가되지 않는다', () => {
    useProgressStore.getState().updateCaseDetails({ monthsElapsed: 20 });
    const { result } = renderHook(() => useRecommendedActions());

    const statuteAction = result.current.find(
      (action) => action.id === 'statute-warning' || action.id === 'statute-expired'
    );
    expect(statuteAction).toBeUndefined();
  });

  it('경과 개월이 24 이상 36 미만이면 소멸시효 경고 긴급 항목과 경고 문구가 추가된다', () => {
    useProgressStore.getState().updateCaseDetails({ monthsElapsed: 34 });
    const { result } = renderHook(() => useRecommendedActions());

    const statuteAction = result.current.find((action) => action.id === 'statute-warning');
    expect(statuteAction).toBeDefined();
    expect(statuteAction?.isUrgent).toBe(true);
    expect(statuteAction?.text).toBe(statuteWarningText(34));
  });

  it('경과 개월이 36 이상이면 소멸시효 만료 긴급 항목과 만료 문구가 추가된다', () => {
    useProgressStore.getState().updateCaseDetails({ monthsElapsed: 36 });
    const { result } = renderHook(() => useRecommendedActions());

    const statuteAction = result.current.find((action) => action.id === 'statute-expired');
    expect(statuteAction).toBeDefined();
    expect(statuteAction?.isUrgent).toBe(true);
    expect(statuteAction?.text).toBe(statuteExpiredText(36));
  });
});
