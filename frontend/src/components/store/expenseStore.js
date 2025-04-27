// src/stores/useExpenseStore.js
import create from 'zustand';
import { categories } from '../data/categories';

const getCurrentMonth = () => new Date().toISOString().slice(0, 7); // YYYY-MM

export const useExpenseStore = create((set) => ({
  categories,
  expenses: [],

  currentMonth: getCurrentMonth(),

  addExpense: (expense) =>
    set((state) => ({
      expenses: [...state.expenses, { id: Date.now().toString(), ...expense }],
    })),

  updateExpense: (updatedExpense) =>
    set((state) => ({
      expenses: state.expenses.map((e) =>
        e.id === updatedExpense.id ? { ...e, ...updatedExpense } : e
      ),
    })),

  deleteExpense: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((e) => e.id !== id),
    })),

  setCurrentMonth: (month) => set({ currentMonth: month }),
}));
