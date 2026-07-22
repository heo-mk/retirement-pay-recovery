import { useState } from 'react';

interface Props {
  onAnswer: (isResisting: boolean) => void;
}

interface PersonalityType {
  type: string;
  feature: string;
  leverage: string;
}

const PERSONALITY_MAP: Record<number, PersonalityType> = {
  0: {
    type: '감정 도구형',
    feature: '사과·읍소를 협상 도구로 사용',
    leverage: '감정적 대응 대신 서면·법적 절차로만 소통',
  },
  1: {
    type: '강약약강형',
    feature: '힘 있는 상대에게 약함',
    leverage: '그가 의존하는 공공기관/대형 거래처 채권 압류',
  },
  2: {
    type: '현재편향형',
    feature: '당장 눈앞 손해에만 반응',
    leverage: '계좌 압류로 즉시 자금 경색 유발',
  },
  3: {
    type: '확신형',
    feature: '데이터보다 감으로 판단',
    leverage: '문서·판결 나열보다 "당장 자금이 막힌다"는 현실 제시',
  },
};

const CHECKLIST_ITEMS = [
  '문자/서면에는 반응 없고, 전화로는 사과성 발언을 반복하는가?',
  '개인보다 힘이 세다고 느끼는 상대(공공기관, 대형 거래처)에게는 유독 저자세인가?',
  '"곧 준다"는 말을 반복하지만 실제 이행은 계속 미루는가?',
  '법적 문서(시정명령, 지급명령 등)를 받아도 태도 변화가 없는가?',
];

export default function OpponentResistingQuestion({ onAnswer }: Props) {
  const [showPersonalityTest, setShowPersonalityTest] = useState(false);
  const [checkedIndices, setCheckedIndices] = useState<boolean[]>([false, false, false, false]);

  function toggleCheck(idx: number) {
    setCheckedIndices((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  }

  // 매칭된 성향 유형 목록
  const matchedTypes = checkedIndices
    .map((checked, idx) => (checked ? PERSONALITY_MAP[idx] : null))
    .filter((item): item is PersonalityType => item !== null);

  return (
    <div className="question-card">
      <h2 className="question-title">상대방이 계속 버티고 있나요?</h2>
      <p className="question-desc">
        강제집행 후에도 상대방이 재산을 숨기거나 이전하는 등 회피 행위를 하고 있나요?
        이 경우 <strong>채권 압류·추심 명령, 내용증명</strong> 등 고급 전술을 활용할 수 있습니다.
      </p>

      {/* 모바일: 세로 / 태블릿 이상: 가로 나란히 */}
      <div className="answer-group flex flex-col md:flex-row gap-3">
        <button
          className="answer-btn answer-btn--no w-full md:flex-1 py-3 min-h-[44px]"
          onClick={() => onAnswer(true)}
        >
          네, 여전히 버티고 있습니다
        </button>
        <button
          className="answer-btn answer-btn--yes w-full md:flex-1 py-3 min-h-[44px]"
          onClick={() => onAnswer(false)}
        >
          아니요, 해결됐습니다
        </button>
      </div>

      {/* 상대방 성향 진단 토글 버튼 */}
      <div className="mt-4 pt-3 border-t border-slate-700/60">
        <button
          type="button"
          onClick={() => setShowPersonalityTest((prev) => !prev)}
          className="w-full text-left py-2.5 px-3.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs sm:text-sm font-semibold text-blue-400 flex items-center justify-between transition-colors"
        >
          <span>🔍 상대방 성향이 궁금하다면 (자가 진단)</span>
          <span>{showPersonalityTest ? '▲ 접기' : '▼ 펼치기'}</span>
        </button>

        {showPersonalityTest && (
          <div className="mt-3 p-4 rounded-xl bg-slate-900 border border-slate-700/80 space-y-4">
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              해당되는 항목을 체크해 보세요:
            </p>

            <div className="space-y-2">
              {CHECKLIST_ITEMS.map((itemText, idx) => (
                <label
                  key={idx}
                  className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs sm:text-sm cursor-pointer transition-colors ${
                    checkedIndices[idx]
                      ? 'bg-blue-950/40 border-blue-600/70 text-blue-200'
                      : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checkedIndices[idx]}
                    onChange={() => toggleCheck(idx)}
                    className="mt-0.5 rounded border-slate-600 text-blue-500 focus:ring-0 cursor-pointer"
                  />
                  <span>{itemText}</span>
                </label>
              ))}
            </div>

            {/* 진단 결과 영역 */}
            {matchedTypes.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-800 space-y-3">
                <h4 className="text-xs sm:text-sm font-bold text-slate-200">
                  🎯 매칭된 상대방 성향 유형 ({matchedTypes.length}건)
                </h4>
                <div className="space-y-2.5">
                  {matchedTypes.map((t, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-slate-800/90 border border-slate-700 text-xs sm:text-sm space-y-1"
                    >
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold text-xs">
                          {t.type}
                        </span>
                        <span className="text-slate-300 text-xs font-medium">특징: {t.feature}</span>
                      </div>
                      <p className="text-slate-300 text-xs mt-1">
                        <strong>가장 효과적인 압박 지점:</strong> {t.leverage}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 결과 하단 원칙 문구 */}
            <p className="text-xs italic text-slate-400 pt-2 border-t border-slate-800/80 leading-relaxed">
              채무자마다 "가장 아파하는 지점"이 다릅니다. 만능 해법은 없습니다 — 그 사람이 무엇을 잃을 때 진짜로 움직이는지 먼저 파악하고, 그 지점에 집행력을 집중하는 것이 핵심입니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
