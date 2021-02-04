/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import './visualizers/obap-data-table-visualizers.js';

export class ObapDataTableBodyCell extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                font-weight: 400;
                
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
                height: 100%;
            }

            .visualizer {
                height: 100%;
                width: 100%;
                margin: 0 20px;
                overflow: hidden;
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

            loading: {
                type: Boolean,
                attribute: 'loading'
            }
        }
    }

    constructor() {
        super();
        this.value = null;
        this.column = null;
        this.row = null;
        this.loading = false;
    }

    render() {
        return html`
            <div class="container">
                ${this._renderContent()}
            </div>
        `;
    }

    _renderContent() {
        if (this.loading) {
            if (this.column.preloadRenderer) {
                return this.column.preloadRenderer();
            }

            return html`<obap-data-table-loading-visualizer class="visualizer"></obap-data-table-loading-visualizer>`;
        }

        if (this.column.renderer) {
            return this.column.renderer(this.value, this.column);
        }

        if (this.column.visualizer) {
            
            switch (this.column.visualizer.name) {
                case 'bar-chart': {
                    return html`<obap-data-table-bar-chart-visualizer class="visualizer" .value="${this.value}" .params="${this.column.visualizer.params}"></obap-data-table-bar-chart-visualizer>`;
                }

                case 'line-chart': {
                    return html`<obap-data-table-line-chart-visualizer class="visualizer" .value="${this.value}" .params="${this.column.visualizer.params}"></obap-data-table-line-chart-visualizer>`;
                }

                case 'boolean': {
                    return html`<obap-data-table-boolean-visualizer class="visualizer" .value="${this.value}" .params="${this.column.visualizer.params}"></obap-data-table-boolean-visualizer>`;
                }

                case 'enum': {
                    return html`<obap-data-table-enum-visualizer class="visualizer" .value="${this.value}" .params="${this.column.visualizer.params}"></obap-data-table-enum-visualizer>`;
                }

                case 'percentage': {
                    return html`<obap-data-table-percentage-visualizer class="visualizer" .value="${this.value}" .params="${this.column.visualizer.params}"></obap-data-table-percentage-visualizer>`;
                }

                case 'rating': {
                    return html`<obap-data-table-rating-visualizer class="visualizer" .value="${this.value}" .params="${this.column.visualizer.params}"></obap-data-table-rating-visualizer>`;
                }

                default: {
                    return html`<obap-data-table-default-visualizer class="visualizer" .column="${this.column}" .row="${this.row}" .value="${this.value}" .params="${this.column.visualizer.params}"></obap-data-table-default-visualizer>`;
                }
            }
        }

        return html`<obap-data-table-default-visualizer class="visualizer" .column="${this.column}" .row="${this.row}" .value="${this.value}"></obap-data-table-default-visualizer>`;
    }
}

window.customElements.define('obap-data-table-body-cell', ObapDataTableBodyCell);