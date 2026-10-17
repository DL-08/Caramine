import React, { useState, useEffect } from 'react';
import HeaderOverview from './HeaderOverview';
import AddTransactionForm from './AddTransactionForm';
import VisualAnalytics from './VisualAnalytics';
import RecentTransactionsList from './RecentTransactionsList';
import EditTransactionModal from './EditTransactionModal';
import { transactionService } from '../../services/transactionService';
import { 
  ArrowLeft, 
  Download, 
  Database, 
  Terminal, 
  Cpu, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Layers,
  SlidersHorizontal
} from 'lucide-react';

export default function CarmineDashboard({ onBackToLanding, isEmbedded = true }) {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [backendNoticeOpen, setBackendNoticeOpen] = useState(false);

  // Load transactions on mount
  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const data = await transactionService.getAll();
      setTransactions(data);
      const computedSummary = transactionService.calculateSummary(data);
      setSummary(computedSummary);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new transaction handler
  const handleAddTransaction = async (newTx) => {
    const created = await transactionService.create(newTx);
    const updatedTransactions = [created, ...transactions];
    setTransactions(updatedTransactions);
    setSummary(transactionService.calculateSummary(updatedTransactions));
  };

  // Edit transaction handler
  const handleOpenEdit = (tx) => {
    setEditingTransaction(tx);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (id, updatedFields) => {
    await transactionService.update(id, updatedFields);
    await loadTransactions();
  };

  // Delete transaction handler
  const handleDeleteTransaction = async (id) => {
    await transactionService.delete(id);
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    setSummary(transactionService.calculateSummary(updated));
  };

  // Reset to initial seed
  const handleResetSeed = async () => {
    if (window.confirm('Reset all transaction data back to default demo seed?')) {
      const resetData = await transactionService.resetToSeed();
      setTransactions(resetData);
      setSummary(transactionService.calculateSummary(resetData));
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID,Title,Amount,Type,Category,Date,CreatedAt\n'];
    const rows = transactions.map(
      (tx) =>
        `"${tx.id}","${tx.title.replace(/"/g, '""')}",${tx.amount},"${tx.type}","${tx.category}","${tx.date}","${tx.createdAt}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `carmine-ledger-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="dashboard" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-offwhite text-dark scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header & Control Panel */}
        <div className="mb-10 pb-6 border-b-2 border-dark flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-signal font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-signal animate-signal-pulse"></span>
              <span>■ SECTION 00 // LIVE COCKPIT & LEDGER ENGINE</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold uppercase tracking-tight text-dark">
              Carmine Dashboard.
            </h2>
            <p className="mt-2 text-dark/70 font-sans text-base sm:text-lg max-w-2xl">
              Real-time financial telemetry engine. Log expenses, monitor cash flow, inspect visual category breakdowns, and export PostgreSQL-ready ledgers.
            </p>
          </div>

          {/* Action Navigation Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Backend Integration Info Toggle */}
            <button
              onClick={() => setBackendNoticeOpen(!backendNoticeOpen)}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-dark hover:text-white border-2 border-dark font-mono text-xs font-bold text-dark flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Database className="w-3.5 h-3.5 text-signal" />
              <span>Backend Architecture</span>
            </button>

            {/* Export CSV Button */}
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-dark hover:text-white border-2 border-dark font-mono text-xs font-bold text-dark flex items-center gap-1.5 transition-colors shadow-sm"
              title="Export ledger to CSV"
            >
              <Download className="w-3.5 h-3.5 text-signal" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Backend Architecture Notice Banner (Collapsible) */}
        {backendNoticeOpen && (
          <div className="mb-8 rounded-3xl bg-dark text-white border-2 border-signal p-5 sm:p-7 transition-all animate-in fade-in shadow-dark-soft">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-signal font-bold text-sm">
                  <Terminal className="w-4 h-4" />
                  <span>FULL-STACK ARCHITECTURE READY // EXPRESS + NODE.JS + POSTGRESQL</span>
                </div>
                <p className="text-white/80 font-sans text-xs sm:text-sm max-w-3xl leading-relaxed">
                  Every UI action flows through the modular <code className="text-signal bg-white/10 px-1.5 py-0.5 rounded">src/services/transactionService.js</code>. 
                  Connect this to your Express REST API (<code className="text-white font-semibold">GET /api/transactions</code>, <code className="text-white font-semibold">POST /api/transactions</code>) and PostgreSQL table without touching the frontend components.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  ✓ Schema Validated
                </span>
                <button
                  onClick={() => setBackendNoticeOpen(false)}
                  className="px-4 py-1.5 rounded-xl bg-signal text-white font-bold hover:bg-signal-hover transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Section 1: Header / Overview Cards */}
        <HeaderOverview summary={summary} />

        {/* Section 2 & 3: Two-column grid (Add Transaction Form + Visual Analytics Donut Chart) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-8 items-stretch">
          {/* Add Transaction Component (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col">
            <AddTransactionForm onAddTransaction={handleAddTransaction} />
          </div>

          {/* Visual Analytics Placeholder Container (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col">
            <VisualAnalytics summary={summary} />
          </div>
        </div>

        {/* Section 4: Recent Transactions List Table / Card View */}
        <RecentTransactionsList
          transactions={transactions}
          onEditTransaction={handleOpenEdit}
          onDeleteTransaction={handleDeleteTransaction}
          onResetSeed={handleResetSeed}
        />
      </div>

      {/* Edit Transaction Modal */}
      <EditTransactionModal
        transaction={editingTransaction}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        onDelete={handleDeleteTransaction}
      />
    </section>
  );
}
