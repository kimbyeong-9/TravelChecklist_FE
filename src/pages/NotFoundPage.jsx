import { useNavigate } from 'react-router-dom'
import { TripFlowMobileBar } from '@/components/common/TripFlowTopBar'

/** 끝까지 민트·화이트 톤으로 이어지도록 100% 구간 유지 (하단 흰 띠 방지) */
const PAGE_BG = {
  background: 'linear-gradient(180deg, #E0F7FA 0%, #E8FDF9 35%, #F0FDFA 70%, #F7FEF9 100%)',
}

function OffRouteIllustration({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 160"
      className={className}
      fill="none"
      aria-hidden
    >
      <ellipse cx="100" cy="140" rx="78" ry="12" fill="#CFFAFE" opacity="0.9" />
      <path
        d="M38 108c18-42 52-68 96-68 18 0 34 4 48 12"
        stroke="#5EEAD4"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="8 10"
      />
      <path
        d="M152 52l12 8-8 4-4 12-8-8 8-16z"
        fill="#14B8A6"
        opacity="0.85"
      />
      <path
        d="M48 44 L160 100"
        stroke="#F59E0B"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="6 8"
      />
      <circle cx="48" cy="44" r="10" fill="#06B6D4" opacity="0.9" />
      <circle cx="160" cy="100" r="10" fill="#FBBF24" opacity="0.95" />
      <path
        d="M92 28h26l6 16-19 10-13-26z"
        fill="#0D9488"
      />
      <path
        d="M98 36l8 4-3 6-8-3 3-7z"
        fill="#CCFBF1"
      />
    </svg>
  )
}

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-full w-full flex-1 flex-col" style={PAGE_BG}>
      <TripFlowMobileBar showBack={false} />

      {/* 모바일 */}
      <div className="flex min-h-0 flex-1 flex-col items-center px-5 pb-28 pt-6 md:hidden">
        <span className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600">
          Page not found
        </span>
        <div className="mb-5 flex h-[7.5rem] w-full max-w-[220px] items-center justify-center rounded-3xl bg-white/90 shadow-lg shadow-cyan-900/5 ring-1 ring-cyan-100">
          <OffRouteIllustration className="h-28 w-36 text-cyan-500" />
        </div>
        <h1 className="mb-2 text-center text-2xl font-extrabold leading-snug text-gray-900">
          길을 잃으셨나요?
        </h1>
        <p className="mb-1 max-w-sm text-center text-sm leading-relaxed text-gray-600">
          주소가 바뀌었거나, 존재하지 않는 페이지예요.
          <br />
          홈에서 다시 여행 준비를 시작해 보세요.
        </p>
        <p className="mb-8 text-center text-xs text-gray-400">404</p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full max-w-sm rounded-2xl bg-teal-700 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-teal-800"
        >
          홈으로 돌아가기
        </button>
      </div>

      {/* 웹 (md 이상) — 좌 일러스트 / 우 카피 */}
      <div className="mx-auto hidden min-h-0 w-full max-w-5xl flex-1 flex-col justify-center gap-10 px-8 py-12 md:flex md:flex-row md:items-center md:gap-14 md:py-16 lg:px-10">
        <div className="flex flex-1 justify-center md:justify-end">
          <div className="flex h-64 w-full max-w-md items-center justify-center rounded-[2rem] bg-white/95 p-8 shadow-xl shadow-cyan-900/[0.06] ring-1 ring-cyan-100/80 lg:h-72">
            <OffRouteIllustration className="h-44 w-full max-w-sm lg:h-52" />
          </div>
        </div>
        <div className="flex max-w-lg flex-1 flex-col justify-center text-left">
          <span className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">
            Page not found · 404
          </span>
          <h1 className="mb-3 text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl">
            요청하신 페이지를
            <br />
            찾을 수 없습니다
          </h1>
          <p className="mb-8 text-base leading-relaxed text-gray-600">
            링크가 잘못되었거나 페이지가 이동·삭제되었을 수 있어요. CHECKMATE 홈에서 여행 준비를 이어가거나,
            새 여행 플랜을 만들어 보세요.
          </p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center rounded-2xl bg-teal-700 px-8 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-teal-800"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
