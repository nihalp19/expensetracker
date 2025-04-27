import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, Smile } from 'lucide-react';
import { useExpense } from '../../context/ExpenseContext';
import { 
  calculateTotalExpenses, 
  getExpensesByMonth, 
  getTopCategories 
} from '../../utils/calculations';
import { formatCurrency, getMonthFromDate } from '../../utils/formatters';
import { getCategoryById } from '../../data/categories';

const SpendingInsights = () => {
  const { expenses, budgets, currentMonth } = useExpense();
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const generateInsights = () => {
      const newInsights = [];

      // Get current month's expenses
      const monthlyExpenses = getExpensesByMonth(expenses, currentMonth);
      const totalSpent = calculateTotalExpenses(monthlyExpenses);

      // Get previous month for comparison
      const currentMonthDate = new Date(parseInt(currentMonth.split('-')[0]), parseInt(currentMonth.split('-')[1]) - 1);
      const prevMonthDate = new Date(currentMonthDate);
      prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
      const prevMonth = `${prevMonthDate.getFullYear()}-${String(prevMonthDate.getMonth() + 1).padStart(2, '0')}`;

      const prevMonthExpenses = getExpensesByMonth(expenses, prevMonth);
      const prevMonthTotal = calculateTotalExpenses(prevMonthExpenses);

      // Monthly spending trend
      if (prevMonthTotal > 0) {
        const percentChange = ((totalSpent - prevMonthTotal) / prevMonthTotal) * 100;

        if (Math.abs(percentChange) > 5) {
          newInsights.push({
            icon: percentChange > 0 ? <TrendingUp className="text-error-500" /> : <TrendingDown className="text-success-500" />,
            title: percentChange > 0 ? 'Spending Increased' : 'Spending Decreased',
            description: `Your spending ${percentChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(percentChange).toFixed(1)}% compared to last month.`,
            type: percentChange > 0 ? 'warning' : 'success',
          });
        }
      }

      // Top spending categories
      const topCategories = getTopCategories(monthlyExpenses, 1);
      if (topCategories.length > 0) {
        const topCategory = getCategoryById(topCategories[0].categoryId);
        const topCategoryTotal = topCategories[0].total;
        const topCategoryPercentage = (topCategoryTotal / totalSpent) * 100;

        if (topCategoryPercentage > 40) {
          newInsights.push({
            icon: <AlertTriangle className="text-warning-500" />,
            title: 'High Category Spending',
            description: `${topCategory?.name} accounts for ${Math.round(topCategoryPercentage)}% of your total spending this month.`,
            type: 'warning',
          });
        }
      }

      // Budget status
      const currentBudgets = budgets.filter(budget => budget.month === currentMonth);
      const totalBudget = currentBudgets.reduce((sum, budget) => sum + budget.amount, 0);

      if (totalBudget > 0) {
        const percentUsed = (totalSpent / totalBudget) * 100;

        if (percentUsed > 90) {
          newInsights.push({
            icon: <AlertTriangle className="text-error-500" />,
            title: 'Budget Alert',
            description: `You've used ${Math.round(percentUsed)}% of your monthly budget. Consider reducing expenses.`,
            type: 'danger',
          });
        } else if (percentUsed < 50 && currentMonthDate.getDate() > 20) {
          newInsights.push({
            icon: <Smile className="text-success-500" />,
            title: 'Under Budget',
            description: `Great job! You've only used ${Math.round(percentUsed)}% of your monthly budget.`,
            type: 'success',
          });
        }
      }

      // Largest single expense
      if (monthlyExpenses.length > 0) {
        const largestExpense = [...monthlyExpenses].sort((a, b) => b.amount - a.amount)[0];
        const largestCategory = getCategoryById(largestExpense.categoryId);

        if (largestExpense.amount > totalSpent * 0.3) {
          newInsights.push({
            icon: <DollarSign className="text-warning-500" />,
            title: 'Large Single Expense',
            description: `Your largest expense this month was ${formatCurrency(largestExpense.amount)} for "${largestExpense.description}" (${largestCategory?.name}).`,
            type: 'info',
          });
        }
      }

      // If no insights, add a default one
      if (newInsights.length === 0) {
        newInsights.push({
          icon: <Smile className="text-success-500" />,
          title: 'Looking Good!',
          description: 'Your spending patterns look healthy. Keep it up!',
          type: 'success',
        });
      }

      setInsights(newInsights);
    };

    generateInsights();
  }, [expenses, budgets, currentMonth]);

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            className={`p-4 rounded-lg ${
              insight.type === 'success' ? 'bg-success-50 border-l-4 border-success-500' :
              insight.type === 'warning' ? 'bg-warning-50 border-l-4 border-warning-500' :
              insight.type === 'danger' ? 'bg-error-50 border-l-4 border-error-500' :
              'bg-primary-50 border-l-4 border-primary-500'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">
                {insight.icon}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SpendingInsights;
