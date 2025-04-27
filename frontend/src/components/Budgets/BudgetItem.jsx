// src/components/budget/BudgetItem.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { useBudgetStore } from '../../stores/useBudgetStore';
import { calculateCategoryTotals, getExpensesByMonth } from '../../utils/calculations';

const BudgetItem = ({ budget, onEdit, onDelete }) => {
  const { categories, expenses } = useBudgetStore();
  const category = categories.find((c) => c.id === budget.categoryId);

  const monthlyExpenses = getExpensesByMonth(expenses, budget.month);
  const categoryTotals = calculateCategoryTotals(monthlyExpenses);
  const categoryTotal = categoryTotals.find((ct) => ct.categoryId === budget.categoryId);
  const spentAmount = categoryTotal ? categoryTotal.total : 0;

  const percentSpent = (spentAmount / budget.amount) * 100;

  let progressColor = 'bg-success-500';
  if (percentSpent > 100) {
    progressColor = 'bg-error-500';
  } else if (percentSpent > 80) {
    progressColor = 'bg-warning-500';
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-4 mb-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      layout
      transition={{ type: 'spring', damping: 15 }}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          {category && (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: category.color + '20' }}
            >
              <span style={{ color: category.color }}>{category.icon.charAt(0).toUpperCase()}</span>
            </div>
          )}
          <div>
            <h4 className="font-medium text-gray-900">{category?.name}</h4>
            <div className="text-sm text-gray-500">
              <span>
                {formatCurrency(spentAmount)} spent of {formatCurrency(budget.amount)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex space-x-1">
            <motion.button
              onClick={() => onEdit(budget)}
              className="p-2 text-gray-500 hover:text-primary-600 rounded-full hover:bg-gray-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit size={16} />
            </motion.button>
            <motion.button
              onClick={() => onDelete(budget.id)}
              className="p-2 text-gray-500 hover:text-error-600 rounded-full hover:bg-gray-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash2 size={16} />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500">Progress</span>
          <span className={percentSpent > 100 ? 'text-error-600 font-medium' : 'text-gray-500'}>
            {Math.round(percentSpent)}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${progressColor}`}
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(percentSpent, 100)}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default BudgetItem;
