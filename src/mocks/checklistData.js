/**
 * TripChecklistPage 목데이터
 *
 * 추후 API 연동 시 이 파일의 상수를 API 응답으로 교체하면 됩니다.
 */

/** 여행 기본 정보 */
export const TRIP_INFO = {
  title: '다낭 여행 준비 루틴',
  destination: 'Da Nang, Vietnam',
  dDay: 7,
}

/** 체크리스트 카테고리 */
export const CATEGORIES = [
  { id: 'documents', label: '필수 서류' },
  { id: 'electronics', label: '전자기기' },
  { id: 'booking', label: '예약 내역' },
]

/** 체크리스트 초기 아이템 */
export const INITIAL_ITEMS = [
  { id: 1, category: 'documents',    title: '여권 및 비자 복사본',    subtitle: '만료일 6개월 이상 남았는지 확인 필수',           checked: true },
  { id: 2, category: 'documents',    title: '여행자 보험 증서',        subtitle: '디지털 파일 및 출력물 준비',                     checked: false },
  { id: 3, category: 'documents',    title: '여행 확인 서류 출력',     subtitle: '호텔 바우처 및 투어 예약 확인서',                 checked: true },
  { id: 4, category: 'documents',    title: '국제운전면허증',          subtitle: '렌터카 이용 시 필수',                            checked: true },
  { id: 5, category: 'electronics',  title: '유니버셜 어댑터',        subtitle: '베트남 220V (한국과 동일하지만 멀티탭 추천)',      checked: false },
  { id: 6, category: 'electronics',  title: '보조 배터리',            subtitle: '10,000mAh 이상, 기내 반입 확인',                  checked: true },
  { id: 7, category: 'electronics',  title: '카메라 및 메모리카드',    subtitle: '여분 SD카드 128GB 이상 추천',                    checked: false },
  { id: 8, category: 'booking',      title: '항공권 e-티켓',           subtitle: '이메일 저장 및 모바일 체크인 완료',               checked: false },
  { id: 9, category: 'booking',      title: '숙소 예약 확인서',        subtitle: '체크인 시간 및 주소 메모',                       checked: true },
]
