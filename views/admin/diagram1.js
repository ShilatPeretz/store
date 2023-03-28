var salesData = [
  { year: "short shirts", Qty: 30 },
  { year: "short pants", Qty: 0 },
  { year: "skirts", Qty: 34 },
  { year: "swimmig suits", Qty: 12 },
  { year: "long shirts", Qty: 14 },
  { year: "long pants", Qty: 27 },
  { year: "jackets", Qty: 10 },
  { year: "hoodies", Qty: 10 },
];
//****************************************************************************************** */
var tmp = [];
const extractData = async () => {
  $.ajax({
    url: "http://localhost:3000/products/percategory",
    method: "get",
  }).done((data) => {
    tmp = JSON.parse(JSON.stringify(data));
    console.log(tmp);
  });
};
extractData();
//
console.log(tmp);
//************************************************************************************************ */
var svg = d3.select("#svg1");

var padding = { top: 10, right: 20, bottom: 30, left: 55 };

var colors = [
  "#CBE4DE",
  "#0E8388",
  "#2E4F4F",
  "#2C3333",
  "#CBE4DE",
  "#0E8388",
  "#2E4F4F",
  "#2C3333",
];

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

//add lines to graph behind the rectangles
var grid = svg
  .append("g")
  .attr("class", "grid")
  .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
  .call(d3.axisLeft(yScale).tickSize(-chartArea.width).tickFormat(""));

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
