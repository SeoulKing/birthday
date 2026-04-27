import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

const defaultFirebaseConfig = {
  apiKey: 'AIzaSyCsMcLLOaHQ-E2kJNHbFti0ewqvteHnAOc',
  authDomain: 'birthday-f4918.firebaseapp.com',
  projectId: 'birthday-f4918',
  storageBucket: 'birthday-f4918.firebasestorage.app',
  messagingSenderId: '618216958500',
  appId: '1:618216958500:web:65675660a194c1fed346b1',
  measurementId: 'G-10V05N2ZZT',
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || defaultFirebaseConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || defaultFirebaseConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || defaultFirebaseConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || defaultFirebaseConfig.storageBucket,
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || defaultFirebaseConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || defaultFirebaseConfig.appId,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || defaultFirebaseConfig.measurementId,
}

const requiredKeys = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.appId,
]

export const isFirebaseConfigured = requiredKeys.every((value) => Boolean(value))

const app = isFirebaseConfigured
  ? getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)
  : null

export const db = app ? getFirestore(app) : null
export let analytics: Analytics | null = null

if (app && typeof window !== 'undefined' && firebaseConfig.measurementId) {
  // 브라우저 환경에서만 Analytics를 안전하게 초기화합니다.
  void isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app)
    }
  })
}
