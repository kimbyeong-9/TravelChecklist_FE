import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IMAGES } from '@/images/constants'
import {
  STEP_CONFIG,
  TRIPNEW_ICON_PATHS,
  COMPANIONS_DESKTOP,
  COMPANIONS_MOBILE,
  TRAVEL_STYLES_DESKTOP,
  TRAVEL_STYLES_MOBILE,
  MOBILE_DATE_FIELDS,
} from '@/mocks/tripNewData'

/* ─────────────────────────────────────────────
   범용 SVG 아이콘 — TRIPNEW_ICON_PATHS 데이터 기반
───────────────────────────────────────────── */
function SvgIcon({ name, className = 'w-4 h-4' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d={TRIPNEW_ICON_PATHS[name]} />
    </svg>
  )
}

/* ─────────────────────────────────────────────
   메인 컴포넌트
───────────────────────────────────────────── */
function TripNewPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    companions: 'family',
    travelStyles: ['gourmet'],
  })

  const toggleStyle = (id) => {
    setForm((prev) => ({
      ...prev,
      travelStyles: prev.travelStyles.includes(id)
        ? prev.travelStyles.filter((s) => s !== id)
        : [...prev.travelStyles, id],
    }))
  }

  const handleSubmit = (e) => {
    if (e?.preventDefault) e.preventDefault()
    // TODO: API 연동 후 실제 여행 ID로 교체
    navigate('/trips/1/loading')
  }

  const isValid = form.destination && form.startDate && form.endDate

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ══════════════════════════════════
          데스크탑 레이아웃 (md 이상)
      ══════════════════════════════════ */}
      <div className="hidden md:flex mx-auto max-w-6xl px-6 py-12 gap-12 items-start">

        {/* ── 왼쪽 패널 ── */}
        <div className="w-80 flex-shrink-0 space-y-6">
          {/* 스텝 + 헤딩 */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">
              Step 01
            </p>
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              준비 루틴을<br />시작할까요?
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              완벽한 여행은 세심한 기록에서 시작됩니다. 당신의 여정을 디자인하는 첫 번째 단계를 채워주세요.
            </p>
          </div>

          {/* 진행률 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-400">진행률</span>
              <span className="text-xl font-extrabold text-blue-600">{STEP_CONFIG.progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-500 rounded-full transition-all"
                style={{ width: `${STEP_CONFIG.progress}%` }}
              />
            </div>
          </div>

          {/* 여권 경고 카드 */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <span className="text-amber-500 mt-0.5">
                <SvgIcon name="warning" />
              </span>
              <div>
                <p className="text-sm font-semibold text-amber-800 mb-1">여권 만료일 확인!</p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  대부분의 국가는 입국 시 6개월 이상의 여권 잔여 유효기간을 요구합니다. 지금 바로 여권을 확인해보세요.
                </p>
              </div>
            </div>
          </div>

          {/* 이미지 */}
          <div className="rounded-2xl overflow-hidden aspect-square">
            <img
              src={IMAGES.tripNew.passport}
              alt="여행 준비물"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* ── 오른쪽 패널 (폼) ── */}
        <div className="flex-1 min-w-0">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm overflow-hidden">

            {/* 목적지 */}
            <div className="px-8 py-7 border-b border-gray-100">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-4">
                <SvgIcon name="location" className="w-4 h-4 text-cyan-500" />
                어디로 떠나시나요?
              </label>
              <input
                type="text"
                value={form.destination}
                onChange={(e) => setForm((p) => ({ ...p, destination: e.target.value }))}
                placeholder="도시 또는 국가를 입력하세요"
                className="w-full bg-gray-50 rounded-xl px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />
            </div>

            {/* 여행 일정 */}
            <div className="px-8 py-7 border-b border-gray-100">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-4">
                <SvgIcon name="calendar" className="w-4 h-4 text-cyan-500" />
                여행 일정
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-2">Check-in</p>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))}
                    className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-700 border-none outline-none focus:ring-2 focus:ring-cyan-400 transition"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-2">Check-out</p>
                  <input
                    type="date"
                    value={form.endDate}
                    min={form.startDate}
                    onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))}
                    className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-700 border-none outline-none focus:ring-2 focus:ring-cyan-400 transition"
                  />
                </div>
              </div>
            </div>

            {/* 동행 유형 */}
            <div className="px-8 py-7 border-b border-gray-100">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-4">
                <SvgIcon name="people" className="w-4 h-4 text-cyan-500" />
                함께하는 동행
              </label>
              <div className="grid grid-cols-3 gap-3">
                {COMPANIONS_DESKTOP.map((c) => {
                  const active = form.companions === c.id
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, companions: c.id }))}
                      className={`flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition-colors ${
                        active
                          ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                          : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
                      }`}
                    >
                      <SvgIcon name={c.icon} className="w-6 h-6" />
                      <span className="text-sm font-medium">{c.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 여행 스타일 */}
            <div className="px-8 py-7 border-b border-gray-100">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-4">
                <SvgIcon name="star" className="w-4 h-4 text-cyan-500" />
                여행 스타일
              </label>
              <div className="flex flex-wrap gap-2">
                {TRAVEL_STYLES_DESKTOP.map((s) => {
                  const active = form.travelStyles.includes(s.id)
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleStyle(s.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        active
                          ? 'bg-cyan-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="px-8 py-7">
              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-base py-4 rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                리스트에 저장하고 나중에 확인하기
                <SvgIcon name="chevronRight" className="w-5 h-5" />
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">
                언제든지 돌아와서 나머지 정보를 완성할 수 있습니다.
              </p>
            </div>

          </form>
        </div>

      </div>

      {/* ══════════════════════════════════
          모바일 레이아웃 (md 미만)
      ══════════════════════════════════ */}
      <div className="md:hidden px-5 pt-6 pb-32">

        {/* 스텝 + 헤딩 */}
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">
          Step {String(STEP_CONFIG.currentStep).padStart(2, '0')} / {String(STEP_CONFIG.totalSteps).padStart(2, '0')}
        </p>
        <h1 className="text-2xl font-extrabold text-gray-900 leading-snug mb-1">
          준비 루틴을 시작할까요?
        </h1>
        <p className="text-sm text-gray-500 mb-5">완벽한 여행을 위한 첫 단추를 채워보세요.</p>

        {/* 진행률 */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-500 rounded-full"
              style={{ width: `${STEP_CONFIG.progress}%` }}
            />
          </div>
          <span className="text-sm font-extrabold text-cyan-500 flex-shrink-0">
            {STEP_CONFIG.progress}<span className="text-xs">%</span>
          </span>
        </div>

        {/* 목적지 검색 */}
        <div className="mb-5">
          <p className="text-sm font-semibold text-cyan-500 mb-2">어디로 떠나시나요?</p>
          <div className="relative">
            <SvgIcon name="search" className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={form.destination}
              onChange={(e) => setForm((p) => ({ ...p, destination: e.target.value }))}
              placeholder="목적지 검색 (예: 파리, 교토)"
              className="w-full bg-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
          </div>
        </div>

        {/* 출발일 / 귀국일 */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {MOBILE_DATE_FIELDS.map((field) => (
            <div key={field.id}>
              <p className="text-sm font-semibold text-gray-700 mb-2">{field.label}</p>
              <div className="bg-gray-100 rounded-xl px-3 py-3 flex items-center gap-2">
                <SvgIcon name="calendar" className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                <input
                  type="date"
                  value={form[field.formKey]}
                  min={field.formKey === 'endDate' ? form.startDate : undefined}
                  onChange={(e) => setForm((p) => ({ ...p, [field.formKey]: e.target.value }))}
                  className="bg-transparent text-sm text-gray-700 outline-none w-full"
                />
              </div>
            </div>
          ))}
        </div>

        {/* 여행 스타일 (아이콘 카드 2열 그리드) */}
        <div className="mb-5">
          <p className="text-sm font-semibold text-gray-700 mb-3">여행 스타일</p>
          <div className="grid grid-cols-2 gap-3">
            {TRAVEL_STYLES_MOBILE.map((s) => {
              const active = form.travelStyles.includes(s.id)
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleStyle(s.id)}
                  className={`flex flex-col items-start gap-3 p-4 rounded-2xl border-2 transition-colors text-left ${
                    active
                      ? 'border-cyan-500 bg-white text-cyan-700'
                      : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
                  }`}
                >
                  <span className={active ? 'text-cyan-500' : 'text-gray-400'}>
                    <SvgIcon name={s.icon} className="w-7 h-7" />
                  </span>
                  <span className="text-sm font-semibold text-gray-800">{s.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 함께하는 멤버 (pill 토글) */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">함께하는 멤버</p>
          <div className="flex flex-wrap gap-2">
            {COMPANIONS_MOBILE.map((c) => {
              const active = form.companions === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, companions: c.id }))}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {c.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* 여권 팁 카드 */}
        <div className="bg-amber-50 rounded-2xl p-4 relative overflow-hidden">
          <div className="flex items-start gap-3 pr-14">
            <span className="text-amber-500 flex-shrink-0 mt-0.5">
              <SvgIcon name="warningOutline" />
            </span>
            <div>
              <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-1">Tips</p>
              <p className="text-sm font-semibold text-gray-800 mb-0.5">어권을 챙기셨나요?</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                출국 3일 전에는 필수 서류를 꼭 다시 확인하세요.
              </p>
            </div>
          </div>
          {/* 저장 아이콘 버튼 */}
          <button className="absolute bottom-4 right-4 w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center shadow-md">
            <SvgIcon name="save" className="w-5 h-5 text-white" />
          </button>
        </div>

      </div>

      {/* ══════════════════════════════════
          모바일 고정 하단 CTA
      ══════════════════════════════════ */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 px-4 pb-2">
        <button
          onClick={handleSubmit}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold text-base py-4 rounded-none transition-colors flex items-center justify-center gap-2"
        >
          지금 저장하고 나중에 확인하기
          <SvgIcon name="chevronRight" className="w-5 h-5" />
        </button>
      </div>

    </div>
  )
}

export default TripNewPage
