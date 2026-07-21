interface Props {
  onAnswer: (received: boolean) => void;
}

// 다음 단계가 무엇인지는 이 컴포넌트가 모른다. DiagnosisWizard가 결정한다.
export default function ReceivedCheckQuestion({ onAnswer }: Props) {
  return (
    <div className="question-card">
      <h2 className="question-title">퇴직금을 이미 받으셨나요?</h2>
      <p className="question-desc">
        퇴직 후 14일 이내에 퇴직금을 지급받았는지 확인해 주세요.
      </p>
      <div className="answer-group">
        <button className="answer-btn answer-btn--yes" onClick={() => onAnswer(true)}>
          네, 받았습니다
        </button>
        <button className="answer-btn answer-btn--no" onClick={() => onAnswer(false)}>
          아니요, 못 받았습니다
        </button>
      </div>
    </div>
  );
}
