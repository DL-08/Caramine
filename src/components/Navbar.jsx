import React, { useState, useEffect } from 'react';
import { Terminal, ArrowUpRight, Menu, X, ShieldAlert, Cpu } from 'lucide-react';

export default function Navbar({ onOpenTracker, onOpenDashboard }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl transition-all duration-500 rounded-full ${
          scrolled
            ? 'bg-dark/85 backdrop-blur-xl border border-white/10 shadow-dark-soft py-2.5 px-4 sm:px-6'
            : 'bg-transparent border border-white/5 py-3 sm:py-4 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-white tracking-tight font-heading font-bold text-lg sm:text-xl group"
          >
            <div className="w-8 h-8 rounded-full bg-dark-surface border border-white/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <span className="w-2.5 h-2.5 rounded-full bg-signal animate-signal-pulse"></span>
            </div>
            <div className="flex flex-col">
              <span className="leading-none text-offwhite tracking-wider flex items-center gap-1">
                CARAMINE
                <span className="text-signal text-sm">■</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase">
                EXPENSE TELEMETRY
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-mono tracking-wider uppercase">
            <button
              onClick={onOpenDashboard}
              className="text-signal font-bold hover:text-white interactive-lift flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-signal"></span>
              // Dashboard
            </button>
            <a
              href="#features"
              className="text-white/70 hover:text-signal interactive-lift"
            >
              // Micro-UIs
            </a>
            <a
              href="#philosophy"
              className="text-white/70 hover:text-signal interactive-lift"
            >
              // Manifesto
            </a>
            <a
              href="#protocol"
              className="text-white/70 hover:text-signal interactive-lift"
            >
              // Protocol
            </a>
            <a
              href="#pricing"
              className="text-white/70 hover:text-signal interactive-lift"
            >
              // Access
            </a>
          </nav>

          {/* Right Action CTA Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDashboard || onOpenTracker}
              className="btn-magnetic group relative overflow-hidden rounded-full bg-signal px-4 sm:px-6 py-2 sm:py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-white border border-signal shadow-brutalist-signal"
            >
              <span className="btn-slide bg-black"></span>
              <span className="btn-content relative z-10 flex items-center gap-1.5">
                <span>Launch App</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-dark/95 backdrop-blur-2xl flex flex-col justify-center items-center p-8 md:hidden">
          <nav className="flex flex-col items-center gap-7 text-lg font-mono tracking-widest uppercase text-center">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenDashboard) onOpenDashboard();
              }}
              className="text-signal font-bold hover:underline transition-colors flex items-center gap-2"
            >
              <span>// Open Dashboard</span>
            </button>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-signal transition-colors"
            >
              // Micro-UIs
            </a>
            <a
              href="#philosophy"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-signal transition-colors"
            >
              // Manifesto
            </a>
            <a
              href="#protocol"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-signal transition-colors"
            >
              // Protocol
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-signal transition-colors"
            >
              // Access
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracker();
              }}
              className="mt-4 px-8 py-3 rounded-full bg-signal text-white font-bold tracking-wider uppercase text-sm shadow-brutalist-signal"
            >
              Track Expenses
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
