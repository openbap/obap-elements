/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, svg, ObapInputElement } from '../obap-input-element/obap-input-element.js';
import { body } from '../obap-styles/obap-typography.js';
import '../obap-ripple/obap-ripple.js';

/**
A Material Design checkbox.
 
## Usage

```javascript
import '@obap/obap-elements/obap-check/obap-check.js';

<!-- Unselected -->
<obap-button label="unselected"></obap-button>

<!-- Selected -->
<obap-button label="selected" selected></obap-button>

<!-- Indeterminate -->
<obap-button label="indeterminate" indeterminate></obap-button>

<!-- Disabled -->
<obap-button label="disabled" disabled></obap-button>
```
 */
export class ObapCheck extends ObapInputElement {
    static get styles() {
        return [body, css`
            :host {
                --obap-check-selected-color: var(--obap-primary-color, #5c6bc0);
                --obap-check-indeterminate-color: var(--obap-primary-color, #5c6bc0);
                --obap-check-unselected-color: var(--obap-text-secondary-color, rgba(0, 0, 0, 0.54));
                --obap-check-disabled-color: var(--obap-text-disabled-color, rgba(0, 0, 0, 0.38));
                --obap-check-ripple-color: var(--obap-text-disabled-color, rgba(0, 0, 0, 0.38));
                display: inline-block;
                outline: 0;
            }

            :host([hidden]) {
                display: none !important;
            }

            :host([disabled]) {
                pointer-events: none;
                color: var(--obap-check-disabled-color) !important;
            }
        
            :host([selected]) .check-container, :host([indeterminate]) .check-container {
                background: var(--obap-check-selected-color);
                border: 2px solid var(--obap-check-selected-color);
            }

            :host([disabled]) .check-container {
                border: 2px solid var(--obap-check-disabled-color);
            }

            :host([disabled][selected]) .check-container, :host([disabled][indeterminate]) .check-container {
                border: 2px solid transparent;
                background: var(--obap-check-disabled-color);
            }

            obap-ripple {
                background: var(--obap-check-ripple-color);
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
                height: 12px;
                width: 12px;
                margin-right: 8px;
                border-radius: 2px;
                background: transparent;
                border: 2px solid var(--obap-check-unselected-color);
            }

            .check {
                user-select: none;
                margin-bottom: 2px;
                stroke: white;
                fill: white;
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

            indeterminate: {
                type: Boolean,
                attribute: 'indeterminate',
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
        this.role = 'checkbox';
    }

    render() {
        return html`
            <div class="container typography-body" @click="${this._clickHandler}">
                <div class="check-container">
                    <div class="check">${this._getCheck()}</div>
                    ${this.noInk ? null : html`<obap-ripple extend="2" ?has-focus="${this.hasFocus}"></obap-ripple>`}
                </div>
                ${this.label}
            </div>
        `;
    }

    _getCheck() {
        if (this.indeterminate) {
            return svg`<svg class="check" viewBox="0 0 24 24"><g><path d="M19 13H5v-2h14v2z"/></g></svg>`;
        }
        else if (this.selected) {
            return svg`<svg class="check" viewBox="0 0 24 24"><g><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></g></svg>`;
        } else {
            return null;
        }
    }

    _clickHandler(e) {
        this.selected = !this.selected;

        if (this.selected) {
            this.indeterminate = false;
        }

        const event = new CustomEvent('obap-item-selected-change', {
            detail: {
                selected: this.selected,
                name: this.name
            },
            bubbles: true,
            composed: true
        });

        this.hasFocus = false;

        this.dispatchEvent(event);
    }
}

window.customElements.define('obap-check', ObapCheck);
