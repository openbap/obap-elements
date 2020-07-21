/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../../src/obap-element/obap-element.js';
import '../../../src/obap-sparkline/obap-line-sparkline.js';
import '../../demo-mobile-app/demo-panel.js';
import '../../../src/obap-check/obap-check.js';

export class DemoSparklineLine extends ObapElement {
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
                margin-bottom: 24px;
            }

            obap-check {
                margin-right: 24px;
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
            },

            showLine: {
                type: Boolean
            },

            showMarkers: {
                type: Boolean
            },

            showArea: {
                type: Boolean
            }
        }
    }

    constructor() {
        super();
        this.showLine = true;
        this.showMarkers = true;
        this.showArea = true;
        this.values = [-7, -9, -5, -2, 9, 11, 15, 10, 10, 17, 19, 17, 10, 22, 25, 10, 9, 10, 26, 28, 27, 10, 10, 30, 10, -3, -6, -3, 4, 10];
    }

    render() {
        return html`
            <div class="container">
                <demo-panel class="center">
                    <div class="check-group" @obap-item-selected="${this._checkChanged}">
                        <obap-check name="line" label="Line" selected></obap-check>
                        <obap-check name="marker" label="Marker" selected></obap-check>
                        <obap-check name="area" label="Area" selected></obap-check>
                    </div>
                    <obap-line-sparkline .values="${this.values}" ?show-line="${this.showLine}" ?show-markers="${this.showMarkers}" ?show-area="${this.showArea}"></obap-line-sparkline>
                </demo-panel>
            </div>
        `;
    }

    _checkChanged(e) {
        const name = e.detail.name;
        const selected = e.detail.selected;

        switch (name) {
            case 'line': {
                this.showLine = selected;
                break;
            }

            case 'marker': {
                this.showMarkers = selected;
                break;
            }

            case 'area': {
                this.showArea = selected;
                break;
            }
        }
    }
}

window.customElements.define('demo-sparkline-line', DemoSparklineLine);