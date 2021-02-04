/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { css, svg, ObapSimpleBaseChart, baseChartStyle } from '../obap-base-chart/obap-simple-base-chart.js';
/**
 * A very small winloss chart, drawn without adornments or other chart-specific elements.
 */
export class ObapWinlossSparkline extends ObapSimpleBaseChart {
    static get styles() {
        return [baseChartStyle, css`
            :host {
                --obap-winloss-sparkline-background-color: transparent;
                --obap-winloss-sparkline-positive-color: var(--obap-primary-color, #5c6bc0);
                --obap-winloss-sparkline-negative-color: var(--obap-accent-color, #ec407a);

                width: 300px;
                height: 60px;
            }

            rect {
                fill: var(--obap-winloss-sparkline-positive-color);
            }

            rect[negative] {
                fill: var(--obap-winloss-sparkline-negative-color);
            }
        `];
    }

    static get properties() {
        return {
            values: {
                type: Array,
                attribute: 'values',
                reflect: true
            },

            barSpacing: {
                type: Number,
                attribute: 'bar-spacing'
            },

            threshold: {
                type: Number,
                attribute: 'threshold'
            },

            stretch: {
                type: Boolean,
                attribute: 'stretch'
            }
        }
    }

    constructor() {
        super();
        this.values = [];
        this.barSpacing = 2;
        this.threshold = 0;
        this.stretch = false;
    }

    renderChart() {
        const count = this.values.length;
        if (count === 0) return null;

        const vw = this.width;
        const vh = this.height;

        const min = Math.min(...this.values);
        const max = Math.max(...this.values);
        const w = ((vw + this.barSpacing) / count) - this.barSpacing;
        const origin = vh / 2.0;
        const xOffset = w + this.barSpacing;

        return svg`
            <g>
                ${this.values.map((value, index) => {
                    const negative = (value < this.threshold);
                    const x = index * xOffset;
                    const h = this.stretch ? origin : w;
                    const y = negative ? origin : this.stretch ? 0 : origin - h;

                    return svg`<rect ?negative="${negative}" x="${x}" y="${y}" width="${w}" height="${h}"></rect>`}
                )}
            </g>
        `;
    }
}

window.customElements.define('obap-winloss-sparkline', ObapWinlossSparkline);
