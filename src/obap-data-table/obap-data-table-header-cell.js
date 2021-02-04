/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';

export class ObapDataTableHeaderCell extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: flex;
                position: relative;
                font-weight: 500;  
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

            .arrow-icon {
                width: 14px;
                height: 14px;
            }

            .container {
                width: 100%;
                flex: 1;
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            .sort-icon {
                position: absolute;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                left: 4px;
                top: calc(50% - 1px);
                transform: translate(0, -50%);
                opacity: 0;
            }

            .sort-icon[sorted] {
                opacity: 1;
            }

            :host(:hover:not([no-hover])) > .sort-icon:not([sorted]) {
                opacity: 0.5;
            }

            .label {
                flex: 1;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: left;
                width: 100%;
                margin: 0 20px;
                overflow: hidden;
            }

            .label[column-type="number"], .label[column-type="right"] {
                text-align: right;
            }

            .label[column-type="boolean"], .label[column-type="action"], .label[column-type="center"] {
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
            },

            noHover: {
                type: Boolean,
                attribute: 'no-hover',
                reflect: true
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
        this.noHover = false;
    }

    render() {
        return html`
            ${this._renderSortIcon()}
            <div class="container">    
                <div class="label" column-type="${(this.column.visualizer && this.column.visualizer.params && this.column.visualizer.params.headerAlign) ? this.column.visualizer.params.headerAlign : this.column.type}">${this.column.label}</div>   
            </div>
        `;
    }

    _renderSortIcon() {
        return this.column.sortable ? html`
            <div class="sort-icon" ?sorted="${this.sorted}">
                ${this.sorted ? (this.sortDescending ? this._renderUpArrow() : this._renderDownArrow()) : this._renderUpArrow()}
            </div>
        ` : null;
    }

    _renderUpArrow() {
        return html`<svg class="arrow-icon" viewBox="0 0 24 24"><g><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path></g></svg>`;
    }

    _renderDownArrow() {
        return html`<svg class="arrow-icon" viewBox="0 0 24 24"><g><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path></g></svg>`;
    }
}

window.customElements.define('obap-data-table-header-cell', ObapDataTableHeaderCell);
