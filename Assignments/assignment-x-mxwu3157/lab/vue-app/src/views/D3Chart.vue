<template>
  <div class="d3Chart">

    <div>Here is the data: {{JSON.stringify(chartData)}}</div>

    <div class="title">Top 10 COVID-19 confirmed in US, Aug 31 2020 (source Johns Hopkins University)</div>
    <svg width="400" height="300" id="chart"></svg>

  </div>
</template>

<script>

import * as d3 from 'd3';

export default {
  name: 'd3Chart',
  data: function () {
    return {
      chartData: null,
    }
  },
  methods: {
    barChart() {
      var svg = d3.select('#chart');
      var sel = svg.selectAll('rect')
        .data(this.chartData)
        .enter();
      
      sel.append('rect')
        .attr('x', 100)
        .attr('y', (d, i) => 20 + i * 25)
        .attr('width', d => d.value / 1000)
        .attr('class', 'bar');

      sel.append('text')
        .attr('x', 90)
        .attr('y', (d, i) => 30 + i * 25)
        .attr('class', 'label')
        .text(d => d.label);

      sel.append('text')
        .attr('x', d => 90 + d.value / 1000)
        .attr('y', (d, i) => 30 + i * 25)
        .attr('class', 'value')
        .text(d => Number(d.value).toLocaleString());
    }
  },
  mounted: function () {
    console.log('mounted');
    
    if (!this.$store.state.htmlChartData) {
      d3.json('covid-19-confirmed-083120.json').then(data => {
        this.chartData = data;
        console.log('chartData set from file');
        console.log('chartData contains', this.chartData.length, 'rows');
        this.$store.commit('htmlChartData', this.chartData);

        this.barChart();
        });
    } else {
      this.chartData = this.$store.state.htmlChartData;
      console.log('chartData set from store');
      console.log('chartData contains', this.chartData.length, 'rows');
      this.barChart();
    }
  }
}
</script>

<!-- "scoped" attribute limits CSS to this component only -->
<style scoped>
>>> text.label {  /* need to add >>> to gets passed to d3 because vue creates new mapping */
  text-anchor: end;
  alignment-baseline: middle;
  font-size: 12px;
  fill: black;
}

>>> text.value {
  font-family: 'Courier New', Courier, monospace;
  font-weight: bolder;
  font-size: 12px;
  text-anchor: end;
  alignment-baseline: middle;
  fill: #eee;
}

>>> rect.bar {
  text-align: right;  /* pull value text to the end of the bar */
  vertical-align: middle;  /* align value text with middle of the bar */
  fill:#7abcff;
  height: 20px;  /* bar height, this can stay fixed */
}

.title {
  margin-bottom: 0px;
  font-size: 12px;
}
</style>
