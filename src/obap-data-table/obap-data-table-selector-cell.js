/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
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

            obap-check {
                --obap-check-background-color: var(--obap-surface-color, white);
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
            },

            disabled: {
                type: Boolean,
                attribute: 'disabled'
            }
        }
    }

    constructor() {
        super();
        this.selected = false;
        this.indeterminate = false;
        this.disabled = false;
    }

    render() {
        return html`
            <div class="container" @obap-item-selected="${this._onSelect}">
                <obap-check no-ink ?selected="${this.selected}" ?indeterminate="${this.indeterminate}" ?disabled="${this.disabled}"></obap-check>
            </div>
        `;
    }

    _onSelect(e) {
        this.selected = e.detail.selected;

        this.fireMessage('obap-data-table-row-selected', {
            selected: this.selected
        });
    }
}

window.customElements.define('obap-data-table-selector-cell', ObapDataTableSelectorCell);
