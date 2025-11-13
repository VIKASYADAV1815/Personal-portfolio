"use client";
import MetawareLogoParticles from "@/components/contact-component/demo1";
import { useLenis } from "@/hooks/useLenis";

export default function HomePage() {
  // Initialize Lenis smooth scrolling
  useLenis();
  
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#121315" }}>
      <div className="container mx-auto px-4 py-10">
        <div className="mx-auto w-full max-w-4xl h-[65vh] md:h-[70vh] rounded-2xl border border-slate-700/50 overflow-hidden">
          <MetawareLogoParticles />
        </div>
      </div>
    </main>
  )
}
