import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Inertia scrolling for the whole page. Skipped entirely when the visitor
 * prefers reduced motion, and anchor links keep working through Lenis.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.1 })
    return () => lenis.destroy()
  }, [])
}

/** Tracks which section currently sits in the middle of the viewport. */
export function observeSections(ids: readonly string[], onChange: (id: string) => void) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) if (entry.isIntersecting) onChange(entry.target.id)
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  ids.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
  return () => observer.disconnect()
}
