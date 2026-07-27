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

      {/* 14일 법정 기한 및 합의 효력 핵심 안내 박스 */}
      <div className="my-5 p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-100 text-xs sm:text-sm space-y-2.5">
        <div className="font-bold text-amber-400 flex items-center gap-1.5 text-sm sm:text-base">
          <span>⚠️ 퇴직금 14일 기한 및 사용자와의 합의 주의사항</span>
        </div>
        <ul className="space-y-2 text-slate-200 leading-relaxed list-disc list-inside">
          <li>
            <strong className="text-amber-300">퇴직 후 14일 이내 합의 (법적 효력 있음):</strong> 퇴직 후 14일 이내에 사용자와 지급기일 연장 합의를 하면 <strong>법적 효력</strong>이 발생하여 합의 기한까지 임금체불 신고가 유예됩니다. <span className="text-red-400 font-semibold font-sans">사용자를 믿을 수 없다면 14일 이내 합의를 절대 해주지 마세요.</span>
          </li>
          <li>
            <strong className="text-amber-300">퇴직 전(재직 중) 합의 (법적 효력 없음/무효):</strong> 퇴직 전 재직 중에 쓴 지급연기 각서나 합의는 <strong>법적으로 무효</strong>입니다. 퇴직 후 14일 내 지급되지 않았다면 퇴직 전 합의와 상관없이 <strong>즉시 고용노동부에 진정서를 제출</strong>할 수 있습니다.
          </li>
        </ul>
      </div>
      {/* 모바일: 세로 쌓기(flex-col) / 태블릿 이상: 가로 나란히(md:flex-row)
          버튼 2개뿐이므로 가로 배치 시 md:flex-1로 균등 분할 */}
      <div className="answer-group flex flex-col md:flex-row gap-3">
        <button
          className="answer-btn answer-btn--yes w-full md:flex-1 py-3 min-h-[44px]"
          onClick={() => onAnswer(true)}
        >
          네, 받았습니다
        </button>
        <button
          className="answer-btn answer-btn--no w-full md:flex-1 py-3 min-h-[44px]"
          onClick={() => onAnswer(false)}
        >
          아니요, 못 받았습니다
        </button>
      </div>
    </div>
  );
}
