/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../obap-element/obap-element.js';
import { ObapDataTableVisualizerController } from './obap-data-table-visualizer-controller.js';
import '../../obap-sparkline/obap-percentage-sparkline.js';

export class ObapDataTablePercentageVisualizer extends ObapDataTableVisualizerController(ObapElement) {
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
                padding: 8px 0;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            obap-percentage-sparkline {
                width: 100%;
                height: 100%;
                border: 1px solid var(--obap-primary-color, #5c6bc0);
            }
        `];
    }

    render() {
        //const minWidth = this.getParamValue('minWidth', 'auto');
        //const style = `min-width: ${minWidth};`;
        let style = this.getBaseStyle();
        style = style.replace('fill-color', '--obap-percentage-sparkline-selected-color');
        style = style.replace('background-color', '--obap-percentage-sparkline-unselected-color');

        /*
        --obap-percentage-sparkline-selected-color: var(--obap-primary-color, #5c6bc0);
        --obap-percentage-sparkline-unselected-color: var(--obap-on-primary-color, #FFFFFF);
        */

        return html`
            <div class="container">
                <obap-percentage-sparkline .value="${this.value}" style="${style}"></obap-percentage-sparkline>
            </div>
        `;
    }
}

window.customElements.define('obap-data-table-percentage-visualizer', ObapDataTablePercentageVisualizer);
