import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { isFirebaseConfigured } from '../lib/firebase'
import { submitGuestbookMessage, subscribeGuestbookMessages } from '../services/invitationApi'

interface GuestbookMessage {
  id: number
  author: string
  text: string
}

interface GuestbookProps {
  messages: readonly GuestbookMessage[]
}

export default function Guestbook({ messages }: GuestbookProps) {
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [liveMessages, setLiveMessages] = useState<
    { id: string; author: string; text: string; createdAt: number }[]
  >([])

  useEffect(() => {
    if (!isFirebaseConfigured) {
      return
    }

    const unsubscribe = subscribeGuestbookMessages(
      (nextMessages) => setLiveMessages(nextMessages),
      () => setFeedbackMessage('메시지를 불러오는 중 문제가 발생했습니다.'),
    )

    return () => unsubscribe()
  }, [])

  const visibleMessages = useMemo(() => {
    if (liveMessages.length > 0) {
      return liveMessages
    }
    return messages.map((message) => ({
      id: String(message.id),
      author: message.author,
      text: message.text,
      createdAt: 0,
    }))
  }, [liveMessages, messages])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFeedbackMessage('')

    if (!isFirebaseConfigured) {
      setFeedbackMessage('Firebase 설정이 필요합니다. .env 파일을 확인해주세요.')
      return
    }

    try {
      setIsSubmitting(true)
      await submitGuestbookMessage({
        author: author.trim(),
        text: text.trim(),
      })
      setAuthor('')
      setText('')
      setFeedbackMessage('축하 메시지가 등록되었습니다!')
    } catch {
      setFeedbackMessage('메시지 등록에 실패했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Firestore 실시간 메시지와 작성 폼을 함께 제공합니다.
  return (
    <>
      <p className="section-kicker">Guestbook</p>
      <h2 className="section-title">축하 메시지</h2>
      <form className="guestbook-form" onSubmit={handleSubmit}>
        <label>
          이름
          <input
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="이름을 입력해주세요"
            required
          />
        </label>
        <label>
          축하 메시지
          <textarea
            rows={3}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="축하 메시지를 남겨주세요"
            required
          />
        </label>
        <button className="solid-button" type="submit" disabled={isSubmitting || !isFirebaseConfigured}>
          메시지 남기기
        </button>
      </form>
      {feedbackMessage ? <p className="feedback-message">{feedbackMessage}</p> : null}
      {!isFirebaseConfigured ? (
        <p className="helper-text">Firebase 환경변수를 설정하면 방명록 서버 저장이 활성화됩니다.</p>
      ) : null}
      <div className="guestbook-list">
        {visibleMessages.map((message) => (
          <article className="guestbook-card" key={message.id}>
            <p className="guestbook-text">{message.text}</p>
            <p className="guestbook-author">- {message.author}</p>
          </article>
        ))}
      </div>
    </>
  )
}
