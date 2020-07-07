/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../../src/obap-element/obap-element.js';
import { elevation } from '../../../src/obap-styles/obap-elevation.js';
import { body } from '../../../src/obap-styles/obap-typography.js';
import '../../demo-mobile-app/demo-panel.js';

export class DemoStylesElevation extends ObapElement {
    static get styles() {
        return [elevation, body, css`
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
                height: 100%;
                padding: 6px 8px 8px 8px;
                box-sizing: border-box;
            }

            .item-container {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                grid-template-rows: 60px 60px 60px;
                grid-gap: 16px;
                width: 100%;
                height: 100%;
            }

            .item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: var(--obap-on-surface-color);
                background: var(--obap-surface-color);
                box-sizing: border-box;
            }
        `];
    }

    static get properties() {
        return {
            items: { type: Array }
        };
    }

    constructor() {
        super();
        this.items = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24];
    }

    render() {
        return html`
            <div class="container">
                <demo-panel>
                    <div class="item-container">
                        ${this.items.map(item => html`<div class="item elevation-${item} typography-body">${item}</div>`)}
                    </div>
                </demo-panel>
            </div>
        `;
    }
}

window.customElements.define('demo-styles-elevation', DemoStylesElevation);
