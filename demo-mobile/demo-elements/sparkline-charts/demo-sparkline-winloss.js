/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../../src/obap-element/obap-element.js';
import '../../../src/obap-sparkline/obap-winloss-sparkline.js';
import '../../demo-mobile-app/demo-panel.js';

export class DemoSparklineWinLoss extends ObapElement {
    static get styles() {
        return [css`
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

            .check-group {
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            demo-panel {
                margin-bottom: 8px;
            }

            .center {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
            }
        `];
    }

    static get properties() {
        return {
            values: {
                type: Array
            }
        }
    }

    constructor() {
        super();
        this.values = [-7, -9, -5, -2, 9, 11, 15, 10, 10, 17, 19, 17, 10, 22, 25, 10, 9, 10, 26, 28, 27, 10, 10, 30, 10, -3, -6, -3, 4, 10];
    }

    render() {
        return html`
            <div class="container">
                <demo-panel class="center">
                    <obap-winloss-sparkline .values="${this.values}"></obap-winloss-sparkline>
                </demo-panel>
            </div>
        `;
    }
}

window.customElements.define('demo-sparkline-winloss', DemoSparklineWinLoss);