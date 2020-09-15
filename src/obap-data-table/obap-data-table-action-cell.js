/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import '../obap-icon/obap-icon.js';

export class ObapDataTableActionCell extends ObapElement {
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
                padding: 0 9px;
                cursor: pointer;
            }

            obap-icon {
                width: 14px;
                height: 14px;
                margin-top: 1px;
            }
        `];
    }

    static get properties() {
        return {
            row: {
                type: Object
            },

            actions: {
                type: Array
            },

            icon: {
                type: String,
                attribute: 'icon'
            }
        }
    }

    constructor() {
        super();
        this.row = null;
        this.actions = [];
        this.icon = '';
    }

    render() {
        return html`
            <div class="container">
                <obap-icon icon="core:menu"></obap-icon>
            </div>
        `;
    }
}

window.customElements.define('obap-data-table-action-cell', ObapDataTableActionCell);
