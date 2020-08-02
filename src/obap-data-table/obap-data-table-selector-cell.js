/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import '../obap-check/obap-check.js';

export class ObapDataTableSelectorCell extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: var(--obap-data-table-row-height);
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 0 8px;
            }
        `];
    }

    static get properties() {
        return {
            selected: {
                type: Boolean,
                attribute: 'selected'
            },

            indeterminate: {
                type: Boolean,
                attribute: 'indeterminate'
            }
        }
    }

    constructor() {
        super();
        this.selected = false;
        this.indeterminate = false;
    }

    render() {
        return html`
            <div class="container" @obap-item-selected="${this._onSelect}">
                <obap-check ?selected="${this.selected}" ?indeterminate="${this.indeterminate}" no-ink></obap-check>
            </div>
        `;
    }

    _onSelect(e) {
        this.selected = e.detail.selected;
    }
}

window.customElements.define('obap-data-table-selector-cell', ObapDataTableSelectorCell);
