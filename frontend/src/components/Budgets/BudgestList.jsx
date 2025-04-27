import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BudgetItem from './BudgetItem';

const BudgetList = ({ budgets, onEdit, onDelete }) => {
  // Sort budgets by categoryId (assuming categoryId is a string)
  const sortedBudgets = [...budgets].sort((a, b) => a.categoryId.localeCompare(b.categoryId));

  return (
    <div className="card">
      <AnimatePresence initial={false}>
        {sortedBudgets.length > 0 ? (
          sortedBudgets.map(budget => (
            <BudgetItem
              key={budget.id}
              budget={budget}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-6"
          >
            <p className="text-gray-500">No budgets set for this month</p>
            <p className="text-sm text-gray-400 mt-1">Click 'Set Budget' to add one</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BudgetList;
