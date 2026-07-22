import { useProgressStore } from '../../stores/progressStore';
import type { Stage } from '../../stores/progressStore';
import ReceivedCheckQuestion from './questions/ReceivedCheckQuestion';
import TimeElapsedQuestion from './questions/TimeElapsedQuestion';
import ComplaintFiledQuestion from './questions/ComplaintFiledQuestion';
import ExecutionTitleQuestion from './questions/ExecutionTitleQuestion';
import ForcedExecutionQuestion from './questions/ForcedExecutionQuestion';
import OpponentResistingQuestion from './questions/OpponentResistingQuestion';
import ResultCard from './ResultCard';

// 단계 순서 레이블 (진행 표시줄용)
const STAGE_ORDER: Stage[] = [
  'received_check',
  'time_elapsed',
  'complaint_filed',
  'execution_title',
  'forced_execution',
  'opponent_resisting',
];

/**
 * DiagnosisWizard: 모든 단계 전환 로직을 전담한다.
 * 질문 컴포넌트는 "다음이 뭔지" 모르고, 오직 onAnswer 콜백만 호출한다.
 */
export default function DiagnosisWizard() {
  const currentStage = useProgressStore((s) => s.currentStage);
  const goToStage = useProgressStore((s) => s.goToStage);
  const updateCaseDetails = useProgressStore((s) => s.updateCaseDetails);
  const reset = useProgressStore((s) => s.reset);

  // 진행 표시줄 계산
  const stepIndex = STAGE_ORDER.indexOf(currentStage as Stage);
  const isResult = currentStage === 'resolved' || currentStage === 'advanced_tactics';
  const progress = isResult ? 100 : ((stepIndex + 1) / STAGE_ORDER.length) * 100;

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

      {/* 진행 표시줄 */}
      {!isResult && (
        <div className="progress-bar-wrap" aria-label={`진행률 ${Math.round(progress)}%`}>
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* 질문 / 결과 카드 */}
      <section className="wizard-body">
        {renderQuestion()}
      </section>

      {/* 리셋 버튼 (결과 화면 제외 — ResultCard 내부에 있음) */}
      {!isResult && (
        <button className="reset-link" onClick={reset}>
          처음부터 다시 진단하기
        </button>
      )}
    </main>
  );
}
