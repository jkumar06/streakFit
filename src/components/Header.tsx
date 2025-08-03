'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ClientOnly from './ClientOnly';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-slate-900">StreakFit</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-slate-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/dashboard" 
              className="text-slate-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/workouts" 
              className="text-slate-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Workouts
            </Link>
            <Link 
              href="/stats" 
              className="text-slate-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Stats
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-slate-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <ClientOnly>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-slate-700 hover:text-emerald-600 hover:bg-slate-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </ClientOnly>
        </div>

                {/* Mobile Navigation */}
        <ClientOnly>
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
              <nav className="flex flex-col space-y-4">
                <Link 
                  href="/" 
                  className="text-slate-700 hover:text-emerald-600 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/dashboard" 
                  className="text-slate-700 hover:text-emerald-600 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/workouts" 
                  className="text-slate-700 hover:text-emerald-600 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Workouts
                </Link>
                <Link 
                  href="/stats" 
                  className="text-slate-700 hover:text-emerald-600 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Stats
                </Link>
                <div className="pt-4 border-t border-slate-200">
                  <Link 
                    href="/login" 
                    className="block text-slate-700 hover:text-emerald-600 font-medium transition-colors mb-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/signup" 
                    className="block bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </ClientOnly>
      </div>
    </header>
  );
} 