import { useEffect } from 'react'

/* Elements that fade in on scroll and reset when they leave the viewport */
const TARGETS = [
  'main :is(h1, h2, h3, p, .section-label, .page-kicker, .btn, .card, .step, .service-card, .polaroid, .services-carousel)',
  '.site-footer > div',
].join(', ')

const SKIP = '.hero, .request-stage, .receipt, .cta-inner, nav, .services-carousel .service-card'
const STEP = 90
const MAX_STAGGER = 5

export default function useScrollReveal(key) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) return

    const items = [...new Set(document.querySelectorAll(TARGETS))].filter(
      (el) => !el.closest(SKIP) && !(el.parentElement && el.parentElement.closest('.reveal-item'))
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target: el, isIntersecting }) => {
          if (isIntersecting) {
            el.style.setProperty('--reveal-delay', el.dataset.revealDelay)
            el.classList.add('is-revealed')
          } else {
            el.style.setProperty('--reveal-delay', '0ms')
            el.classList.remove('is-revealed')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )

    const counts = new Map()
    items.forEach((el) => {
      const parent = el.parentElement
      const index = counts.get(parent) ?? 0
      counts.set(parent, index + 1)
      el.dataset.revealDelay = `${Math.min(index, MAX_STAGGER) * STEP}ms`
      el.classList.add('reveal-item')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [key])
}
