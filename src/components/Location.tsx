interface LocationProps {
  name: string
  address: string
  naverMapUrl: string
  kakaoMapUrl: string
}

export default function Location({
  name,
  address,
  naverMapUrl,
  kakaoMapUrl,
}: LocationProps) {
  // 지도 앱으로 이동할 수 있도록 외부 링크 버튼을 제공합니다.
  return (
    <>
      <p className="section-kicker">Location</p>
      <h2 className="section-title">오시는 길</h2>
      <div className="location-card">
        <p className="location-name">{name}</p>
        <p className="location-address">{address}</p>
      </div>
      <div className="button-row">
        <a className="outline-button" href={naverMapUrl} target="_blank" rel="noreferrer">
          네이버지도 보기
        </a>
        <a className="outline-button" href={kakaoMapUrl} target="_blank" rel="noreferrer">
          카카오맵 보기
        </a>
      </div>
    </>
  )
}
