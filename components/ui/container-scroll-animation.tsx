"use client"
import React, { useRef } from "react"
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion"

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode
  children: React.ReactNode
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
  })
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1]
  }

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions())
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100])
  const perspective = useTransform(scrollYProgress, [0, 1], [1200, 1800])

  return (
    <div className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20" ref={containerRef}>
      <motion.div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective,
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </motion.div>
    </div>
  )
}

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  )
}

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  translate: MotionValue<number>
  children: React.ReactNode
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 12px 16px rgba(0, 0, 0, 0.1), 0 24px 32px rgba(0, 0, 0, 0.1)",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full rounded-[20px] bg-[#1a1a1a] p-1.5 border border-white/10"
    >
      <div className="relative h-full w-full rounded-[18px] bg-[#2a2a2a] p-[2px]">
        <div 
          className="relative h-full w-full rounded-[16px] overflow-hidden bg-gray-100 dark:bg-zinc-900"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 16px 24px rgba(0, 0, 0, 0.2)"
          }}
        >
          {/* Top Camera Bar */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-[8px] bg-black/20 dark:bg-white/20 rounded-full"></div>
          
          {/* Side Buttons */}
          <div className="absolute -right-[2px] top-[80px] w-[4px] h-[60px] bg-[#2a2a2a] rounded-l-lg border-l border-white/10"></div>
          <div className="absolute -right-[2px] top-[160px] w-[4px] h-[100px] bg-[#2a2a2a] rounded-l-lg border-l border-white/10"></div>
          
          {children}
        </div>
      </div>
    </motion.div>
  )
}
