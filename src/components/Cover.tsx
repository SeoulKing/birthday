interface CoverProps {
  title: string
  subtitle: string
  dateText: string
  scrollHint: string
}

export default function Cover({
  title,
  subtitle,
  dateText,
  scrollHint,
}: CoverProps) {
  // 초대장 첫 화면의 핵심 텍스트 정보를 렌더링합니다.
  return (
    <header className="cover-section">
      <div className="cover-content">
        <p className="cover-date">{dateText}</p>
        <h1 className="cover-title">{title}</h1>
        <p className="cover-subtitle">{subtitle}</p>
      </div>
      <p className="scroll-hint">{scrollHint}</p>
    </header>
  )
}
