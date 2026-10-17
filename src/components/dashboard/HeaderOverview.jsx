import React from 'react';
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, DollarSign, PiggyBank } from 'lucide-react';

export default function HeaderOverview({ summary }) {
  const { totalBalance = 0, monthlyIncome = 0, monthlyExpenses = 0, savingsRate = 0 } = summary || {};

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(val);
  };

  return (
    <section aria-label="Financial Overview" className="mb-8">
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-dark tracking-tight">
            Financial Overview
          </h2>
          <p className="text-xs sm:text-sm font-sans text-dark/60">
            Real-time balance, cash flow, and liquidity position
          </p>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-dark/10 shadow-sm w-fit font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-dark/70 font-semibold">Ledger Synced</span>
          <span className="text-dark/40">•</span>
          <span className="text-dark/50">October 2026</span>
        </div>
      </div>

      {/* Modern Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Card 1: Total Balance */}
        <div className="relative overflow-hidden bg-white rounded-3xl p-6 border-2 border-dark/10 shadow-sm hover:shadow-md transition-all duration-300 group">
          {/* Subtle background glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-signal/5 rounded-full blur-2xl group-hover:bg-signal/10 transition-colors"></div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-dark/60">
              Total Balance
            </span>
            <div className="w-10 h-10 rounded-2xl bg-dark text-white flex items-center justify-center shadow-sm">
              <Wallet className="w-5 h-5 text-signal" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-dark">
              {formatCurrency(totalBalance)}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center text-xs font-mono font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                +{savingsRate}%
              </span>
              <span className="text-xs font-sans text-dark/50">
                savings rate this month
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Monthly Income */}
        <div className="relative overflow-hidden bg-white rounded-3xl p-6 border-2 border-dark/10 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-dark/60">
              Monthly Income
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-dark">
              {formatCurrency(monthlyIncome)}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center text-xs font-mono font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                Active Flow
              </span>
              <span className="text-xs font-sans text-dark/50">
                from salary & freelance
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Monthly Expenses */}
        <div className="relative overflow-hidden bg-white rounded-3xl p-6 border-2 border-dark/10 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-signal/5 rounded-full blur-2xl group-hover:bg-signal/10 transition-colors"></div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-dark/60">
              Monthly Expenses
            </span>
            <div className="w-10 h-10 rounded-2xl bg-signal/15 text-signal flex items-center justify-center">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-dark">
              {formatCurrency(monthlyExpenses)}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center text-xs font-mono font-semibold text-signal bg-signal/10 px-2 py-0.5 rounded-full">
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                Outflow
              </span>
              <span className="text-xs font-sans text-dark/50">
                across all categories
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
