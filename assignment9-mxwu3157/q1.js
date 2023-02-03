
var promises = [];
var files = ['data/countries.json', 'data/q1.json'];

files.forEach(url => promises.push(d3.json(url)));

Promise.all(promises).then(function (values) {  //use Promise.all to load map and data
    var us = values[0];
    var data = values[1].slice(1);
    // data = data.map(([country, value]) => [country, +value])

    var map_data = us
    countries = topojson.feature(map_data, map_data.objects.countries)
const width = 900
    const w = width < 1100 ? width : 1100
    const h = 0.625 * w
    projection = d3.geoNaturalEarth1().fitSize([w + 20, h], countries)
    path = d3.geoPath().projection(projection)

    svg = d3.select('#q1')
        .attr('viewBox', [0, 0, w, h])
        ;

    svg
        .append("path")
        .attr("d", path(d3.geoGraticule10()))
        .attr("fill", "none")
        .attr("stroke", "#333")
        .attr("stroke-width", 0.4);

    let country_group = svg.append("g");
    country_group
        .selectAll("path")
        .data(countries.features)
        .join("path")
        .attr("d", path)
        // .attr("data-pop", (d) => console.log(d[0], d[1]))
        .attr("fill", "#eee")
        .attr("stroke", "black")
        .attr("stroke-width", 1);
        /////////////////////////////////////////
    let max_pop = d3.max(data.map((o) => o[1]));
    let bubble_group = svg.append("g");

    let dictionary = Object.assign({}, ...countries.features.map((x) => ({ [x.properties.NAME]: x })));
    
    a = dictionary[data[0][0]]
    bubble_group
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", (d) => path.centroid(dictionary[d[0]])[0])
        .attr("cy", (d) => path.centroid(dictionary[d[0]])[1])
        .attr("r", (d) => 20 * Math.sqrt(d[1] / max_pop))
        .attr("fill", "lightblue")
        .attr("stroke", "black");
    radius = d3.scaleSqrt([0, 0.5, 0.985], [0, 15]);

    const legend = svg.append('g')
        .attr('fill', '#777')
        .attr('transform', 'translate(925,608)')
        .attr('text-anchor', 'middle')
        .style('font', '10px sans-serif')
        .selectAll('g')
        .data([0, 0.5, 1])
        .join('g');
console.log(legend)
    legend.append('circle')
        .attr('fill', 'none')
        .attr('stroke', '#ccc')
        .attr('cy', d => -radius(d))
        .attr('r', radius);

    legend.append('text')
        .attr('y', d => -2 * radius(d))
        .attr('dy', '1.3em')
        .text(d3.format('.1s'));
    
});