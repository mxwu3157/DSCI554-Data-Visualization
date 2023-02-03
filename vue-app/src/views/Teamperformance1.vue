<template>
    <div id="bar1">
        <h2>
            Performance of each NFL team from 2000 to 2021
        </h2>

        <p>Use the select bar to filter Year</p>

        <select id="d3-dropdown_1" class="dropdown">
            <option value="2000">2000</option>
            <option value="2001">2001</option>
            <option value="2002">2002</option>
            <option value="2003">2003</option>
            <option value="2004">2004</option>
            <option value="2005">2005</option>
            <option value="2006">2006</option>
            <option value="2007">2007</option>
            <option value="2008">2008</option>
            <option value="2009">2009</option>
            <option value="2010">2010</option>
            <option value="2011">2011</option>
            <option value="2012">2012</option>
            <option value="2013">2013</option>
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
        </select>

        <div id="barchart"></div>
    </div>
</template>
  
<script>
import * as d3 from "d3";
export default {
    name: "BarChart",
    mounted: function () {
        d3.csv("nflteam.csv").then((data) => {
            this.barChart(data);
        });
    }, // mounted
    methods: {
        barChart(data) {

            const margin = { top: 10, right: 30, bottom: 150, left: 180 };
            const height = 700 - margin.top - margin.bottom; // height
            const width = 1000 - margin.left - margin.right; // width

            d3.select("select").on("change", function () {
                var selected = d3.select("#d3-dropdown_1").node().value;

                if (selected == "2000") {
                    d3.selectAll("#barchart> *").remove();
                    original_bar(data);
                } else {
                    d3.selectAll("#barchart> *").remove();
                    update_bar(selected);
                }
            });


            original_bar(data);

            function original_bar(data) {
                data = data.filter((d) => d.Year == "2000");

                // create svg element with margins and height
                var svg = d3
                    .select("#barchart")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr(
                        "transform",
                        "translate(" + margin.left + "," + margin.top + ")"
                    );

                // set the ranges
                var y = d3
                    .scaleBand()
                    .range([height, 20])
                    .padding(0.1)
                    .domain(data.map((d) => d.Team));

                var x = d3
                    .scaleLinear()
                    .range([0, width])
                    .domain([
                        0, 18
                    ]);


                // append the rectangles for the bar chart
                svg
                    .selectAll(".bar")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("fill", "lightgreen")
                    .attr("x", x(0))
                    .attr("y", (d) => y(d.Team))
                    .attr("width", (d) => x(d.W))
                    .attr("height", y.bandwidth())


                // append the rectangles for the bar chart
                svg
                    .selectAll(".bar")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("fill", "brown")
                    .attr("x", (d) => x(d.W))
                    .attr("y", (d) => y(d.Team))
                    .attr("width", (d) => x(d.L))
                    .attr("height", y.bandwidth())

                // add the x Axis
                svg
                    .append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .attr("class", "axis")
                    .call(d3.axisBottom(x).ticks(18));

                // add the y Axis
                svg
                    .append("g")
                    .attr("class", "axis")
                    .call(d3.axisLeft(y));

                // X Axis Label
                svg
                    .append("text")
                    .attr(
                        "transform",
                        "translate(" + width / 2 + " ," + (height + 40) + ")"
                    )
                    .style("text-anchor", "middle")
                    .style("font-size", "13px")
                    .style("color", "#fff")
                    .text("Times");

                // create legend using color function
                svg
                    .selectAll("mydots")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", width - 200)
                    .attr("y", 0)
                    .attr("width", 15)
                    .attr("height", 15)
                    .style("fill", "lightgreen");

                // create legend labels
                svg
                    .selectAll("mylabels")
                    .data(data)
                    .enter()
                    .append("text")
                    .attr("x", width - 180)
                    .attr("y", 10)
                    .style("fill", "black")
                    .text("Win")
                    .attr("text-anchor", "left")
                    .style("font-size", "18px")
                    .style("alignment-baseline", "middle");

                svg
                    .selectAll("mydots")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", width - 130)
                    .attr("y", 0)
                    .attr("width", 15)
                    .attr("height", 15)
                    .style("fill", "brown");

                // create legend labels
                svg
                    .selectAll("mylabels")
                    .data(data)
                    .enter()
                    .append("text")
                    .attr("x", width - 110)
                    .attr("y", 10)
                    .style("fill", "black")
                    .text("Lose")
                    .attr("text-anchor", "left")
                    .style("font-size", "18px")
                    .style("alignment-baseline", "middle");
            }

            function update_bar(selected) {
                const updated = data.filter((d) => d.Year == selected);

                var svg = d3
                    .select("#barchart")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr(
                        "transform",
                        "translate(" + margin.left + "," + margin.top + ")"
                    );

                // set the ranges
                var y = d3
                    .scaleBand()
                    .range([height, 20])
                    .padding(0.1)
                    .domain(updated.map((d) => d.Team));

                var x = d3
                    .scaleLinear()
                    .range([0, width])
                    .domain([
                        0, 18
                    ]);


                // append the rectangles for the bar chart
                svg
                    .selectAll(".bar")
                    .data(updated)
                    .enter()
                    .append("rect")
                    .attr("fill", "lightgreen")
                    .attr("x", x(0))
                    .attr("y", (d) => y(d.Team))
                    .attr("width", (d) => x(d.W))
                    .attr("height", y.bandwidth())

                // append the rectangles for the bar chart
                svg
                    .selectAll(".bar")
                    .data(updated)
                    .enter()
                    .append("rect")
                    .attr("fill", "brown")
                    .attr("x", (d) => x(d.W))
                    .attr("y", (d) => y(d.Team))
                    .attr("width", (d) => x(d.L))
                    .attr("height", y.bandwidth())

                // add the x Axis
                svg
                    .append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .attr("class", "axis")
                    .call(d3.axisBottom(x).ticks(18));

                // add the y Axis
                svg
                    .append("g")
                    .attr("class", "axis")
                    .call(d3.axisLeft(y));

                // X Axis Label
                svg
                    .append("text")
                    .attr(
                        "transform",
                        "translate(" + width / 2 + " ," + (height + 40) + ")"
                    )
                    .style("text-anchor", "middle")
                    .style("font-size", "13px")
                    .style("color", "#fff")
                    .text("Times");

                // create legend using color function
                svg
                    .selectAll("mydots")
                    .data(updated)
                    .enter()
                    .append("rect")
                    .attr("x", width - 200)
                    .attr("y", 0)
                    .attr("width", 15)
                    .attr("height", 15)
                    .style("fill", "lightgreen");

                // create legend labels
                svg
                    .selectAll("mylabels")
                    .data(updated)
                    .enter()
                    .append("text")
                    .attr("x", width - 180)
                    .attr("y", 10)
                    .style("fill", "black")
                    .text("Win")
                    .attr("text-anchor", "left")
                    .style("font-size", "18px")
                    .style("alignment-baseline", "middle");

                svg
                    .selectAll("mydots")
                    .data(updated)
                    .enter()
                    .append("rect")
                    .attr("x", width - 130)
                    .attr("y", 0)
                    .attr("width", 15)
                    .attr("height", 15)
                    .style("fill", "brown");

                // create legend labels
                svg
                    .selectAll("mylabels")
                    .data(updated)
                    .enter()
                    .append("text")
                    .attr("x", width - 110)
                    .attr("y", 10)
                    .style("fill", "black")
                    .text("Lose")
                    .attr("text-anchor", "left")
                    .style("font-size", "18px")
                    .style("alignment-baseline", "middle");

            }
        },
    },
};
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
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
    font-size: 1.2em;
}

#bar1 {
    padding-left: 10px;
}
</style>
  