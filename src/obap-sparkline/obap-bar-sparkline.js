/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, svg, ObapElement } from '../obap-element/obap-element.js';

/**
 * A very small bar chart, drawn without adornments or other chart-specific elements.
 */
export class ObapBarSparkline extends ObapElement {
    static get styles() {
        return [css`
            :host {
                --obap-bar-sparkline-background-color: transparent;
                --obap-bar-sparkline-positive-color: var(--obap-primary-color, #5c6bc0);
                --obap-bar-sparkline-negative-color: var(--obap-accent-color, #ec407a);

                display: block;
                width: 300px;
                height: 60px;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            svg {
                width: 100%;
                height: 100%;
            }

            rect {
                fill: var(--obap-bar-sparkline-positive-color);
            }

            rect[negative] {
                fill: var(--obap-bar-sparkline-negative-color);
            }

            .container {
                padding: 0;
                margin: 0;
                width: 100%;
                height: 100%;
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

    render() {
        const count = this.values.length;
        if (count === 0) return null;

        const vw = 300;
        const vh = 60;

        const min = Math.min(...this.values);
        const max = Math.max(...this.values);
        const w = ((vw + this.barSpacing) / count) - this.barSpacing;
        const yScale = (min < 0) ? vh / (max - min) : vh / max;
        const origin = vh - (yScale * Math.abs(min));
        const xOffset = w + this.barSpacing;

        return html`
            <div class="container">
                ${svg`<svg viewBox="0 0 ${vw} ${vh}" preserveAspectRatio="none">
                    <g>
                        ${this.values.map((value, index) => {
                            const negative = (value < 0);
                            const h = (yScale * Math.abs(value));
                            const x = index * xOffset;
                            const y = negative ? origin : origin - h;

                            return svg`<rect ?negative="${negative}" x="${x}" y="${y}" width="${w}" height="${h}"></rect>`}
                        )}
                    </g>
                </svg>`}
            </div>
        `;
    }
}

window.customElements.define('obap-bar-sparkline', ObapBarSparkline);
