import React, { useEffect, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import Lenis from "@studio-freight/lenis";

import ui1 from "@/components/assets/frontend1.png"
import ui2 from "@/components/assets/frontend2.png"
import ui3 from "@/components/assets/hero2.jpg"
import ui4 from "@/components/assets/frontend3.png"

export function TimelineDemo() {
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

  const data = [
    {
      title: "2021",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
             Got admission to <span style={{color: '#00D492'}}>Graphic Era Deemed University (Dehradun)</span> to pursue Bachelor of Computer Applications (BCA) with enthusiasm and anticipation to learn and gain knowledge about how <span style={{color: '#00D492'}}>technologies</span> work
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://dl.geu.ac.in/uploads/image/choosing-the-right-university.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://i.postimg.cc/s2ShwF2z/retouch-2025081921391266.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
          </div>
        </div>
      ),
    },
    {
      title: "Mid 2024",
      content: (
        <div>
            <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
              Graduated from BCA with <span style={{color: '#00D492'}}>7.2 SGPA</span>. Initially uncertain about my career path, I pursued MCA in <span style={{color: '#00D492'}}>online mode</span>. This led me to discover web development, starting with the fundamentals of <span style={{color: '#00D492'}}>HTML, CSS, JavaScript</span>, and advancing to modern frameworks and libraries like <span style={{color: '#00D492'}}>React, Next.js, Javascript, Typescript </span> etc. I began creating frontend projects focusing on UI design and functionality, primarily integrating <span style={{color: '#00D492'}}>APIs</span>, and successfully deployed them on GitHub and Netlify.
            </p>
          
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://i.postimg.cc/1z2cWcPx/Screenshot-310.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://i.postimg.cc/4dRH78s3/Screenshot-311.png"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://i.postimg.cc/hjvh6HDh/Screenshot-308.png"
              alt="bento template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://i.postimg.cc/J4Fw5vgP/Screenshot-309.png"
              alt="cards template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
          </div>
        </div>
      ),
    },
    {
      title: "Current Professional Focus",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            After understanding how frontend works, I ventured into <span style={{color: '#00D492'}}>MERN development</span> – mastering <span style={{color: '#00D492'}}>MongoDB, Express.js, Node.js</span> to ship end-to-end products. Alongside, I dove into <span style={{color: '#00D492'}}>UI/UX design</span>: wire-framing in <span style={{color: '#00D492'}}>Figma</span>, animating micro-interactions with <span style={{color: '#00D492'}}>Framer Motion</span>, and curating Dribbble-style shots for pixel-perfect polish.
          </p>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            ✧ Sharpening <span style={{color: '#00D492'}}>Next.js</span>, <span style={{color: '#00D492'}}>TypeScript</span>, and <span style={{color: '#00D492'}}>MERN</span> skills while crafting design-driven experiences inspired by leading design communities.
          </p>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
            </div>
            <div className="flex flex-col gap-4 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <p> ✧ Successfully completed a <span style={{color: '#00D492'}}>3-month full Stack Development internship</span> at <a href="https://www.zidio.in/" target="_blank" rel="noopener noreferrer" style={{color: '#7C3AED'}}>Zidio</a></p>
              <p> ✧ Practicing <span style={{color: '#00D492'}}>Data Structures and Algorithms (DSA)</span> daily to improve problem-solving skills.</p>
              <p>✩ Dedicated to <span style={{color: '#00D492'}}>revise and explore</span> new technologies daily to gain deeper knowledge in this field.</p>
              <p>✧ I’ve also crafted <span style={{color: '#00D492'}}>UI/UX design</span> projects—here are some <span style={{color: '#00D492'}}>screenshots</span> of the interfaces I designed:</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={ui1.src}
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src={ui2.src}
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src={ui3.src}
              alt="bento template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src={ui4.src}
              alt="cards template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
