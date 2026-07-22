import { useNavigate, Link } from 'react-router-dom';
import { useProgressStore } from '../../stores/progressStore';
import type { TimelineEntry } from './timelineContent';
import CertifiedMailCard from './CertifiedMailCard';

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

        {/* 고급 전술 단계 내용증명 템플릿 카드 */}
        {entry.stageKey === 'advanced_tactics' && <CertifiedMailCard />}

        {/* resolved 카드 하단 형사고소 트랙 링크 */}
        {entry.stageKey === 'resolved' && (
          <div className="mt-3">
            <Link
              to="/criminal-track"
              className="text-xs text-slate-400 hover:text-red-400 underline transition-colors"
            >
              형사고소 트랙 보기 (민사와 별개 절차입니다)
            </Link>
          </div>
        )}

        {/* 각주 */}
        {entry.citations && entry.citations.length > 0 && (
          <ul className="mt-2 space-y-1 text-xs text-slate-400 list-none p-0">
            {entry.citations.map((c, i) => (
              <li key={i}>
                [{c.law}] {c.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
