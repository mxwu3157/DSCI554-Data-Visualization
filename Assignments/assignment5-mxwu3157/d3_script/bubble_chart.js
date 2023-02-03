
      
d3.csv("../data/bubble_20countries.csv", d => { 
  return { 
    country: d.country,
    relative_percentage_emission: +d.relative_percentage_emission,
    forest_perc:+d.forest_perc,
    agri_perc:+d.agri_perc
  };
}).then(data => {

  console.log(data);

  var width = 700, height = 100;
      var dx = 100;  //distance between centers
      var padding_left = 20;
    

  var svg = d3.select('#bubble_chart')
        // .attr('width', width)
        // .attr('height', height);
      
      svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d, i) =>padding_left+ d.forest_perc*9)
        .attr('cy', d =>  5*(height- d.agri_perc))
        .attr('r', d =>   d.relative_percentage_emission)  //with bubbles map to diameter or area
        .attr('fill', function (d) { return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'; })
        .attr('opacity',0.5)
        .attr('class', 'bubble');
        
      
        svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', (d, i) =>padding_left+ d.forest_perc*9)
        //.attr('y', (d,i) => +30 + height / 2)
        .attr('y',  d => 5*(height- d.agri_perc))
        .attr('class', 'bubble')
        .attr('text-anchor', 'middle')
        .attr('font-size','12px')
        .text(d => d.country)
        
        ;
      
        svg.append('text')
        .attr('x', 10)
        .attr('y', 15)
        .text('Forest Area% VS. Agriculture Area% with radius representing CO2 Emission Relative Percentage ')
        .style('font-size','17px')
        .style('font-weight','bold');

        svg.append('line')
      .attr('x1',10)
      .attr('y1',540)
      .attr('x2',10)
      .attr('y2',45)
      .style('stroke', 'black')
      ;
      svg.append('line')
      .attr('x1',10)
      .attr('y1',540)
      .attr('x2',900)
      .attr('y2',540)
      .style('stroke', 'black')
      ;
      svg.append("text")
      .attr('x', 15)             
      .attr('y',45)
      .attr('text-anchor', 'left')
      .style('font-size', '13px')
      .style('color', 'black')
      .style('font-weight', 'normal')
      .text('Agriculture Area%');
      
      svg.append("text")
      .attr('x', 820)             
      .attr('y',530)
      .attr('text-anchor', 'left')
      .style('font-size', '13px')
      .style('color', 'black')
      .style('font-weight', 'normal')
      .text('Forest Area%');
      
      
      svg.append('text')
      .attr('x',15)
      .attr('y',100)
      .style('font-size','13px')
      .attr('text-anchor', 'left')
      .text('80');
      svg.append('text')
      .attr('x',680)
      .attr('y',550)
      .style('font-size','13px')
      .attr('text-anchor', 'left')
      .text('75');
      svg.append('text')
      .attr('x',0)
      .attr('y',550)
      .style('font-size','13px')
      .attr('text-anchor', 'left')
      .text('0');

    });