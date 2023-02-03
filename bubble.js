
d3.json("bubble_pack.json").then(data=> {
    console.log('bubblbbbbe');
    
    var svg = d3.select("#vis_bubble"),
        diameter = +svg.attr("width"),
        g = svg.append("g").attr("transform", "translate(2,2)"),
        format = d3.format(",d");
    var pack = d3.pack()
        .size([diameter - 4, diameter - 4]);

    data = d3.hierarchy(data.name, data.children)
    console.log(data)
    data
        .sum(function (d) { return d.value; })
        .sort(function (a, b) { return b.value - a.value; });
console.log(d)
    var node = g.selectAll(".node")
        .data(pack(data).descendants())
        .enter().append("g")
        .attr("class", function (d) { return d.children ? "node" : "leaf node"; })
        .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("title")
        .text(function (d) { return d.data.name + "\n" + format(d.value); });

    node.append("circle")
        .attr("r", function (d) { return d.r; });

    node.filter(function (d) { return !d.children; }).append("text")
        .attr("dy", "0.3em")
        .text(function (d) { return d.data.name.substring(0, d.r / 3); });
});