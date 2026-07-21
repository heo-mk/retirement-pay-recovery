import type { StatuteItem, PrecedentItem } from '../../api/legalQueries';
import LegalDisclaimer from '../LegalDisclaimer';

// ── 법령 목록 ─────────────────────────────────────────────────────────────────

interface StatuteListProps {
  items: StatuteItem[];
}

function StatuteList({ items }: StatuteListProps) {
  if (items.length === 0) {
    return <p className="legal-result-empty">관련 법령을 찾을 수 없습니다.</p>;
  }

  return (
    <ul className="legal-result-list" aria-label="관련 법령 목록">
      {items.map((item, idx) => (
        <li key={item.id ?? idx} className="legal-result-item">
          <div className="legal-result-title">{item.title ?? '—'}</div>
          <div className="legal-result-meta">
            {item.department && <span>{item.department}</span>}
            {item.effectiveDate && (
              <span>시행일 {item.effectiveDate}</span>
            )}
          </div>
          {/* 원문 링크: 법제처 법령 검색 페이지로 연결 */}
          {item.title && (
            <a
              className="legal-result-link"
              href={`https://www.law.go.kr/lsSc.do?menuId=1&subMenuId=15&tabMenuId=81&query=${encodeURIComponent(item.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.title} 법제처 원문 보기 (새 창)`}
            >
              법제처 원문 보기 ↗
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

// ── 판례 목록 ─────────────────────────────────────────────────────────────────

interface PrecedentListProps {
  items: PrecedentItem[];
}

function PrecedentList({ items }: PrecedentListProps) {
  if (items.length === 0) {
    return <p className="legal-result-empty">관련 판례를 찾을 수 없습니다.</p>;
  }

  return (
    <ul className="legal-result-list" aria-label="관련 판례 목록">
      {items.map((item, idx) => (
        <li key={item.id ?? idx} className="legal-result-item">
          <div className="legal-result-title">
            {item.caseName ?? '—'}
            {item.caseNumber && (
              <span className="legal-result-badge">{item.caseNumber}</span>
            )}
          </div>
          <div className="legal-result-meta">
            {item.court && <span>{item.court}</span>}
            {item.judgmentDate && <span>선고일 {item.judgmentDate}</span>}
          </div>
          {item.summary && (
            <p className="legal-result-summary">{item.summary}</p>
          )}
          {/* 원문 링크: 법제처 판례 검색 페이지로 연결 */}
          {item.caseNumber && (
            <a
              className="legal-result-link"
              href={`https://www.law.go.kr/precSc.do?menuId=1&subMenuId=15&tabMenuId=81&query=${encodeURIComponent(item.caseNumber)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.caseNumber} 법제처 원문 보기 (새 창)`}
            >
              법제처 원문 보기 ↗
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

// ── 메인 export ───────────────────────────────────────────────────────────────

interface LegalResultListProps {
  statutes: StatuteItem[];
  precedents: PrecedentItem[];
  isLoadingStatutes: boolean;
  isLoadingPrecedents: boolean;
  isErrorStatutes: boolean;
  isErrorPrecedents: boolean;
}

export default function LegalResultList({
  statutes,
  precedents,
  isLoadingStatutes,
  isLoadingPrecedents,
  isErrorStatutes,
  isErrorPrecedents,
}: LegalResultListProps) {
  return (
    <section className="legal-section" aria-label="관련 법령·판례">
      <h3 className="legal-section-title">📚 관련 법령·판례</h3>

      {/* 법령 */}
      <div className="legal-subsection">
        <h4 className="legal-subsection-title">법령</h4>
        {isErrorStatutes ? (
          <p className="legal-result-error">지금은 법령 정보를 불러올 수 없습니다.</p>
        ) : isLoadingStatutes ? (
          <p className="legal-result-loading">법령을 확인하는 중입니다…</p>
        ) : (
          <StatuteList items={statutes} />
        )}
      </div>

      {/* 판례 */}
      <div className="legal-subsection">
        <h4 className="legal-subsection-title">판례</h4>
        {isErrorPrecedents ? (
          <p className="legal-result-error">지금은 판례 정보를 불러올 수 없습니다.</p>
        ) : isLoadingPrecedents ? (
          <p className="legal-result-loading">판례를 확인하는 중입니다…</p>
        ) : (
          <PrecedentList items={precedents} />
        )}
      </div>

      {/* 이 데이터는 참고용이며 법률 자문이 아님을 항상 명시 */}
      <LegalDisclaimer />
    </section>
  );
}
