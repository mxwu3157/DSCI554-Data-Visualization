function drawRect(svg, x, y, width, height, fill) {
    var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', width);
    rect.setAttribute('height', height);
    rect.setAttribute('fill', fill);
    svg.appendChild(rect);  //append to svg
  };
  
  function drawCircle(svg, cx, cy, r, fill) {
    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', fill);
    svg.appendChild(circle);  //append to svg
  };
  
  function drawText(svg, string, x, y, fill, stroke) {
    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('fill', fill);
    text.setAttribute('stroke', stroke);
    text.setAttribute('stroke-width', 1);
    text.setAttribute('font-size', '14px');
    text.innerHTML = string;
    svg.appendChild(text);  //append to svg
  };
  
  function drawTextCentered(svg, string, x, y, fill, stroke) {
    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('style', 'text-anchor: middle; alignment-baseline: middle;');
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('fill', fill);
    text.setAttribute('stroke', stroke);
    text.setAttribute('stroke-width', 1);
    text.setAttribute('font-size', '14px');
    text.innerHTML = string;
    svg.appendChild(text);  //append to svg
  };
  
  function drawLine(svg, x1, y1, x2, y2, stroke) {
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', stroke);
    line.setAttribute('stroke-width', 2);
    svg.appendChild(line);  //append to svg
  };
  
  //draw the chart!
  var svg = document.getElementById('chart');
  
  var keys =[
    { label: 'Europe', key: '#d83419ff' },
    { label: 'Middle East', key: '#ff911eff' },
    { label: 'North America', key: '#2f56c2ff' },
  ];
  
  //draw the legend
  var i = 0;
  keys.forEach(d => {
    drawRect(svg, 772, 71 + 30 * i, 15, 15, d.key);
    drawText(svg, d.label, 795, 83 + 30 * i);
    i++;
  })
  
  //draw an axis
  drawLine(svg, 130, 388, 130, 66, 'black');  //stroke has not default for line!
  drawLine(svg, 130, 388, 722, 388, 'black');  //stroke has not default for line! 
  
  

  //draw title
  drawText(svg,
             "Correlation between life expectancy, fertility rate and population of some world countries (2010)",
             126, 35);

  //draw axis title
  drawText(svg,
    'Life Expectancy',
    370, 425);

  drawText(svg,
    'Fertility Rate',
    38, 230);



  //draw bubbles
  
  //IRQ
  drawCircle(svg, 133, 91, 10, keys[1].key);
  drawTextCentered(svg, 'IRQ', 133, 91, 'white', 'black');

  //RUS
  drawCircle(svg, 154, 292, 21.5, keys[0].key);
  drawTextCentered(svg, 'RUS', 154, 292, 'white', 'black');
  
  //EGY
  drawCircle(svg, 331, 220, 15.5, keys[1].key);
  drawTextCentered(svg, 'EGY', 331, 220, 'white', 'black'); 

  //IRN
  drawCircle(svg, 313, 265, 14.5, keys[1].key);
  drawTextCentered(svg, 'IRN', 313, 265, 'white', 'black'); 
  
  //USA
  drawCircle(svg, 554, 278, 30, keys[2].key);
  drawTextCentered(svg, 'USA', 554, 278, 'white', 'black'); 
  
  //GBR
  drawCircle(svg, 630, 270, 13, keys[0].key);
  drawTextCentered(svg, 'GBR', 630, 270, 'white', 'black');   
 
  //DEU
  drawCircle(svg, 620, 306, 15, keys[0].key);
  drawTextCentered(svg, 'DEU', 620, 306, 'white', 'black');     

  //CAN
  drawCircle(svg, 656, 273, 10, keys[2].key);
  drawTextCentered(svg, 'CAN', 656, 273, 'white', 'black');  


  //draw a rectangle
  //drawRect(svg, 10, 10, 100, 100);