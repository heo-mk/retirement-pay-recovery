import { useState } from 'react';

interface Props {
  onAnswer: (months: number) => void;
}

export default function TimeElapsedQuestion({ onAnswer }: Props) {
  const [months, setMonths] = useState('');

  const handleSubmit = () => {
    const value = parseInt(months, 10);
    if (!isNaN(value) && value >= 0) {
      onAnswer(value);
    }
  };

  return (
    <div className="question-card">
      <h2 className="question-title">퇴직 후 몇 개월이 지났나요?</h2>
      <p className="question-desc">
        퇴직금 청구권의 소멸시효는 <strong>3년(36개월)</strong>입니다.
        경과 기간에 따라 조치의 긴급도가 달라집니다.
      </p>
      {/* 모바일: 입력 + 단위 한 행, 버튼 바로 아래 전체 너비
          input-group은 기존 CSS에서 flex row로 처리하므로 그대로 유지 */}
      <div className="input-group">
        <input
          type="number"
          min={0}
          max={120}
          placeholder="예: 8"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          className="text-input flex-1 w-full py-3 min-h-[44px]"
        />
        <span className="input-suffix">개월</span>
      </div>
      {/* 확인 버튼 — 모바일에서 전체 너비, 최소 44px 높이 */}
      <button
        className="answer-btn answer-btn--primary w-full py-3 min-h-[44px]"
        onClick={handleSubmit}
        disabled={months === '' || isNaN(parseInt(months, 10))}
      >
        다음
      </button>
    </div>
  );
}
