import React from 'react';
import { motion } from 'framer-motion';
import { useExpense } from '../../context/ExpenseContext';
import { calculateTotalExpenses, calculateTotalBudget, getExpensesByMonth } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';

const BudgetOverviewCard = () => {
  const { expenses, budgets, currentMonth } = useExpense();

  const monthlyExpenses = getExpensesByMonth(expenses, currentMonth);
  const totalSpent = calculateTotalExpenses(monthlyExpenses);
  const totalBudget = calculateTotalBudget(budgets, currentMonth);

  const percentSpent = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  const remaining = totalBudget - totalSpent;

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <h3 className="text-lg font-semibold mb-4">Monthly Budget</h3>
      <div className="mb-2 flex justify-between">
        <span className="text-gray-600">Budget</span>
        <span className="font-medium">{formatCurrency(totalBudget)}</span>
      </div>
      <div className="mb-2 flex justify-between">
        <span className="text-gray-600">Spent</span>
        <span className="font-medium">{formatCurrency(totalSpent)}</span>
      </div>
      <div className="mb-4 flex justify-between">
        <span className="text-gray-600">Remaining</span>
        <span className={`font-medium ${remaining >= 0 ? 'text-success-600' : 'text-error-600'}`}>
          {formatCurrency(remaining)}
        </span>
      </div>

      <div className="mb-1 flex justify-between text-sm">
        <span>Progress</span>
        <span className={`${percentSpent > 100 ? 'text-error-600' : 'text-gray-600'}`}>
          {Math.round(percentSpent)}%
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${
            percentSpent > 100
              ? 'bg-error-500'
              : percentSpent > 80
              ? 'bg-warning-500'
              : 'bg-success-500'
          }`}
          initial={{ width: '0%' }}
          animate={{ width: `${Math.min(percentSpent, 100)}%` }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default BudgetOverviewCard;
