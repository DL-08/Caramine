import React, { useState } from 'react';
import { PlusCircle, DollarSign, FileText, Calendar, Tag, Check, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../../services/transactionService';

export default function AddTransactionForm({ onAddTransaction }) {
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    amount: '',
    title: '',
    date: today,
    category: 'Groceries',
    type: 'expense',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount greater than $0.00');
      return;
    }
    if (!formData.title.trim()) {
      setError('Please provide a title or note for this transaction');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddTransaction({
        title: formData.title.trim(),
        amount: parseFloat(formData.amount),
        date: formData.date || today,
        category: formData.category,
        type: formData.type,
      });

      // Show temporary success feedback
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 2500);

      // Reset form
      setFormData({
        amount: '',
        title: '',
        date: today,
        category: formData.type === 'income' ? 'Salary' : 'Groceries',
        type: formData.type,
      });
    } catch (err) {
      setError('Failed to record transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-dark/10 shadow-sm relative overflow-hidden">
      {/* Accent Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-dark/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-signal text-white flex items-center justify-center shadow-brutalist-signal">
            <PlusCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-lg text-dark tracking-tight">
              Add Transaction
            </h3>
            <p className="text-xs font-sans text-dark/50">
              Record new ledger entry into PostgreSQL database
            </p>
          </div>
        </div>

        {/* Expense / Income Type Pill Selector */}
        <div className="inline-flex p-1 rounded-xl bg-offwhite border border-dark/10">
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, type: 'expense', category: 'Groceries' }))}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              formData.type === 'expense'
                ? 'bg-signal text-white shadow-sm'
                : 'text-dark/60 hover:text-dark'
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, type: 'income', category: 'Salary' }))}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              formData.type === 'income'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-dark/60 hover:text-dark'
            }`}
          >
            Income
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successMessage && (
        <div className="mb-4 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-mono flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Transaction recorded successfully to ledger buffer!</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 text-xs font-mono">
          {error}
        </div>
      )}

      {/* Form Inputs */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount Input */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase text-dark/70 mb-1.5">
            Amount ($ USD) *
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/40 font-mono font-bold text-base">
              $
            </span>
            <input
              type="number"
              name="amount"
              step="0.01"
              min="0.01"
              required
              placeholder="0.00"
              value={formData.amount}
              onChange={handleChange}
              className="w-full bg-offwhite border-2 border-dark/10 rounded-2xl pl-8 pr-4 py-3 text-lg font-mono font-bold text-dark placeholder:text-dark/30 focus:outline-none focus:border-signal focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Title / Note Input */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase text-dark/70 mb-1.5">
            Title / Note *
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/40">
              <FileText className="w-4 h-4" />
            </span>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Trader Joe's groceries, Apartment rent"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-offwhite border-2 border-dark/10 rounded-2xl pl-10 pr-4 py-2.5 text-sm font-sans text-dark placeholder:text-dark/30 focus:outline-none focus:border-signal focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Date and Category Two-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Date Picker */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-dark/70 mb-1.5">
              Date *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/40 pointer-events-none">
                <Calendar className="w-4 h-4" />
              </span>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-offwhite border-2 border-dark/10 rounded-2xl pl-10 pr-4 py-2.5 text-sm font-mono text-dark focus:outline-none focus:border-signal focus:bg-white transition-colors cursor-pointer"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-dark/70 mb-1.5">
              Category *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/40 pointer-events-none">
                <Tag className="w-4 h-4" />
              </span>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-offwhite border-2 border-dark/10 rounded-2xl pl-10 pr-4 py-2.5 text-sm font-sans font-medium text-dark focus:outline-none focus:border-signal focus:bg-white transition-colors cursor-pointer appearance-none"
              >
                {formData.type === 'expense' ? (
                  <>
                    <option value="Groceries">Groceries</option>
                    <option value="Rent">Rent</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Dining">Dining</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Other">Other</option>
                  </>
                ) : (
                  <>
                    <option value="Salary">Salary</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Investments">Investments</option>
                    <option value="Other">Other</option>
                  </>
                )}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-dark/40 text-xs">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Prominent Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-2xl bg-signal hover:bg-signal-hover text-white font-mono font-bold text-sm uppercase tracking-wider shadow-brutalist-signal transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70"
          >
            <PlusCircle className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
            <span>{isSubmitting ? 'Recording...' : formData.type === 'expense' ? 'Add Expense' : 'Add Income'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
