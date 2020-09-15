/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, svg, ObapElement } from '../obap-element/obap-element.js';
import { ObapSparklineController} from './obap-sparkline-controller.js';

/**
 * A very small bullet chart, drawn without adornments or other chart-specific elements.
 */
export class ObapBulletSparkline extends ObapSparklineController(ObapElement) {
    static get styles() {
        return [css`
            :host {
                --obap-bullet-sparkline-value-color: #212121;
                --obap-bullet-sparkline-target-value-color: #212121;
                --obap-bullet-sparkline-range-color: #9E9E9E;

                display: block;
                width: 300px;
                height: 30px;
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

            .container {
                padding: 0;
                margin: 0;
                width: 100%;
                height: 100%;
            }

            .value {
                fill: var(--obap-bullet-sparkline-value-color);
            }

            .target-value {
                fill: var(--obap-bullet-sparkline-target-value-color);
            }

            .range {
                fill: var(--obap-bullet-sparkline-range-color);
            }
        `];
    }

    static get properties() {
        return {
            value: {
                type: Number,
                attribute: 'value'
            },

            targetValue: {
                type: Number,
                attribute: 'target-value'
            },

            maxValue: {
                type: Number,
                attribute: 'max-value'
            },

            percentageRanges: {
                type: Array,
                attribute: 'percentage-ranges'
            }
        }
    }

    constructor() {
        super();
        this.value = 0;
        this.targetValue = 0;
        this.maxValue = 100;
        this.percentageRanges = [100];
    }

    render() {
        const vw = this.clientWidth ? this.clientWidth : 300;
        const vh = this.clientHeight ? this.clientHeight : 30;

        const targetRectWidth = 4;
        const ranges = this._getRangeValues(vw);

        return html`
            <div class="container">
                ${svg`<svg viewBox="0 0 ${vw} ${vh}" preserveAspectRatio="none">
                    <g>
                        ${ranges.map((r) => svg`<rect class="range" x="${r.x}" y="0" width="${r.width}" height="${vh}" opacity="${r.opacity}"></rect>`)}
                        <rect class="value" x="0" y="${vh * 0.4}" width="${(this.value / this.maxValue * vw)}" height="${vh * 0.2}"></rect>
                        <rect class="target-value" x="${(this.targetValue / this.maxValue * vw) - (targetRectWidth / 2)}" y="${vh * 0.2}" width="${targetRectWidth}" height="${vh * 0.6}"></rect> 
                    </g>
                </svg>`}
            </div>
        `;
    }

    _getRangeValues(vw) {
        const sortedRanges = this.percentageRanges.sort((a, b) => a - b);
        const count = sortedRanges.length;
        const f = vw / 100.0;
        const ranges = [];

        for (let i = 0; i < sortedRanges.length; i++) {
            if (i === 0) {
                ranges.push({ x: 0, width: sortedRanges[i] * f, opacity: 1.0});
            } else {
                ranges.push({ x: sortedRanges[i - 1] * f, width: (sortedRanges[i] - sortedRanges[i - 1]) * f, opacity: 1 - (i / count)});
            }
        }

        return ranges;
    }
}

window.customElements.define('obap-bullet-sparkline', ObapBulletSparkline);