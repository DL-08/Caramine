import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Terminal, Zap, ShieldCheck, Activity } from 'lucide-react';

export default function Hero({ onOpenTracker }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered fade-up animation for entrance
      gsap.from('.hero-animate', {
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2,
      });

      // Subtle pulse on indicator
      gsap.to('.hero-radar', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[100dvh] min-h-[700px] overflow-hidden flex flex-col justify-end bg-dark"
    >
      {/* Full-bleed background image with heavy brutalist texture */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2400&q=85"
          alt="Brutalist architectural concrete monolith"
          className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-40 scale-105"
        />
        {/* Heavy primary-to-black gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10] via-[#0E0E10]/80 to-[#0E0E10]/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
      </div>

      {/* Control grid architectural lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-15">
        <div className="w-full h-full grid grid-cols-4 md:grid-cols-8 divide-x divide-white/20">
          <div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div>
        </div>
      </div>

      {/* Decorative Monospace Coordinate HUD */}
      <div className="absolute top-28 right-6 sm:right-12 z-10 hidden sm:flex flex-col items-end gap-1.5 text-[10px] font-mono text-white/40 tracking-wider">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-signal"></span>
          <span className="text-white/70">LATENCY // 0.8 SECONDS</span>
        </div>
        <div>SYS: CARAMINE-SIGNAL-v4.2</div>
        <div>COORDINATES: 35.6762° N / 139.6503° E</div>
        <div className="text-signal/80 font-bold">MODE: CONTINUOUS TELEMETRY</div>
      </div>

      {/* Bottom-left third content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-20 pb-16 sm:pb-24">
        <div className="max-w-4xl flex flex-col items-start">
          {/* Micro Status Chip */}
          <div className="hero-animate mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-signal animate-signal-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-offwhite/90">
              BRUTALIST SIGNAL ARCHITECTURE // ZERO-SETUP EXPENSE ENGINE
            </span>
          </div>

          {/* Hero Line Pattern: Bold Sans + Massive Serif Italic (3-5x size contrast) */}
          <h1 className="hero-animate text-offwhite font-heading font-extrabold tracking-tighter uppercase leading-[0.9] text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-2">
            Command the
          </h1>

          <div className="hero-animate overflow-visible -mt-2 sm:-mt-4 md:-mt-6 mb-6">
            <span className="block font-drama italic text-signal text-7xl sm:text-9xl md:text-[11rem] lg:text-[13rem] leading-[0.82] tracking-tight font-normal drop-shadow-2xl">
              Capital.
            </span>
          </div>

          {/* Value Prop Subtitle */}
          <p className="hero-animate max-w-2xl text-offwhite/75 text-base sm:text-lg md:text-xl font-sans font-normal leading-relaxed mb-8 sm:mb-10">
            A high-tech digital instrument for frictionless financial telemetry.
            Log any expense in <span className="text-offwhite font-semibold underline decoration-signal decoration-2 underline-offset-4">under 5 seconds</span>,
            track where capital flows without manual configuration, and resolve shared debts without the awkwardness.
          </p>

          {/* Action CTAs */}
          <div className="hero-animate flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={onOpenTracker}
              className="btn-magnetic group relative overflow-hidden rounded-full bg-signal px-8 sm:px-10 py-4 sm:py-4.5 text-sm sm:text-base font-mono font-bold uppercase tracking-widest text-white border-2 border-signal shadow-brutalist-signal"
            >
              <span className="btn-slide bg-black"></span>
              <span className="btn-content relative z-10 flex items-center gap-3">
                <span>Track Your Expenses</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>

            <a
              href="#features"
              className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-offwhite/90 border border-white/15 text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-300 interactive-lift"
            >
              <span>Examine Micro-UIs</span>
              <span className="text-signal group-hover:translate-y-0.5 transition-transform">↓</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hero-animate mt-12 sm:mt-16 grid grid-cols-3 gap-6 sm:gap-12 pt-6 border-t border-white/10 w-full max-w-2xl">
            <div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-offwhite flex items-center gap-1">
                0.8<span className="text-signal text-lg">s</span>
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-white/50 mt-1">
                Mean Capture Time
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-offwhite flex items-center gap-1">
                0.00<span className="text-signal text-lg">h</span>
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-white/50 mt-1">
                Zero Setup Friction
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-offwhite flex items-center gap-1">
                100<span className="text-signal text-lg">%</span>
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-white/50 mt-1">
                Peer Harmony
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
