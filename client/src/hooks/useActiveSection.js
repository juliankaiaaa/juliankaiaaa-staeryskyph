import { useEffect, useState } from 'react'

/* Tracks which section is currently in view */
export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0

      const probe = window.innerHeight * 0.35

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2

      let current = ids[0]

      for (const id of ids) {
        const el = document.getElementById(id)

        if (el && el.getBoundingClientRect().top <= probe) {
          current = id
        }
      }

      setActive(atBottom ? ids[ids.length - 1] : current)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}
