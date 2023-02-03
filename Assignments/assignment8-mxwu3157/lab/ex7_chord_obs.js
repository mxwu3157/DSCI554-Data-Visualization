var data = Object.assign([
    [.096899, .008859, .000554, .004430, .025471, .024363, .005537, .025471],
    [.001107, .018272, .000000, .004983, .011074, .010520, .002215, .004983],
    [.000554, .002769, .002215, .002215, .003876, .008306, .000554, .003322],
    [.000554, .001107, .000554, .012182, .011628, .006645, .004983, .010520],
    [.002215, .004430, .000000, .002769, .104097, .012182, .004983, .028239],
    [.011628, .026024, .000000, .013843, .087486, .168328, .017165, .055925],
    [.000554, .004983, .000000, .003322, .004430, .008859, .017719, .004430],
    [.002215, .007198, .000000, .003322, .016611, .014950, .001107, .054264]
], {
    names2: ["Apple", "HTC", "Huawei", "LG", "Nokia", "Samsung", "Sony", "Other"],
    colors2: ["#c4c4c4", "#69b40f", "#ec1d25", "#c8125c", "#008fc8", "#10218b", "#134b24", "#737373"]
});
var height =1000;
var width = 1000;
var names2 = data.names2 === undefined ? d3.range(data.length) : data.names2
var colors2 = data.colors2 === undefined ? d3.quantize(d3.interpolateRainbow, names2.length) : data.colors2
console.log(height)
console.log(width)
function ticks2({ startAngle, endAngle, value }) {
    const k = (endAngle - startAngle) / value;
    return d3.range(0, value, tickStep2).map(value => {
        return { value, angle: value * k + startAngle };
    });
}
var tickStep2 = d3.tickStep(0, d3.sum(data.flat()), 100)
var formatValue2 = d3.format(".1~%")
var chord2 = d3.chord()
    .padAngle(10 / innerRadius)
    .sortSubgroups(d3.descending)
    .sortChords(d3.descending)

var arc2 = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)

var ribbon2 = d3.ribbon()
    .radius(innerRadius - 1)
    .padAngle(1 / innerRadius)

var color2 = d3.scaleOrdinal(names2, colors2)
var outerRadius = Math.min(width, height) * 0.5 - 60

var innerRadius = outerRadius - 10

height = width;





    console.log('222');
    const svg2 = d3.create("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height]);

    const chords2 = chord2(data);

    const group2 = svg2.append("g")
        .attr("font-size", 15)
        .attr("font-family", "sans-serif")
        .selectAll("g")
        .data(chords2.groups)
        .join("g");

    group2.append("path")
        .attr("fill", d => color2(names2[d.index]))
        .attr("d", arc2);

    group2.append("title")
        .text(d => `${names2[d.index]}
${formatValue2(d.value)}`);

    const groupTick2 = group2.append("g")
        .selectAll("g")
        .data(ticks2)
        .join("g")
        .attr("transform", d => `rotate(${d.angle * 180 / Math.PI - 90}) translate(${outerRadius},0)`);

    groupTick2.append("line")
        .attr("stroke", "currentColor")
        .attr("x2", 6);

    groupTick2.append("text")
        .attr("x", 8)
        .attr("dy", "0.35em")
        .attr("transform", d => d.angle > Math.PI ? "rotate(180) translate(-16)" : null)
        .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
        .text(d => formatValue2(d.value));

    group2.select("text")
        .attr("font-weight", "bold")
        .text(function (d) {
            return this.getAttribute("text-anchor") === "end"
                ? `↑ ${names2[d.index]}`
                : `${names2[d.index]} ↓`;
        });

    svg2.append("g")
        .attr("fill-opacity", 0.8)
        .selectAll("path")
        .data(chords2)
        .join("path")
        .style("mix-blend-mode", "multiply")
        .attr("fill", d => color2(names2[d.source.index]))
        .attr("d", ribbon2)
        .append("title")
        .text(d => `${formatValue2(d.source.value)} ${names2[d.target.index]} → ${names2[d.source.index]}${d.source.index === d.target.index ? "" : `\n${formatValue2(d.target.value)} ${names2[d.source.index]} → ${names2[d.target.index]}`}`);

        console.log('aa')
    console.log(svg2);



d3.select('#vis2').node().appendChild(svg2.node());