
//Implement drawing code here
myDoodle.select('chart1')

myDoodle.axis( 95, 600.5, 900, 600.5)
myDoodle.axis( 93, 498.5, 885, 498.5, fill='lightgrey')
myDoodle.axis( 93, 395.5, 885, 395.5, fill='lightgrey')
myDoodle.axis( 93, 293.5, 885, 293.5, fill='lightgrey')
myDoodle.axis( 93, 190.5, 885, 190.5, fill='lightgrey')
myDoodle.axis( 93, 88.5, 885, 88.5, fill='lightgrey')
myDoodle.axis( 223.5, 88.5, 223.5, 600.5, fill='lightgrey')
myDoodle.axis( 377.5, 90, 377.5, 600.5, fill='lightgrey')
myDoodle.axis( 533, 88.5, 533, 600.5, fill='lightgrey')
myDoodle.axis( 686.8, 88.5, 686.8, 600.5, fill='lightgrey')
myDoodle.axis( 843, 88.5, 843, 600.5, fill='lightgrey')

myDoodle.text('0', 73, 605, fill = 'black', fontsize=14)
myDoodle.text('78', 215, 620, fill = 'black', fontsize=14)
myDoodle.text('80', 369, 620, fill = 'black', fontsize=14)
myDoodle.text('82', 524, 620, fill = 'black', fontsize=14)
myDoodle.text('84', 677, 620, fill = 'black', fontsize=14)
myDoodle.text('86', 832, 620, fill = 'black', fontsize=14)

myDoodle.text('1', 73, 505, fill = 'black', fontsize=14)
myDoodle.text('2', 73, 402, fill = 'black', fontsize=14)
myDoodle.text('3', 73, 296, fill = 'black', fontsize=14)
myDoodle.text('4', 73, 194, fill = 'black', fontsize=14)
myDoodle.text('5', 73, 95, fill = 'black', fontsize=14)

myDoodle.text('Life Expectancy', 467, 656, fill = 'black', fontsize=14)
myDoodle.text('log10(Pop)', 11, 352, fill = 'black', fontsize=14)
myDoodle.text('Correlation between lifespan and GDP in world countries (2012)',
        35, 38, fill = 'black', fontsize=25)

myDoodle.bubble( 300, 218, 31, '#ea4335ff','China')
myDoodle.bubble( 145, 190, 30.5, '#34a853ff','India')
myDoodle.bubble( 610, 244, 27, '#71c287ff','USA')	
myDoodle.bubble( 843, 144, 25, '#ff6d01ff','Japan')
myDoodle.bubble( 688, 371, 23.5, '#a64d79ff','Germany')
myDoodle.bubble( 688, 400, 22.5, '#fcd04fff','UK')
myDoodle.bubble( 765, 389, 20.5, '#4285f4ff','Canada')
myDoodle.bubble( 300.571, 416.831, 20.3, '#46bdc6ff','Malaysia')
myDoodle.bubble( 378, 395.36, 13.85, '#f07b72ff','United Arab E.')
myDoodle.bubble( 765, 446, 6, '#1155ccff','Singapore')



myDoodle.legend('Canada', 930, 89, '#4285f4ff' )
myDoodle.legend('China', 930, 113, '#ea4335ff' )
myDoodle.legend('Germany', 930, 137, '#a64d79ff' )
myDoodle.legend('India', 930, 161, '#34a853ff' )
myDoodle.legend('Japan', 930, 185, '#ff6d01ff' )
myDoodle.legend('Malaysia', 930, 210, '#46bdc6ff' )
myDoodle.legend('Singapore', 930, 234, '#1155ccff' )
myDoodle.legend('United Arab Emirates', 930, 258, '#f07b72ff' )
myDoodle.legend('United Kingdom', 930, 281, '#fcd04fff' )
myDoodle.legend('United States of America', 930, 306, '#71c287ff' )

