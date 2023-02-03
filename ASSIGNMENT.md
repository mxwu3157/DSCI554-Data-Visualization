# DSCI 554 Assignment 1

The assignment is modeled after the example on UN Data in Part I, Ch.1 of Cairo, Alberto, The truthful art: data, charts, and maps for communication. In this assignment we will learn to build simple charts using popular javascript charting libraries and interfaces. Before you submit your work, inspect `index.html` in Chrome to make sure that:

1. There are no errors
2. The page is well formatted
3. All the information needed to understand the data and the charts is included and well presented

To facilitate your work, commit and push your changes often after you test individual steps! You can use the README.md that is included for personal notes.

## Description

For 10 countries select [UN data](http://data.un.org) of your choice containing data over time:

1. Create a Google Sheets __using your USC account and shared with anyone at University of Southern California__
2. Create a multi-line chart of the 10 countries
3. In `index.html`:
    1. Explain the dataset provenance (what it is about and where it is coming from)
    2. Add a link to the Google Sheet
    3. Add the multi-line chart exported as an `svg` image from the Google Sheet
    4. Add the multi-line chart exported as an `<iframe>` from the Google Sheet
    5. Implement a multi-line chart with the Google Charts library
    6. Implement a D3 bar chart using the same UN data
    7. Implement a multi-line chart created with a JS library of your choice that we have not used so far (e.g., Plotly, Highcharts)
4. In `QUIZ_QUESTIONS.md` add 3 or more questions on the slides or material of lecture and lab 1.

## Rubric

__15% of the grade is for the lab and quiz questions.__

|               | Google Sheet      | index.html      |
| ------------- | ----------------- | --------------- |
| Sophisticated | 10 countries, at least 50 datapoints, chart is well formatted (4-5 pts) | Has dataset provenance information, 2 charts (as picture and iframe), includes accessible link to Google Sheet, is well presented and has no errors (4-5 pts) |
| Competent     | Less than 10 countries or 50 datapoints, chart is not well formatted (2-3 pts) | Does not provide clear  dataset provenance information, not all charts are presented, does not include accessible link to Google Sheet and/or details, is not well presented and or has errors (2-3 pts) |
| Needs work    | Too few countries or datapoints, chart is poorly or not formatted (0-1 pts) | Dataset provenance information missing, not showing all charts, does not include accessible link to Google Sheet and details, is poorly presented and has errors (0-1 pts) |

## Homework Guidelines

- Homework repository must be updated before the deadline
- Commits after the deadline will not be considered unless requested
- Late policy: 10% of total available points per each late day; duration less than 24 hours counts as one whole day
- Homework is expected to work in Chrome
