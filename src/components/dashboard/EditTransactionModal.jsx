import React, { useState, useEffect } from 'react';
import { X, Check, FileText, Calendar, Tag, DollarSign, Trash2 } from 'lucide-react';
import { CATEGORIES } from '../../services/transactionService';

export default function EditTransactionModal({ transaction, isOpen, onClose, onSave, onDelete }) {
  if (!isOpen || !transaction) return null;

  const [formData, setFormData] = useState({
    title: transaction.title || '',
    amount: transaction.amount || '',
    date: transaction.date || '',
    category: transaction.category || 'Groceries',
    type: transaction.type || 'expense',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (transaction) {
      setFormData({
        title: transaction.title,
        amount: transaction.amount,
        date: transaction.date,
        category: transaction.category,
        type: transaction.type,
      });
    }
  }, [transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(transaction.id, {
        title: formData.title.trim(),
        amount: parseFloat(formData.amount),
        date: formData.date,
        category: formData.category,
        type: formData.type,
      });
      onClose();
    } catch (err) {
      console.error('Failed to update:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl border-2 border-dark/15 shadow-2xl p-6 sm:p-7 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-dark/10 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-signal"></span>
            <h3 className="font-heading font-extrabold text-lg text-dark tracking-tight">
              Edit Transaction
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-offwhite text-dark/60 hover:text-dark hover:bg-dark/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type Toggle */}
          <div className="flex p-1 rounded-xl bg-offwhite border border-dark/10">
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, type: 'expense' }))}
              className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                formData.type === 'expense'
                  ? 'bg-signal text-white shadow-sm'
                  : 'text-dark/60 hover:text-dark'
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, type: 'income' }))}
              className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                formData.type === 'income'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-dark/60 hover:text-dark'
              }`}
            >
              Income
            </button>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-dark/70 mb-1">
              Amount ($ USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/40 font-mono font-bold">
                $
              </span>
              <input
                type="number"
                name="amount"
                step="0.01"
                required
                value={formData.amount}
                onChange={handleChange}
                className="w-full bg-offwhite border-2 border-dark/10 rounded-xl pl-8 pr-4 py-2 text-base font-mono font-bold text-dark focus:outline-none focus:border-signal focus:bg-white"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-dark/70 mb-1">
              Title / Note
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-offwhite border-2 border-dark/10 rounded-xl px-4 py-2 text-sm font-sans text-dark focus:outline-none focus:border-signal focus:bg-white"
            />
          </div>

          {/* Date & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-dark/70 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-offwhite border-2 border-dark/10 rounded-xl px-3 py-2 text-xs font-mono text-dark focus:outline-none focus:border-signal focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-dark/70 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-offwhite border-2 border-dark/10 rounded-xl px-3 py-2 text-xs font-sans text-dark focus:outline-none focus:border-signal focus:bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                onDelete(transaction.id);
                onClose();
              }}
              className="py-2.5 px-4 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-mono text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl bg-offwhite hover:bg-dark/5 text-dark font-mono text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-2.5 px-5 rounded-xl bg-signal hover:bg-signal-hover text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
