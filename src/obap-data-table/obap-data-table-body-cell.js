/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import '../obap-icon/obap-icon.js';

export class ObapDataTableBodyCell extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                font-weight: 400;
                padding: 0 20px;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .label {
                flex: 1;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .label[type="number"] {
                text-align: right;
            }

            .label[type="boolean"] {
                text-align: center;
            }

            .label[type="action"] {
                text-align: center;
                color: var(--obap-data-table-action-color);
                text-transform: uppercase;
                font-weight: 500;
                cursor: pointer;
            }

            obap-icon {
                width: 14px;
                height: 14px;
            }

            .body-cell-icon {
                fill: var(--obap-data-table-false-color);
            }

            .body-cell-icon[is-true] {
                fill: var(--obap-data-table-true-color);
            }
        `];
    }

    static get properties() {
        return {
            value: {
                type: Object,
                attribute: 'value'
            },

            column: {
                type: Object
            },

            row: {
                type: Object
            },

            falseIcon: {
                type: String,
                attribute: 'false-icon'
            },

            trueIcon: {
                type: String,
                attribute: 'true-icon'
            }
        }
    }

    constructor() {
        super();
        this.value = null;
        this.column = null;
        this.row = null;
        this.falseIcon = '';
        this.trueIcon = '';
    }

    render() {
        return html`
            <div class="container">
                ${this._renderContent()}
            </div>
        `;
    }

    _renderContent() {
        if (this.column.renderer) {
            return this.column.renderer(this.value, this.column);
        }

        switch (this.column.type) {
            case 'action': {
                return html`<div class="label" type="${this.column.type}" @click="${this._onActionClick}">${this.column.actionLabel}</div>`;
            }

            case 'boolean': {
                return html`<obap-icon class="body-cell-icon" ?is-true="${this.value}" icon="${this.value ? (this.trueIcon ? this.trueIcon : 'core:check') : (this.falseIcon ? this.falseIcon : 'core:cross')}"></obap-icon>`;
            }

            default: {
                return html`<div class="label" type="${this.column.type}">${this._format(this.value)}</div>`;
            }
        }
    }

    _format(value) {
        return this.column.formatter ? this.column.formatter(value) : value;
    }

    _onActionClick(e) {
        this.fireMessage('obap-data-table-action', { column: this.column, row: this.row });
    }
}

window.customElements.define('obap-data-table-body-cell', ObapDataTableBodyCell);