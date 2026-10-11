import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { renderFormattedText } from '../shared/utils/formatText';

describe('renderFormattedText', () => {
  it('텍스트가 null이면 null을 반환한다', () => {
    expect(renderFormattedText(null)).toBeNull();
  });

  it('텍스트가 undefined이면 null을 반환한다', () => {
    expect(renderFormattedText(undefined)).toBeNull();
  });

  it('텍스트가 빈 문자열이면 null을 반환한다', () => {
    expect(renderFormattedText('')).toBeNull();
  });

  it('텍스트에 빈 줄이 포함되어 있으면 빈 줄 기준으로 여러 p 태그 문단으로 분할된다', () => {
    const text = '첫 번째 문단입니다.\n\n두 번째 문단입니다.';
    const { container } = render(<div>{renderFormattedText(text)}</div>);

    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
    expect(paragraphs[0].textContent).toBe('첫 번째 문단입니다.');
    expect(paragraphs[1].textContent).toBe('두 번째 문단입니다.');
  });

  it('텍스트에 굵게 표시 구문이 포함되어 있으면 strong 태그로 변환된다', () => {
    const text = '이것은 **중요한 내용**입니다.';
    const { container } = render(<div>{renderFormattedText(text)}</div>);

    const strongElement = container.querySelector('strong');
    expect(strongElement).not.toBeNull();
    expect(strongElement?.textContent).toBe('중요한 내용');
    expect(strongElement?.className).toContain('font-bold');
  });

  it('텍스트에 단일 줄바꿈이 포함되어 있으면 br 태그로 변환된다', () => {
    const text = '첫 번째 줄\n두 번째 줄';
    const { container } = render(<div>{renderFormattedText(text)}</div>);

    const brElement = container.querySelector('br');
    expect(brElement).not.toBeNull();
    expect(container.querySelector('p')?.textContent).toBe('첫 번째 줄두 번째 줄');
  });
});
