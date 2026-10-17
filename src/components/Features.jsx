import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Terminal, 
  Calendar, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  CreditCard, 
  Cpu, 
  Radio, 
  Users, 
  DollarSign,
  Layers,
  Sparkles
} from 'lucide-react';

/* -------------------------------------------------------------
   CARD 1: DIAGNOSTIC SHUFFLER
   Value Prop 1: "Add an expense in under 5 seconds"
   Interaction: 3 overlapping cards cycling with array.unshift(array.pop())
   every 3s with spring-bounce cubic-bezier(0.34, 1.56, 0.64, 1).
-------------------------------------------------------------- */
function DiagnosticShuffler() {
  const initialCards = [
    {
      id: 1,
      title: "Espresso Roast // Roastery",
      amount: "$4.80",
      time: "0.4s",
      method: "NFC Tap Sensor",
      category: "Fuel & Sustenance",
      tag: "INSTANT_INGEST",
      accent: "border-signal text-signal",
    },
    {
      id: 2,
      title: "AWS GPU Cluster // Compute",
      amount: "$328.50",
      time: "1.2s",
      method: "Invoice OCR Webhook",
      category: "Infrastructure",
      tag: "ZERO_TOUCH",
      accent: "border-dark text-dark",
    },
    {
      id: 3,
      title: "High-Speed Rail // Transit",
      amount: "$86.00",
      time: "0.8s",
      method: "One-Word Voice Log",
      category: "Logistics",
      tag: "SPEED_BENCHMARK",
      accent: "border-signal text-signal",
    },
  ];

  const [cards, setCards] = useState(initialCards);
  const [activeCycle, setActiveCycle] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      cycleCards();
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const cycleCards = () => {
    setCards((prev) => {
      const copy = [...prev];
      const popped = copy.pop();
      copy.unshift(popped);
      return copy;
    });
    setActiveCycle((c) => c + 1);
  };

  return (
    <div className="relative w-full h-[320px] flex flex-col justify-between">
      {/* HUD Telemetry Header */}
      <div className="flex items-center justify-between pb-3 border-b border-dark/10 font-mono text-xs">
        <div className="flex items-center gap-2 text-dark/70">
          <Clock className="w-3.5 h-3.5 text-signal" />
          <span>CAPTURE VELOCITY: &lt;5s</span>
        </div>
        <button
          onClick={cycleCards}
          className="interactive-lift text-[10px] uppercase font-bold text-signal hover:underline flex items-center gap-1"
        >
          <Layers className="w-3 h-3" />
          <span>Cycle Stack</span>
        </button>
      </div>

      {/* Shuffling Card Container */}
      <div className="relative w-full h-[220px] flex items-center justify-center">
        {cards.map((card, index) => {
          // Positions based on index: 0 is front, 1 is middle, 2 is back
          const translateY = index * 16;
          const scale = 1 - index * 0.06;
          const zIndex = 30 - index * 10;
          const opacity = 1 - index * 0.2;

          return (
            <div
              key={card.id}
              style={{
                transform: `translateY(${translateY}px) scale(${scale})`,
                zIndex,
                opacity,
                transition: 'all 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              className="absolute w-full top-2 bg-white border-2 border-dark rounded-2xl p-4 sm:p-5 shadow-brutalist flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-mono tracking-widest uppercase text-dark/50">
                    {card.method}
                  </div>
                  <div className="font-heading font-bold text-dark text-base sm:text-lg">
                    {card.title}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-xl text-dark">
                    {card.amount}
                  </div>
                  <div className="text-[10px] font-mono text-signal font-semibold">
                    ⏱ {card.time} log
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-dark/5 flex items-center justify-between font-mono text-[11px]">
                <span className="px-2 py-0.5 rounded bg-offwhite border border-dark/10 text-dark/80">
                  {card.category}
                </span>
                <span className="text-[10px] font-bold text-dark/40 tracking-wider">
                  #{card.tag}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between font-mono text-[11px] text-dark/60 pt-2">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-signal animate-signal-pulse"></span>
          Sub-second record latency
        </span>
        <span className="text-dark font-bold">AVG: 0.8s</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   CARD 2: TELEMETRY TYPEWRITER
   Value Prop 2: "See where your money goes without any setup"
   Interaction: Monospace live typewriter feed with blinking red cursor
   and dynamic live feed tag.
-------------------------------------------------------------- */
function TelemetryTypewriter() {
  const telemetryLogs = [
    "[AUTO-INGEST] $140.00 / Cloud CDN -> Auto-classified: Infrastructure (100% confidence)",
    "[ZERO-CONFIG] Discovered recurring subscription: Figma Team $45.00 -> Flagged discretionary",
    "[TAX-ROUTER] $820.00 Client Flight -> Segregated into Tax Envelope 2026.1",
    "[BURN-VELOCITY] Outflow tracking at $184/day -> Optimal runway: 28.4 months",
    "[TELEMETRY] Tap verified at Tokyo Terminal -> Converted JPY 12,400 to $81.20 automatically",
  ];

  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = telemetryLogs[currentLogIndex];
    let timeout;

    if (!isDeleting && displayText.length < fullText.length) {
      // Typing forward
      timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, 35);
    } else if (!isDeleting && displayText.length === fullText.length) {
      // Pause at full text
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
    } else if (isDeleting && displayText.length > 0) {
      // Deleting backwards
      timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length - 2));
      }, 18);
    } else if (isDeleting && displayText.length === 0) {
      // Move to next log
      setIsDeleting(false);
      setCurrentLogIndex((prev) => (prev + 1) % telemetryLogs.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentLogIndex]);

  return (
    <div className="relative w-full h-[320px] flex flex-col justify-between bg-dark rounded-2xl p-5 border-2 border-dark text-offwhite shadow-brutalist">
      {/* Live Feed Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-signal animate-signal-pulse"></span>
          <span className="text-signal font-bold tracking-widest uppercase">LIVE FEED</span>
        </div>
        <span className="text-[10px] text-white/40 tracking-widest uppercase">
          PROTOCOL: ZERO_RULES
        </span>
      </div>

      {/* Main Terminal Window */}
      <div className="flex-1 my-3 bg-black/60 rounded-xl p-4 border border-white/10 flex flex-col justify-between overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/40">
            <Cpu className="w-3 h-3 text-signal" />
            <span>NEURAL REVENUE & EXPENSE STREAM</span>
          </div>

          <div className="font-mono text-xs sm:text-sm text-offwhite leading-relaxed min-h-[70px]">
            <span>{displayText}</span>
            <span className="inline-block w-2 h-4 bg-signal ml-1 animate-pulse align-middle" />
          </div>
        </div>

        {/* Dynamic Category Micro-Pills */}
        <div className="pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center font-mono text-[10px]">
          <div className="bg-white/5 py-1.5 px-2 rounded border border-white/5">
            <span className="text-white/40 block">INFRA</span>
            <span className="text-signal font-bold">$1,420</span>
          </div>
          <div className="bg-white/5 py-1.5 px-2 rounded border border-white/5">
            <span className="text-white/40 block">OPERATING</span>
            <span className="text-offwhite font-bold">$680</span>
          </div>
          <div className="bg-white/5 py-1.5 px-2 rounded border border-white/5">
            <span className="text-white/40 block">DISCRETIONARY</span>
            <span className="text-white/70 font-bold">$210</span>
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="flex items-center justify-between font-mono text-[11px] text-white/50">
        <span className="text-white/70">Manual Configuration: 0 minutes</span>
        <span className="text-signal font-bold">100% UNTANGLED</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   CARD 3: CURSOR PROTOCOL SCHEDULER
   Value Prop 3: "Shared expenses without the awkwardness"
   Interaction: Weekly grid (S M T W T F S) where an animated SVG cursor
   enters, moves to a day cell, clicks (visual scale(0.95)), activates
   day (signal highlight), then clicks "Auto-Settle Split" before loop.
-------------------------------------------------------------- */
function CursorProtocolScheduler() {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [selectedDay, setSelectedDay] = useState(5); // Friday
  const [settled, setSettled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 20, y: 30 });
  const [isClicking, setIsClicking] = useState(false);

  // Animated cursor lifecycle
  useEffect(() => {
    let timer1, timer2, timer3, timer4, timer5;

    const runSequence = () => {
      // Step 1: Cursor moves to Friday (day index 5)
      setSettled(false);
      setCursorPos({ x: 210, y: 70 });

      // Step 2: Click Friday
      timer1 = setTimeout(() => {
        setIsClicking(true);
        setSelectedDay(5);
        timer2 = setTimeout(() => {
          setIsClicking(false);
        }, 200);
      }, 1000);

      // Step 3: Move to Settle Button
      timer3 = setTimeout(() => {
        setCursorPos({ x: 180, y: 175 });
      }, 1700);

      // Step 4: Click Settle Button
      timer4 = setTimeout(() => {
        setIsClicking(true);
        setSettled(true);
        timer5 = setTimeout(() => {
          setIsClicking(false);
        }, 200);
      }, 2400);
    };

    runSequence();
    const loopInterval = setInterval(runSequence, 4800);

    return () => {
      clearInterval(loopInterval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] flex flex-col justify-between bg-white rounded-2xl p-5 border-2 border-dark shadow-brutalist overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-dark/10 font-mono text-xs">
        <div className="flex items-center gap-2 text-dark font-bold">
          <Users className="w-3.5 h-3.5 text-signal" />
          <span>PEER SPLIT PROTOCOL</span>
        </div>
        <span className="text-[10px] font-mono text-dark/40 tracking-wider">
          ZERO-REMINDER ENGINE
        </span>
      </div>

      {/* Interactive Simulation Container */}
      <div className="relative flex-1 py-2 flex flex-col justify-around">
        {/* Weekly Day Cells */}
        <div>
          <div className="text-[10px] font-mono uppercase text-dark/50 mb-2 flex justify-between">
            <span>Select Group Event:</span>
            <span className="text-signal font-bold">Friday Tasting Menu ($240)</span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {days.map((day, idx) => {
              const isSelected = selectedDay === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDay(idx)}
                  className={`h-9 rounded-lg font-mono text-xs font-bold transition-all duration-300 flex items-center justify-center border-2 ${
                    isSelected
                      ? 'bg-signal text-white border-signal shadow-sm scale-105'
                      : 'bg-offwhite text-dark/70 border-dark/10 hover:border-dark'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Group Liability Preview */}
        <div className="bg-offwhite rounded-xl p-3 border border-dark/10 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-dark text-white flex items-center justify-center text-[10px] font-bold">
              3p
            </div>
            <div>
              <div className="text-dark font-bold text-[11px]">Alex, Maya & You</div>
              <div className="text-[10px] text-dark/50">Auto-calculated: $80.00 / each</div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-signal font-bold uppercase tracking-wider">
              No DMs needed
            </span>
          </div>
        </div>

        {/* Action Button that gets clicked by cursor */}
        <div>
          <button
            onClick={() => setSettled(true)}
            className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border-2 ${
              settled
                ? 'bg-dark text-white border-dark'
                : 'bg-signal text-white border-signal shadow-brutalist-signal'
            }`}
          >
            {settled ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Split Resolved via Mesh (0 Awkwardness)</span>
              </>
            ) : (
              <>
                <span>Auto-Settle & Dispatched</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Simulated Animated SVG Cursor */}
        <div
          style={{
            transform: `translate(${cursorPos.x}px, ${cursorPos.y}px) scale(${
              isClicking ? 0.88 : 1
            })`,
            transition: 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
          className="absolute pointer-events-none top-0 left-0 z-30"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
          >
            <polygon
              points="2,2 9,21 13,13 21,9"
              fill="#111111"
              stroke="#E63B2E"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {/* Footer Status */}
      <div className="flex items-center justify-between font-mono text-[11px] text-dark/60 border-t border-dark/10 pt-2">
        <span>Awkward reminder texts: 0</span>
        <span className="text-signal font-bold">100% REPUTATION SAVED</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   MAIN FEATURES SECTION
-------------------------------------------------------------- */
export default function Features() {
  return (
    <section id="features" className="relative w-full py-24 sm:py-32 px-6 sm:px-12 md:px-20 bg-paper">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 sm:mb-20 border-b-2 border-dark pb-8">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold uppercase tracking-tight text-dark">
            Software Micro-UIs.
          </h2>
        </div>

        {/* 3 Interactive Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {/* Card 1: Diagnostic Shuffler */}
          <div className="bg-offwhite rounded-[2.5rem] p-6 sm:p-8 border-2 border-dark shadow-soft flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-signal font-bold uppercase tracking-wider">
                  // ARTIFACT 01
                </span>
                <span className="px-2.5 py-1 rounded-full bg-dark text-white font-mono text-[10px] uppercase font-bold">
                  DIAGNOSTIC SHUFFLER
                </span>
              </div>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-dark mb-2">
                Add an expense in under 5 seconds.
              </h3>
              <p className="font-sans text-dark/70 text-sm mb-6 leading-relaxed">
                Sub-second capture through ambient NFC sensors, receipt OCR webhooks, and single-utterance voice logs. Never stall at checkout.
              </p>
            </div>

            <DiagnosticShuffler />
          </div>

          {/* Card 2: Telemetry Typewriter */}
          <div className="bg-offwhite rounded-[2.5rem] p-6 sm:p-8 border-2 border-dark shadow-soft flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-signal font-bold uppercase tracking-wider">
                  // ARTIFACT 02
                </span>
                <span className="px-2.5 py-1 rounded-full bg-signal text-white font-mono text-[10px] uppercase font-bold">
                  TELEMETRY TYPEWRITER
                </span>
              </div>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-dark mb-2">
                See where money goes without setup.
              </h3>
              <p className="font-sans text-dark/70 text-sm mb-6 leading-relaxed">
                Zero budget-building marathons. Neural classification maps cash flows into deterministic burn rates and tax categories automatically.
              </p>
            </div>

            <TelemetryTypewriter />
          </div>

          {/* Card 3: Cursor Protocol Scheduler */}
          <div className="bg-offwhite rounded-[2.5rem] p-6 sm:p-8 border-2 border-dark shadow-soft flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-signal font-bold uppercase tracking-wider">
                  // ARTIFACT 03
                </span>
                <span className="px-2.5 py-1 rounded-full bg-dark text-white font-mono text-[10px] uppercase font-bold">
                  PROTOCOL SCHEDULER
                </span>
              </div>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-dark mb-2">
                Shared expenses without awkwardness.
              </h3>
              <p className="font-sans text-dark/70 text-sm mb-6 leading-relaxed">
                No passive-aggressive group texts. Shared expenditures resolve cleanly through automated split links and peer mesh settlement.
              </p>
            </div>

            <CursorProtocolScheduler />
          </div>
        </div>
      </div>
    </section>
  );
}
