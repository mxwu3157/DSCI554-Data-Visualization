var t1 = document.getElementById('timeline1');
default_width = t1.style.width;

d3.json('./data/fall17.json').then(data => {
    var events = data.events;

    events = events.map(d => {
      return {
        name: d.name,
        start: dayjs(d.start).toDate(),
        end: d.end ? dayjs(d.end).toDate() :  null,
      };
    });

    //compute total semester days between first and last event
    var min = dayjs(d3.min(events, d => d.start));
    var max = dayjs(d3.max(events, d => d.start));
    var semesterDays = max.diff(min, 'day');

    //compute class days between classes begin and classes end
    min = dayjs(events.find(d => d.name == 'Classes Begin').start);  //using array.find
    max = dayjs(events.find(d => d.name == 'Classes End').start);
    var classesDays = max.diff(min, 'day');

    d3.select('#title1').text(`${data.name} : ${semesterDays} days, ${data.instructional_days} instructional days, ${classesDays} classes days`);

    //////////////////////////////////////////////////////////////////////
    //set-up margins convention
    var margin = { top: 50, right: 30, bottom: 10, left: 30 };
    var default_width =800;
    

    var width = default_width - margin.left - margin.right,
      height = 120 - margin.top - margin.bottom;

    //////////////////////////////////////////////////////////////////////
    //plot
    var svg = d3.select('#timeline1')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      // .attr("viewBox", '0 0 ' + height + margin.top + margin.bottom+' ' +  width + margin.left + margin.right)
      // .attr('viewBox',`0 0 120 800`)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg.append('rect')  //show drawing area
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'white')

    var fromDay = dayjs(events[0].start).startOf('month').toDate(); 
    var toDay = dayjs(events[events.length - 1].end).startOf('month').add(15, 'day').toDate();

    var x = d3.scaleTime()
      .domain([fromDay, toDay])
      .range([0, width]);

    var xAxis = d3.axisBottom()
      .scale(x);

    svg.append('g')
      .attr('transform', 'translate(0,20)')
      .call(xAxis);

    svg.selectAll('mark')
      .data(events)
      .enter()
      .append('rect')
      .attr('x', d => x(d.start))
      .attr('y', 5)
      .attr('width', d => d.end ? x(d.end) - x(d.start) : 5)
      .attr('height', 15)
      .attr('fill', (d, i) => { return i % 2 ? '#999' : '#444' });  //alternate colors so we can distinguish individual events

    svg.selectAll('label')  
      .data(events)
      .enter()
      .append('text')
      .attr("x", d => {
        var start = x(d.start);
        var end = d.end ? x(d.end) : d.end;
        return end ? start + (end - start) / 2 : start;
      })
      .attr("y", (d, i) => -10 * (i % 3))  //alternate labels so they don't overlap!
      .classed('label', true)  //same as .attr('class', 'label')
      .text(d => { return d.name });
  });