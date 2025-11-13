"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const LogoCarousel = () => {
  const logos = [
    { id: "cplusplus", name: "C++" },
    { id: "css", name: "CSS" },
    { id: "docker", name: "Docker" },
    { id: "express", name: "Express" },
    { id: "figma", name: "Figma" },
    { id: "git", name: "Git" },
    { id: "github", name: "GitHub" },
    { id: "gsap", name: "GSAP" },
    { id: "javascript", name: "JavaScript" },
    { id: "jsonwebtokens", name: "JWT" },
    { id: "mongodb", name: "MongoDB" },
    { id: "mongoose", name: "Mongoose" },
    { id: "netlify", name: "Netlify" },
    { id: "nextdotjs", name: "Next.js" },
    { id: "nodedotjs", name: "Node.js" },
    { id: "nodemon", name: "Nodemon" },
    { id: "python", name: "Python" },
    { id: "react", name: "React" },
    { id: "socketdotio", name: "Socket.io" },
    { id: "tailwindcss", name: "Tailwind" },
    { id: "typescript", name: "TypeScript" },
    { id: "vercel", name: "Vercel" },
    // Added more SVGs
    { id: "html5", name: "HTML5" },
    { id: "redux", name: "Redux" },
    { id: "sass", name: "Sass" },
    { id: "bootstrap", name: "Bootstrap" },
    { id: "firebase", name: "Firebase" },
    { id: "aws", name: "AWS" },
    { id: "graphql", name: "GraphQL" },
    { id: "postgresql", name: "PostgreSQL" }
  ];

  // Duplicate logos for seamless infinite effect
  const allLogos = [...logos, ...logos];

  return (
    <div className="relative w-[100%] overflow-hidden py-3 md:py-4" style={{ backgroundColor: "#121315" }}>
      {/* No title section as requested */}
      
      {/* Gradient fade effect on left side - adjusted for narrower container */}
      <div className="absolute left-0 top-0 z-10 h-full w-[40px] md:w-[60px] bg-gradient-to-r from-[#121315] to-transparent"></div>
      
      {/* Single row - moves left */}
      <motion.div 
        className="flex w-fit"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ 
          repeat: Infinity, 
          repeatType: "loop", 
          duration: 40,
          ease: "linear"
        }}
        whileHover={{ 
          animationPlayState: "paused"
        }}
      >
        {allLogos.map((logo, index) => (
          <div key={`logo1-${index}`} className="mx-3 sm:mx-4 md:mx-5 flex flex-col items-center justify-center group">
            <motion.img 
              src={`/assets/${logo.id}.svg`} 
              alt={logo.name} 
              className="h-6 sm:h-7 md:h-8 w-auto filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" 
              whileHover={{ scale: 1.2 }}
            />
            <span className="mt-1 text-[8px] sm:text-[9px] text-gray-600 group-hover:text-gray-300 transition-colors duration-300">{logo.name}</span>
          </div>
        ))}
      </motion.div>
      
      {/* Gradient fade effect on right side - adjusted for narrower container */}
      <div className="absolute right-0 top-0 z-10 h-full w-[40px] md:w-[60px] bg-gradient-to-l from-[#121315] to-transparent"></div>
    </div>
  );
};

export default LogoCarousel;