import { Link } from 'react-router-dom';

export default function CriminalTrackPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* 상단 네비게이션 */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-400 hover:text-blue-400 transition-colors"
          >
            ← 메인 타임라인으로 돌아가기
          </Link>
        </div>

        {/* 페이지 타이틀 */}
        <header className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-red-400">별도 검토 트랙</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1">
            형사고소 트랙 (재산명시 허위 제출 검토)
          </h1>
        </header>

        {/* 최상단 강조 경고 문구 */}
        <div className="mb-8 p-4 sm:p-5 rounded-xl bg-red-950/80 border-2 border-red-500/90 text-red-100 text-sm sm:text-base font-bold shadow-xl flex items-start gap-3">
          <span className="text-2xl shrink-0">⚠️</span>
          <span className="leading-relaxed">
            이 페이지는 민사 회수 절차와 별개의 트랙입니다. "돈을 안 주면 고소하겠다"는 식으로 절대 연결해서 안내하지 않습니다.
          </span>
        </div>

        <div className="space-y-6">
          {/* 섹션 1: 언제 검토하는가 */}
          <section className="p-5 sm:p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 mb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span>언제 검토하는가</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              재산명시 절차에서 채무자가 제출한 재산목록에 명백히 빠진 재산(예: 진행 중인 계약상 채권, 계좌, 특허 등)이 있고, 그 누락이 "몰라서"가 아니라 "알면서 뺐다"는 정황이 확인될 때 검토합니다.
            </p>
          </section>

          {/* 섹션 2: 핵심 법리 */}
          <section className="p-5 sm:p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span>핵심 법리</span>
            </h2>
            <div className="rounded-lg bg-slate-950 p-4 border border-slate-800/80 space-y-3 font-mono text-xs sm:text-sm">
              <div className="flex items-start gap-2 text-slate-300">
                <span className="text-red-400 font-bold shrink-0">•</span>
                <div>
                  <strong className="text-slate-100">민사집행법 제68조 제9항:</strong> 재산명시 절차에서 허위의 재산목록을 제출한 경우의 형사처벌 규정
                </div>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <span className="text-red-400 font-bold shrink-0">•</span>
                <div>
                  <strong className="text-slate-100">민사집행법 제68조 제10항:</strong> 법인의 대표자가 위반행위를 한 경우 법인에게도 벌금형을 부과하는 양벌규정
                </div>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <span className="text-red-400 font-bold shrink-0">•</span>
                <div>
                  <strong className="text-slate-100">형법 제327조 (강제집행면탈죄):</strong> 강제집행을 면할 목적으로 재산을 은닉·손괴·허위양도 등을 한 경우 (예비적 검토 대상)
                </div>
              </div>
            </div>
          </section>

          {/* 섹션 3: 흔한 혼동 — 감치와는 다릅니다 */}
          <section className="p-5 sm:p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 mb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span>흔한 혼동 — 감치와는 다릅니다</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              감치(민사집행법 제68조 제1항 등)는 재산명시 기일에 불출석하거나 선서·재산목록 제출을 거부한 경우에 적용되는 것이지, "허위 제출" 자체에 대한 제재가 아닙니다. 이 둘을 혼동하지 않아야 합니다.
            </p>
          </section>

          {/* 섹션 4: 실전 타이밍 원칙 */}
          <section className="p-5 sm:p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 mb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span>실전 타이밍 원칙</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              채무자가 재산명시 기일 이후, 뒤늦게 숨겼던 재산과 관련된 제3자와 접촉하거나 협상하는 정황이 포착되면, 이는 "재산명시 당시 이미 그 재산의 존재를 알고 있었다"는 강력한 증거가 됩니다. 이런 접촉은 기록이 남는 채널로만 이뤄지도록 하고 반드시 캡처·보관해야 증거자료로 쓸 수 있습니다.
            </p>
          </section>

          {/* 섹션 5: 왜 즉시 고소가 아니라 준비만 하고 보류하는가 */}
          <section className="p-5 sm:p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 mb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span>왜 즉시 고소가 아니라 준비만 하고 보류하는가</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              민사 회수가 끝나기 전에 형사고소를 진행하면, 채무자 입장에서 "돈을 갚아도 어차피 고소당한다"는 인식이 생겨 협상 동력이 사라집니다. 따라서 고소장은 미리 완성해두되(증거목록 포함), 민사 전액 회수가 끝난 뒤 별도 판단으로 진행 여부를 결정하는 것이 원칙입니다.
            </p>
          </section>

          {/* 섹션 6: 공갈죄 방지 (반드시 눈에 띄게 강조) */}
          <section className="p-5 sm:p-6 rounded-xl bg-red-950/60 border-2 border-red-500 shadow-xl">
            <h2 className="text-base sm:text-lg font-bold text-red-200 mb-3 flex items-center gap-2">
              <span className="text-xl">🚨</span>
              <span>공갈죄 방지 (필수 유의사항)</span>
            </h2>
            <div className="p-3.5 rounded-lg bg-red-900/40 border border-red-600/50">
              <p className="text-sm sm:text-base font-extrabold text-red-100 leading-relaxed">
                "돈을 안 주면 고소한다"는 식의 명시적 조건 연결을 대화나 문서에 절대 남기지 않습니다. 민사와 형사는 서로 무관한 별개 절차로 진행되어야 합니다.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
