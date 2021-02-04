/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import { body } from '../../src/obap-styles/obap-typography.js';

import '../../src/obap-radio/obap-radio-group.js';
import '../../src/obap-check/obap-check.js';
import '../../src/obap-button/obap-button.js';
import '../../src/obap-data-table/obap-data-table.js';
import '../../src/obap-material/obap-material.js';

export class DataTableDemo extends ObapElement {
    static get styles() {
        return [body, css`
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

            .option-label {
                height: 22px;
                line-height: 22px;
                margin-right: 16px;
                margin-top: -4px;
                font-weight: 500;
            }

            obap-material {
                margin: 16px 0;
            }

            obap-data-table {
                --obap-data-table-true-color: green;
                --obap-data-table-false-color: red;
                height: 379px;
            }

            table {
                margin: 16px 0 0 0;
            }

            obap-radio, obap-check {
        
                width: 130px;
            }

            obap-check {
                margin-right: 1px;
            }

            .check-group {
                display: flex;
                height: 25px;
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

            .primary {
                --obap-button-ripple-color: var(--obap-on-primary-color);
                --obap-button-color: var(--obap-on-primary-color);
                --obap-button-background-color: var(--obap-primary-color);
            }
        `];
    }

    static get properties() {
        return {
            loading: {
                type: Boolean,
                attribute: 'loading'
            },

            columns: {
                type: Array
            },

            columns1: {
                type: Array
            },

            columns2: {
                type: Array
            },

            rows: {
                type: Array
            },

            sales: {
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
            },

            // demo
            selectionModeIndex: {
                type: Number,
                attribute: 'selection-mode-index'
            },

            selectionMode: {
                type: String,
                attribute: 'selection-mode'
            },

            columnSizingIndex: {
                type: Number,
                attribute: 'column-sizing-index'
            },

            columnSizing: {
                type: String,
                attribute: 'column-sizing'
            },

            columnTypeIndex: {
                type: Number,
                attribute: 'column-type-index'
            },

            verticalLines: {
                type: Boolean,
                attribute: 'vertical-lines'
            }
        }
    }

    currencyFormatter(value) {
        return `$${value.toFixed(2)}`;
    }

    customRenderer(value, column) {
        return html`
            <div style="width: 100%; text-overflow: ellipsis; white-space: nowrap; text-align: right; padding: 0 20px;">${value}</div>
        `;
    }

    preloadRenderer() {
        return html`
            <div style="width: 100%; height: calc(100% - 24px); background: yellow; margin: 12px 0; border-radius: 6px;"></div>
        `;
    }

    numberFormatterFactory(decimals) {
        return (value) => {
            return Number(value).toFixed(decimals);
        }
    }

    /*
    percentageFormatter(value) {
        return `${value}%`;
    }

    
    */

    detailSectionRenderer(row) {
        //const height = 40 + (row.id * 10);
        const width = 200;
        return html`
            <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; width: ${width}px; padding: 8px; box-sizing: border-box; background: white;">
                <div>DETAIL SECTION</div>
                <div>${row.dessert}</div>
            </div>
        `;
    }

    detailRowRenderer(row) {
        //const height = 40 + (row.id * 10);
        const height = 40;
        return html`
            <div style="height: ${height}px; display: flex; align-items: center; width: auto; padding: 0 24px; background: lightyellow;">
                <div>DETAIL ROW: ${row.dessert}</div>
            </div>
        `;
    }

    constructor() {
        super();

        this.loading = false;

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
        ];

        this.selectionModeIndex = 0;
        this.selectionMode = 'none';

        this.columnSizingIndex = 0;
        this.columnSizing = 'auto';

        this.columnTypeIndex = 0;
        this.verticalLines = false;

        this.columnActions = [];
        this.rowActions = [];

        this.booleanVisualizer = {
            name: 'boolean',
            
            params: {
                headerAlign: 'center',
                valueAlign: 'center',
                trueValue: 'YES',
                falseValue: 'NO',
                trueColor: 'green',
                falseColor: 'red',
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
                trueColor: 'green',
                falseColor: 'red',
                icons: true
            }
        }

        this.percentageVisualizer = {
            name: 'percentage',
            
            params: {
                headerAlign: 'center',
                baseStyle: { 'min-width': '100px', 'fill-color': '#009688', 'background-color': 'white', 'border-color': '#009688' }
            }
        }

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

        this.columns1 = [
            { label: 'Dessert (100g serving)', field: 'dessert', type: 'loading', actionLabel: '', trueIcon: '', falseIcon: '', sortable: true, fix: 'left' },
            { label: 'Price', field: 'price', type: 'number', formatter: this.currencyFormatter, actionLabel: '', trueIcon: '', falseIcon: '', sortable: true, width: 'auto' },
            { label: 'Size', field: 'size', type: 'number', actionLabel: '', trueIcon: '', falseIcon: '', sortable: true, width: 'auto', visualizer: this.enumVisualizer },
            { label: 'Calories', field: 'calories', type: 'number', renderer: this.customRenderer, actionLabel: '', trueIcon: '', falseIcon: '', sortable: true },
            { label: 'Fat (g)', field: 'fat', type: 'number', actionLabel: '', trueIcon: '', falseIcon: '', sortable: true },
            { label: 'Carbs (g)', field: 'carbs', type: 'number', formatter: this.numberFormatterFactory(2), actionLabel: '', trueIcon: '', falseIcon: '', sortable: true },
            { label: 'Protein (g)', field: 'protein', type: 'number', formatter: this.numberFormatterFactory(4), actionLabel: '', trueIcon: '', falseIcon: '', sortable: true },
            { label: 'Sodium (mg)', field: 'sodium', type: 'number', actionLabel: '', trueIcon: '', falseIcon: '', sortable: true },
            { label: 'Calcium (%)', field: 'calcium', type: 'number', formatter: this.percentageFormatter, actionLabel: '', trueIcon: '', falseIcon: '', sortable: true },
            { label: 'Iron (%)', field: 'iron', type: 'number', formatter: this.percentageFormatter, actionLabel: '', trueIcon: '', falseIcon: '', sortable: true },
            { label: 'Rating', field: 'rating', type: 'number', actionLabel: '', trueIcon: '', falseIcon: '', sortable: true, visualizer: this.ratingVisualizer },
            { label: 'Profit (%)', field: 'profit', type: 'number', formatter: this.percentageFormatter, actionLabel: '', sortable: true, visualizer: this.percentageVisualizer },
            { label: 'Sales', field: 'sales', type: 'number', actionLabel: '', trueIcon: '', falseIcon: '', sortable: false, visualizer: this.barChartVisualizer },
            { label: 'In Stock', field: 'available', type: 'boolean', actionLabel: '', trueIcon: '', falseIcon: '', sortable: true, visualizer: this.booleanVisualizer, fix: 'right' },
            { label: 'Add to Cart', field: '', type: 'action', actionLabel: 'Add', trueIcon: '', falseIcon: '', sortable: false, fix: 'right' }
        ];

        this.columns2 = [
            {
                label: '', fix: 'left', columns: [
                    { label: 'Dessert (100g serving)', field: 'dessert', type: 'text', actionLabel: '', sortable: true, fix: 'left' },
                    { label: 'Price', field: 'price', type: 'number', formatter: this.currencyFormatter, actionLabel: '', sortable: true, width: 'auto' },
                    { label: 'Size', field: 'size', type: 'number', actionLabel: '', trueIcon: '', falseIcon: '', sortable: true, width: 'auto', visualizer: this.enumVisualizer },
                ]
            },

            {
                label: 'Nutritional Information', columns: [
                    { label: 'Calories', field: 'calories', type: 'number', actionLabel: '', sortable: true, renderer: this.customRenderer },
                    { label: 'Fat (g)', field: 'fat', type: 'number', actionLabel: '', sortable: true },
                    { label: 'Carbs (g)', field: 'carbs', type: 'number', actionLabel: '', sortable: true },
                    { label: 'Protein (g)', field: 'protein', type: 'number', actionLabel: '', sortable: true },
                    { label: 'Sodium (mg)', field: 'sodium', type: 'number', actionLabel: '', sortable: true },
                    { label: 'Calcium (%)', field: 'calcium', type: 'number', formatter: this.percentageFormatter, actionLabel: '', sortable: true },
                    { label: 'Iron (%)', field: 'iron', type: 'number', formatter: this.percentageFormatter, actionLabel: '', sortable: true }
                ]
            },

            {
                label: 'Sales Information', columns: [
                    { label: 'Rating', field: 'rating', type: 'number', actionLabel: '', trueIcon: '', falseIcon: '', sortable: true, visualizer: this.ratingVisualizer },
                    { label: 'Profit (%)', field: 'profit', type: 'number', formatter: this.percentageFormatter, actionLabel: '', sortable: true, visualizer: this.percentageVisualizer },
                    { label: 'Sales', field: 'sales', type: 'number', actionLabel: '', trueIcon: '', falseIcon: '', sortable: false, visualizer: this.barChartVisualizer },
                    { label: 'In Stock', field: 'available', type: 'boolean', actionLabel: '', sortable: true, visualizer: this.booleanIconVisualizer }
                ]
            },

            {
                label: '', fix: 'right', columns: [
                    { label: 'Add to Cart', field: '', type: 'action', actionLabel: 'Add', sortable: false }
                ]
            }
        ];

        this.columns = this.columns1;

        
        this.allRows = [
            { id: 0, dessert: 'Frozen Yoghurt', price: 4.50, calories: 159, fat: 6.0, carbs: 24, protein: 4.0, sodium: 87, calcium: 14, iron: 1, available: true, profit: 8, size: 0, rating: 1.5, sales: this.sales[0] },
            { id: 1, dessert: 'Ice Cream Sandwich', price: 3.99, calories: 237, fat: 9.0, carbs: 37, protein: 4.3, sodium: 129, calcium: 8, iron: 1, available: true, profit: 33, size: 3, rating: 2.5, sales: this.sales[1] },
            { id: 2, dessert: 'Eclair', price: 2.99, calories: 262, fat: 16.0, carbs: 24, protein: 6.0, sodium: 337, calcium: 6, iron: 7, available: false, profit: 12, size: 0, rating: 4.5, sales: this.sales[2] },
            { id: 3, dessert: 'Cupcake', price: 2.50, calories: 305, fat: 3.7, carbs: 67, protein: 4.3, sodium: 413, calcium: 3, iron: 8, available: true, profit: 10, size: 0, rating: 4, sales: this.sales[3] },
            { id: 4, dessert: 'Gingerbread', price: 1.75, calories: 356, fat: 16.0, carbs: 49, protein: 3.9, sodium: 327, calcium: 7, iron: 16, available: true, profit: 25, size: 1, rating: 2, sales: this.sales[4] },
            { id: 5, dessert: 'Jelly Bean', price: 0.35, calories: 375, fat: 0.0, carbs: 94, protein: 0.0, sodium: 50, calcium: 0, iron: 0, available: true, profit: 48, size: 2, rating: 1, sales: this.sales[5] },
            { id: 6, dessert: 'Lollipop', price: 0.50, calories: 392, fat: 0.2, carbs: 98, protein: 0.0, sodium: 38, calcium: 0, iron: 2, available: false, profit: 72, size: 0, rating: 3.5, sales: this.sales[6] },
            { id: 7, dessert: 'Honeycomb', price: 1.45, calories: 408, fat: 3.2, carbs: 87, protein: 6.5, sodium: 562, calcium: 0, iron: 45, available: false, profit: 19, size: 3, rating: 1.5, sales: this.sales[7] },
            { id: 8, dessert: 'Donut', price: 0.99, calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: 2, iron: 22, available: true, profit: 50, size: 1, rating: 5, sales: this.sales[8] },
            { id: 9, dessert: 'KitKat', price: 0.99, calories: 518, fat: 26.0, carbs: 65, protein: 7.0, sodium: 54, calcium: 12, iron: 6, available: true, profit: 81, size: 2, rating: 5, sales: this.sales[9] }
        ];

        let r = [];

        for (let i = 1; i <= 3; i++) {
            r = r.concat(JSON.parse(JSON.stringify(this.allRows)));
        }

        r.forEach((item, index) => {
            item.id = index;
        });
   
        //this.rows = this.allRows;
        this.rows = [];

        requestAnimationFrame(() => this.rows = r);

        /*
        this.selectedRowsSingle = this.rows.filter((row, index) => index % 2 === 0);
        this.selectedRowsMultiple = this.rows.filter((row, index) => index % 2 === 0); 

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
        */
    }

    render() {
        return html`
            <div class="container">
                <div class="title">Data Table</div>
                <div>
                    <table>
                        <tr>
                            <td><div class="option-label typography-body">Selection Mode:</div></td>
                            <td>
                                <obap-radio-group selected-index="${this.selectionModeIndex}" @obap-item-selected="${this._selectionModeSelected}">
                                    <obap-radio label="none"></obap-radio>
                                    <obap-radio label="single"></obap-radio>
                                    <obap-radio label="multiple"></obap-radio>
                                </obap-radio-group>
                            </td>
                        </tr>
                        <tr>
                            <td><div class="option-label typography-body">Column Sizing:</div></td>
                            <td>
                                <obap-radio-group selected-index="${this.columnSizingIndex}" @obap-item-selected="${this._columnSizingSelected}">
                                    <obap-radio label="auto"></obap-radio>
                                    <obap-radio label="fixed"></obap-radio>
                                    <obap-radio label="resizable"></obap-radio>
                                </obap-radio-group>
                            </td>
                        </tr>
                        <tr>
                            <td><div class="option-label typography-body">Column Type:</div></td>
                            <td>
                                <obap-radio-group selected-index="${this.columnTypeIndex}" @obap-item-selected="${this._columnTypeSelected}">
                                    <obap-radio label="single"></obap-radio>
                                    <obap-radio label="grouped"></obap-radio>
                                </obap-radio-group>
                            </td>
                        </tr>
                        <tr>
                            <td><div class="option-label typography-body">Row Detail:</div></td>
                            <td>
                                <div class="check-group" @obap-item-selected="${this._rowDetailSelected}">
                                    <obap-check label="row" name="row"></obap-check>
                                    <obap-check label="side" name="side"></obap-check>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><div class="option-label typography-body">Misc:</div></td>
                            <td>
                                <div class="check-group" @obap-item-selected="${this._rowDetailSelected}">
                                    <obap-check label="column lines" name="vertical-lines"></obap-check>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>

                <div class="row">
                    <obap-material elevation="1" @obap-data-table-action="${this._onAction}">
                        <obap-data-table id="table" column-sizing="${this.columnSizing}" .columns="${this.columns}" .rows="${this.rows}" 
                                         .columnActions="${this.columnActions}" .rowActions="${this.rowActions}" id-field="id" selection-mode="${this.selectionMode}" 
                                         sort-index="4" ?show-column-lines="${this.verticalLines}" preload-row-count="10" ?loading="${this.loading}">
                        </obap-data-table>
                    </obap-material>
                </div>

                <div class="actions">
                    <obap-button class="primary" label="Simulate Load" raised @click="${this._onSimulateLoad}"></obap-button>
                </div>
            </div>
        `;
    }

    _onAction(e) {
        console.log(e.detail);
    }

    _selectionModeSelected(e) {
        this.selectionModeIndex = e.detail.index;
        this.selectionMode = e.detail.item.label;

        e.stopPropagation();
    }

    _columnSizingSelected(e) {
        this.columnSizingIndex = e.detail.index;
        this.columnSizing = e.detail.item.label;

        e.stopPropagation();
    }

    _columnTypeSelected(e) {
        this.columnTypeIndex = e.detail.index;

        switch (this.columnTypeIndex) {
            case 1: {
                this.columns = this.columns2;
                break;
            }

            default: {
                this.columns = this.columns1;
                break;
            }
        }

        e.stopPropagation();
    }

    _rowDetailSelected(e) {
        const table = this.renderRoot.getElementById('table');

        switch (e.detail.name) {
            case 'row': {
                e.detail.selected ? table.detailRowTemplate = this.detailRowRenderer.bind(this) : table.detailRowTemplate = null;
                break;
            }

            case 'side': {
                e.detail.selected ? table.detailSectionTemplate = this.detailSectionRenderer.bind(this) : table.detailSectionTemplate = null;
                break;
            }

            case 'vertical-lines': {
                this.verticalLines = e.detail.selected;
                break;
            }
        }

        e.stopPropagation();
    }

    _onSimulateLoad() {
        this.loading = true;
        const tempRows = this.rows;
        this.rows = [];

        setTimeout(() => { 
            this.rows = tempRows;
            this.loading = false;
        }, 10000);
    }
}

window.customElements.define('data-table-demo', DataTableDemo);
