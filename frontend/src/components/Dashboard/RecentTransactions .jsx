import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useExpense } from '../../context/ExpenseContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { getCategoryById } from '../../data/categories';

const RecentTransactions = () => {
  const { expenses } = useExpense();

  // Sort expenses by date (newest first) and take only the most recent 5
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Clock size={18} className="mr-2 text-gray-500" />
          Recent Transactions
        </h3>
      </div>

      {recentExpenses.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No recent transactions</p>
      ) : (
        <motion.ul
          className="divide-y divide-gray-100"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {recentExpenses.map((expense) => {
            const category = getCategoryById(expense.categoryId);
            return (
              <motion.li
                key={expense.id}
                className="py-3 flex justify-between"
                variants={item}
              >
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                    style={{ backgroundColor: category?.color + '20' }}
                  >
                    <span style={{ color: category?.color }}>
                      {category?.icon.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{expense.description}</p>
                    <p className="text-xs text-gray-500">
                      {category?.name} • {formatDate(expense.date)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(expense.amount)}</p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      )}

      {recentExpenses.length > 0 && (
        <motion.button
          className="w-full mt-3 text-sm text-primary-600 font-medium hover:text-primary-700"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View all transactions
        </motion.button>
      )}
    </motion.div>
  );
};

export default RecentTransactions;
