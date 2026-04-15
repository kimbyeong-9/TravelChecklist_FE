/**
 * TripSearchPage 목데이터
 *
 * 카테고리 필터 탭과 검색 결과 아이템을 관리합니다.
 * 추후 GET /api/trips/:id/search API 연동 시 MOCK_ITEMS를 교체하면 됩니다.
 */

/** 카테고리 필터 탭 */
export const CATEGORIES = [
  { value: 'all', label: '전체' },
  { value: 'documents', label: '서류 · 비자' },
  { value: 'packing', label: '준비물' },
  { value: 'booking', label: '예약' },
  { value: 'health', label: '건강 · 보험' },
  { value: 'etc', label: '기타' },
]

/** 검색 결과 아이템 (임시 목데이터 — API 연동 후 제거) */
export const MOCK_ITEMS = [
  { id: 1, category: 'documents', categoryLabel: '서류 · 비자', title: '여권 유효기간 확인', description: '입국 기준 6개월 이상 남아있어야 합니다.' },
  { id: 2, category: 'documents', categoryLabel: '서류 · 비자', title: '비자 신청', description: '여행지에 따라 사전 비자가 필요할 수 있습니다.' },
  { id: 3, category: 'packing', categoryLabel: '준비물', title: '여행용 어댑터 챙기기', description: '국가별 콘센트 규격을 확인하세요.' },
  { id: 4, category: 'packing', categoryLabel: '준비물', title: '상비약 챙기기', description: '두통약, 소화제, 지사제 등을 준비하세요.' },
  { id: 5, category: 'booking', categoryLabel: '예약', title: '항공권 예약 확인', description: '이름, 날짜, 좌석 등을 다시 확인하세요.' },
  { id: 6, category: 'booking', categoryLabel: '예약', title: '숙소 예약 확인', description: '체크인/체크아웃 시간을 확인하세요.' },
  { id: 7, category: 'health', categoryLabel: '건강 · 보험', title: '여행자 보험 가입', description: '출발 전에 반드시 가입하세요.' },
  { id: 8, category: 'etc', categoryLabel: '기타', title: '로밍 또는 유심 준비', description: '현지 유심이 더 저렴할 수 있습니다.' },
]
