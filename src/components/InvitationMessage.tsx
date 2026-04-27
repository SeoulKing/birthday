interface InvitationMessageProps {
  lines: readonly string[]
}

export default function InvitationMessage({ lines }: InvitationMessageProps) {
  // 여러 줄 초대 문구를 줄바꿈 유지 형태로 보여줍니다.
  return (
    <>
      <p className="section-kicker">Invitation</p>
      <h2 className="section-title">초대합니다</h2>
      <p className="invitation-message">{lines.join('\n')}</p>
    </>
  )
}
