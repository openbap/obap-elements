/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, svg, ObapInputElement } from '../obap-input-element/obap-input-element.js';
import { body } from '../obap-styles/obap-typography.js';
import '../obap-ripple/obap-ripple.js';

export class ObapRadio extends ObapInputElement {
    static get styles() {
        return [body, css`
            :host {
                --obap-radio-selected-color: var(--obap-primary-color, #5c6bc0);
                --obap-radio-unselected-color: var(--obap-text-secondary-color, rgba(0, 0, 0, 0.54));
                --obap-radio-disabled-color: var(--obap-text-disabled-color, rgba(0, 0, 0, 0.38));
                --obap-radio-ripple-color: var(--obap-text-disabled-color, rgba(0, 0, 0, 0.38));
                display: inline-block;
                outline: 0;
            }

            :host([hidden]) {
                display: none !important;
            }

            :host([disabled]) {
                pointer-events: none;
                color: var(--obap-radio-disabled-color) !important;
            }

            obap-ripple {
                background: var(--obap-radio-ripple-color);
            }

            .container {
                display: flex;
                flex-direction: row;
                align-items: center;
                cursor: pointer;
            }
            
            .check-container {
                position: relative;
                user-select: none;
                height: 20px;
                width: 20px;
                margin-right: 8px;
            }
            
            .check {
                user-select: none;
                fill: var(--obap-radio-unselected-color);
            }

            :host([selected]) * > .check {
                fill: var(--obap-radio-selected-color);
            }

            :host([disabled]) * > .check {
                fill: var(--obap-radio-disabled-color);
            }

            :host([disabled][selected]) * > .check {
                fill: var(--obap-radio-disabled-color);
            }
        `];
    }

    static get properties() {
        return {
            label: {
                type: String,
                attribute: 'label'
            },

            selected: {
                type: Boolean,
                attribute: 'selected',
                reflect: true
            },

            noInk: {
              type: Boolean,
              attribute: 'no-ink',
              reflect: true
            }
        };
    }

    constructor() {
        super();
        this.selected = false;
        this.indeterminate = false;
        this.noInk = false;
        this.role = 'radio';
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            if (propName === 'label') {
                this.setAttribute('aria-label', this._getAriaLabel());    
            }
        });
    }

    _getAriaLabel() {
        return this.label;
    }

    render() {
        return html`
            <div class="container typography-body">
                <div class="check-container">
                    ${this._getCheck()}
                    ${this.noInk ? null : html`<obap-ripple extend="1" ?has-focus="${this.hasFocus && !this.selected}"></obap-ripple>`}
                </div>
                ${this.label}
            </div>
        `;
    }

    _getCheck() {
        if (this.selected) {
            return svg`<svg class="check" viewBox="0 0 24 24"><g><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></g></svg>`;
        } else {
            return svg`<svg class="check" viewBox="0 0 24 24"><g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></g></svg>`;
        }
    }
}

window.customElements.define('obap-radio', ObapRadio);
