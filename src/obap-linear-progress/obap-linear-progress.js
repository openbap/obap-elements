/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
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
                type: Number,
                attribute: 'min'
            },

            max: {
                type: Number,
                attribute: 'max'
            },

            value: {
                type: Number,
                attribute: 'value'
            },

            secondaryValue: {
                type: Number,
                attribute: 'secondary-value'
            },

            indeterminate: {
                type: Boolean,
                attribute: 'indeterminate'
            }
        }
    }

    constructor() {
        super();
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