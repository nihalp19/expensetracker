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
import { calculateMonthlyExpenses } from '../../utils/calculations';
import { formatMonth, formatCurrency } from '../../utils/formatters';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyExpensesChart = () => {
  const { expenses } = useExpense();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const monthlyData = calculateMonthlyExpenses(expenses);
    
    const lastSixMonths = monthlyData
      .slice(-6)
      .sort((a, b) => a.month.localeCompare(b.month));
    
    setChartData({
      labels: lastSixMonths.map(item => formatMonth(item.month)),
      datasets: [
        {
          label: 'Monthly Expenses',
          data: lastSixMonths.map(item => item.total),
          backgroundColor: 'rgba(147, 51, 234, 0.6)',
          borderColor: 'rgba(147, 51, 234, 1)',
          borderWidth: 1,
          borderRadius: 8,
          hoverBackgroundColor: 'rgba(147, 51, 234, 0.8)',
        },
      ],
    });
  }, [expenses]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
      }
    }
  };

  return (
    <motion.div
      className="card bg-white/80 backdrop-blur-sm border border-purple-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <h3 className="text-lg font-semibold mb-4 text-purple-900">Monthly Expenses</h3>
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </motion.div>
  );
};

export default MonthlyExpensesChart;
