import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Compass, Zap, ArrowRight, CornerDownRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------------------
   ANIMATION 1: Rotating Geometric Motif (Concentric Reticle)
-------------------------------------------------------------- */
function RotatingReticleAnimation() {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
      {/* Outer Rotating Dials */}
      <div className="absolute inset-0 rounded-full border border-white/20 border-dashed animate-[spin_40s_linear_infinite]" />
      <div className="absolute inset-4 rounded-full border border-signal/40 border-t-signal animate-[spin_24s_linear_infinite_reverse]" />
      <div className="absolute inset-10 rounded-full border border-white/10" />
      <div className="absolute inset-16 rounded-full border border-signal/60 border-b-transparent animate-[spin_12s_linear_infinite]" />

      {/* Target Reticle Crosshairs */}
      <div className="absolute w-full h-[1px] bg-white/20" />
      <div className="absolute h-full w-[1px] bg-white/20" />
      
      {/* Center Core HUD */}
      <div className="relative w-16 h-16 rounded-full bg-dark-surface border-2 border-signal flex items-center justify-center shadow-[0_0_25px_rgba(230,59,46,0.3)]">
        <span className="w-4 h-4 rounded-full bg-signal animate-signal-pulse" />
      </div>

      {/* Corner Coordinate Badges */}
      <div className="absolute top-2 left-2 font-mono text-[9px] text-white/40">
        R-01 // 360°
      </div>
      <div className="absolute bottom-2 right-2 font-mono text-[9px] text-signal font-bold">
        LOCKED // 0.4s
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   ANIMATION 2: Scanning Laser-Line Grid
-------------------------------------------------------------- */
function ScanningLaserGrid() {
  const gridCells = Array.from({ length: 48 });

  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl bg-black/60 border border-white/15 p-4 overflow-hidden flex flex-col justify-between">
      {/* 6x8 Matrix of data points */}
      <div className="grid grid-cols-6 gap-3 z-0">
        {gridCells.map((_, i) => (
          <div
            key={i}
            className={`h-6 rounded flex items-center justify-center font-mono text-[8px] transition-colors duration-500 ${
              i % 7 === 0
                ? 'bg-signal/20 text-signal border border-signal/40'
                : 'bg-white/5 text-white/20 border border-white/5'
            }`}
          >
            {`0x${(i * 3 + 12).toString(16).toUpperCase()}`}
          </div>
        ))}
      </div>

      {/* Sweeping Laser Line with Glow */}
      <div className="absolute inset-x-0 h-1 bg-signal shadow-[0_0_15px_#E63B2E] animate-[laserScan_3.5s_ease-in-out_infinite] z-10 pointer-events-none" />

      {/* Status Bar */}
      <div className="z-10 pt-2 border-t border-white/10 flex justify-between font-mono text-[10px]">
        <span className="text-white/40">NEURAL TAXONOMY MATRIX</span>
        <span className="text-signal font-bold">AUTONOMOUS</span>
      </div>

      <style>{`
        @keyframes laserScan {
          0% { top: 0%; opacity: 0.3; }
          50% { top: 96%; opacity: 1; }
          100% { top: 0%; opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

/* -------------------------------------------------------------
   ANIMATION 3: Pulsing Waveform (EKG Path Animation)
-------------------------------------------------------------- */
function PulsingWaveform() {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl bg-black/60 border border-white/15 p-6 flex flex-col justify-between overflow-hidden">
      {/* Waveform Canvas / SVG Container */}
      <div className="relative w-full h-36 flex items-center justify-center">
        {/* Background Grid Lines */}
        <div className="absolute inset-0 grid grid-rows-4 divide-y divide-white/10 opacity-30">
          <div></div><div></div><div></div><div></div>
        </div>

        {/* Dynamic EKG SVG */}
        <svg
          viewBox="0 0 300 100"
          className="w-full h-full overflow-visible z-10"
        >
          {/* Base Track */}
          <path
            d="M 0 50 L 50 50 L 70 20 L 90 85 L 115 10 L 135 65 L 155 50 L 210 50 L 225 35 L 240 65 L 255 50 L 300 50"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
          />

          {/* Animated Glowing Laser Stroke */}
          <path
            d="M 0 50 L 50 50 L 70 20 L 90 85 L 115 10 L 135 65 L 155 50 L 210 50 L 225 35 L 240 65 L 255 50 L 300 50"
            fill="none"
            stroke="#E63B2E"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="filter drop-shadow-[0_0_8px_#E63B2E]"
            style={{
              strokeDasharray: '600',
              strokeDashoffset: '600',
              animation: 'ekgDraw 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
            }}
          />
        </svg>
      </div>

      {/* Pulse Status */}
      <div className="pt-2 border-t border-white/10 flex justify-between font-mono text-[10px]">
        <span className="text-white/40">PEER SETTLEMENT FREQUENCY</span>
        <span className="text-signal font-bold">144 Hz SYNC</span>
      </div>

      <style>{`
        @keyframes ekgDraw {
          0% { stroke-dashoffset: 600; opacity: 0; }
          20% { opacity: 1; }
          80% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* -------------------------------------------------------------
   MAIN PROTOCOL STACKING SECTION
-------------------------------------------------------------- */
export default function Protocol() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;
    const ctx = gsap.context(() => {
      // Pinning & Stacking Effect for each card
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return; // Last card does not get stacked over

        const nextCard = cards[index + 1];

        ScrollTrigger.create({
          trigger: nextCard,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(card, {
              scale: 1 - progress * 0.1, // scales down to 0.9
              filter: `blur(${progress * 20}px)`, // blurs up to 20px
              opacity: 1 - progress * 0.5, // fades to 0.5
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const protocolCards = [
    {
      phase: "PHASE 01 // KINETIC INGESTION",
      title: "Sub-5 Second Sensor Ingest",
      badge: "LATENCY: 0.8s BENCHMARK",
      desc1: "Taps, webhooks, voice transients, or receipt photos stream directly into the local ledger buffer.",
      desc2: "Zero form fields to fill, zero friction at point of sale. Captured before you pull away from the counter.",
      color: "bg-[#161618]",
      border: "border-white/15",
      animation: <RotatingReticleAnimation />,
    },
    {
      phase: "PHASE 02 // NEURAL AUTO-TAXONOMY",
      title: "Zero-Setup Semantic Categorization",
      badge: "ZERO RULES REQUIRED",
      desc1: "Deterministic ledger intelligence maps raw transactions to commercial taxonomies and tax brackets.",
      desc2: "No manual spreadsheets, no tedious account linking. See your actual burn rate with zero prep work.",
      color: "bg-[#131316]",
      border: "border-signal/30",
      animation: <ScanningLaserGrid />,
    },
    {
      phase: "PHASE 03 // PEER SETTLEMENT FABRIC",
      title: "Discreet Peer Debt Resolution",
      badge: "ZERO AWKWARD DMs",
      desc1: "Shared dinners, group trips, and recurring rent splits resolve automatically through decentralized settlement links.",
      desc2: "Everyone pays their fair fraction cleanly without passive-aggressive reminders or awkward social friction.",
      color: "bg-[#0E0E10]",
      border: "border-white/15",
      animation: <PulsingWaveform />,
    },
  ];

  return (
    <section id="protocol" ref={containerRef} className="relative w-full bg-dark text-offwhite">
      {/* Intro Pinpoint Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 pt-24 pb-12 border-b border-white/10">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-signal font-bold mb-3">
          <span>■ SECTION 03 // STACKING PROTOCOL ARCHIVE</span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold uppercase tracking-tight text-offwhite">
          The Execution Protocol.
        </h2>
        <p className="mt-2 text-white/60 font-sans text-lg max-w-xl">
          Three stacked layers that turn raw personal cash flow into a high-precision, low-friction operating system.
        </p>
      </div>

      {/* 3 Full-Screen Stacking Cards */}
      <div className="relative">
        {protocolCards.map((card, idx) => (
          <div
            key={idx}
            ref={(el) => (cardsRef.current[idx] = el)}
            className="sticky top-0 h-[100dvh] w-full flex items-center justify-center p-4 sm:p-8 md:p-12"
          >
            <div
              className={`w-full max-w-6xl h-[80vh] min-h-[540px] rounded-[3rem] ${card.color} border-2 ${card.border} shadow-dark-soft p-8 sm:p-12 md:p-16 flex flex-col justify-between relative overflow-hidden backdrop-blur-2xl`}
            >
              {/* Card Top Monospace Info */}
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-signal animate-signal-pulse"></span>
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-signal">
                    {card.phase}
                  </span>
                </div>
                <div className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                  {card.badge}
                </div>
              </div>

              {/* Main Content & Interactive Visualization Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center my-auto">
                <div className="lg:col-span-7">
                  <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-3">
                    STEP 0{idx + 1} OF 03
                  </div>
                  <h3 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-offwhite tracking-tight uppercase mb-6 leading-tight">
                    {card.title}
                  </h3>
                  <p className="font-sans text-white/80 text-base sm:text-lg leading-relaxed mb-4">
                    {card.desc1}
                  </p>
                  <p className="font-sans text-white/60 text-sm sm:text-base leading-relaxed">
                    {card.desc2}
                  </p>
                </div>

                <div className="lg:col-span-5 flex items-center justify-center">
                  {card.animation}
                </div>
              </div>

              {/* Card Footer Status */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between font-mono text-xs text-white/40">
                <div className="flex items-center gap-2">
                  <CornerDownRight className="w-3.5 h-3.5 text-signal" />
                  <span>SPECIFICATION CODE: CARAMINE-PR-0{idx + 1}</span>
                </div>
                <div className="text-offwhite font-bold tracking-wider">
                  SCROLL TO ADVANCE NEXT PROTOCOL LAYER ↓
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
