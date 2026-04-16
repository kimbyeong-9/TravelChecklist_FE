/**
 * AiPlannerFab — "AI 플래너에게 물어보기" 화면 고정 버튼 (FAB)
 *
 * - md 이상: 우측 하단 pill + 문구
 * - 모바일: 우측 하단 원형 · 아이콘만 (다른 하단 UI와 겹침 방지)
 * - mobileBottom: 페이지별 하단 고정 UI(탭·CTA) 높이에 맞춤 Tailwind bottom 클래스
 */
const CHAT_ICON_PATH =
  'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z'

export default function AiPlannerFab({
  /** 모바일 전용 `bottom-*` (예: step3은 하단 CTA 위로: bottom-[11rem]) */
  mobileBottomClassName,
  className = '',
}) {
  const mobileBottom =
    mobileBottomClassName?.trim() ||
    'bottom-[calc(5.25rem+env(safe-area-inset-bottom,0px))]'

  return (
    <button
      type="button"
      aria-label="AI 플래너에게 물어보기"
      className={`
        fixed z-50 right-4 ${mobileBottom}
        md:bottom-8 md:right-8
        flex items-center justify-center
        h-14 w-14 shrink-0 rounded-full border border-amber-200/90
        bg-white/95 shadow-xl backdrop-blur-sm
        transition-all duration-200 hover:scale-105 hover:shadow-2xl
        md:h-auto md:w-auto md:rounded-full md:border-0 md:px-5 md:py-3 md:shadow-xl
        ${className}
      `
        .trim()
        .replace(/\s+/g, ' ')}
    >
      {/* 모바일: 아이콘만 · 원형 버튼 */}
      <span className="flex md:hidden items-center justify-center w-full h-full">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-amber-600"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d={CHAT_ICON_PATH} />
          </svg>
        </span>
      </span>

      {/* 데스크톱: 기존 pill */}
      <span className="hidden md:flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-amber-600"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d={CHAT_ICON_PATH} />
          </svg>
        </span>
        <span className="text-sm font-semibold whitespace-nowrap text-gray-700">AI 플래너에게 물어보기</span>
      </span>
    </button>
  )
}
