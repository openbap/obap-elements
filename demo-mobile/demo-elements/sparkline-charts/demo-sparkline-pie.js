/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../../src/obap-element/obap-element.js';
import '../../../src/obap-sparkline/obap-pie-sparkline.js';
import '../../demo-mobile-app/demo-panel.js';

export class DemoSparklinePie extends ObapElement {
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

            .chart-container {
                display: flex;
                flex-direction: row;
                justify-content: space-around;
            }

            .custom-pie {
                --obap-pie-sparkline-separator-width: 0;
            }
        `];
    }

    static get properties() {
        return {
            values: {
                type: Array
            },

            colors: {
                type: Array
            }
        }
    }

    constructor() {
        super();
        this.colors = ['indianred', 'seagreen', 'cornflowerblue', 'hotpink'];
        this.values = [2,4,3];
    }

    render() {
        return html`
            <div class="container">
                <demo-panel>
                    <div class="chart-container">
                        <obap-pie-sparkline .values="${this.values}"></obap-pie-sparkline>
                        <obap-pie-sparkline class="custom-pie" .values="${this.values}" .colors="${this.colors}"></obap-pie-sparkline>

                        <obap-pie-sparkline .values="${this.values}" donut-radius="15"></obap-pie-sparkline>
                        <obap-pie-sparkline class="custom-pie" .values="${this.values}" donut-radius="15" .colors="${this.colors}"></obap-pie-sparkline>
                    </div>
                </demo-panel>
            </div>
        `;
    }
}

window.customElements.define('demo-sparkline-pie', DemoSparklinePie);