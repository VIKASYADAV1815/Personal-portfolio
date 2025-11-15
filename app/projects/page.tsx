"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const ImageReveal = dynamic(() => import("@/components/frontend-project"), { ssr: false });
import { TracingBeam } from "./tracing-beam";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Leet from "./leet";
import Lottie from 'react-lottie';
import Live from "@/components/assets/live.json";
const Features = dynamic(() => import("@/components/features-12"), { ssr: false });
import Lenis from '@studio-freight/lenis';
import { Feature1 } from "./Feature/project1/feature-demo";
import { Feature2 } from "./Feature/project2/feature-demo";
import { VideoPlayer } from "@/components/ui/video-player";
const blogVideoUrl = process.env.NEXT_PUBLIC_BLOGIFY_VIDEO_URL ?? "https://youtu.be/Iun9uUHJKcc";
const excelVideoUrl = "/videos/excel.mp4?v=2";
const defaultPoster = "/placeholder.jpg";

const blogifyDocumentation = "/BlogifyDoc.pdf";




if (typeof window !== 'undefined') {
  const nextConfig = {
    images: {
      domains: ['pub-940ccf6255b54fa799a9b01050e6c227.r2.dev', 'i.postimg.cc', 'wallpapercave.com'],
    },
  };
  if (window.__NEXT_DATA__) {
    window.__NEXT_DATA__.nextConfig = {
      ...window.__NEXT_DATA__.nextConfig,
      ...nextConfig,
    };
  }
}

gsap.registerPlugin(ScrollTrigger);
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');
  * {
    font-family: Montserrat, sans-serif;
  }
  .button-shadow {
    box-shadow: 0 0 70px rgba(221, 255, 1, 0.35);
    backdrop-filter: blur(10px);
  }
  .button-shadow-white {
    box-shadow: 0 0 70px rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    overflow-y: auto;
  }
  .modal-content {
    background: #1e1e1e;
    padding: 20px;
    border-radius: 8px;
    width: 95%;
    max-width: 900px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }
`;

const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showFeatures, setShowFeatures] = useState<{ 
    visible: boolean; 
    isProject1: boolean;
    position: { top: number; left: number } | null;
  }>({ 
    visible: false, 
    isProject1: true,
    position: null 
  });
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.9,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smooth: true,
      smoothTouch: true,
      touchMultiplier: 1.6,
    });
    
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobile(isMobile);

      if (isMobile) {
        lenis.options.duration = 2.2;
        lenis.options.touchMultiplier = 1.3;
        lenis.options.easing = (t) => 1 - Math.pow(1 - t, 2.8);
      } else {
        lenis.options.duration = 1.9;
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

  useEffect(() => {
    if (showFeatures.visible) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [showFeatures.visible]);

  const handleFeatureClick = (isProject1: boolean, event: React.MouseEvent) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const scrollY = window.scrollY;
    
    setShowFeatures({ 
      visible: true, 
      isProject1,
      position: {
        top: buttonRect.top + scrollY,
        left: buttonRect.left + (buttonRect.width / 2)
      }
    });
  };

  const ProjectCard = ({ imageSrc, isVideo = false }: { imageSrc: string, isVideo?: boolean }) => (
    <motion.div
      className="relative w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden"
      initial={{ y: 0 }}
      animate={{
        y: [0, -20, 0],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      {isVideo ? (
        <VideoPlayer 
          src={imageSrc} 
          className="w-full h-full rounded-lg"
        />
      ) : (
        <img
          src={imageSrc}
          alt="Project Screenshot"
          className="w-full h-full object-cover rounded-lg"
        />
      )}
      <div className="absolute inset-0 bg-black/0" />
    </motion.div>
  );

  const Counter = ({ target, duration = 2 }: { target: number; duration?: number }) => {
    const counterRef = useRef<HTMLDivElement>(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!counterRef.current) return;

      const obj = { val: 0 };
      const tl = gsap.to(obj, {
        val: target,
        duration,
        ease: "power1.out",
        scrollTrigger: {
          trigger: counterRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        onUpdate: () => setCount(Math.floor(obj.val)),
      });

      return () => {
        tl.kill();
      };
    }, [target, duration]);

    return (
      <div ref={counterRef} className="text-center my-20">
        <div className="text-5xl sm:text-6xl md:text-7xl font-bold" style={{ color: "#04A746" }}>
          Solved {count}+
        </div>
        <div className="text-2xl sm:text-3xl md:text-4xl text-[rgba(255,255,255,0.8)] font-semibold mt-2">
          DSA Problems
        </div>
      </div>
    );
  };

  const FeatureModal = () => {
    if (!showFeatures.position) return null;

    const modalStyle = {
      position: 'absolute' as const,
      top: showFeatures.position.top,
      left: '50%',
      transform: 'translate(-50%, -100%)',
      marginTop: '-20px'
    };

    return (
      <div className="modal-overlay" onClick={() => setShowFeatures({ visible: false, isProject1: true, position: null })}>
        <div className="modal-content" style={modalStyle} onClick={e => e.stopPropagation()}>
          {showFeatures.isProject1 ? (
            <Feature1 onClose={() => setShowFeatures({ visible: false, isProject1: true, position: null })} />
          ) : (
            <Feature2 onClose={() => setShowFeatures({ visible: false, isProject1: false, position: null })} />
          )}
        </div>
      </div>
    );
  };

  const MainContent = () => (
    <div className="relative flex flex-col justify-start pt-20 pb-12 px-4 sm:px-6 md:px-8">
      <div className="flex flex-col gap-10 mt-6 w-full max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-16 min-h-screen">
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            <h1 className="hidden lg:block text-5xl md:text-7xl lg:text-8xl font-bold text-[#E5E7EB] mb-4">01</h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">BLOGIFY</h2>
            <p className="text-[#9CA3AF] uppercase tracking-wide mb-4 text-sm sm:text-base">
              A MODERN BLOGGING PLATFORM WITH AI FEATURES
            </p>
            <p className="text-[rgba(255,255,255,0.8)] text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
              A sophisticated blogging platform with a clean, minimal design that prioritizes content.
              Features include AI-powered auto Description generator. Enhanced with multiple reading modes including Dark/Reading themes,
              and Text-to-Speech with various voice options. Users can listen to
              articles in different accents and voices while multitasking. Explore our comprehensive documentation for in-depth insights into the project architecture, folder structure, and implementation details{" "}
              <a 
                href="https://vikasyadav1815.github.io/Blogify-doc/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#DDFF01] group inline-flex items-center transition-all duration-300 hover:text-[#a3bd01] no-underline"
                style={{
                  textDecoration: 'none',
                  position: 'relative'
                }}
              >
                documentation
                <svg 
                  className="w-4 h-4 ml-1 animate-bounce" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 10l7-7m0 0l7 7m-7-7v18" 
                  />
                </svg>
              </a>
              .
            </p>
            <div className="mt-6 flex flex-nowrap gap-2 sm:gap-3 justify-center lg:justify-start">
              <a
                href="https://blogify-client-ten.vercel.app/"
                className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-[#DDFF01] text-black font-semibold rounded-full hover:bg-[#c4e600] transition button-shadow flex items-center gap-1 sm:gap-2"
              >
                Go to Live Website
              </a>
              <button
                onClick={(e) => handleFeatureClick(true, e)}
                className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm cursor-pointer bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition button-shadow-white flex items-center gap-1 sm:gap-2"
              >
                Check Features
                <Lottie
                  options={{
                    animationData: Live,
                    loop: true,
                    autoplay: true,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice',
                    },
                  }}
                  height={24}
                  width={24}
                />
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center order-1 lg:order-2">
            <h1 className="block lg:hidden text-3xl sm:text-4xl font-bold text-[#E5E7EB] mb-4 self-start">01</h1>
            <div className="w-full max-w-[600px] lg:max-w-[700px] mx-auto">
              {blogVideoUrl ? (
                <VideoPlayer src={blogVideoUrl} type="youtube" minimal className="w-full h-full rounded-lg" />
              ) : (
                <VideoPlayer src={"/videos/hero.mp4"} type="mp4" poster={defaultPoster} className="w-full h-full rounded-lg" />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-16 min-h-screen">
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            <h1 className="hidden lg:block text-5xl md:text-7xl lg:text-8xl font-bold text-[#E5E7EB] mb-4">02</h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">Excel Vision</h2>
            <p className="text-[#9CA3AF] uppercase tracking-wide mb-4 text-sm sm:text-base">
              ADVANCED EXCEL ANALYTICS PLATFORM
            </p>
            <p className="text-[rgba(255,255,255,0.8)] text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
              A powerful Excel analytics platform with a modern, intuitive interface. Upload your Excel sheets 
              and instantly access beautiful, interactive visualizations including pie charts, bar graphs, 
              line charts, and more. Features include real-time data analysis, customizable dashboards, 
              trend analysis,  Perfect for businesses and analysts looking 
              to transform raw data into actionable insights. Explore our comprehensive documentation for in-depth insights into the project architecture, folder structure, and implementation details{" "}
              <a 
                href="https://vikasyadav1815.github.io/excel-document/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#DDFF01] group inline-flex items-center transition-all duration-300 hover:text-[#a3bd01] no-underline"
                style={{
                  textDecoration: 'none',
                  position: 'relative'
                }}
              >
                documentation
                <svg 
                  className="w-4 h-4 ml-1 animate-bounce" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 10l7-7m0 0l7 7m-7-7v18" 
                  />
                </svg>
              </a>
              .
            </p>
            <div className="mt-6 flex flex-nowrap gap-2 sm:gap-3 justify-center lg:justify-start">
              <a
                href="https://excel-analytics-app-vikas.netlify.app/ "
                className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-[#DDFF01] text-black font-semibold rounded-full hover:bg-[#c4e600] transition button-shadow flex items-center gap-1 sm:gap-2"
              >
                Go to Live Website
              </a>
              <button
                onClick={(e) => handleFeatureClick(false, e)}
                className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm cursor-pointer bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition button-shadow-white flex items-center gap-1 sm:gap-2"
              >
                Check Features
                <Lottie
                  options={{
                    animationData: Live,
                    loop: true,
                    autoplay: true,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice',
                    },
                  }}
                  height={24}
                  width={24}
                />
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2">
            <h1 className="block lg:hidden text-3xl sm:text-4xl font-bold text-[#E5E7EB] mb-4 self-start">02</h1>
            <div className="w-full max-w-[600px] lg:max-w-[700px] mx-auto lg:mr-0">
              {excelVideoUrl ? (
                <VideoPlayer src={excelVideoUrl} type="mp4" className="w-full h-full rounded-lg" posterTimestamp={12} />
              ) : (
                <VideoPlayer src={"/videos/hero.mp4"} type="mp4" poster={defaultPoster} className="w-full h-full rounded-lg" />
              )}
            </div>
          </div>
        </div>

        <div className="w-full mt-20">
           <div className="w-full mt-20 relative overflow-visible px-4">
            <div className="w-full hover:scale-105 transition-transform duration-300">
              <ImageReveal />
            </div>
          </div>
          <div className="w-full hover:scale-105 transition-transform duration-300">
            <Features />
          </div>
         
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-8">
          <div className="w-full md:flex-1 flex md:mt-50 justify-center">
            <Counter target={50} duration={2.5} />
          </div>
          <div className="w-full md:flex-1 flex justify-center">
            <Leet />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <div className="min-h-screen bg-[#121315]">
          <MainContent />
        </div>
      ) : (
        <TracingBeam className="min-h-screen bg-[#121315]">
          <MainContent />
        </TracingBeam>
        
      )}
      {showFeatures.visible && <FeatureModal />}
      <style>{globalStyles}</style>
    </>
  );
};

export default Projects;