var spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "log-Populations of some world Countries in 2012",
     "width": 400,
    // "height": 400,
    'orient':'vertical',
    "height": {"step": 30},
    "data": {"url": "data/data.csv"},
    "mark": "bar",
    "encoding": {
    "x": {"field": "log-population", 
        "aggregate": "sum", 
        'title':'log-Population',
        
    },
    "y": {"field": "Country or Area", 
        'title':'Country',
        "sort": "-x"
    },
    }
}

vegaEmbed('#chart6', spec).then(function(result) {
        // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
    }).catch(console.error);