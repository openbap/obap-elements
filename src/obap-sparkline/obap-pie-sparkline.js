/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { css, svg, ObapSimpleBaseChart, baseChartStyle } from '../obap-base-chart/obap-simple-base-chart.js';

/**
 * A very small pie chart, drawn without adornments or other chart-specific elements.
 */
export class ObapPieSparkline extends ObapSimpleBaseChart {
    static get styles() {
        return [baseChartStyle, css`
            :host {
                --obap-pie-sparkline-separator-color: white;
                --obap-pie-section-color: var(--obap-primary-color, #5c6bc0);
                --obap-pie-sparkline-separator-width: 2;

                width: 60px;
                height: 60px;
            }

            .svg-container {
                transform: rotate(-90deg);
            }

            .outline {
                fill: transparent;
                stroke: var(--obap-pie-sparkline-separator-color);
                stroke-width: var(--obap-pie-sparkline-separator-width);
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

            colors: {
                type: Array,
                attribute: 'colors'
            },

            donutRadius: {
                type: Number,
                attribute: 'donut-radius'
            },

            hideSeparators: {
                type: Boolean,
                attribute: 'hide-separators'
            }
        }
    }

    constructor() {
        super();
        this.values = [];
        this.donutRadius = 0;
        this.colors = [];
        this.hideSeparators = false;
    }

    renderChart() {
        if (this.colors.length === 0) {
            const cs = getComputedStyle(this);
            //this.colors.push(this.getCssVariableValue(cs, '--obap-pie-section-color', 'var(--obap-primary-color, #5c6bc0)'));
            this.colors.push('var(--obap-pie-section-color)');
        }

        this._colorCount = this.colors.length;
        const polygons = this._getPaths();

        return polygons ? svg`
                <defs>
                    <mask id="mask">
                        <rect width="100%" height="100%" fill="white"/>
                        <circle cx="${this.width / 2}" cy="${this.width / 2}" r="${this.donutRadius}" fill="black" opacity="1"></circle>
                    </mask>
                </defs>
                <g mask="url(#mask)">
                    ${polygons.map((polygon, index) => svg`
                        <path class="wedge" d="${polygon.wedge}" fill="${this._getNextColor(index)}"></path>
                        ${this.hideSeparators ? null : svg`<path class="outline" d="${polygon.outline}"></path>`}
                    `)}
                </g>
        ` : null;
    }

    _getPaths() {
        const rawItems = this.values.filter((val) => val > 0);
        this._itemCount = rawItems.length;
        if (this._itemCount === 0) return null;

        const cx = (this.width / 2);
        const cy = cx;
        const r = cx;
        const pi2 = 2 * Math.PI;

        const sum = rawItems.reduce((a, b) => a + b, 0);
        const items = rawItems.map((val) => val / sum);

        let lastVal = 0;
        let lastCoord = this._getCoordinates(r, pi2 * lastVal);

        const coords = items.map((val) => {
            lastVal += val;
            const coord = { start: lastCoord, end: this._getCoordinates(r, pi2 * lastVal) };
            lastCoord = coord.end;
            return coord;
        });

        const polygons = coords.map((c) => {
            return {
                wedge: `M ${c.start.x} ${c.start.y} L ${cx} ${cy} L ${c.end.x} ${c.end.y} A ${r} ${r} 0 0 0 ${c.start.x} ${c.start.y}`,
                outline: `M ${c.start.x} ${c.start.y} L ${cx} ${cy} L ${c.end.x} ${c.end.y}`
            };
        });

        return polygons;
    }

    _getCoordinates(r, value) {
        return { x: (r * Math.cos(value)) + r, y: (r * Math.sin(value)) + r}
    }
    
    _getNextColor(index) {
        if (this._colorCount === 1) {
            return this.colors[0];
        }

        const colorIndex = index % this._colorCount;

        if ((index === this._itemCount - 1) && (colorIndex === 0) && (this._colorCount > 2)) {
            return this.colors[1];
        }

        return this.colors[colorIndex];
    }
}

window.customElements.define('obap-pie-sparkline', ObapPieSparkline);