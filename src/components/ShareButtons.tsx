import { useState } from 'react'

export default function ShareButtons() {
  const [copyMessage, setCopyMessage] = useState('')

  const handleCopyLink = async () => {
    if (!navigator.clipboard) {
      setCopyMessage('이 브라우저에서는 복사 기능을 지원하지 않습니다.')
      return
    }

    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopyMessage('링크가 복사되었습니다!')
    } catch {
      setCopyMessage('복사에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const handleKakaoShare = () => {
    // TODO: Kakao SDK를 연동해 실제 공유 기능을 연결하세요.
    setCopyMessage('카카오톡 공유 기능은 추후 연동 예정입니다.')
  }

  // 링크 복사와 카카오 공유 자리 UI를 제공합니다.
  return (
    <>
      <p className="section-kicker">Share</p>
      <h2 className="section-title">초대장 공유</h2>
      <div className="button-row">
        <button className="solid-button" type="button" onClick={handleCopyLink}>
          초대장 링크 복사하기
        </button>
        <button className="outline-button" type="button" onClick={handleKakaoShare}>
          카카오톡 공유하기
        </button>
      </div>
      {copyMessage ? <p className="feedback-message">{copyMessage}</p> : null}
    </>
  )
}
