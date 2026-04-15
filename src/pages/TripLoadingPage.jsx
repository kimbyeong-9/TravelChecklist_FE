import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  STAGES, TIPS, LOADING_ICON_PATHS,
  BLUR_ORBS, BRAND_DOTS,
} from '@/mocks/loadingData'

/* ─────────────────────────────────────────────
   범용 SVG 아이콘 — LOADING_ICON_PATHS 데이터 기반
   diamond 아이콘만 중앙에 원형 포인트가 추가됩니다.
───────────────────────────────────────────── */
function SvgIcon({ name, className = 'w-5 h-5 text-white' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d={LOADING_ICON_PATHS[name]} />
      {name === 'diamond' && <circle cx="12" cy="12" r="2" fill="white" />}
    </svg>
  )
}

/* ─────────────────────────────────────────────
   메인 컴포넌트
───────────────────────────────────────────── */
function TripLoadingPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [tipIndex, setTipIndex] = useState(0)

  const currentStage = STAGES.find((s) => progress >= s.range[0] && progress < s.range[1]) ?? STAGES[2]

  /* 진행률 자동 증가: ~5초 완료 */
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        /* 구간별 속도 조정: 후반부 살짝 느리게 */
        const step = prev < 60 ? 1.2 : 0.7
        return Math.min(prev + step, 100)
      })
    }, 50)
    return () => clearInterval(timer)
  }, [])

  /* 진행 완료 후 이동 */
  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => navigate(`/trips/${id ?? 1}/search`), 600)
      return () => clearTimeout(t)
    }
  }, [progress, id, navigate])

  /* 팁 순환 */
  useEffect(() => {
    const t = setInterval(() => setTipIndex((i) => (i + 1) % TIPS.length), 3000)
    return () => clearInterval(t)
  }, [])

  const pct = Math.round(progress)

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden select-none">

      {/* ── 배경 ── */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 30%, #E0F2FE 70%, #F0F9FF 100%)' }}
      />
      {/* 블러 오브 */}
      {BLUR_ORBS.map((orb) => (
        <div
          key={orb.id}
          className="absolute pointer-events-none"
          style={{
            width: orb.width,
            height: orb.height,
            top: orb.top,
            right: orb.right,
            bottom: orb.bottom,
            left: orb.left,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: `blur(${orb.blur})`,
          }}
        />
      ))}
      {/* 모바일 데코 아이콘 (온도계 실루엣) */}
      <div className="md:hidden absolute top-6 left-4 opacity-10 pointer-events-none">
        <SvgIcon name="thermometer" className="w-24 h-24 text-cyan-400" />
      </div>

      {/* ══════════════════════════════════
          본문 컨텐츠 (relative z-10)
      ══════════════════════════════════ */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-lg px-6 text-center">

        {/* 앱 아이콘 */}
        <div className="mb-6 md:mb-8">
          {/* 데스크탑: 흰 카드 + 시안 원 */}
          <div className="hidden md:flex w-24 h-24 bg-white rounded-3xl shadow-lg border border-cyan-100 items-center justify-center">
            <div className="w-14 h-14 bg-cyan-400 rounded-full flex items-center justify-center shadow-sm">
              <SvgIcon name="diamond" className="w-10 h-10 text-white" />
            </div>
          </div>
          {/* 모바일: 흰 카드 + 시안 스퀘어 배경 + 스파클 */}
          <div className="md:hidden w-20 h-20 bg-white rounded-3xl shadow-lg border border-cyan-100 flex items-center justify-center">
            <div className="w-12 h-12 bg-cyan-400 rounded-2xl flex items-center justify-center shadow-sm">
              <SvgIcon name="sparkles" className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        {/* 제목 */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
          <span className="hidden md:inline">준비 루틴을 디자인하는 중입니다</span>
          <span className="md:hidden">맞춤형 체크리스트 구성 중</span>
        </h1>
        <p className="text-sm md:text-base text-cyan-500 font-medium mb-6 md:mb-8">
          <span className="hidden md:inline">Creating your custom checklist</span>
          <span className="md:hidden">
            여행지의{' '}
            <strong className="text-cyan-600">{currentStage.highlight}</strong>
            를 분석하여<br />최적의 준비물 리스트를 생성하고 있습니다.
          </span>
        </p>

        {/* 분석 카드 */}
        <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-md px-5 py-5 mb-6 md:mb-8 text-left">
          <div className="flex items-start gap-3 mb-4">
            {/* 아이콘 */}
            <div className="w-9 h-9 bg-cyan-400 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
              <SvgIcon name="trendUp" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800 mb-0.5">{currentStage.label}</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                <span className="hidden md:inline">{currentStage.descDesktop}</span>
                <span className="md:hidden">{currentStage.descMobile}</span>
              </p>
            </div>
          </div>

          {/* 진행률 바 */}
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
            <div
              className="h-full rounded-full transition-all duration-150"
              style={{
                width: `${pct}%`,
                background: 'linear-gradient(to right, #06B6D4, #22C55E, #EAB308)',
              }}
            />
          </div>

          {/* 레이블 + % */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
              {currentStage.barLabel}
            </span>
            <span className="text-sm font-extrabold text-cyan-500">{pct}%</span>
          </div>
        </div>

        {/* TIP 영역 */}
        {/* 데스크탑: 황색 pill */}
        <div className="hidden md:flex items-center gap-2 bg-amber-400 text-amber-900 text-xs font-semibold px-5 py-2.5 rounded-full shadow-sm">
          <span className="text-amber-700">✦</span>
          TIP: {TIPS[tipIndex]}
        </div>

        {/* 모바일: Editor's Tip 카드 */}
        <div className="md:hidden w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm px-4 py-4 text-left flex items-start gap-3">
          <div className="w-9 h-9 bg-amber-400 rounded-xl flex items-center justify-center flex-shrink-0">
            <SvgIcon name="bulb" />
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-widest text-amber-500 uppercase mb-1">
              Editor&apos;s Tip
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              {TIPS[tipIndex]}
            </p>
          </div>
        </div>

      </div>

      {/* ── 하단 브랜딩 ── */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 z-10">
        <div className="flex items-center gap-1.5">
          {BRAND_DOTS.map((dot) => (
            <span
              key={dot.id}
              className={`w-1.5 h-1.5 rounded-full ${dot.color} ${dot.desktopOnly ? 'hidden md:block' : ''}`}
            />
          ))}
        </div>
        <p className="text-[10px] font-semibold tracking-[0.25em] text-cyan-400 uppercase">
          The Editorial Architect
        </p>
      </div>

    </div>
  )
}

export default TripLoadingPage
