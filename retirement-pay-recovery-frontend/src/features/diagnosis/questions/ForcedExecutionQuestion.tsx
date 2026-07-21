interface Props {
  onAnswer: (tried: boolean) => void;
}

export default function ForcedExecutionQuestion({ onAnswer }: Props) {
  return (
    <div className="question-card">
      <h2 className="question-title">강제집행을 시도해 보셨나요?</h2>
      <p className="question-desc">
        집행권원이 있으면 법원에 <strong>재산 압류·추심 명령</strong>을 신청할 수 있습니다.
        부동산·예금·급여 등을 대상으로 할 수 있습니다.
      </p>
      <div className="answer-group">
        <button
          className="answer-btn answer-btn--yes"
          onClick={() => onAnswer(true)}
        >
          네, 시도했습니다
        </button>
        <button
          className="answer-btn answer-btn--no"
          onClick={() => onAnswer(false)}
        >
          아니요, 아직 안 했습니다
        </button>
      </div>
    </div>
  );
}
