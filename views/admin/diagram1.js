var salesData = [
  { year: "2000", Qty: 1000 },
  { year: "2001", Qty: 2330 },
  { year: "2002", Qty: 4540 },
  { year: "2003", Qty: 1239 },
  { year: "2004", Qty: 4349 },
  { year: "2005", Qty: 7039 },
  { year: "2006", Qty: 1035 },
];

var svg = d3.select("#svg");

var padding = { top: 20, right: 30, bottom: 30, left: 50 };

//will return multiple colors
var colors = d3.schemeCategory10;

var chartArea = {
  width: parseInt(svg.style("width")) - padding.left - padding.right,
  height: parseInt(svg.style("height")) - padding.top - padding.bottom,
};

//define maximum height
var yScale = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(salesData, function (d, i) {
      return d.Qty;
    }),
  ])
  .range([chartArea.height, 0])
  .nice();

//domain must be uniqe
//padding between the bars
var xScale = d3
  .scaleBand()
  .domain(
    salesData.map(function (d) {
      return d.year;
    })
  )
  .range([0, chartArea.width])
  .padding(0.2);

//xAxis - define the x scale position
//attr define graph limits
//call function will transform the xAxis var to function inside it
var xAxis = svg
  .append("g")
  .classed("xAxis", true)
  .attr(
    "transform",
    "translate(" + padding.left + "," + (chartArea.height + padding.top) + ")"
  )
  .call(d3.axisBottom(xScale));

//yAxis - define the y scale position
//define a function
var yAxisFn = d3.axisLeft(yScale);
//append group alement
var yAxis = svg
  .append("g")
  .classed("yAxis", true)
  .attr("transform", "translate(" + padding.left + "," + padding.top + ")");
//callimg the function and passing the selection
yAxisFn(yAxis);

//define rectangle group
var rectGrp = svg
  .append("g")
  .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

//select all rectangle elements
//using append+enter function we will append rectangles
//define the height of each rect
//define position on the x scale
//fill each one with colors
rectGrp
  .selectAll("rect")
  .data(salesData)
  .enter()
  .append("rect")
  .attr("width", xScale.bandwidth())
  .attr("height", function (d, i) {
    return chartArea.height - yScale(d.Qty);
  })
  .attr("x", function (d, i) {
    return xScale(d.year);
  })
  .attr("y", function (d, i) {
    return yScale(d.Qty);
  })
  .attr("fill", function (d, i) {
    return colors[i];
  });
