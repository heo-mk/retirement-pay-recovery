export const STATUTE_WARNING_MONTHS = 33;
export const STATUTE_EXPIRED_MONTHS = 36;

export function isStatuteWarning(months: number | null): boolean {
  return months !== null && months >= STATUTE_WARNING_MONTHS;
}

export function isStatuteExpired(months: number | null): boolean {
  return months !== null && months >= STATUTE_EXPIRED_MONTHS;
}

export function statuteWarningText(months: number): string {
  return `소멸시효가 얼마 남지 않았습니다 (현재 ${months}개월 경과). 즉시 법원 지급명령 또는 소 제기를 통해 시효를 중단시키세요.`;
}

export function statuteExpiredText(months: number): string {
  return `입력하신 경과 기간(${months}개월)이 3년(36개월) 이상입니다. 소멸시효가 이미 지났을 수 있습니다. 다만 시효가 실제로 완성되었는지, 중간에 시효가 중단된 사정이 있었는지는 사안마다 달라 이 서비스에서 판단할 수 없습니다. 지체하지 말고 대한법률구조공단(국번없이 132)에서 무료 상담을 받아 보세요.`;
}
