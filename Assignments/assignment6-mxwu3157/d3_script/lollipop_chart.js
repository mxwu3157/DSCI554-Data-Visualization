// set the dimensions and margins of the graph
var margin = {top: 50, right: 30, bottom: 90, left: 60},
    width = 760 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page


// Parse the Data
d3.csv("../data/co2_emission_rel.csv", d => { 
      return { 
          country: d.country,
          emission: +d.emission,
          relative_to_avg: +d.relative_avg 
      };
    }).then(data=>{

  var svg = d3.select("#lollipop_plot")
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
  .padding(0.99);

  svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([1*d3.min(data, d=>d.emission), 1*d3.max(data,d=>d.emission)])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y).tickFormat(d3.format('.2s')));

  svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.country); })
    .attr("y", function(d) { return y(d.emission); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.emission); })
    .attr("fill", "black");
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cy', function(d) { return y(d.emission); })
      .attr('cx', function(d) { return x(d.country); })
      .attr('r', 4) 
      .attr('fill','DarkOrange')
      .attr('class', 'bubble');



      svg.append("text")
  .attr("text-anchor", "end")
  .attr("x", width/2+50)
  .attr("y", height +45)
  .text("Countries")
  .attr('class','axis_title');
 // Add Y axis label:
 svg.append("text")
  .attr("x", -5)
  .attr("y", -10 )
  .text("CO2 Emission Amount")
  .attr("text-anchor", "end")
  .attr('class','axis_title')
  .attr("transform", "translate(-30,0)rotate(-90)")
  
  svg.append("text")
  .attr("text-anchor", "start")
  
  .attr("x", 10)
  .attr("y", -10)
  .text("CO2 Emission of some countries in 2017 (kilo-ton)")
  .attr('class','title');

//     svg.selectAll('line').append('line')
//     .attr('x1',0)
//     .attr('y1',0)
//     .attr('x2',width)
//     .attr('y2',height);

// var baseline = 100;
//   svg.selectAll('line')
//           .data(data)
//           .enter()
//           .append('line')
//           .attr('x1',function(d) { return x(d.country); })
//           .attr('y1',0)
//           .attr('x2',function(d) { return x(d.country); })
//           .attr('y2',function(d) { return y(d.emission); })
//           .style('stroke', 'black');

          


          // Bars


    })


    

// // Bars
// svg.selectAll("rect")
//   .data(data)
//   .enter()
//   .append("rect")
//     .attr("x", function(d) { return x(d.country); })
//     .attr("y", function(d) { return y(d.emission); })
//     .attr("width", x.bandwidth())
//     .attr("height", function(d) { return height - y(d.emission); })
//     .attr("fill", "#69b3a2")

    // var interval = 30;
    // var height = 550;
    // var padding = 5;
    // var padding_left = 130;
    // baseline = 490
    // d3.csv("../data/co2_emission_rel.csv", d => { 
    //     return { 
    //         country: d.country,
    //         emission: +d.emission,
    //         relative_to_avg: +d.relative_avg 
    //     };
    //   }).then(data => {
      
    //     console.log(data);
    //     var svg = d3.select('#lollipop_plot')
    //         //   .attr('width', width)
    //         //   .attr('height', height);
            
            
            
    //         //stick
    //         svg.selectAll('line')
    //         .data(data)
    //         .enter()
    //         .append('line')
    //         .attr('x1',(d,i)=>padding_left+ i * (interval + padding))
    //         .attr('y1',baseline)
    //         .attr('x2',(d,i)=>padding_left + i * (interval + padding))
    //         .attr('y2',d=>baseline-d.relative_to_avg/5000)
    //         .style('stroke', 'black');

    //         //circle
    //         svg.selectAll('circle')
    //         .data(data)
    //         .enter()
    //         .append('circle')
    //         .attr('cx', (d, i) => padding_left+i * (interval + padding))
    //         .attr('cy', d=>baseline-d.relative_to_avg/5000)
    //         .attr('r', 4) 
    //         .attr('fill','DarkOrange')
    //         .attr('class', 'bubble');

    //         // svg.selectAll('circle')
    //         //   .data(data)
    //         //   .enter()
    //         //   .append('circle')
    //         //   .attr('cx', (d, i) => dx / 2 + i * dx)
    //         //   .attr('cy', d => height / 2)
    //         //   .attr('r', d => 0.7 * d.value)  //with bubbles map to diameter or area
    //         //   .attr('class', 'bubble');
            
    //         //label
    //           svg.selectAll('text')
    //           .data(data)
    //           .enter()
    //           .append('text')
    //           .attr('x', (d, i) => padding_left+i * (interval + padding))
    //           //.attr('y', (d,i) => +30 + height / 2)
    //           .attr('y', d=>baseline-d.relative_to_avg/5000)
    //           .attr('y',(d,i)=>{return (d.relative_to_avg>0)? -10 + baseline-d.relative_to_avg/5000 : 20 + baseline-d.relative_to_avg/5000})
    //           .attr('class', 'bubble')
    //           .attr('font-size','12px')
    //           .attr('text-anchor', 'middle')
    //           .text(d => d.country)
    //           ;


    //           var refer = [2300000,1200000,300000,5000]
    //         //reference line

    //           //title
    //           svg.append("text")
    //             .attr('x', 300)             
    //             .attr('y',15)
    //             .attr('text-anchor', 'middle')
    //             .style('font-size', '20px')
    //             .style('color', 'black')
    //             .style('font-weight', 'bold')
    //             .text('CO2 Emission compared with world average in 2017 (kilo-ton)');
    //           //baseline
    //           svg.append('line')
    //           .attr('x1',0)
    //           .attr('y1',baseline)
    //           .attr('x2',850)
    //           .attr('y2',baseline)
    //           .style('stroke', 'black')
    //           .style('stroke-width','4px')
    //           ;
    //         //baseline label
    //           svg.append("text")
    //             .attr('x', 0)             
    //             .attr('y',baseline-10)
    //             .attr('text-anchor', 'left')
    //             .style('font-size', '12px')
    //             .style('color', 'black')
    //             .style('font-weight', 'bold')
    //             .text('World Avg: 170,000');

    //         //refer line 1,200,000
    //         var refer_val =290
    //             svg.append('line')
    //             .attr('x1',0)
    //             .attr('y1',refer_val)
    //             .attr('x2',850)
    //             .attr('y2',refer_val)
    //             .style('stroke', 'grey')
    //             .style('stroke-width','0.5px')
    //             ;
    //             //refer label
    //           svg.append("text")
    //           .attr('x', 0)             
    //           .attr('y',refer_val-3)
    //           .attr('text-anchor', 'left')
    //           .style('font-color', 'grey')
    //         .style('font-size','10px')
    //           .text('1,200,000');
            
    //           var refer_val_low =baseline+30
    //           svg.append('line')
    //           .attr('x1',0)
    //           .attr('y1',refer_val_low)
    //           .attr('x2',850)
    //           .attr('y2',refer_val_low)
    //           .style('stroke', 'grey')
    //           .style('stroke-width','0.5px')
    //           ;
    //           //refer label
    //         svg.append("text")
    //         .attr('x', 0)             
    //         .attr('y',refer_val_low-3)
    //         .attr('text-anchor', 'left')
    //         .style('font-color', 'grey')
    //       .style('font-size','10px')
    //         .text('25,000');
    //   });
            