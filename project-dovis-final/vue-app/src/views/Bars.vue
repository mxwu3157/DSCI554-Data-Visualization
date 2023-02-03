<template>
    <div class="Bars">
     <h1>2022 NFL Teams Total Points Scored in Regular Season</h1>
     <p> Below shows that the selected popular 10 NFL teams total points scored in 2022 regular season.</p>
        <ol class="center">
            <li>Kansas City Chiefs</li>
            <li>Buffalo Bills</li>
            <li>Cincinnati Bengals</li>
            <li>Los Angeles Chargers</li>
            <li>Green Bay Packers</li>
            <li>Los Angeles Rams</li>
            <li>Philadelphia Eagles</li>
            <li>New York Jets</li>
            <li>Dallas Cowboys</li>
            <li>Chicago Bears</li>
        </ol>
        <div id="BarChart1"></div><br>
         <div class="text-center mb-2">
            Show <span class="button filter" id="all">All 10 Teams</span> 
            <span class="button filter" id="top5">Top 5 Teams </span>
            <span class="button filter" id="bottom5">Bottom 5 Teams</span>
            <span class="button filter" id="reset">Reset</span>
          </div>
          
          <div class="text-center mb-2">
            Sort by <span class="button sort" id="team">Ascending Team Name</span>
            <span class="button sort" id="pointASC">Asscending Points</span>
            <span class="button sort" id="pointDES">Descending Points</span>
          </div> 
      

    </div>
  </template>
 
<script >

import * as d3 from 'd3';

export default {
  name: 'Bars',
  data: function () {
    return {
      chartData: null,
    }
  },
    methods: {
        BarsChart() {
            var margin = { top: 20, left: 75, bottom: 50, right: 50 },
                width = 850 - margin.left - margin.right,
                height = 350 - margin.top - margin.bottom;

            var svg = d3.select('#BarChart1').append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');



            var all, reset, top5, bottom5;

            all = this.chartData;

            //initialize data variables
            var data1 = JSON.parse(JSON.stringify(this.chartData));
            data1.sort((a, b) => d3.descending(a.point, b.point));
            top5 = data1.slice(0, 5);  //set bottom 5 total point 
            bottom5 = data1.slice(data1.length - 5);  //set top 5 total point 
            var data2 = JSON.parse(JSON.stringify(this.chartData));
            data2.sort((a, b) => d3.descending(a.team, b.team));
            reset = data2;


          

            ///////////////////////////////////////////////////////////////
            // Controls
            ///////////////////////////////////////////////////////////////

            var current, sortMode;
            //sort event handlers
            d3.select('#team')
                .on('click', () => {
                    sort('#team');
                    transition();
                    toggleSort('#team');
                    xaxis_redraw();
                });

            d3.select('#pointASC')
                .on('click', () => {
                    sort('#pointASC');
                    transition();
                    toggleSort('#pointASC');
                    xaxis_redraw();
                });

            d3.select('#pointDES')
                .on('click', () => {
                    sort('#pointDES');
                    transition();
                    toggleSort('#pointDES');
                    xaxis_redraw();
                });

            //filter event handlers
            d3.select('#all')
                .on('click', () => {
                    filter('#all');
                    sort(sortMode);

                    toggleSort(sortMode);
                    toggleFilter('#all');

                    redraw();
                });

            d3.select('#bottom5')
                .on('click', () => {
                    filter('#bottom5');
                    sort(sortMode);

                    toggleSort(sortMode);
                    toggleFilter('#bottom5');

                    redraw();
                });

            d3.select('#top5')
                .on('click', () => {
                    filter('#top5');
                    sort(sortMode);

                    toggleSort(sortMode);
                    toggleFilter('#top5');

                    redraw();
                });

            d3.select('#reset')
                .on('click', () => {
                    filter('#reset');
                    //sort(sortMode);

                    //toggleSort(sortMode);
                    toggleFilter('#reset');

                    redraw();
                });

            d3.select('input')
                .on('change', () => {
                    sort(sortMode);
                    toggleSort(sortMode);

                    redraw();
                });


            function filter(mode) {
                if (mode === '#all') {
                    current = JSON.parse(JSON.stringify(all));
                } else if (mode === '#bottom5') {
                    current = JSON.parse(JSON.stringify(bottom5));
                } else if (mode === '#top5') {
                    current = JSON.parse(JSON.stringify(top5));
                } else if (mode === '#reset') {
                    current = JSON.parse(JSON.stringify(reset));
                }
                //filterMode = mode;
            }
            var xlabel;
            function sort(mode) {
                if (mode === '#team') {
                    current.sort((a, b) => d3.ascending(a.team, b.team));
                    //🚧 update x axis label
                    xlabel = 'Sorted Ascending Alphabetic by Team names'
                } else if (mode === '#pointASC') {
                    current.sort((a, b) => d3.ascending(a.point, b.point));
                    //🚧 update x axis label
                    xlabel = 'Sorted Ascending Points Scored'
                } else if (mode === '#pointDES') {
                    current.sort((a, b) => d3.descending(a.point, b.point));
                    //🚧 update x axis label
                    xlabel = 'Sorted Descending Points Scored'
                }
                x.domain(current.map(d => d.team));
                sortMode = mode;
            }

            function toggleSort(id) {
                d3.selectAll('.sort')
                    .style('background-color', '#eee');
                d3.select(id)
                    .style('background-color', 'lightgreen'); 
            }

            function toggleFilter(id) {
                d3.selectAll('.filter')
                    .style('background-color', '#eee');
                d3.select(id)
                    .style('background-color', 'lightgreen');
            }


            ///////////////////////////////////////////////////////////////
            // draw the chart
            ///////////////////////////////////////////////////////////////

            var x = d3.scaleBand();
            var y = d3.scaleLinear();

            var delay = function (d, i) {
                return i * 50;
            };

            function redraw() {
                //update scale
                x.domain(current.map(d => d.team));

                ////////////////////////////////
                // DATA JOIN FOR BARS.
                var bar = svg.selectAll('.bar')
                    .data(current, d => d.team);

                // UPDATE.
                bar.transition()
                    .duration(750)
                    .delay(delay)
                    .attr('x', d => x(d.team))
                    .attr('width', x.bandwidth());

                // ENTER.
                bar.enter()
                    .append('rect')
                    .attr('x', d => x(d.team))
                    .attr('y', y(0))
                    .attr('width', x.bandwidth())
                    .transition()
                    .duration(750)
                    .attr('class', 'bar')
                    .attr('x', d => x(d.team))
                    .attr('y', d => y(d.point))
                    .attr('width', x.bandwidth())
                    .attr('height', d => height - y(d.point));

                // EXIT.
                bar.exit()
                    .transition()
                    .duration(750)
                    .style('opacity', 0)
                    .remove();

                ////////////////////////////////
                // DATA JOIN FOR NAMES.
                var name = svg.selectAll('.name')
                    .data(current, d => d.team);

                // UPDATE.
                name.transition()
                    .duration(750)
                    .delay(delay)
                    .attr('x', (d) => x(d.team) + x.bandwidth() / 2);

                // ENTER.
                name.enter()
                    .append('text')
                    .attr('x', d => x(d.team) + x.bandwidth() / 2)
                    .attr('y', d => y(d.point) + (height - y(d.point)) / 2)
                    .style('opacity', 0)
                    .transition()
                    .duration(1000)
                    .text(d => d.team)
                    .attr('class', 'name')
                    .attr('x', d => x(d.team) + x.bandwidth() / 2)
                    .attr('y', d =>  (y(d.point)+8))
                    .style('opacity', 1);

                // EXIT.
                name.exit()
                    .transition()
                    .duration(750)
                    .style('opacity', 0)
                    .remove();
            }

            function xaxis_redraw() {
                d3.select('#xlabel').remove()
                svg.append('text')
                    .attr('id', 'xlabel')
                    .attr('x', width / 2)
                    .attr('y', height + 20)
                    .attr('class', 'label')
                    .text(xlabel);
            }

            function transition() {
                var transition = svg.transition()
                    .duration(750);

                transition.selectAll('.bar')
                    .delay(delay)
                    .attr('x', d => x(d.team));

                transition.selectAll('.name')
                    .delay(delay)
                    .attr('x', d => x(d.team) + x.bandwidth() / 2);
            }

            function draw() {
                x.domain(current.map(d => d.team))
                    .range([0, width])
                    .paddingInner(0.2);

                y.domain([0, d3.max(current, d => d.point)])
                    .range([height, 0]);

               
                svg.selectAll('.bar')
                    .data(current, d =>d.team)
                    .enter()
                    .append('rect')
                    .attr('class', 'bar')
                    .attr('x', d => x(d.team))
                    .attr('y', d=> y(d.point))
                    .attr('width', x.bandwidth())
                    .attr('height', d => height - y(d.point));

                svg.selectAll('.name')
                    .data(current, d => d.team)
                    .enter()
                    .append('text')
                    .text(d => d.team)
                    .attr('class', 'name')
                    .attr('x', d => x(d.team) + x.bandwidth() / 2)
                    .attr('y', d => (y(d.point)+8) );

                var xAxis;
                xAxis = d3.axisBottom()
                    .scale(x)
                    .ticks(0)
                    .tickSize(0)
                    .tickFormat('');

                svg.append('g')
                    .attr('class', 'axis')
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(xAxis);

                svg.append('text')
                    .attr('id', 'xlabel')
                    .attr('x', width / 2)
                    .attr('y', height + 20)
                    .attr('class', 'label')
                    .text('Sorted Ascending Alphabetic of Team Names');  //🚧 update the label based on sort mode

                var yAxis = d3.axisLeft()
                    .scale(y)
                    .ticks(5, 'd');

                svg.append('g')
                    .attr('class', 'axis')
                    .call(yAxis);

                svg.append('text')
                    .attr('x', - height / 2)
                    .attr('y', - margin.left * 0.7)
                    .attr('transform', 'rotate(-90)')
                    .attr('class', 'label')
                    .append('tspan').text('Total Points Scored');
            }
                //set initial state
                filter('#all');
                sort('#point');

                toggleFilter('#all');
                toggleSort('#point');

                draw();

        }
    },
  mounted: function () {
      d3.json('TotalPoints.json').then(data => {
        this.chartData = data;
        this.BarsChart();
        });
    }
  
}
</script>

<!-- "scoped" attribute limits CSS to this component only -->
<style scoped>
h1 { font-family: 'Enriqueta', arial, serif; line-height: 1.25; margin: 0 0 10px; font-size: 35px; font-weight: bold; }

p { color: #333333; font-family: "Helvetica Neue",Arial,sans-serif; font-size: 16px; font-weight: 300; line-height: 1.5625; margin-bottom: 15px; }

body {
  margin: 20px 25px 25px 25px;
}

pre {
  border-radius: 5px;
}

.center {
  text-align: center;
  list-style-position: inside;
}

::v-deep .axis path,
 .axis line {
  fill: none;
  stroke: black;
  shape-rendering: crispEdges;
}

::v-deep .axis text {
  font-family: "Enriqueta";
  font-size: 1em;
}

::v-deep text {
  font-family: "Enriqueta";
  font-size: 0.85em;
}

::v-deep svg {
  display: block;
  margin: auto;
  background-color: #fafafa;
}

::v-deep .bar {
  fill: lightgreen;
  /* #add8e6 is hex code for lightgreen */
}

::v-deep text.label {
  text-anchor: middle;
  alignment-baseline: central;
}

::v-deep text.name {
  font-weight: bold;
  text-anchor: middle;
  alignment-baseline: central;
}

::v-deep .button:hover {
  color: black;
  border: 2px solid lightgreen;
  border-radius: 3px;
  padding: 5px ;
  margin: 10px;
  display: inline-block;
  font-family: "Lucida Console", Monaco, monospace;
  font-size: 0.85em;
  letter-spacing: 1px;
  cursor: default;
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;
  box-shadow: inset 0 100px 0 0 lightgreen;
}

::v-deep .button {
  border-radius: 3px;
  background-color: #eee;
  padding: 5px;
  margin: 5px;
  cursor: default;
  font-family: Courier;
  font-size: 0.85em;
  font-weight: bold;
  cursor: default;
  user-select: none;
}
</style>
 