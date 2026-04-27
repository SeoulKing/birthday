interface GuestbookMessage {
  id: number
  author: string
  text: string
}

interface GuestbookProps {
  messages: readonly GuestbookMessage[]
}

export default function Guestbook({ messages }: GuestbookProps) {
  // 예시 방명록 데이터를 카드 형태로 보여줍니다.
  return (
    <>
      <p className="section-kicker">Guestbook</p>
      <h2 className="section-title">축하 메시지</h2>
      <div className="guestbook-list">
        {messages.map((message) => (
          <article className="guestbook-card" key={message.id}>
            <p className="guestbook-text">{message.text}</p>
            <p className="guestbook-author">- {message.author}</p>
          </article>
        ))}
      </div>
    </>
  )
}
