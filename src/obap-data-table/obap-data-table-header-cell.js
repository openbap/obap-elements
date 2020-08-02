/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import '../obap-icon/obap-icon.js';

export class ObapDataTableHeaderCell extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                font-weight: 500;
                padding: 0 20px;
                user-select: none;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            :host([sortable]) {
                cursor: pointer;
            }

            obap-icon {
                width: 14px;
                height: 14px;
            }

            .container {
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            .sort-icon {
                position: absolute;
                left: -16px;
                top: calc(50% - 1px);
                transform: translate(0, -50%);
                opacity: 0;
            }

            .sort-icon[sorted] {
                opacity: 1;
            }

            .container:hover > .sort-icon:not([sorted]) {
                opacity: 0.5;
            }

            .label {
                flex: 1;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .label[column-type="number"] {
                text-align: right;
            }

            .label[column-type="boolean"], .label[column-type="action"] {
                text-align: center;
            }
        `];
    }

    static get properties() {
        return {
            column: {
                type: Object
            },

            columnIndex: {
                type: Number,
                attribute: 'column-index'
            },

            sorted: {
                type: Boolean,
                attribute: 'sorted'
            },

            sortDescending: {
                type: Boolean,
                attribute: 'sort-descending'
            }
        }
    }

    get column() {
        return this._column;
    }

    set column(value) {
        const oldValue = this.column;

        if (oldValue !== value) {
            this._column = value;

            if (this._column && this._column.sortable) {
                this.setAttribute('sortable', '');
            } else {
                this.removeAttribute('sortable');
            }

            this.requestUpdate('column', oldValue);
        }
    }

    constructor() {
        super();
        this.column = null;
        this.columnIndex = -1;
        this.sorted = false;
        this.sortDescending = false;
    }

    render() {
        return html`
            <div class="container">
                ${this._renderSortIcon()}
                <div class="label" column-type="${this.column.type}">${this.column.label}</div>
            </div>
        `;
    }

    _renderSortIcon() {
        return this.column.sortable ? html`<obap-icon ?sorted="${this.sorted}" class="sort-icon" icon="${this.sorted ? (this.sortDescending ? 'core:arrow-down' : 'core:arrow-up') : 'core:arrow-up'}"></obap-icon>` : null;
    }
}

window.customElements.define('obap-data-table-header-cell', ObapDataTableHeaderCell);
