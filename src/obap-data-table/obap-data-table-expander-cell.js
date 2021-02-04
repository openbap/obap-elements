/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';

export class ObapDataTableExpanderCell extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: var(--obap-data-table-row-height);
                user-select: none;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                height: 100%;
                width: 16px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 0 4px;
            }

            .icon {
                cursor: pointer;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                transition: 0.1s ease-out;
                -webkit-transform: rotate(0deg);
                -moz-transform: rotate(0deg);
                transform: rotate(0deg);
            }

            .icon[expanded] {
                -webkit-transform: rotate(90deg);
                -moz-transform: rotate(90deg);
                transform: rotate(90deg);
            }

            svg {
                width: 16px;
                height: 16px;
            }
        `];
    }

    static get properties() {
        return {
            row: {
                type: Object
            },

            expanded: {
                type: Boolean
            }
        }
    }

    constructor() {
        super();
        this.row = null;
        this.expanded = false;
    }

    render() {
        return html`
            <div class="container" @click="${this._onSelect}">
                ${this._renderIcon()}
            </div>
        `;
    }

    _renderIcon() {
        if (this.row) {
            return html`<div class="icon" ?expanded="${this.expanded}"><svg viewBox="0 0 24 24"><g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></g></svg></div>`;
        }

        return null;
    }

    _onSelect(e) {
        if (this.row) {
            this.fireMessage('obap-data-table-row-toggle', { row: this.row });
        }
    }
}

window.customElements.define('obap-data-table-expander-cell', ObapDataTableExpanderCell);
