import { describe, it, expect } from 'vitest';
import { isStatuteWarning, isStatuteExpired } from '../features/diagnosis/statuteWarning';

describe('statuteWarning', () => {
  describe('isStatuteWarning', () => {
    it('경과 개월이 null이면 false를 반환한다', () => {
      expect(isStatuteWarning(null)).toBe(false);
    });

    it('경과 개월이 24 미만이면 false를 반환한다', () => {
      expect(isStatuteWarning(23)).toBe(false);
    });

    it('경과 개월이 24 이상이면 true를 반환한다', () => {
      expect(isStatuteWarning(24)).toBe(true);
    });

    it('경과 개월이 36 이상이면 true를 반환한다', () => {
      expect(isStatuteWarning(36)).toBe(true);
    });
  });

  describe('isStatuteExpired', () => {
    it('경과 개월이 null이면 false를 반환한다', () => {
      expect(isStatuteExpired(null)).toBe(false);
    });

    it('경과 개월이 24 미만이면 false를 반환한다', () => {
      expect(isStatuteExpired(23)).toBe(false);
    });

    it('경과 개월이 24 이상 36 미만이면 false를 반환한다', () => {
      expect(isStatuteExpired(24)).toBe(false);
      expect(isStatuteExpired(35)).toBe(false);
    });

    it('경과 개월이 36 이상이면 true를 반환한다', () => {
      expect(isStatuteExpired(36)).toBe(true);
      expect(isStatuteExpired(40)).toBe(true);
    });
  });
});
