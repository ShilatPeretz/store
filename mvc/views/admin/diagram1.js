// Define the sales data as an array of objects
const salesData = [
  { month: "Jan", sales: 1200 },
  { month: "Feb", sales: 1400 },
  { month: "Mar", sales: 900 },
  { month: "Apr", sales: 1500 },
  { month: "May", sales: 1100 },
  { month: "Jun", sales: 1700 },
  { month: "Jul", sales: 1300 },
  { month: "Aug", sales: 1800 },
  { month: "Sep", sales: 1000 },
  { month: "Oct", sales: 1900 },
  { month: "Nov", sales: 1200 },
  { month: "Dec", sales: 1600 },
];

// Define the dimensions of the chart
const width = 700;
const height = 700;
const margin = { top: 20, right: 50, bottom: 50, left: 50 };
const chartWidth = width - margin.left - margin.right;
const chartHeight = height - margin.top - margin.bottom;

// Create the SVG element
const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Define the x scale
const x = d3.scaleBand()
  .domain(salesData.map(d => d.month))
  .range([margin.left, chartWidth + margin.left])
  .padding(0.1);

// Define the y scale
const y = d3.scaleLinear()
  .domain([0, d3.max(salesData, d => d.sales)])
  .range([chartHeight, 0]);

// Create the bars
svg.append("g")
  .selectAll("rect")
  .data(salesData)
  .join("rect")
  .attr("x", d => x(d.month))
  .attr("y", d => y(d.sales))
  .attr("width", x.bandwidth())
  .attr("height", d => chartHeight - y(d.sales))
  .attr("fill", "steelblue");

// Create the x-axis
svg.append("g")
  .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
  .call(d3.axisBottom(x));

// Create the y-axis
svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .call(d3.axisLeft(y));

// Add the chart title
svg.append("text")
  .attr("x", width / 2)
  .attr("y", margin.top / 2)
  .attr("text-anchor", "middle")
  .style("font-size", "20px")
  .text("Monthly Sales");
