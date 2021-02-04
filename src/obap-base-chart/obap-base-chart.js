/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, svg, ObapSimpleBaseChart, baseChartStyle } from './obap-simple-base-chart.js';


class ObapBaseChart extends ObapSimpleBaseChart {
    static get properties() {
        return {
            caption: {
                type: String
            },

            labels: {
                type: Array
            },

            datasets: {
                type: Array
            },

            // top (default), bottom
            captionPosition: {
                type: String,
                attribute: 'caption-position'
            },

            // none (default), left, right, top, bottom
            legendPosition: {
                type: String,
                attribute: 'legend-position'
            },

            margin: {
                type: Number
            }
        }
    }

    constructor() {
        super();

        this.caption = '';
        this.labels = [];
        this.datasets = [];
        this.legendPosition = 'none';
        this.captionPosition = 'top';
        this.margin = 0;
    }

    connectedCallback() {
        super.connectedCallback();

    }

    disconnectedCallback() {

        super.disconnectedCallback();
    }

    renderCaption(rect) {
        if (rect) {
            const baseline = (this.captionPosition === 'bottom') ? 'hanging' : 'hanging';

            return svg`
                <g>
                    <rect x="${rect.x}" y="${rect.y}" width="${rect.w}" height="${rect.h}" stroke="green" fill="none"></rect>
                    <text class="svg-caption typography-title" x="${rect.w / 2}" y="${rect.y + (rect.h / 2)}" text-anchor="middle" dominant-baseline="middle">${this.caption}</text>
                </g>
            `;
        }
        
        return null;
    }

    renderLegend(rect) {
        if (rect) {
            return svg`
                <g>
                    <rect x="${rect.x}" y="${rect.y}" width="${rect.w}" height="${rect.h}" stroke="magenta" fill="none"></rect>
                </g>
            `;
        }

        return false;
    }

    _calculateCaptionRect() {
        if (this.caption) {
            const y = (this.captionPosition === 'bottom') ? this.height - this.margin - 32 : this.margin;
            return {x: this.margin, y: y, w: this.width - (2 * this. margin), h: 32};
        }
        
        return {x: 0, y: 0, w: 0, h: 0};
    }

    _calculateLegendRect(captionRect) {
        let showLegend = true;
        let x = 0;
        let y = 0;
        let w = 0;
        let h = 0;

        switch (this.legendPosition) {
            case 'left': {
                const offset = ((this.captionPosition === 'top') || (this.captionPosition === 'bottom')) ? captionRect.h + this.margin : this.margin;
                h = this.height - offset - (this.margin);
                w = 128;
                y = (this.captionPosition === 'top') ? offset : this.margin;
                x = this.margin;
                break;
            }

            case 'right': {
                const offset = ((this.captionPosition === 'top') || (this.captionPosition === 'bottom')) ? captionRect.h + this.margin : this.margin;
                h = this.height - offset - (this.margin);
                w = 128;
                x = this.width - w - this.margin;
                y = (this.captionPosition === 'top') ? offset : this.margin;
                break;
            }

            case 'top': {
                const offset = (this.captionPosition === 'top') ? captionRect.h : 0;
                x = this.margin;
                y = this.margin + offset;
                w = this.width - (2 * this.margin);
                h = 48;
                break;
            }

            case 'bottom': {
                const offset = (this.captionPosition === 'bottom') ? captionRect.h : 0;
                x = this.margin;
                h = 48;
                y = this.height - h - this.margin - offset;
                w = this.width - (2 * this.margin);
                
                break;
            }

            default: {
                showLegend = false;
            }
        }

        return {x: x, y: y, w: w, h: h};
    }

    _calculateChartRect(captionRect, legendRect) {
        let x = this.margin;
        let y = this.margin;
        let w = this.width - (2 * this.margin);
        let h = this.height - (2 * this.margin);

        switch (this.legendPosition) {
            case 'left': {
                x += legendRect.w;
                w -= legendRect.w;
                break;
            }

            case 'right': {
                w -= legendRect.w;
                break;
            }

            case 'top': {
                y += legendRect.h;
                h -= legendRect.h;
                break;
            }

            case 'bottom': {
                h -= legendRect.h;
                break;
            }
        }

        switch (this.captionPosition) {
            case 'top': {
                y += captionRect.h;
                h -= captionRect.h;
                break;
            }

            case 'bottom': {
                h -= captionRect.h;
                break;
            }
        }

        return {x: x, y: y, w: w, h: h};
    }

    _renderChart() {
        if (this.renderChart && (this.width > 0) && (this.height > 0)) {
            const captionRect = this._calculateCaptionRect();
            const legendRect = this._calculateLegendRect(captionRect);
            const chartRect = this._calculateChartRect(captionRect, legendRect)

            return [
                this.renderCaption(captionRect), 
                this.renderLegend(legendRect),
                svg`
                    <svg x="${chartRect.x}" y="${chartRect.y}">
                        <rect width="${chartRect.w}" height="${chartRect.h}" stroke="red" fill="none"></rect>
                        ${this.renderChart(chartRect.w, chartRect.h)}
                    </svg>
                ` 
            ];
        }

        return null;
    }
}

export { html, css, svg, ObapBaseChart, baseChartStyle }