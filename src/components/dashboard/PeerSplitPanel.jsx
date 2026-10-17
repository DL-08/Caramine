import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  X,
  Check,
  ChevronDown,
  ArrowRight,
  Copy,
  CheckCircle2,
  DollarSign,
  SplitSquareHorizontal,
  Trash2,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatCurrency(val) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(val || 0);
}

function generateSplitId() {
  return `SPL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

// ─── Member Chip ─────────────────────────────────────────────────────────────

function MemberChip({ name, paid, share, onRemove }) {
  const isPayer = paid;
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-2xl border-2 transition-all ${
        isPayer
          ? 'bg-emerald-50 border-emerald-300'
          : 'bg-white border-dark/10'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold uppercase ${
            isPayer ? 'bg-emerald-500 text-white' : 'bg-offwhite text-dark border border-dark/15'
          }`}
        >
          {name.charAt(0)}
        </div>
        <div>
          <div className="font-sans font-semibold text-sm text-dark leading-none">
            {name}
          </div>
          {isPayer && (
            <span className="font-mono text-[10px] text-emerald-600 font-bold uppercase">
              Paid
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <span className="font-mono text-sm font-bold text-dark">
          {formatCurrency(share)}
        </span>
        {onRemove && (
          <button
            onClick={onRemove}
            className="p-1 rounded-lg text-dark/40 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Active Split Card ────────────────────────────────────────────────────────

function SplitCard({ split, onSettle, onDelete }) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}?split=${split.id}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const owedByOthers = split.members
    .filter((m) => !m.paid)
    .reduce((sum, m) => sum + m.share, 0);

  const allPaid = split.members.every((m) => m.settled);

  return (
    <div
      className={`rounded-3xl border-2 p-5 sm:p-6 transition-all ${
        allPaid
          ? 'bg-emerald-50 border-emerald-300'
          : 'bg-white border-dark/10 shadow-soft'
      }`}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] text-dark/40 tracking-wider uppercase">
              {split.id}
            </span>
            {allPaid && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold">
                SETTLED
              </span>
            )}
          </div>
          <h4 className="font-heading font-bold text-lg text-dark">
            {split.title}
          </h4>
          <div className="flex items-center gap-3 mt-0.5 font-mono text-xs text-dark/50">
            <span>{split.date}</span>
            <span>•</span>
            <span>{split.members.length} participants</span>
          </div>
        </div>

        <div className="text-right">
          <div className="font-mono font-extrabold text-2xl text-dark">
            {formatCurrency(split.total)}
          </div>
          <div className="font-mono text-[11px] text-dark/50">
            {formatCurrency(split.members[0]?.share)} / person
          </div>
        </div>
      </div>

      {/* Members */}
      <div className="space-y-2 mb-4">
        {split.members.map((member, i) => (
          <div
            key={i}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border ${
              member.paid
                ? 'bg-emerald-50 border-emerald-200'
                : member.settled
                ? 'bg-offwhite border-dark/5'
                : 'bg-white border-dark/8'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold uppercase ${
                  member.paid
                    ? 'bg-emerald-500 text-white'
                    : member.settled
                    ? 'bg-dark text-white'
                    : 'bg-offwhite text-dark/60 border border-dark/15'
                }`}
              >
                {member.name.charAt(0)}
              </div>
              <span className="font-sans text-sm font-medium text-dark">
                {member.name}
              </span>
              {member.paid && (
                <span className="font-mono text-[10px] text-emerald-600 font-bold">
                  PAID
                </span>
              )}
              {member.settled && !member.paid && (
                <span className="font-mono text-[10px] text-dark/50 font-bold">
                  SETTLED
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-dark">
                {formatCurrency(member.share)}
              </span>
              {!member.paid && !member.settled && !allPaid && (
                <button
                  onClick={() => onSettle(split.id, i)}
                  className="px-2 py-0.5 rounded-lg bg-dark text-white font-mono text-[10px] font-bold hover:bg-black transition-colors"
                >
                  Settle
                </button>
              )}
              {!member.paid && member.settled && (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      {!allPaid && (
        <div className="flex items-center gap-2 pt-3 border-t border-dark/8">
          <div className="flex-1 font-mono text-xs text-dark/50">
            Still owed:{' '}
            <span className="font-bold text-dark">{formatCurrency(owedByOthers)}</span>
          </div>
          <button
            onClick={copyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-offwhite border border-dark/10 font-mono text-[11px] font-bold text-dark hover:bg-dark hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Share Link</span>
              </>
            )}
          </button>
          <button
            onClick={() => onDelete(split.id)}
            className="p-1.5 rounded-xl text-dark/30 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {allPaid && (
        <div className="flex items-center justify-between pt-3 border-t border-emerald-200">
          <div className="flex items-center gap-1.5 font-mono text-xs text-emerald-600 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>All debts cleared. Zero awkwardness.</span>
          </div>
          <button
            onClick={() => onDelete(split.id)}
            className="font-mono text-[11px] text-dark/30 hover:text-dark underline transition-colors"
          >
            Archive
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Create Split Modal ────────────────────────────────────────────────────

function CreateSplitModal({ isOpen, onClose, onCreate, transactions }) {
  const today = new Date().toISOString().split('T')[0];
  const [title, setTitle] = useState('');
  const [total, setTotal] = useState('');
  const [date, setDate] = useState(today);
  const [payerName, setPayerName] = useState('You');
  const [members, setMembers] = useState(['']);
  const [linkTx, setLinkTx] = useState('');

  // Auto-fill from linked transaction
  useEffect(() => {
    if (linkTx) {
      const tx = transactions.find((t) => t.id === linkTx);
      if (tx) {
        setTitle(tx.title);
        setTotal(tx.amount.toString());
        setDate(tx.date);
      }
    }
  }, [linkTx]);

  const addMember = () => setMembers((m) => [...m, '']);
  const removeMember = (i) =>
    setMembers((m) => m.filter((_, idx) => idx !== i));
  const updateMember = (i, val) =>
    setMembers((m) => m.map((x, idx) => (idx === i ? val : x)));

  const handleCreate = () => {
    const validMembers = members.filter((m) => m.trim());
    if (!title.trim() || !total || validMembers.length === 0) return;

    const allParticipants = [payerName.trim() || 'You', ...validMembers];
    const share = parseFloat(total) / allParticipants.length;

    const split = {
      id: generateSplitId(),
      title: title.trim(),
      total: parseFloat(total),
      date,
      members: allParticipants.map((name, i) => ({
        name,
        paid: i === 0, // first person is the payer
        settled: i === 0,
        share: parseFloat(share.toFixed(2)),
      })),
    };

    onCreate(split);
    // Reset
    setTitle('');
    setTotal('');
    setDate(today);
    setPayerName('You');
    setMembers(['']);
    setLinkTx('');
    onClose();
  };

  if (!isOpen) return null;

  const validMembers = members.filter((m) => m.trim()).length;
  const totalParticipants = validMembers + 1;
  const sharePreview =
    total && totalParticipants > 0
      ? parseFloat(total) / totalParticipants
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-3xl border-2 border-dark/15 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-dark/10 bg-offwhite">
          <div className="flex items-center gap-2">
            <SplitSquareHorizontal className="w-5 h-5 text-signal" />
            <h3 className="font-heading font-extrabold text-lg text-dark">
              New Split
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-dark/5 hover:bg-dark/10 text-dark/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Link to existing transaction */}
          {transactions.filter((t) => t.type === 'expense').length > 0 && (
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-dark/60 mb-1">
                Link to Existing Expense (optional)
              </label>
              <select
                value={linkTx}
                onChange={(e) => setLinkTx(e.target.value)}
                className="w-full bg-offwhite border-2 border-dark/10 rounded-xl px-3 py-2 text-sm font-sans text-dark focus:outline-none focus:border-signal"
              >
                <option value="">— Select expense —</option>
                {transactions
                  .filter((t) => t.type === 'expense')
                  .map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title} — {formatCurrency(t.amount)}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-dark/60 mb-1">
              What's it for? *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Omakase dinner, Airbnb, Ski trip"
              className="w-full bg-offwhite border-2 border-dark/10 rounded-xl px-3 py-2.5 text-sm font-sans text-dark focus:outline-none focus:border-signal"
            />
          </div>

          {/* Total + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-dark/60 mb-1">
                Total Amount *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-bold text-dark/40">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-offwhite border-2 border-dark/10 rounded-xl pl-6 pr-3 py-2.5 text-sm font-mono font-bold text-dark focus:outline-none focus:border-signal"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-dark/60 mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-offwhite border-2 border-dark/10 rounded-xl px-3 py-2.5 text-sm font-mono text-dark focus:outline-none focus:border-signal"
              />
            </div>
          </div>

          {/* Payer */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-dark/60 mb-1">
              Who paid? (Payer)
            </label>
            <input
              type="text"
              value={payerName}
              onChange={(e) => setPayerName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-offwhite border-2 border-dark/10 rounded-xl px-3 py-2.5 text-sm font-sans text-dark focus:outline-none focus:border-signal"
            />
          </div>

          {/* Split with (other members) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono font-bold uppercase text-dark/60">
                Split With *
              </label>
              <button
                onClick={addMember}
                className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-signal hover:underline"
              >
                <UserPlus className="w-3 h-3" />
                Add Person
              </button>
            </div>
            <div className="space-y-2">
              {members.map((name, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => updateMember(i, e.target.value)}
                    placeholder={`Person ${i + 2} name`}
                    className="flex-1 bg-offwhite border-2 border-dark/10 rounded-xl px-3 py-2 text-sm font-sans text-dark focus:outline-none focus:border-signal"
                  />
                  {members.length > 1 && (
                    <button
                      onClick={() => removeMember(i)}
                      className="p-1.5 rounded-lg text-dark/30 hover:text-rose-600 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Live Preview */}
          {total && validMembers > 0 && (
            <div className="p-3.5 rounded-2xl bg-signal/5 border border-signal/20">
              <div className="font-mono text-xs text-dark/60 mb-1">
                SPLIT PREVIEW
              </div>
              <div className="flex items-center justify-between font-mono">
                <span className="text-sm text-dark">
                  {formatCurrency(parseFloat(total))} ÷{' '}
                  {totalParticipants} people
                </span>
                <span className="text-lg font-extrabold text-signal">
                  {formatCurrency(sharePreview)} each
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-dark/10 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-2xl bg-offwhite border-2 border-dark/10 font-mono text-xs font-bold text-dark hover:bg-dark/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!title.trim() || !total || members.filter((m) => m.trim()).length === 0}
            className="flex-1 py-2.5 rounded-2xl bg-signal text-white font-mono text-xs font-bold uppercase tracking-wider shadow-brutalist-signal hover:bg-signal-hover transition-all disabled:opacity-40 flex items-center justify-center gap-1.5"
          >
            <SplitSquareHorizontal className="w-4 h-4" />
            Create Split
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Peer Split Panel ─────────────────────────────────────────────────

const STORAGE_KEY = 'carmine_splits_v1';

export default function PeerSplitPanel({ transactions = [] }) {
  const [splits, setSplits] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Load splits from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSplits(JSON.parse(stored));
    } catch {}
  }, []);

  const persistSplits = (updated) => {
    setSplits(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleCreate = (split) => {
    persistSplits([split, ...splits]);
  };

  const handleSettle = (splitId, memberIdx) => {
    const updated = splits.map((s) => {
      if (s.id !== splitId) return s;
      const newMembers = s.members.map((m, i) =>
        i === memberIdx ? { ...m, settled: true } : m
      );
      return { ...s, members: newMembers };
    });
    persistSplits(updated);
  };

  const handleDelete = (splitId) => {
    persistSplits(splits.filter((s) => s.id !== splitId));
  };

  const totalOwed = splits.reduce((sum, s) => {
    return (
      sum +
      s.members.filter((m) => !m.paid && !m.settled).reduce((a, m) => a + m.share, 0)
    );
  }, 0);

  const activeSplits = splits.filter((s) => !s.members.every((m) => m.settled));
  const settledSplits = splits.filter((s) => s.members.every((m) => m.settled));

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 pb-6 border-b-2 border-dark flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold uppercase tracking-tight text-dark">
            Peer Split Protocol
          </h2>
          <p className="mt-1 text-dark/60 font-sans text-sm sm:text-base max-w-lg">
            Split expenses fairly and settle debts automatically — no awkward
            reminder texts, no mental math.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="btn-magnetic group inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-signal text-white font-mono text-xs font-bold uppercase tracking-wider shadow-brutalist-signal hover:bg-signal-hover transition-all"
        >
          <SplitSquareHorizontal className="w-4 h-4" />
          <span>New Split</span>
        </button>
      </div>

      {/* Summary Stats */}
      {splits.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-3xl p-5 border-2 border-dark/10">
            <div className="text-xs font-mono uppercase text-dark/50 mb-1">
              Active Splits
            </div>
            <div className="text-2xl font-heading font-extrabold text-dark">
              {activeSplits.length}
            </div>
          </div>
          <div className="bg-white rounded-3xl p-5 border-2 border-dark/10">
            <div className="text-xs font-mono uppercase text-dark/50 mb-1">
              Still Owed
            </div>
            <div className="text-2xl font-heading font-extrabold text-dark">
              {formatCurrency(totalOwed)}
            </div>
          </div>
          <div className="bg-white rounded-3xl p-5 border-2 border-dark/10">
            <div className="text-xs font-mono uppercase text-dark/50 mb-1">
              Settled
            </div>
            <div className="text-2xl font-heading font-extrabold text-emerald-600">
              {settledSplits.length}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {splits.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-3xl bg-signal/10 border-2 border-signal/20 flex items-center justify-center mb-5">
            <Users className="w-8 h-8 text-signal" />
          </div>
          <h3 className="font-heading font-bold text-xl text-dark mb-2">
            No splits yet
          </h3>
          <p className="font-sans text-dark/50 text-sm max-w-xs mb-6">
            Create your first split to fairly divide a shared expense among
            friends, colleagues, or housemates.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-signal text-white font-mono text-xs font-bold uppercase tracking-wider shadow-brutalist-signal hover:bg-signal-hover transition-all"
          >
            <SplitSquareHorizontal className="w-4 h-4" />
            Create First Split
          </button>
        </div>
      )}

      {/* Active Splits */}
      {activeSplits.length > 0 && (
        <div className="mb-8">
          <h3 className="font-mono text-xs uppercase font-bold text-dark/50 tracking-wider mb-4">
            Active ({activeSplits.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeSplits.map((split) => (
              <SplitCard
                key={split.id}
                split={split}
                onSettle={handleSettle}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Settled Archive */}
      {settledSplits.length > 0 && (
        <div>
          <h3 className="font-mono text-xs uppercase font-bold text-dark/50 tracking-wider mb-4">
            Settled Archive ({settledSplits.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {settledSplits.map((split) => (
              <SplitCard
                key={split.id}
                split={split}
                onSettle={handleSettle}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Create Split Modal */}
      <CreateSplitModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
        transactions={transactions}
      />
    </div>
  );
}
