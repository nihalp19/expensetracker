// src/components/expense/ExpensesPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Calendar } from 'lucide-react';
import { useExpenseStore } from '../../stores/useExpenseStore';
import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';
import { formatMonth } from '../../utils/formatters';

const ExpensesPage = () => {
  const { expenses, deleteExpense, currentMonth, setCurrentMonth } = useExpenseStore();
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(undefined);
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);

  const handleAddClick = () => {
    setEditingExpense(undefined);
    setShowForm(true);
  };

  const handleEditClick = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleMonthChange = (e) => {
    setCurrentMonth(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <motion.h2
          className="text-2xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          Expenses
        </motion.h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <button onClick={() => setIsMonthPickerOpen(!isMonthPickerOpen)} className="btn btn-secondary flex items-center">
              <Calendar size={16} className="mr-2" />
              {formatMonth(currentMonth)}
            </button>
            <AnimatePresence>
              {isMonthPickerOpen && (
                <motion.div
                  className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 z-10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <input
                    type="month"
                    value={currentMonth}
                    onChange={handleMonthChange}
                    className="input"
                    onBlur={() => setIsMonthPickerOpen(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.button
            className="btn btn-primary flex items-center"
            onClick={handleAddClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <PlusCircle size={16} className="mr-1" /> Add Expense
          </motion.button>
        </div>
      </div>

      <ExpenseList expenses={expenses} onEdit={handleEditClick} onDelete={deleteExpense} currentMonth={currentMonth} />

      <AnimatePresence>
        {showForm && (
          <ExpenseForm
            onClose={() => {
              setShowForm(false);
              setEditingExpense(undefined);
            }}
            expense={editingExpense}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpensesPage;
