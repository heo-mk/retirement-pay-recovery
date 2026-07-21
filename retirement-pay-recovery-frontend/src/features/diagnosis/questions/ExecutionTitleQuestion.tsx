interface Props {
  onAnswer: (hasTitle: boolean) => void;
}

export default function ExecutionTitleQuestion({ onAnswer }: Props) {
  return (
    <div className="question-card">
      <h2 className="question-title">집행권원을 확보하셨나요?</h2>
      <p className="question-desc">
        집행권원이란 법원의 <strong>지급명령, 판결문, 조정조서</strong> 등 강제집행을 할 수 있는
        공식 서류입니다. 간이대지급금을 수령한 경우도 포함됩니다.
      </p>
      <div className="answer-group">
        <button
          className="answer-btn answer-btn--yes"
          onClick={() => onAnswer(true)}
        >
          네, 있습니다
        </button>
        <button
          className="answer-btn answer-btn--no"
          onClick={() => onAnswer(false)}
        >
          아니요, 아직 없습니다
        </button>
      </div>
    </div>
  );
}
