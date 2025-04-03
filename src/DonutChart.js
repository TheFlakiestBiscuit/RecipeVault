import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, } from 'chart.js';
import './DonutChart.css';

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ recipes }) => {
  // Fixed category order
const fixedCategories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack/Other'];

// Count recipes per fixed category
const categoryCounts = fixedCategories.map(category =>
    recipes.filter(recipe => recipe.category === category).length
);

// Matching fixed color palette
const categoryColors = [
  '#FFA500', // Sunny Orange - Breakfast
  '#78AB46', // Green Apple Peel - Lunch
  '#7B2C3B', // Burgundy Roast - Dinner
  '#F78DA7', // Strawberry Frosting - Dessert
  '#2BC0E4', // Frozen Blue Raspberry - Snack/Other
];

// Final data object
const data = {
    labels: fixedCategories,
    datasets: [
        {
            label: 'Recipes per Category',
            data: categoryCounts,
            backgroundColor: categoryColors,
            borderColor: '#ffffff',
            borderWidth: 2,
        },
    ],
};

    const options = {
        responsive: true,
        layout: {
            padding: {
                right: 0
            }
        },
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#333',
                    font: {
                    size: 16,
                    },
                },
            },
        },
    };

    return (
        <div className="donut-chart">
            {recipes.length > 0 ? (
                <div className="chart-wrapper">
                    <h3 className="chart-title">Recipe Breakdown:</h3>
                    <div className="chart-box">
                    <Doughnut data={data} options={options} style={{ marginTop: '20px' }} />
                    </div>
                </div>
            ) : (
                <p className="chart-placeholder">Add some recipes to see the chart!</p>
            )}
        </div>
    );
};

export default DonutChart;
