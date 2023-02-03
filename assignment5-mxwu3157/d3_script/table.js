
d3.json("../data/co2_emission_table.json").then(function(data) {
    console.log(data);

    d3.select('#table1')
    .selectAll('tr')
    .data(data)
    .enter()
    .append('tr')
    .style('font-weight', (d, i) => {
      return (i == 0) ? 'bold' : 'normal';
    })
    .style('background',(d,i) =>{ return (i == 0) ? 'gainsboro' : '';})
    .selectAll('td')
    .data(d => d)
    .enter()
    .append('td')
    .style('vertical-align','middle')
    .text(d => d)
}
    )
    ;