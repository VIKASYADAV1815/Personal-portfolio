"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// ✅ Dynamic imports only for heavy components (no duplicate imports now)
const HeroScrollDemo = dynamic(() => import("@/components/container-scroll-animation-demo"), { ssr: false });
const GoogleGeminiEffectDemo = dynamic(() => import("@/components/google-gemini-effect-demo"), { ssr: false });
const Figma = dynamic(() => import("./figma-demo"), { ssr: false });
const FlipWordsDemo = dynamic(() => import("./desc"), { ssr: false });
const Bg = dynamic(() => import("./bg"), { ssr: false });

// ✅ Optimized Fonts (using next/font/google)
import { Montserrat, Iceland } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });
const iceland = Iceland({ subsets: ["latin"], weight: "400" });

// ✅ Static assets
import Profile1 from "@/components/assets/p1.jpg";
import Profile2 from "@/components/assets/p2.jpg";

export default function Home() {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const imRef = useRef<HTMLSpanElement | null>(null);
  const nameRef = useRef<HTMLSpanElement | null>(null);

  // ✅ Smooth scroll (Lenis optimized)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smooth: true,
      smoothTouch: true,
      touchMultiplier: 1.3,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      lenis.destroy();
    };
  }, []);

  

  // ✅ GSAP Animations (deferred + optimized)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero Image
      gsap.fromTo(
        imageRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, delay: 0.3, ease: "power3.out" }
      );

      // Scroll animations for text
      if (imRef.current) {
        gsap.to(imRef.current, {
          x: -100,
          scrollTrigger: {
            trigger: imRef.current,
            start: "top center",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (nameRef.current) {
        gsap.to(nameRef.current, {
          x: 100,
          scrollTrigger: {
            trigger: nameRef.current,
            start: "top center",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Text reveal
      const text = "Crafting Digital Experiences";
      const chars = text.split("");

      if (textRef.current) {
        textRef.current.innerHTML = "";
        chars.forEach((char, i) => {
          const span = document.createElement("span");
          span.textContent = char === " " ? "\u00A0" : char;
          span.style.opacity = "0";
          span.style.fontFamily = iceland.style.fontFamily;
          textRef.current?.appendChild(span);

          gsap.to(span, {
            opacity: 1,
            duration: 0.1,
            delay: 1 + i * 0.03,
            ease: "power2.out",
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen relative bg-[#121315]">
      <div className="absolute inset-0 h-screen">
        <Bg />
      </div>
      <div className="h-screen flex flex-col justify-center items-center text-center px-4 relative z-20">
        <h1 className={`${montserrat.className} text-white font-bold text-2xl sm:text-4xl md:text-6xl lg:text-7xl mb-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3`}>
          <span ref={imRef} className={iceland.className}>I'm</span>
          <Image
            ref={imageRef}
            src="https://i.postimg.cc/0NWcNf03/Whats-App-Image-2025-08-18-at-13-24-03-b0364ec7.jpg"
            alt="Logo"
            width={200}
            height={200}
            className="mx-2 rounded-md opacity-0 shadow-[8px_8px_16px_rgba(0,0,0,0.6),-8px_-8px_16px_rgba(0,0,0,0.3)] hover:shadow-[12px_12px_20px_rgba(0,0,0,0.7),-12px_-12px_20px_rgba(0,0,0,0.4)] transition-shadow duration-300"
            loading="eager"
            priority={true}
            sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 200px"
          />
          <span ref={nameRef}>
            <span style={{ color: "#DDFF01" }}>ꪜ𝒾𝒦ꪖ𝚜</span> <span className={montserrat.className}>𝒴𝒶𝒹𝒶𝓋</span>
          </span>
        </h1>
        <p ref={textRef} className={`${iceland.className} text-white/90 font-semibold mt-5 text-3xl sm:text-4xl md:text-6xl lg:text-9xl w-full border-x border-slate-700`}></p>
      </div>
      <div className="flex flex-col lg:flex-row gap-16 px-4 sm:px-6 md:px-8 lg:px-20 mb-8 lg:mb-12 relative z-20 pt-20">
        <div
          className="flex-1 min-h-[20rem] sm:min-h-[24rem] md:min-h-[26rem] lg:min-h-[36rem] border border-slate-700/50 rounded-3xl overflow-hidden relative cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            src={Profile2}
            alt="Vikas Yadav profile image"
            fill
            className={`object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${hovered ? "opacity-0" : "opacity-100"}`}
            loading="lazy"
          />
          <Image
            src={Profile1}
            alt="Vikas Yadav profile image hover"
            fill
            className={`object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${hovered ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
          />
        </div>
        <div className="w-full lg:w-[60%] min-h-[20rem] sm:min-h-[24rem] md:min-h-[28rem] lg:min-h-[36rem] border border-slate-700/50 rounded-3xl p-2 sm:p-2">
          <div className="text-white">
            <FlipWordsDemo />
          </div>
        </div>
      </div>
      <div>
        <Figma />
      </div>
      <div className="relative z-20">
        <HeroScrollDemo />
        <GoogleGeminiEffectDemo />
      </div>
    </div>
  );
}

