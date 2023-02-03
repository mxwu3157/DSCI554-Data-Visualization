# DSCI 554 Assignment

## Description

In this assignment you will use Bootstrap to sytle the HTML in the page, update the graphics from the last assignment to add axes created with D3, and implement two timelines. Reuse the graphics and table from the previous assignment:

- [x] Recreate the table and style it with Bootstrap
- [x] Upgrade the charts and designs to include 
  - [x] D3 axes, 
  - [x] axes labels, 
  - [x] tick marks, 
  - [x] tick mark labels, 
  - [x] title and 
  - [x] legends and 
  - [x] use the margin convention
- [x] Implement a timeline showing events for the last 5 fall semesters at USC using the code from the lab ex1
- [x] Implement a timeline showing events for the last 5 fall semesters at USC using the code from [Timelines Chart](https://www.npmjs.com/package/timelines-chart).

Requirements:

- [x] You can use [World Bank Open Data](http://data.worldbank.org) of your choice for 20 countries
- [x] You must design with Inkscape in separate files
- [x] You must create a 2D bubble chart
- [x] Use must use separate script files for each visualization
- [x] Use must use d3 data join to implement the table and the charts
- [x] You must use the latest version of d3
- [x] You must describe the data and provide a URL
- [x] You must load the data from different data files
- [x] You must load the data for the table in JSON format
- [x] You can load the data for the charts in CSV or JSON format
- [x] You must use the data "as loaded". Processing the data in the page is not allowed aside from converting strings to numbers when using CSV files.
- [x] You must demonstrate good development practices by making at least 2 incremental commits per visualization
 
Additional Requirements:
 
- [x] You must show both the designed charts and the charts you implement in the page
- [x] You must upgrade the designs in Inkscape to add title legend, and axes (tick marks and tick mark labels are not required for the designed charts)
- [x] You must use the margin convention to draw the charts with D3
- [x] You must use D3 axes and D3 scales
- [x] You can use different data from the previous assignment
- [x] The bubble chart must be a 2D bubble chart
- [x] Use bootstrap to style the page and the table

## Rubric

__15% of the grade is for the lab and quiz questions.__

|               | Table  | Charts | Timelines | Development/Page |
| ------------- | ------ | ------ | -------- | ---------------- |
| Sophisticated | Table is well formatted, well styled with bootstrap, uses D3 data join, data is well formatted, data is imported as JSON (4-5 pts) | Chart is well formatted, uses well D3 data join, uses well D3 scales and axes, uses well the margin convention, data is well formatted, data is imported as CSV or JSON (4-5 pts) | Timeline is well realized, includes all events and title (4-5 pts) | Using well good development practices, the page is well formatted, is styled with bootstrap (4-5 pts) |
| Competent     | Table is not well formatted, not well styled with bootstrap, does not use D3 data join, data is not well formatted, data is not imported as JSON (2-3 pts) | Chart is not well formatted, does not use well D3 data join, does not use well D3 scales and axes, does not use well the margin convention, data is not well formatted, data is not imported as CSV or JSON (2-3 pts) | Timeline is not well realized, does not include all events and title (2-3 pts) | Not using well good development practices, the page is not well formatted, is not well styled with bootstrap (2-3 pts) |
| Needs work    | Table is not formatted, not styled with bootstrap, does not use D3 data join, data is not formatted, data is not imported as JSON (0-1 pts) | Chart is not formatted, does not use D3 data join, does not use D3 scales and axes, does not use the margin convention, data is not formatted, data is not imported as CSV or JSON (0-1 pts) | Timeline is not realized, does not include all events and title (0-1 pts) | Not using good development practices, the page is not formatted, is not styled with bootstrap (0-1 pts) |

## Homework Guidelines

- Homework repository must be updated before the deadline
- Commits after the deadline will not be considered unless requested
- Late policy: 10% of total available points per each late day; duration less than 24 hours counts as one whole day
- Homework is expected to work in CHROME

## Important Note from Graders

__Ensure that you use the same case when referring to files than the actual filename__ as the homework may be assessed on Linux systems. For example, if an image tag refers to `myFile.png` but the actual filename is `myfile.png`, the image will not appear on the web page in Linux systems. We will deduct points if this happens. Use [Visual Studio Code HTML path completion feature](https://code.visualstudio.com/updates/v1_21#_html-path-completion) and/or double-check filenames to avoid this problem.
