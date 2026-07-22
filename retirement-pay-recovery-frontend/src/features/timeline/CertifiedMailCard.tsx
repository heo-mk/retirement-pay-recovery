import { useState } from 'react';

interface TemplateItem {
  id: number;
  title: string;
  citation: string;
  logic?: string;
  logicLabel?: string;
  subContent?: string;
  subLabel?: string;
}

const TEMPLATE_ITEMS: TemplateItem[] = [
  {
    id: 1,
    title: '1. 압류 효력의 존속',
    citation: '민사집행법 제227조 제3항',
    logicLabel: '논리',
    logic:
      '압류 효력은 제3채무자에게 송달된 순간 발생하며, 채무자가 별도 경로로 채권자에게 자발적으로 돈을 갚았다는 사실만으로는 이 압류 효력이 소멸하지 않습니다. 압류는 오직 채권자가 추심을 완료하거나 압류를 해제해야 소멸합니다.',
    subLabel: '실무 팁',
    subContent:
      '"채무자에게도 송달돼야 압류가 유효한 것 아니냐"는 오해가 흔합니다. 채무자 송달은 압류 효력의 요건이 아니라 채무자의 절차적 권리(이의신청 등)를 보장하기 위한 통지일 뿐입니다.',
  },
  {
    id: 2,
    title: '2. 지급금지 및 이중변제 위험 고지 (가장 핵심적인 압박 논리)',
    citation: '민사집행법 제227조 제1항, 대법원 2021. 3. 11. 선고 2017다278729 판결',
    logicLabel: '논리',
    logic:
      '압류명령이 제3채무자에게 송달되면 압류의 효력이 생기고, 제3채무자는 지급이 금지됩니다. 제3채무자가 채무자에게 급부를 제공하더라도 이로써 압류채권자에게 대항할 수 없고, 이중변제의 위험을 부담합니다.',
    subLabel: '왜 반박 불가능한가',
    subContent:
      '이 논리는 협박이 아니라 제3채무자 본인의 법적 리스크를 있는 그대로 알려주는 것입니다. "당신이 채무자에게 돈을 줘버리면 당신 스스로가 법적으로 위험해진다"는 자기 이익 보호 논리이기 때문에 상대가 감정적으로 반발할 여지가 없습니다.',
  },
  {
    id: 3,
    title: '3. [해당 시] 이전 통지 내용의 오류 인정 및 정정',
    citation: '민법 제479조 (변제충당 순서: 비용 → 이자 → 원금)',
    logicLabel: '전략',
    logic:
      '금액을 정정하며 스스로 오류를 인정하는 태도는, 상대방에게 "이 사람은 감정적으로 몰아붙이는 게 아니라 법리를 정확하게 따지는 사람"이라는 인상을 줍니다. 내용증명은 한 번에 완벽하게 쓰는 문서가 아니라, 상대 반응을 보고 다듬어가는 문서입니다.',
  },
  {
    id: 4,
    title: '4. 이행 요구 사항 (청구금액·이행기한·이행방법)',
    citation: '민법 제157조 (기간 계산 시 초일 불산입)',
    subLabel: '유의사항',
    subContent: '채무자가 채권자에게 직접 변제하는 경우도 이행으로 간주한다는 단서를 반드시 포함합니다.',
  },
  {
    id: 5,
    title: '5. 미이행 시 법적 조치 예고',
    citation: '민사집행법 제249조 제1항 (추심의 소), 제249조 제2항 (채무자 통지 의무)',
    logicLabel: '논리',
    logic:
      '지급명령이 아닌 추심의 소를 예고하는 이유는, 지급명령은 상대가 이의신청 한 번만 하면 즉시 무력화되는 약한 압박 수단이지만, 추심의 소는 정식 소송이라 상대가 간단히 피할 수 없기 때문입니다.',
  },
];

const CHECKLIST_ITEMS = [
  '번역투 표현 지양: "~에 대한 채권" → "~에게 가지는 채권" 등 자연스러운 한국어로',
  '조문에 직접 명시되지 않은 법적 효과는 "~에 해당합니다" 수준으로 표현을 낮춘다',
  '기한 계산 시 민법 제157조(초일 불산입) 원칙을 적용해 정확한 날짜를 명시',
  '수신인은 기관/부서명으로만 표기하고, 봉투에는 담당자 직함을 병기',
  '발송 전 전자소송포털(ecfs.scourt.go.kr)에서 제3채무자에게 결정문이 실제로 송달된 날짜를 재확인',
];

export default function CertifiedMailCard() {
  // 5단 아코디언이 기본적으로 모두 펼쳐짐
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  });
  const [copied, setCopied] = useState(false);

  function toggleAccordion(id: number) {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleCopy() {
    const textToCopy = TEMPLATE_ITEMS.map((item) => {
      const parts = [item.title, `근거: ${item.citation}`];
      if (item.logic) parts.push(`${item.logicLabel || '논리'}: ${item.logic}`);
      if (item.subContent) parts.push(`${item.subLabel || '팁'}: ${item.subContent}`);
      return parts.join('\n');
    }).join('\n\n');

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="mt-6 rounded-xl border border-slate-700 bg-slate-800/80 p-4 sm:p-6 shadow-lg">
      {/* 헤더 영역 (제목 + 복사 버튼) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/80 pb-4 mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">실무 내용증명 가이드</span>
          <h3 className="text-lg font-bold text-slate-100">제3채무자 내용증명 5단 템플릿</h3>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-semibold transition-all cursor-pointer active:scale-95"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>복사됨!</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>복사하기</span>
            </>
          )}
        </button>
      </div>

      {/* 상단 소개문 */}
      <div className="mb-6 rounded-lg bg-slate-900/60 border border-slate-700/60 p-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <p className="font-bold text-slate-100 mb-1.5">💡 왜 제3채무자에게 별도로 내용증명을 보내는가</p>
        <p className="text-slate-300/90">
          제3채무자(공공기관·거래처 등)는 "채무자의 돈을 잠시 맡아두고 있는 창구 직원"과 같습니다. 법원이 이미 "그 돈을 원래 주인(채권자)한테 주지 말고 나(채권자)한테 달라"고 명령했는데도, 창구 직원이 관성적으로 원래 주인 쪽 눈치를 보는 경우가 실무에서 흔합니다.
        </p>
      </div>

      {/* 5단 아코디언 템플릿 */}
      <div className="space-y-3 mb-6">
        {TEMPLATE_ITEMS.map((item) => {
          const isOpen = openItems[item.id];
          return (
            <div
              key={item.id}
              className="rounded-lg border border-slate-700/70 bg-slate-900/40 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(item.id)}
                className="w-full flex items-center justify-between p-3.5 text-left text-sm font-semibold text-slate-200 hover:bg-slate-800/50 transition-colors gap-2"
              >
                <span>{item.title}</span>
                <span className="text-slate-400 text-xs shrink-0">{isOpen ? '▲ 접기' : '▼ 펼치기'}</span>
              </button>

              {isOpen && (
                <div className="p-3.5 border-t border-slate-800 bg-slate-900/80 text-xs sm:text-sm space-y-2.5">
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 px-2 py-0.5 rounded bg-blue-950 text-blue-300 text-xs border border-blue-800/50 font-medium">
                      근거
                    </span>
                    <span className="text-slate-300 font-medium">{item.citation}</span>
                  </div>

                  {item.logic && (
                    <div className="text-slate-300 leading-relaxed">
                      {item.logicLabel && (
                        <span className="font-semibold text-blue-400 mr-1.5">[{item.logicLabel}]</span>
                      )}
                      {item.logic}
                    </div>
                  )}

                  {item.subContent && (
                    <div className="p-2.5 rounded bg-amber-950/30 border border-amber-800/40 text-amber-200/90 text-xs leading-relaxed">
                      <span className="font-semibold text-amber-400 mr-1.5">[{item.subLabel}]</span>
                      {item.subContent}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 아코디언 하단 체크리스트 */}
      <div className="rounded-lg bg-slate-900/60 border border-slate-700/60 p-4">
        <h4 className="text-xs sm:text-sm font-bold text-slate-200 mb-3 flex items-center gap-1.5">
          <span>📝 문구 다듬기 노하우</span>
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
          {CHECKLIST_ITEMS.map((check, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-blue-400 font-bold shrink-0">✓</span>
              <span className="text-slate-300">{check}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
