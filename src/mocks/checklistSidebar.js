/**
 * TripChecklistPage 사이드바 / 날씨 알림 관련 정적 데이터
 *
 * 사이드바 통계 행과 날씨 알림 카드의 권장 준비물을 관리합니다.
 */

/** 사이드바 진행률 통계 행 */
export const SIDEBAR_STATS = [
  { id: 'completed', label: '완료된 항목', getValue: (checked) => checked },
  { id: 'remaining', label: '남은 항목', getValue: (checked, total) => total - checked },
]

/** 날씨 알림 카드 — 권장 준비물 목록 */
export const WEATHER_RECOMMENDED_ITEMS = ['우산', '방수 팩', '여벌 옷']
