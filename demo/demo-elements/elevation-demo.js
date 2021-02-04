/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import { elevation } from '../../src/obap-styles/obap-elevation.js';

export class ElevationDemo extends ObapElement {
    static get styles() {
        return [elevation, css`
            :host {
                display: block;
                color: var(--obap-on-surface-color);
                background: var(--obap-surface-color);
            }
    
            .container {
                height: 100%;
            }

            .title {
                padding: 4px 8px;
                margin-bottom: 8px;
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
            }

            .item-container {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
            }

            .item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 120px;
                height: 120px;
                margin: 16px 24px 0 0;
                color: var(--obap-on-surface-color);
                background: var(--obap-surface-color);
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
        this.items = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24]
    }

    render() {
        return html`
            <div class="container">
                <div class="title">Elevation</div>
                <div class="item-container">
                    ${this.items.map(item => html`<div class="item elevation-${item}">${item}</div>`)}
                </div>
            </div>
        `;
    }
}

window.customElements.define('elevation-demo', ElevationDemo);