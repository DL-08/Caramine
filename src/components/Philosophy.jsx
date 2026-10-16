import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Compass, Sliders, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on the brutalist background texture
      gsap.to('.philo-bg-img', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Split words reveal for the manifesto
      gsap.from('.manifesto-reveal-line', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.manifesto-content',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative w-full py-32 sm:py-48 px-6 sm:px-12 md:px-20 bg-dark text-offwhite overflow-hidden"
    >
      {/* Parallaxing Brutalist Raw Texture (Unsplash) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt="Raw concrete architecture texture"
          className="philo-bg-img w-full h-[125%] object-cover object-center filter grayscale contrast-150 -translate-y-10"
        />
        <div className="absolute inset-0 bg-dark/75 mix-blend-multiply" />
      </div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <div className="w-full h-full border-t border-b border-white divide-y divide-white/20"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto manifesto-content">
        {/* Section Header Monospace HUD */}
        <div className="manifesto-reveal-line inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] tracking-widest uppercase text-signal font-bold mb-12">
          <span>■ SECTION 02 // THE PHILOSOPHICAL ENGINE</span>
        </div>

        {/* Statement 1: The Common Industry Flaw */}
        <div className="manifesto-reveal-line max-w-3xl mb-14 sm:mb-20">
          <div className="font-mono text-xs uppercase tracking-widest text-white/40 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span>
            <span>THE STATUS QUO PARADOX</span>
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-sans text-white/60 font-light leading-relaxed">
            Most expense trackers focus on:
            <span className="text-white/90 font-normal"> endless receipt chore lists</span>, tedious manual category rules,
            and shame-inducing post-facto spreadsheets that tell you what you already regret.
          </p>
        </div>

        {/* Statement 2: The Caramine Differentiation (Massive Drama Serif Italic) */}
        <div className="manifesto-reveal-line border-t border-white/15 pt-12 sm:pt-16">
          <div className="font-mono text-xs uppercase tracking-widest text-signal font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-signal rounded-full animate-signal-pulse"></span>
            <span>THE CARAMINE PROTOCOL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium text-white/80 leading-snug mb-4">
            We focus on:
          </h2>

          <div className="font-drama italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.08] tracking-tight">
            Sub-second telemetry,{' '}
            <span className="text-signal underline decoration-signal/40 underline-offset-8">
              zero-setup clarity
            </span>
            , and seamless peer settlements that preserve human dignity.
          </div>
        </div>

        {/* Supporting Pillars */}
        <div className="manifesto-reveal-line mt-20 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="font-mono text-xs text-signal font-bold mb-2">// PILLAR 01</div>
            <div className="font-heading font-bold text-lg text-white mb-2">Eliminate Input Friction</div>
            <p className="font-sans text-sm text-white/60 leading-relaxed">
              If recording an expense takes longer than ordering coffee, human nature rejects it. We guarantee capture under 5 seconds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="font-mono text-xs text-signal font-bold mb-2">// PILLAR 02</div>
            <div className="font-heading font-bold text-lg text-white mb-2">Zero Pre-configuration</div>
            <p className="font-sans text-sm text-white/60 leading-relaxed">
              No assigning accounts, no building 40-row category trees. The ledger understands commercial semantics right out of the box.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="font-mono text-xs text-signal font-bold mb-2">// PILLAR 03</div>
            <div className="font-heading font-bold text-lg text-white mb-2">Aesthetic Dignity</div>
            <p className="font-sans text-sm text-white/60 leading-relaxed">
              Software you look at multiple times a day shouldn't look like pastel cartoon banking. It should feel like a cockpit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
