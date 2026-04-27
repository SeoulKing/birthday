import { useState } from 'react'
import type { FormEvent } from 'react'
import type { AttendanceStatus, RsvpFormValue } from '../data/invitationData'
import { isRsvpBackendConfigured, submitRsvp } from '../services/invitationApi'

const defaultFormValue: RsvpFormValue = {
  name: '',
  attendance: '참석',
  companions: 1,
  message: '',
}

export default function RSVPForm() {
  const [formValue, setFormValue] = useState<RsvpFormValue>(defaultFormValue)
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFeedbackMessage('')

    if (!isRsvpBackendConfigured) {
      setFeedbackMessage('RSVP 저장 설정이 필요합니다. Firebase 또는 Google Sheets 웹훅을 확인해주세요.')
      return
    }

    try {
      setIsSubmitting(true)
      await submitRsvp(formValue)
      setFeedbackMessage('응답이 저장되었습니다. 감사합니다!')
      setFormValue(defaultFormValue)
    } catch {
      setFeedbackMessage('저장에 실패했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // RSVP 응답을 Firebase와 Google Sheets(웹훅)로 저장합니다.
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

        <button className="solid-button" type="submit" disabled={isSubmitting || !isRsvpBackendConfigured}>
          RSVP 제출하기
        </button>
      </form>
      {feedbackMessage ? <p className="feedback-message">{feedbackMessage}</p> : null}
      {!isRsvpBackendConfigured ? (
        <p className="helper-text">Firebase 또는 Google Sheets 웹훅을 설정하면 실제 서버 저장이 활성화됩니다.</p>
      ) : null}
    </>
  )
}
