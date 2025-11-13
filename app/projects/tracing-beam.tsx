"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
  animate,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Map progress from when the container enters to when it fully leaves
    offset: ["start start", "end end"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [segment, setSegment] = useState(200);

  useEffect(() => {
    const measure = () => {
      if (contentRef.current) {
        const h = contentRef.current.offsetHeight;
        setSvgHeight(h);
        // Gradient segment spans a portion of the path for visibility
        setSegment(Math.max(120, Math.min(280, Math.floor(h / 3))));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Move the gradient window along the full path as the user scrolls
  const y1Raw = useTransform(scrollYProgress, [0, 1], [0, Math.max(0, svgHeight - segment)]);
  const y1 = useSpring(y1Raw, { stiffness: 500, damping: 90 });
  const y2Raw = useTransform(y1Raw, (v) => v + segment);
  const y2 = useSpring(y2Raw, { stiffness: 500, damping: 90 });

  return (
    <motion.div
      ref={ref}
      className={cn("relative w-full h-full flex", className)}
    >
      {/* Content left side */}
      <div className="flex-1" ref={contentRef}>
        {children}
      </div>

      {/* Beam right side */}
      <div className="w-[120px] relative">
        <div className="absolute right-0 top-3">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              boxShadow:
                scrollYProgress.get() > 0
                  ? "none"
                  : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
            transition={{
              scale: {
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              },
              duration: 0.2,
              delay: 0.5,
            }}
            className="mr-[27px] h-5 w-5 rounded-full border border-netural-200 shadow-sm flex items-center justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                backgroundColor:
                  scrollYProgress.get() > 0
                    ? "white"
                    : "#DDFF01",
                borderColor:
                  scrollYProgress.get() > 0
                    ? "white"
                    : "#DDFF01",
              }}
              transition={{
                scale: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                },
                duration: 0.2,
                delay: 0.5,
              }}
              className="h-3 w-3 rounded-full border border-neutral-300 bg-white"
            />
          </motion.div>

          <svg
            viewBox={`0 0 20 ${svgHeight}`}
            width="20"
            height={svgHeight}
            className="mr-4 block"
            aria-hidden="true"
          >
            <motion.path
              d={`M 1 0V -36 l 18 24 V ${svgHeight} l -18 24V ${svgHeight}`}
              fill="none"
              stroke="#9091A0"
              strokeOpacity="0.16"
              strokeWidth="2"
              transition={{
                duration: 10,
              }}
            ></motion.path>
            <motion.path
              d={`M 1 0V -36 l 18 24 V ${svgHeight} l -18 24V ${svgHeight}`}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2.5"
              className="motion-reduce:hidden"
              transition={{
                duration: 10,
              }}
            ></motion.path>
            <defs>
              <motion.linearGradient
                id="gradient"
                gradientUnits="userSpaceOnUse"
                x1="0"
                x2="0"
                y1={y1}
                y2={y2}
              >
                <stop stopColor="#DDFF01" stopOpacity="0"></stop>
                <stop stopColor="#DDFF01"></stop>
                <stop offset="0.325" stopColor="#DDFF01"></stop>
                <stop offset="1" stopColor="#DDFF01" stopOpacity="0"></stop>
              </motion.linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </motion.div>
  );
};
