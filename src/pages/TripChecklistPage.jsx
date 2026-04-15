import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TRIP_INFO, CATEGORIES, INITIAL_ITEMS } from '@/mocks/checklistData'
import { ICON_PATHS, CATEGORY_ICON_MAP } from '@/mocks/checklistIcons'
import { SIDEBAR_STATS, WEATHER_RECOMMENDED_ITEMS } from '@/mocks/checklistSidebar'
import { IMAGES } from '@/images/constants'

/* ─────────────────────────────────────────────
   이벤트 트래킹 헬퍼 (추후 SDK 교체)
───────────────────────────────────────────── */
const trackEvent = (eventName, props = {}) => {
  console.debug('[Event]', eventName, props)
}

/* ─────────────────────────────────────────────
   범용 SVG 아이콘 — ICON_PATHS 데이터 기반
───────────────────────────────────────────── */
function SvgIcon({ name, className = 'w-4 h-4' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d={ICON_PATHS[name]} />
    </svg>
  )
}
/* ─────────────────────────────────────────────
   메인 컴포넌트
───────────────────────────────────────────── */
function TripChecklistPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [items, setItems] = useState(INITIAL_ITEMS)
  const [newItemText, setNewItemText] = useState('')
  const [hasEdited, setHasEdited] = useState(false)

  useEffect(() => {
    trackEvent('saved_list_open', { trip_id: id })
  }, [id])

  const triggerEditStart = () => {
    if (!hasEdited) {
      trackEvent('edit_start', { trip_id: id })
      setHasEdited(true)
    }
  }

  const handleCheck = (itemId) => {
    triggerEditStart()
    const target = items.find((i) => i.id === itemId)
    const nextChecked = !target?.checked
    setItems((prev) => prev.map((i) => i.id === itemId ? { ...i, checked: !i.checked } : i))
    if (nextChecked) trackEvent('prepare_action', { trip_id: id, item_id: itemId, item_category: target?.category })
  }

  const handleDelete = (itemId) => {
    triggerEditStart()
    const target = items.find((i) => i.id === itemId)
    setItems((prev) => prev.filter((i) => i.id !== itemId))
    trackEvent('edit_del', { trip_id: id, item_id: itemId, item_category: target?.category })
  }

  const handleAddItem = (e) => {
    e.preventDefault()
    if (!newItemText.trim()) return
    triggerEditStart()
    const newItem = { id: Date.now(), category: 'documents', title: newItemText.trim(), subtitle: '', checked: false }
    setItems((prev) => [...prev, newItem])
    setNewItemText('')
    trackEvent('edit_add', { trip_id: id, item_title: newItem.title })
  }

  const handleBackflow = () => {
    trackEvent('re_store_trigger', { trip_id: id, checked_count: items.filter((i) => i.checked).length })
    navigate(`/trips/${id}/search`)
  }

  const checkedCount = items.filter((i) => i.checked).length
  const totalCount = items.length
  const progress = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ══════════════════════════════════
          데스크탑 레이아웃 (md 이상)
      ══════════════════════════════════ */}
      <div className="hidden md:flex mx-auto max-w-6xl px-6 py-10 gap-10 items-start">

        {/* ── 왼쪽 메인 컬럼 ── */}
        <div className="flex-1 min-w-0">

          {/* 헤딩 */}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{TRIP_INFO.title}</h1>
          <p className="text-sm text-gray-500 mb-8">
            완벽한 여행을 위한 체계적인 준비. 현재 진행 상황을 확인하고 필수 항목을 점검하세요.
          </p>

          {/* 날씨 알림 카드 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-8">
            <div className="flex">
              <div className="w-44 h-36 flex-shrink-0 overflow-hidden">
                <img
                  src={IMAGES.checklist.weatherDanang}
                  alt="다낭 날씨"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex-1">
                <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                  <SvgIcon name="warning" className="w-3 h-3" />
                  날씨정보: 다낭 우기
                </span>
                <p className="text-sm font-semibold text-gray-800 mb-1.5">현재 다낭은 우기입니다</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  갑작스러운 소나기에 대비해{' '}
                  {WEATHER_RECOMMENDED_ITEMS.map((item, idx) => (
                    <span key={item}>
                      <strong className="text-gray-700">{item}</strong>
                      {idx < WEATHER_RECOMMENDED_ITEMS.length - 1 ? (idx === WEATHER_RECOMMENDED_ITEMS.length - 2 ? ', ' : '과 ') : ''}
                    </span>
                  ))}
                  을 챙기는 것을 강력히 권장합니다.
                </p>
                <button
                  onClick={handleBackflow}
                  className="text-sm font-semibold text-cyan-500 hover:text-cyan-600 flex items-center gap-1 transition-colors"
                >
                  권장 아이템 리스트 보기
                  <SvgIcon name="chevronRight" />
                </button>
              </div>
            </div>
          </div>

          {/* 카테고리별 체크리스트 섹션 */}
          {CATEGORIES.map((cat) => {
            const catItems = items.filter((i) => i.category === cat.id)
            const catChecked = catItems.filter((i) => i.checked).length
            if (catItems.length === 0) return null
            return (
              <div key={cat.id} className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold text-gray-900">{cat.label}</h2>
                  <span className="text-sm text-gray-400">{catItems.length}개 중 {catChecked}개 완료</span>
                </div>
                <div className="space-y-2">
                  {catItems.map((item) => (
                    <DesktopChecklistItem
                      key={item.id}
                      item={item}
                      category={cat.id}
                      onCheck={handleCheck}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )
          })}

          {/* 새 항목 추가 버튼 */}
          <button
            className="w-full border-2 border-dashed border-gray-200 rounded-2xl py-4 text-sm text-gray-400 hover:border-cyan-300 hover:text-cyan-500 transition-colors flex items-center justify-center gap-2"
            onClick={() => {/* 모달 또는 인라인 폼 - 현재는 스크롤 */}}
          >
            <SvgIcon name="plus" />
            새로운 항목 추가하기
          </button>

        </div>

        {/* ── 오른쪽 사이드바 ── */}
        <div className="w-72 flex-shrink-0 space-y-4 sticky top-20">

          {/* 전체 진행률 카드 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">Total Progress</p>
              <SvgIcon name="bar" className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-5xl font-extrabold text-cyan-500 mb-3">{progress}%</p>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-cyan-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            {SIDEBAR_STATS.map((stat) => (
              <div key={stat.id} className="flex justify-between text-sm text-gray-600 mb-5">
                <span>{stat.label}</span>
                <span className="font-semibold">{stat.getValue(checkedCount, totalCount)}</span>
              </div>
            ))}
            <button
              onClick={() => navigate('/trips')}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-sm py-3 rounded-xl transition-colors"
            >
              지금 저장하고 나중에 확인하기
            </button>
          </div>

          {/* 목적지 카드 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="h-32 overflow-hidden">
              <img
                src={IMAGES.checklist.destinationMap}
                alt="Da Nang map"
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(1)' }}
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <p className="text-[10px] font-semibold tracking-widest text-amber-600 uppercase mb-1">Destination</p>
              <p className="text-sm font-bold text-gray-900 mb-1">{TRIP_INFO.destination}</p>
              <p className="text-xs text-gray-500">
                D-{TRIP_INFO.dDay}일 전입니다. 필수 서류를 확인하세요.
              </p>
            </div>
          </div>

          {/* 팁 카드 */}
          <div className="bg-amber-50 rounded-2xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-amber-500 mt-0.5 flex-shrink-0">
                <SvgIcon name="bulb" />
              </span>
              <div>
                <p className="text-xs font-bold text-amber-800 mb-1">준비 팁</p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  짐을 쌀 때 &apos;그랩(Grab)&apos; 어플을 미리 설치하고 카드를 등록해두면 현지 도착 후 매우 편리합니다.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════
          모바일 레이아웃 (md 미만)
      ══════════════════════════════════ */}
      <div className="md:hidden px-5 pt-6 pb-32">

        {/* CONFIRM LOOP 헤더 */}
        <p className="text-[10px] font-bold tracking-widest text-cyan-500 uppercase mb-2">Confirm Loop</p>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-extrabold text-gray-900 leading-tight">
            준비 루틴을 시작할까요?
          </h1>
          <span className="text-2xl font-extrabold text-cyan-500 flex-shrink-0">
            {progress}<span className="text-sm">%</span>
          </span>
        </div>

        {/* 진행률 바 */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-cyan-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-gray-400 mb-6">완벽한 여행가지 단 몇 걸음 남았습니다.</p>

        {/* 카테고리별 체크리스트 */}
        {CATEGORIES.map((cat) => {
          const catItems = items.filter((i) => i.category === cat.id)
          if (catItems.length === 0) return null
          return (
            <div key={cat.id} className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 bg-cyan-500 rounded-full" />
                <h2 className="text-sm font-bold text-gray-800">{cat.label}</h2>
              </div>
              <div className="space-y-2">
                {catItems.map((item) => (
                  <MobileChecklistItem
                    key={item.id}
                    item={item}
                    category={cat.id}
                    onCheck={handleCheck}
                  />
                ))}
              </div>
            </div>
          )
        })}

        {/* 나만의 항목 추가 */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-cyan-500 mb-2">나만의 항목 추가</p>
          <form onSubmit={handleAddItem} className="flex gap-2">
            <input
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              placeholder="예: 카메라 삼각대 챙기기"
              className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
            <button
              type="submit"
              className="w-11 h-11 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
            >
              <SvgIcon name="plus" className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* 이미지 배너 카드 */}
        <div className="relative rounded-2xl overflow-hidden h-36 mb-4">
          <img
            src={IMAGES.checklist.mountainBanner}
            alt="여행 배너"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4">
            <p className="text-sm font-bold text-white">여행 {TRIP_INFO.dDay}일 전입니다.</p>
            <p className="text-xs text-white/80">필수 서류를 확인하세요.</p>
          </div>
        </div>

      </div>

      {/* 모바일 고정 하단 CTA */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-40">
        <button
          onClick={() => navigate('/trips')}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-base py-4 transition-colors flex items-center justify-center gap-2"
        >
          완벽하게 준비되었습니다
          <span className="text-yellow-300">✦</span>
        </button>
      </div>

    </div>
  )
}

/* ─────────────────────────────────────────────
   데스크탑 체크리스트 아이템
───────────────────────────────────────────── */
function DesktopChecklistItem({ item, category, onCheck, onDelete }) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition-colors group ${
        item.checked ? 'bg-cyan-50' : 'bg-white border border-gray-100'
      }`}
    >
      <button
        onClick={() => onCheck(item.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
          item.checked
            ? 'bg-cyan-500 border-cyan-500 text-white'
            : 'border-gray-300 hover:border-cyan-400'
        }`}
      >
        {item.checked && <SvgIcon name="check" className="w-3.5 h-3.5" />}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${item.checked ? 'text-cyan-700' : 'text-gray-900'}`}>
          {item.title}
        </p>
        {item.subtitle && (
          <p className="text-xs text-gray-400 mt-0.5 truncate">{item.subtitle}</p>
        )}
      </div>

      <button
        onClick={() => onDelete(item.id)}
        className="text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
      >
        <SvgIcon name={category === 'electronics' ? 'pencil' : 'trash'} />
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────────
   모바일 체크리스트 아이템
───────────────────────────────────────────── */
function MobileChecklistItem({ item, category, onCheck }) {
  return (
    <button
      onClick={() => onCheck(item.id)}
      className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors ${
        item.checked ? 'bg-cyan-50' : 'bg-white border border-gray-100'
      }`}
    >
      <span
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
          item.checked ? 'bg-cyan-500 border-cyan-500 text-white' : 'border-gray-300'
        }`}
      >
        {item.checked && <SvgIcon name="check" className="w-3 h-3" />}
      </span>

      <span className={`flex-1 text-sm font-medium ${item.checked ? 'text-cyan-700' : 'text-gray-700'}`}>
        {item.title}
      </span>

      {!item.checked && (
        <span className="text-gray-300 flex-shrink-0">
          <SvgIcon name={CATEGORY_ICON_MAP[category]} />
        </span>
      )}
    </button>
  )
}

export default TripChecklistPage
