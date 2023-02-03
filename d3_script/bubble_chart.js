// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 60, left: 60},
    width = 760 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page


// Parse the Data
d3.csv("../data/bubble_20countries.csv", d => { 
      return { 
    country: d.country,
    relative_percentage_emission: +d.relative_percentage_emission,
    forest_perc:+d.forest_perc,
    agri_perc:+d.agri_perc
      };
    }).then(data=>{

      var svg = d3.select("#bubble_chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

      var x = d3.scaleLinear()
      .domain([0, 80])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5));
  
    // Add X axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height+40 )
        .text("Forest Area% ")
        .attr('class','axis_title');
  
    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0,90])
      .range([ height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));
  
    // Add Y axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", 0)
        .attr("y", -10 )
        .text("Agriculture Area%")
        .attr("text-anchor", "end")
        .attr('class','axis_title')
        .attr("transform", "translate(-30,0)rotate(-90)")

        //add title
        svg.append("text")
        .attr("text-anchor", "start")
        .attr("x", 10)
        .attr("y", -10)
        .text("Forest area% V.S. Agriculture area% with respect to relative co2 emission ratio")
        .attr('class','title');

  
    // Add a scale for bubble size
    var z = d3.scaleSqrt()
      .domain([0, 100])
      .range([ 2, 30]);
  
    // Add a scale for bubble color
    var myColor = d3.scaleOrdinal()
      .domain(["Canada", "Afghanistan", "Sweden", "Germany", "Iraq",
      "Malaysia", "New Zealand", "Samoa", "Indonesia", "Spain",
      "India", "Japan", "Jamaica", "Zimbabwe", "Cuba",
      "Singapore", "Nigeria", "Thailand", "Morocco", "Chile"
    ])
      .range(d3.schemeSet1);
  
  
    // ---------------------------//
    //      TOOLTIP               //
    // ---------------------------//
  
    // -1- Create a tooltip div that is hidden by default:
    // var tooltip = d3.select("#my_dataviz")
    //   .append("div")
    //     .style("opacity", 0)
    //     .attr("class", "tooltip")
    //     .style("background-color", "black")
    //     .style("border-radius", "5px")
    //     .style("padding", "10px")
    //     .style("color", "white")
  
    // // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
    // var showTooltip = function(d) {
    //   tooltip
    //     .transition()
    //     .duration(200)
    //   tooltip
    //     .style("opacity", 1)
    //     .html("Country: " + d.country)
    //     .style("left", (d3.mouse(this)[0]+30) + "px")
    //     .style("top", (d3.mouse(this)[1]+30) + "px")
    // }
    // var moveTooltip = function(d) {
    //   tooltip
    //     .style("left", (d3.mouse(this)[0]+30) + "px")
    //     .style("top", (d3.mouse(this)[1]+30) + "px")
    // }
    // var hideTooltip = function(d) {
    //   tooltip
    //     .transition()
    //     .duration(200)
    //     .style("opacity", 0)
    // }
  
  
    // ---------------------------//
    //       HIGHLIGHT GROUP      //
    // ---------------------------//
  
    // // What to do when one group is hovered
    // var highlight = function(d){
    //   // reduce opacity of all groups
    //   d3.selectAll(".bubbles").style("opacity", .05)
    //   // expect the one that is hovered
    //   d3.selectAll("."+d).style("opacity", 1)
    // }
  
    // // And when it is not hovered anymore
    // var noHighlight = function(d){
    //   d3.selectAll(".bubbles").style("opacity", 1)
    // }
  
  
    // ---------------------------//
    //       CIRCLES              //
    // ---------------------------//
  
    // Add dots
    svg.append('g')
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("class", function(d) { return "bubbles " + d.country })
        .attr("cx", function (d) { return x(d.forest_perc); } )
        .attr("cy", function (d) { return y(d.agri_perc); } )
        .attr("r", function (d) { return 1.5*z(d.relative_percentage_emission); } )
        .style("fill", function (d) { return myColor(d.country); } )
        .attr('opacity',0.5);
        
        svg.append('g')
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
          .attr('x', function (d) { return x(d.forest_perc); } )
          .attr('y', function (d) { return y(d.agri_perc); } )
          .text( function(d){ return d.country } )
          .style("font-size", 10)
          .attr('alignment-baseline', 'middle')
          .attr("text-anchor", "middle")
          .style('font-color','white')
      // // -3- Trigger the functions for hover
      // .on("mouseover", showTooltip )
      // .on("mousemove", moveTooltip )
      // .on("mouseleave", hideTooltip )
  
  
  
      // ---------------------------//
      //       LEGEND              //
      // ---------------------------//
  
      // Add legend: circles
      var valuesToShow = [1, 10, 50]
      var xCircle = width-100
      var xLabel = width-50
      svg
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("circle")
          .attr("cx", xCircle)
          .attr("cy", function(d){ return height -250 - z(d) } )
          .attr("r", function(d){ return 1.5*z(d) })
          .style("fill", "none")
          .attr("stroke", "black")
  
      // Add legend: segments
      svg
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("line")
          .attr('x1', function(d){ return xCircle + z(d) } )
          .attr('x2', xLabel)
          .attr('y1', function(d){ return height - 250 - z(d) } )
          .attr('y2', function(d){ return height - 250 - z(d) } )
          .attr('stroke', 'black')
          .style('stroke-dasharray', ('2,2'))
  
      // Add legend: labels
      svg
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("text")
          .attr('x', xLabel+2)
          .attr('y', function(d){ return height - 250 - z(d) } )
          .text( function(d){ return d } )
          .style("font-size", 10) 
          .attr('alignment-baseline', 'middle')
  
      // Legend title
      svg.append("text")
        .attr('x', xCircle)
        .attr("y",  90)
        .text("Relative Emission Ratio (%)")
        .attr("text-anchor", "middle")
        .style('font-size','12px')
  
      // // Add one dot in the legend for each name.
      // var size = 20
      // var allgroups = ["Asia", "Europe", "Americas", "Africa", "Oceania"]
      // svg.selectAll("myrect")
      //   .data(allgroups)
      //   .enter()
      //   .append("circle")
      //     .attr("cx", 390)
      //     .attr("cy", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
      //     .attr("r", 7)
      //     .style("fill", function(d){ return myColor(d)})
      //     .on("mouseover", highlight)
      //     .on("mouseleave", noHighlight)
  
      // // Add labels beside legend dots
      // svg.selectAll("mylabels")
      //   .data(allgroups)
      //   .enter()
      //   .append("text")
      //     .attr("x", 390 + size*.8)
      //     .attr("y", function(d,i){ return i * (size + 5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
      //     .style("fill", function(d){ return myColor(d)})
      //     .text(function(d){ return d})
      //     .attr("text-anchor", "left")
      //     .style("alignment-baseline", "middle")
      //     .on("mouseover", highlight)
      //     .on("mouseleave", noHighlight)

    })


 
      
// d3.csv("../data/bubble_20countries.csv", d => { 
//   return { 
//     country: d.country,
//     relative_percentage_emission: +d.relative_percentage_emission,
//     forest_perc:+d.forest_perc,
//     agri_perc:+d.agri_perc
//   };
// }).then(data => {

//   console.log(data);

//   var width = 700, height = 100;
//       var dx = 100;  //distance between centers
//       var padding_left = 20;
    

//   var svg = d3.select('#bubble_chart')
//         // .attr('width', width)
//         // .attr('height', height);
      
//       svg.selectAll('circle')
//         .data(data)
//         .enter()
//         .append('circle')
//         .attr('cx', (d, i) =>padding_left+ d.forest_perc*9)
//         .attr('cy', d =>  5*(height- d.agri_perc))
//         .attr('r', d =>   d.relative_percentage_emission)  //with bubbles map to diameter or area
//         .attr('fill', function (d) { return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'; })
//         .attr('opacity',0.5)
//         .attr('class', 'bubble');
        
      
//         svg.selectAll('text')
//         .data(data)
//         .enter()
//         .append('text')
//         .attr('x', (d, i) =>padding_left+ d.forest_perc*9)
//         //.attr('y', (d,i) => +30 + height / 2)
//         .attr('y',  d => 5*(height- d.agri_perc))
//         .attr('class', 'bubble')
//         .attr('text-anchor', 'middle')
//         .attr('font-size','12px')
//         .text(d => d.country)
        
//         ;
      
//         svg.append('text')
//         .attr('x', 10)
//         .attr('y', 15)
//         .text('Forest Area% VS. Agriculture Area% with radius representing CO2 Emission Relative Percentage ')
//         .style('font-size','17px')
//         .style('font-weight','bold');

//         svg.append('line')
//       .attr('x1',10)
//       .attr('y1',540)
//       .attr('x2',10)
//       .attr('y2',45)
//       .style('stroke', 'black')
//       ;
//       svg.append('line')
//       .attr('x1',10)
//       .attr('y1',540)
//       .attr('x2',900)
//       .attr('y2',540)
//       .style('stroke', 'black')
//       ;
//       svg.append("text")
//       .attr('x', 15)             
//       .attr('y',45)
//       .attr('text-anchor', 'left')
//       .style('font-size', '13px')
//       .style('color', 'black')
//       .style('font-weight', 'normal')
//       .text('Agriculture Area%');
      
//       svg.append("text")
//       .attr('x', 820)             
//       .attr('y',530)
//       .attr('text-anchor', 'left')
//       .style('font-size', '13px')
//       .style('color', 'black')
//       .style('font-weight', 'normal')
//       .text('Forest Area%');
      
      
//       svg.append('text')
//       .attr('x',15)
//       .attr('y',100)
//       .style('font-size','13px')
//       .attr('text-anchor', 'left')
//       .text('80');
//       svg.append('text')
//       .attr('x',680)
//       .attr('y',550)
//       .style('font-size','13px')
//       .attr('text-anchor', 'left')
//       .text('75');
//       svg.append('text')
//       .attr('x',0)
//       .attr('y',550)
//       .style('font-size','13px')
//       .attr('text-anchor', 'left')
//       .text('0');

//     });