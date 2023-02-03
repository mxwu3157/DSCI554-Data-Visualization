# # DSCI 554 Assignment

## Description

Use data of your choice for the same 10 countries from A1 to implement a bar chart with smooth transitions between states triggered by user input.

- Describe the data and cite your source in the page  
- Load the data in JSON format and implement a D3 bar chart complete with axes, axes labels, tick marks, tick mark labels and title
- Use margin conventions, d3 data join, scales and axes to create the bar chart
- Use separate css and JavaScript files
- Use the latest Bootstrap to style the page and controls
- Controls should include the following functionality:
  1. Reset to the initial state where all 10 countries are shown ordered in alphabetic order by name
  2. Order alphabetic by name
  3. Order ascending by value
  4. Order descending by value
  5. Show all 10 countries
  6. Filter top 5 by value
  7. Filter bottom 5 by value
- Use incremental commits that are consistent and tested
- Be aware that filter and order operations are independent
- You should use smooth transitions appropriately, e.g., to ensure object constancy
- You must use the latest d3 version

## Rubric

__15% of the grade is for the lab and quiz questions.__

### Bar chart (5 pts)

|               | Points | Description |
| ------------- | ------ | ----------- |
| Sophisticated | 4-5    | Chart well formatted, data is well formatted, imported as JSON, using margin conventions, uses D3 data join, axes, axes labels, tick marks, tick mark labels and title are well formatted, using scales appropriately. |
| Competent     | 2-3    | Chart is not well formatted, data is not well formatted or JSON improperly used, improper use of margin conventions, improper uses of D3 data join, axes, axes labels, tick marks, tick mark labels and title are not well formatted, not using scales appropriately.|
| Needs work    | 0-1    | Chart is not formatted, data is not formatted or JSON is not used, not using margin conventions, not using of D3 data join, axes, axes labels, tick marks, tick mark labels and title are not included, not using scales. |

### Smooth transitions (5 pts)

|               | Points | Description |
| ------------- | ------ | ----------- |
| Sophisticated | 4-5    | Smooth transitions based on user input reorder the bars and update the axes, axes labels, tick marks, tick mark labels and title are working well between any two combinations. Reset, sorting and filtering works well. |
| Competent     | 2-3    | Smooth transitions based on user input to reorder the bars not working well. Updates to the axes, axes labels, tick marks, tick mark labels and title are not working well between any two combinations. Reset, sorting and filtering does not work well. |
| Needs work    | 0-1    | Smooth transitions based on user input to reorder the bars not working. Updates to the axes, axes labels, tick marks, tick mark labels and title are not working between any two combinations. Reset, sorting and filtering do not work. |

### Development (5 pts)

|               | Points | Description |
| ------------- | ------ | ----------- |
| Sophisticated | 4-5    | Good development practices are well used. Separate js, css and data files are well used. The latest Bootstrap and d3 libraries are well used. Page and controls are well styled with Bootstrap. The chart the data, and data sources are well described. |
| Competent     | 2-3    | Good development practices are not well used. Separate js, css and data files are not well used. The latest Bootstrap and d3 libraries not well used. Page and controls are not well styled with Bootstrap. The chart the data, and data sources are not well described. |
| Needs work    | 0-1    | Good development practices are not used. Separate js, css and data files are not used. The latest Bootstrap and d3 libraries not used. Page and controls are not styled with Bootstrap. The chart the data, and data sources are not described. |

## Homework Guidelines

- Homework repository must be updated before the deadline
- Commits after the deadline will not be considered unless requested
- Late policy: 10% of total available points per each late day; duration less than 24 hours counts as one whole day
- Homework is expected to work in CHROME
