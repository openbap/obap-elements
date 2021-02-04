/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';

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

            .menu-icon {
                width: 14px;
                height: 14px;
                margin-top: 1px;
                fill: red;
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
            }
        }
    }

    constructor() {
        super();
        this.row = null;
        this.actions = [];
    }

    render() {
        return html`
            <div class="container">
                <svg class="menu-icon" viewBox="0 0 24 24"><g><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g></svg>
            </div>
        `;
    }
}

window.customElements.define('obap-data-table-action-cell', ObapDataTableActionCell);