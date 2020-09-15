# obap-data-table

Provides a Material Design data table for tabular data display.

## Usage

```html
<script>
    function currencyFormatter(value) {
        return `$${value.toFixed(2)}`;
    }

    function percentageFormatter(value) {
        return `${value}%`;
    }

    function numberFormatterFactory(decimals) {
        return (value) => {
            return Number(value).toFixed(decimals);
        }
    }

    function customRenderer(value, column) {
        return html`
            <div style="text-overflow: ellipsis; white-space: nowrap;">${value}</div>
        `;
    } 

    const columns = [
        { label: 'Dessert (100g serving)', field: 'dessert',   type: 'text',    actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true, fix: 'left' },
        { label: 'Price',                  field: 'price',     type: 'number',  formatter: currencyFormatter, actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true},
        { label: 'Calories',               field: 'calories',  type: 'number',  renderer: customRenderer, actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
        { label: 'Fat (g)',                field: 'fat',       type: 'number',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
        { label: 'Carbs (g)',              field: 'carbs',     type: 'number',  formatter: numberFormatterFactory(2),  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
        { label: 'Protein (g)',            field: 'protein',   type: 'number',  formatter: numberFormatterFactory(4),  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
        { label: 'Sodium (mg)',            field: 'sodium',    type: 'number',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
        { label: 'Calcium (%)',            field: 'calcium',   type: 'number',  formatter: percentageFormatter ,  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
        { label: 'Iron (%)',               field: 'iron',      type: 'number',  formatter: percentageFormatter,   actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
        { label: 'In Stock',               field: 'available', type: 'boolean', actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true, fix: 'right' },
        { label: 'Add to Cart',            field: '',          type: 'action',   actionLabel: 'Add', trueIcon: '', falseIcon: '', sortable: false }
    ];

    const rows = [
        { id: 0, dessert: 'Frozen Yoghurt'    , price: 4.50, calories: 159, fat: 6.0,  carbs: 24, protein: 4.0, sodium: 87,  calcium: 14, iron: 1,  available: true  },
        { id: 1, dessert: 'Ice Cream Sandwich', price: 3.99, calories: 237, fat: 9.0,  carbs: 37, protein: 4.3, sodium: 129, calcium: 8,  iron: 1,  available: true  },
        { id: 2, dessert: 'Eclair'            , price: 2.99, calories: 262, fat: 16.0, carbs: 24, protein: 6.0, sodium: 337, calcium: 6,  iron: 7,  available: false },
        { id: 3, dessert: 'Cupcake'           , price: 2.50, calories: 305, fat: 3.7,  carbs: 67, protein: 4.3, sodium: 413, calcium: 3,  iron: 8,  available: true  },
        { id: 4, dessert: 'Gingerbread'       , price: 1.75, calories: 356, fat: 16.0, carbs: 49, protein: 3.9, sodium: 327, calcium: 7,  iron: 16, available: true  },
        { id: 5, dessert: 'Jelly Bean'        , price: 0.35, calories: 375, fat: 0.0,  carbs: 94, protein: 0.0, sodium: 50,  calcium: 0,  iron: 0,  available: true  },
        { id: 6, dessert: 'Lollipop'          , price: 0.50, calories: 392, fat: 0.2,  carbs: 98, protein: 0.0, sodium: 38,  calcium: 0,  iron: 2,  available: false },
        { id: 7, dessert: 'Honeycomb'         , price: 1.45, calories: 408, fat: 3.2,  carbs: 87, protein: 6.5, sodium: 562, calcium: 0,  iron: 45, available: false },
        { id: 8, dessert: 'Donut'             , price: 0.99, calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: 2,  iron: 22, available: true  },
        { id: 9, dessert: 'KitKat'            , price: 0.99, calories: 518, fat: 26.0, carbs: 65, protein: 7.0, sodium: 54,  calcium: 12, iron: 6,  available: true  }
    ];  
</script>

<obap-data-table-lite .columns="${columns}" .rows="${rows}">

</obap-data-table-lite>
```

## Cell Visualizers

You have 3 options when it comes to displaying cell contents:

* Default visualizer (based on `column.type`).
* Custom renderer (a function that returns a TemplateResult and set on `column.renderer`).
* Custom visualizer (one of the predefines visualizers and set on `column.visualizer`).

Custom renderers and visualizers allow you to have complex (array and object) data values.

A custom visualizer is used as follows:

```javascript
column.visualizer = {
    name: '',
    
    params: {
        // Common parameters.
        headerAlign: 'left|right|center',
        baseStyle: {}
        // Custom parameters.
    }
}
```

The `name` is one of the predefined visualizers and `params` is the visualizer specific parameters. `params` has a set of common parameters (all of which may not be used by a particular visualizer type) You must choose an appropriate visualizer for the cell data type. 

The `headerAlign` common parameter simply specifies how the column header text should be aligned and can be set to `left` (default), `right` and `center`.

The `baseStyle`, while a common parameter, can and usually does have visualizer specific properties. For the most part they're CSS variable value pairs, but some visualizers define custom properties that are transformed into CSS values (usually internal CSS custom variables).

The following predefined visualizers are provided:

|Name        |Data Type   |Description                                 |
|------------|------------|--------------------------------------------|
|`rating`    |number      |A star (or heart) rating for numeric values.|
|`percentage`|number      |A percentage bar for numeric values.        |
|`bar-chart` |Array:number|A bar chart array value visualizer.         |
|`line-chart`|Array:number|A line chart array value visualizer.        |

#### Rating Visualizer

The `Rating Visualizer` allows you to display score-type information using star or heart icons. The following custom parameters should be provided (if not provided the default value is used):

|Parameter  |Allowed Values         |Description                                      |
|-----------|-----------------------|-------------------------------------------------|
|`allowHalf`|false (default) or true|Whether or not half values are displayed.        |
|`count`    |1 - x                  |The number of stars or hearts to display.        |
|`heart`    |false (default) or true|Whether or not a heart is used instead of a star.|

The row value must be within the `count` range. Commonly used `baseStyle` values are:

```javascript
baseStyle: { 
    // The color of the stars/hearts.
    fill: '#E65100' 
}
```

#### Percentage Visualizer

The `Percentage Visualizer` displays the value as a percentage bar. It doesn't use any custom parameters. The row value must be between 0 and 100. Commonly used `baseStyle` values are:

```javascript
baseStyle: { 
    // The intrinsic width is the max of the header and percentage label, which may be too small.
    'min-width': '150px',
    // The filled percentage bar color.
    'bar-color': '#009688', 
    // The color of the border (may look weird without it).
    'border-color': '#009688' 
}
```

#### Bar Chart Visualizer

The `Bar Chart Visualizer` displays an array value of numbers as a bar chart sparkline. It doesn't use any custom parameters. The row value must be an array of numbers, each of which is displayed as a bar in the chart. Commonly used `baseStyle` values are:

```javascript
baseStyle: { 
    // A fixed width usually works best, or maybe min-width.
    'width': '100px', 
    // The color of positive value bars.
    'positive-color': '#E040FB', 
    // The color of negative value bars.
    'negative-color': '#CDDC39' 
}
```

#### Line Chart Visualizer

The `Line Chart Visualizer` displays an array value of numbers as a line chart sparkline. It doesn't use any custom parameters. The row value must be an array of numbers, each of which is displayed as a point in the chart. The following custom parameters should be provided (if not provided the default value is used):

|Parameter    |Allowed Values         |Description                                     |
|-------------|-----------------------|------------------------------------------------|
|`showLine`   |false or true (default)|Whether or not to show the line.                |
|`showMarkers`|false (default) or true|Whether or not to show the point markers.       |
|`showArea`   |false (default) or true|Whether or not to shade the area under the line.|

Commonly used `baseStyle` values are:

```javascript
baseStyle: { 
    // A fixed width usually works best, or maybe min-width.
    'width': '150px',
    // The color of the chart line.
    'line-color': '',
    // The color of the area under the line.
    'area-color': '',
    // The color of the positive value markers.
    'marker-positive-color': '',
    // The color of the negative value markers.
    'marker-negative-color': ''
}
```