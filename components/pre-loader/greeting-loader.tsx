"use client"

import { useState, useEffect } from "react"

export function GreetingAnimation() {
  const languages = [
    { text: "Hello" },
    { text: "नमस्ते" },
    { text: "Bonjour" },
    { text: "Hola" },
    { text: "你好" },
    { text: "مرحبا" },
    { text: "Olá" },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % languages.length)
    }, 280)

    return () => clearInterval(interval)
  }, [languages.length])

  return (
    <div className="flex items-center justify-center min-h-screen w-full" style={{ backgroundColor: "#121315" }}>
      <style>{`
        @keyframes fogFade {
          0% {
            opacity: 0;
            filter: blur(30px) brightness(0.8);
            transform: scale(0.7);
          }
          10% {
            opacity: 0.6;
            filter: blur(18px) brightness(0.9);
            transform: scale(0.85);
          }
          20% {
            opacity: 1;
            filter: blur(8px) brightness(1);
            transform: scale(0.95);
          }
          30% {
            opacity: 1;
            filter: blur(2px);
            transform: scale(1);
          }
          70% {
            opacity: 1;
            filter: blur(2px);
            transform: scale(1);
          }
          80% {
            opacity: 1;
            filter: blur(8px) brightness(1);
            transform: scale(1.05);
          }
          90% {
            opacity: 0.6;
            filter: blur(18px) brightness(0.9);
            transform: scale(1.1);
          }
          100% {
            opacity: 0;
            filter: blur(30px) brightness(0.8);
            transform: scale(1.2);
          }
        }

        .greeting-text {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          animation: fogFade 0.28s ease-in-out;
          will-change: opacity, filter, transform;
        }
      `}</style>

      <div className="w-full h-screen flex items-center justify-center px-4">
        <h1
          className="greeting-text text-2xl sm:text-3xl md:text-4xl lg:text-7xl xl:text-6xl font-bold text-white text-center leading-tight"
          style={{
            textShadow:
              "0 0 60px rgba(255, 255, 255, 0.3), 0 0 120px rgba(255, 255, 255, 0.15), 0 0 20px rgba(200, 200, 200, 0.2)",
            letterSpacing: "-0.02em",
          }}
        >
          {languages[currentIndex].text}
        </h1>
      </div>
    </div>
  )
}
