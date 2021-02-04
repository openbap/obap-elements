/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-data-table/obap-data-table-lite.js';
import '../../src/obap-material/obap-material.js';

export class DataTableLiteDemo extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
            }
    
            .container {
                height: 100%;
            }

            .title {
                padding: 4px 8px;
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
            }

            .row {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              align-items: center;
              padding: 0;
            }

            obap-material {
                margin: 16px 0;
            }

            obap-data-table-lite {
                --obap-data-table-true-color: green;
                --obap-data-table-false-color: red;
                height: 213px;
                width: 670px;
            }

            .custom-cell {
                text-overflow: ellipsis;
                white-space: nowrap;
                color: blue;
            }

            .visualizer-table {
                height: auto;
                width: auto;
            }
        `];
    }

    static get properties() {
        return {
            columns: {
                type: Array
            },

            rows: {
                type: Array
            },

            selectedRowsSingle: {
                type: Array
            },

            selectedRowsMultiple: {
                type: Array
            },

            columnActions: {
                type: Array
            },

            rowActions: {
                type: Array
            },

            visualizerColumns: {
                type: Array
            },

            visualizerRows: {
                type: Array
            }
        }
    }

    currencyFormatter(value) {
        return `$${value.toFixed(2)}`;
    }

    percentageFormatter(value) {
        return `${value}%`;
    }

    numberFormatterFactory(decimals) {
        return (value) => {
            return Number(value).toFixed(decimals);
        }
    }

    customRenderer(value, column) {
        return html`
            <div style="width: 100%; text-overflow: ellipsis; white-space: nowrap; text-align: right;">${value}</div>
        `;
    } 
    
    constructor() {
        super();

        this.columnActions = [];
        this.rowActions = [];

        this.columns = [
            { label: 'Dessert (100g serving)', field: 'dessert',   type: 'text',    actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true, fix: 'left' },
            { label: 'Price',                  field: 'price',     type: 'number',  formatter: this.currencyFormatter, actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true},
            { label: 'Calories',               field: 'calories',  type: 'number',  renderer: this.customRenderer, actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
            { label: 'Fat (g)',                field: 'fat',       type: 'number',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
            { label: 'Carbs (g)',              field: 'carbs',     type: 'number',  formatter: this.numberFormatterFactory(2),  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
            { label: 'Protein (g)',            field: 'protein',   type: 'number',  formatter: this.numberFormatterFactory(4),  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
            { label: 'Sodium (mg)',            field: 'sodium',    type: 'number',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
            { label: 'Calcium (%)',            field: 'calcium',   type: 'number',  formatter: this.percentageFormatter ,  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
            { label: 'Iron (%)',               field: 'iron',      type: 'number',  formatter: this.percentageFormatter,   actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
            { label: 'Rating',                 field: 'rating',    type: 'number',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true, visualizer: this.ratingVisualizer }, 
            { label: 'In Stock',               field: 'available', type: 'boolean', actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true, fix: 'right' },
            { label: 'Add to Cart',            field: '',          type: 'action',   actionLabel: 'Add', trueIcon: '', falseIcon: '', sortable: false }
        ];

        this.rows = [
            { id: 0, dessert: 'Frozen Yoghurt'    , price: 4.50, calories: 159, fat: 6.0,  carbs: 24, protein: 4.0, sodium: 87,  calcium: 14, iron: 1,  rating: 2.5,  available: true  },
            { id: 1, dessert: 'Ice Cream Sandwich', price: 3.99, calories: 237, fat: 9.0,  carbs: 37, protein: 4.3, sodium: 129, calcium: 8,  iron: 1,  rating: 4,  available: true  },
            { id: 2, dessert: 'Eclair'            , price: 2.99, calories: 262, fat: 16.0, carbs: 24, protein: 6.0, sodium: 337, calcium: 6,  iron: 7,  rating: 1,  available: false },
            { id: 3, dessert: 'Cupcake'           , price: 2.50, calories: 305, fat: 3.7,  carbs: 67, protein: 4.3, sodium: 413, calcium: 3,  iron: 8,  rating: 3.5,  available: true  },
            { id: 4, dessert: 'Gingerbread'       , price: 1.75, calories: 356, fat: 16.0, carbs: 49, protein: 3.9, sodium: 327, calcium: 7,  iron: 16, rating: 2, available: true  },
            { id: 5, dessert: 'Jelly Bean'        , price: 0.35, calories: 375, fat: 0.0,  carbs: 94, protein: 0.0, sodium: 50,  calcium: 0,  iron: 0,  rating: 3,  available: true  },
            { id: 6, dessert: 'Lollipop'          , price: 0.50, calories: 392, fat: 0.2,  carbs: 98, protein: 0.0, sodium: 38,  calcium: 0,  iron: 2,  rating: 2.5,  available: false },
            { id: 7, dessert: 'Honeycomb'         , price: 1.45, calories: 408, fat: 3.2,  carbs: 87, protein: 6.5, sodium: 562, calcium: 0,  iron: 45, rating: 2, available: false },
            { id: 8, dessert: 'Donut'             , price: 0.99, calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: 2,  iron: 22, rating: 5, available: true  },
            { id: 9, dessert: 'KitKat'            , price: 0.99, calories: 518, fat: 26.0, carbs: 65, protein: 7.0, sodium: 54,  calcium: 12, iron: 6,  rating: 4,  available: true  }
        ];  

        this.selectedRowsSingle = this.rows.filter((row, index) => index % 2 === 0);
        this.selectedRowsMultiple = this.rows.filter((row, index) => index % 2 === 0); 

        this.sales = [
            [10, 20, 15, 45, 17, 43, 87, 54, 29, 67],
            [12, 32, 15, 45, 33, 43, 56, 54, 46, 67],
            [10, 20, 15, 10, 17, 43, 45, 54, 29, 10],
            [10, 20, 29, 45, 67, 43, 87, 54, 29, 67],
            [10, 54, 15, 45, 10, 45, 87, 54, 17, 43],
            [67, 17, 67, 45, 17, 43, 17, 45, 29, 67],
            [10, 45, 15, 10, 29, 43, 87, 54, 45, 67],
            [67, 20, 15, 45, 17, 29, 87, 17, 29, 67],
            [45, 20, 15, 45, 17, 43, 87, 54, 29, 10],
            [10, 45, 15, 45, 17, 43, 87, 54, 29, 67] 
        ]

        this.ratingVisualizer = {
            name: 'rating',
            
            params: {
                headerAlign: 'center',
                heart: false,
                count: 5,
                allowHalf: true,
                baseStyle: { fill: '#E65100' },
            }
        }

        this.percentageVisualizer = {
            name: 'percentage',
            
            params: {
                headerAlign: 'center',
                baseStyle: { 'min-width': '150px', 'bar-color': '#009688', 'border-color': '#009688' }
            }
        }

        this.barChartVisualizer = {
            name: 'bar-chart',
            
            params: {
                headerAlign: 'center',
                baseStyle: { 'width': '100px', 'positive-color': '#E040FB', 'negative-color': '#CDDC39' }
            }
        }

        this.lineChartVisualizer = {
            name: 'line-chart',
            
            params: {
                headerAlign: 'center',
                baseStyle: { 'width': '150px', 'line-color': 'green', 'area-color': 'cornflowerblue', 'marker-positive-color': 'red', 'marker-negative-color': 'red' },
                showLine: true,
                showMarkers: true,
                showArea: true
            }
        }

        this.enumVisualizer = {
            name: 'enum',
            
            params: {
                headerAlign: 'center',
                valueAlign: 'center',
                lookups: ['small', 'medium', 'large', 'extra large'],
                baseStyle: { margin: '6px 0', 'border-radius': '3px', 'font-size': '12px' },
                styles: [
                    //null, 
                    { color: 'white', background: '#E53935' },
                    { color: 'white', background: '#757575' }, 
                    { color: 'white', background: '#43A047' },
                    { color: 'white', background: '#1E88E5' }
                ],
                icons: false
            }
        }

        this.enumIconVisualizer = {
            name: 'enum',
            
            params: {
                headerAlign: 'center',
                valueAlign: 'center',
                lookups: ['social:sentiment-dissatisfied', 'social:sentiment-neutral', 'social:sentiment-satisfied', 'social:sentiment-very-satisfied'],
                styles: [
                    { fill: 'red' }, 
                    { fill: 'green' }, 
                    { fill: 'blue' },
                    { fill: 'DeepPink' }
                ],
                icons: true,
                iconSize: '16px'
            }
        }

        this.booleanVisualizer = {
            name: 'boolean',
            
            params: {
                headerAlign: 'center',
                valueAlign: 'center',
                trueValue: 'YES',
                falseValue: 'NO',
                icons: false
            }
        }

        this.booleanIconVisualizer = {
            name: 'boolean',
            
            params: {
                headerAlign: 'center',
                valueAlign: 'center',
                trueValue: 'core:check',
                falseValue: 'core:cross',
                icons: true
            }
        }

        this.visualizerColumns = [
            { label: 'Dessert (100g serving)', field: 'dessert',   type: 'text',    sortable: true, fix: 'left' },
            { label: 'Rating',                 field: 'rating',    type: 'number',  sortable: true, visualizer: this.ratingVisualizer }, 
            { label: 'Percentage',             field: 'glitzy',    type: 'number',  sortable: true, visualizer: this.percentageVisualizer },
            { label: 'Bar Chart',              field: 'sales',     type: 'number',  sortable: true, visualizer: this.barChartVisualizer },
            { label: 'Line Chart',             field: 'sales',     type: 'number',  sortable: true, visualizer: this.lineChartVisualizer },
            { label: 'Enum (Text)',            field: 'size',      type: 'number',  sortable: true, visualizer: this.enumVisualizer },
            { label: 'Enum (Icon)',            field: 'size',      type: 'number',  sortable: true, visualizer: this.enumIconVisualizer },
            { label: 'Boolean (Text)',         field: 'available', type: 'number',  sortable: true, visualizer: this.booleanVisualizer },
            { label: 'Boolean (Icon)',         field: 'available', type: 'number',  sortable: true, visualizer: this.booleanIconVisualizer }
        ];

        this.visualizerRows = [
            { id: 0, dessert: 'Frozen Yoghurt'    , rating: 2.5, glitzy: 52, sales: this.sales[0], size: 0, available: true },
            { id: 1, dessert: 'Ice Cream Sandwich', rating: 4,   glitzy: 17, sales: this.sales[1], size: 3, available: true },
            { id: 2, dessert: 'Eclair'            , rating: 1,   glitzy: 20, sales: this.sales[2], size: 1, available: false },
            { id: 3, dessert: 'Cupcake'           , rating: 3.5, glitzy: 33, sales: this.sales[3], size: 1, available: true },
            { id: 4, dessert: 'Gingerbread'       , rating: 2,   glitzy: 47, sales: this.sales[4], size: 2, available: true },
            { id: 5, dessert: 'Jelly Bean'        , rating: 3,   glitzy: 58, sales: this.sales[5], size: 3, available: true },
            { id: 6, dessert: 'Lollipop'          , rating: 2.5, glitzy: 50, sales: this.sales[6], size: 0, available: false },
            { id: 7, dessert: 'Honeycomb'         , rating: 2,   glitzy: 12, sales: this.sales[7], size: 2, available: false },
            { id: 8, dessert: 'Donut'             , rating: 5,   glitzy: 85, sales: this.sales[8], size: 1, available: true },
            { id: 9, dessert: 'KitKat'            , rating: 4,   glitzy: 62, sales: this.sales[9], size: 3, available: true }
        ];  
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Visualizers</div>
                <div class="row">
                    <obap-material elevation="1">
                        <obap-data-table-lite class="visualizer-table" .columns="${this.visualizerColumns}" .rows="${this.visualizerRows}" id-field="id" selection-mode="none"></obap-data-table-lite>
                    </obap-material>
                </div>

                <div class="title">No Selection</div>
                <div class="row">
                    <obap-material elevation="1" @obap-data-table-action="${this._onAction}">
                        <obap-data-table-lite .columns="${this.columns}" .rows="${this.rows}" .columnActions="${this.columnActions}" .rowActions="${this.rowActions}" id-field="id" selection-mode="none" sort-index="4"></obap-data-table-lite>
                    </obap-material>
                </div>

                <div class="title">Single Selection</div>
                <div class="row">
                    <obap-material elevation="1" @obap-data-table-action="${this._onAction}">
                        <obap-data-table-lite .columns="${this.columns}" .rows="${this.rows}" .columnActions="${this.columnActions}" .rowActions="${this.rowActions}" .selectedRows="${this.selectedRowsSingle}" id-field="id" selection-mode="single" sort-index="4"></obap-data-table-lite>
                    </obap-material>
                </div>

                <div class="title">Multiple Selection</div>
                <div class="row">
                    <obap-material elevation="1" @obap-data-table-action="${this._onAction}">
                        <obap-data-table-lite .columns="${this.columns}" .rows="${this.rows}" .columnActions="${this.columnActions}" .rowActions="${this.rowActions}" .selectedRows="${this.selectedRowsMultiple}" id-field="id" selection-mode="multiple" sort-index="4"></obap-data-table-lite>
                    </obap-material>
                </div>
            </div>
        `;
    }

    _onAction(e) {
        console.log(e.detail);
    }
}

window.customElements.define('data-table-lite-demo', DataTableLiteDemo);
