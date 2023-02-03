<template>
    <div id="line1">

        <h2>
            Statistics of Points for each NFL team from 2000 to 2021
        </h2>

        <p>Use the select bar to filter NFL team</p>

        <select id="d3-dropdown_2" class="dropdown">

            <option value="Los Angeles Chargers">Los Angeles Chargers</option>
            <option value="Arizona Cardinals">Arizona Cardinals</option>
            <option value="Cleveland Browns">Cleveland Browns</option>
            <option value="Atlanta Falcons">Atlanta Falcons</option>
            <option value="Cincinnati Bengals">Cincinnati Bengals</option>
            <option value="Chicago Bears">Chicago Bears</option>
            <option value="Dallas Cowboys">Dallas Cowboys</option>
            <option value="New England Patriots">New England Patriots</option>
            <option value="San Francisco 49ers">San Francisco 49ers</option>
            <option value="Seattle Seahawks">Seattle Seahawks</option>
            <option value="Carolina Panthers">Carolina Panthers</option>
            <option value="Jacksonville Jaguars">Jacksonville Jaguars</option>
            <option value="Kansas City Chiefs">Kansas City Chiefs</option>
            <option value="Buffalo Bills">Buffalo Bills</option>
            <option value="Washington Commanders">Washington Commanders</option>
            <option value="Detroit Lions">Detroit Lions</option>
            <option value="Green Bay Packers">Green Bay Packers</option>
            <option value="New York Jets">New York Jets</option>
            <option value="Pittsburgh Steelers">Pittsburgh Steelers</option>
            <option value="Indianapolis Colts">Indianapolis Colts</option>
            <option value="Los Angeles Rams">Los Angeles Rams</option>
            <option value="New Orleans Saints">New Orleans Saints</option>
            <option value="Tampa Bay Buccaneers">Tampa Bay Buccaneers</option>
            <option value="Denver Broncos">Denver Broncos</option>
            <option value="Miami Dolphins">Miami Dolphins</option>
            <option value="Minnesota Vikings">Minnesota Vikings</option>
            <option value="Philadelphia Eagles">Philadelphia Eagles</option>
            <option value="Baltimore Ravens">Baltimore Ravens</option>
            <option value="Las Vegas Raiders">Las Vegas Raiders</option>
            <option value="New York Giants">New York Giants</option>
            <option value="Tennessee Titans">Tennessee Titans</option>

        </select>

        <div id="lchart"></div>

    </div>
</template>
  
<script>
import * as d3 from "d3";
export default {
    name: "LineChart",
    mounted: function () {
        d3.csv("nflteam.csv").then((data) => {
            this.lineChart(data);
        });
    }, // mounted
    methods: {

        lineChart(data) {

            const margin = { top: 50, right: 50, bottom: 150, left: 75 };
            const height = 700 - margin.top - margin.bottom; // height
            const width = 900 - margin.left - margin.right; // width

            var parseTime = d3.timeParse("%Y");

            data.forEach(function (d) {
                d.Year = parseTime(d.Year);
            });


            d3.select("select")
                .on("change", function () {
                    var selected = d3.select("#d3-dropdown_2").node().value;

                    if (selected == "Los Angeles Chargers") {
                        d3.selectAll("#lchart> *").remove();
                        original_line(data)
                    } else {
                        d3.selectAll("#lchart> *").remove();
                        update_line(selected);
                    }
                });

            original_line(data);

            function original_line(data) {

                data = data.filter(d => d.Team == "Los Angeles Chargers");

                const svg = d3.select("#lchart")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");

                //scale x axis 
                const x = d3.scaleTime()
                    .domain(d3.extent(data, d => d.Year))
                    .range([0, width]);


                //scale y axis
                const y = d3.scaleLinear()
                    .domain([0, 700])
                    .range([height, 0]);


                svg.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x));

                svg.append("text")
                    .attr("transform", "translate(" + (width) + " ," + (height + 35) + ")")
                    .style("text-anchor", "end")
                    .style('font-size', '14px')
                    .style('color', '#fff')
                    .text("Year");

                // draw y axis and label    
                svg.append("g")
                    .attr("class", "axis")
                    .call(d3.axisLeft(y).ticks(10));

                svg.append("text")
                    .attr('transform', 'rotate(-90)')
                    .attr('y', 10 - margin.left)
                    .attr('x', 0 - (height / 2))
                    .style('font-size', '14px')
                    .style('color', '#fff')
                    .attr('dy', '1em')
                    .style('text-anchor', 'middle')
                    .text("Points");

                const line1 = d3.line()
                    .x(function (d) { return x(d.Year); })
                    .y(function (d) { return y(d.PF); });

                const line2 = d3.line()
                    .x(function (d) { return x(d.Year); })
                    .y(function (d) { return y(d.PA); });

                svg.append("path")
                    .datum(data)
                    .attr("fill", "none")
                    .attr("stroke", "lightgreen")
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-linecap", "round")
                    .attr("stroke-width", 3)
                    .attr("d", line1);

                svg.append("path")
                    .datum(data)
                    .attr("fill", "none")
                    .attr("stroke", "brown")
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-linecap", "round")
                    .attr("stroke-width", 3)
                    .attr("d", line2);

                // create legend using color function
                svg.selectAll("mydots")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", width / 2 - 20)
                    .attr("y", 12)
                    .attr("width", 15)
                    .attr("height", 15)
                    .style("fill", "lightgreen");

                // create legend labels
                svg.selectAll("mylabels")
                    .data(data)
                    .enter()
                    .append("text")
                    .attr("x", width / 2)
                    .attr("y", 20)
                    .style("fill", "black")
                    .text("Score Earned")
                    .attr("text-anchor", "left")
                    .style('font-size', '14px')
                    .style("alignment-baseline", "middle");

                svg.selectAll("mydots")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", width / 2 + 100)
                    .attr("y", 12)
                    .attr("width", 15)
                    .attr("height", 15)
                    .style("fill", "brown");

                // create legend labels
                svg.selectAll("mylabels")
                    .data(data)
                    .enter()
                    .append("text")
                    .attr("x", width / 2 + 120)
                    .attr("y", 20)
                    .style("fill", "black")
                    .text("Score Lost")
                    .attr("text-anchor", "left")
                    .style('font-size', '14px')
                    .style("alignment-baseline", "middle");

            }

            function update_line(selected) {

                const updated = data.filter(d => d.Team == selected);

                const svg = d3.select("#lchart")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");

                //scale x axis 
                const x = d3.scaleTime()
                    .domain(d3.extent(updated, d => d.Year))
                    .range([0, width]);


                //scale y axis
                const y = d3.scaleLinear()
                    .domain([0, 700])
                    .range([height, 0]);


                svg.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x));

                svg.append("text")
                    .attr("transform", "translate(" + (width) + " ," + (height + 35) + ")")
                    .style("text-anchor", "end")
                    .style('font-size', '14px')
                    .style('color', '#fff')
                    .text("Year");

                // draw y axis and label    
                svg.append("g")
                    .attr("class", "axis")
                    .call(d3.axisLeft(y).ticks(10));

                svg.append("text")
                    .attr('transform', 'rotate(-90)')
                    .attr('y', 10 - margin.left)
                    .attr('x', 0 - (height / 2))
                    .style('font-size', '14px')
                    .style('color', '#fff')
                    .attr('dy', '1em')
                    .style('text-anchor', 'middle')
                    .text("Points");

                const line1 = d3.line()
                    .x(function (d) { return x(d.Year); })
                    .y(function (d) { return y(d.PF); });

                const line2 = d3.line()
                    .x(function (d) { return x(d.Year); })
                    .y(function (d) { return y(d.PA); });

                svg.append("path")
                    .datum(updated)
                    .attr("fill", "none")
                    .attr("stroke", "lightgreen")
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-linecap", "round")
                    .attr("stroke-width", 3)
                    .attr("d", line1);

                svg.append("path")
                    .datum(updated)
                    .attr("fill", "none")
                    .attr("stroke", "brown")
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-linecap", "round")
                    .attr("stroke-width", 3)
                    .attr("d", line2);

                svg.selectAll("mydots")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", width / 2 - 20)
                    .attr("y", 12)
                    .attr("width", 15)
                    .attr("height", 15)
                    .style("fill", "lightgreen");

                // create legend labels
                svg.selectAll("mylabels")
                    .data(data)
                    .enter()
                    .append("text")
                    .attr("x", width / 2)
                    .attr("y", 20)
                    .style("fill", "black")
                    .text("Score Earned")
                    .attr("text-anchor", "left")
                    .style('font-size', '14px')
                    .style("alignment-baseline", "middle");

                svg.selectAll("mydots")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", width / 2 + 100)
                    .attr("y", 12)
                    .attr("width", 15)
                    .attr("height", 15)
                    .style("fill", "brown");

                // create legend labels
                svg.selectAll("mylabels")
                    .data(data)
                    .enter()
                    .append("text")
                    .attr("x", width / 2 + 120)
                    .attr("y", 20)
                    .style("fill", "black")
                    .text("Score Lost")
                    .attr("text-anchor", "left")
                    .style('font-size', '14px')
                    .style("alignment-baseline", "middle");
            }





        } //bubble chart
    }, // methods
}

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

/* stylize the menu */
.dropdown {
    border-radius: 5px;
    padding: 5px;
    width: 250px;
    margin: 1%;
    cursor: pointer;
}

option:hover {
    cursor: pointer;
}

.axis path,
.axis line {
    fill: none;
    stroke: black;
    shape-rendering: crispEdges;
}

.axis text {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 1.2em;
}

#line1 {
    padding-left: 10px;
}
</style>
  