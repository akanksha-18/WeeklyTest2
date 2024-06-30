// your-chart-script.js

// First, let's assume you have your scraped data available
const scrapedData = [
    {
      "season": "2024",
      "statCategory": "Most Fours ",
      "stats": [
        {},
        {},
        {},
        {},
        {},
        {}
      ]
    },
    {
      "season": "2024",
      "statCategory": "Most Sixes ",
      "stats": [
        {},
        {},
        {},
        {},
        {},
        {}
      ]
    },
    {
      "season": "2024",
      "statCategory": "Orange Cap",
      "stats": [
        {},
        {},
        {},
        {},
        {},
        {}
      ]
    },
    {
      "season": "2024",
      "statCategory": "Most Centuries",
      "stats": [
        {},
        {
          "position": "1",
          "player": "Virat Kohli",
          "runs": "3",
          "fours": "5",
          "sixes": "62",
          "centuries": "154.69",
          "fifties": "1"
        },
        {
          "position": "2",
          "player": "Ruturaj Gaikwad",
          "runs": "3",
          "fours": "4",
          "sixes": "58",
          "centuries": "141.16",
          "fifties": "1"
        },
        {
          "position": "3",
          "player": "Riyan Parag",
          "runs": "3",
          "fours": "4",
          "sixes": "40",
          "centuries": "149.21",
          "fifties": "0"
        },
        {
          "position": "4",
          "player": "Travis Head",
          "runs": "1",
          "fours": "4",
          "sixes": "64",
          "centuries": "191.55",
          "fifties": "1"
        },
        {
          "position": "5",
          "player": "Sanju Samson",
          "runs": "4",
          "fours": "5",
          "sixes": "48",
          "centuries": "153.46",
          "fifties": "0"
        },
        {
          "position": "6",
          "player": "Sai Sudharsan",
          "runs": "1",
          "fours": "2",
          "sixes": "48",
          "centuries": "141.28",
          "fifties": "1"
        },
        {
          "position": "7",
          "player": "K L Rahul",
          "runs": "0",
          "fours": "4",
          "sixes": "45",
          "centuries": "136.12",
          "fifties": "0"
        },
        {
          "position": "8",
          "player": "Nicholas Pooran",
          "runs": "6",
          "fours": "3",
          "sixes": "35",
          "centuries": "178.21",
          "fifties": "0"
        },
        {
          "position": "9",
          "player": "Sunil Narine",
          "runs": "0",
          "fours": "3",
          "sixes": "50",
          "centuries": "180.74",
          "fifties": "1"
        }
      ]
    },
    {
      "season": "2024",
      "statCategory": "Most Fifties",
      "stats": [
        {},
        {},
        {},
        {},
        {},
        {}
      ]
    }
  ]
  
  // Process the data
  const processedData = scrapedData
    .map(category => ({
      ...category,
      stats: category.stats.filter(stat => Object.keys(stat).length > 0)
    }))
    .filter(category => category.stats.length > 0);
  
  let mainChart, comparisonChart;
  
  function createMainChart(category) {
      const data = processedData.find(cat => cat.statCategory === category);
      
      if (!data) return;
  
      const ctx = document.getElementById('mainChart').getContext('2d');
      
      if (mainChart) {
          mainChart.destroy();
      }
  
      mainChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: data.stats.map(stat => stat.player),
              datasets: [{
                  label: category,
                  data: data.stats.map(stat => {
                      switch(category) {
                          case "Most Centuries":
                          case "Most Fifties":
                              return parseInt(stat.centuries);
                          case "Most Fours ":
                              return parseInt(stat.fours);
                          case "Most Sixes ":
                              return parseInt(stat.sixes);
                          case "Orange Cap":
                              return parseInt(stat.runs);
                          default:
                              return 0;
                      }
                  }),
                  backgroundColor: 'rgba(26, 95, 122, 0.6)'
              }]
          },
          options: {
              responsive: true,
              plugins: {
                  title: {
                      display: true,
                      text: `IPL 2024 - ${category}`,
                      font: {
                          size: 18
                      }
                  },
                  legend: {
                      display: false
                  }
              },
              scales: {
                  y: {
                      beginAtZero: true,
                      title: {
                          display: true,
                          text: `Number of ${category}`
                      }
                  }
              }
          }
      });
  }
  
  function createComparisonChart() {
      const ctx = document.getElementById('comparisonChart').getContext('2d');
      
      if (comparisonChart) {
          comparisonChart.destroy();
      }
  
      const datasets = processedData.map(category => ({
          label: category.statCategory,
          data: category.stats.slice(0, 5).map(stat => stat.player),
          backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`
      }));
  
      comparisonChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: ['1st', '2nd', '3rd', '4th', '5th'],
              datasets: datasets
          },
          options: {
              indexAxis: 'y',
              responsive: true,
              plugins: {
                  title: {
                      display: true,
                      text: 'Top 5 Players Across Categories',
                      font: {
                          size: 18
                      }
                  }
              }
          }
      });
  }
  
  function createDataTable(category) {
      const data = processedData.find(cat => cat.statCategory === category);
      if (!data) return;
  
      let tableHTML = `
          <table id="dataTable">
              <thead>
                  <tr>
                      <th>Player</th>
                      <th>${category}</th>
                  </tr>
              </thead>
              <tbody>
      `;
  
      data.stats.forEach(stat => {
          tableHTML += `
              <tr>
                  <td>${stat.player}</td>
                  <td>${stat[category.toLowerCase().replace(' ', '')]}</td>
              </tr>
          `;
      });
  
      tableHTML += `
              </tbody>
          </table>
      `;
  
      document.getElementById('dataTable').innerHTML = tableHTML;
  }
  
  // Initialize charts and table
  function initializeCharts() {
      createMainChart("Most Centuries");
      createComparisonChart();
      createDataTable("Most Centuries");
  }
  
  // Add event listener for stat selector
  document.getElementById('statSelector').addEventListener('change', (event) => {
      createMainChart(event.target.value);
      createDataTable(event.target.value);
  });
  
  // Call initializeCharts when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', initializeCharts);