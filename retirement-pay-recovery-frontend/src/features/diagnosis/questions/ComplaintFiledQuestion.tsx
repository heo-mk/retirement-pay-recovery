interface Props {
  onAnswer: (filed: boolean, correctionIgnored: boolean | null) => void;
}

export default function ComplaintFiledQuestion({ onAnswer }: Props) {
  return (
    <div className="question-card">
      <h2 className="question-title">고용노동부에 진정을 제기하셨나요?</h2>
      <p className="question-desc">
        진정을 제기하면 근로감독관이 사업주에게 <strong>시정명령</strong>을 내릴 수 있습니다.
        시정명령을 무시하면 사업주는 형사처벌 대상이 됩니다.
      </p>
      <div className="answer-group">
        <button
          className="answer-btn answer-btn--yes"
          onClick={() => onAnswer(true, true)}
        >
          네, 제기했고 — 시정명령도 무시됐습니다
        </button>
        <button
          className="answer-btn answer-btn--neutral"
          onClick={() => onAnswer(true, false)}
        >
          네, 제기했고 — 아직 처리 중입니다
        </button>
        <button
          className="answer-btn answer-btn--no"
          onClick={() => onAnswer(false, null)}
        >
          아니요, 아직 제기 안 했습니다
        </button>
      </div>
    </div>
  );
}
