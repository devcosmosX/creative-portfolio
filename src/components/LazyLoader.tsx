"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";

interface LazyLoaderProps {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: string;
}

export default function LazyLoader({ children, rootMargin = "500px", minHeight = "100vh" }: LazyLoaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setShowContent(true), 50);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: isVisible ? 'auto' : minHeight }}>
      {isVisible && (
        <div 
          className={`transition-opacity duration-[800ms] ease-out ${showContent ? 'opacity-100' : 'opacity-0'}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
