"use client";
import BentoGrid from "@/components/kokonutui/bento-grid";
import { useLenis } from "@/hooks/useLenis";

export default function HomePage() {
  // Initialize Lenis smooth scrolling
  useLenis();
  
  return (
    <main className="min-h-screen bg-background">
      <BentoGrid />
    </main>
  )
}
