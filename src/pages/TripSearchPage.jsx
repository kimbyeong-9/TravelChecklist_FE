import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import {
  CATEGORIES,
  MOCK_ITEMS,
  TRIP_SEARCH_CONTEXT,
  DAILY_GUIDES,
} from '@/mocks/searchData'
import { saveItemForTrip, loadSavedItems } from '@/utils/savedTripItems'
import { appendGuideArchiveEntry, loadGuideArchive } from '@/utils/guideArchiveStorage'
import { TripFlowMobileBar } from '@/components/common/TripFlowTopBar'

const trackEvent = (eventName, properties = {}) => {
  console.debug('[Event]', eventName, properties)
}

function SvgIcon({ name, className = 'w-5 h-5' }) {
  const paths = {
    cloud:
      'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z',
    map:
      'M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z',
    warning:
      'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
    chevron: 'M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z',
  }
  const d = paths[name]
  if (!d) return null
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d={d} />
    </svg>
  )
}

function TripSearchInner({ tripId }) {
  const navigate = useNavigate()
  const searchStartRef = useRef(0)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [savedIds, setSavedIds] = useState(() => new Set(loadSavedItems(tripId).map((x) => String(x.id))))
  const [openDayId, setOpenDayId] = useState(DAILY_GUIDES[0]?.id ?? null)
  const [leaveModalOpen, setLeaveModalOpen] = useState(false)
  const [archiveCount, setArchiveCount] = useState(() => loadGuideArchive(tripId).length)
  /** null | 'success' 저장 완료 | 'already' 이미 저장됨 */
  const [saveNotice, setSaveNotice] = useState(null)

  useEffect(() => {
    const t = Date.now()
    searchStartRef.current = t
    trackEvent('search_start', { trip_id: tripId, timestamp: t })
  }, [tripId])

  useEffect(() => {
    if (!saveNotice) return
    const timer = setTimeout(() => setSaveNotice(null), 4200)
    return () => clearTimeout(timer)
  }, [saveNotice])

  const savedCount = savedIds.size

  const handleCategoryChange = (category) => {
    if (selectedCategory !== 'all' && category !== selectedCategory) {
      trackEvent('research_trigger', {
        trip_id: tripId,
        from_category: selectedCategory,
        to_category: category,
      })
    }
    setSelectedCategory(category)
  }

  const handleDetailCheck = (item) => {
    trackEvent('detail_check_open', {
      trip_id: tripId,
      item_id: item.id,
      item_category: item.category,
      elapsed_ms: searchStartRef.current ? Date.now() - searchStartRef.current : null,
    })
  }

  /** 카테고리별 필수품 전체를 체크리스트 저장소에 반영 */
  const handleBulkSave = () => {
    if (
      MOCK_ITEMS.length > 0 &&
      MOCK_ITEMS.every((item) => savedIds.has(String(item.id)))
    ) {
      setSaveNotice('already')
      return
    }

    MOCK_ITEMS.forEach((item) => {
      if (savedIds.has(String(item.id))) return
      saveItemForTrip(tripId, {
        id: item.id,
        category: item.category,
        title: item.title,
        subtitle: item.detail || item.description || '',
      })
      trackEvent('save_complete', {
        trip_id: tripId,
        item_id: item.id,
        item_category: item.category,
        elapsed_ms: searchStartRef.current ? Date.now() - searchStartRef.current : null,
      })
    })
    setSavedIds(new Set(MOCK_ITEMS.map((i) => String(i.id))))

    appendGuideArchiveEntry(tripId, {
      pageTitle: TRIP_SEARCH_CONTEXT.title,
      pageSubtitle: TRIP_SEARCH_CONTEXT.subtitle,
      destination: TRIP_SEARCH_CONTEXT.destination,
      country: TRIP_SEARCH_CONTEXT.country,
      tripWindowLabel: TRIP_SEARCH_CONTEXT.tripWindowLabel,
      weatherSummary: TRIP_SEARCH_CONTEXT.weatherSummary,
      temperatureRange: TRIP_SEARCH_CONTEXT.temperatureRange,
      rainChance: TRIP_SEARCH_CONTEXT.rainChance,
      environmentTags: TRIP_SEARCH_CONTEXT.environmentTags.map((t) => ({ ...t })),
      phaseHints: TRIP_SEARCH_CONTEXT.phaseHints.map((p) => ({ ...p })),
      items: MOCK_ITEMS.map((i) => ({
        id: i.id,
        category: i.category,
        categoryLabel: i.categoryLabel,
        title: i.title,
        description: i.description,
        detail: i.detail,
      })),
      dailySummaries: DAILY_GUIDES.map((d) => ({
        id: d.id,
        dateLabel: d.dateLabel,
        region: d.region,
        weatherLine: d.weatherLine,
      })),
      dailyGuidesFull: DAILY_GUIDES.map((d) => ({
        id: d.id,
        dateLabel: d.dateLabel,
        region: d.region,
        weatherLine: d.weatherLine,
        environment: [...d.environment],
        essentials: [...d.essentials],
        cautions: [...d.cautions],
      })),
    })
    setArchiveCount(loadGuideArchive(tripId).length)
    setSaveNotice('success')
  }

  const openHomeConfirmModal = () => setLeaveModalOpen(true)

  const handleLeaveWithoutSave = () => {
    setLeaveModalOpen(false)
    navigate('/')
  }

  const handleModalBack = () => setLeaveModalOpen(false)

  const filteredItems =
    selectedCategory === 'all'
      ? MOCK_ITEMS
      : MOCK_ITEMS.filter((item) => item.category === selectedCategory)

  const goGuideArchive = () => {
    trackEvent('guide_archive_navigate', {
      trip_id: tripId,
      checklist_saved_count: savedCount,
      archive_entries: loadGuideArchive(tripId).length,
    })
    navigate(`/trips/${tripId}/guide-archive`)
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(180deg, #E0F7FA 0%, #F8FAFC 55%, #F1F5F9 100%)' }}
    >
      <TripFlowMobileBar backTo="/" />

      {saveNotice && (
        <div
          className={`fixed left-1/2 z-[60] flex max-w-md -translate-x-1/2 flex-col items-center gap-1 rounded-2xl border px-5 py-3.5 shadow-lg top-[calc(4.25rem+env(safe-area-inset-top,0px))] md:top-24 ${
            saveNotice === 'already'
              ? 'border-amber-200 bg-amber-50'
              : 'border-teal-200 bg-white'
          }`}
          role="status"
        >
          {saveNotice === 'already' ? (
            <>
              <p className="text-sm font-bold text-amber-900">이미 저장된 가이드입니다</p>
              <p className="text-xs text-center text-amber-900/80">
                필수품·가이드 보관함에 반영된 상태입니다. 추가 저장 없이{' '}
                <strong className="text-amber-950">가이드 보관함</strong>에서 확인하세요.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-bold text-teal-900">저장되었습니다</p>
              <p className="text-xs text-center text-gray-600">
                맞춤 여행 준비 가이드가 <strong className="text-gray-800">가이드 보관함</strong> 목록에 추가되었습니다.
              </p>
            </>
          )}
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* 헤더 */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="mb-3 hidden items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-900 md:flex"
            >
              ← 내 여행으로
            </button>
            <p className="text-xs font-bold tracking-widest text-teal-600 uppercase mb-1">Store Loop · 준비 탐색</p>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
              {TRIP_SEARCH_CONTEXT.title}
            </h1>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl leading-relaxed">{TRIP_SEARCH_CONTEXT.subtitle}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <button
              type="button"
              onClick={goGuideArchive}
              className="rounded-2xl bg-teal-700 hover:bg-teal-800 text-white px-5 py-3 text-sm font-bold shadow-md transition-colors flex items-center justify-center gap-2"
            >
              가이드 보관함
              {archiveCount > 0 && (
                <span className="bg-white/20 rounded-full px-2 py-0.5 text-xs tabular-nums">{archiveCount}</span>
              )}
              <SvgIcon name="chevron" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 목적지 · 날씨 · 환경 요약 */}
        <div className="rounded-3xl bg-white/90 border border-teal-100 shadow-sm p-6 md:p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 text-cyan-800 text-xs font-bold px-3 py-1">
                  <SvgIcon name="map" className="w-3.5 h-3.5" />
                  {TRIP_SEARCH_CONTEXT.destination}
                </span>
                <span className="text-xs text-gray-500">{TRIP_SEARCH_CONTEXT.country}</span>
              </div>
              <p className="text-sm font-semibold text-gray-800 mb-2">{TRIP_SEARCH_CONTEXT.tripWindowLabel}</p>
              <div className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed mb-4">
                <SvgIcon name="cloud" className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">날씨 요약</p>
                  <p>{TRIP_SEARCH_CONTEXT.weatherSummary}</p>
                  <p className="mt-2 text-xs text-gray-500">
                    기온 {TRIP_SEARCH_CONTEXT.temperatureRange} · {TRIP_SEARCH_CONTEXT.rainChance}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {TRIP_SEARCH_CONTEXT.environmentTags.map((t) => (
                  <span
                    key={t.id}
                    className="text-xs font-semibold bg-teal-50 text-teal-900 border border-teal-100 rounded-xl px-3 py-1.5"
                  >
                    {t.label}
                    <span className="font-normal text-teal-700/90"> — {t.detail}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:w-80 space-y-2">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">여행 단계별 팁</p>
              <ul className="space-y-2">
                {TRIP_SEARCH_CONTEXT.phaseHints.map((p) => (
                  <li key={p.phase} className="text-xs text-gray-600 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100">
                    <span className="font-bold text-gray-800">{p.phase}</span> — {p.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 일정·지역별 맞춤 안내 */}
        <section className="mb-10">
          <h2 className="text-lg font-extrabold text-gray-900 mb-1 flex items-center gap-2">
            <SvgIcon name="warning" className="w-5 h-5 text-amber-500" />
            날짜 · 지역별 맞춤 필수품 & 주의사항
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            설정한 일정에 맞춰, 비행기 탑승 전부터 귀국 전까지 구간별로 챙길 것과 안전·교통 주의를 정리했습니다.
          </p>
          <div className="space-y-3">
            {DAILY_GUIDES.map((day) => {
              const open = openDayId === day.id
              return (
                <div
                  key={day.id}
                  className="rounded-2xl border border-gray-200/80 bg-white/95 shadow-sm overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenDayId(open ? null : day.id)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50/80 transition-colors"
                  >
                    <div>
                      <p className="text-xs font-bold text-teal-600">{day.dateLabel}</p>
                      <p className="text-sm font-bold text-gray-900">{day.region}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{day.weatherLine}</p>
                    </div>
                    <span className={`text-gray-400 transition-transform ${open ? 'rotate-90' : ''}`}>
                      <SvgIcon name="chevron" className="w-5 h-5" />
                    </span>
                  </button>
                  {open && (
                    <div className="px-4 pb-4 pt-0 border-t border-gray-100 space-y-4">
                      <div className="flex flex-wrap gap-1.5 pt-3">
                        {day.environment.map((e) => (
                          <span key={e} className="text-[11px] font-semibold bg-slate-100 text-slate-700 rounded-full px-2 py-0.5">
                            {e}
                          </span>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-700 mb-1.5">이날 챙기면 좋은 것</p>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-0.5">
                          {day.essentials.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-amber-800 mb-1.5 flex items-center gap-1">
                          <SvgIcon name="warning" className="w-3.5 h-3.5" />
                          주의사항
                        </p>
                        <ul className="space-y-1.5">
                          {day.cautions.map((line) => (
                            <li
                              key={line}
                              className="text-sm text-gray-700 bg-amber-50/80 border border-amber-100 rounded-xl px-3 py-2 leading-snug"
                            >
                              {line}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* 카테고리별 필수품 */}
        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-1">카테고리별 필수품</h2>
          <p className="text-sm text-gray-500 mb-4">
            필수 서류, 전자 기기, 의류 등으로 나누어 두었습니다. 하단 <strong className="text-gray-700">저장</strong>을 누르면
            안내한 필수품이 체크리스트에 한 번에 반영됩니다.
          </p>

          <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-thin">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => handleCategoryChange(cat.value)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  selectedCategory === cat.value
                    ? 'bg-teal-700 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {filteredItems.map((item) => (
              <SearchResultItem key={item.id} item={item} onDetailCheck={handleDetailCheck} />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16 text-gray-400 text-sm">해당 카테고리에 항목이 없습니다.</div>
          )}

          {/* 저장 · 홈으로 (데스크톱: 섹션 하단 / 모바일: 하단 고정과 동일 동작을 위해 별도 바도 둠) */}
          <div className="hidden md:flex flex-wrap gap-3 mt-8 pt-6 border-t border-gray-200/80">
            <button
              type="button"
              onClick={handleBulkSave}
              className="rounded-2xl bg-teal-700 hover:bg-teal-800 text-white px-8 py-3.5 text-sm font-bold shadow-md transition-colors"
            >
              저장
            </button>
            <button
              type="button"
              onClick={openHomeConfirmModal}
              className="rounded-2xl border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-800 px-8 py-3.5 text-sm font-bold transition-colors"
            >
              홈으로
            </button>
          </div>
        </section>

        {/* 하단 고정: 저장 + 홈으로 (모바일) — 바텀 네비 위에 두어 잘리지 않게 */}
        <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 px-4 pb-3 pt-3 bg-gradient-to-t from-white via-white/95 to-transparent [padding-bottom:max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleBulkSave}
              className="flex-1 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-base py-4 shadow-lg"
            >
              저장
            </button>
            <button
              type="button"
              onClick={openHomeConfirmModal}
              className="flex-1 rounded-2xl border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-900 font-bold text-base py-4 shadow-sm"
            >
              홈으로
            </button>
          </div>
        </div>

        <div className="h-40 md:hidden" aria-hidden />
      </div>

      {/* 홈 이동 확인 모달 */}
      {leaveModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/45"
          role="presentation"
          onClick={handleModalBack}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="leave-modal-title"
            className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="leave-modal-title" className="text-center text-base font-bold text-gray-900 leading-snug mb-8">
              저장하지 않으시겠습니까?
            </h2>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleModalBack}
                className="flex-1 rounded-xl border-2 border-teal-600 bg-white py-3 text-sm font-bold text-teal-800 hover:bg-teal-50 transition-colors"
              >
                뒤로 가기
              </button>
              <button
                type="button"
                onClick={handleLeaveWithoutSave}
                className="flex-1 rounded-xl bg-gray-200 hover:bg-gray-300 py-3 text-sm font-bold text-gray-800 transition-colors"
              >
                저장안함
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SearchResultItem({ item, onDetailCheck }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onDetailCheck(item)}
      onKeyDown={(e) => e.key === 'Enter' && onDetailCheck(item)}
      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:border-teal-200 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="text-[11px] rounded-full bg-gray-100 text-gray-700 px-2.5 py-0.5 font-bold">
            {item.categoryLabel}
          </span>
        </div>
        <p className="text-sm font-bold text-gray-900">{item.title}</p>
        {item.description && <p className="text-xs text-gray-600 mt-1 leading-relaxed">{item.description}</p>}
        {item.detail && (
          <p className="text-xs text-gray-500 mt-2 leading-relaxed border-l-2 border-teal-200 pl-2">{item.detail}</p>
        )}
      </div>
    </div>
  )
}

function TripSearchPage() {
  const { id } = useParams()
  const location = useLocation()
  return <TripSearchInner key={`${id}-${location.key}`} tripId={id} />
}

export default TripSearchPage
