"use client"
import { cn } from "@/lib/utils"
import { type ComponentPropsWithoutRef, type ReactNode, useState, useEffect } from "react"

export interface ArcTimelineItem {
  time: ReactNode
  steps: Array<{
    icon: ReactNode
    content: ReactNode
  }>
}
interface ArcTimelineProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string
  /**
   * Optional CSS class name for time labels
   */
  timeLabelClassName?: string
  /**
   * The data of the arc timeline
   */
  data: ArcTimelineItem[]
  /**
   * The configuration of the arc timeline
   */
  arcConfig?: {
    /**
     * The width of the circle, default is 5000
     */
    circleWidth?: number
    /**
     * The angle between minor steps, default is 0.35
     */
    angleBetweenMinorSteps?: number
    /**
     * The number of lines to fill between steps, default is 10
     */
    lineCountFillBetweenSteps?: number
    /**
     * The number of lines to fill in before the first step and after the last step
     */
    boundaryPlaceholderLinesCount?: number
  }
  /**
   * The default active step
   */
  defaultActiveStep?: {
    /**
     * The time of the default active step
     */
    time?: string
    /**
     * The index of the default active step
     */
    stepIndex?: number
  }
}

export function ArcTimeline(props: ArcTimelineProps) {
  const { className, children, data, arcConfig = {}, defaultActiveStep = {}, ...restProps } = props

  const {
    circleWidth = 2000,
    angleBetweenMinorSteps = 0.15,
    lineCountFillBetweenSteps = 10,
    boundaryPlaceholderLinesCount = 50,
  } = arcConfig

  const {
    time: defaultActiveTime = data?.length > 0 ? data[0].time : undefined,
    stepIndex: defaultActiveStepIndex = 0,
  } = defaultActiveStep || {}

  const [circleContainerRotateDeg, setCircleContainerRotateDeg] = useState(() => {
    if (!data || data.length === 0) {
      return 0
    }

    let count = 0
    for (const timelineItem of data) {
      if (timelineItem.time === defaultActiveTime) {
        count += defaultActiveStepIndex
        break
      } else {
        count += timelineItem.steps.length
      }
    }
    return (
      -1 * count * angleBetweenMinorSteps * (lineCountFillBetweenSteps + 1) -
      angleBetweenMinorSteps * boundaryPlaceholderLinesCount
    )
  })

  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const [currentAutoStepIndex, setCurrentAutoStepIndex] = useState(0)

  useEffect(() => {
    if (!data || data.length === 0 || hasUserInteracted) return

    const timer = setInterval(() => {
      const totalSteps = data.reduce((acc, item) => acc + item.steps.length, 0)

      const nextStepIndex = (currentAutoStepIndex + 1) % totalSteps
      setCurrentAutoStepIndex(nextStepIndex)

      const nextAngle =
        -1 *
        (angleBetweenMinorSteps * (lineCountFillBetweenSteps + 1) * nextStepIndex +
          angleBetweenMinorSteps * boundaryPlaceholderLinesCount)

      setCircleContainerRotateDeg(nextAngle)
    }, 2000)

    return () => clearInterval(timer)
  }, [
    currentAutoStepIndex,
    data,
    angleBetweenMinorSteps,
    lineCountFillBetweenSteps,
    boundaryPlaceholderLinesCount,
    hasUserInteracted,
  ])

  if (!data || data.length === 0) {
    return (
      <div
        {...restProps}
        className={cn(
          "relative h-[280px] sm:h-[380px] w-full overflow-hidden flex items-center justify-center bg-[#161616]",
          className,
        )}
      >
        <p className="text-muted-foreground">No timeline data available</p>
      </div>
    )
  }

  return (
    <div
      {...restProps}
      className={cn("relative h-[280px] sm:h-[380px] w-full overflow-hidden bg-[#161616]", className)}
    >
      <div
        style={{
          transform: `translateX(-50%) rotate(${circleContainerRotateDeg}deg)`,
          width: `${circleWidth}px`,
        }}
        className="absolute left-1/2 top-52 sm:top-40 aspect-square origin-center rounded-full transition-all duration-500 ease-in-out"
      >
        {data.map((line, lineIndex) => {
          return (
            <div key={`${lineIndex}`}>
              {line.steps.map((step, stepIndex) => {
                const angle =
                  angleBetweenMinorSteps *
                    (lineCountFillBetweenSteps + 1) *
                    (data
                      .slice(0, lineIndex)
                      .map((item) => item.steps.length)
                      .reduce((prev, current) => prev + current, 0) +
                      stepIndex) +
                  angleBetweenMinorSteps * boundaryPlaceholderLinesCount
                const isLastStep = lineIndex === data.length - 1 && stepIndex === line.steps.length - 1
                const isFirstStep = lineIndex === 0 && stepIndex === 0
                const isActive = Math.abs(angle + circleContainerRotateDeg) < 0.01
                return (
                  <div key={`${lineIndex}-${stepIndex}`}>
                    {isFirstStep && (
                      <PlaceholderLines
                        isFirstStep={true}
                        isLastStep={false}
                        angle={angle}
                        angleBetweenMinorSteps={angleBetweenMinorSteps}
                        lineCountFillBetweenSteps={lineCountFillBetweenSteps}
                        boundaryPlaceholderLinesCount={boundaryPlaceholderLinesCount}
                        lineIndex={lineIndex}
                        stepIndex={stepIndex}
                        circleWidth={circleWidth}
                        circleContainerRotateDeg={circleContainerRotateDeg}
                      />
                    )}
                    <div
                      className={cn(
                        "absolute left-1/2 top-0 -translate-x-1/2 cursor-pointer transition-all duration-200",
                        isActive ? "h-[80px] sm:h-[60px] w-[2px]" : "h-12 sm:h-12 w-[1.5px]",////////////////////hereeee is the line that changes size 
                      )}
                      style={{
                        transformOrigin: `50% ${circleWidth / 2}px`,
                        transform: `rotate(${angle}deg)`,
                      }}
                      onClick={() => {
                        setHasUserInteracted(true)
                        setCircleContainerRotateDeg(-1 * angle)
                      }}
                    >
                      <div
                        className={cn(
                          "h-full w-full transition-colors duration-200",
                          isActive ? "bg-[#DDFF00]" : "bg-gray-600",
                        )}
                        style={{
                          transformOrigin: "center top",
                          transform: `rotate(${-1 * angle - circleContainerRotateDeg}deg)`,
                        }}
                      >
                        <div
                          className={cn(
                            "absolute bottom-0 left-1/2 aspect-square -translate-x-1/2",
                            isActive
                              ? "translate-y-[calc(100%_+_8px)] sm:translate-y-[calc(100%_+_14px)] scale-[1.2] text-[#DDFF00]"
                              : "translate-y-[calc(100%_+_4px)] scale-100 text-gray-400",
                          )}
                        >
                          {step.icon}
                        </div>
                        <p
                          className={cn(
                            "absolute bottom-0 left-1/2 line-clamp-3 flex w-[160px] sm:w-[200px] -translate-x-1/2 items-center justify-center text-center text-sm sm:text-base transition-all duration-500 ease-in-out transform",
                            "text-[#6953B6]",
                            line.time
                              ? "translate-y-[calc(-100%-80px)] sm:translate-y-[calc(-100%-95px)]"
                              : "translate-y-[calc(-100%-50px)] sm:translate-y-[calc(-100%-60px)]",
                            isActive ? "opacity-100 scale-100" : "opacity-0 scale-95",
                          )}
                        >
                          {step.content}
                        </p>
                      </div>
                      {stepIndex === 0 && line.time && (
                        <div
                          className={cn(
                            "absolute left-1/2 top-0 z-10 -translate-x-1/2 translate-y-[calc(-100%-35px)] sm:translate-y-[calc(-100%-40px)] whitespace-nowrap text-sm sm:text-base font-medium",
                            isActive ? "text-[#DDFF00]" : "text-gray-400",
                          )}
                        >
                          {line.time}
                        </div>
                      )}
                    </div>

                    <PlaceholderLines
                      isFirstStep={false}
                      isLastStep={isLastStep}
                      angle={angle}
                      angleBetweenMinorSteps={angleBetweenMinorSteps}
                      lineCountFillBetweenSteps={lineCountFillBetweenSteps}
                      boundaryPlaceholderLinesCount={boundaryPlaceholderLinesCount}
                      lineIndex={lineIndex}
                      stepIndex={stepIndex}
                      circleWidth={circleWidth}
                      circleContainerRotateDeg={circleContainerRotateDeg}
                    />
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface PlaceholderLinesProps {
  isFirstStep: boolean
  angleBetweenMinorSteps: number
  angle: number
  lineCountFillBetweenSteps: number
  boundaryPlaceholderLinesCount: number
  isLastStep: boolean
  lineIndex: number
  stepIndex: number
  circleWidth: number
  circleContainerRotateDeg: number
}
function PlaceholderLines(props: PlaceholderLinesProps) {
  const {
    isFirstStep,
    isLastStep,
    angle,
    angleBetweenMinorSteps,
    lineCountFillBetweenSteps,
    boundaryPlaceholderLinesCount,
    lineIndex,
    stepIndex,
    circleWidth,
    circleContainerRotateDeg,
  } = props

  const getAngle = (index: number) => {
    if (isFirstStep) {
      return index * angleBetweenMinorSteps
    } else {
      return angle + (index + 1) * angleBetweenMinorSteps
    }
  }

  return (
    <>
      {Array(isLastStep || isFirstStep ? boundaryPlaceholderLinesCount : lineCountFillBetweenSteps)
        .fill("")
        .map((_, fillIndex) => {
          const fillAngle = getAngle(fillIndex)
          return (
            <div
              key={`${lineIndex}-${stepIndex}-${fillIndex}`}
              className="absolute left-1/2 top-0 h-[24px] sm:h-[34px] w-[1px] -translate-x-1/2"
              style={{
                transformOrigin: `50% ${circleWidth / 2}px`,
                transform: `rotate(${fillAngle}deg)`,
              }}
            >
              <div
                className="h-full w-full bg-gray-700"
                style={{
                  transformOrigin: "center top",
                  transform: `rotate(${-1 * fillAngle - circleContainerRotateDeg}deg)`,
                }}
              ></div>
            </div>
          )
        })}
    </>
  )
}
