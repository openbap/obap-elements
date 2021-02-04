/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { css, svg, ObapSimpleBaseChart, baseChartStyle } from '../obap-base-chart/obap-simple-base-chart.js';

/**
 * A very small line chart, drawn without adornments or other chart-specific elements.
 */
export class ObapLineSparkline extends ObapSimpleBaseChart {
    static get styles() {
        return [baseChartStyle, css`
            :host {
                --obap-line-sparkline-background-color: transparent;
                --obap-line-sparkline-line-color: var(--obap-primary-color, #5c6bc0);
                --obap-line-sparkline-area-color: var(--obap-block-color, #ECECEC);
                --obap-line-sparkline-marker-positive-color: var(--obap-primary-color, #5c6bc0);
                --obap-line-sparkline-marker-negative-color: var(--obap-accent-color, #ec407a);
                --obap-line-sparkline-marker-positive-border-color: white;
                --obap-line-sparkline-marker-negative-border-color: white;
                --obap-line-sparkline-marker-border-width: 0;

                width: 300px;
                height: 60px;
                background: var(--obap-line-sparkline-background-color);
            }

            circle {
                fill: var(--obap-line-sparkline-marker-positive-color);
                stroke: var(--obap-line-sparkline-marker-positive-border-color);
                stroke-width: var(--obap-line-sparkline-marker-border-width);
            }

            circle[negative] {
                fill: var(--obap-line-sparkline-marker-negative-color);
                stroke: var(--obap-line-sparkline-marker-negative-border-color);
            }

            polyline {
                stroke: var(--obap-line-sparkline-line-color);
                fill: none;
            }

            polygon {
                stroke: none;
                fill: var(--obap-line-sparkline-area-color);
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

            showLine: {
                type: Boolean,
                attribute: 'show-line'
            },

            showMarkers: {
                type: Boolean,
                attribute: 'show-markers'
            },

            showArea: {
                type: Boolean,
                attribute: 'show-area'
            },

            markerSize: {
                type: Number,
                attribute: 'marker-size'
            }
        }
    }

    constructor() {
        super();
        this.values = [];
        this.markerSize = 4;
    }

    renderChart() {
        const count = this.values.length;
        if (count === 0) return null;

        const vw = this.width;
        const vh = this.height;
        const r = this.markerSize / 2;

        const min = Math.min(...this.values);
        const max = Math.max(...this.values);
        const w = (vw / (count - 1));
        const yScale = (min < 0) ? vh / (max - min) : vh / max;
        const origin = vh - (yScale * Math.abs(min));

        let pStart = null;
        let pEnd = null;

        const points = this.showLine || this.showArea ? this.values.map((value, index) => {
            const negative = (value < 0);
            const h = (yScale * Math.abs(value));
            const x = (index * w);
            const y = negative ? origin + h - r : origin - h + r;

            if (index === 0) {
                pStart = `${x} ${vh},`;
            }

            if (index === count - 1) {
                pEnd = `,${x} ${vh}`;
            }

            return `${x} ${y}`;
        }).join(',') : null;

        return svg`
            <g>
                ${this.showArea ? svg`<polygon points="${pStart + points + pEnd}"></polygon>` : null}
                ${this.showLine ? svg`<polyline points="${points}"></polyline>` : null}

                ${this.showMarkers ?
                    this.values.map((value, index) => {
                        const negative = (value < 0);
                        const h = (yScale * Math.abs(value));
                        const x = (index * w);
                        const y = negative ? origin + h - r : origin - h + r;

                        return svg`<circle ?negative="${negative}" cx="${x}" cy="${y}" r="${r}"></circle>`}
                    ) : null
                }
            </g>
        `;
    }
}

window.customElements.define('obap-line-sparkline', ObapLineSparkline);
