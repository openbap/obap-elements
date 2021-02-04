/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-sparkline/obap-sparkline.js';

export class SparklineDemo extends ObapElement {
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
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
            }

            .row {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              align-items: center;
              padding: 0;
            }

            .sparkline {
                margin: 16px;
                outline: 1px solid lightgrey;
            }

            .small {
                width: 150px;
                height: 30px;
            }

            .custom-1 {
                --obap-line-sparkline-background-color: seagreen;
                --obap-line-sparkline-line-color: white;
                --obap-line-sparkline-area-color: cornflowerblue;
                --obap-line-sparkline-marker-positive-color: green;
                --obap-line-sparkline-marker-negative-color: red;
                --obap-line-sparkline-marker-positive-border-color: white;
                --obap-line-sparkline-marker-negative-border-color: white;
                --obap-line-sparkline-marker-border-width: 2;
            }

            .custom-pie {
                --obap-pie-sparkline-separator-color: seagreen;
                --obap-pie-section-color: cornflowerblue;
                --obap-pie-sparkline-separator-width: 0;
            }

            .custom-bullet {
                --obap-bullet-sparkline-value-color: #FFFF8D;
                --obap-bullet-sparkline-target-value-color: white;
                --obap-bullet-sparkline-range-color: var(--obap-primary-color);
            }

            obap-pie-sparkline {
                margin: 16px;
                outline: 0;
            }

            obap-percentage-sparkline {
                width: 200px;
            }
        `];
    }

    static get properties() {
        return {
            values1: {
                type: Array
            },

            values2: {
                type: Array
            },

            bulletRanges: {
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
        this.bulletRanges = [40, 70, 85, 100];
        this.values2 = [2,4,3];
        this.values1 = [-7, -9, -5, -2, 9, 11, 15, 10, 10, 17, 19, 17, 10, 22, 25, 10, 9, 10, 26, 28, 27, 10, 10, 30, 10, -3, -6, -3, 4, 10];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Line, Area and Scatter (with combinations)</div>
                <div class="row">
                    <obap-line-sparkline class="sparkline" .values="${this.values1}" show-line></obap-line-sparkline>
                    <obap-line-sparkline class="sparkline" .values="${this.values1}" show-markers></obap-line-sparkline>
                    <obap-line-sparkline class="sparkline" .values="${this.values1}" show-area></obap-line-sparkline>
                    <obap-line-sparkline class="sparkline" .values="${this.values1}" show-line show-markers show-area></obap-line-sparkline>
                    <obap-line-sparkline class="sparkline custom-1" .values="${this.values1}" show-line show-markers show-area marker-size="7"></obap-line-sparkline>
                </div>

                <div class="title">Bar</div>
                <div class="row">
                    <obap-bar-sparkline class="sparkline" .values="${this.values1}"></obap-bar-sparkline>
                </div>
                
                <div class="title">Pie and Donut</div>
                <div class="row">
                    <obap-pie-sparkline .values="${this.values2}"></obap-pie-sparkline>
                    <obap-pie-sparkline class="custom-pie" .values="${this.values2}" .colors="${this.colors}"></obap-pie-sparkline>

                    <obap-pie-sparkline .values="${this.values2}" donut-radius="15"></obap-pie-sparkline>
                    <obap-pie-sparkline class="custom-pie" .values="${this.values2}" donut-radius="15" .colors="${this.colors}"></obap-pie-sparkline>
                </div>

                <div class="title">Win-Loss (square or stretch markers)</div>
                <div class="row">
                    <obap-winloss-sparkline class="sparkline wl" .values="${this.values1}" threshold="0"></obap-winloss-sparkline>
                    <obap-winloss-sparkline class="sparkline wl" .values="${this.values1}" threshold="0" stretch></obap-winloss-sparkline>
                </div>

                <div class="title">Bullet</div>
                <div class="row">
                    <obap-bullet-sparkline class="sparkline" .percentageRanges="${this.bulletRanges}" value="60" target-value="50" max-value="100"></obap-bullet-sparkline>
                    <obap-bullet-sparkline class="sparkline custom-bullet" .percentageRanges="${this.bulletRanges}" value="60" target-value="50" max-value="100"></obap-bullet-sparkline>
                </div>

                <div class="title">Percentage</div>
                <div class="row">
                    <obap-percentage-sparkline class="sparkline" value="25"></obap-percentage-sparkline>
                    <obap-percentage-sparkline class="sparkline" value="70"></obap-percentage-sparkline>
                    <obap-percentage-sparkline class="sparkline" value="47"></obap-percentage-sparkline>
                </div>
            </div>
        `;
    }
}

window.customElements.define('sparkline-demo', SparklineDemo);