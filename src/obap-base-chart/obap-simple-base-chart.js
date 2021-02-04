/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, svg, ObapElement } from '../obap-element/obap-element.js';
import { title } from '../obap-styles/obap-typography.js';

/**
 * This base class just sets everything up for a resizable svg chart and exposes the height and width of the element. It should be used for charts with specialized dataset requirements.
 */

const baseChartStyle =  [title, css`
    :host {
        --obap-chart-caption-color: var(--obap-text-primary-color, rgba(0, 0, 0, 0.87));
        display: block;
        /*outline: 1px dashed cornflowerblue;*/
    }

    :host([hidden]) {
        display: none !important;
    }

    :host([disabled]) {
        pointer-events: none;
    }

    .container {
        width: 100%;
        height: 100%;
    }

    .svg-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .svg-caption {
        fill: var(--obap-chart-caption-color);
    }
`];

class ObapSimpleBaseChart extends ObapElement {
    static get properties() {
        return {
            width: {
                type: Number
            },

            height: {
                type: Number
            }
        }
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    constructor() {
        super();

        this._width = 0;
        this._height = 0;

        this._boundHandleResizeEvent = this._handleResizeEvent.bind(this);

        this._resizeObserver = new ResizeObserver(entries => {
            this._boundHandleResizeEvent();
        });
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('resize', this._boundHandleResizeEvent);
        this._resizeObserver.observe(this);
    }

    disconnectedCallback() {
        this._resizeObserver.unobserve(this);
        window.removeEventListener('resize', this._boundHandleResizeEvent);
        super.disconnectedCallback();
    }

    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.fit();
    }
    
    render() {
        return html`
            <div class="container">
                <svg class="svg-container" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">${this._renderChart()}</svg>
            </div>
        `;
    }

    fit() {
        this._boundHandleResizeEvent();
    }

    _renderChart() {
        if (this.renderChart && (this.width > 0) && (this.height > 0)) {
            return this.renderChart();
        }

        return null;
    }

    _handleResizeEvent(e) {
        const rect = this.getBoundingClientRect();
        this._width = rect.width;
        this._height = rect.height;
        this.requestUpdate();
    }
}

export { html, css, svg, ObapSimpleBaseChart, baseChartStyle }

