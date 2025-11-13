"use client";

import React from "react";

const style = `
  @keyframes breathe {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .animate-breathe {
    animation: breathe 4s ease-in-out infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin 8s linear infinite;
  }
  
  @keyframes colorChange {
    0% { fill: #3498db; }
    25% { fill: #2ecc71; }
    50% { fill: #f39c12; }
    75% { fill: #e74c3c; }
    100% { fill: #3498db; }
  }
  .animate-color {
    animation: colorChange 8s linear infinite;
  }
`;

const Card = () => {
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const threshold = 12;

  React.useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = style;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: y * -threshold, y: x * threshold });
  };

  return (
    <div
      className="rounded-xl overflow-hidden transition-transform duration-200 ease-out cursor-pointer bg-white mx-auto mt-6 sm:mt-10 animate-breathe relative w-full max-w-[400px] sm:max-w-[700px] lg:max-w-[900px] aspect-[3/2]"
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        boxShadow: `${tilt.x * 2}px ${tilt.y * 2}px 15px rgba(0, 0, 0, 0.2)`,
      }}
    >
      <img
        src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/f3bc9379594535.5cc9aec563213.gif"
        alt="City skyline"
        className="w-full h-full object-cover"
      />
      
      {/* Logo overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-black bg-opacity-30 rounded-full">
        <svg width="180" height="180" viewBox="0 0 100 100" className="animate-spin-slow w-full h-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#ffffff" strokeWidth="2" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#ffffff" strokeWidth="2" />
          <path d="M50 5 L50 95 M5 50 L95 50" stroke="#ffffff" strokeWidth="2" />
          <circle cx="50" cy="50" r="25" className="animate-color" />
          <text x="50" y="55" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">VIKAS</text>
        </svg>
      </div>
    </div>
  );
};

export default Card;







// "use client";

// import React from "react";

// const style = `
//   @keyframes breathe {
//     0%, 100% { transform: translateY(0); }
//     50% { transform: translateY(-10px); }
//   }
//   .animate-breathe {
//     animation: breathe 4s ease-in-out infinite;
//   }
// `;

// const Card = () => {
//   const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
//   const threshold = 12;

//   React.useEffect(() => {
//     const styleTag = document.createElement("style");
//     styleTag.innerHTML = style;
//     document.head.appendChild(styleTag);
//     return () => {
//       document.head.removeChild(styleTag);
//     };
//   }, []);

//   const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
//     const x = (e.clientX - left) / width - 0.5;
//     const y = (e.clientY - top) / height - 0.5;
//     setTilt({ x: y * -threshold, y: x * threshold });
//   };

//   return (
//     <div
//       className="rounded-xl shadow-xl overflow-hidden transition-transform duration-200 ease-out cursor-pointer bg-white mx-auto mt-6 sm:mt-10 animate-breathe"
//       onMouseMove={handleMove}
//       onMouseLeave={() => setTilt({ x: 0, y: 0 })}
//       style={{
//         transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
//         boxShadow: `${tilt.x * 2}px ${tilt.y * 2}px 15px rgba(0, 0, 0, 0.2)`,
//       }}
//     >
//       <div className="w-full aspect-[600/400] lg:w-[600px] lg:h-[400px]">
//         <img
//           src="https://images.unsplash.com/photo-1747134392471-831ea9a48e1e?q=80&w=2000&auto=format&fit=crop"
//           alt="City skyline"
//           className="w-full h-full object-cover"
//         />
//       </div>
//     </div>
//   );
// };

// export default Card;
