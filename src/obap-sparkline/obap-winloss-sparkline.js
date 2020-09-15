/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, svg, ObapElement } from '../obap-element/obap-element.js';
import { ObapSparklineController} from './obap-sparkline-controller.js';

/**
 * A very small winloss chart, drawn without adornments or other chart-specific elements.
 */
export class ObapWinlossSparkline extends ObapSparklineController(ObapElement) {
    static get styles() {
        return [css`
            :host {
                --obap-winloss-sparkline-background-color: transparent;
                --obap-winloss-sparkline-positive-color: var(--obap-primary-color, #5c6bc0);
                --obap-winloss-sparkline-negative-color: var(--obap-accent-color, #ec407a);

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
                fill: var(--obap-winloss-sparkline-positive-color);
            }

            rect[negative] {
                fill: var(--obap-winloss-sparkline-negative-color);
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

    render() {
        const count = this.values.length;
        if (count === 0) return null;

        const vw = this.clientWidth ? this.clientWidth : 300;
        const vh = this.clientHeight ? this.clientHeight : 60;

        const min = Math.min(...this.values);
        const max = Math.max(...this.values);
        const w = ((vw + this.barSpacing) / count) - this.barSpacing;
        const origin = vh / 2.0;
        const xOffset = w + this.barSpacing;

        return html`
            <div class="container">
                ${svg`<svg viewBox="0 0 ${vw} ${vh}" preserveAspectRatio="none">
                    <g>
                        ${this.values.map((value, index) => {
                            const negative = (value < this.threshold);
                            const x = index * xOffset;
                            const h = this.stretch ? origin : w;
                            const y = negative ? origin : this.stretch ? 0 : origin - h;

                            return svg`<rect ?negative="${negative}" x="${x}" y="${y}" width="${w}" height="${h}"></rect>`}
                        )}
                    </g>
                </svg>`}
            </div>
        `;
    }
}

window.customElements.define('obap-winloss-sparkline', ObapWinlossSparkline);
