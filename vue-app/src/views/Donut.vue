<template>
    <div class="Donut" id="donut1">
     <h1>Average Points Per Game from 2019 to 2022</h1>
     <h3>Points per game, often abbreviated PPG, is the average number of points scored by a NFL team per game</h3> 
     <h3>It is calculated by dividing the total number of points by number of games. </h3>
     <p>Click the buttons of the team names would switch to the correpsonding team statistics</p>
     <p>Hover your mouse on the donut chart would show the percentage of the average points scored among 4 years</p>
      <svg width="400" height="400" id="chart"></svg>
      <div>
        <button id="Chiefs">Kansas City Chiefs</button>
        <button id="Rams">Los Angeles Rams</button>
        <button id="Bills">Buffalo Bills</button>
        <button id="Packers">Green Bay Packers</button>
        <button id="Bengals">Cincinnati Bengals</button>
      </div>

    </div>
  </template>

<script>

import * as d3 from 'd3';

export default {
  name: 'Donut',
  data: function () {
    return {
      chartData: null,
    }
  },
    methods: {
        donutChart() {
            var width = 360;
            var height = 360;
            var radius = Math.min(width, height) / 2;
            var donutWidth = 75;
            var color = d3.scaleOrdinal()
                .range(["#5A39AC", "#DD98D6", "#E7C820", "#08B2B2"]);

            var svg1 = d3.select('#chart')
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', 'translate(' + (width / 2) +
                    ',' + (height / 2) + ')');

            var arc3 = d3.arc()
                .innerRadius(radius - donutWidth)
                .outerRadius(radius);

            var pie = d3.pie()
                .value(function (d) {
                    return d.value;
                })
                .sort(null);

            var legendRectSize = 13;
            var legendSpacing = 7;

            var donutTip = d3.select("#donut1").append("div")
                .attr("class", "donut-tip")
                .style("opacity", 0);

            var data = JSON.parse(JSON.stringify(this.chartData)); 
            console.log(data);
            var path3 = svg1.selectAll('path')
                .data(pie(data.Chiefs))
                .enter()
                .append('path')
                .attr('d', arc3)
                .attr('fill', function (d) {
                    return color(d.data.title);
                })
                .attr('transform', 'translate(0, 0)')
                .on('mouseover', function (d, event) {
                    d3.select(this).transition()
                        .duration('50')
                        .attr('opacity', '.85');
                    donutTip.transition()
                        .duration(50)
                        .style("opacity", 1);
                    let num = (Math.round((event.data.value/ event.data.all )*100)).toString() + '%';
                    donutTip.html(num)
                        .style("left", (d.pageX + 10) + "px")
                        .style("top", (d.pageY - 15) + "px");

                })
                .on('mouseout', function () {
                    d3.select(this).transition()
                        .duration('50')
                        .attr('opacity', '1');
                    donutTip.transition()
                        .duration('50')
                        .style("opacity", 0);
                });


            var legend3 = svg1.selectAll('.legend')
                .data(color.domain())
                .enter()
                .append('g')
                .attr('class', 'circle-legend')
                .attr('transform', function (d, i) {
                    var height = legendRectSize + legendSpacing;
                    var offset = height * color.domain().length / 2;
                    var horz = -2 * legendRectSize - 13;
                    var vert = i * height - offset;
                    return 'translate(' + horz + ',' + vert + ')';
                });

            legend3.append('circle')
                .style('fill', color)
                .style('stroke', color)
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', '.5rem');

            legend3.append('text')
                .attr('x', legendRectSize + legendSpacing)
                .attr('y', legendRectSize - legendSpacing)
                .text(function (d) {
                    return d;
                });

            function change(data) {
                console.log(data);
                var pie = d3.pie()
                    .value(function (d) {
                        return d.value;
                    }).sort(null)(data);

                var width = 360;
                var height = 360;
                var radius = Math.min(width, height) / 2;
                var donutWidth = 75;

                path3 = d3.select("#chart")
                    .selectAll("path")
                    .data(pie); // Compute the new angles
                var arc3 = d3.arc()
                    .innerRadius(radius - donutWidth)
                    .outerRadius(radius);
                path3.transition().duration(500).attr("d", arc3); // redrawing the path with a smooth transition
            }

            d3.select("button#Chiefs")
                .on("click", function () {
                    change(data.Chiefs);
                })
            d3.select("button#Rams")
                .on("click", function () {
                    change(data.Rams);
                })
            d3.select("button#Bills")
                .on("click", function () {
                    change(data.Bills)
                })
            d3.select("button#Packers")
                .on("click", function () {
                    change(data.Packers);
                })
            d3.select("button#Bengals")
                .on("click", function () {
                    change(data.Bengals)
                })
        }
  },
  mounted: function () {

      d3.json('donut.json').then(data => {
        this.chartData = data;
        this.donutChart();
        });
  }
}
</script>

<!-- "scoped" attribute limits CSS to this component only -->
<style scoped>
h1 { font-family: 'Enriqueta', arial, serif; line-height: 1.25; margin: 0 0 10px; font-size: 35px; font-weight: bold; }
h3 { font-family: 'Enriqueta', arial, serif; line-height: 1.25; margin: 0 0 10px; font-size: 21px;  }
p { color: #333333; font-family: "Helvetica Neue",Arial,sans-serif; font-size: 18px; font-weight: 300; line-height: 1.5625; margin-bottom: 15px; }

::v-deep .arc text {
  font: 14px sans-serif;
  text-anchor: middle;
}

::v-deep .arc path {
  stroke: #fff;
}


::v-deep div.donut-tip {	
  position: absolute;			
  text-align: center;								
  padding: .5rem;				
  background: #FFFFFF; 
  color: #313639;	
  border: 1px solid #313639;		
  border-radius: 8px;			
  pointer-events: none;
  font-size: 1.3rem;			
}

::v-deep .legend-pie{
  font-size: .9rem;
}

.legend-pie .strongly-like{
  color:#5EC9A9;
}
.legend-pie .like{
  color:#AFE4B8;
}
.legend-pie .dislike{
  color:#539CC6;
}
.legend-pie .strongly-dislike{
  color:#323595;
}
.legend-pie .unsure{
  color:#C2D5EB;
}

@media only screen and (max-width: 600px) {
  .legend-bar text{
      font-size: .5rem;
  }
  .legend-bar rect{
      width: 5px;
      height: 5px;
  }

}
</style>