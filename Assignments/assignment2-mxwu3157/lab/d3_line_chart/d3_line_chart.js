//scales
var xScale = d3.scaleTime();  //time scale
var yScale = d3.scaleLinear();  //linear scale

//axes
var xAxis = d3.axisBottom()  //axes
  .scale(xScale);
var yAxis = d3.axisLeft()
  .scale(yScale);

const format = d3.timeParse('%Y-%m-%d');

//d3-shape line generator to create line segments as svg path
var line = d3.line()
  .x(function (d) { return xScale(d.date); })
  .y(function (d) { return yScale(d.close); });

//data to display
// const data = [
//   { date: format('2019-01-01'), close: 50 },
//   { date: format('2019-02-01'), close: 65 },
//   { date: format('2019-03-01'), close: 75 },
//   { date: format('2019-04-01'), close: 45 },
//   { date: format('2019-05-01'), close: 95 },
// ];
const data = [
  { date: format('2019-01-01'), close: 4079 },
  { date: format('2018-01-01'), close: 3796 },
  { date: format('2017-01-01'), close: 3573 },
  { date: format('2016-01-01'), close: 4030 },
  { date: format('2015-01-01'), close: 2895 },
];

//margin convention
const margin = { top: 20, left: 40, bottom: 40, right: 40 };
const width = 900;
const height = 200;

let svg = d3.select('#chart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

//demo: print the width of the svg element (see https://github.com/d3/d3-selection)

xScale.range([0, width]);
yScale.range([height, 0])

xScale.domain(d3.extent(data, d => { return d.date; }));
yScale.domain(d3.extent(data, d => { return d.close; }));

//plot x axis
svg.append('g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + height + ')')
  .call(xAxis);

//plot y axis
svg.append('g')
  .attr('class', 'y axis')
  .call(yAxis)
  .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.7em')
    .style('text-anchor', 'end')
    .text('Price ($)');

//plot line segments
svg.append('path')
  .datum(data)
    .attr('class', 'line')
    .attr('d', line);

//plot dots
svg.append('g')
  .selectAll('dot')
  .data(data)
  .enter()
  .append('circle')
    .attr('cx', d => xScale(d.date))
    .attr('cy', d => yScale(d.close))
    .attr('r', 3)
    .attr('class', 'dot');

//plot title
svg.append('text')
    .attr('id', 'desc')
    .attr('x', 0)
    .attr('y', -5)
    .text(`Line chart with ${data.length} data points`);
