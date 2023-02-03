<template>
    <div class="QB container my-5" >

        <div id="chart1">
            <h1 class="my-5">Seasonal Top Quarterbacks Players</h1>
<div style="height:10px"></div>

            <h3 class="mt-4 mb-5">Player Performance & Trends</h3>
            <div style="text-align:left">
            <p>The quarterback is crucial to the success of a team.
            We can measure greatness by the number of Wins</p>
            <p>The below lollipop chart shows the number of wins and lost upon 2021 season. We can see that the player are ranked based on the number of wins in descending order
                . The longer the range is, the greater the difference in the number of wins and lost, which means flactuating performance.
        
            </p>
            <p>Insight1: Tom Brady is defenitely one of the greatest QB player, as we can see that his number of wins way outperformed ohter great QB players, and the average number of wons among all other QB players (84)</p>
            <p>Insight2: Players with long bar and far reaching the right side relatively gives better performance. </p>
            </div>
            <div class="row">
                <div class="col-md-6 ">
                    <svg width="700" height="700" id="lollipop_plot"
                        style="background-color:transparent; align-self: end;" ></svg>

                </div>
                <div class="col-md-6" id="clickchart1">
                    <svg width="800" height="600" id="multiline_plot" class="my-5"
                        style="background-color:GhostWhite; align-self:start">
                    </svg>


                </div>
            </div>
            <div style="height:20px"></div>
            <div class="">
                <h3 >Player Statistics Lookup</h3>
                <div style="text-align:left">
                    <!-- <p>Below is the detailed statistics of the selected QB Players. The explanation of the variables is also indicated at the bottom.</p> -->
                </div>
                <div id="table-area" >
                    
                    <div id="stats-table" >
                        <svg width="1000" height="500" id="placeholder" class="ml-2" style="background-color:GhostWhite;align-self: start;">
                            <text x="25%" y="50%" style="font-size:20px">
                                Selected Player's Career Statistics will be displayed here
                            </text></svg>
                    </div>
                </div>
                
                <div id="description" class="my-3">
                    <h4 style="text-align:left">The variables represents the following statistics about a player:</h4>
                    <ul style="text-align:left;">
                        <li><strong>G</strong>: The number of game a player has played at a given position</li>
                        <li><strong>GS</strong>: The number of games started. This is complete from 1980 forward, and partially complete before that</li>
                        <li><strong>COMP</strong>: The number of passing completed</li>
                        <li><strong>Comp%</strong>: Completion percentage: completions/(passing attempts).</li>
                        <li><strong>ATT</strong>: Attempts. If in a rushing table, this is rushing attempts. If in a passing table, it means passing attempts</li>
                        <li><strong>YDS</strong>: Total receiving yards.</li>
                        <li><strong>AVG</strong>: Average yards per game (Total yards divided by receptions)</li>
                        <li><strong>TD</strong>: Number of completed passes resulting in a touchdown.</li>
                        <li><strong>INT</strong>: In a passing table, this means interceptions thrown. In a defensive table, it means interceptions caught.</li>
                        <li><strong>RATE</strong>: The effectiveness of a quarterback throwing a football during a game</li>
                        <li><strong>FUM</strong>: Total fumbles. A fumble is any act, other than a pass or kick, which results in a loss of player possession.</li>
                        <li><strong>SCK</strong>: The number of times being sakced. A sack occurs when the quarterback (or another offensive player acting as a passer) is tackled behind the line of
                        scrimmage before throwing a forward pass, when the quarterback is tackled behind the line of scrimmage in the "pocket"
                        and without clear intent, or when a passer runs out of bounds behind the line of scrimmage due to defensive pressure.[1]</li>
    
                        
                    </ul>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3';
export default {
    name: 'Quarterbacks',
    components: {
    },
    methods: {
        lollipop() {
            var margin = { top: 50, right: 40, bottom: 50, left: 100 },
                width = 500 - margin.left - margin.right,
                height = 700 - margin.top - margin.bottom;

            var promises = [];
            var files = ["QB_win_lost.csv", "QB_stats.csv", 'player_stats.csv'];
            files.forEach((url) => promises.push(d3.csv(url)));
            Promise.all(promises).then(function (values) {
                var data = values[0]
                var data_stats = values[1]
                var data_detailed = values[2]
                console.log('data_satt', data_stats)
                data.forEach(function (d) {
                    //d.Player = d["Player"];
                    d.age = +d["Age in 2021"];
                    d.Lost = +d["Lost"];
                    d.Won = +d["Won"];
                });
                data_stats.forEach(function (d) {
                    var parseTime = d3.timeParse("%Y");

                    d.YEAR = parseTime(d["YEAR"]);
                    d.PCT_CMP = +d["PCT_CMP"];
                    d.TD = +d["TD"];
                    d.RATE = +d["RATE"];
                    d.PCT_TD = +d["PCT_TD"];

                }); console.log('data_detailed', data_detailed)



                var svg = d3.select("#lollipop_plot")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");
                // Y axis
                var y = d3.scaleBand()
                    .range([height, 0])
                    .domain(data.map(function (d) { return d.Player; }))
                    .padding(0.99);

                svg.append("g")
                    //.attr("transform", "translate(0," + height + ")")
                    .call(d3.axisLeft(y))
                    .selectAll("text")
                    //.attr("transform", "translate(-10,0)rotate(-45)")
                    .style("text-anchor", "end")
                    .style('font-size', "13px")
                    ;

                // Add X axis
                var x = d3.scaleLinear()
                    .domain([
                        d3.min([30, d3.min(data, d => d.Lost), d3.min(data, d => d.Won)]),
                        d3.max([d3.max(data, d => d.Lost), d3.max(data, d => d.Won), 200])
                    ])
                    .range([0, width]);
                svg.append("g")
                    .call(d3.axisTop(x).tickFormat(d3.format(",.0f")).ticks(20))
                    .selectAll("text")
                    .style("text-anchor", "start")
                    .attr("transform", "rotate(-65)");


                var avg_won = 79;


                var div = d3.select("#chart1").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0)
                    .attr('height', "100px")
                    ;
                var clickname, clickdata;


                /////////multiline finctions
                //////////////////
                function multiline(clickname, clickdata) {
                    console.log('in multiline')
                    console.log(clickdata);
                    console.log(clickname);
                    console.log('width', d3.select(this))

                    var margin = {
                        top: 20 * 4,
                        right: 20 * 4,
                        bottom: 30 * 4,
                        left: 50 * 2
                    },
                        width = 800 - margin.left - margin.right,
                        height = 600 - margin.top - margin.bottom;
                    var x = d3.scaleTime().range([0, width]);
                    var y = d3.scaleLinear().range([height, 0]);

                    var valueline = d3.line()
                        .x(function (d) { return x(d.YEAR); })
                        .y(function (d) { return y(d.PCT_CMP); });
                    var valueline2 = d3.line()
                        .x(function (d) { return x(d.YEAR); })
                        .y(function (d) { return y(d.TD); });



                    d3.select("#multiline_plot").selectAll("*").remove();

                    var svg = d3.select("#multiline_plot")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform",
                            "translate(" + margin.left + "," + margin.top + ")");


                    const tooltip = d3.select('#clickchart1')
                        .append('div')
                        .attr('class', 'tooltip2')
                        .style("opacity", 0)
                        .attr('height', "100px")
                        .attr('width', "200px");
                    const tooltipLine = svg.append('line');

                    x.domain(d3.extent(clickdata, function (d) { return d.YEAR; }));
                    y.domain([0, 100]);
                    svg.append("path")
                        .data([clickdata])
                        .attr("class", "line")
                        .attr("d", valueline);

                    // Add the valueline2 path.
                    svg.append("path")
                        .data([clickdata])
                        .attr("class", "line")
                        .style("stroke", "red")
                        .attr("d", valueline2);

                    svg.append("g")
                        .attr("transform", "translate(0," + height + ")")
                        .call(d3.axisBottom(x).ticks(20));

                    svg.append('rect')
                        .attr('width', width)
                        .attr('height', height)
                        .attr('opacity', 0)
                        .on('mousemove', drawTooltip)
                        .on('mouseout', removeTooltip);

                    function removeTooltip() {
                        if (tooltip) tooltip.style('display', 'none');
                        if (tooltipLine) tooltipLine.attr('stroke', 'none');

                    }
                    function drawTooltip() {
                        var year = x.invert(d3.pointer(event, this)[0])
                        tooltipLine.attr('stroke', 'black')
                            .attr('x1', x(year))
                            .attr('x2', x(year))
                            .attr('y1', 0)
                            .attr('y2', height);
                        console.log(clickdata.find(a => a.YEAR.getYear == year.getYear))
                        tooltip.transition()
                            .duration(100)
                            .style("opacity", .7)
                        console.log(clickdata.filter(a => a.YEAR.getYear() == year.getYear()))
                        tooltip
                            .html(`<strong>` + (year.getYear() + 1900) + `</strong>` + '<br> Perc Passing: ' + clickdata.filter(a => a.YEAR.getYear() == year.getYear())[0].PCT_CMP + "%"
                                + '<br> Num TouchDown: ' + clickdata.filter(a => a.YEAR.getYear() == year.getYear())[0].TD)
                            .style('display', 'block')
                            .style('left', (d3.pointer(event, this)[0] + 130) + "px")
                            .style('top', (d3.pointer(event, this)[1] + 70) + "px")

                    }


                    // Add the Y Axis
                    svg.append("g")
                        .call(d3.axisLeft(y));

                    // legend
                    svg
                        .append("rect")
                        .style("fill", 'orange')
                        .style("stroke", 'orange')
                        .attr("x", 0.7 * width)
                        .attr("y", 0.05 * height)
                        .attr("width", 15)
                        .attr("height", 15);

                    svg.append("text")
                        .attr("x", 0.7 * width + 20)
                        .attr("y", 0.05 * height + 15)
                        .text("Percentage of Passing completed")
                        .style('font-size', '12px')
                    // .attr('class', 'axis_title');

                    svg
                        .append("rect")
                        .style("fill", 'red')
                        .style("stroke", 'red')
                        .attr("x", 0.7 * width)
                        .attr("y", 0.05 * height + 30)
                        .attr("width", 15)
                        .attr("height", 15);
                    svg.append("text")
                        .attr("x", 0.7 * width + 20)
                        .attr("y", 0.05 * height + 30 + 15)
                        .text("Total TouchDown completed")
                        .style('font-size', '12px')
                    // .attr('class', 'axis_title');

                    svg.append("text")
                        .attr("x", -70)
                        .attr("y", 0.5 * height)
                        .text("Value")
                        .attr('class', 'axis_title');
                    // .style('font-size', '12px')

                    var t = svg.append("text")
                        .attr("x", 0.25 * width)
                        .attr("y", -30)
                    t.append('tspan')
                        .text(`${clickname} `)
                        .style('font-weight', "bold")
                    t.append('tspan')
                        .text(`'s TouchDown & Passing Statisitcs`)



                }
                function create_table(clickname) {
                    var t_data = data_detailed.filter(d => d.Player == clickname)
                    d3.select("#stats-table").selectAll("*").remove();

                    function func(d, arr) {
                        const resArray = [];
                        console.log('ddd', d)
                        var excludes = ['Logo', 'n_injuries']
                        for (const [key, value] of Object.entries(d)) {
                            if (!excludes.includes(`${key}`)) { resArray.push(`${value}`); }
                        }
                        arr.push(resArray)
                        // return resArray
                    }

                    var data_info_array = []
                    console.log(Object.keys(t_data[0]))
                    data_info_array.push(Object.keys(t_data[0]))

                    t_data.map(a => func(a, data_info_array))
                    console.log(data_info_array);


                    d3.select("#stats-table").append("table")
                        .attr("class", "table table-bordered table-striped table-hover table-sm th-sm ")
                        // .style("width", "500px")
                        .style("margin", "auto")
                        .attr('id', 'palyer_table')


                    d3.select("#palyer_table")
                        .append('tbody')
                        .selectAll('tr')
                        .data(data_info_array)
                        .enter()
                        .append('tr')
                        .style('font-weight', (d, i) => {
                            return (i == 0) ? 'bold' : 'normal';
                        })
                        .style('background', (d, i) => { return (i == 0) ? 'gainsboro' : ''; })
                        .selectAll('td')
                        .data(d => d)
                        .enter()
                        .append('td')
                        .style('vertical-align', 'middle')
                        .style('text-align', 'left')
                        .text(d => d)

                }

                d3.select("#multiline_plot")
                    .append('text')
                    .attr('x', "25%")
                    .attr('y', "50%")
                    .style('font-size', '20px')
                    .text('Click the lollipop to see more statistics about the player')

                svg.selectAll("rect")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", function (d) { return d3.min([x(d.Lost), x(d.Won)]); })
                    .attr("y", function (d) { return y(d.Player); })
                    .attr("width", function (d) { return Math.abs(x(d.Lost) - x(d.Won)) })
                    .attr("height", function () { return 15 })
                    .attr("fill", "lightgrey")
                    .on("click", function () {
                        clickname = d3.select(this)["_groups"][0][0]["__data__"]['Player']
                        console.log('aaa', clickname);
                        clickdata = data_stats.filter(d => d.Player == clickname)
                        console.log('bbb', clickdata);
                        multiline(clickname, clickdata);
                        create_table(clickname);
                    })
                    .on("mouseover", function (event, d) {
                        div.transition()
                            .duration(100)
                            .style("opacity", .7)

                        div.html(d.Player + "<br/>Age: " + d.age + "<br/>Won: " + d.Won + "<br/>Lost: " + d.Lost)
                            .style("left", (event.pageX) + "px")
                            .style("top", (event.pageY - 28) + "px")
                            ;
                    })
                    .on("mouseout", function () {
                        div.transition()
                            .duration(500)
                            .style("opacity", 0);
                    })

                svg.append('rect')
                    .attr("x", function () { return x(avg_won); })
                    .attr("y", function () { return y(0); })
                    .attr("width", 2)
                    .attr("height", function () { return height; })
                    .attr("fill", "grey")


                svg.selectAll('circle')
                    .data(data)
                    .enter()
                    .append('circle')
                    .attr('cy', function (d) { return y(d.Player) + 8; })
                    .attr('cx', function (d) { return x(d.Lost); })
                    .attr('r', 10)
                    .attr('fill', 'lightblue')
                    .attr('class', 'bubble')

                //svg.append('g')
                svg.selectAll()
                    .data(data)
                    .enter()
                    .append('circle')
                    .attr('cy', function (d) { return y(d.Player) + 8; })
                    .attr('cx', function (d) { return x(d.Won); })
                    .attr('r', 10)
                    .attr('fill', 'orange')
                    .attr('class', 'bubble')


                //add labels
                svg.append("text")
                    .attr("text-anchor", "end")
                    .attr("x", width / 2 + 50)
                    .attr("y", -30)
                    .text("Won/Lost Count by 2021")
                    .attr('class', 'axis_title')
                    .style('font-weight', 'bold');

                svg.append('rect')
                    .attr("x", width - 0.2 * width)
                    .attr("y", 200)
                    .attr("width", 20)
                    .attr("height", 20)
                    .attr("ry", 5)
                    .attr("rx", 5)
                    .attr("fill", "orange");
                svg.append('rect')
                    .attr("x", width - 0.2 * width)
                    .attr("y", 230)
                    .attr("width", 20)
                    .attr("height", 20)
                    .attr("ry", 5)
                    .attr("rx", 5)
                    .attr("fill", "lightblue");
                svg.append("text")
                    .attr("x", width - 0.1 * width)
                    .attr("y", 215)
                    .text("Won")
                    .attr('class', 'axis_title');
                svg.append("text")
                    .attr("x", width - 0.1 * width)
                    .attr("y", 245)
                    .text("Lost")
                    .attr('class', 'axis_title');
                svg.append("text")
                    .attr("x", x(avg_won) - 50)
                    .attr("y", height + 10)
                    .text("Avg Won Count")
                    .attr('font-size', 14)
                // .attr('class', 'axis_title');





            });


        }
    },

    mounted: function () {
        //console.log('mounted');
        this.lollipop();
    },

}

</script>
<!-- "scoped" attribute limits CSS to this component only -->
<style scoped>
::v-deep .line {
    fill: none;
    stroke: orange;
    stroke-width: 2px;
}

::v-deep div.tooltip {
    position: absolute;
    text-align: center;
    width: 100px;
    height: 60px;
    padding: 2px;
    font: 12px sans-serif;
    background: lightsteelblue;
    border: 0px;
    border-radius: 8px;
    pointer-events: none;
}

::v-deep div.tooltip2 {
    position: absolute;
    text-align: center;
    width: 150px;
    height: 50px;
    padding: 2px;
    font: 12px sans-serif;
    background: lightsteelblue;
    border: 0px;
    border-radius: 8px;
    pointer-events: none;
}

::v-deep text.label {
    /* need to add >>> to gets passed to d3 because vue creates new mapping */
    text-anchor: end;
    alignment-baseline: middle;
    font-size: 12px;
    fill: black;
}

::v-deep text.value {
    font-family: 'Courier New', Courier, monospace;
    font-weight: bolder;
    font-size: 12px;
    text-anchor: end;
    alignment-baseline: middle;
    fill: #eee;
}

::v-deep rect.bar {
    text-align: right;
    /* pull value text to the end of the bar */
    vertical-align: middle;
    /* align value text with middle of the bar */
    fill: #7abcff;
    height: 20px;
    /* bar height, this can stay fixed */
}

.title {
    margin-bottom: 0px;
    font-size: 15px;
}
</style>
