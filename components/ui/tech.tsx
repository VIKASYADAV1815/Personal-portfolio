"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState, useRef } from "react"
import { motion, useAnimation, useMotionValue, useTransform } from "motion/react"

export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  { defaultValue = false, initializeWithValue = true }: UseMediaQueryOptions = {},
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

const keywords = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-plain-wordmark.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg",
]

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

const Carousel = memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
  }: {
    handleClick: (imgUrl: string, index: number) => void
    controls: any
    cards: string[]
    isCarouselActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const isExtraSmall = useMediaQuery("(max-width: 375px)")

    const cylinderWidth = isExtraSmall ? 400 : isScreenSizeSm ? 600 : 800
    const iconWidth = isExtraSmall ? 90 : isScreenSizeSm ? 85 : 50

    const faceCount = cards.length
    const faceWidth = (cylinderWidth / faceCount) + 10
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(rotation, (value) => `rotate3d(0, 1, 0, ${value}deg)`)

    const [isDragging, setIsDragging] = useState(false)
    const autoRotationRef = useRef<NodeJS.Timeout>()

    useEffect(() => {
      if (!isCarouselActive || isDragging) {
        if (autoRotationRef.current) {
          clearInterval(autoRotationRef.current)
        }
        return
      }

      autoRotationRef.current = setInterval(() => {
        rotation.set(rotation.get() + 0.5)
      }, 16)

      return () => {
        if (autoRotationRef.current) {
          clearInterval(autoRotationRef.current)
        }
      }
    }, [isCarouselActive, isDragging, rotation])

    return (
      <div
        className="flex h-full items-center justify-center relative"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
          marginTop: isExtraSmall ? "-20px" : isScreenSizeSm ? "-10px" : "-30px",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-[44px] origin-center cursor-grab pb-2 justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDragStart={() => setIsDragging(true)}
          onDrag={(_, info) => {
            if (isCarouselActive) {
              rotation.set(rotation.get() + info.offset.x * 0.05)
            }
          }}
          onDragEnd={(_, info) => {
            setIsDragging(false)
            if (isCarouselActive) {
              controls.start({
                rotateY: rotation.get() + info.velocity.x * 0.05,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 30,
                  mass: 0.1,
                },
              })
            }
          }}
          animate={controls}
        >
          {cards.map((imgUrl, i) => (
            <motion.div
              key={`key-${imgUrl}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
              }}
            >
              <div className="relative" style={{ width: `${iconWidth}px`, isolation: "isolate" }}>
                <motion.img
                  src={imgUrl}
                  alt={`Tech stack icon ${i}`}
                  layoutId={`img-${imgUrl}`}
                  className="pointer-events-none w-full object-contain aspect-square p-1 relative z-10"
                  initial={{ opacity: 0.8 }}
                  layout="position"
                  animate={{
                    opacity: 1,
                  }}
                  whileHover={{
                    scale: 1.1,
                  }}
                  transition={transition}
                  style={{
                    filter: !isScreenSizeSm && !isExtraSmall ? 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5))' : 'none',
                    transform: "translateZ(20px)",
                    backfaceVisibility: "hidden",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  },
)

function ThreeDPhotoCarousel() {
  const [activeImg, setActiveImg] = useState<string | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()
  const cards = keywords

  useEffect(() => {
    console.log("Cards loaded:", cards)
  }, [cards])

  return (
    <motion.div layout className="relative">
      <div className="relative h-[200px] w-full overflow-hidden">
        <Carousel handleClick={() => {}} controls={controls} cards={cards} isCarouselActive={isCarouselActive} />
      </div>
    </motion.div>
  )
}

export default ThreeDPhotoCarousel

// Replace CDN icons with local SVGs or optimized imports
const techIcons = {
  mongodb: '/assets/mongodb.svg',
  react: '/assets/react.svg',
  // ... other local assets
};

// Or use tree-shakable imports
import { SiMongodb, SiReact } from 'react-icons/si';
