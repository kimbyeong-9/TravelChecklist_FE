/**
 * Step3 / Step4 데스크톱 50:50 레이아웃.
 * - fullBleed: 화면 전체 민트→중앙 페이드 + 이미지/글로브 (필수)
 * - 우측 열: pointer-events 비활성 + AI 팁 등만 pointer-events-auto
 */
export default function TripStepDesktopSplit({ left, right, fullBleed }) {
  return (
    <div className="relative hidden md:block md:min-h-screen md:w-full">
      {fullBleed}
      <div className="relative z-10 grid min-h-screen w-full grid-cols-1 md:grid-cols-2">
        <div className="relative z-20 flex min-h-screen min-w-0 flex-col overflow-x-hidden md:col-start-1">
          <div className="relative z-20 flex min-h-0 w-full flex-1 flex-col overflow-y-auto px-8 py-10 lg:px-10 xl:px-12">
            {left}
          </div>
        </div>
        <div className="relative z-20 min-h-screen min-w-0 md:col-start-2 md:pointer-events-none">{right}</div>
      </div>
    </div>
  )
}
