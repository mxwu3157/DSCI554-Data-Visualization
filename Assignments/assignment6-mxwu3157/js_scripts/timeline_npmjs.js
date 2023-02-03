// const { timeParse } = require("d3");

// const TimelinesChart = require('timelines-chart');
const myChart = TimelinesChart();
// var parseTime = d3.timeParse()
// var parseTime = d3.timeParse('%Y-%M-%D');

// var data1 =  d3.json('../data/fall19.json', d.events => {
//     // console.log(d.events.start)

//     d.events.start = parseTime(d.events.start);
//     d.events.end = parseTime(d.events.end);
//     d.events.name = d.events.name;
//     return d;
//   }).then(

//   )
//   console.log(data1);

//   var myData = (d=>{
// return  [
//     {
//         group:'Fall 2019',
//         data:[{d.start, d.end}]
//     }
//   ]
//   });

// var data1 = [];
// d3.json('../data/fall19.json').then(d=> { 
//     console.log(d.events)
//     console.log('sekjfgiwuebgfvioewuj')
//     data1 = data1.concat(
//     {
//         timeRange:[parseTime(d.events.start), parseTime(d.events.end)],
//         val : d.events.name
//     }
// ) });

// data1 = data1.map(data => {
//     var events = data.events;

//     events = events.map(d => {
//       return {
//         name: d.name,
//         start: dayjs(d.start).toDate(),
//         end: d.end ? dayjs(d.end).toDate() :  null,
//       };
//     });
//     return events;
// });
var myData = [
    {
        group: "Fall 2017",
        data: [
            {
                 label: "Fall 2017",
                data: [
                    {
                        timeRange: [new Date('8 18 2017'), new Date('8 18 2017')],
                        val: "Registration Deadline"
                    }
                    ,
                    {
                        timeRange: [new Date('8 21 2017'), new Date('8 21 2017')],
                        val: "Classes Begin"
                    }
                    ,
                    {
                        timeRange: [new Date('9 4 2017'), new Date('9 4 2017')],
                        val: "Labor Day"
                    }
                    ,
                    {
                        timeRange: [new Date('11 22 2017'), new Date('11 26 2017')],
                        val: "Thanksgiving Holiday"
                    }
                    ,
                    {
                        timeRange: [new Date('12 1 2017'), new Date('12 1 2017')],
                        val: "Classes End"
                    }
                    ,
                    {
                        timeRange: [new Date('12 2 2017'), new Date('12 5 2017')],
                        val: "Study Days"
                    }
                    ,
                    {
                        timeRange: [new Date('12 6 2017'), new Date('12 13 2017')],
                        val: "Exams"
                    }
                    ,
                    {
                        timeRange: [new Date('12 14 2017'), new Date('1 7 2018')],
                        val: "Winter Recess"
                    }
                ]
            }
        ]
    }
    ,
    {
        group: "Fall 2018",
        data: [
            {
                label: "Fall 2018",
                data: [
                    {
                        timeRange: [new Date('8 17 2018'), new Date('8 17 2018')],
                        val: "Registration Deadline"
                    }
                    ,
                    {
                        timeRange: [new Date('8 15 2018'), new Date('8 15 2018')],
                        val: "Move-In"
                    }
                    ,
                    {
                        timeRange: [new Date('8 20 2018'), new Date('8 20 2018')],
                        val: "Classes Begin"
                    }
                    ,
                    {
                        timeRange: [new Date('9 3 2018'), new Date('9 3 2018')],
                        val: "Labor Day"
                    }
                    ,
                    {
                        timeRange: [new Date('11 21 2018'), new Date('11 25 2018')],
                        val: "Thanksgiving Holiday"
                    }
                    ,
                    {
                        timeRange: [new Date('11 30 2018'), new Date('12 1 2018')],
                        val: "Classes End"
                    }
                    ,
                    {
                        timeRange: [new Date('12 1 2018'), new Date('12 4 2018')],
                        val: "Study Days"
                    }
                    ,
                    {
                        timeRange: [new Date('12 5 2018'), new Date('12 12 2018')],
                        val: "Exams"
                    }
                    ,
                    {
                        timeRange: [new Date('12 13 2018'), new Date('1 6 2019')],
                        val: "Winter Recess"
                    }
                ]
            }
        ]
    },
    
    {
        group: "Fall 2019",
        data: [
            {
                label: "Fall 2019",
                data: [
                    {
                        timeRange: [new Date('8 23 2019'), new Date('8 23 2019')],
                        val: "Registration Deadline"
                    }
                    ,

                    {
                        timeRange: [new Date('8 26 2019'), new Date('8 26 2019')],
                        val: "Classes Begin"
                    }
                    ,
                    {
                        timeRange: [new Date('9 2 2019'), new Date('9 2 2019')],
                        val: "Labor Day"
                    }
                    ,
                    {
                        timeRange: [new Date('10 17 2019'), new Date('10 18 2019')],
                        val: "Fall recess"
                    }
                    ,
                    {
                        timeRange: [new Date('11 27 2019'), new Date('12 1 2019')],
                        val: "Thanksgiving Holiday"
                    }
                    ,
                    {
                        timeRange: [new Date('12 6 2019'), new Date('12 6 2019')],
                        val: "Classes End"
                    }
                    ,
                    {
                        timeRange: [new Date('12 7 2019'), new Date('12 10 2019')],
                        val: "Study Days"
                    }
                    ,
                    {
                        timeRange: [new Date('12 11 2019'), new Date('12 18 2019')],
                        val: "Exams"
                    }
                    ,
                    {
                        timeRange: [new Date('12 19 2019'), new Date('1 12 2020')],
                        val: "Winter Recess"
                    }
                ]
            }
        ]
    }
    ,
    {
        group: "Fall 2020",
        data: [
            {
                label: "Fall 2020",
                data: [
                    {
                        timeRange: [new Date('8 21 2020'), new Date('8 21 2020')],
                        val: "Registration Deadline"
                    }
                    ,

                    {
                        timeRange: [new Date('8 17 2020'), new Date('8 17 2020')],
                        val: "Classes Begin"
                    }
                    ,
                    {
                        timeRange: [new Date('9 7 2020'), new Date('9 7 2020')],
                        val: "Labor Day"
                    }
                    ,
                    {
                        timeRange: [new Date('11 13 2020'), new Date('11 13 2020')],
                        val: "Classes End"
                    }
                    ,
                    {
                        timeRange: [new Date('11 14 2020'), new Date('11 16 2020')],
                        val: "Study Days"
                    }
                    ,
                    {
                        timeRange: [new Date('11 17 2020'), new Date('11 24 2020')],
                        val: "Exams"
                    }
                    ,
                    {
                        timeRange: [new Date('11 25 2020'), new Date('1 10 2021')],
                        val: "Winter Recess"
                    }
                ]
            }
        ]
    }
    ,
    {
        group: "Fall 2021",
        data: [
            {
                label: "Fall 2021",
                data: [
                    {
                        timeRange: [new Date('8 20 2021'), new Date('8 20 2021')],
                        val: "Registration Deadline"
                    }
                    ,

                    {
                        timeRange: [new Date('8 23 2021'), new Date('8 23 2021')],
                        val: "Classes Begin"
                    }
                    ,
                    {
                        timeRange: [new Date('9 6 2021'), new Date('9 6 2021')],
                        val: "Labor Day"
                    }
                    ,
                    {
                        timeRange: [new Date('10 14 2021'), new Date('10 15 2021')],
                        val: "Fall recess"
                    }
                    ,
                    {
                        timeRange: [new Date('11 24 2021'), new Date('11 28 2021')],
                        val: "Thanksgiving Holiday"
                    }
                    ,
                    {
                        timeRange: [new Date('12 3 2021'), new Date('12 3 2021')],
                        val: "Classes End"
                    }
                    ,
                    {
                        timeRange: [new Date('12 4 2021'), new Date('12 7 2021')],
                        val: "Study Days"
                    }
                    ,
                    {
                        timeRange: [new Date('12 8 2021'), new Date('12 15 2021')],
                        val: "Exams"
                    }
                    ,
                    {
                        timeRange: [new Date('12 16 2021'), new Date('1 9 2022')],
                        val: "Winter Recess"
                    }
                ]
            }
        ]
    }
];

// const myChart = TimelinesChart();
myChart
    .data(myData)
    .zQualitative(true)
    .width(1000)
    // .leftMargin(50)
    // .rightMargin(100)
    .topMargin(50)
    .bottomMargin(50)
    .maxLineHeight(60)
    (document.getElementById('myPlot'));