// Get data

d3.json("/table_data").then(function(data) {
  var tableData = data;
// Choose data to filter by, refresh page, plot chart
all_list_populator(tableData);

d3.select('#filter-button').on('click', function() {
  d3.event.preventDefault();

	// Filters by selected city value
	// ****

  var brewery_records = brewery_filter(tableData);
  var style_records = style_filter(brewery_records);
  var score_records = score_filter(style_records);
  var abv_records = abv_filter(score_records);
  var filtered_records = abv_records;
// });

	// Create SVG

  var svgWidth = 960;
  var svgHeight = 500;

  var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
  };

  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  // Create an SVG wrapper, append an SVG group, and shift the latter by left and top margins.
  var svg = d3.select('#chart')
  .html('')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

  var chartGroup = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // Create scale functions
  // ==============================
  var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(tableData, d => d.ABV)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(tableData, d => d.Score)])
    .range([height, 0]);

  // Create axis functions
  // ==============================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Append Axes to the chart
  // ==============================
  chartGroup.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append('g')
    .call(leftAxis);

  // Create Circles
  // ==============================
  var circlesGroup = chartGroup.selectAll('circle')
  .data(filtered_records)
  .enter()
    .append('circle')
    .attr('cx', d => xLinearScale(d.ABV))
    .attr('cy', d => yLinearScale(d.Score))
    .attr('r', '15')
    .attr('fill', 'blue')
    .attr('opacity', '.5');


  // Initialize tool tip
  // ==============================
  var toolTip = d3.tip()
    .attr('class', 'tooltip')
    .offset([80, -60])
    .html(function(d) {
    return (`<strong>Brewery:</strong> ${d.Brewery}<br><br><strong>Name:</strong> ${d.Beer}<br><br><strong>Style:</strong> ${d.Style}<br><br><strong>Score:</strong> ${d.Score}<br><br><strong>ABV:</strong> ${d.ABV}`);
    });

  // Create tooltip in the chart
  // ==============================
  chartGroup.call(toolTip);

  // Create event listeners to display and hide the tooltip
  // ==============================
  circlesGroup.on('mouseover', toolTip.show);
  circlesGroup.on('mouseout', toolTip.hide);

  // Create axes labels
  chartGroup.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left + 40)
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .attr('class', 'axisText')
    .text('Score');

  chartGroup.append('text')
    .attr('transform', `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr('class', 'axisText')
    .text('Alcohol Content');

  })
});
