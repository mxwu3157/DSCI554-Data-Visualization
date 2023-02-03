
// set the dimensions and margins of the graph
var margin = {top: 40, right: 30, bottom: 60, left: 60},
    width = 760 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page


// Parse the Data
d3.json("../data/co2_emission_freq.json").then(data=>{
  var svg = d3.select("#barplot")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
console.log(data)
// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.country; }))
  .padding(0.3);

  svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([1*d3.min(data, d=>d.relative_percentage_emission), 1*d3.max(data,d=>d.relative_percentage_emission)])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

// Bars
svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.country); })
    .attr("y", function(d) { return y(d.relative_percentage_emission); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.relative_percentage_emission); })
    .attr("fill", "#69b3a2")

     // Add X axis label:
 svg.append("text")
  .attr("text-anchor", "end")
  .attr("x", width/2+50)
  .attr("y", height +45)
  .text("Countries")
  .attr('class','axis_title');
 // Add Y axis label:
 svg.append("text")
  .attr("text-anchor", "end")
  .attr("x", -5)
  .attr("y", -10 )
  .text("Relative Percentage")
  // .attr("text-anchor", "start")
  .attr('class','axis_title')
  .attr("transform", "translate(-20,0)rotate(-90)")
  
  svg.append("text")
  .attr("text-anchor", "start")
  .attr("x", 10)
  .attr("y", -10)
  .text("Relative Percentage of the CO2 Emission in 2017 (kilo-ton)")
  .attr('class','title');
});
// X axis


    // enter.append('rect')
    //   .attr('x', (d, i) =>left_padding + i * (width + padding))
    //   .attr('y', d => height - 5*d.relative_percentage_emission )
    //   .attr('width', d => width)
    //   .attr('height', d => 5*d.relative_percentage_emission)
    //   .attr('fill', function (d) { return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'; })
    //   .attr('opacity',0.3)
    //   .attr('class', 'bar');
    
    // enter.append('text')
    //   .attr('x', (d, i) =>left_padding +  i * (width + padding) +3) //2px from bar start
    //   .attr('y', d => height - 5*d.relative_percentage_emission-5)
    //   .attr('class', 'bar')
    //   .style('font-size', '12px')
    //   .text(d => d.country);
    
      
    
    // enter.append("text")
    //   .attr('x', 0)             
    //   .attr('y', 20)
    //   .attr('text-anchor', 'left')
    //   .style('font-size', '20px')
    //   .style('color', 'black')
    //   .style('font-weight','bold')
    //   .text('Relative Percentage CO2 Emission in 2017 (kilo-ton)');
    
    //   enter.append('line')
    //   .attr('x1',0)
    //   .attr('y1',height)
    //   .attr('x2',0)
    //   .attr('y2',45)
    //   .style('stroke', 'black')
    //   ;
    //   enter.append('text')
    //   .attr('x',0)
    //   .attr('y',height)
    //   .style('font-size','10px')
    //   .text('0%');
    //   enter.append('text')
    //   .attr('x',0)
    //   .attr('y',45)
    //   .style('font-size','10px')
    //   .text('100%');


    // });
    