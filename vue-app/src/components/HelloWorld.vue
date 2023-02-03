<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h4 class="mb-5">Click circle to see the detail info about the team</h4>
    <div >
      <p>The <strong>National Football League (NFL)</strong> is a professional American football league that consists of <strong>32 teams</strong>, <br>divided equally
      between the <strong>American Football Conference (AFC</strong> and the <strong>National Football Conference (NFC)</strong>.</p>
      <p>Each NFL season begins with a three-week preseason in <strong>Augest</strong>, followed by the <strong>18-week</strong> regular season <br>which runs from
      early September to early January, with each team playing 17 games and having one bye week.
    
      </p>
      <p>Following the conclusion of the regular season, <strong>seven</strong> teams from each conference (four division winners and <br>three wild
      card teams) advance to the playoffs, a single-elimination tournament that culminates in the <strong>Super Bowl</strong>, 
      <br>which is
      contested in February and is played between the AFC and NFC conference <strong>champions</strong>.</p>
    </div>
    <div style="height:60px"></div>
    <div class="row">
      
    <div id="chart1" class="col-md-7">
      <svg id="map1" height="600" width="900"></svg>
    </div>
    <div class="col-md-2" >
      <div id="team_info" style="height:500px; width:600px; border-width: 10px; margin-left:0;">
        <svg height="500px" width="600px"><text x="25%" y="50%">Click circle to see the detail info about the team</text></svg>
        
      </div>

    </div>
    
</div>
<div style="height:150px"></div>
<div id="schedules">
  <!-- <h3>2022 Regular Season Schedules</h3> -->

</div>
<div style="height:150px"></div>
    
  </div>
  
  
</template>

<script>
import * as d3 from 'd3';
const topojson = require("topojson");

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
  ,
  // data(){
  //   return null;
  // },
  methods: {},
  mounted(){
    var promises = [];
    var files = ['counties-albers-10m.json', 'NFL_Teams2.json','NFL_schedules.json'];
    files.forEach(url => promises.push(d3.json(url)));
    Promise.all(promises).then(function (values) {  //use Promise.all to load map and data
      var us = values[0];
      var data_team = values[1];
      // var data_schedule = values[2];
      console.log(data_team)
      // data_team = new Map(data_team)
      // console.log(data_team)

      var svg = d3.select('#map1')
        .attr('viewBox', [0, 0, 975, 610])
        // .style('fill','lightgreen');
   
      
      var path = d3.geoPath()
      svg.append('path')
        .datum(topojson.feature(us, us.objects.nation))
        .attr('fill', '#ccc')
        .attr('d', path);

  

      //add the geopath for the borders of the states
      svg.append('path')
        .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-linejoin', 'round')
        .attr('d', path);
        
      var locations_id = data_team.map((d => d.FIPS));
      var topo_features = topojson.feature(us, us.objects.counties).features.filter(d => locations_id.includes(d.id));
      console.log('aaa', data_team.find(a => a.FIPS == "51107").Team);
      console.log(path.centroid(topo_features[0]))
      svg.append('g')
        .selectAll('text')
        .data(topo_features)
        .join('text')
        .attr('x', d => path.centroid(d)[0] - 35)
        .attr('y', d => path.centroid(d)[1] + 25)
        .attr('id', d => d.id)
        .text(d => data_team.find(a => a.FIPS == d.id).Team)
        .style('font-size', '10px')

      svg.append('g')
        .attr('fill-opacity', 0.5)
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.5)
        .selectAll('circle')
        .data(topo_features)
        .join('circle')
        .attr('transform', d => `translate(${path.centroid(d)})`)  //position circles at their respective feature centroid
        .attr('r', "15px")
        .attr('fill', function(d) {
          if (data_team.find(a=>a.FIPS == d.id).Belong == "NFC") { return "salmon" }
          return "steelblue"
        }) 
        .on('mouseover', function () {
          d3.select(this)
            .attr('fill-opacity','0.9')
            .attr('r',"17px")
          var onverId = d3.select(this)["_groups"][0][0]["__data__"]['id']
          var t = Array.from(d3.selectAll('text')['_groups'][0]).filter(a => a.id == onverId)[0]//.select("#" + onverId))//['_groups'][0].filter(a => a["__data__"].id == onverId))
          d3.select(t)
            .style('font-weight', 'bold')
            .style('font-size', '15px')
          })
        .on('mouseleave', function () {
          d3.select(this).attr('fill-opacity', '0.5').attr('r', "15px")
          var onverId = d3.select(this)["_groups"][0][0]["__data__"]['id']
          var t = Array.from(d3.selectAll('text')['_groups'][0]).filter(a => a.id == onverId)[0]//.select("#" + onverId))//['_groups'][0].filter(a => a["__data__"].id == onverId))
          d3.select(t)
            .style('font-weight', 'normal')
            .style('font-size', '10px')
        })
        .on("click", function(){
          d3.select("#team_info").selectAll("*").remove();

          // var a = d3.select("#team_info").append("div").style("background-color","grey").html("<strong>aaa</strong>b")
          // console.log('aaa', a)
          

          var onverId = d3.select(this)["_groups"][0][0]["__data__"]['id']
          var data_info = data_team.filter(a => a.FIPS == onverId)[0]

          function func(d) {
            const resArray = [];
            var excludes = ['Logo', 'n_injuries']
            for (const [key, value] of Object.entries(d)) {
              if (!excludes.includes(`${ key }`) ){ resArray.push([`${key}`, `${value}`]); }
            }
            return resArray
          }
          var data_info_array = func(data_info)
          console.log(data_info_array)

          d3.select("#team_info").append("table")
            .attr("class", "table table-bordered table-striped table-hover table-sm th-sm ")
            .style("width", "500px")
            .style("margin", "auto")
            .attr('id', 'team_info_table')
          

          d3.select("#team_info_table")
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
        })
        ;



        svg.append('rect')
        .attr('fill','steelblue')
        .style("opacity",0.5)
          .attr('x', 0.8 * svg['_groups'][0][0].width.animVal.value)
          .attr('y', 0.00 * svg['_groups'][0][0].height.animVal.value)
        .attr('height','20px')
        .attr('width','20px')

      svg.append('rect')
        .attr('fill', 'red')
        .style("opacity", 0.5)
        .attr('x', 0.8 * svg['_groups'][0][0].width.animVal.value)
        .attr('y', 0.00 * svg['_groups'][0][0].height.animVal.value + 30)
        .attr('height', '20px')
        .attr('width', '20px')

        svg.append('text')
          .attr('x', 0.8 * svg['_groups'][0][0].width.animVal.value+35)
          .attr('y', 0.00 * svg['_groups'][0][0].height.animVal.value + 15 )
          .text('AFC')
          

      svg.append('text')
        .attr('x', 0.8 * svg['_groups'][0][0].width.animVal.value + 35)
        .attr('y', 0.00 * svg['_groups'][0][0].height.animVal.value + 30+15)
        .text('NFC')



      



    })


  }
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
</style>
