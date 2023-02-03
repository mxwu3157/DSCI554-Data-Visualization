
  
  function drawCircle(svg, cx, cy, r, fill) {
    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', '#c26868ff');
    circle.setAttribute('stroke', 'black');
    circle.setAttribute('stroke-width', 1);
    svg.appendChild(circle);  //append to svg
  };
  
  function drawText(svg, string, x, y, fill, stroke) {
    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('fill', 'c26868ff');
    text.setAttribute('stroke', stroke);
    text.setAttribute('stroke-width', 3);
    text.setAttribute('font-size', '18px');
    text.setAttribute('font-weight','bold');
    text.innerHTML = string;
    svg.appendChild(text);  //append to svg
  };
  
  function drawTextCentered(svg, string, x, y, fill, stroke) {
    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('style', 'text-anchor: middle; alignment-baseline: middle;');
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('fill', 'black');
    //text.setAttribute('stroke', stroke);
    text.setAttribute('stroke-width', 4);
    text.setAttribute('font-size', '14px');
    text.setAttribute('font-weight','bold');
    text.innerHTML = string;
    svg.appendChild(text);  //append to svg
  };
  

  
  //draw the chart!
  var svg = document.getElementById('chart5');
  


  //draw title
  drawText(svg,
             "Bubble Cloud Chart for Electricity generation of some world countries in 2019",
             126, 35);

  

  //draw bubbles
  

  drawCircle(svg, 222, 136, 36);
  drawTextCentered(svg, 'Germany', 222, 136, 'black');
  
  drawCircle(svg, 228, 214, 25);
  drawTextCentered(svg, 'UK', 228, 214, 'black');

  drawCircle(svg, 266, 267, 8.5);
  drawTextCentered(svg, 'Malaysia', 246, 267, 'black');

  drawCircle(svg, 353, 194, 103);
  drawTextCentered(svg, 'China', 353, 194, 'black');

  drawCircle(svg, 388, 305, 13.5);
  drawTextCentered(svg, 'United Arab Emirates', 338, 305, 'black');

  drawCircle(svg, 447, 303, 40);
  drawTextCentered(svg, 'India', 447, 303, 'black');

  drawCircle(svg, 550, 319, 43);
  drawTextCentered(svg, 'Japan', 550, 319, 'black');

  drawCircle(svg, 515, 226, 58);
  drawTextCentered(svg, 'USA', 515, 226, 'black');

  drawCircle(svg, 469, 169, 15);
  drawTextCentered(svg, 'Canada', 469, 149, 'black');

  drawCircle(svg, 435, 115, 7);
  drawTextCentered(svg, 'Singapore', 435, 105, 'black');




  //draw a rectangle
  //drawRect(svg, 10, 10, 100, 100);