/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { css, svg, ObapSimpleBaseChart, baseChartStyle } from '../obap-base-chart/obap-simple-base-chart.js';
/**
 * A very small bar chart, drawn without adornments or other chart-specific elements.
 */
export class ObapBarSparkline extends ObapSimpleBaseChart {
    static get styles() {
        return [baseChartStyle, css`
            :host {
                --obap-bar-sparkline-background-color: transparent;
                --obap-bar-sparkline-positive-color: var(--obap-primary-color, #5c6bc0);
                --obap-bar-sparkline-negative-color: var(--obap-accent-color, #ec407a);

                width: 300px;
                height: 60px;
            }

            rect {
                fill: var(--obap-bar-sparkline-positive-color);
            }

            rect[negative] {
                fill: var(--obap-bar-sparkline-negative-color);
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
            }
        }
    }

    constructor() {
        super();
        this.values = [];
        this.barSpacing = 2;
    }

    renderChart() {
        const count = this.values.length;
        if (count === 0) return null;

        const vw = this.width;
        const vh = this.height;

        const min = Math.min(...this.values);
        const max = Math.max(...this.values);
        const w = ((vw + this.barSpacing) / count) - this.barSpacing;
        const yScale = (min < 0) ? vh / (max - min) : vh / max;
        const origin = vh - (yScale * Math.abs(min));
        const xOffset = w + this.barSpacing;

        return svg`
            <g>
                ${this.values.map((value, index) => {
                    const negative = (value < 0);
                    const h = (yScale * Math.abs(value));
                    const x = index * xOffset;
                    let y = negative ? origin : origin - h;

                    return svg`<rect ?negative="${negative}" x="${x}" y="${y}" width="${w}" height="${h}"></rect>`}
                )}
            </g>
        `;
    }
}

window.customElements.define('obap-bar-sparkline', ObapBarSparkline);
