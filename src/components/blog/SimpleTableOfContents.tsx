'use client';

import { useState } from 'react';

export function SimpleTableOfContents() {
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'games', title: '15 Christmas Table Games' },
    { id: 'quick-tips', title: 'Quick Success Tips' },
    { id: 'faq', title: 'Frequently Asked Questions' },
    { id: 'conclusion', title: 'Ready for Your Best Christmas Dinner?' },
  ];

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button - Only show on mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-gradient-to-r from-red-600 to-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
        aria-label="Toggle table of contents"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Table of Contents */}
      <div
        className={`
          fixed top-24 right-8 w-48 max-h-[calc(100vh-200px)] overflow-y-auto
          bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50
          transition-all duration-300 z-40
          ${isOpen ? 'translate-x-0' : 'translate-x-[250px]'}
          md:translate-x-0
        `}
      >
        <div className="sticky top-0 bg-gradient-to-r from-red-600 to-green-600 text-white px-4 py-3 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Navigation
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden hover:bg-white/20 rounded-lg p-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleClick(section.id)}
              className="w-full text-left px-2 py-2 rounded-lg transition-all duration-200 text-xs text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-red-100 hover:to-green-100 dark:hover:from-red-900/30 dark:hover:to-green-900/30 hover:text-red-700 dark:hover:text-red-300 font-medium leading-tight"
            >
              {section.title}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center leading-tight">
            📖 {sections.length} sections
          </p>
        </div>
      </div>
    </>
  );
}
