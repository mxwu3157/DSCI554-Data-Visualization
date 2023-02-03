var data = [1390000, 1240000, 318000, 127000, 82800, 62783, 34838, 29240, 9206, 5303];
var label = ['China',  'India' , 'USA', 'Japan' , 'Germany' , 'UK', 'Canada' , 'Malaysia', 'United Arab E.', 'Singapore'];
var width_ls = [321, 319, 288, 267, 257, 251, 237, 233, 207, 195];
//var width_ls = [3880, 3460, 88, 35, 23, 17, 9, 8, 2, 1]


d3.select('#chart5')
    .selectAll('div')
    .data(width_ls)
    .enter()
    .append('div')
    .attr('class', 'bar q5')
    .style('width', d => d + 'px')
    .style('height', d=> '30px')
    .text((d, i) => label[i]+' '+ data[i]);