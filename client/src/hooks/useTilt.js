import { useEffect, useRef } from 'react'

/* Tilts an element in 3D toward the cursor. Off for touch and reduced motion */
export default function useTilt(strength = 3) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover: hover)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onMove = (event) => {
      const box = el.getBoundingClientRect()
      const x = (event.clientX - box.left) / box.width - 0.5
      const y = (event.clientY - box.top) / box.height - 0.5
      el.style.setProperty('--tilt-x', `${(-y * strength).toFixed(2)}deg`)
      el.style.setProperty('--tilt-y', `${(x * strength).toFixed(2)}deg`)
      el.style.setProperty('--shine-x', `${((x + 0.5) * 100).toFixed(1)}%`)
    }

    const onLeave = () => {
      el.style.setProperty('--tilt-x', '0deg')
      el.style.setProperty('--tilt-y', '0deg')
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [strength])

  return ref
}
