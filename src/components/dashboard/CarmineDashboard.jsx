import React, { useState, useEffect } from 'react';
import HeaderOverview from './HeaderOverview';
import AddTransactionForm from './AddTransactionForm';
import VisualAnalytics from './VisualAnalytics';
import RecentTransactionsList from './RecentTransactionsList';
import EditTransactionModal from './EditTransactionModal';
import PeerSplitPanel from './PeerSplitPanel';
import { transactionService } from '../../services/transactionService';
import {
  ArrowLeft,
  Download,
  Database,
  Terminal,
  Users,
} from 'lucide-react';

export default function CarmineDashboard({ onBackToLanding }) {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [backendNoticeOpen, setBackendNoticeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('ledger'); // 'ledger' | 'split'

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const data = await transactionService.getAll();
      setTransactions(data);
      setSummary(transactionService.calculateSummary(data));
    } catch (err) {
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (newTx) => {
    const created = await transactionService.create(newTx);
    const updated = [created, ...transactions];
    setTransactions(updated);
    setSummary(transactionService.calculateSummary(updated));
  };

  const handleOpenEdit = (tx) => {
    setEditingTransaction(tx);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (id, fields) => {
    await transactionService.update(id, fields);
    await loadTransactions();
  };

  const handleDeleteTransaction = async (id) => {
    await transactionService.delete(id);
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    setSummary(transactionService.calculateSummary(updated));
  };

  const handleResetSeed = async () => {
    if (window.confirm('Reset all transaction data to default demo seed?')) {
      const resetData = await transactionService.resetToSeed();
      setTransactions(resetData);
      setSummary(transactionService.calculateSummary(resetData));
    }
  };

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
    <div className="min-h-screen bg-offwhite text-dark selection:bg-signal selection:text-white">
      {/* ── Sticky App Bar ── */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b-2 border-dark/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-dark flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-signal animate-signal-pulse"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-dark uppercase">
                  CARMINE
                </span>
                <span className="text-signal text-sm font-mono">■</span>
                <span className="px-2 py-0.5 rounded-full bg-signal/10 text-signal font-mono text-[10px] font-bold uppercase tracking-wider">
                  DASHBOARD
                </span>
              </div>
              <p className="text-[10px] font-mono text-dark/40 hidden sm:block">
                POSTGRESQL-COMPATIBLE LEDGER ENGINE
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setBackendNoticeOpen(!backendNoticeOpen)}
              className="px-3 py-1.5 rounded-xl bg-offwhite hover:bg-dark/5 border border-dark/10 font-mono text-xs font-semibold text-dark/70 flex items-center gap-1.5 transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-signal" />
              <span className="hidden sm:inline">Backend Schema</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-xl bg-offwhite hover:bg-dark/5 border border-dark/10 font-mono text-xs font-semibold text-dark/70 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            {onBackToLanding && (
              <button
                onClick={onBackToLanding}
                className="btn-magnetic group px-4 py-1.5 rounded-xl bg-dark text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>Landing</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1 pb-0 border-t border-dark/5">
          <button
            onClick={() => setActiveTab('ledger')}
            className={`px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'ledger'
                ? 'border-signal text-signal'
                : 'border-transparent text-dark/40 hover:text-dark'
            }`}
          >
            Ledger & Analytics
          </button>
          <button
            onClick={() => setActiveTab('split')}
            className={`px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'split'
                ? 'border-signal text-signal'
                : 'border-transparent text-dark/40 hover:text-dark'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Peer Split
          </button>
        </div>
      </header>

      {/* ── Backend Notice ── */}
      {backendNoticeOpen && (
        <div className="bg-dark text-white border-b-2 border-signal px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-signal font-bold">
                <Terminal className="w-4 h-4" />
                <span>EXPRESS + NODE.JS + POSTGRESQL ARCHITECTURE READY</span>
              </div>
              <p className="text-white/70 font-sans text-sm">
                Swap{' '}
                <code className="text-signal bg-white/10 px-1 rounded">
                  transactionService.js
                </code>{' '}
                methods with REST calls to{' '}
                <code className="text-white/90">GET /api/transactions</code>,{' '}
                <code className="text-white/90">POST /api/transactions</code>.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[11px] font-bold">
                ✓ Schema Validated
              </span>
              <button
                onClick={() => setBackendNoticeOpen(false)}
                className="px-3 py-1 rounded bg-signal text-white font-bold hover:bg-signal-hover"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Workspace ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        {activeTab === 'ledger' && (
          <>
            {/* Overview Cards */}
            <HeaderOverview summary={summary} />

            {/* Add Transaction + Donut Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-8 items-stretch">
              <div className="lg:col-span-5 flex flex-col">
                <AddTransactionForm onAddTransaction={handleAddTransaction} />
              </div>
              <div className="lg:col-span-7 flex flex-col">
                <VisualAnalytics summary={summary} />
              </div>
            </div>

            {/* Recent Transactions */}
            <RecentTransactionsList
              transactions={transactions}
              onEditTransaction={handleOpenEdit}
              onDeleteTransaction={handleDeleteTransaction}
              onResetSeed={handleResetSeed}
            />
          </>
        )}

        {activeTab === 'split' && (
          <PeerSplitPanel transactions={transactions} />
        )}
      </main>

      {/* Edit Modal */}
      <EditTransactionModal
        transaction={editingTransaction}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        onDelete={handleDeleteTransaction}
      />
    </div>
  );
}
