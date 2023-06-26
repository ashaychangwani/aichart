# AIChart

## Introduction
A nimble and efficient wrapper for ApexCharts for auto-selection for chart type and data format using GPT-3.5.

## Supported Chart Types:
- Line Chart
- Area Chart
- Bar Chart
- Column Chart
- Box Plot
- Candlestick Chart
- Range Bar Chart
- Heat Map Chart
- Tree Map Chart
- Multi Axis Chart
- Pie Chart
- Radar Chart
- Radial Bar Chart
- Sync Chart

----------------------------------------------------------------

**1. Line Chart**

The way to pass data is: 
```
series:[{
  type='line',
  data: [23, 34, 12, 54, 32, ... , 43]
}]
xaxis: {
  categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
}
yaxis: [
    {      
      opposite: true, //set to true for alternate series
      axisBorder: {
        color: "#" //enter color here
      },
      labels: {
        style: {
          colors: "#" //enter color here
        }
      },
      title: {
        text: "", //enter the title here
        style: {
          color: "#" //enter color here
        }
      }
    }
  ]
```

