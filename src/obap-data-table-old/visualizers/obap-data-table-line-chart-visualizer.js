/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../obap-element/obap-element.js';
import { ObapDataTableVisualizerController } from './obap-data-table-visualizer-controller.js';
import '../../obap-sparkline/obap-line-sparkline.js';

export class ObapDataTableLineChartVisualizer extends ObapDataTableVisualizerController(ObapElement) {
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

            obap-line-sparkline {
                width: 100%;
                height: 100%;
            }
        `];
    }

    render() {
        const showLine = this.getParamValue('showLine', true);
        const showMarkers = this.getParamValue('showMarkers', false);
        const showArea = this.getParamValue('showArea', false);

        let style = this.getBaseStyle();
        style = style.replace('line-color', '--obap-line-sparkline-line-color');
        style = style.replace('area-color', '--obap-line-sparkline-area-color');
        style = style.replace('marker-positive-color', '--obap-line-sparkline-marker-positive-color');
        style = style.replace('marker-negative-color', '--obap-line-sparkline-marker-negative-color');

        return html`
            <div class="container">
                <obap-line-sparkline .values="${this.value}" ?show-line="${showLine}" ?show-markers="${showMarkers}" ?show-area="${showArea}" style="${style}"></obap-line-sparkline>
            </div>
        `;
    }
}

window.customElements.define('obap-data-table-line-chart-visualizer', ObapDataTableLineChartVisualizer);
