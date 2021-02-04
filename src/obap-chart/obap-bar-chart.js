/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import {  html, css, svg, ObapBaseChart, baseChartStyle } from '../obap-base-chart/obap-base-chart.js';

/**
 * A bar chart element.
 */
export class ObapBarChart extends ObapBaseChart {
    
    static get styles() {
        return [baseChartStyle, css`

        `];
    }
    
    static get properties() {
        return {

        }
    }

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            //
        });
    }

    renderChart(w, h) {
        return svg`
            <text x="${w / 2}" y="${h / 2}" fill="blue" dominant-baseline="middle" text-anchor="middle">CHART DETAIL</text>
        `;
    }
}

window.customElements.define('obap-bar-chart', ObapBarChart);
