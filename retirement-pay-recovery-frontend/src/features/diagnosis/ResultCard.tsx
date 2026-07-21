import { useRecommendedActions } from './useRecommendedActions';
import LegalDisclaimer from '../../shared/LegalDisclaimer';
import LegalResultList from '../../shared/components/LegalResultList';
import { useProgressStore } from '../../stores/progressStore';
import { useStatutesQuery, usePrecedentsQuery } from '../../api/legalQueries';
import { stageKeywordMap } from './stageKeywordMap';

// ResultCard 없이는 추천 행동을 절대 보여주지 않는다 — 법적 고지 누락 방지
export default function ResultCard() {
  const actions = useRecommendedActions();
  const currentStage = useProgressStore((s) => s.currentStage);
  const reset = useProgressStore((s) => s.reset);

  const isResolved = currentStage === 'resolved';
  const isAdvanced = currentStage === 'advanced_tactics';

  // 현재 단계에 매핑된 키워드를 가져온다.
  // 매핑이 없는 단계(start 등)는 keyword가 '' → enabled: false → 요청 안 함
  const keyword = stageKeywordMap[currentStage] ?? '';

  const {
    data: statutes = [],
    isLoading: isLoadingStatutes,
    isError: isErrorStatutes,
  } = useStatutesQuery(keyword);

  const {
    data: precedents = [],
    isLoading: isLoadingPrecedents,
    isError: isErrorPrecedents,
  } = usePrecedentsQuery(keyword);

  // keyword가 없는 단계(매핑 미존재)는 법령·판례 섹션 자체를 숨긴다
  const showLegalSection = keyword.length > 0;

  return (
    <div className="result-card">
      <div className={`result-header ${isResolved ? 'result-header--resolved' : 'result-header--advanced'}`}>
        {isResolved ? (
          <>
            <span className="result-icon">🎉</span>
            <h2 className="result-title">퇴직금 회수 완료!</h2>
            <p className="result-subtitle">수고하셨습니다. 아래 내용을 최종 확인하세요.</p>
          </>
        ) : (
          <>
            <span className="result-icon">⚡</span>
            <h2 className="result-title">고급 전술이 필요합니다</h2>
            <p className="result-subtitle">상대방이 버티고 있다면 아래 방법을 활용하세요.</p>
          </>
        )}
      </div>

      {actions.length > 0 && (
        <ul className="action-list">
          {actions.map((action) => (
            <li
              key={action.id}
              className={`action-item ${action.isUrgent ? 'action-item--urgent' : ''}`}
            >
              {action.isUrgent && <span className="urgent-badge">긴급</span>}
              {action.text}
            </li>
          ))}
        </ul>
      )}

      {/* 관련 법령·판례 섹션 — 키워드 매핑이 있는 단계에서만 표시 */}
      {showLegalSection && (
        <LegalResultList
          statutes={statutes}
          precedents={precedents}
          isLoadingStatutes={isLoadingStatutes}
          isLoadingPrecedents={isLoadingPrecedents}
          isErrorStatutes={isErrorStatutes}
          isErrorPrecedents={isErrorPrecedents}
        />
      )}

      {/* 법적 고지는 ResultCard가 항상 렌더링한다 */}
      <LegalDisclaimer />

      <button className="reset-btn" onClick={reset}>
        처음부터 다시 진단하기
      </button>
    </div>
  );
}
