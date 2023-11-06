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

const ctx2 = document.getElementById("myChart2").getContext("2d");
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

// insert new chart canvas after h1

var parentElement2 = document.getElementById('bodyContent');

var newCanvas = document.createElement('canvas');
newCanvas.id = 'myChart3'; // give it 'myChart2' id to match chart.js template example

var tableAPI = document.getElementById('mw-content-text');

parentElement2.insertBefore(newCanvas, tableAPI);

const ctx3 = document.getElementById('myChart3');


// chart 3 with API
new Chart(ctx3, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

