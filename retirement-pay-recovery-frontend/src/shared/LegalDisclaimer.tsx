import { useState } from 'react';

export default function LegalDisclaimer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="legal-disclaimer">
      <p>
        ⚠️ 이 내용은 법률 자문이 아닌 일반 정보입니다. 구체적인 사안은{' '}
        <strong>대한법률구조공단</strong>(국번없이{' '}
        <a href="tel:132" className="disclaimer-link">
          132
        </a>
        ) 무료 상담을 권장합니다.{' '}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="ml-1 text-xs text-blue-400 hover:underline inline-flex items-center gap-0.5 cursor-pointer bg-transparent border-0 p-0"
        >
          <span>{isOpen ? '닫기 ▲' : '자세히 보기 ▼'}</span>
        </button>
      </p>

      {isOpen && (
        <div className="mt-3 p-3.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 space-y-2.5">
          <h4 className="font-bold text-slate-100 text-sm">비용이 부담될 때 — 대한법률구조공단</h4>
          <p>
            <strong>대상:</strong> 법률 비용이 부담되는 임금체불 피해자<br />
            <span className="text-slate-400 text-[11px]">
              (소득 기준 등 요건이 있으므로 정확한 대상 여부는 공단에 확인 필요)
            </span>
          </p>
          <p>
            <strong>지원 범위:</strong> 재산조회, 채무불이행자명부 등재 신청 등 서류 작성 대행 및 강제집행 대행 신청까지 지원받을 수 있습니다.
          </p>
          <p className="text-slate-300/90">
            혼자 다 하기 부담스럽다면, 국가가 운영하는 무료/저비용 법률구조 제도가 있다는 점을 먼저 안내드립니다.
          </p>
          <div>
            <strong className="text-slate-200">필요 서류:</strong>
            <ul className="list-disc list-inside ml-1 mt-1 text-slate-400 space-y-0.5">
              <li>진정서 처리결과 통지서</li>
              <li>지급명령 정본 (또는 그에 준하는 집행권원)</li>
            </ul>
          </div>
          <p className="pt-1.5 border-t border-slate-800 text-slate-300 font-semibold">
            연락처: 대한법률구조공단 (국번없이 <a href="tel:132" className="text-blue-400 underline">132</a>)
          </p>
        </div>
      )}
    </aside>
  );
}
