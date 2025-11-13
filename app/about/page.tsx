"use client";
import About from "./about";
import { useLenis } from "@/hooks/useLenis";

export default function AboutPage() {
  // Initialize Lenis smooth scrolling
  useLenis();
  
  return <About />;
}