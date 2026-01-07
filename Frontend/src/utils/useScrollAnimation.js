import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook for scroll-triggered animations
 * Uses IntersectionObserver to detect when elements enter viewport
 */
export function useScrollAnimation(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          // Optionally unobserve after first trigger
          if (options.once !== false) {
            observer.unobserve(element)
          }
        } else if (options.once === false) {
          setIsInView(false)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px'
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [options.once, options.threshold, options.rootMargin])

  return [ref, isInView]
}

/**
 * Hook for staggered children animations
 */
export function useStaggerAnimation(itemCount, baseDelay = 100) {
  const [ref, isInView] = useScrollAnimation()
  
  const getDelay = (index) => ({
    animationDelay: `${index * baseDelay}ms`,
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateY(0)' : 'translateY(30px)',
    transition: `all 0.6s ease-out ${index * baseDelay}ms`
  })

  return [ref, isInView, getDelay]
}

export default useScrollAnimation
