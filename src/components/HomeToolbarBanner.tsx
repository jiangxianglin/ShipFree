"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function HomeToolbarBanner() {
  const pathname = usePathname();
  
  // 不在首页时显示
  if (pathname === "/") {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white relative z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <svg 
              className="w-6 h-6 flex-shrink-0 hidden sm:block" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
            <div>
              <p className="font-semibold text-sm sm:text-base">
                🎯 Looking for the perfect icebreaker game?
              </p>
              <p className="text-xs sm:text-sm text-blue-100">
                Use our smart filter tool to find games by type, time, group size & more
              </p>
            </div>
          </div>
          
          <Link
            href="/"
            className="inline-flex items-center px-6 py-2.5 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform whitespace-nowrap text-sm sm:text-base"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
              />
            </svg>
            Try Filter Tool
          </Link>
        </div>
      </div>
    </div>
  );
}
