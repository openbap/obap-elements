/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';

/**
 * A linear progress bar element.
 */
export class ObapLinearProgress extends ObapElement {
    static get styles() {
        return [css`
            :host {
                --obap-linear-progress-backround-color: var(--obap-block-color, #ECECEC);
                --obap-linear-progress-primary-color: var(--obap-primary-color, #5c6bc0);
                --obap-linear-progress-secondary-color: var(--obap-primary-light-color, #8e99f3);

                --obap-linear-progress-disabled-backround-color: var(--obap-block-color, #ECECEC);
                --obap-linear-progress-disabled-primary-color: #757575;
                --obap-linear-progress-disabled-secondary-color: #BDBDBD;

                --obap-linear-progress-indeterminate-duration: 1s;
                display: block;
                height: 4px;
                overflow: hidden;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                position: relative;
                height: 100%;
                background: var(--obap-linear-progress-backround-color);
            }

            .primary {
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                background: var(--obap-linear-progress-primary-color);
            }

            .secondary {
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                background: var(--obap-linear-progress-secondary-color);
            }

            .indeterminate {
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 100%;
                background: var(--obap-linear-progress-primary-color);
                animation-duration: var(--obap-linear-progress-indeterminate-duration);
                animation-iteration-count: infinite;
                animation-timing-function: linear;
                animation-name: indeterminate;
            }

            @keyframes indeterminate {
                from {
                    left: -100%;
                }

                to {
                    left: 100%;
                }
            }

            :host([disabled]) > .container {
                background: var(--obap-linear-progress-disabled-backround-color);
            }

            :host([disabled]) > .container > .primary {
                background: var(--obap-linear-progress-disabled-primary-color);
            }

            :host([disabled]) > .container > .secondary {
                background: var(--obap-linear-progress-disabled-secondary-color);
            }
        `]; 
    }

    static get properties() {
        return {
            min: {
                type: Number
            },

            max: {
                type: Number
            },

            value: {
                type: Number
            },

            secondaryValue: {
                type: Number,
                attribute: 'secondary-value'
            },

            indeterminate: {
                type: Boolean
            },

            label: {
                type: String
            }
        }
    }

    get label() {
        return this._label;
    }

    set label(value) {
        const oldValue = this.label;

        if (oldValue !== value) {
            this._label = value;
            this.requestUpdate('label', oldValue);
            this.setAttribute('aria-label', value); 
        }
    }

    get min() {
        return this._min;
    }

    set min(value) {
        const oldValue = this.min;

        if (oldValue !== value) {
            this._min = value;
            this.requestUpdate('min', oldValue);
            this.setAttribute('aria-valuemin', value);
        }
    }

    get max() {
        return this._max;
    }

    set max(value) {
        const oldValue = this.max;

        if (oldValue !== value) {
            this._max = value;
            this.requestUpdate('max', oldValue);
            this.setAttribute('aria-valuemax', value);
        }
    }

    get value() {
        return this._value;
    }

    set value(value) {
        const oldValue = this.value;

        if (oldValue !== value) {
            this._value = value;
            this.requestUpdate('value', oldValue);

            if (!this.indeterminate) {
                this.setAttribute('aria-valuenow', value);
            }
        }
    }

    get indeterminate() {
        return this._indeterminate;
    }

    set indeterminate(value) {
        const oldValue = this.indeterminate;

        if (oldValue !== value) {
            this._indeterminate = value;
            this.requestUpdate('indeterminate', oldValue);

            if (value) {
                this.removeAttribute('aria-valuenow');
            } else {
                this.setAttribute('aria-valuenow', this.value);
            }
        }
    }

    constructor() {
        super();
        this.role = 'progressbar';
        this.label = 'Progress Bar';
        this.min = 0;
        this.max = 100;
        this.value = 0;
        this.secondaryValue = 0;
        this.indeterminate = false;
    }

    render() {
        return html`
            <div class="container">
                ${this.indeterminate ? this._renderIndeterminateBar(this.disabled) : [this._renderBar(this.secondaryValue, true), this._renderBar(this.value, false)]}
            </div>
        `;
    }

    _renderBar(value, secondary) {
        const style = `width: ${(value * 100) / (this.max - this.min)}%;`;
        return (value > 0) ? html`<div class="${secondary ? 'secondary' : 'primary'}" style="${style}"></div>` : null;
    }

    _renderIndeterminateBar(disabled) {
        return disabled ? null : html`<div class="indeterminate"></div>`;
    }
}

window.customElements.define('obap-linear-progress', ObapLinearProgress);