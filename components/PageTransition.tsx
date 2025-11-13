"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const pathname = usePathname();
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const visitedPagesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Check if this is the first visit to this page
    const isFirstVisit = !visitedPagesRef.current.has(pathname);
    
    setIsLoading(true);
    
    // Clear any existing timeout
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    
    // Set different timeout based on whether it's first visit or not
    const timeout = isFirstVisit ? 2000 : 300; // 2s for first visit, 300ms for subsequent
    
    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setIsFirstLoad(false);
      visitedPagesRef.current.add(pathname);
    }, timeout);

    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [pathname]);

  // Also listen for when the page is actually ready
  useEffect(() => {
    const handleLoad = () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      setIsLoading(false);
      setIsFirstLoad(false);
      visitedPagesRef.current.add(pathname);
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
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121315] transition-opacity duration-300">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
          {isFirstVisit && (
            <div className="text-gray-400 text-sm animate-pulse">
              Loading page for the first time...
            </div>
          )}
        </div>
      )}
      <div className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}>
        {children}
      </div>
    </>
  );
}