import LegalDisclaimer from '../../shared/LegalDisclaimer';
import { timelineContent } from './timelineContent';
import TimelineStage from './TimelineStage';

export default function TimelinePage() {
  return (
    <main className="timeline-page">
      {/* 법적 고지 */}
      <LegalDisclaimer />

      {/* 페이지 헤더 */}
      <header className="timeline-header">
        <h1 className="timeline-page-title">퇴직금 회수 실전 기록</h1>
        <p className="timeline-intro">
          TODO: 인트로 문구 작성
        </p>
      </header>

      {/* 타임라인 카드 목록 */}
      <section className="timeline-list" aria-label="퇴직금 회수 단계별 기록">
        {timelineContent.map((entry, index) => (
          <TimelineStage key={entry.id} entry={entry} index={index} />
        ))}
      </section>
    </main>
  );
}
