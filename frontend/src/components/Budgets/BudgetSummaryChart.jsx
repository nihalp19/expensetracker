import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useExpense } from '../../context/ExpenseContext';
import { calculateBudgetStatus } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { getCategoryById } from '../../data/categories';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BudgetSummaryChart = () => {
  const { expenses, budgets, currentMonth } = useExpense();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (budgets.length === 0) {
      setChartData({
        labels: ['No budget data'],
        datasets: [],
      });
      return;
    }

    const budgetStatus = calculateBudgetStatus(expenses, budgets, currentMonth);

    if (budgetStatus.length === 0) {
      setChartData({
        labels: ['No budget data'],
        datasets: [],
      });
      return;
    }

    // Sort budget status by category name
    budgetStatus.sort((a, b) => {
      const catA = getCategoryById(a.categoryId);
      const catB = getCategoryById(b.categoryId);
      return (catA?.name || '').localeCompare(catB?.name || '');
    });

    const labels = budgetStatus.map(item => {
      const category = getCategoryById(item.categoryId);
      return category ? category.name : 'Unknown';
    });

    const colors = budgetStatus.map(item => {
      const category = getCategoryById(item.categoryId);
      return category ? category.color : '#cccccc';
    });

    setChartData({
      labels,
      datasets: [
        {
          label: 'Budget',
          data: budgetStatus.map(item => item.budget),
          backgroundColor: colors.map(color => color + '40'),
          borderColor: colors,
          borderWidth: 1,
          barPercentage: 0.6,
          categoryPercentage: 0.8,
        },
        {
          label: 'Spent',
          data: budgetStatus.map(item => item.spent),
          backgroundColor: budgetStatus.map(item =>
            item.spent > item.budget ? 'rgba(239, 68, 68, 0.8)' : 'rgba(16, 185, 129, 0.8)'
          ),
          borderWidth: 0,
          barPercentage: 0.6,
          categoryPercentage: 0.8,
        },
      ],
    });
  }, [expenses, budgets, currentMonth]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += formatCurrency(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return formatCurrency(value);
          }
        }
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        }
      }
    }
  };

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <h3 className="text-lg font-semibold mb-4">Budget vs. Actual</h3>
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </motion.div>
  );
};

export default BudgetSummaryChart;
