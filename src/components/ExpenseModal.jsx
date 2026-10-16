import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Zap, Clock, Users, ArrowRight, Sparkles, DollarSign } from 'lucide-react';

export default function ExpenseModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState('18.50');
  const [description, setDescription] = useState('Roastery Cold Brew & Toast');
  const [splitCount, setSplitCount] = useState(1);
  const [logged, setLogged] = useState(false);
  const [timerMs, setTimerMs] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [finalTime, setFinalTime] = useState('0.74');

  useEffect(() => {
    let interval;
    if (isOpen) {
      setLogged(false);
      setIsTiming(true);
      setTimerMs(0);
      const startTime = performance.now();
      interval = setInterval(() => {
        setTimerMs(Math.round(performance.now() - startTime));
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTiming(false);
    const recordedSeconds = (timerMs / 1000).toFixed(2);
    setFinalTime(recordedSeconds);
    setLogged(true);
  };

  const perPerson = (parseFloat(amount || 0) / (splitCount || 1)).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-offwhite border-4 border-dark rounded-[2.5rem] shadow-2xl p-6 sm:p-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-dark mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-signal animate-signal-pulse"></span>
            <span className="font-mono text-xs font-bold tracking-widest text-dark uppercase">
              // TELEMETRY BENCHMARK LOG
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-dark/10 hover:bg-dark hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {logged ? (
          /* Success Screen */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-signal text-white mx-auto flex items-center justify-center mb-4 shadow-brutalist-signal">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            <h3 className="font-heading font-extrabold text-3xl uppercase tracking-tight text-dark mb-1">
              Expense Logged.
            </h3>
            <p className="font-mono text-sm text-signal font-bold mb-6">
              ⚡ INGEST VELOCITY: {finalTime}s (Target: &lt;5s achieved)
            </p>

            <div className="bg-white rounded-2xl border-2 border-dark p-4 text-left font-mono text-xs mb-6 shadow-brutalist space-y-2">
              <div className="flex justify-between border-b border-dark/10 pb-2">
                <span className="text-dark/50">ENTRY:</span>
                <span className="font-bold text-dark">{description}</span>
              </div>
              <div className="flex justify-between border-b border-dark/10 pb-2">
                <span className="text-dark/50">AMOUNT:</span>
                <span className="font-bold text-dark">${amount}</span>
              </div>
              <div className="flex justify-between border-b border-dark/10 pb-2">
                <span className="text-dark/50">AUTO-CLASSIFIED:</span>
                <span className="text-signal font-bold">Food & Fuel (Zero rules used)</span>
              </div>
              {splitCount > 1 && (
                <div className="flex justify-between pt-1">
                  <span className="text-dark/50">PEER SPLIT:</span>
                  <span className="text-dark font-bold">${perPerson} × {splitCount} peers (Dispatched)</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setLogged(false)}
                className="flex-1 py-3.5 rounded-xl bg-offwhite border-2 border-dark font-mono text-xs font-bold uppercase tracking-wider text-dark hover:bg-white transition-colors"
              >
                Log Another
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3.5 rounded-xl bg-signal border-2 border-signal font-mono text-xs font-bold uppercase tracking-wider text-white shadow-brutalist-signal hover:bg-signal-hover transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Active Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Live Stopwatch Indicator */}
            <div className="bg-dark text-white rounded-2xl p-4 flex items-center justify-between font-mono">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-signal animate-pulse" />
                <span className="text-xs text-white/70">SPEED BENCHMARK:</span>
              </div>
              <div className="text-xl font-bold text-signal">
                {(timerMs / 1000).toFixed(2)}s
              </div>
            </div>

            {/* Amount input */}
            <div>
              <label className="block font-mono text-xs uppercase font-bold text-dark mb-2">
                Amount ($ USD)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-mono font-bold text-dark/40">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-white border-2 border-dark rounded-xl pl-10 pr-4 py-3 font-mono text-2xl font-bold text-dark focus:outline-none focus:ring-2 focus:ring-signal"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Description input */}
            <div>
              <label className="block font-mono text-xs uppercase font-bold text-dark mb-2">
                Description / Merchant
              </label>
              <input
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white border-2 border-dark rounded-xl px-4 py-3 font-sans text-sm font-medium text-dark focus:outline-none focus:ring-2 focus:ring-signal"
                placeholder="e.g. AWS Cluster or Coffee"
              />
            </div>

            {/* Peer Split Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-xs uppercase font-bold text-dark flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-signal" />
                  <span>Split With Peers (0 Awkwardness)</span>
                </label>
                {splitCount > 1 && (
                  <span className="font-mono text-xs text-signal font-bold">
                    ${perPerson} / person
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((count) => (
                  <button
                    type="button"
                    key={count}
                    onClick={() => setSplitCount(count)}
                    className={`py-2 rounded-lg font-mono text-xs font-bold border-2 transition-all ${
                      splitCount === count
                        ? 'bg-signal text-white border-signal'
                        : 'bg-white text-dark border-dark/20 hover:border-dark'
                    }`}
                  >
                    {count === 1 ? 'Solo' : `${count} ways`}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="btn-magnetic group w-full py-4 rounded-2xl bg-signal text-white font-mono text-xs uppercase font-bold tracking-widest border-2 border-signal shadow-brutalist-signal hover:bg-signal-hover transition-all"
            >
              <span className="btn-slide bg-black"></span>
              <span className="btn-content relative z-10 flex items-center justify-center gap-2">
                <span>Record In &lt; 5 Seconds</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
