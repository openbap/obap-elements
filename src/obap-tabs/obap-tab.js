/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';

export class ObapTab extends ObapElement {
    static get styles() {
        return css`
            :host {
                --obap-tab-padding: 3px 16px 0 16px;
                display: block;
                user-select: none;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }
    
            .container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: var(--obap-tab-padding);
                cursor: pointer;
                height: 100%;
                box-sizing: border-box;
            }
      `;
    }

    constructor() {
        super();
        this.role = 'tab';
    }

    render() {
        return html`<div class="container"><slot></slot></div>`;
    }
}

window.customElements.define('obap-tab', ObapTab);