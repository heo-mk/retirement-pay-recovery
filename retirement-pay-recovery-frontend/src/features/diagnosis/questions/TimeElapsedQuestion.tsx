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
      <div className="input-group">
        <input
          type="number"
          min={0}
          max={120}
          placeholder="예: 8"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          className="text-input"
        />
        <span className="input-suffix">개월</span>
      </div>
      <button
        className="answer-btn answer-btn--primary"
        onClick={handleSubmit}
        disabled={months === '' || isNaN(parseInt(months, 10))}
      >
        다음
      </button>
    </div>
  );
}
