// insert new canvas before table1

var parentElement = document.getElementById('mw-content-text');

var newCanvas = document.createElement('canvas');
newCanvas.id = 'myChart'; // give it 'myChart' id to match chart.js template example

var tableOne = document.getElementById('table1');

parentElement.insertBefore(newCanvas, tableOne);


// Create array for years-----------------------------------------
// Select the first tr element inside tbody of table1

const firstRow = document.querySelector('#table1 tbody tr:first-child'); 

// Iterate through each th element inside the first tr
const years = [];
  for (let i = 0; i < firstRow.children.length; i++) {
    const cell = firstRow.children[i];
    const cellContent = cell.innerHTML.trim(); // Trim any leading/trailing whitespace

    // Parse the content as an integer and check if it's a valid number to not push empty cells
    const year = parseInt(cellContent);
    if (!isNaN(year)) {
      years.push(year);
    }
  }

console.log(years);

// Create array for countries --------------------------------------

const countryElements = document.querySelectorAll('#table1 tbody tr:not(:first-child) td:first-of-type'); // Select all td elements except the first row
// exclude headers, the "N°" and "Country" labels.

// Extract the text content of the td elements
const countries = Array.from(countryElements).map(td => td.textContent.trim());

console.log(countries); // Output the extracted countries to the console


// Create array for the data -------------------------------------------
const dataRows = document.querySelectorAll('#table1 tbody tr td:not(:nth-child(2))'); // Select all td elements in the tbody except the second column

// Extract the text content of the td elements
const data = Array.from(dataRows).map(td => td.textContent.trim());

// Array to store the restructured data
const restructuredData = [];
const numOfYears = years.length;

for (let i = 0; i < data.length; i += numOfYears) {
  const countryData = data.slice(i, i + numOfYears);
  restructuredData.push(countryData);
}

console.log(restructuredData);

// Create object containing all data ----------------------------------------
const chartData = [];

for (let j = 0; j < countries.length; j++) {
    const country = countries[j];
    const dataValues = restructuredData[j];
    const obj = {
        country: country,
        data: dataValues,
    };
    chartData.push(obj);
}

console.log(chartData);

// chart.js chart ---------------------------------------------------------------

const countryLabels = chartData.map(item => item.country);
const yearLabels = years;

const datasets = chartData.map(item => {
    return {
        label: item.country,
        data: item.data.map(value => parseFloat(value.replace(',', '.'))), // converting string to numbers and replace ',' by '.'
        tension: 0.1
    };
});

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: yearLabels,
        datasets: datasets,
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});

// Table2 -----------------------------------------------------------------------

// insert new canvas before table2

var parentElement = document.getElementById('mw-content-text');

var newCanvas = document.createElement('canvas');
newCanvas.id = 'myChart2'; // give it 'myChart2' id to match chart.js template example

var tableTwo = document.getElementById('table2');

parentElement.insertBefore(newCanvas, tableTwo);


// create object with all data from table2 ----------------------------------------------

const table = document.getElementById('table2');
const tableData = [];

// Iterate through each row of the table (skipping the header row)
for (let i = 1; i < table.rows.length; i++) {
    const rowData = table.rows[i].cells;
    const dataObj = {
        "N°": rowData[0].innerText.trim(),
        "Country": rowData[1].innerText.trim(),
        "2007-09": rowData[2].innerText.trim(),
        "2010-12": rowData[3].innerText.trim()
    };
    tableData.push(dataObj);
}

console.log(tableData); // Verify the data in the console

// use tableData in chart.js

const countries2 = tableData.map((data) => data.Country);
const values2007_09 = tableData.map((data) => data["2007-09"]);
const values2010_12 = tableData.map((data) => data["2010-12"]);

const ctx2 = document.getElementById("myChart2").getContext('2d');
const myChart2 = new Chart(ctx2, {
  type: "bar",
  data: {
      labels: countries2,
      datasets: [
          {
              label: "2007-09",
              data: values2007_09,
              borderWidth: 1,
          },
          {
              label: "2010-12",
              data: values2010_12,
              borderWidth: 1,
          },
      ],
  },
  options: {
      scales: {
          y: {
              beginAtZero: true,
          },
      },
  },
});

// insert new chart canvas after h1 -------------------------------------------------------------

var parentElement2 = document.getElementById('bodyContent');

var newCanvas = document.createElement('canvas');
newCanvas.id = 'myChart3'; // give it 'myChart3' id to match chart.js template example

var tableAPI = document.getElementById('mw-content-text');

parentElement2.insertBefore(newCanvas, tableAPI);

var dataPoints = [];
var totalDataPointsCount = 0; // Initialize total data points count
var currentIndex = 0; // Initialize current index

// update Chart 3 --------------------------------------------------------------------------------------
function updateChart() {
  var refresh = new XMLHttpRequest();
  var timestamp = new Date().getTime(); // Get current timestamp
  refresh.open('GET', 'https://canvasjs.com/services/data/datapoints.php?timestamp=' + timestamp, true);
  refresh.onload = function () {
    if (refresh.status >= 200 && refresh.status < 300) {
      var newData = JSON.parse(refresh.responseText);

      // Add each data point from the API one by one
      dataPoints.push(newData[currentIndex]);

      // Update labels to reflect the new dataPoints
      myChart3.data.labels = dataPoints.map((point, index) => index);
      // Update data
      myChart3.data.datasets[0].data = dataPoints.map((point) => point[1]);

      myChart3.update();

      // Increment current index and handle cycling
      currentIndex = (currentIndex + 1) % newData.length;
    } else {
      console.error('Request failed with status', refresh.status);
    }
  };
  refresh.onerror = function () {
    console.error('Request failed');
  };
  refresh.send();
}

updateChart(); // Call updateChart initially

// Call updateChart every 1000ms
setInterval(function () {
  updateChart();
}, 1000);

// chart 3 with API ----------------------------------------------------------------------------------------------------
var ctx3 = document.getElementById('myChart3').getContext('2d');
var myChart3 = new Chart(ctx3, {
  type: 'line',
  data: {
    labels: [], // Set initial labels as an empty array
    datasets: [
      {
        label: 'Chart with API from https://canvasjs.com/services/data/datapoints.php',
        data: [],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
