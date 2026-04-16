import { useNavigate } from 'react-router-dom'
import BackButton from '@/components/common/BackButton'
import BrandLogo from '@/components/common/BrandLogo'

/** 모바일 상단바 공통 토큰 — 전역 Header와 맞춘 흰 배경 */
export const TRIP_FLOW_MOBILE_BAR_CLASS =
  'md:hidden sticky top-0 z-40 w-full border-b border-gray-100 bg-white pt-[env(safe-area-inset-top,0px)]'

function TripFlowMobileMenuButton({ onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="설정 메뉴"
      className={`rounded-xl p-2.5 text-gray-700 hover:bg-black/5 active:bg-black/10 transition-colors ${className}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
      </svg>
    </button>
  )
}

export function TripFlowDesktopBar({ backTo, className = '' }) {
  return (
    <div className={`flex justify-end ${className}`}>
      <BackButton to={backTo} />
    </div>
  )
}

export function TripFlowMobileBar({
  backTo,
  /** 홈 등 루트 화면: 뒤로 없이 좌측만 여백으로 맞춤(그리드 중앙 로고 유지) */
  showBack = true,
  className = '',
  logoClassName = 'h-6 w-auto max-w-[min(190px,62vw)]',
  onMenuClick,
}) {
  const navigate = useNavigate()
  const handleMenu = onMenuClick ?? (() => navigate('/login'))

  return (
    <header className={`${TRIP_FLOW_MOBILE_BAR_CLASS} ${className}`.trim()}>
      <div className="grid grid-cols-3 items-center gap-1 px-2 py-2.5">
        <div className="flex min-w-0 justify-start">
          {showBack && backTo ? (
            <BackButton to={backTo} iconOnly className="shrink-0 text-gray-800" />
          ) : (
            <span className="inline-block w-11 shrink-0" aria-hidden />
          )}
        </div>
        <div className="flex min-w-0 justify-center px-1">
          <BrandLogo className={`${logoClassName} drop-shadow-sm`} />
        </div>
        <div className="flex min-w-0 justify-end">
          <TripFlowMobileMenuButton onClick={handleMenu} />
        </div>
      </div>
    </header>
  )
}
