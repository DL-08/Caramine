import React, { useState } from 'react';
import { 
  Edit3, 
  Trash2, 
  Search, 
  Filter, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Calendar, 
  Tag, 
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { CATEGORIES } from '../../services/transactionService';

export default function RecentTransactionsList({ 
  transactions = [], 
  onEditTransaction, 
  onDeleteTransaction,
  onResetSeed 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'expense' | 'income'
  const [selectedCategory, setSelectedCategory] = useState('all');

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(val);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(parts[0], parts[1] - 1, parts[2]);
        return d.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  const getCategoryConfig = (catName) => {
    return (
      CATEGORIES.find((c) => c.name.toLowerCase() === (catName || '').toLowerCase()) || {
        name: catName,
        bgColor: 'bg-slate-500/10',
        textColor: 'text-slate-600',
        borderColor: 'border-slate-500/20',
      }
    );
  };

  // Filtered transactions
  const filtered = transactions.filter((tx) => {
    const matchesSearch =
      tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || tx.type === filterType;
    const matchesCategory = selectedCategory === 'all' || tx.category === selectedCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <section aria-label="Recent Transactions" className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-dark/10 shadow-sm">
      {/* Header with Title and Search/Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-dark/10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-dark tracking-tight">
              Recent Transactions
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-offwhite border border-dark/10 text-xs font-mono font-bold text-dark/70">
              {filtered.length} entries
            </span>
          </div>
          <p className="text-xs font-sans text-dark/50 mt-0.5">
            Real-time ledger entries mapped to PostgreSQL schema
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Bar */}
          <div className="relative flex-1 sm:w-60">
            <Search className="w-4 h-4 text-dark/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search note or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-offwhite border border-dark/10 rounded-xl pl-9 pr-3 py-1.5 text-xs font-sans text-dark focus:outline-none focus:border-signal"
            />
          </div>

          {/* Type Filter Pills */}
          <div className="inline-flex p-1 rounded-xl bg-offwhite border border-dark/10 text-xs font-mono">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                filterType === 'all' ? 'bg-dark text-white' : 'text-dark/60 hover:text-dark'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('expense')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                filterType === 'expense' ? 'bg-signal text-white' : 'text-dark/60 hover:text-dark'
              }`}
            >
              Expenses
            </button>
            <button
              onClick={() => setFilterType('income')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                filterType === 'income' ? 'bg-emerald-600 text-white' : 'text-dark/60 hover:text-dark'
              }`}
            >
              Income
            </button>
          </div>

          {/* Reset Seed Button */}
          {onResetSeed && (
            <button
              onClick={onResetSeed}
              title="Reset to default mock transactions"
              className="p-2 rounded-xl bg-offwhite hover:bg-dark/10 text-dark/60 hover:text-dark transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Transactions Table for Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-dark/10 text-[11px] font-mono uppercase font-bold text-dark/40 tracking-wider">
              <th className="pb-3 pl-2">Date</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Title / Note</th>
              <th className="pb-3 text-right">Amount</th>
              <th className="pb-3 text-right pr-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark/5">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-xs font-mono text-dark/40">
                  No transactions found matching your criteria.
                </td>
              </tr>
            ) : (
              filtered.map((tx) => {
                const cat = getCategoryConfig(tx.category);
                const isExpense = tx.type === 'expense';

                return (
                  <tr
                    key={tx.id}
                    className="hover:bg-offwhite/50 transition-colors group"
                  >
                    {/* Date Column */}
                    <td className="py-3.5 pl-2 font-mono text-xs text-dark/60 whitespace-nowrap">
                      {formatDate(tx.date)}
                    </td>

                    {/* Category Column */}
                    <td className="py-3.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${cat.bgColor} ${cat.textColor} ${cat.borderColor}`}
                      >
                        <Tag className="w-3 h-3" />
                        <span>{tx.category}</span>
                      </span>
                    </td>

                    {/* Note/Title Column */}
                    <td className="py-3.5 pr-4">
                      <div className="font-sans text-sm font-semibold text-dark">
                        {tx.title}
                      </div>
                    </td>

                    {/* Amount Column */}
                    <td className="py-3.5 text-right font-mono text-sm font-bold whitespace-nowrap">
                      <span
                        className={
                          isExpense ? 'text-dark' : 'text-emerald-600 font-extrabold'
                        }
                      >
                        {isExpense ? '-' : '+'}
                        {formatCurrency(tx.amount)}
                      </span>
                    </td>

                    {/* Action Icons Column */}
                    <td className="py-3.5 text-right pr-2 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        {/* Edit Button */}
                        <button
                          onClick={() => onEditTransaction(tx)}
                          title="Edit transaction"
                          aria-label={`Edit ${tx.title}`}
                          className="p-1.5 rounded-lg bg-offwhite hover:bg-dark hover:text-white text-dark/70 transition-all duration-150 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => onDeleteTransaction(tx.id)}
                          title="Delete transaction"
                          aria-label={`Delete ${tx.title}`}
                          className="p-1.5 rounded-lg bg-offwhite hover:bg-rose-600 hover:text-white text-rose-500 transition-all duration-150 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 ? (
          <div className="py-8 text-center text-xs font-mono text-dark/40">
            No transactions found matching your criteria.
          </div>
        ) : (
          filtered.map((tx) => {
            const cat = getCategoryConfig(tx.category);
            const isExpense = tx.type === 'expense';

            return (
              <div
                key={tx.id}
                className="bg-offwhite rounded-2xl p-4 border border-dark/10 flex flex-col justify-between gap-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border mb-1.5 ${cat.bgColor} ${cat.textColor} ${cat.borderColor}`}
                    >
                      <Tag className="w-2.5 h-2.5" />
                      <span>{tx.category}</span>
                    </span>
                    <h4 className="font-sans font-bold text-sm text-dark">
                      {tx.title}
                    </h4>
                    <span className="font-mono text-[11px] text-dark/50">
                      {formatDate(tx.date)}
                    </span>
                  </div>

                  <div className="text-right">
                    <span
                      className={`font-mono text-base font-bold block ${
                        isExpense ? 'text-dark' : 'text-emerald-600 font-extrabold'
                      }`}
                    >
                      {isExpense ? '-' : '+'}
                      {formatCurrency(tx.amount)}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-dark/10 flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEditTransaction(tx)}
                    className="px-3 py-1 rounded-lg bg-white border border-dark/10 text-xs font-mono font-semibold text-dark flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => onDeleteTransaction(tx.id)}
                    className="px-3 py-1 rounded-lg bg-rose-50 border border-rose-200 text-xs font-mono font-semibold text-rose-600 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
