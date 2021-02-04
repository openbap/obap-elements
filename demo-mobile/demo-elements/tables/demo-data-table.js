/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../../src/obap-element/obap-element.js';
import '../../../src/obap-material/obap-material.js';
import '../../../src/obap-data-table/obap-data-table-lite.js';

export class DemoDataTable extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: 100%;
                overflow: hidden;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            obap-data-list {
                width: 100%;
                height: 100%;
            }

            .container {
                height: 100%;
                padding: 8px;
                box-sizing: border-box;
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
            }
        }
    }

    currencyFormatter(value) {
        return `$${value.toFixed(2)}`;
    }

    percentageFormatter(value) {
        return `${value}%`;
    }

    constructor() {
        super();

        this.columns = [
            { label: 'Dessert (100g serving)', field: 'dessert',   type: 'text',    actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true },
            { label: 'Price',                  field: 'price',     type: 'number',  formatter: this.currencyFormatter,  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true },
            { label: 'Calories',               field: 'calories',  type: 'number',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
            { label: 'Fat (g)',                field: 'fat',       type: 'number',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
            { label: 'Carbs (g)',              field: 'carbs',     type: 'number',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
            { label: 'Protein (g)',            field: 'protein',   type: 'number',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
            { label: 'Sodium (mg)',            field: 'sodium',    type: 'number',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
            { label: 'Calcium (%)',            field: 'calcium',   type: 'number',  formatter: this.percentageFormatter,  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
            { label: 'Iron (%)',               field: 'iron',      type: 'number',  formatter: this.percentageFormatter,  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
            { label: 'In Stock',               field: 'available', type: 'boolean', actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true },
            { label: 'Add to Cart',            field: '',          type: 'action',  actionLabel: 'Add', trueIcon: '', falseIcon: '', sortable: false }
        ];

        this.rows = [
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
    }

    render() {
        return html`
            <div class="container">
                <obap-material elevation="1" @obap-data-action="${this._onAction}">
                    <obap-data-table-lite .columns="${this.columns}" .rows="${this.rows}" id-field="id" selection-mode="multiple" sort-index="4"></obap-data-table-lite>
                </obap-material>
            </div>
        `;
    }

    
}

window.customElements.define('demo-data-table', DemoDataTable);