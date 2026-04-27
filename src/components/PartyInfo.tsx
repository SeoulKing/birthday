interface PartyInfoItem {
  label: string
  value: string
}

interface PartyInfoProps {
  items: readonly PartyInfoItem[]
}

export default function PartyInfo({ items }: PartyInfoProps) {
  // 날짜/시간/장소 등 핵심 정보를 카드 목록으로 표시합니다.
  return (
    <>
      <p className="section-kicker">Party Info</p>
      <h2 className="section-title">파티 안내</h2>
      <div className="info-grid">
        {items.map((item) => (
          <article className="info-card" key={item.label}>
            <p className="info-label">{item.label}</p>
            <p className="info-value">{item.value}</p>
          </article>
        ))}
      </div>
    </>
  )
}
