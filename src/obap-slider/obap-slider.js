/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { caption } from '../obap-styles/obap-typography.js';
import '../obap-icon/obap-icon.js';

/**
 * Sliders allow users to make selections from a range of values.
 */
export class ObapSlider extends ObapElement {
    static get styles() {
        return [caption, css`
            :host {
                --obap-slider-color: var(--obap-on-surface-color, rgba(0, 0, 0, 0.87));
                --obap-slider-background-color: var(--obap-surface-color, #FFFFFF);
                --obap-slider-inactive-track-color: var(--obap-primary-light-color, #8e99f3);
                --obap-slider-active-track-color: var(--obap-primary-color, #5c6bc0);
                --obap-slider-thumb-color: var(--obap-primary-color, #5c6bc0);
                --obap-slider-icon-color: var(--obap-text-icon-color, rgba(0, 0, 0, 0.38));
                --obap-slider-icon-size: 16px;

                display: block;
                height: 40px;
                /*outline: 1px dotted lightgrey;*/
                user-select: false;
                color: var(--obap-slider-color);
                background: var(--obap-slider-background-color);
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                display: flex;
                flex-direction: row;
                align-items: center;
                height: 100%;
                width: 100%;
                padding: 0 1px;
                cursor: pointer;
                -webkit-touch-callout: none; 
                -webkit-user-select: none;
                -ms-user-select: none; 
                user-select: none; 
            }

            .inactive-track {
                position: relative;
                flex: 1;
                height: 2px;
                background: var(--obap-slider-inactive-track-color);
            }

            .active-track {
                position: absolute;
                height: 2px;
                background: var(--obap-slider-active-track-color);
                left: 0;
                top: 0;
            }

            .range-track {
                cursor: ew-resize;
            }

            .thumb {
                position: absolute;
                outline: 0;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: var(--obap-slider-thumb-color);
                left: 0;
                top: 50%;
                transform: translate(-50%, -50%);
                transition: all 0.05s linear;
            }

            .thumb[dragging], .thumb:focus {
                width: 20px;
                height: 20px;
            }

            .balloon {
                display: none;
                position: absolute;
                left: 6px;
                top: -6px;
                padding: 2px 8px;
                color: white;
                border-radius: 3px;
                background: var(--obap-slider-thumb-color);
                transform: translate(-50%, -100%);
                font-size: 11px;
            }

            .balloon:after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 50%;
                width: 0;
                height: 0;
                border: 4px solid transparent;
                border-top-color: var(--obap-slider-thumb-color);
                border-bottom: 0;
                margin-left: -4px;
                margin-bottom: -4px;
            }

            .thumb[dragging] > .balloon, .thumb:focus > .balloon {
                display: block;
                left: 10px;
            }

            .stop {
                position: absolute;
                width: 2px;
                height: 4px;
                top: -1px;
                transform: translate(-50%, 0);
                background: var(--obap-slider-active-track-color);
            }

            .stop[active] {
                background: var(--obap-slider-inactive-track-color);
            }

            .stop-label {
                position: absolute;
                top: 8px;
                transform: translate(-50%, 0);
            }

            .end {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: 0 8px;
            }

            obap-icon {
                --obap-icon-fill-color: var(--obap-slider-icon-color);
                width: var(--obap-slider-icon-size);
                height: var(--obap-slider-icon-size);
            }
        `];
    }

    static get properties() {
        return {
            value: {
                type: Number,
                attribute: 'value'
            },

            startValue: {
                type: Number,
                attribute: 'start-value'
            },

            endValue: {
                type: Number,
                attribute: 'end-value'
            },

            minValue: {
                type: Number,
                attribute: 'min-value'
            },

            maxValue: {
                type: Number,
                attribute: 'max-value'
            },

            stops: {
                type: Array
            },

            startIcon: {
                type: String,
                attribute: 'start-icon'
            },

            endIcon: {
                type: String,
                attribute: 'end-icon'
            },

            valueIcon: {
                type: String,
                attribute: 'value-icon'
            },

            showStartLabel: {
                type: Boolean,
                attribute: 'show-start-label'
            },

            showEndLabel: {
                type: Boolean,
                attribute: 'show-end-label'
            },

            showStartIcon: {
                type: Boolean,
                attribute: 'show-start-icon'
            },

            showEndIcon: {
                type: Boolean,
                attribute: 'show-end-icon'
            },

            showFloatingLabel: {
                type: Boolean,
                attribute: 'show-floating-label'
            },

            showStopLabels: {
                type: Boolean,
                attribute: 'show-stop-labels'
            },

            range: {
                type: Boolean,
                attribute: 'range'
            },

            discrete: {
                type: Boolean,
                attribute: 'discrete'
            }
        }
    }

    constructor() {
        super();
        //this.tabIndex = 0;
        this.value = 0;
        this.startValue = 0;
        this.endValue = 0;
        this.minValue = 0;
        this.maxValue = 100;
        this.stops = [];
        this.startIcon = '';
        this.endIcon = '';
        this.valueIcon = '';
        this.showStartLabel = false;
        this.showEndLabel = false;
        this.showStartIcon = false;
        this.showEndIcon = false;
        this.showFloatingLabel = false;
        this.showStopLabels = false;
        this.range = false;
        this.discrete = false;

        this._boundHandleMouseDownEvent = this._handleMouseDownEvent.bind(this);
        this._boundHandleMouseMoveEvent = this._handleMouseMoveEvent.bind(this);
        this._boundHandleMouseUpEvent = this._handleMouseUpEvent.bind(this);
        this._boundHandleKeyDownEvent = this._handleKeyDownEvent.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('mousedown', this._boundHandleMouseDownEvent);
        this.addEventListener('mouseup', this._boundHandleMouseUpEvent);
        this.addEventListener('mouseleave', this._boundHandleMouseUpEvent);
        this.addEventListener('touchstart', this._boundHandleMouseDownEvent);
        this.addEventListener('touchend', this._boundHandleMouseUpEvent);
        this.addEventListener('keydown', this._boundHandleKeyDownEvent);
    }

    disconnectedCallback() {
        this.removeEventListener('mousedown', this._boundHandleMouseDownEvent);
        this.removeEventListener('mouseup', this._boundHandleMouseUpEvent);
        this.removeEventListener('mouseleave', this._boundHandleMouseUpEvent);
        this.removeEventListener('touchstart', this._boundHandleMouseDownEvent);
        this.removeEventListener('touchend', this._boundHandleMouseUpEvent);
        this.removeEventListener('keydown', this._boundHandleKeyDownEvent);
        super.disconnectedCallback();
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            if (propName === 'discrete' && this.discrete) {
                this._snapValues();
            }

            if ((propName === 'value') || (propName === 'startValue') || (propName === 'endValue')) {
                this.fireMessage('obap-slider-change', {
                    value: this.value,
                    startValue: this.startValue,
                    endValue: this.endValue
                });
            }
        });

        this._track = this.renderRoot.getElementById('inactive-track');
    }

    render() {
        return html`
            <div class="container">
                ${this._renderLabel(true, this.minValue, this.startIcon)}
                <div id="inactive-track" class="inactive-track">
                    ${this._renderActiveTrack()}
                    ${this._renderStops()}
                    ${this._renderThumb()}
                </div>
                ${this._renderLabel(false, this.maxValue, this.endIcon)}
            </div>
        `;
    }

    _renderStops() {
        if ((this.stops) && (this.stops.length > 0)) {
            const scale = 100.0 / (this.maxValue - this.minValue);

            if (this.range) {
                return this.stops.map((stop) => html`
                    <div class="stop" ?active="${(stop > this.startValue) && (stop < this.endValue)}" style="left: ${stop * scale}%;"></div>
                    ${this.showStopLabels ? html`<div class="stop-label typography-caption" style="left: ${stop * scale}%;">${stop}</div>` : null}
                `);
            } else {
                return this.stops.map((stop) => html`
                    <div class="stop" ?active="${stop < this.value}" style="left: ${stop * scale}%;"></div>
                    ${this.showStopLabels ? html`<div class="stop-label typography-caption" style="left: ${stop * scale}%;">${stop}</div>` : null}
                `);
            }
        }

        return null;
    }

    _renderActiveTrack() {
        const scale = 100.0 / (this.maxValue - this.minValue);

        if (this.range) {
            const x1 = this.startValue * scale;
            const x2 = this.endValue * scale;

            return html`
                <div class="active-track range-track" style="left: ${x1}%; width: ${x2 - x1}%;"></div>
            `;
        } else {
            return html`
                <div class="active-track" style="width: ${this.value * scale}%;"></div>
            `;
        }
    }

    _renderThumb() {
        const scale = 100.0 / (this.maxValue - this.minValue);

        if (this.range) {
            return html`
                <div id="thumb-start" thumb tabindex="0" class="thumb" style="left: ${this.startValue * scale}%;">
                    ${this.showFloatingLabel ? html`<div class="balloon">${this.startValue}</div>` : null}  
                </div>
                
                <div id="thumb-end" thumb tabindex="0" class="thumb" style="left: ${this.endValue * scale}%;">
                    ${this.showFloatingLabel ? html`<div class="balloon">${this.endValue}</div>` : null}
                </div>
            `;
        } else {
            return html`
                <div id="thumb" thumb tabindex="0" class="thumb" style="left: ${this.value * scale}%;">
                    ${this.showFloatingLabel ? html`<div class="balloon">${this.value}</div>` : null}
                </div>
            `;
        }
    }

    _renderLabel(start, label, icon) {
        const showIcon = start ? this.showStartIcon : this.showEndIcon;
        const showlabel = start ? this.showStartLabel : this.showEndLabel;

        if ((showlabel) || (showIcon && icon)) {
            return html`
                <div class="end typography-caption">
                    ${showIcon ? html`<obap-icon class="end-icon" icon="${icon}"></obap-icon>` : null}
                    ${showlabel ? html`<div class="end-label">${label}</div>` : null}
                </div>
            `;
        }

        return null;
    }

    _handleKeyDownEvent(e) {
        const key = e.key;

        if ((key === 'ArrowUp') || (key === 'ArrowRight') || (key === 'PageUp')) {
            this._step(1);
            e.preventDefault();
        } else if ((key === 'ArrowDown') || (key === 'ArrowLeft') || (key === 'PageDown')) {
            this._step(-1);
            e.preventDefault();
        } else if (key === 'Home') {
            this._gotoStart();
            e.preventDefault();
        } else if (key === 'End') {
            this._gotoEnd();
            e.preventDefault();
        } else if (key === 'Escape') {
            if (this.renderRoot.activeElement) {
                this.renderRoot.activeElement.blur();
                e.preventDefault();
            }
        }
    }

    _gotoStart() {
        const target = this.renderRoot.activeElement;
        const id = target.id;

        switch (id) {
            case 'thumb': {
                this.value = this.minValue;
                break;
            }

            case 'thumb-start': {
                this.startValue = this.minValue;
                break;
            }

            case 'thumb-end': {
                this.endValue = this.startValue;
                break;
            }
        }
    }

    _gotoEnd() {
        const target = this.renderRoot.activeElement;
        const id = target.id;

        switch (id) {
            case 'thumb': {
                this.value = this.maxValue;
                break;
            }

            case 'thumb-start': {
                this.startValue = this.endValue;
                break;
            }

            case 'thumb-end': {
                this.endValue = this.maxValue;
                break;
            }
        }
    }

    _step(amount) {
        const target = this.renderRoot.activeElement;
        const skip = (amount > 0) ? 'forward' : 'backward';
        const id = target.id;

        switch (id) {
            case 'thumb': {
                this.value = this._clampValue(this.value + amount, skip);
                break;
            }

            case 'thumb-start': {
                this.startValue = Math.min(this._clampValue(this.startValue + amount, skip), this.endValue);
                break;
            }

            case 'thumb-end': {
                this.endValue = Math.max(this._clampValue(this.endValue + amount, skip), this.startValue);
                break;
            }
        }
    }

    _handleMouseDownEvent(e) {
        const target = e.composedPath()[0];

        if (target.hasAttribute('thumb')) {
            this._dragTarget = target;
            this._dragTarget.setAttribute('dragging', '');
            this._dragging = true;
            this.addEventListener('mousemove', this._boundHandleMouseMoveEvent);
            this.addEventListener('touchmove', this._boundHandleMouseMoveEvent);
        } else {

            if (this.range) {
                const val = (e.type === 'touchstart') ? this._mouseToValue(e.changedTouches[0].clientX) : this._mouseToValue(e.clientX);

                if (val < this.startValue) {
                    this._dragTarget = this.renderRoot.getElementById('thumb-start');
                    this._dragTarget.setAttribute('dragging', '');
                    this._dragging = true;
                } else if (val > this.endValue) {
                    this._dragTarget = this.renderRoot.getElementById('thumb-end');
                    this._dragTarget.setAttribute('dragging', '');
                    this._dragging = true;
                } else {
                    // Drag range
                    this._dragTargetStart = this.renderRoot.getElementById('thumb-start');
                    this._dragTargetStart.setAttribute('dragging', '');

                    this._dragTargetEnd = this.renderRoot.getElementById('thumb-end');
                    this._dragTargetEnd.setAttribute('dragging', '');

                    this._rangeDragging = true;
                    this._rangeDragPreviousValue = val;
                    this.addEventListener('mousemove', this._boundHandleMouseMoveEvent);
                    this.addEventListener('touchmove', this._boundHandleMouseMoveEvent);
                }
            } else {
                this._dragTarget = this.renderRoot.getElementById('thumb');
                this._dragTarget.setAttribute('dragging', '');
                this._dragging = true;
            }
        }
    }

    _handleMouseMoveEvent(e) {
        if (this._dragging) {
            const newValue = (e.type === 'touchmove') ? this._mouseToValue(e.changedTouches[0].clientX) : this._mouseToValue(e.clientX);
            this._move(newValue);
        } else if (this._rangeDragging) {
            const newValue = (e.type === 'touchmove') ? this._mouseToValue(e.changedTouches[0].clientX) : this._mouseToValue(e.clientX);
            this._moveRange(newValue);
        }
    }

    _handleMouseUpEvent(e) {
        if (this._dragging) {
            if (this._dragTarget) {
                const newValue = (e.type === 'touchend') ? this._mouseToValue(e.changedTouches[0].clientX) : this._mouseToValue(e.clientX);
                this._move(newValue);

                this._dragTarget.removeAttribute('dragging');
                this._dragTarget.blur();
                this._dragTarget = null;
            }

            this._dragging = false;
        } else if (this._rangeDragging) {
            if (this._dragTargetStart && this._dragTargetEnd) {
                const newValue = (e.type === 'touchend') ? this._mouseToValue(e.changedTouches[0].clientX) : this._mouseToValue(e.clientX);
                this._moveRange(newValue);

                this._dragTargetStart.removeAttribute('dragging');
                this._dragTargetEnd.removeAttribute('dragging');
                this._dragTargetStart.blur();
                this._dragTargetEnd.blur();
                this._dragTargetStart = null;
                this._dragTargetEnd = null;
                this._rangeDragging = false;
            }
        }

        this.removeEventListener('mousemove', this._boundHandleMouseMoveEvent);
        this.removeEventListener('touchmove', this._boundHandleMouseMoveEvent);
    }

    _moveRange(newValue) {
        const dx = newValue - this._rangeDragPreviousValue;
        let newStartValue = this.startValue + dx;
        let newEndValue = this.endValue + dx;

        if ((newStartValue >= this.minValue) && (newEndValue <= this.maxValue)) {
            this.startValue = newStartValue;
            this.endValue = newEndValue;
            this._rangeDragPreviousValue = newValue;
        }
    }

    _move(newValue) {
        const target = this._dragTarget;
        const id = target.id;

        switch (id) {
            case 'thumb': {
                this.value = newValue;
                break;
            }

            case 'thumb-start': {
                this.startValue = Math.min(newValue, this.endValue);
                break;
            }

            case 'thumb-end': {
                this.endValue = Math.max(newValue, this.startValue);
                break;
            }
        }
    }

    _mouseToValue(mouseX) {
        const rect = this._track.getBoundingClientRect();
        const displayRange = rect.width;
        const actualRange = this.maxValue - this.minValue;
        const rangeRatio = actualRange / displayRange;
        const elementX = mouseX - rect.x;

        return this._clampValue(Math.round(rangeRatio * elementX));
    }

    _snapValues() {
        if (this.discrete) {
            if (this.range) {
                this.startValue = this._clampValue(this.startValue);
                this.endValue = this._clampValue(this.endValue);
            } else {
                this.value = this._clampValue(this.value);
            }
        }
    }

    _clampValue(value, skip) {
        let result = value;

        if (result < this.minValue) {
            result = this.minValue;
        } else if (result > this.maxValue) {
            result = this.maxValue;
        }

        if ((this.discrete) && (result !== this.minValue) && (result !== this.maxValue) && (this.stops) && (this.stops.length > 0)) {

            if (skip) {
                if (skip === 'backward') {
                    for (let i = this.stops.length - 1; i >= 0; i--) {
                        if (this.stops[i] < result) {
                            result = this.stops[i];
                            break;
                        }
                    }
                } else {
                    for (let i = 0; i < this.stops.length; i++) {
                        if (this.stops[i] > result) {
                            result = this.stops[i];
                            break;
                        }
                    }
                }
            } else {
                result = this.stops.reduce((previous, current) => {
                    return (Math.abs(current - result) < Math.abs(previous - result) ? current : previous);
                });
            }
        }

        return result;
    }
}

window.customElements.define('obap-slider', ObapSlider);