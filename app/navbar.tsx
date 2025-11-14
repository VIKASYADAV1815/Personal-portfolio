"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Preload routes on hover
  const preloadRoute = (href: string) => {
    router.prefetch(href);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="w-full flex justify-center pt-6 px-4">
      <nav className="flex items-center justify-between border border-slate-700/30 backdrop-blur-md bg-black/10 px-6 py-4 rounded-full text-white text-sm w-[600px] max-md:w-full relative transition-all duration-300">
        <Link
          href="/"
          prefetch={true}
          onMouseEnter={() => preloadRoute("/")}
          onClick={() => {
            try { sessionStorage.setItem('greetOnHomeNav', '1'); } catch {}
          }}
          className="flex-shrink-0 transform hover:scale-110 transition-transform duration-200"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4.706" cy="16" r="4.706" fill="#D9D9D9" />
            <circle cx="16.001" cy="4.706" r="4.706" fill="#D9D9D9" />
            <circle cx="16.001" cy="27.294" r="4.706" fill="#D9D9D9" />
            <circle cx="27.294" cy="16" r="4.706" fill="#D9D9D9" />
          </svg>
        </Link>

        <div className="flex items-center justify-center flex-1 gap-4 md:gap-8">
          <Link
            href="/"
            prefetch={true}
            onMouseEnter={() => preloadRoute("/")}
            onClick={() => {
              try { sessionStorage.setItem('greetOnHomeNav', '1'); } catch {}
            }}
            className="relative h-6 group hover:text-[#DDFF01] transition-all duration-200 hover:scale-105 text-xs md:text-sm"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DDFF01] transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link
            href="/about"
            prefetch={true}
            onMouseEnter={() => preloadRoute("/about")}
            className="relative h-6 group hover:text-[#DDFF01] transition-all duration-200 hover:scale-105 text-xs md:text-sm"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DDFF01] transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link
            href="/projects"
            prefetch={true}
            onMouseEnter={() => preloadRoute("/projects")}
            className="relative h-6 group hover:text-[#DDFF01] transition-all duration-200 hover:scale-105 text-xs md:text-sm"
          >
            Projects
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DDFF01] transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link
            href="/contact"
            prefetch={true}
            onMouseEnter={() => preloadRoute("/contact")}
            className="relative h-6 group hover:text-[#DDFF01] transition-all duration-200 hover:scale-105 text-xs md:text-sm"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DDFF01] transition-all duration-200 group-hover:w-full"></span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href="/resume.pdf" download>
            <button className="border border-slate-600/50 hover:bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer">
              Resume
            </button>
          </a>
          <Link href="/contact">
            <button className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition-all  cursor-pointer duration-300 hover:scale-105">
              Hire Me
            </button>
          </Link>
        </div>

        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div
          className={`absolute top-16 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-lg border border-slate-700/30 rounded-2xl w-[200px] flex flex-col items-center gap-4 py-4 text-base transform transition-all duration-300 ${
            isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <a href="/resume.pdf" download>
            <button className="border border-slate-600/50 hover:bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 w-36">
              Resume
            </button>
          </a>
          <Link href="/contact">
            <button className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition-all duration-300 hover:scale-105 w-36">
              Hire Me
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
