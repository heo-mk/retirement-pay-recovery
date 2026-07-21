export default function LegalDisclaimer() {
  return (
    <aside className="legal-disclaimer">
      <p>
        ⚠️ 이 내용은 법률 자문이 아닌 일반 정보입니다. 구체적인 사안은{' '}
        <strong>대한법률구조공단</strong>(국번없이{' '}
        <a href="tel:132" className="disclaimer-link">
          132
        </a>
        ) 무료 상담을 권장합니다.
      </p>
    </aside>
  );
}
