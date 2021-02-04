/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-tabs/obap-tabs.js';
import '../../src/obap-pages/obap-pages.js';
import '../../src/obap-selector/obap-selector-container.js';
import '../../src/obap-chart/obap-bar-chart.js';

export class ChartDemo extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: calc(100% + 16px);
                margin: -8px;
                box-sizing: border-box;
                background: var(--obap-window-color, #E0E0E0);
            }
    
            .container {
                height: 100%;
            }

            obap-selector-container {
                display: flex;
                flex-direction: column;
                height: 100%;
            }

            obap-pages {
                flex: 1;
            }

            obap-tabs {
                margin-bottom: 2px;
            }

            .page {
                display: flex;
             
                height: 100%;
                background: var(--obap-surface-color, white);
            }

            .chart {
                
                width: calc(100% - 16px);
                height: calc(100% - 16px);
                margin: 8px;
                
                
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <obap-selector-container selected-index="0">
                    <obap-tabs>
                        <obap-tab>Bar</obap-tab>
                        <obap-tab>Line</obap-tab>
                    </obap-tabs>

                    <obap-pages>
                        <div class="page">
                            <obap-bar-chart class="chart" caption="Bar Chart" caption-position="top" legend-position="right"></obap-bar-chart>
                        </div>
                        <div class="page">
                            <div>TODO</div>
                        </div>
                    </obap-pages>
                </obap-selector-container>
            </div>
        `;
    }
}

window.customElements.define('chart-demo', ChartDemo);