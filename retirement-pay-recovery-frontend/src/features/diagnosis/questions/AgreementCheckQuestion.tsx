import { useState } from 'react';
import type { AgreementStatus } from '../../../stores/progressStore';

interface Props {
  onAnswer: (status: AgreementStatus) => void;
}

export default function AgreementCheckQuestion({ onAnswer }: Props) {
  const [selected, setSelected] = useState<AgreementStatus | null>(null);

  const handleSelect = (status: AgreementStatus) => {
    setSelected(status);
  };

  const handleNext = () => {
    if (selected) {
      onAnswer(selected);
    }
  };

  return (
    <div className="question-card">
      <h2 className="question-title">사용자와 퇴직금 지급기일 연장 합의(각서)를 하셨나요?</h2>
      <p className="question-desc">
        퇴직금 지급 연장 합의는 <strong>합의 시점(퇴직 전 vs 퇴직 후 14일 이내)</strong>에 따라 법적 효력이 완전히 다릅니다. 본인 상황을 선택해 보세요.
      </p>

      <div className="answer-group flex flex-col gap-3 my-4">
        {/* 옵션 1: 퇴직 전 합의 */}
        <button
          type="button"
          className={`answer-btn text-left p-3.5 rounded-xl border transition-all ${
            selected === 'pre_retirement'
              ? 'bg-red-950/60 border-red-500 text-red-100 shadow-md ring-2 ring-red-500/50'
              : 'bg-slate-900/60 border-slate-700/80 text-slate-200 hover:bg-slate-800/60'
          }`}
          onClick={() => handleSelect('pre_retirement')}
        >
          <div className="font-bold text-sm sm:text-base">1. 퇴직 전(재직 중)에 지급 연기 합의나 각서를 썼습니다</div>
          <div className="text-xs text-slate-400 mt-1">입사 시 또는 재직 중 회사의 요구로 연장/포기 각서를 써준 경우</div>
        </button>

        {/* 옵션 2: 퇴직 후 14일 이내 합의 함 */}
        <button
          type="button"
          className={`answer-btn text-left p-3.5 rounded-xl border transition-all ${
            selected === 'post_retirement_within_14d'
              ? 'bg-amber-950/60 border-amber-500 text-amber-100 shadow-md ring-2 ring-amber-500/50'
              : 'bg-slate-900/60 border-slate-700/80 text-slate-200 hover:bg-slate-800/60'
          }`}
          onClick={() => handleSelect('post_retirement_within_14d')}
        >
          <div className="font-bold text-sm sm:text-base">2. 퇴직 후 14일 이내에 지급기일 연장 합의를 해주었습니다</div>
          <div className="text-xs text-slate-400 mt-1">퇴직 후 "언제까지 줄 테니 기다려달라"는 요청에 동의한 경우</div>
        </button>

        {/* 옵션 3: 퇴직 후 14일 이내 합의 거절 */}
        <button
          type="button"
          className={`answer-btn text-left p-3.5 rounded-xl border transition-all ${
            selected === 'post_retirement_no_agreement'
              ? 'bg-indigo-950/60 border-indigo-500 text-indigo-100 shadow-md ring-2 ring-indigo-500/50'
              : 'bg-slate-900/60 border-slate-700/80 text-slate-200 hover:bg-slate-800/60'
          }`}
          onClick={() => handleSelect('post_retirement_no_agreement')}
        >
          <div className="font-bold text-sm sm:text-base">3. 퇴직 후 14일 이내이지만 연장 합의를 해주지 않았습니다</div>
          <div className="text-xs text-slate-400 mt-1">사용자가 연장을 요청했으나 거절했거나 합의해주지 않은 경우</div>
        </button>

        {/* 옵션 4: 합의 없음 */}
        <button
          type="button"
          className={`answer-btn text-left p-3.5 rounded-xl border transition-all ${
            selected === 'none'
              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-100 shadow-md ring-2 ring-emerald-500/50'
              : 'bg-slate-900/60 border-slate-700/80 text-slate-200 hover:bg-slate-800/60'
          }`}
          onClick={() => handleSelect('none')}
        >
          <div className="font-bold text-sm sm:text-base">4. 어떠한 합의도 하지 않았습니다</div>
          <div className="text-xs text-slate-400 mt-1">지급 연기 관련 대화나 문서 작성이 전혀 없었던 경우</div>
        </button>
      </div>

      {/* 실시간 진단 법률 피드백 박스 */}
      {selected && (
        <div className="my-4 p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2 animate-fadeIn">
          {selected === 'pre_retirement' && (
            <div className="p-3.5 rounded-lg bg-red-950/80 border border-red-500/80 text-red-100">
              <span className="font-extrabold text-red-300 block mb-1 text-sm">🚨 법적 진단: 무효 (법적 효력 없음)</span>
              퇴직 전 재직 중에 쓴 지급연기 각서나 합의는 강행법규 위반으로 <strong>법적으로 완전히 무효</strong>입니다. 퇴직 전 작성한 문서와 상관없이, 퇴직 후 14일이 지났다면 <strong>즉시 고용노동부에 진정을 제기할 수 있습니다.</strong>
            </div>
          )}

          {selected === 'post_retirement_within_14d' && (
            <div className="p-3.5 rounded-lg bg-amber-950/80 border border-amber-500/80 text-amber-100">
              <span className="font-extrabold text-amber-300 block mb-1 text-sm">⚠️ 법적 진단: 유효 (법적 효력 인정)</span>
              퇴직 후 14일 이내에 성립한 합의는 <strong>법적 효력이 발생</strong>하여 약정한 날짜까지 체불 신고가 유예됩니다. 약정된 기한까지는 대기 후 미지급 시 진정을 진행해야 합니다. 
              <br /><span className="text-red-300 font-bold block mt-1">※ 사용자를 신뢰할 수 없다면 절대 추가 연장 합의를 해주지 마세요!</span>
            </div>
          )}

          {selected === 'post_retirement_no_agreement' && (
            <div className="p-3.5 rounded-lg bg-indigo-950/80 border border-indigo-500/80 text-indigo-100">
              <span className="font-extrabold text-indigo-300 block mb-1 text-sm">💡 법적 진단: 최선의 대응</span>
              매우 잘하셨습니다! 사용자를 신뢰할 수 없다면 퇴직 후 14일 이내에 <strong>절대 연장 합의를 해주지 말아야 합니다.</strong> 14일 법정 기한이 통과하는 즉시 바로 고용노동부에 진정서를 제기할 수 있습니다.
            </div>
          )}

          {selected === 'none' && (
            <div className="p-3.5 rounded-lg bg-emerald-950/80 border border-emerald-500/80 text-emerald-100">
              <span className="font-extrabold text-emerald-300 block mb-1 text-sm">✅ 법적 진단: 정상 진행 가능</span>
              별도의 연장 합의가 없으므로 퇴직 후 14일이 지나면 <strong>즉시 고용노동부에 임금체불 진정을 제기</strong>할 수 있습니다.
            </div>
          )}
        </div>
      )}

      {/* 다음 버튼 */}
      <button
        type="button"
        className="answer-btn answer-btn--primary w-full py-3 min-h-[44px] mt-2"
        onClick={handleNext}
        disabled={!selected}
      >
        다음 단계로 →
      </button>
    </div>
  );
}
