import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  type Unsubscribe,
} from 'firebase/firestore'
import type { AttendanceStatus } from '../data/invitationData'
import { db } from '../lib/firebase'

export interface RsvpPayload {
  name: string
  attendance: AttendanceStatus
  companions: number
  message: string
}

export interface GuestbookPayload {
  author: string
  text: string
}

export interface GuestbookEntry {
  id: string
  author: string
  text: string
  createdAt: number
}

function getFirestoreOrThrow() {
  if (!db) {
    throw new Error('Firebase is not configured.')
  }
  return db
}

export async function submitRsvp(payload: RsvpPayload) {
  const firestore = getFirestoreOrThrow()
  await addDoc(collection(firestore, 'rsvps'), {
    ...payload,
    createdAt: Date.now(),
  })
}

export async function submitGuestbookMessage(payload: GuestbookPayload) {
  const firestore = getFirestoreOrThrow()
  await addDoc(collection(firestore, 'guestbookMessages'), {
    ...payload,
    createdAt: Date.now(),
  })
}

export function subscribeGuestbookMessages(
  onChange: (entries: GuestbookEntry[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  const firestore = getFirestoreOrThrow()
  const q = query(collection(firestore, 'guestbookMessages'), orderBy('createdAt', 'desc'))

  return onSnapshot(
    q,
    (snapshot) => {
      const nextEntries = snapshot.docs.map((doc) => {
        const data = doc.data() as { author?: string; text?: string; createdAt?: number }
        return {
          id: doc.id,
          author: data.author ?? '익명',
          text: data.text ?? '',
          createdAt: data.createdAt ?? 0,
        }
      })
      onChange(nextEntries)
    },
    (error) => onError(error as Error),
  )
}
