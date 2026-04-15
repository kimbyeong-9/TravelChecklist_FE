/**
 * WeatherOverlayCard
 *
 * 데스크탑 홈 화면 히어로 이미지 위에 얹히는 날씨 정보 오버레이 카드입니다.
 * 부모 요소에 `position: relative`가 필요합니다.
 */
export default function WeatherOverlayCard() {
  return (
    <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
      <div className="flex items-center gap-2 mb-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-cyan-500"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z" />
        </svg>
        <span className="text-xs font-medium text-gray-500">계산된 18°C</span>
      </div>
      <p className="text-xs text-gray-400 leading-relaxed">
        베이스캠프 세울 때에 좋은 온도. 체계적인 짐을 꾸리도록 이 데이터로 프리셋을 적용할 수
        있습니다.
      </p>
    </div>
  )
}
