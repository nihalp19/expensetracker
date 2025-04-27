import create from 'zustand';

// Dummy categories data (move to separate file if needed)
const categories = [
  { id: 'food', name: 'Food', color: '#F87171', icon: '🍔' },
  { id: 'transport', name: 'Transport', color: '#60A5FA', icon: '🚗' },
  { id: 'entertainment', name: 'Entertainment', color: '#FBBF24', icon: '🎬' },
];

const getCurrentMonth = () => new Date().toISOString().slice(0, 7); // YYYY-MM

export const useBudgetStore = create((set, get) => ({
  categories,
  budgets: [],
  expenses: [], // you can add dummy expenses or load from API/localStorage
  currentMonth: getCurrentMonth(),

  addBudget: (budget) =>
    set((state) => ({
      budgets: [...state.budgets, { id: Date.now().toString(), ...budget }],
    })),

  updateBudget: (updatedBudget) =>
    set((state) => ({
      budgets: state.budgets.map((b) =>
        b.id === updatedBudget.id ? { ...b, ...updatedBudget } : b
      ),
    })),

  deleteBudget: (id) =>
    set((state) => ({
      budgets: state.budgets.filter((b) => b.id !== id),
    })),

  setCurrentMonth: (month) => set({ currentMonth: month }),

  // Optionally add expenses management here
}));
