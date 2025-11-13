// "use client"

// import { useState } from "react"

// export default function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen)
//   }

//   return (
//     <div className="w-full flex justify-center pt-6 px-4" style={{ backgroundColor: "#121315" }}>
//       <nav className="flex items-center border border-slate-700/50 backdrop-blur-md bg-black/20 px-5 py-3 rounded-full text-white text-sm max-w-4xl w-full max-md:justify-between relative">
//         <a href="/" className="flex-shrink-0">
//           <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <circle cx="4.706" cy="16" r="4.706" fill="#D9D9D9" />
//             <circle cx="16.001" cy="4.706" r="4.706" fill="#D9D9D9" />
//             <circle cx="16.001" cy="27.294" r="4.706" fill="#D9D9D9" />
//             <circle cx="27.294" cy="16" r="4.706" fill="#D9D9D9" />
//           </svg>
//         </a>

//         <div className="hidden md:flex items-center gap-6 ml-6">
//           <a href="#" className="relative overflow-hidden h-6 group">
//             <span className="block group-hover:-translate-y-full transition-transform duration-300">Products</span>
//             <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
//               Products
//             </span>
//           </a>
//           <a href="#" className="relative overflow-hidden h-6 group">
//             <span className="block group-hover:-translate-y-full transition-transform duration-300">Stories</span>
//             <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
//               Stories
//             </span>
//           </a>
//           <a href="#" className="relative overflow-hidden h-6 group">
//             <span className="block group-hover:-translate-y-full transition-transform duration-300">Pricing</span>
//             <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
//               Pricing
//             </span>
//           </a>
//           <a href="#" className="relative overflow-hidden h-6 group">
//             <span className="block group-hover:-translate-y-full transition-transform duration-300">Docs</span>
//             <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
//               Docs
//             </span>
//           </a>
//         </div>

//         <div className="hidden ml-12 md:flex items-center gap-3">
//           <button className="border border-slate-600/50 hover:bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium transition">
//             Resume
//           </button>
//           <button className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300">
//             Hire Me
//           </button>
//         </div>

//         <button onClick={toggleMobileMenu} className="md:hidden text-gray-400 hover:text-white transition-colors">
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </button>

//         {isMobileMenuOpen && (
//           <div className="absolute top-16 left-0 bg-black/90 backdrop-blur-md border border-slate-700/50 rounded-2xl w-full flex flex-col items-center gap-4 py-6 text-base">
//             <a className="hover:text-indigo-400 transition-colors" href="#">
//               Products
//             </a>
//             <a className="hover:text-indigo-400 transition-colors" href="#">
//               Stories
//             </a>
//             <a className="hover:text-indigo-400 transition-colors" href="#">
//               Pricing
//             </a>
//             <a className="hover:text-indigo-400 transition-colors" href="#">
//               Docs
//             </a>
//             <button className="border border-slate-600/50 hover:bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium transition mt-2">
//               Resume
//             </button>
//             <button className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300">
//               Hire Me
//             </button>
//           </div>
//         )}
//       </nav>
//     </div>
//   )
// }
