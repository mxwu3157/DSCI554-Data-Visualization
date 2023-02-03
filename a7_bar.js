
var margin = { top: 20, left: 75, bottom: 50, right: 50 },
    width = 850 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

var svg = d3.select('#chart').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

var all, lower, higher;
d3.json("solar2019.json").then((data) => {

    //initialize data variables
    all = data;
    all.sort((a, b) => d3.ascending(a.name, b.name))
    sorted_data = JSON.parse(JSON.stringify(data));
    sorted_data.sort((a, b) => d3.ascending(a.amount, b.amount))
    lower = JSON.parse(JSON.stringify(sorted_data));
    lower = lower.slice(0, 5);
    higher = JSON.parse(JSON.stringify(sorted_data));
    higher = higher.slice(5);

    console.log(higher)

    //set initial state
    filter('#all');
    sort('#name')

    toggleFilter('#all');
    toggleSort('#name');

    draw();

});


///////////////////////////////////////////////////////////////
// Controls
///////////////////////////////////////////////////////////////
var current, sortMode, filterMode, sortLabel;


sortLabel = 'name in alphabetic order'
/////d3.select.onclice......
//////
////////////////////////



//sort event handlers
d3.select('#name')
    .on('click', () => {
        sort('#name');
        transition();
        toggleSort('#name');
    });

d3.select('#amount-a')
    .on('click', () => {
        sort('#amount-a');
        transition();
        toggleSort('#amount-a');
    });

d3.select('#amount-d')
    .on('click', () => {
        sort('#amount-d');
        transition();
        toggleSort('#amount-d');
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

d3.select('#lower')
    .on('click', () => {
        filter('#lower');
        sort(sortMode);

        toggleSort(sortMode);
        toggleFilter('#lower');

        redraw();
    });

d3.select('#higher')
    .on('click', () => {
        filter('#higher');
        sort(sortMode);

        toggleSort(sortMode);
        toggleFilter('#higher');

        redraw();
    });
//reset event handler

d3.select('#reset')
    .on('click', () => {
        filter('#all');
        sort('#name')

        toggleFilter('#all');
        toggleSort('#name');

        redraw();
    });

////////filter, sort toggles.....
/////////


function filter(mode) {
    if (mode === '#all' | mode === '#reset') {

        current = JSON.parse(JSON.stringify(all));
    } else if (mode === '#lower') {

        current = JSON.parse(JSON.stringify(lower));
        current
    } else if (mode === '#higher') {
        current = JSON.parse(JSON.stringify(higher));
    }
    filterMode = mode;
}

function sort(mode) {
    if (mode === '#name') {
        current.sort((a, b) => d3.ascending(a.name, b.name));
        //🚧 update x axis label
        sortLabel = 'name in alphabetic order'

    } else if (mode === '#amount-a') {
        current.sort((a, b) => d3.ascending(a.amount, b.amount));
        sortLabel = 'amount in ascending order'
        //🚧 update x axis label
    }
    else if (mode === '#amount-d') {
        current.sort((a, b) => d3.descending(a.amount, b.amount));
        sortLabel = 'amount in descending order'
        //🚧 update x axis label
    }
    x.domain(current.map(d => d.name));
    sortMode = mode;
    console.log('sortmode', sortMode)
}

function toggleSort(id) {
    d3.selectAll('.sort')
        .style('background-color', '#eee');
    d3.select(id)
        .style('background-color', 'lightblue'); // #add8e6 is hex code for lightblue
}

function toggleFilter(id) {
    //🚧 write code to toggle buttons with class .filter here
    d3.selectAll('.filter')
        .style('background-color', '#eee');
    d3.select(id)
        .style('background-color', 'lightblue');
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
    console.log('update in redraw')
    //update scale
    x.domain(current.map(d => d.name));
    //y.domain([0, d3.max(current, d => d.amount)])





    ////////////////////////////////
    // DATA JOIN FOR BARS.
    var bars = svg.selectAll('.bar')
        .data(current, d => d.name);

    // UPDATE.
    bars.transition()
        .duration(750)
        .delay(delay)
        .attr('x', d => x(d.name))
        .attr('width', x.bandwidth());

    // ENTER.
    bars.enter()
        .append('rect')
        .attr('x', d => x(d.name))
        .attr('y', d => y(0))
        .attr('width', x.bandwidth())
        .transition()
        .duration(750)
        .attr('class', 'bar')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.amount))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.amount));

    // EXIT.
    bars.exit()
        .transition()
        .duration(750)
        .style('opacity', 0)
        .remove();

    ////////////////////////////////
    // DATA JOIN FOR NAMES.
    var name = svg.selectAll('.name')
        .data(current, d => d.name);

    // UPDATE.
    name.transition()
        .duration(750)
        .delay(delay)
        .attr('x', (d, i) => x(d.name) + x.bandwidth() / 2);

    // ENTER.
    name.enter()
        .append('text')
        .attr('x', d => x(d.name) + x.bandwidth() / 2)
        .attr('y', d => y(d.amount) + (height - y(d.amount)) / 2)
        .style('opacity', 0)
        .transition()
        .duration(1000)
        .text(d => d.name)
        .attr('class', 'name')
        //.attr('style', d => d.name === 'EARTH' ? 'fill: red' : '')
        .attr('x', d => x(d.name) + x.bandwidth() / 2)
        .attr('y', d => y(d.amount) + (height - y(d.amount)) / 2)
        .style('opacity', 1);

    // EXIT.
    name.exit()
        .transition()
        .duration(750)
        .style('opacity', 0)
        .remove();
}
function transition() {
    var transition = svg.transition()
        .duration(750);

    transition.selectAll('.bar')
        .delay(delay)
        .attr('x', d => x(d.name));

    transition.selectAll('.name')
        .delay(delay)
        .attr('x', d => x(d.name) + x.bandwidth() / 2);

    transition.select('.label').text('Sorted by ' + sortLabel)
    // transition.select('.axis').call(d3.axisLeft()
    //   .scale(y)
    //   .ticks(5, 'd'))

}


///////////////////////////////
function draw() {
    x.domain(current.map(d => d.name))
        .range([0, width])
        .paddingInner(0.2);

    y.domain([0, d3.max(current, d => d.amount)])
        .range([height, 0]);

    svg.selectAll('.bar')
        .data(current, d => d.name)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.amount))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.amount));

    svg.selectAll('.name')
        .data(current, d => d.name)
        .enter()
        .append('text')
        .text(d => d.name)
        .attr('class', 'name')
        .attr('style', d => d.name === 'EARTH' ? 'fill: red' : '')
        .attr('x', d => x(d.name) + x.bandwidth() / 2)
        .attr('y', d => y(d.amount) + (height - y(d.amount)) / 2);

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
        .attr('x', width / 2)
        .attr('y', height + 20)
        .attr('class', 'label')
        .text('Sorted from smaller to larger distance from Sun');  //🚧 update the label based on sort mode
    console.log('in redraw', sortMode);
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
        .append('tspan').text('Amount (kwh, million)')
    //   .append('tspan').text('-2')
    //   .style('baseline-shift', 'super')
    //   .style('font-size', '0.7em');
}

