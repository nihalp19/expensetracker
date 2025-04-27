import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useExpense } from '../../context/ExpenseContext';
import { calculateCategoryTotals } from '../../utils/calculations';
import { getCategoryById } from '../../data/categories';
import { formatCurrency } from '../../utils/formatters';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = () => {
  const { expenses, currentMonth } = useExpense();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const monthlyExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      const expenseMonth = `${expenseDate.getFullYear()}-${String(expenseDate.getMonth() + 1).padStart(2, '0')}`;
      return expenseMonth === currentMonth;
    });

    const categoryTotals = calculateCategoryTotals(monthlyExpenses);

    if (categoryTotals.length === 0) {
      setChartData({
        labels: ['No Data'],
        datasets: [
          {
            data: [1],
            backgroundColor: ['#e5e7eb'],
            borderWidth: 0,
          },
        ],
      });
      return;
    }

    const categoryData = categoryTotals.map(ct => {
      const category = getCategoryById(ct.categoryId);
      return {
        id: ct.categoryId,
        name: category ? category.name : 'Unknown',
        color: category ? category.color : '#cccccc',
        total: ct.total,
      };
    });

    setChartData({
      labels: categoryData.map(cat => cat.name),
      datasets: [
        {
          data: categoryData.map(cat => cat.total),
          backgroundColor: categoryData.map(cat => cat.color),
          borderWidth: 0,
        },
      ],
    });
  }, [expenses, currentMonth]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += formatCurrency(context.parsed);
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
      <div className="h-64">
        <Pie data={chartData} options={options} />
      </div>
    </motion.div>
  );
};

export default CategoryPieChart;
