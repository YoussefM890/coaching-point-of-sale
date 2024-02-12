import {dummyCategories, dummyEmployees, dummyProducts} from "../models/dummyData";

const months = ['March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February'];
export const salesOverTimeConfig = {
  type: 'line', // Change to 'line' for a smoother visualization of sales over time
  data: {
    labels: months,
    datasets: [{
      label: 'Monthly Sales',
      data: [1200, 1900, 1700, 1500, 2000, 1800, 1500, 2200, 1900, 2300, 2100, 2400], // Example sales data for each month
      backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light blue background for line fill
      borderColor: 'rgba(54, 162, 235, 1)', // Solid blue border for the line
      borderWidth: 2,
      tension: 0.4 // Adjust for smoother or sharper lines
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Sales Amount ($)'
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Sales per Month'
      },
      legend: {
        display: false
      }
    },
    responsive: true,
    maintainAspectRatio: false
  }
};

export const revenueByCategoryConfig = {
  type: 'doughnut',
  data: {
    labels: dummyCategories.map(category => category.name),
    datasets: [{
      label: 'Revenue',
      data: dummyCategories.map(() => getRandomInt(100, 1000)), // Generate random data
      backgroundColor: dummyCategories.map(() => getRandomColor()), // Generate random colors
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Revenue by Category'
      },
      legend: {
        display: true,
        position: 'left'
      }
    },
    responsive: true,
    maintainAspectRatio: false
  }
};


const N = 10;//Number of top selling items to display
export const topSellingItemsConfig = {
  type: 'bar',
  data: {
    labels: dummyProducts.slice(0, N).map(product => product.name),
    datasets: [{
      label: 'Units Sold',
      data: dummyProducts.slice(0, N).map(() => getRandomInt(20, 200)), // Generate random units sold
      backgroundColor: dummyProducts.slice(0, N).map(() => getRandomColor()), // Generate random colors
    }]
  },
  options: {
    indexAxis: 'y',
    scales: {
    },
    plugins: {
      title: {
        display: true,
        text: 'Top Selling Products In The Last Month'
      },
      legend: {
        display: false
      }
    },
    responsive: true,
    maintainAspectRatio: false

  }
};


export const inventoryLevelsConfig = {
  type: 'pie', // Change chart type to 'pie'
  data: {
    labels: dummyProducts.map(product => product.name),
    datasets: [{
      label: 'Inventory',
      data: dummyProducts.slice(0).map(() => getRandomInt(50, 500)), // Generate random inventory data
      backgroundColor: dummyProducts.slice(0).map(() => getRandomColor()), // Generate random colors for each segment
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Inventory Levels by Product'
      },
      legend: {
        display: true,
        position: 'right' // Adjust legend position if needed
      }
    },
    responsive: true,
    maintainAspectRatio: false
  }
};

const baseEarningStart = 2500; // Base earning for the first employee
const baseEarningDecrease = 200; // Decrease in base earning for each subsequent employee

const monthlyEarnings = dummyEmployees.map((employee, index) => {
  const baseEarning = baseEarningStart - (baseEarningDecrease * index);
  const data = [];

  for (let month = 0; month < 12; month++) {
    // Previous month's earning, or base earning for the first month
    const prevEarning = month === 0 ? baseEarning : data[month - 1]
    // Apply a random increase of up to 5% of the previous month's earning
    const increase = Math.floor(prevEarning * 0.05 * Math.random());
    // Apply a random variation of up to ±10% of the previous month's earning
    const variation = Math.floor(prevEarning * 0.2 * (Math.random() - 0.5));
    data.push(prevEarning + variation + increase);
  }
  return {
    label: employee.name,
    data: data,
    borderColor: getRandomColor(),
    fill: false
  };
});
export const employeeComparisonConfig = {
  type: 'line',
    data: {
  labels: months,
    datasets: monthlyEarnings
},
  options: {
    scales: {
      y: {
        beginAtZero: true,
          title: {
          display: true,
            text: 'Earned Money'
        }
      }
    },
    plugins: {
      title: {
        display: true,
          text: 'Monthly Earnings Comparison by Employee'
      },
      legend: {
        display: true
      }
    },
    responsive: true,
      maintainAspectRatio: false
  }
};


// Function to generate a random RGBA color with 0.5 opacity
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  const r = getRandomInt(0, 255);
  const g = getRandomInt(0, 255);
  const b = getRandomInt(0, 255);
  return `rgba(${r}, ${g}, ${b}, 0.5)`;
}
