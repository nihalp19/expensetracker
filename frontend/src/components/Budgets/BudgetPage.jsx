import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Calendar } from 'lucide-react';
import { useExpense } from '../../context/ExpenseContext';
import BudgetList from './BudgetList';
import BudgetForm from './BudgetForm';
import BudgetSummaryChart from './BudgetSummaryChart';
import { formatMonth } from '../../utils/formatters';

const BudgetsPage = () => {
  const { budgets, deleteBudget, currentMonth, setCurrentMonth } = useExpense();
  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(undefined);
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);

  const handleAddClick = () => {
    setEditingBudget(undefined);
    setShowForm(true);
  };

  const handleEditClick = (budget) => {
    setEditingBudget(budget);
    setShowForm(true);
  };

  const handleMonthChange = (e) => {
    setCurrentMonth(e.target.value);
  };

  // Filter budgets for current month
  const monthlyBudgets = budgets.filter(budget => budget.month === currentMonth);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <motion.h2 
          className="text-2xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          Budget Management
        </motion.h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <button
              onClick={() => setIsMonthPickerOpen(!isMonthPickerOpen)}
              className="btn btn-secondary flex items-center"
            >
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
            <PlusCircle size={16} className="mr-1" /> Set Budget
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="md:col-span-2">
          <BudgetSummaryChart />
        </div>
      </div>

      <BudgetList
        budgets={monthlyBudgets}
        onEdit={handleEditClick}
        onDelete={deleteBudget}
      />

      <AnimatePresence>
        {showForm && (
          <BudgetForm
            onClose={() => {
              setShowForm(false);
              setEditingBudget(undefined);
            }}
            budget={editingBudget}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BudgetsPage;
