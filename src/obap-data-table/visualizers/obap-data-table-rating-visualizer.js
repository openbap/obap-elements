/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../obap-element/obap-element.js';
import { ObapDataTableVisualizerController } from './obap-data-table-visualizer-controller.js';
import '../../obap-rating/obap-rating.js';

export class ObapDataTableRatingVisualizer extends ObapDataTableVisualizerController(ObapElement) {
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
                height: 100%;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        `];
    }

    render() {
        const count = this.getParamValue('count', 5);
        const allowHalf = this.getParamValue('allowHalf', false);
        const heart = this.getParamValue('heart', false);
        const style = this.getBaseStyle();

        return html`
            <div class="container">
                <obap-rating style="${style}" rating="${this.value}" count="${count}" ?allow-half="${allowHalf}" ?heart="${heart}" read-only></obap-rating>
            </div>
        `;
    }
}

window.customElements.define('obap-data-table-rating-visualizer', ObapDataTableRatingVisualizer);
