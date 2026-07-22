import LegalDisclaimer from '../../shared/LegalDisclaimer';
import { timelineContent } from './timelineContent';
import TimelineStage from './TimelineStage';

export default function TimelinePage() {
  return (
    // 모바일: px-4 좌우 여백 / PC: 최대 너비 3xl로 제한 + 가운데 정렬 + 좌우 여백 확대
    <main className="timeline-page px-4 lg:px-8 lg:max-w-3xl lg:mx-auto">
      {/* 법적 고지 */}
      <LegalDisclaimer />

      {/* 페이지 헤더 */}
      <header className="timeline-header">
        <h1 className="timeline-page-title">퇴직금 회수 실전 기록</h1>
        <p className="timeline-intro">
          막연함 대신 명확한 로드맵을 따라 차분히 권리를 되찾으세요.
        </p>
      </header>

      {/* 타임라인 카드 목록: 모바일에서 세로 1열 */}
      <section
        className="timeline-list flex flex-col"
        aria-label="퇴직금 회수 단계별 기록"
      >
        {timelineContent.map((entry, index) => (
          <TimelineStage key={entry.id} entry={entry} index={index} />
        ))}
      </section>
    </main>
  );
}
