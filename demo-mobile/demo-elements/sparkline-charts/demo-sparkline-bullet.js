/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../../src/obap-element/obap-element.js';
import '../../../src/obap-sparkline/obap-bullet-sparkline.js';
import '../../demo-mobile-app/demo-panel.js';

export class DemoSparklineBullet extends ObapElement {
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
            bulletRanges: {
                type: Array
            }
        }
    }

    constructor() {
        super();
        this.bulletRanges = [40, 70, 85, 100];
    }

    render() {
        return html`
            <div class="container">
                <demo-panel class="center">
                    <obap-bullet-sparkline class="sparkline" .percentageRanges="${this.bulletRanges}" value="60" target-value="50" max-value="100"></obap-bullet-sparkline>
                </demo-panel>
            </div>
        `;
    }
}

window.customElements.define('demo-sparkline-bullet', DemoSparklineBullet);