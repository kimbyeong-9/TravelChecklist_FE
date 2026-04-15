/**
 * TripLoadingPage 목데이터
 *
 * 로딩 화면에서 사용되는 단계 메시지, 팁, 배경 효과, 아이콘 등
 * 모든 정적 데이터를 중앙 관리합니다.
 */

/* ─────────────────────────────────────────────
   분석 단계 메시지 (진행률 구간별)
───────────────────────────────────────────── */
export const STAGES = [
  {
    label: '분석 단계',
    barLabel: 'DATA ANALYZING',
    descDesktop: 'Architect is analyzing the weather and environment of your destination...',
    descMobile: '여행지의 실시간 날씨 정보를 분석하여 최적의 준비물 리스트를 생성하고 있습니다.',
    highlight: '실시간 날씨 정보',
    range: [0, 40],
  },
  {
    label: '큐레이션 단계',
    barLabel: 'CURATING CHECKLIST',
    descDesktop: 'Building your personalized checklist based on destination data...',
    descMobile: '여행지 환경 데이터를 기반으로 맞춤형 준비물 리스트를 큐레이션하고 있습니다.',
    highlight: '맞춤형 준비물 리스트',
    range: [40, 75],
  },
  {
    label: '최적화 단계',
    barLabel: 'OPTIMISING ROUTINE',
    descDesktop: 'Finalizing and optimizing your personalized travel routine...',
    descMobile: '당신만을 위한 여행 준비 루틴을 최종 구성하고 있습니다.',
    highlight: '여행 준비 루틴',
    range: [75, 100],
  },
]

/* ─────────────────────────────────────────────
   순환 팁 메시지
───────────────────────────────────────────── */
export const TIPS = [
  '완벽한 준비는 최고의 여행을 만듭니다.',
  '여행 3일 전에 필수 서류를 꼭 확인하세요.',
  '현지 앱을 미리 설치해두면 훨씬 편리합니다.',
]

/* ─────────────────────────────────────────────
   아이콘 SVG path 데이터
───────────────────────────────────────────── */
export const LOADING_ICON_PATHS = {
  diamond:
    'M12 2L2 9l10 13 10-13L12 2zm0 3.5l6.5 4.5L12 19 5.5 10 12 5.5z',
  sparkles:
    'M12 1L9.5 8.5 2 11l7.5 2.5L12 21l2.5-7.5L22 11l-7.5-2.5L12 1zM5 5l-1 3-3 1 3 1 1 3 1-3 3-1-3-1L5 5zm14 12l-1 2-2 1 2 1 1 2 1-2 2-1-2-1-1-2z',
  trendUp:
    'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z',
  bulb:
    'M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z',
  thermometer:
    'M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-2V5c0-.55.45-1 1-1s1 .45 1 1v6h-2z',
}

/* ─────────────────────────────────────────────
   배경 블러 오브 데이터
───────────────────────────────────────────── */
export const BLUR_ORBS = [
  {
    id: 'orb-top-right',
    width: '60vw',
    height: '60vw',
    top: '-10vw',
    right: '-10vw',
    color: 'rgba(6,182,212,0.18)',
    blur: '60px',
  },
  {
    id: 'orb-bottom-left',
    width: '50vw',
    height: '50vw',
    bottom: '-10vw',
    left: '5vw',
    color: 'rgba(14,165,233,0.12)',
    blur: '80px',
  },
]

/* ─────────────────────────────────────────────
   하단 브랜딩 도트 데이터
───────────────────────────────────────────── */
export const BRAND_DOTS = [
  { id: 'dot-1', color: 'bg-cyan-400' },
  { id: 'dot-2', color: 'bg-cyan-300' },
  { id: 'dot-3', color: 'bg-cyan-200', desktopOnly: true },
]
