// Default List Value
var default_selection = ['All'];


// --------------
// CREATE STYLE FILTER
// --------------
var select = d3.select('#filters')
  .append('li')
    .attr('class','filter list-group-item')
    .append('label').text('Select Style')
  .append('select')
    .attr('id', 'Style-Value')
    .on('change',onchange)

// Set Default Value to All
var options = d3.select('#Style-Value')
  .selectAll('option')
  .data(default_selection).enter()
  .append('option')
    .text(function (d) { return d; });


// --------------
// CREATE Brewery FILTER
// --------------
var select = d3.select('#filters')
  .append('li')
    .attr('class','filter list-group-item')
    .append('label').text('Select Brewery')
  .append('select')
    .attr('id', 'Brewery-Value')
    .on('change',onchange)

// Set Default Value to All
var options = d3.select('#Brewery-Value')
  .selectAll('option')
  .data(default_selection).enter()
  .append('option')
    .text(function (d) { return d; });



// --------------
// CREATE SCORE RANGE FILTER
// --------------
var select = d3.select('#filters')
  .append('li')
  	.attr('class','filter list-group-item')
  	.append('label').text('Select Score')
  .append('select')
  	.attr('id', 'Score-Value')
    .on('change',onchange)

// Set Default Value to All
var options = d3.select('#Score-Value')
  .selectAll('option')
  .data(default_selection).enter()
  .append('option')
    .text(function (d) { return d; });





// --------------
// CREATE ABV RANGE FILTER
// --------------
var select = d3.select('#filters')
  .append('li')
  	.attr('class','filter list-group-item')
  	.append('label').text('Select ABV Content')
  .append('select')
  	.attr('id', 'ABV-Value')
    .on('change',onchange)

// Set Default Value to All
var options = d3.select('#ABV-Value')
  .selectAll('option')
  .data(default_selection).enter()
  .append('option')
    .text(function (d) { return d; });




// --------------
// Organize Data by..... :
// --------------
