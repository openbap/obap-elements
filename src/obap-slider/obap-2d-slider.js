/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';

/**
 * Allows users to make selections from a range of values on the horizontal and vertical axis.
 */
export class Obap2dSlider extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                background-color: cornflowerblue;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                position: relative;
                width: 100%;
                height: 100%;
            }

            #thumb {
                position: absolute;
                left: 0;
                top: 0;
                width: 14px;
                height: 14px;
                box-sizing: border-box;
                border: 2px solid white;
                transform-origin: center;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 1px 5px 0 rgba(0, 0, 0, 0.12),
                0 3px 1px -2px rgba(0, 0, 0, 0.2);
            }
        `];
    }

    static get properties() {
        return {
            xValue: {
                type: Number,
                attribute: 'x-value'
            },

            minXValue: {
                type: Number,
                attribute: 'min-x-value'
            },

            maxXValue: {
                type: Number,
                attribute: 'max-x-value'
            },

            yValue: {
                type: Number,
                attribute: 'y-value'
            },

            minYValue: {
                type: Number,
                attribute: 'min-y-value'
            },

            maxYValue: {
                type: Number,
                attribute: 'max-x-value'
            }
        }
    }

    get xValue() {
        return this._xValue;
    }

    set xValue(value) {
        if (isNaN(value)) return;

        const oldValue = this._xValue;

        if (oldValue !== value) {
            this._xValue = value;
            //requestAnimationFrame(() => this.requestUpdate('xValue', oldValue));
            this.requestUpdate('xValue', oldValue);
        }
    }
   
    get yValue() {
        return this._yValue;
    }

    set yValue(value) {
        if (isNaN(value)) return;
        
        const oldValue = this._yValue;

        if (oldValue !== value) {
            this._yValue = value;
            this.requestUpdate('yValue', oldValue);
            //requestAnimationFrame(() => this.requestUpdate('yValue', oldValue));
        }
    }

    constructor() {
        super();

        this.xValue = 0;
        this.minXValue = 0;
        this.maxXValue = 100;
        this.yValue = 0;
        this.minYValue = 0;
        this.maxYValue = 100;
        this._dragging = false;

        this._boundHandleMouseDownEvent = this._handleMouseDownEvent.bind(this);
        this._boundHandleMouseMoveEvent = this._handleMouseMoveEvent.bind(this);
        this._boundHandleMouseUpEvent = this._handleMouseUpEvent.bind(this);

        this._resizeObserver = new ResizeObserver(entries => {
            this._positionThumb(this.xValue, this.yValue);
        });
    }

    connectedCallback() {
        super.connectedCallback();

        this.addEventListener('mousedown', this._boundHandleMouseDownEvent);
        this.addEventListener('mouseup', this._boundHandleMouseUpEvent);
        this.addEventListener('mouseleave', this._boundHandleMouseUpEvent);
        this.addEventListener('touchstart', this._boundHandleMouseDownEvent);
        this.addEventListener('touchend', this._boundHandleMouseUpEvent);
        this._resizeObserver.observe(this);
    }

    disconnectedCallback() {
        this._resizeObserver.unobserve(this);
        this.removerEventListener('mousedown', this._boundHandleMouseDownEvent);
        this.removerEventListener('mouseup', this._boundHandleMouseUpEvent);
        this.removerEventListener('mouseleave', this._boundHandleMouseUpEvent);
        this.removerEventListener('touchstart', this._boundHandleMouseDownEvent);
        this.removerEventListener('touchend', this._boundHandleMouseUpEvent);

        super.disconnectedCallback();
    }

    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this._thumb = this.renderRoot.getElementById('thumb');
        this._container = this._thumb.parentNode;
        //this._positionThumb(this.xValue, this.yValue);
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            if ((propName === 'xValue') || (propName === 'yValue')) {
                this._positionThumb(this.xValue, this.yValue);

                this.fireMessage('obap-2d-slider-change', {
                    x: this.xValue,
                    y: this.yValue
                });
            }
        });
    }

    render() {
        return html`
            <div class="container">
                <div id="thumb"></div>
            </div>
        `;
    }

    _positionThumb(x, y) {
        const rect = this._container.getBoundingClientRect();

        if ((rect.width === 0) || (rect.height === 0)) return;

        const dx = (x / (this.maxXValue - this.minXValue)) * rect.width;
        const dy = (y / (this.maxYValue - this.minYValue)) * rect.height;
        this._thumb.style.transform = `translate(${dx - 7}px, ${dy - 7}px`;
    }

    _handleMouseDownEvent(e) {
        if (!this._dragging) {
            this._thumb = this.renderRoot.getElementById('thumb');
            this._dragging = true;
            this.addEventListener('mousemove', this._boundHandleMouseMoveEvent);
            this.addEventListener('touchmove', this._boundHandleMouseMoveEvent);
        }
    }

    _handleMouseMoveEvent(e) {
        if (this._dragging) {
            const newValue = (e.type === 'touchend') ? this._mouseToValue(e.changedTouches[0].clientX, e.changedTouches[0].clientY) : this._mouseToValue(e.clientX, e.clientY);
            this.xValue = newValue.x;
            this.yValue = newValue.y;
        }
    }

    _handleMouseUpEvent(e) {
        if (this._dragging) {
            const newValue = (e.type === 'touchend') ? this._mouseToValue(e.changedTouches[0].clientX, e.changedTouches[0].clientY) : this._mouseToValue(e.clientX, e.clientY);
            this.xValue = newValue.x;
            this.yValue = newValue.y;
            this._dragging = false;
        }

        this.removeEventListener('mousemove', this._boundHandleMouseMoveEvent);
        this.removeEventListener('touchmove', this._boundHandleMouseMoveEvent);
    }

    _mouseToValue(mouseX, mouseY) {
        const rect = this._container.getBoundingClientRect();

        const displayXRange = rect.width;
        const actualXRange = this.maxXValue - this.minXValue;
        const rangeXRatio = actualXRange / displayXRange;
        const elementX = mouseX - rect.x;

        const displayYRange = rect.height;
        const actualYRange = this.maxYValue - this.minYValue;
        const rangeYRatio = actualYRange / displayYRange;
        const elementY = mouseY - rect.y;

        return {
            x: this._clampX(rangeXRatio * elementX),
            y: this._clampY(rangeYRatio * elementY)
        }
    }

    _clampX(value) {
        return Math.max(Math.min(value, Math.max(this.minXValue, this.maxXValue)), Math.min(this.minXValue, this.maxXValue));
    }

    _clampY(value) {
        return Math.max(Math.min(value, Math.max(this.minYValue, this.maxYValue)), Math.min(this.minYValue, this.maxYValue));
    }
}

window.customElements.define('obap-2d-slider', Obap2dSlider);
