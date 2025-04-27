import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, CreditCard, PieChart, TrendingDown } from 'lucide-react';
import DashboardCard from './DashboardCard';
import RecentTransactions from './RecentTransactions';
import MonthlyExpensesChart from './MonthlyExpensesChart';
import CategoryPieChart from './CategoryPieChart';
import BudgetOverviewCard from './BudgetOverviewCard';
import { useExpense } from '../../context/ExpenseContext';
import { calculateTotalExpenses, getExpensesByMonth } from '../../utils/calculations';
import { formatCurrency, formatMonth } from '../../utils/formatters';

const Dashboard = () => {
  const { expenses, currentMonth } = useExpense();

  const monthlyExpenses = getExpensesByMonth(expenses, currentMonth);
  const totalSpent = calculateTotalExpenses(monthlyExpenses);

  // Get previous month expenses for comparison
  const currentMonthDate = new Date(
    parseInt(currentMonth.split('-')[0]),
    parseInt(currentMonth.split('-')[1]) - 1
  );
  const prevMonthDate = new Date(currentMonthDate);
  prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
  const prevMonth = `${prevMonthDate.getFullYear()}-${String(prevMonthDate.getMonth() + 1).padStart(2, '0')}`;

  const prevMonthExpenses = getExpensesByMonth(expenses, prevMonth);
  const prevMonthTotal = calculateTotalExpenses(prevMonthExpenses);

  // Calculate trend percentage
  const trendPercentage = prevMonthTotal > 0
    ? ((totalSpent - prevMonthTotal) / prevMonthTotal) * 100
    : 0;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <div className="text-gray-600 mb-3">
          <span>Current month: </span>
          <span className="font-medium">{formatMonth(currentMonth)}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <DashboardCard
            title="Total Spent"
            value={formatCurrency(totalSpent)}
            icon={<DollarSign size={24} />}
            color="primary"
            trend={{
              value: parseFloat(trendPercentage.toFixed(1)),
              isPositive: trendPercentage <= 0,
            }}
          />
          <DashboardCard
            title="Monthly Average"
            value={formatCurrency(expenses.length > 0 ? calculateTotalExpenses(expenses) / 6 : 0)}
            icon={<CreditCard size={24} />}
            color="secondary"
          />
          <DashboardCard
            title="Categories"
            value={expenses.reduce((acc, curr) => {
              if (!acc.includes(curr.categoryId)) {
                acc.push(curr.categoryId);
              }
              return acc;
            }, []).length.toString()}
            icon={<PieChart size={24} />}
            color="accent"
          />
          <DashboardCard
            title="Largest Expense"
            value={formatCurrency(expenses.length > 0 ? Math.max(...expenses.map(e => e.amount)) : 0)}
            icon={<TrendingDown size={24} />}
            color="warning"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <MonthlyExpensesChart />
          </div>
          <div>
            <BudgetOverviewCard />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryPieChart />
          <RecentTransactions />
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
