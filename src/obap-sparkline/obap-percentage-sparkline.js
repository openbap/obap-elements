/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, svg, ObapElement } from '../obap-element/obap-element.js';
import { ObapSparklineController} from './obap-sparkline-controller.js';

/**
 * A very small percentage chart, drawn without adornments or other chart-specific elements.
 */
export class ObapPercentageSparkline extends ObapSparklineController(ObapElement) {
    static get styles() {
        return [css`
            :host {
                --obap-percentage-sparkline-selected-color: var(--obap-primary-color, #5c6bc0);
                --obap-percentage-sparkline-unselected-color: var(--obap-on-primary-color, #FFFFFF);

                display: block;
                width: 200px;
                height: 20px;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                position: relative;
                padding: 0;
                margin: 0;
                width: 100%;
                height: 100%;
                background: var(--obap-percentage-sparkline-unselected-color);
            }

            .bar {
                position: relative;
                height: 100%;
                background: var(--obap-percentage-sparkline-selected-color);
            }

            .label {
                position: absolute;
                left: 0;
                top: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                font-weight: 500;
            }
        `];
    }

    static get properties() {
        return {
            value: {
                type: Number,
                attribute: 'value'
            }
        }
    }

    constructor() {
        super();
        this.value = 0;
    }

    render() {
        const val = `${Math.min(Math.max(this.value, 0), 100)}%`
        const barStyle = `width: ${val};`;
        
        const labelStyle = `
            background: linear-gradient(90deg, var(--obap-percentage-sparkline-unselected-color) 0%, var(--obap-percentage-sparkline-unselected-color) ${val}, var(--obap-percentage-sparkline-selected-color) ${val}, var(--obap-percentage-sparkline-selected-color) 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        `;

        return html`
            <div class="container">
                <div class="bar" style="${barStyle}"></div>
                <div class="label" style="${labelStyle}">${val}</div>
            </div>
        `;
    }
}

window.customElements.define('obap-percentage-sparkline', ObapPercentageSparkline);