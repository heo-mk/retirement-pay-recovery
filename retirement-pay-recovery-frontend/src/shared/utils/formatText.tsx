import React from 'react';

/**
 * renderFormattedText
 * 문자열 내의 **굵은 글씨** 구문을 HTML <strong> 태그로 변환하고
 * \n\n 줄바꿈을 문단(<p>)으로 깔끔하게 렌더링합니다.
 * AI 특유의 raw ** 기호가 화면에 그대로 노출되는 것을 방지합니다.
 */
export function renderFormattedText(text: string | undefined | null): React.ReactNode {
  if (!text) return null;

  // \n\n 문단 단위 분할
  const paragraphs = text.split('\n\n');

  return paragraphs.map((paragraph, pIdx) => {
    // **로 감싸진 굵은 글씨 구문 추출
    const parts = paragraph.split(/(\*\*.*?\*\*)/g);

    return (
      <p key={pIdx} className="mb-2.5 last:mb-0 leading-relaxed">
        {parts.map((part, idx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const boldContent = part.slice(2, -2);
            return (
              <strong key={idx} className="font-bold text-slate-100">
                {boldContent}
              </strong>
            );
          }
          // 일반 줄바꿈(\n) 처리
          if (part.includes('\n')) {
            const lines = part.split('\n');
            return lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {lIdx > 0 && <br />}
                {line}
              </React.Fragment>
            ));
          }
          return part;
        })}
      </p>
    );
  });
}
