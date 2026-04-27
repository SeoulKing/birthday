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

const defaultGoogleSheetsWebhookUrl =
  'https://script.google.com/macros/s/AKfycbyPeMq4g7xoGWK1Z_8yTe3Pqn3xtY7YGQN5JkrHe8UVr6cTKOdhMv0hVzzb8AXv9AaE1g/exec'
const googleSheetsWebhookUrl =
  (import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || defaultGoogleSheetsWebhookUrl).trim()

export const isRsvpBackendConfigured = Boolean(db) || Boolean(googleSheetsWebhookUrl)

function getFirestoreOrThrow() {
  if (!db) {
    throw new Error('Firebase is not configured.')
  }
  return db
}

async function submitRsvpToGoogleSheets(payload: RsvpPayload) {
  if (!googleSheetsWebhookUrl) {
    return
  }

  const body = JSON.stringify({
    ...payload,
    submittedAt: new Date().toISOString(),
    source: typeof window !== 'undefined' ? window.location.href : 'unknown',
  })

  await fetch(googleSheetsWebhookUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body,
  })
}

export async function submitRsvp(payload: RsvpPayload) {
  if (!isRsvpBackendConfigured) {
    throw new Error('No RSVP backend is configured.')
  }

  const writeTasks: Promise<unknown>[] = []

  if (db) {
    writeTasks.push(
      addDoc(collection(db, 'rsvps'), {
        ...payload,
        createdAt: Date.now(),
      }),
    )
  }

  if (googleSheetsWebhookUrl) {
    writeTasks.push(submitRsvpToGoogleSheets(payload))
  }

  await Promise.all(writeTasks)
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
