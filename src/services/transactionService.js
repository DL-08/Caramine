/**
 * Transaction Service - Data Access Layer
 * 
 * Designed for seamless plug-and-play connection to an Express/Node.js backend
 * backed by PostgreSQL (e.g. pg / Prisma / Drizzle ORM).
 * 
 * To connect to your Express API, replace localStorage/in-memory methods
 * with fetch() calls to your backend endpoints:
 *   GET    /api/transactions
 *   POST   /api/transactions
 *   PUT    /api/transactions/:id
 *   DELETE /api/transactions/:id
 *   GET    /api/transactions/summary
 */

const STORAGE_KEY = 'carmine_transactions_v1';

// Initial realistic seed data
export const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-01',
    title: 'Whole Foods Market',
    amount: 142.85,
    type: 'expense',
    category: 'Groceries',
    date: '2026-10-16',
    createdAt: new Date('2026-10-16T14:20:00').toISOString(),
  },
  {
    id: 'tx-02',
    title: 'Monthly Loft Rent',
    amount: 1850.00,
    type: 'expense',
    category: 'Rent',
    date: '2026-10-01',
    createdAt: new Date('2026-10-01T09:00:00').toISOString(),
  },
  {
    id: 'tx-03',
    title: 'Consulting Retainer - TechCorp',
    amount: 4200.00,
    type: 'income',
    category: 'Salary',
    date: '2026-10-05',
    createdAt: new Date('2026-10-05T10:30:00').toISOString(),
  },
  {
    id: 'tx-04',
    title: 'Omakase Sushi Dinner',
    amount: 185.50,
    type: 'expense',
    category: 'Dining',
    date: '2026-10-14',
    createdAt: new Date('2026-10-14T20:45:00').toISOString(),
  },
  {
    id: 'tx-05',
    title: 'Criterion Channel & Cinema Tickets',
    amount: 54.00,
    type: 'expense',
    category: 'Entertainment',
    date: '2026-10-12',
    createdAt: new Date('2026-10-12T18:15:00').toISOString(),
  },
  {
    id: 'tx-06',
    title: 'Electric & Fiber Broadband',
    amount: 128.40,
    type: 'expense',
    category: 'Utilities',
    date: '2026-10-08',
    createdAt: new Date('2026-10-08T11:00:00').toISOString(),
  },
  {
    id: 'tx-07',
    title: 'UI Design System Project',
    amount: 1750.00,
    type: 'income',
    category: 'Freelance',
    date: '2026-10-10',
    createdAt: new Date('2026-10-10T16:00:00').toISOString(),
  },
  {
    id: 'tx-08',
    title: 'Metro Rapid Transit Pass',
    amount: 72.00,
    type: 'expense',
    category: 'Transportation',
    date: '2026-10-03',
    createdAt: new Date('2026-10-03T08:30:00').toISOString(),
  },
];

export const CATEGORIES = [
  { name: 'Groceries', color: '#10B981', bgColor: 'bg-emerald-500/10', textColor: 'text-emerald-500', borderColor: 'border-emerald-500/20' },
  { name: 'Rent', color: '#6366F1', bgColor: 'bg-indigo-500/10', textColor: 'text-indigo-500', borderColor: 'border-indigo-500/20' },
  { name: 'Entertainment', color: '#EC4899', bgColor: 'bg-pink-500/10', textColor: 'text-pink-500', borderColor: 'border-pink-500/20' },
  { name: 'Dining', color: '#F59E0B', bgColor: 'bg-amber-500/10', textColor: 'text-amber-500', borderColor: 'border-amber-500/20' },
  { name: 'Utilities', color: '#06B6D4', bgColor: 'bg-cyan-500/10', textColor: 'text-cyan-500', borderColor: 'border-cyan-500/20' },
  { name: 'Transportation', color: '#8B5CF6', bgColor: 'bg-purple-500/10', textColor: 'text-purple-500', borderColor: 'border-purple-500/20' },
  { name: 'Salary', color: '#22C55E', bgColor: 'bg-green-500/10', textColor: 'text-green-500', borderColor: 'border-green-500/20' },
  { name: 'Freelance', color: '#3B82F6', bgColor: 'bg-blue-500/10', textColor: 'text-blue-500', borderColor: 'border-blue-500/20' },
  { name: 'Other', color: '#64748B', bgColor: 'bg-slate-500/10', textColor: 'text-slate-500', borderColor: 'border-slate-500/20' },
];

export const transactionService = {
  // Fetch all transactions
  async getAll() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TRANSACTIONS));
        return INITIAL_TRANSACTIONS;
      }
      return JSON.parse(data);
    } catch (err) {
      console.warn('LocalStorage error, falling back to default seed:', err);
      return INITIAL_TRANSACTIONS;
    }
  },

  // Create a new transaction
  async create(newTx) {
    const transactions = await this.getAll();
    const createdItem = {
      ...newTx,
      id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      amount: parseFloat(newTx.amount),
      createdAt: new Date().toISOString(),
    };
    const updated = [createdItem, ...transactions];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return createdItem;
  },

  // Update existing transaction
  async update(id, updatedFields) {
    const transactions = await this.getAll();
    const updated = transactions.map((tx) =>
      tx.id === id
        ? {
            ...tx,
            ...updatedFields,
            amount: parseFloat(updatedFields.amount !== undefined ? updatedFields.amount : tx.amount),
          }
        : tx
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated.find((tx) => tx.id === id);
  },

  // Delete transaction
  async delete(id) {
    const transactions = await this.getAll();
    const filtered = transactions.filter((tx) => tx.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return { success: true, id };
  },

  // Reset to default seed
  async resetToSeed() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TRANSACTIONS));
    return INITIAL_TRANSACTIONS;
  },

  // Calculate summary metrics
  calculateSummary(transactions) {
    let income = 0;
    let expenses = 0;
    const categorySpending = {};

    transactions.forEach((tx) => {
      const val = parseFloat(tx.amount) || 0;
      if (tx.type === 'income') {
        income += val;
      } else {
        expenses += val;
        categorySpending[tx.category] = (categorySpending[tx.category] || 0) + val;
      }
    });

    const totalBalance = income - expenses;

    // Convert category spending to sorted array with percentages
    const categoryBreakdown = Object.entries(categorySpending).map(([category, amount]) => {
      const catConfig = CATEGORIES.find((c) => c.name.toLowerCase() === category.toLowerCase()) || {
        name: category,
        color: '#64748B',
      };
      return {
        category,
        amount,
        percentage: expenses > 0 ? ((amount / expenses) * 100).toFixed(1) : 0,
        color: catConfig.color,
      };
    }).sort((a, b) => b.amount - a.amount);

    return {
      totalBalance,
      monthlyIncome: income,
      monthlyExpenses: expenses,
      categoryBreakdown,
      savingsRate: income > 0 ? (((income - expenses) / income) * 100).toFixed(1) : 0,
    };
  },
};
