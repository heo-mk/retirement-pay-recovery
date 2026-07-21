interface Props {
  onAnswer: (isResisting: boolean) => void;
}

export default function OpponentResistingQuestion({ onAnswer }: Props) {
  return (
    <div className="question-card">
      <h2 className="question-title">상대방이 계속 버티고 있나요?</h2>
      <p className="question-desc">
        강제집행 후에도 상대방이 재산을 숨기거나 이전하는 등 회피 행위를 하고 있나요?
        이 경우 <strong>채권 압류·추심 명령, 내용증명</strong> 등 고급 전술을 활용할 수 있습니다.
      </p>
      {/* 모바일: 세로 / 태블릿 이상: 가로 나란히 */}
      <div className="answer-group flex flex-col md:flex-row gap-3">
        <button
          className="answer-btn answer-btn--no w-full md:flex-1 py-3 min-h-[44px]"
          onClick={() => onAnswer(true)}
        >
          네, 여전히 버티고 있습니다
        </button>
        <button
          className="answer-btn answer-btn--yes w-full md:flex-1 py-3 min-h-[44px]"
          onClick={() => onAnswer(false)}
        >
          아니요, 해결됐습니다
        </button>
      </div>
    </div>
  );
}
