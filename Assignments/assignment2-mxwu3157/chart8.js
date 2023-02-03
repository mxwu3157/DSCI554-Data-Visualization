var xValues = [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
   2015, 2016, 2017, 2018, 2019, 2020];

new Chart("myChart", {
type: "line",
height: "200px",
data: {
  labels: xValues,
  datasets: [
    { 
    label: "Canada",
    data: [  13.,   17.,   21.,   26.,   35.,  109.,  255.,  572.,  881.,
   1499., 2120., 2895., 4030., 3573., 3796., 4079.,    null],
  fill: false,
  borderColor: "blue",
  },
  { 
    label: "China",
    data: [     0.,      0.,      0.,      0.,      0.,      0.,      0.,
        0.,      0.,   5564.,  25134.,  38776.,  61586., 106338.,
   177517., 224460.,      null],
  fill: false,
  borderColor: "red",
  },{ 
    label: "Germany",
    data: [  557.,  1282.,  2220.,  3075.,  4420.,  6584., 11729., 19599.,
   26380., 31010., 36056., 38726., 38098., 39401., 45784., 46392.,
   null],
       fill: false,
       borderColor: "orange",
      },{ 
    label: "India",
    data: [    0.,     0.,     0.,     0.,     0.,     0.,     0.,     0.,
       0.,  3433.,  5020.,  7039., 12578., 24613., 39728., 50563.,
       null],
       fill: false,
       borderColor: "green",},{ 
    label: "Japan",
    data: [ 1118.   ,  1420.   ,  1721.   ,  1972.   ,  2206.   ,  2657.   ,
    3543.   ,  4839.   ,  6613.   , 12880.   , 22952.   , 34802.   ,
   45761.   , 55068.529, 62667.671, 68952.571,     null   ],
   fill: false,
   borderColor: "black",},{ 
    label: "Malaysia",
    data: [0.00000e+00, 0.00000e+00, 0.00000e+00, 0.00000e+00, 0.00000e+00,
   0.00000e+00, 6.81000e-01, 6.81000e-01, 4.77430e+01, 1.41000e+02,
   2.27000e+02, 2.73000e+02, 3.10000e+02, 3.30120e+02, 6.32000e+02,
   9.43489e+02, null],
   fill:false,
   borderColor: "pink",
  },{ 
    label: "Singapore",
    data:[  0.,   0.,   0.,   0.,   1.,   3.,   5.,   8.,  13.,  17.,  38.,
    69., 146., 175., 237., 410., 622.],
    fill: false,
    borderColor: "navy",},{ 
    label: "United Arab Emirates",
    data: [   0. ,    0. ,    0. ,    0. ,    0. ,    0. ,    0. ,    0. ,
     19. ,   53. ,  291. ,  291. ,  309. ,  792. , 1303.1, 3779.8,
     null],
      fill: false,
      borderColor: "salmon",},{ 
    label: "United Kingdom",
    data: [4.0000000e+00, 8.0000000e+00, 1.1000000e+01, 1.4000000e+01,
   1.7000000e+01, 2.0000000e+01, 4.0000000e+01, 2.4400000e+02,
   1.3540000e+03, 2.0100000e+03, 4.0540000e+03, 7.5330000e+03,
   1.0395000e+04, 1.1457269e+04, 1.2735510e+04, 1.2918070e+04,
   null],
   fill: false,
   borderColor: "yellow",
  },{ 
    label: "United States",
    data: [  965.   ,  1120.   ,  1287.   ,  1674.   ,  2092.   ,  2515.   ,
    3942.   ,  6215.   , 10145.   , 15872.   , 25764.   , 35635.   ,
   50334.   , 70979.619, 85184.441, 97478.316,     null  ],
   fill: false,
   borderColor: "cyan",},
]
},
options: {
  legend: {display: true,position:'right'},
  title: {
            display: true,
            text: 'Total Solar Production of Electricity (2004-2020)'
        }
  
}
});