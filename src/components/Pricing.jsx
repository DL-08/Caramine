import React, { useState } from 'react';
import { Check, ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';

export default function Pricing({ onOpenTracker }) {
  const [annualBilling, setAnnualBilling] = useState(false);

  const tiers = [
    {
      name: "Essential",
      subtitle: "For personal cashflow velocity",
      price: annualBilling ? "$0" : "$0",
      period: "forever free",
      highlight: false,
      features: [
        "Sub-5s manual & tap logging",
        "Zero-configuration categorization",
        "Up to 3 peer split groups",
        "Local-first encrypted SQLite buffer",
        "CSV & JSON ledger export",
      ],
      cta: "Launch Essential",
      btnClass: "bg-dark text-white border-dark hover:bg-black",
    },
    {
      name: "Performance",
      subtitle: "The full sensory financial cockpit",
      price: annualBilling ? "$11" : "$14",
      period: "/ month, billed " + (annualBilling ? "annually" : "monthly"),
      highlight: true,
      badge: "MOST DEPLOYED PROTOCOL",
      features: [
        "Everything in Essential",
        "Instant OCR invoice & receipt webhooks",
        "Automated peer mesh debt settlement",
        "Zero awkward reminder automation",
        "Real-time burn rate & runway forecasting",
        "Multi-currency instant FX parity",
        "Tax envelope partitioning",
      ],
      cta: "Activate Performance",
      btnClass: "bg-signal text-white border-signal shadow-brutalist-signal hover:bg-signal-hover",
    },
    {
      name: "Enterprise",
      subtitle: "For venture teams and shared entities",
      price: annualBilling ? "$32" : "$39",
      period: "/ month per entity",
      highlight: false,
      features: [
        "Everything in Performance",
        "Multi-entity joint liability mesh",
        "Custom banking API & ERP webhooks",
        "Role-based expense approval tiers",
        "Dedicated consensus sync auditor",
        "24/7 Priority telemetric support",
      ],
      cta: "Deploy Enterprise",
      btnClass: "bg-dark text-white border-dark hover:bg-black",
    },
  ];

  return (
    <section id="pricing" className="relative w-full py-28 sm:py-36 px-6 sm:px-12 md:px-20 bg-paper">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-signal font-bold mb-3">
            <span>■ SECTION 04 // MEMBERSHIP ARCHIVE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold uppercase tracking-tight text-dark">
            Precision Pricing.
          </h2>
          <p className="mt-4 text-dark/70 font-sans text-base sm:text-lg">
            Choose your level of ledger velocity. No hidden usage barriers. No arbitrary seat penalizations.
          </p>

          {/* Billing Switcher Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-offwhite border-2 border-dark shadow-sm">
            <button
              onClick={() => setAnnualBilling(false)}
              className={`px-5 py-2 rounded-full font-mono text-xs font-bold transition-all duration-200 ${
                !annualBilling
                  ? 'bg-dark text-white'
                  : 'text-dark/60 hover:text-dark'
              }`}
            >
              MONTHLY
            </button>
            <button
              onClick={() => setAnnualBilling(true)}
              className={`px-5 py-2 rounded-full font-mono text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                annualBilling
                  ? 'bg-dark text-white'
                  : 'text-dark/60 hover:text-dark'
              }`}
            >
              <span>ANNUAL</span>
              <span className="text-[10px] bg-signal text-white px-2 py-0.5 rounded-full uppercase font-bold">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative ${
                tier.highlight
                  ? 'bg-offwhite border-4 border-signal ring-4 ring-signal/20 shadow-2xl lg:-translate-y-4 z-10'
                  : 'bg-white border-2 border-dark shadow-brutalist'
              }`}
            >
              {/* Highlight Badge */}
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-signal text-white font-mono text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{tier.badge}</span>
                </div>
              )}

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-dark">
                    {tier.name}
                  </h3>
                  <span className="font-mono text-xs text-dark/40 uppercase">
                    TIER 0{idx + 1}
                  </span>
                </div>
                <p className="font-sans text-xs text-dark/60 mb-6">
                  {tier.subtitle}
                </p>

                {/* Price Display */}
                <div className="mb-8 pb-6 border-b border-dark/10">
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading font-extrabold text-5xl sm:text-6xl text-dark tracking-tight">
                      {tier.price}
                    </span>
                    <span className="font-mono text-xs text-dark/60">
                      {tier.period}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3.5 mb-8">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-dark/40 font-bold">
                    INCLUDED CAPABILITIES:
                  </div>
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-signal/15 text-signal flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="font-sans text-sm text-dark/85 leading-snug">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onOpenTracker}
                className={`btn-magnetic group w-full py-4 rounded-2xl font-mono text-xs uppercase font-bold tracking-wider border-2 transition-all duration-300 ${tier.btnClass}`}
              >
                <span className="btn-slide bg-black"></span>
                <span className="btn-content relative z-10 flex items-center justify-center gap-2">
                  <span>{tier.cta}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
