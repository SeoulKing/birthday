import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import type { AttendanceStatus, RsvpFormValue } from '../data/invitationData'

const RSVP_STORAGE_KEY = 'birthday-invitation-rsvp-responses'

const defaultFormValue: RsvpFormValue = {
  name: '',
  attendance: '참석',
  companions: 1,
  message: '',
}

export default function RSVPForm() {
  const [formValue, setFormValue] = useState<RsvpFormValue>(defaultFormValue)
  const [savedResponses, setSavedResponses] = useState<RsvpFormValue[]>([])
  const [feedbackMessage, setFeedbackMessage] = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(RSVP_STORAGE_KEY)
      if (!saved) {
        return
      }
      const parsed = JSON.parse(saved) as RsvpFormValue[]
      setSavedResponses(parsed)
    } catch {
      setSavedResponses([])
    }
  }, [])

  const persistRsvpResponse = async (response: RsvpFormValue) => {
    // TODO: Firebase 또는 Google Form 전송 로직으로 교체하세요.
    setSavedResponses((prev) => {
      const next = [...prev, response]
      localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await persistRsvpResponse(formValue)
    setFeedbackMessage('응답이 저장되었습니다. 감사합니다!')
    setFormValue(defaultFormValue)
  }

  // 서버 없이 동작하며 localStorage에 저장되어 새로고침 후에도 유지됩니다.
  return (
    <>
      <p className="section-kicker">RSVP</p>
      <h2 className="section-title">참석 여부 전달</h2>
      <form className="rsvp-form" onSubmit={handleSubmit}>
        <label>
          이름
          <input
            type="text"
            value={formValue.name}
            onChange={(event) => setFormValue({ ...formValue, name: event.target.value })}
            placeholder="이름을 입력해주세요"
            required
          />
        </label>

        <label>
          참석 여부
          <select
            value={formValue.attendance}
            onChange={(event) =>
              setFormValue({
                ...formValue,
                attendance: event.target.value as AttendanceStatus,
              })
            }
          >
            <option value="참석">참석</option>
            <option value="불참">불참</option>
            <option value="미정">미정</option>
          </select>
        </label>

        <label>
          동행 인원
          <input
            type="number"
            min={0}
            value={formValue.companions}
            onChange={(event) =>
              setFormValue({
                ...formValue,
                companions: Number(event.target.value),
              })
            }
          />
        </label>

        <label>
          남기고 싶은 말
          <textarea
            rows={4}
            value={formValue.message}
            onChange={(event) => setFormValue({ ...formValue, message: event.target.value })}
            placeholder="메시지를 남겨주세요"
          />
        </label>

        <button className="solid-button" type="submit">
          RSVP 제출하기
        </button>
      </form>
      {feedbackMessage ? <p className="feedback-message">{feedbackMessage}</p> : null}
      <p className="helper-text">현재 저장된 응답 수: {savedResponses.length}</p>
    </>
  )
}
