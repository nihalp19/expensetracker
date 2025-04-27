import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, TrendingUp, Calendar } from 'lucide-react';
import { useExpense } from '../../context/ExpenseContext';
import { formatMonth } from '../../utils/formatters';
import MonthlyExpensesChart from '../Dashboard/MonthlyExpensesChart';
import CategoryPieChart from '../Dashboard/CategoryPieChart';
import BudgetSummaryChart from '../Budgets/BudgetSummaryChart';
import SpendingInsights from './SpendingInsights';

const ReportsPage = () => {
  const { currentMonth, setCurrentMonth } = useExpense();
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);

  const handleMonthChange = (e) => {
    setCurrentMonth(e.target.value);
  };

  const reports = [
    {
      id: 'monthly',
      title: 'Monthly Expenses',
      icon: <BarChart3 className="mr-2" size={20} />,
      component: <MonthlyExpensesChart />,
    },
    {
      id: 'category',
      title: 'Category Breakdown',
      icon: <PieChart className="mr-2" size={20} />,
      component: <CategoryPieChart />,
    },
    {
      id: 'budget',
      title: 'Budget vs. Actual',
      icon: <TrendingUp className="mr-2" size={20} />,
      component: <BudgetSummaryChart />,
    },
    {
      id: 'insights',
      title: 'Spending Insights',
      icon: <TrendingUp className="mr-2" size={20} />,
      component: <SpendingInsights />,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <motion.h2 
          className="text-2xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          Reports & Analytics
        </motion.h2>
        <div className="relative">
          <button
            onClick={() => setIsMonthPickerOpen(!isMonthPickerOpen)}
            className="btn btn-secondary flex items-center"
          >
            <Calendar size={16} className="mr-2" />
            {formatMonth(currentMonth)}
          </button>
          {isMonthPickerOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 z-10">
              <input
                type="month"
                value={currentMonth}
                onChange={handleMonthChange}
                className="input"
                onBlur={() => setIsMonthPickerOpen(false)}
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="col-span-1"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                {report.icon}
                {report.title}
              </h3>
            </div>
            {report.component}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
