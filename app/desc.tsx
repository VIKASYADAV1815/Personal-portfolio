import React from "react";
import { FlipWords } from "@/components/ui/flip";

function FlipWordsDemo() {
  const words = ["Full Stack Developer", "UI/UX Designer"];

  return (
    <div className="min-h-[20rem] sm:min-h-[30rem] flex justify-center items-center px-4">
      <div className="text-lg sm:text-2xl md:text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400 max-w-4xl">
        I'm <FlipWords className="font-bold font-montserrat text-base sm:text-2xl md:text-4xl" words={words} /> <br />
        <div
          className="text-sm sm:text-base md:text-xl lg:text-2xl mt-4 pb-4 md:pb-8 lg:pb-12"
          style={{ wordSpacing: "0.15em", fontFamily: "Montserrat, sans-serif" }}
        >
          A passionate Full Stack Developer specializing in MERN technologies, with a growing interest in UI/UX design. I develop robust web applications using MongoDB, Express.js, React, and Node.js, crafting efficient APIs and responsive interfaces with expertise in JavaScript, TypeScript, and modern frameworks. Recently expanding into UI/UX design, I create intuitive user experiences using Figma, focusing on user-centered design principles and accessibility. Driven by continuous learning and innovation, I transform complex requirements into elegant solutions—explore my work to see how I can bring value to your next project! Beyond coding, I'm deeply committed to writing clean, maintainable code and following best practices in software development. I thrive in collaborative environments and enjoy mentoring others while continuously expanding my technical expertise through hands-on project experience.
        </div>
      </div>
    </div>
  );
}

export default FlipWordsDemo;