import React from 'react';
import { ArrowUpRight, Terminal, Github, Twitter, Disc as Discord, Shield, Cpu } from 'lucide-react';

export default function Footer({ onOpenTracker }) {
  return (
    <footer className="relative w-full bg-[#0B0B0D] text-offwhite rounded-t-[4rem] pt-20 pb-12 px-6 sm:px-12 md:px-20 border-t border-white/10 overflow-hidden">
      {/* Background Architectural Accent Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full grid grid-cols-6 divide-x divide-white">
          <div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Mission Statement */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 rounded-full bg-signal animate-signal-pulse"></span>
                <span className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight text-white uppercase">
                  CARAMINE
                </span>
                <span className="text-signal text-xl font-mono">■</span>
              </div>
              <p className="font-sans text-white/60 text-sm sm:text-base leading-relaxed max-w-sm mb-6">
                High-tech and sleek expense tracking for the high-velocity century.
                Sub-second logging, zero configuration overhead, and discreet peer settlements.
              </p>
            </div>

            {/* System Operational Status Indicator (Mandatory Requirement) */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-white/80 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4"></span>
              <span className="font-bold text-emerald-400">SYSTEM OPERATIONAL</span>
              <span className="text-white/40">// 99.99% UP // RTO: 0MS</span>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Product */}
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-signal font-bold mb-4">
                // SYSTEM
              </div>
              <ul className="space-y-2.5 font-mono text-xs text-white/70">
                <li>
                  <a href="#features" className="hover:text-white transition-colors flex items-center gap-1">
                    <span>Micro-UIs</span>
                  </a>
                </li>
                <li>
                  <a href="#protocol" className="hover:text-white transition-colors flex items-center gap-1">
                    <span>Protocol Archive</span>
                  </a>
                </li>
                <li>
                  <button onClick={onOpenTracker} className="hover:text-signal transition-colors text-left">
                    Live Speed Test
                  </button>
                </li>
                <li>
                  <a href="#philosophy" className="hover:text-white transition-colors">
                    The Manifesto
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors">
                    Tier Access
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Tech Specs */}
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-signal font-bold mb-4">
                // SPECS
              </div>
              <ul className="space-y-2.5 font-mono text-xs text-white/70">
                <li className="flex items-center gap-1 text-white/50">
                  <span>Engine: React 19</span>
                </li>
                <li className="flex items-center gap-1 text-white/50">
                  <span>Motion: GSAP 3</span>
                </li>
                <li className="flex items-center gap-1 text-white/50">
                  <span>Style: Tailwind Brutalist</span>
                </li>
                <li className="flex items-center gap-1 text-white/50">
                  <span>Cipher: AES-256 GCM</span>
                </li>
                <li className="flex items-center gap-1 text-white/50">
                  <span>Latency: &lt;500ms</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal & Verification */}
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-signal font-bold mb-4">
                // COMPLIANCE
              </div>
              <ul className="space-y-2.5 font-mono text-xs text-white/70">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Ledger
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Protocol
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Zero-Knowledge Proofs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security Disclosures
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/40">
          <div className="flex items-center gap-2">
            <span>© 2026 CARAMINE CORP.</span>
            <span>ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white/30">DESIGNED WITH RAW PRECISION</span>
            <div className="w-1.5 h-1.5 rounded-full bg-signal"></div>
            <span className="text-white/60">BRUTALIST SIGNAL THEME</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
