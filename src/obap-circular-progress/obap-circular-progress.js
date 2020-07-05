/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, svg, ObapElement } from '../obap-element/obap-element.js';
import '../obap-icon/obap-icon.js';

/**
 * A circular progress element.
 */
export class ObapCircularProgress extends ObapElement {
    static get styles() {
        return [css`
            :host {
                --obap-circular-progress-backround-color: transparent;
                --obap-circular-progress-primary-color: var(--obap-primary-color, #5c6bc0);
                --obap-circular-progress-secondary-color: var(--obap-primary-light-color, #8e99f3);
                --obap-circular-progress-icon-color: var(--obap-primary-color, #5c6bc0);

                --obap-circular-progress-disabled-backround-color: transparent;
                --obap-circular-progress-disabled-primary-color: #757575;
                --obap-circular-progress-disabled-secondary-color: #BDBDBD;

                --obap-circular-progress-indeterminate-duration: 1.5s;
                --obap-circular-progress-size: 28px;
                --obap-circular-progress-stroke-width: 4px;

                display: block;
                overflow: hidden;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            obap-icon {
                --obap-icon-width: calc(var(--obap-circular-progress-size) - (var(--obap-circular-progress-stroke-width) * 2) - 4px);
                --obap-icon-height: calc(var(--obap-circular-progress-size) - (var(--obap-circular-progress-stroke-width) * 2) - 4px);
                position: absolute;
                left: calc(var(--obap-circular-progress-stroke-width) + 2px);
                top: calc(var(--obap-circular-progress-stroke-width) + 2px);
                fill: var(--obap-circular-progress-icon-color);
            }

            .container {
                position: relative;
                height: var(--obap-circular-progress-size);
                width: var(--obap-circular-progress-size);
                background: var(--obap-circular-progress-backround-color);
                border-radius: 50%;
                overflow: hidden;
            }

            svg {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                stroke-width: var(--obap-circular-progress-stroke-width);
                stroke-linecap: butt;
                fill: transparent;
                transform: rotate(-90deg);
            }

            svg.primary {
                stroke: var(--obap-circular-progress-primary-color);
            }

            svg.secondary {
                stroke: var(--obap-circular-progress-secondary-color);
            }

            svg.indeterminate {
                stroke: var(--obap-circular-progress-primary-color);
                animation: indeterminate-rotate var(--obap-circular-progress-indeterminate-duration) infinite linear;
            }

            circle.indeterminate {
                transform-origin: 50% 50%;
                animation: indeterminate-stroke var(--obap-circular-progress-indeterminate-duration) infinite ease-in, indeterminate-flip var(--obap-circular-progress-indeterminate-duration) infinite steps(1);

            }

            @keyframes indeterminate-rotate {
                from {
                    transform: rotate(-90deg);
                }

                to {
                    transform: rotate(270deg);
                }
            }

            @keyframes indeterminate-stroke {
                from {
                    stroke-dasharray: 0% 270%;
                }

                50% {
                    stroke-dasharray: 270% 270%;
                }

                to {
                    stroke-dasharray: 0% 270%;
                }
            }

            @keyframes indeterminate-flip {
                from {
                    transform: scale(1, 1);
                }

                50% {
                    transform: scale(1, -1);
                }

                to {
                    transform: scale(1, 1);
                }
            }

            :host([disabled]) > .container > svg.primary {
                stroke: var(--obap-circular-progress-disabled-primary-color);
            }

            :host([disabled]) > .container > svg.secondary {
                stroke: var(--obap-circular-progress-disabled-secondary-color);
            }

            :host([disabled]) > .container {
                background: var(--obap-circular-progress-disabled-backround-color);
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
            },

            icon: {
                type: String,
                attribute: 'icon'
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
        this.icon = '';
        this._lineWidth = 2;
        this._size = 32;
    }

    render() {
        const cs = getComputedStyle(this);
        this._lineWidth = Number(this.getCssVariableValue(cs, '--obap-circular-progress-stroke-width', '4px').replace('px', '')) / 2.0;
        this._size = Number(this.getCssVariableValue(cs, '--obap-circular-progress-size', '28px').replace('px', ''));

        return html`
            <div class="container">
                ${this.icon ? html`<obap-icon icon="${this.icon}"></obap-icon>` : null}
                ${this.indeterminate ? this._renderIndeterminateCircle(this.disabled) : [this._renderCircle(this.secondaryValue, true), this._renderCircle(this.value, false)]}
            </div>
        `;
    }

    _renderCircle(value, secondary) {
        return (value === 0) ? null : svg`<svg class="${secondary ? 'secondary' : 'primary'}" viewBox="0 0 ${this._size} ${this._size}"><circle cx="${this._size / 2.0}" cy="${this._size / 2.0}" r="${(this._size / 2.0) - this._lineWidth}" stroke-dasharray="${this._getCircleStrokeArray(value)}"/></svg>`;
    }

    _getCircleStrokeArray(value) {
        const circumference = 2.0 * Math.PI * ((this._size / 2.0) - this._lineWidth);

        if (this.max - this.min <= 0) {
            return `0 ${circumference}`;
        } else {
            const ratio = value / (this.max - this.min);
            const v1 = ratio * circumference;
            const v2 = circumference - v1;
            return `${v1} ${v2}`;
        }
    }

    _renderIndeterminateCircle(disabled) {
        return disabled ? null : svg`<svg class="indeterminate" viewBox="0 0 ${this._size} ${this._size}"><circle class="indeterminate" cx="${this._size / 2.0}" cy="${this._size / 2.0}" r="${(this._size / 2.0) - this._lineWidth}"/></svg>`;
    }
}

window.customElements.define('obap-circular-progress', ObapCircularProgress);
