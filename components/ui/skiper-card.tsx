"use client"

import { useEffect, useState, type MouseEvent } from "react"
import Image, { type StaticImageData } from "next/image"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionStyle,
  type MotionValue,
} from "motion/react"
import Balancer from "react-wrap-balancer"
import { cn } from "@/lib/utils"

// 🎯 Motion wrapper style
type WrapperStyle = MotionStyle & {
  "--x": MotionValue<string>
  "--y": MotionValue<string>
}

interface CardProps {
  title: string
  description: string
  bgClass?: string
}

function FeatureCard({
  title,
  description,
  bgClass,
  children,
}: CardProps & { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isMobile = useIsMobile()

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (isMobile) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  useEffect(() => setMounted(true), [])

  return (
    <motion.div
      className="animated-cards relative w-full rounded-[16px]"
      onMouseMove={handleMouseMove}
      style={
        {
          "--x": useMotionTemplate`${mouseX}px`,
          "--y": useMotionTemplate`${mouseY}px`,
        } as WrapperStyle
      }
    >
      <div
        className={cn(
          "group relative w-full overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-b from-neutral-900/90 to-stone-800 transition duration-300 dark:from-neutral-950/90 dark:to-neutral-800/90",
          "md:hover:border-transparent",
          bgClass
        )}
      >
<div className="m-10 min-h-[550px] w-full">
          <div className="flex w-4/6 flex-col gap-3">
            {/* ✅ Title color green */}
            <h2 className="text-xl font-bold tracking-tight text-green-500 md:text-2xl">
              {title}
            </h2>
            <p className="text-sm leading-5 text-neutral-300 dark:text-zinc-400 sm:text-base sm:leading-5">
              <Balancer>{description}</Balancer>
            </p>
          </div>
          {mounted ? children : null}
        </div>
      </div>
    </motion.div>
  )
}

const steps = [
  { id: "1", name: "" },
  { id: "2", name: "" },
  { id: "3", name: "" },
  { id: "4", name: "" },
]
export function SkiperCard({
  image,
  step1img1Class,
  step1img2Class,
  step2img1Class,
  step2img2Class,
  step2img3Class,
  step3imgClass,
  step4new1Class,
  step4new2Class,
  ...props
}: Omit<CardProps, "title" | "description"> & {
  step1img1Class?: string
  step1img2Class?: string
  step2img1Class?: string
  step2img2Class?: string
  step2img3Class?: string
  step3imgClass?: string
  step4new1Class?: string
  step4new2Class?: string
  image: {
    step1light1: StaticImageData
    step1light2: StaticImageData
    step2light1: StaticImageData
    step2light2: StaticImageData
    step2light3: StaticImageData
    step3light: StaticImageData
    step4new1: StaticImageData // New image for page 4
    step4new2: StaticImageData // New image for page 4
    alt: string
  }
}) {
  const { currentNumber: step, increment } = useNumberCycler()

  // 🔹 Dynamic title & description for 4 steps
  const stepData = [
    { title: "Graduation", description: "I graduated with  BCA from Graphic Era Deemed to be University in Dehradun and am currently pursuing MCA (OL)" },
    { title: "Hoobies", description: "I am passionate about exploring nature, engaging in fitness activities, and participating in various sports." },
    { title: "Profession", description: "I choose web development as my career path because it allows me to combine my passion for technology with my creativity, crafting engaging user experiences that make a difference." },
    { title: "What’s Next?", description: "As a UI/UX designer, I’m diving deeper into human-centered design, crafting seamless experiences that merge aesthetics with accessibility—while sharpening my front-end skills to bring every pixel-perfect vision to life." }
  ]

  return (
    <FeatureCard
      title={stepData[step]?.title}
      description={stepData[step]?.description}
      {...props}
    >
      {/* Step 1 */}
      <Image
        alt={image.alt}
        className={cn(step1img1Class, { "-translate-x-36 opacity-0 rounded-2xl": step > 0 })}
        src={image.step1light1}
        style={{ position: "absolute", userSelect: "none", maxWidth: "unset" }}
      />
      <Image
        alt={image.alt}
        className={cn(step1img2Class, { "-translate-x-24 opacity-0 rounded-2xl": step > 0 })}
        src={image.step1light2}
        style={{ position: "absolute", userSelect: "none", maxWidth: "unset" }}
      />

      {/* Step 2 */}
      {step === 1 && (
      <>
  <Image
    alt={image.alt}
    src={image.step2light1}
    className="absolute left-[5%] top-[30%] w-[90%] h-[30%] md:w-[50%] md:h-[45%] sm:w-[70%] sm:h-[50%] rounded-2xl border border-stone-100/10 dark:border-stone-700 object-cover pointer-events-none transition-all duration-500 shadow-[0_10px_15px_rgba(0,0,0,0.4),0_20px_25px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_15px_rgba(0,0,0,0.6),0_20px_25px_rgba(0,0,0,0.3)]"
    style={{ userSelect: "none" }}
  />
  <Image
    alt={image.alt}
    src={image.step2light2}
    className="absolute right-[3%] top-[10%] w-[28%] h-[28%] md:w-[25%] md:h-[50%] sm:w-[33%] sm:h-[25%] rounded-2xl border border-stone-100/10 dark:border-stone-700 object-cover pointer-events-none transition-all duration-500 shadow-[0_10px_15px_rgba(0,0,0,0.4),0_20px_25px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_15px_rgba(0,0,0,0.6),0_20px_25px_rgba(0,0,0,0.3)]"
    style={{ userSelect: "none" }}
  />
  {/* <Image
    alt={image.alt}
    src={image.step2light3}
    className="absolute right-[15%] top-[47%] w-[28%] h-[28%] md:w-[25%] md:h-[45%] sm:w-[40%] sm:h-[30%] rounded-2xl border border-stone-100/10 dark:border-stone-700 object-cover pointer-events-none transition-all duration-500 shadow-[0_10px_15px_rgba(0,0,0,0.4),0_20px_25px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_15px_rgba(0,0,0,0.6),0_20px_25px_rgba(0,0,0,0.3)]"
    style={{ userSelect: "none" }}
  /> */}
</>

      )}

      {/* Step 3 */}
      <Image
        alt={image.alt}
        className={cn(
          step3imgClass,
          "rounded-2xl",
          { "translate-x-36 opacity-0": step < 2 },
          { "-translate-x-36 opacity-0": step > 2 },
          { "opacity-90": step === 2 }
        )}
        src={image.step3light}
        style={{ position: "absolute", userSelect: "none", maxWidth: "unset" }}
      />

      {/* Step 4 - Only new images */}
      {step === 3 && (
        <>
          <Image
            alt={image.alt}
            className={cn(step4new1Class, "rounded-2xl")}
            src={image.step4new1}
            style={{ position: "absolute", userSelect: "none", maxWidth: "unset" }}
          />
          {/* <Image
            alt={image.alt}
            className={cn(step4new2Class, "rounded-2xl")}
            src={image.step4new2}
            style={{ position: "absolute", userSelect: "none", maxWidth: "unset" }}
          /> */}
        </>
      )}

      {/* Steps UI */}
      <div className="absolute left-48 top-5 z-50 size-full cursor-pointer md:left-0">
        <Steps current={step} onChange={() => {}} steps={steps} />
      </div>

      {/* Click area for next */}
      <div
        className="absolute right-0 top-0 z-50 size-full cursor-pointer md:left-0"
        onClick={() => increment()}
      />
    </FeatureCard>
  )
}


function IconCheck({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className={cn("size-4", className)} {...props}>
      <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  )
}

interface StepsProps {
  steps: { id: string; name: string }[]
  current: number
  onChange: (stepIdx: number) => void
}

export function Steps({ steps, current, onChange }: StepsProps) {
  return (
    <nav aria-label="Progress" className="flex justify-center px-4 ">
      <ol className="flex w-full flex-wrap items-start justify-start gap-2 sm:justify-center md:w-10/12 md:divide-y-0" role="list">
        {steps.map((step, stepIdx) => {
          const isCompleted = current > stepIdx
          const isCurrent = current === stepIdx
          const isFuture = !isCompleted && !isCurrent
          return (
            <li
              className={cn(
                "relative z-50 rounded-full px-3 py-1 transition-all duration-300 ease-in-out md:flex",
                isCompleted ? "bg-neutral-500/20" : "bg-neutral-500/10"
              )}
              key={`${step.name}-${stepIdx}`}
            >
              <div
                className={cn(
                  "group flex w-full cursor-pointer items-center focus:outline-none focus-visible:ring-2",
                  (isFuture || isCurrent) && "pointer-events-none"
                )}
                onClick={() => onChange(stepIdx)}
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  <span
                    className={cn(
                      "flex shrink-0 items-center justify-center rounded-full duration-300",
                      isCompleted && "bg-brand-400 dark:bg-brand-400 size-4 text-white",
                      isCurrent && "bg-brand-300/80 size-4 p-2 text-neutral-400 dark:bg-neutral-500/50",
                      isFuture && "bg-brand-300/10 size-4 p-2 dark:bg-neutral-500/20"
                    )}
                  >
                    {isCompleted ? (
                      <IconCheck className="size-3 stroke-white stroke-[3] text-white dark:stroke-black" />
                    ) : (
                      <span className={cn("text-xs", !isCurrent && "text-[#C6EA7E]")}>{stepIdx + 1}</span>
                    )}
                  </span>
                </span>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function useNumberCycler() {
  const [currentNumber, setCurrentNumber] = useState(0)
  const [dummy, setDummy] = useState(0)

  const increment = () => {
    setCurrentNumber((prevNumber) => (prevNumber + 1) % 4)
    setDummy((prev) => prev + 1)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentNumber((prevNumber) => (prevNumber + 1) % 4)
    }, 3000)
    return () => clearInterval(intervalId)
  }, [dummy])

  return { increment, currentNumber }
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent
    const isSmall = window.matchMedia("(max-width: 768px)").matches
    const isMobileDevice = Boolean(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.exec(userAgent)
    )
    const isDev = process.env.NODE_ENV !== "production"
    if (isDev) setIsMobile(isSmall || isMobileDevice)
    setIsMobile(isSmall && isMobileDevice)
  }, [])

  return isMobile
}
