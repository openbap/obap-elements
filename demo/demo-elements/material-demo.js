/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-material/obap-material.js';

export class MaterialDemo extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
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

            obap-material {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 120px;
                height: 120px;
                margin: 16px 24px 0 0;
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
                <div class="title">Material</div>
                <div class="item-container">
                    ${this.items.map(item => html`<obap-material elevation="${item}">${item}</obap-material>`)}
                </div>
            </div>
        `;
    }
}

window.customElements.define('material-demo', MaterialDemo);