import { useEffect, useRef, useState } from 'react'

export function useFadeInOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const target = ref.current
    if (!target) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(target)

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}
