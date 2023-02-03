
    var width = 39;
    var height = 550;
    var padding = 5;
    var padding_bottom = 5;
    var left_padding = 15;
    d3.json("../data/co2_emission_freq.json").then((data) => {

    console.log(data);
    var enter = d3.select('#barplot')
      .selectAll('rect')
      .data(data)
      .enter();
    
    enter.append('rect')
      .attr('x', (d, i) =>left_padding + i * (width + padding))
      .attr('y', d => height - 5*d.relative_percentage_emission )
      .attr('width', d => width)
      .attr('height', d => 5*d.relative_percentage_emission)
      .attr('fill', function (d) { return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'; })
      .attr('opacity',0.3)
      .attr('class', 'bar');
    
    enter.append('text')
      .attr('x', (d, i) =>left_padding +  i * (width + padding) +3) //2px from bar start
      .attr('y', d => height - 5*d.relative_percentage_emission-5)
      .attr('class', 'bar')
      .style('font-size', '12px')
      .text(d => d.country);
    
      
    
    enter.append("text")
      .attr('x', 0)             
      .attr('y', 20)
      .attr('text-anchor', 'left')
      .style('font-size', '20px')
      .style('color', 'black')
      .style('font-weight','bold')
      .text('Relative Percentage CO2 Emission in 2017 (kilo-ton)');
    
      enter.append('line')
      .attr('x1',0)
      .attr('y1',height)
      .attr('x2',0)
      .attr('y2',45)
      .style('stroke', 'black')
      ;
      enter.append('text')
      .attr('x',0)
      .attr('y',height)
      .style('font-size','10px')
      .text('0%');
      enter.append('text')
      .attr('x',0)
      .attr('y',45)
      .style('font-size','10px')
      .text('100%');


    });
    