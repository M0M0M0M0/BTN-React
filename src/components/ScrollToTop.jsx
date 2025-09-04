import { useLayoutEffect, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()
  const previousPathRef = useRef(null)
  const navigationHistoryRef = useRef([])

  useLayoutEffect(() => {
    // Get scroll position for current path
    const savedScrollPosition = sessionStorage.getItem(`scroll_${pathname}`)
    const previousPath = previousPathRef.current
    
    console.log('ScrollToTop: pathname changed to', pathname)
    console.log('Previous path:', previousPath)
    console.log('Saved scroll position for current path:', savedScrollPosition)
    console.log('Navigation history:', navigationHistoryRef.current)

    // Check if this is a back navigation (browser back/forward button)
    const isBackNavigation = previousPath && 
                           navigationHistoryRef.current.includes(pathname) &&
                           navigationHistoryRef.current.indexOf(pathname) < navigationHistoryRef.current.indexOf(previousPath)

    if (isBackNavigation && savedScrollPosition) {
      // Back navigation - restore scroll position
      console.log('ScrollToTop: back navigation, restoring scroll position to', savedScrollPosition)
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedScrollPosition),
          left: 0,
          behavior: 'instant'
        })
      }, 50)
    } else {
      // New navigation (even to previously visited page) - scroll to top
      console.log('ScrollToTop: new navigation, scrolling to top')
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      })
    }

    // Update navigation history
    if (!navigationHistoryRef.current.includes(pathname)) {
      navigationHistoryRef.current.push(pathname)
      // Keep only last 10 visited pages
      if (navigationHistoryRef.current.length > 10) {
        navigationHistoryRef.current.shift()
      }
    }

    // Save current pathname for next navigation
    previousPathRef.current = pathname
  }, [pathname])

  // Save scroll position when scrolling
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(`scroll_${pathname}`, window.scrollY.toString())
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  return null
}
