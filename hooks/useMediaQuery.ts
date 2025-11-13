import { useState, useEffect } from 'react'

// Custom hook for handling media queries
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    // Update matches state initially
    setMatches(media.matches)

    // Create listener function
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    // Add listener for media query changes
    media.addEventListener('change', listener)

    // Cleanup listener on unmount
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}

export default useMediaQuery
