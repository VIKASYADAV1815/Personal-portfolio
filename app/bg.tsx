"use client"

import { useEffect, useState } from "react"

export default function StarsBackgroundExample() {
  const [scrollY, setScrollY] = useState(0)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  )

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800
  const baseScale = windowWidth < 640 ? 1.5 : 3
  const maxScale = windowWidth < 640 ? 6 : 12
  const scrollScale = Math.max(baseScale + Math.min(scrollY, viewportHeight) / 100, 1)

  const text = "ꪜ𝒾𝒦ꪖ𝚜"

  return (
    <div className="h-screen overflow-hidden" style={{ backgroundColor: "#121315" }}>
      <div className="h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: "#121315" }}>
        
        <div className="relative z-5 flex items-center justify-center min-h-screen">
          <div
            className="font-sans font-bold select-none text-7xl sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              color: "#1E1F21",
              transform: `scale(${Math.min(scrollScale, maxScale)}) translateY(${scrollY * 0.1}px)`,
              transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              transformOrigin: "center center",
              maxWidth: "100vw",
              overflow: "hidden",
              padding: "2rem"
            }}
          >
            {text}
          </div>
        </div>
      </div>
    </div>
  )
}
