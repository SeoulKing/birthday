interface FooterProps {
  closingMessage: string
  credit: string
}

export default function Footer({ closingMessage, credit }: FooterProps) {
  // 랜딩페이지 마무리 문구를 표시합니다.
  return (
    <footer className="invitation-footer">
      <p>{closingMessage}</p>
      <small>{credit}</small>
    </footer>
  )
}
