"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { Loader } from "@/components/loader/loader";
import { GreetingAnimation } from "@/components/pre-loader/greeting-loader";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [showGreeting, setShowGreeting] = useState(false);
  const [fadeGreeting, setFadeGreeting] = useState(false);
  const [shouldGreet, setShouldGreet] = useState(false);
  const pathname = usePathname();
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const visitedPagesRef = useRef<Set<string>>(new Set());
  const greetingTimeoutRef = useRef<{ fade?: NodeJS.Timeout; hide?: NodeJS.Timeout }>({});

  useEffect(() => {
    const isHome = pathname === "/";
    const isFirstVisit = !visitedPagesRef.current.has(pathname);

    if (isHome) {
      let alreadyShown = false;
      let navTriggered = false;
      try {
        alreadyShown = typeof window !== "undefined" && localStorage.getItem("greetShown") === "1";
        navTriggered = typeof window !== "undefined" && sessionStorage.getItem("greetOnHomeNav") === "1";
      } catch {}

      if (!alreadyShown && navTriggered) {
        setShouldGreet(true);
        setShowGreeting(false);
        setFadeGreeting(false);
        setIsLoading(false);
      } else {
        setShowGreeting(false);
        setFadeGreeting(false);
        setIsLoading(false);
        visitedPagesRef.current.add(pathname);
      }
    } else {
      setShowGreeting(false);
      setFadeGreeting(false);
      setIsLoading(true);

      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);

      const timeout = isFirstVisit ? 2000 : 300;
      loadingTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        setIsFirstLoad(false);
        visitedPagesRef.current.add(pathname);
      }, timeout);
    }

    return () => {
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
      if (greetingTimeoutRef.current.fade) clearTimeout(greetingTimeoutRef.current.fade);
      if (greetingTimeoutRef.current.hide) clearTimeout(greetingTimeoutRef.current.hide);
    };
  }, [pathname]);

  // Also listen for when the page is actually ready
  useEffect(() => {
    const handleLoad = () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      const isHome = pathname === "/";
      if (isHome && shouldGreet) {
        setShowGreeting(true);
        setFadeGreeting(false);
        if (greetingTimeoutRef.current.fade) clearTimeout(greetingTimeoutRef.current.fade);
        if (greetingTimeoutRef.current.hide) clearTimeout(greetingTimeoutRef.current.hide);
        greetingTimeoutRef.current.fade = setTimeout(() => setFadeGreeting(true), 3200);
        greetingTimeoutRef.current.hide = setTimeout(() => {
          setShowGreeting(false);
          setIsFirstLoad(false);
          visitedPagesRef.current.add(pathname);
          setShouldGreet(false);
          try {
            localStorage.setItem("greetShown", "1");
            sessionStorage.removeItem("greetOnHomeNav");
          } catch {}
        }, 3800);
      } else if (!isHome) {
        setIsLoading(false);
        setIsFirstLoad(false);
        visitedPagesRef.current.add(pathname);
      }
    };

    // Check if document is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [pathname]);

  const isFirstVisit = !visitedPagesRef.current.has(pathname);

  return (
    <>
      {showGreeting && (
        <div className={`fixed inset-0 z-50 transition-opacity duration-600 ${fadeGreeting ? "opacity-0" : "opacity-100"}`}>
          <GreetingAnimation />
        </div>
      )}
      {isLoading && pathname !== "/" && !isFirstVisit && <Loader fullscreen backdrop />}
      <div className={`transition-opacity duration-300 ${isLoading || showGreeting ? "opacity-0" : "opacity-100"}`}>
        {children}
      </div>
    </>
  );
}