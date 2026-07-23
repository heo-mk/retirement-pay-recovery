import { useProgressStore } from '../../stores/progressStore';
import type { Stage } from '../../stores/progressStore';
import ReceivedCheckQuestion from './questions/ReceivedCheckQuestion';
import TimeElapsedQuestion from './questions/TimeElapsedQuestion';
import ComplaintFiledQuestion from './questions/ComplaintFiledQuestion';
import ExecutionTitleQuestion from './questions/ExecutionTitleQuestion';
import ForcedExecutionQuestion from './questions/ForcedExecutionQuestion';
import OpponentResistingQuestion from './questions/OpponentResistingQuestion';
import ResultCard from './ResultCard';

const STAGE_ORDER: Stage[] = [
  'received_check',
  'time_elapsed',
  'complaint_filed',
  'execution_title',
  'forced_execution',
  'opponent_resisting',
];

const STAGE_LABELS: Record<Stage, string> = {
  received_check: '지급여부',
  time_elapsed: '기간경과',
  complaint_filed: '노동청신고',
  execution_title: '집행권원',
  forced_execution: '강제집행',
  opponent_resisting: '추가대응',
  advanced_tactics: '심화',
  resolved: '해결',
};

/**
 * DiagnosisWizard: 모든 단계 전환 로직을 전담한다.
 * 질문 컴포넌트는 "다음이 뭔지" 모르고, 오직 onAnswer 콜백만 호출한다.
 */
export default function DiagnosisWizard() {
  const currentStage = useProgressStore((s) => s.currentStage);
  const stageHistory = useProgressStore((s) => s.stageHistory);
  const goToStage = useProgressStore((s) => s.goToStage);
  const goBack = useProgressStore((s) => s.goBack);
  const updateCaseDetails = useProgressStore((s) => s.updateCaseDetails);
  const reset = useProgressStore((s) => s.reset);

  // 진행 표시줄 계산
  const isResult = currentStage === 'resolved' || currentStage === 'advanced_tactics';
  let effectiveStepIndex = STAGE_ORDER.indexOf(currentStage as Stage);
  if (isResult && stageHistory.length > 0) {
    effectiveStepIndex = STAGE_ORDER.indexOf(stageHistory[stageHistory.length - 1]);
  } else if (isResult) {
    effectiveStepIndex = STAGE_ORDER.length - 1;
  }

  // ── 단계별 분기 렌더링 ────────────────────────────────────────────────────

  const renderQuestion = () => {
    switch (currentStage) {

      case 'received_check':
        return (
          <ReceivedCheckQuestion
            onAnswer={(received) => {
              if (received) {
                // 조기 종료: 이미 받은 경우
                goToStage('resolved');
              } else {
                goToStage('time_elapsed');
              }
            }}
          />
        );

      case 'time_elapsed':
        return (
          <TimeElapsedQuestion
            onAnswer={(months) => {
              updateCaseDetails({ monthsElapsed: months });
              goToStage('complaint_filed');
            }}
          />
        );

      case 'complaint_filed':
        return (
          <ComplaintFiledQuestion
            onAnswer={(_filed, correctionIgnored) => {
              updateCaseDetails({ hasCorrectionOrderIgnored: correctionIgnored });
              goToStage('execution_title');
            }}
          />
        );

      case 'execution_title':
        return (
          <ExecutionTitleQuestion
            onAnswer={(hasTitle) => {
              if (hasTitle) {
                goToStage('forced_execution');
              } else {
                // 집행권원 없음 → 확보 방법 안내로 결과 표시
                goToStage('execution_title');
                goToStage('advanced_tactics'); // 우회: 결과 카드에서 집행권원 취득법 안내
              }
            }}
          />
        );

      case 'forced_execution':
        return (
          <ForcedExecutionQuestion
            onAnswer={(tried) => {
              if (tried) {
                goToStage('opponent_resisting');
              } else {
                // 미시도 → 강제집행 방법 안내
                goToStage('forced_execution');
                goToStage('advanced_tactics');
              }
            }}
          />
        );

      case 'opponent_resisting':
        return (
          <OpponentResistingQuestion
            onAnswer={(isResisting) => {
              if (isResisting) {
                goToStage('advanced_tactics');
              } else {
                goToStage('resolved');
              }
            }}
          />
        );

      case 'advanced_tactics':
      case 'resolved':
        return <ResultCard />;

      default:
        // 알 수 없는 단계(예: localStorage 잔재)는 첫 질문으로 자동 리셋
        goToStage('received_check');
        return null;
    }
  };

  return (
    // 모바일: px-4 / PC: 좌우 여백 확대 + 최대 2xl 너비로 제한해 가독성 확보
    <main className="wizard-container px-4 lg:px-8 lg:max-w-2xl lg:mx-auto">
      {/* 헤더 */}
      <header className="wizard-header">
        <h1 className="wizard-title">퇴직금 회수 진단 도구</h1>
        <p className="wizard-subtitle">몇 가지 질문으로 지금 취해야 할 행동을 알려드립니다</p>
      </header>

      {/* 진행 표시줄 (결과 화면에서도 항상 표시) */}
      <div className="mb-10 px-2" aria-label={`진행 상태`}>
        <div className="flex justify-between items-end mb-5">
          <div className="text-sm text-slate-400 font-medium">
            {isResult ? '진단 완료' : `진단 ${effectiveStepIndex + 1} / ${STAGE_ORDER.length}`}
          </div>
            
            {/* 우상단 컨트롤 버튼 */}
            <div className="flex items-center gap-2 shrink-0">
              <button 
                className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all
                  ${stageHistory.length === 0 
                    ? 'text-slate-600 bg-slate-800/30 cursor-not-allowed border border-slate-700/30' 
                    : 'text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 cursor-pointer active:scale-95 border border-indigo-500/20'
                  }`}
                onClick={goBack}
                disabled={stageHistory.length === 0}
                title="이전 질문으로 돌아가기"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                이전 단계
              </button>
              
              <button 
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-400 bg-slate-800/50 hover:bg-slate-700 hover:text-white cursor-pointer transition-all active:scale-95 flex items-center gap-1.5 border border-slate-700/50"
                onClick={reset}
                title="처음부터 다시 진단하기"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                초기화
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between relative mt-4 mb-8">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-800 -z-10 rounded-full" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 -z-10 rounded-full transition-all duration-700 ease-in-out" 
            style={{ width: `${(effectiveStepIndex / (STAGE_ORDER.length - 1)) * 100}%` }} 
          />
          {STAGE_ORDER.map((stage, idx) => {
            const isCompleted = isResult ? idx <= effectiveStepIndex : idx <= effectiveStepIndex;
            const isCurrent = !isResult && idx === effectiveStepIndex;
            return (
              <div 
                key={stage} 
                className={`relative flex items-center justify-center w-6 h-6 rounded-full transition-all duration-500
                  ${isCurrent ? 'scale-125' : ''}
                `}
              >
                {/* Outer glow/vortex effect for current step */}
                {isCurrent && (
                  <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-40"></div>
                )}
                {/* Node itself */}
                <div className={`w-full h-full rounded-full border-2 flex items-center justify-center z-10 transition-colors duration-300
                  ${isCurrent ? 'bg-slate-900 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 
                    isCompleted ? 'bg-indigo-500 border-indigo-500' : 'bg-slate-800 border-slate-600'}
                `}>
                  {isCurrent && <div className="w-2 h-2 bg-purple-400 rounded-full" />}
                  {isResult && isCompleted && idx === effectiveStepIndex && <div className="w-2 h-2 bg-indigo-200 rounded-full" />}
                </div>

                {/* 단계 이름 레이블 */}
                <span className={`absolute top-full mt-3 text-[11px] sm:text-xs whitespace-nowrap transition-colors duration-300
                  ${isCurrent ? 'text-purple-300 font-bold' : isCompleted ? 'text-indigo-300' : 'text-slate-500'}
                  ${isCurrent && !isResult ? 'scale-90' : ''} 
                `}>
                  {STAGE_LABELS[stage]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 질문 / 결과 카드 */}
      <section className="wizard-body">
        {renderQuestion()}
      </section>

    </main>
  );
}
