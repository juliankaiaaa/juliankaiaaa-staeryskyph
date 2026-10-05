import { useLayoutEffect } from 'react'

/*
  Counts how many scallops fit along each side of an element and sets
  --cols and --rows, so the scalloped border always ends on a full bump.
  sizeVar is the CSS variable that holds the target scallop size.
*/
export default function useScallopFit(ref, sizeVar) {
  useLayoutEffect(() => {
    const el = ref.current

    if (!el) return

    const measure = (value) => {
      const probe = document.createElement('div')
      probe.style.cssText = `position:absolute;visibility:hidden;width:${value}`
      el.appendChild(probe)

      const px = probe.getBoundingClientRect().width

      probe.remove()

      return px
    }

    const fit = () => {
      const style = getComputedStyle(el)
      const size = measure(style.getPropertyValue(sizeVar).trim())

      if (!size) return

      const width =
        el.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight)

      const height =
        el.clientHeight -
        parseFloat(style.paddingTop) -
        parseFloat(style.paddingBottom)

      el.style.setProperty('--cols', Math.max(2, Math.round(width / size)))
      el.style.setProperty('--rows', Math.max(2, Math.round(height / size)))
    }

    fit()

    const observer = new ResizeObserver(fit)
    observer.observe(el)

    return () => observer.disconnect()
  }, [ref, sizeVar])
}
