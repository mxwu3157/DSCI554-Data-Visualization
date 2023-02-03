var spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "Electricity Generation",
    "width": 600,
    "height": 400,
    "data": {"url": "data/data.csv"},
    "mark": "line",
    "encoding": {
      "x": {"field": "Year", "type": "temporal"},
      "y": {"field": "Quantity", "type": "quantitative"},
      "color": {"field": "Country or Area", "type": "nominal"}
    }
  }


vegaEmbed('#chart7', spec).then(function(result) {
        // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
      }).catch(console.error);

  