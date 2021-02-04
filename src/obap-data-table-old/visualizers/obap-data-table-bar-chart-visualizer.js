/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../obap-element/obap-element.js';
import { ObapDataTableVisualizerController } from './obap-data-table-visualizer-controller.js';
import '../../obap-sparkline/obap-bar-sparkline.js';

export class ObapDataTableBarChartVisualizer extends ObapDataTableVisualizerController(ObapElement) {
    static get styles() {
        return [css`
            :host {
                display: block;
                overflow: hidden;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                display: flex;
                align-items: center;
                min-height: 100%;
                height: 100%;
                box-sizing: border-box;
                padding: 6px 0;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            obap-bar-sparkline {
                width: 100%;
                height: 100%;
            }
        `];
    }

    render() {
        let style = this.getBaseStyle();
        style = style.replace('positive-color', '--obap-bar-sparkline-positive-color');
        style = style.replace('negative-color', '--obap-bar-sparkline-negative-color');
        style = style.replace('background', '--obap-bar-sparkline-background-color');

        //style = style.replace('bar-color', '--obap-percentage-sparkline-selected-color');

        return html`
            <div class="container">
                <obap-bar-sparkline .values="${this.value}" style="${style}" bar-spacing="4"></obap-bar-sparkline>
            </div>
        `;
    }
}

window.customElements.define('obap-data-table-bar-chart-visualizer', ObapDataTableBarChartVisualizer);
