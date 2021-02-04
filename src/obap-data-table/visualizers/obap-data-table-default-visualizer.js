/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
/*
--obap-data-table-action-color: #5c6bc0;
--obap-data-table-disabled-action-color: rgba(0, 0, 0, 0.38);
*/
import { html, css, ObapElement } from '../../obap-element/obap-element.js';
import { ObapDataTableVisualizerController } from './obap-data-table-visualizer-controller.js';

export class ObapDataTableDefaultVisualizer extends ObapDataTableVisualizerController(ObapElement) {
    static get styles() {
        return [css`
            :host {
                display: block;
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
                justify-content: flex-start;
                height: 100%;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .container[align="center"] {
                justify-content: center;
            }

            .container[align="right"] {
                justify-content: flex-end;
            }

            .label {
                flex: 1;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 100%;
                overflow: hidden;
            }

            .label[type="number"] {
                text-align: right;
            }

            .label[type="boolean"] {
                text-align: center;
            }

            .label[type="action"] {
                text-align: center;
                color: var(--obap-data-table-action-color, var(--obap-primary-color));
                text-transform: uppercase;
                font-weight: 500;
                cursor: pointer;
            }
        `];
    }

    static get properties() {
        return {
            row: {
                type: Object
            },

            column: {
                type: Object
            }
        }
    }

    constructor() {
        super();

        this.row = null;
        this.column = null;
    }

    render() {
        switch (this.column.type) {
            case 'action': {
                return html`<div class="label" type="${this.column.type}" @click="${this._onActionClick}">${this.column.actionLabel}</div>`;
            }

            case 'boolean': {
                return html`<div class="label" type="${this.column.type}">${this._format(this.value)}</div>`;
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

window.customElements.define('obap-data-table-default-visualizer', ObapDataTableDefaultVisualizer);
