"use client"

import { TimelineDemo } from "@/components/time-line-demo"
import SparkleDemo from "./sparkle-demo"
import Lenis from '@studio-freight/lenis'
import { useEffect, useState } from 'react'

export default function AboutUs1() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.9,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smooth: true,
      smoothTouch: true,
      touchMultiplier: 1.6,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobile(isMobile);

      if (isMobile) {
        lenis.options.duration = 2.2;         // softer inertia on mobile
        lenis.options.touchMultiplier = 1.3;  // less sensitive scrolling
        lenis.options.easing = (t) => 1 - Math.pow(1 - t, 2.8); // softer easing
      } else {
        lenis.options.duration = 1.9;         // cinematic but snappy
        lenis.options.touchMultiplier = 1.6;
        lenis.options.easing = (t) => 1 - Math.pow(1 - t, 3);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="mt-16"> {/* Added margin-top to create gap from navbar */}
      <TimelineDemo />
      <SparkleDemo />
    </div>
  )
}
