import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '../../stores/progressStore';
import type { TimelineEntry } from './timelineContent';

interface Props {
  entry: TimelineEntry;
  index: number;
}

export default function TimelineStage({ entry, index }: Props) {
  const navigate = useNavigate();
  const goToStage = useProgressStore((s) => s.goToStage);

  function handleJumpToStage() {
    goToStage(entry.stageKey);
    navigate('/diagnosis');
  }

  return (
    <article className="timeline-card" id={`timeline-${entry.id}`}>
      {/* 단계 번호 + 연결선 */}
      <div className="timeline-connector">
        <div className="timeline-dot">
          <span className="timeline-dot-number">{index + 1}</span>
        </div>
        <div className="timeline-line" />
      </div>

      {/* 카드 본체 */}
      <div className="timeline-card-body">
        <h2 className="timeline-card-title">{entry.title}</h2>

        <p className="timeline-card-text">{entry.body}</p>

        {/* 시행착오 콜아웃 — 모바일 text-sm, PC text-base, 전체 너비 */}
        {entry.pitfall && (
          <div className="timeline-callout timeline-callout--pitfall w-full text-sm lg:text-base">
            <span className="timeline-callout-label">⚠️ 이때 하지 않아도 될 일</span>
            <p>{entry.pitfall}</p>
          </div>
        )}

        {/* 최악의 상황 콜아웃 — 모바일 text-sm, PC text-base, 전체 너비 */}
        {entry.worstCase && (
          <div className="timeline-callout timeline-callout--worst w-full text-sm lg:text-base">
            <span className="timeline-callout-label">🚨 최악의 상황이라면</span>
            <p>{entry.worstCase}</p>
          </div>
        )}

        {/* 진단 도구 연결 버튼
            모바일: 전체 너비(w-full), 최소 높이 44px(py-3) — 터치 영역 확보
            PC: 자동 너비(lg:w-auto)로 복원해 카드 내에서 자연스럽게 */}
        <button
          id={`btn-jump-${entry.id}`}
          className="timeline-jump-btn w-full py-3 min-h-[44px] lg:w-auto"
          onClick={handleJumpToStage}
          type="button"
        >
          나도 지금 이 단계인가요? →
        </button>
      </div>
    </article>
  );
}
