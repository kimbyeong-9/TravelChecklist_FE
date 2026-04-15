import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { getGuideArchiveEntry } from '@/utils/guideArchiveStorage'
import GuideSnapshotView from '@/components/guide/GuideSnapshotView'

function TripGuideArchiveDetailInner({ tripId, entryId }) {
  const navigate = useNavigate()
  const entry = getGuideArchiveEntry(tripId, entryId)

  if (!entry) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ background: 'linear-gradient(180deg, #E0F7FA 0%, #F8FAFC 55%, #F1F5F9 100%)' }}
      >
        <p className="text-gray-700 font-medium mb-2">저장된 가이드를 찾을 수 없습니다.</p>
        <p className="text-sm text-gray-500 mb-6 text-center">목록에서 삭제되었거나 다른 기기에서만 저장된 경우일 수 있습니다.</p>
        <button
          type="button"
          onClick={() => navigate(`/trips/${tripId}/guide-archive`)}
          className="rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-sm font-bold px-6 py-3"
        >
          가이드 보관함으로
        </button>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(180deg, #E0F7FA 0%, #F8FAFC 55%, #F1F5F9 100%)' }}
    >
      <div className="mx-auto max-w-6xl px-4 pt-6 md:pt-8 flex flex-wrap gap-3 items-center">
        <button
          type="button"
          onClick={() => navigate(`/trips/${tripId}/guide-archive`)}
          className="text-sm text-teal-700 hover:text-teal-900 font-medium"
        >
          ← 가이드 보관함
        </button>
        <span className="text-gray-300">|</span>
        <button
          type="button"
          onClick={() => navigate(`/trips/${tripId}/search`)}
          className="text-sm text-gray-600 hover:text-gray-900 font-medium"
        >
          맞춤 준비 가이드
        </button>
      </div>
      <GuideSnapshotView entry={entry} />
    </div>
  )
}

export default function TripGuideArchiveDetailPage() {
  const { id, entryId } = useParams()
  const location = useLocation()
  return <TripGuideArchiveDetailInner key={`${id}-${entryId}-${location.key}`} tripId={id} entryId={entryId} />
}
