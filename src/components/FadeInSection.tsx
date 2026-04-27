import type { ReactNode } from 'react'
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll'

interface FadeInSectionProps {
  id?: string
  className?: string
  children: ReactNode
}

export default function FadeInSection({ id, className, children }: FadeInSectionProps) {
  // 각 섹션이 화면에 들어오면 한 번만 부드럽게 노출됩니다.
  const { ref, isVisible } = useFadeInOnScroll<HTMLElement>()
  const mergedClassName = `${className ?? ''} fade-section ${isVisible ? 'is-visible' : ''}`.trim()

  return (
    <section id={id} ref={ref} className={mergedClassName}>
      {children}
    </section>
  )
}
