export type AttendanceStatus = '참석' | '불참' | '미정'

export interface RsvpFormValue {
  name: string
  attendance: AttendanceStatus
  companions: number
  message: string
}

export const invitationData = {
  celebrantName: 'Seungeon',
  cover: {
    title: '방승언의 생일파티',
    subtitle: '소중한 사람들과 함께하고 싶은 하루',
    dateText: '2026. 04. 30',
    scrollHint: '초대장을 열어주세요 ↓',
  },
  invitationMessage: [
    '어느덧 또 한 번의 생일을 맞이하게 되었습니다.',
    '늘 곁에서 함께해준 소중한 사람들과',
    '조용하고 따뜻한 시간을 보내고 싶어',
    '작은 생일파티를 준비했습니다.',
    '편한 마음으로 와서 함께 웃고 축하해주세요.',
  ],
  partyInfo: [
    { label: '날짜', value: '2026년 4월 30일' },
    { label: '시간', value: '오후 9시 45분 쉐키나 후' },
    { label: '장소', value: '광림교회 1층 로비' },
  ],
  location: {
    name: '광림교회 1층 로비',
    address: '서울 강남구 논현로175길 49',
    naverMapUrl:
      'https://map.naver.com/p/search/%EA%B4%91%EB%A6%BC%EA%B5%90%ED%9A%8C%201%EC%B8%B5%20%EB%A1%9C%EB%B9%84',
    kakaoMapUrl:
      'https://map.kakao.com/link/search/%EA%B4%91%EB%A6%BC%EA%B5%90%ED%9A%8C%201%EC%B8%B5%20%EB%A1%9C%EB%B9%84',
  },
  guestbookMessages: [
    {
      id: 1,
      author: '지드래곤',
      text: '승언아 생일 진심으로 축하해. 너만의 무드로 채운 오늘 밤, 제일 빛나는 순간들만 남기자.',
    },
    {
      id: 2,
      author: '제니',
      text: 'Happy Birthday! 따뜻하고 반짝이는 사람들 사이에서, 네가 좋아하는 웃음으로 가득한 밤이 되길 바라.',
    },
    {
      id: 3,
      author: '이재용 회장',
      text: '생일을 축하드립니다. 오늘의 작은 기쁨이 앞으로의 더 큰 행복과 좋은 결실로 이어지길 바랍니다.',
    },
  ],
  footer: {
    closingMessage: '와주시는 마음만으로도 충분히 감사합니다.',
    credit: 'Made with love for my birthday party',
  },
} as const
