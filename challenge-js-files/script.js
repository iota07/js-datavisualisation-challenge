// insert new canvas before table1

var parentElement = document.getElementById('mw-content-text');

var newCanvas = document.createElement('canvas');
newCanvas.id = 'myChart';

var tableOne = document.getElementById('table1');

parentElement.insertBefore(newCanvas, tableOne);


// Create array for years
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

// Create array for countries

const countryElements = document.querySelectorAll('#table1 tbody tr:not(:first-child) td:first-of-type'); // Select all td elements except the first row
// excluse headers, the "N°" and "Country" labels.

// Extract the text content of the td elements
const countries = Array.from(countryElements).map(td => td.textContent.trim());

console.log(countries); // Output the extracted countries to the console


// Create array for the data
const dataRows = document.querySelectorAll('#table1 tbody tr:not(:first-child) td:not(:first-child)'); // Select all td elements in the tbody except the first column

// Extract the text content of the td elements
const data = Array.from(dataRows).map(td => td.textContent.trim());

console.log(data); // Output the extracted data to the console


// chart.js chart

const ctx = document.getElementById('myChart');

new Chart(ctx, {
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

