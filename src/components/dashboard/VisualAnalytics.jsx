import React, { useState } from 'react';
import { PieChart as PieIcon, Info, Sparkles, TrendingUp, BarChart2 } from 'lucide-react';

export default function VisualAnalytics({ summary }) {
  const { categoryBreakdown = [], monthlyExpenses = 0 } = summary || {};
  const [activeCategory, setActiveCategory] = useState(null);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(val);
  };

  // Calculate SVG Donut parameters
  const size = 220;
  const strokeWidth = 32;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Compute stroke-dasharray offsets for donut segments
  let accumulatedPercent = 0;
  const segments = categoryBreakdown.map((item) => {
    const percent = parseFloat(item.percentage) / 100;
    const strokeDasharray = `${percent * circumference} ${circumference}`;
    const strokeDashoffset = -accumulatedPercent * circumference;
    accumulatedPercent += percent;

    return {
      ...item,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  const highlightedItem = activeCategory
    ? categoryBreakdown.find((c) => c.category === activeCategory)
    : categoryBreakdown[0];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-dark/10 shadow-sm flex flex-col justify-between h-full">
      {/* Header with Container Title and Placeholder Integration Badge */}
      <div className="flex items-center justify-between pb-4 border-b border-dark/10 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-dark text-white flex items-center justify-center">
            <PieIcon className="w-4 h-4 text-signal" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-lg text-dark tracking-tight">
              Spending by Category
            </h3>
            <p className="text-xs font-sans text-dark/50">
              Visual analytics & expense distribution
            </p>
          </div>
        </div>

        {/* Integration Tag */}
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-offwhite border border-dark/10 font-mono text-[10px] text-dark/60 font-semibold uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-signal"></span>
          Recharts / Chart.js Canvas
        </span>
      </div>

      {/* Main Visual Analytics Chart Container */}
      {categoryBreakdown.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-12 text-center text-dark/40 font-mono text-xs">
          <BarChart2 className="w-10 h-10 mb-2 stroke-1 text-dark/20" />
          <span>No expense data recorded yet.</span>
          <span className="text-[10px] text-dark/30 mt-1">Add an expense to render distribution.</span>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Donut Chart Graphic */}
          <div className="relative flex items-center justify-center my-2">
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className="transform -rotate-90"
            >
              {/* Background circle track */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke="#F5F3EE"
                strokeWidth={strokeWidth}
              />

              {/* Animated Segment Arcs */}
              {segments.map((segment) => {
                const isHovered = activeCategory === segment.category;
                return (
                  <circle
                    key={segment.category}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={segment.color}
                    strokeWidth={isHovered ? strokeWidth + 6 : strokeWidth}
                    strokeDasharray={segment.strokeDasharray}
                    strokeDashoffset={segment.strokeDashoffset}
                    strokeLinecap="round"
                    className="cursor-pointer transition-all duration-300 hover:opacity-90"
                    onMouseEnter={() => setActiveCategory(segment.category)}
                    onMouseLeave={() => setActiveCategory(null)}
                  />
                );
              })}
            </svg>

            {/* Donut Center Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-[10px] font-mono uppercase font-bold text-dark/40 tracking-wider">
                {activeCategory ? activeCategory : 'Total Outflow'}
              </span>
              <span className="text-xl sm:text-2xl font-heading font-extrabold text-dark tracking-tight">
                {formatCurrency(activeCategory ? (highlightedItem?.amount || 0) : monthlyExpenses)}
              </span>
              <span className="text-[11px] font-mono font-bold text-signal">
                {activeCategory ? `${highlightedItem?.percentage}% of total` : `${categoryBreakdown.length} Categories`}
              </span>
            </div>
          </div>

          {/* Interactive Legend Grid */}
          <div className="w-full mt-6 pt-4 border-t border-dark/5 grid grid-cols-2 gap-2 sm:gap-3">
            {categoryBreakdown.slice(0, 6).map((item) => (
              <div
                key={item.category}
                onMouseEnter={() => setActiveCategory(item.category)}
                onMouseLeave={() => setActiveCategory(null)}
                className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                  activeCategory === item.category
                    ? 'bg-offwhite border-dark/20 shadow-sm scale-[1.02]'
                    : 'bg-white border-transparent hover:bg-offwhite/50'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-sans text-xs font-medium text-dark truncate">
                    {item.category}
                  </span>
                </div>
                <div className="text-right shrink-0 font-mono text-[11px]">
                  <span className="font-bold text-dark block leading-none">
                    {formatCurrency(item.amount)}
                  </span>
                  <span className="text-[10px] text-dark/40">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Container Footer note */}
      <div className="mt-4 pt-3 border-t border-dark/10 flex items-center justify-between text-[11px] font-mono text-dark/40">
        <span>Analytics Engine: Active</span>
        <span className="text-signal font-semibold">100% Client-Side Sync</span>
      </div>
    </div>
  );
}
