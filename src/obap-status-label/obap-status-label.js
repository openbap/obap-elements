/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';

/**
 * A simple status label.
 */
export class ObapStatusLabel extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
                border-radius: 3px;
                overflow: hidden;
                padding: 0 4px;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 20px;
                line-height: 21px;
                font-size: 10px;
                text-transform: uppercase;
                font-weight: 400;
                -webkit-font-smoothing: antialiased;
            }
        `];
    }

    static get properties() {
        return {
            label: {
                type: String,
                attribute: 'label',
                reflect: true
            }
        }
    }

    constructor() {
        super();
        this.label = '';
    }

    render() {
        return html`<div class="container">${this.label}</div>`;
    }
}

window.customElements.define('obap-status-label', ObapStatusLabel);
