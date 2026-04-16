/**
 * Step3/4 데스크톱: 화면 전체 너비 기준 왼쪽 끝→중앙까지 민트가 옅어지고
 * 이미지(또는 글로브)가 점점 선명해지는 풀블리드 레이어.
 */
const MINT = '224, 247, 250'
const MINT_SOFT = '240, 253, 250'

const mintWashFullBleed = {
  background: `linear-gradient(to right,
    rgba(240, 253, 250, 0.98) 0%,
    rgba(${MINT}, 0.88) 18%,
    rgba(${MINT}, 0.55) 36%,
    rgba(${MINT}, 0.22) 46%,
    rgba(${MINT_SOFT}, 0.06) 52%,
    transparent 58%
  )`,
}

const mintVeilSoft = {
  background: `linear-gradient(to right,
    rgba(${MINT}, 0.35) 0%,
    rgba(${MINT}, 0.12) 44%,
    transparent 58%
  )`,
}

const SHARP_MASK =
  'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.08) 28%, rgba(0,0,0,0.45) 44%, rgba(0,0,0,0.88) 54%, #000 62%, #000 100%)'

const mintBackdropVeil = {
  background: `linear-gradient(to right,
    rgba(${MINT}, 0.62) 0%,
    rgba(${MINT}, 0.28) 38%,
    rgba(${MINT_SOFT}, 0.08) 52%,
    transparent 62%
  )`,
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
}

const mintGlobeSoftEdge = {
  background: `linear-gradient(to right,
    rgba(${MINT}, 0.5) 0%,
    rgba(${MINT_SOFT}, 0.15) 48%,
    transparent 60%
  )`,
}

export function FullBleedMintImageHero({ src, alt }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#E0F7FA]">
      <img
        src={src}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-95 blur-[38px]"
        loading="eager"
      />
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        style={{
          maskImage: SHARP_MASK,
          WebkitMaskImage: SHARP_MASK,
        }}
      />
      <div className="absolute inset-0" style={mintVeilSoft} />
      <div className="absolute inset-0" style={mintWashFullBleed} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-transparent to-black/52" />
    </div>
  )
}

export function FullBleedMintGlobeHero({ backgroundStyle, globe }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={
          backgroundStyle ?? {
            background: 'linear-gradient(155deg, #c5ebe8 0%, #e8faf7 50%, #d4f2ee 100%)',
          }
        }
      />
      <div className="absolute inset-0">{globe}</div>
      <div
        className="absolute inset-y-0 left-0 w-[72%] max-w-[min(72vw,720px)]"
        style={mintBackdropVeil}
      />
      <div className="absolute inset-0" style={mintGlobeSoftEdge} />
      <div className="absolute inset-0" style={mintWashFullBleed} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/38" />
    </div>
  )
}
