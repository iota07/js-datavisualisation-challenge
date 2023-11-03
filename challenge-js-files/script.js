// insert new canvas before table1

var parentElement = document.getElementById('mw-content-text');

var newCanvas = document.createElement('canvas');
newCanvas.id = 'myChart';

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
// excluse headers, the "N°" and "Country" labels.

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
        data: item.data.map(value => parseFloat(value.replace(',', '.'))), // converting stringto numbers
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
