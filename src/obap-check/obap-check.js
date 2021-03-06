/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
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
<obap-check label="unselected"></obap-check>

<!-- Selected -->
<obap-check label="selected" selected></obap-check>

<!-- Indeterminate -->
<obap-check label="indeterminate" indeterminate></obap-check>

<!-- Disabled -->
<obap-check label="disabled" disabled></obap-check>
```
 */
export class ObapCheck extends ObapInputElement {
    static get styles() {
        return [body, css`
            :host {
                --obap-check-selected-color: var(--obap-primary-color, #5c6bc0);
                --obap-check-indeterminate-color: var(--obap-primary-color, #5c6bc0);
                --obap-check-unselected-color: var(--obap-text-secondary-color, rgba(0, 0, 0, 0.54));
                --obap-check-background-color: white;
                --obap-check-disabled-background-color: transparent;
                --obap-check-disabled-color: var(--obap-text-disabled-color, rgba(0, 0, 0, 0.38));
                --obap-check-ripple-color: var(--obap-text-disabled-color, rgba(0, 0, 0, 0.38));
                display: inline-block;
                outline: 0;
                height: 20px;
                box-sizing: content-box;
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

            :host([disabled]) .container {
                background: var(--obap-check-disabled-background-color);
            }

            :host([disabled][selected]) .check-container, :host([disabled][indeterminate]) .check-container {
                border: 2px solid transparent;
                background: var(--obap-check-disabled-color);
            }

            obap-ripple {
                background: var(--obap-check-ripple-color);
            }

            .container {
                height: 100%;
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
                border-radius: 2px;
                background: var(--obap-check-background-color);
                margin-left: 2px;
                border: 2px solid var(--obap-check-unselected-color);
            }

            .label {
                margin-left: 10px;
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

    get selected() {
        return this._selected;
    }

    set selected(value) {
        const oldValue = this.selected;

        if (oldValue !== value) {
            this._selected = value;
            this.setAttribute('aria-checked', value);    
            this.requestUpdate('selected', oldValue);
            this.fireMessage('obap-item-selected', {
                selected: this._selected,
                name: this.name
            });
        }
    }

    constructor() {
        super();
        this._selected = false;
        this.indeterminate = false;
        this.noInk = false;
        this.role = 'checkbox';
    }

    connectedCallback() {
        super.connectedCallback();
        this.setAttribute('aria-checked', this.selected); 
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            if (propName === 'label') {
                this.setAttribute('aria-label', this.label);    
            }
        });
    }

    render() {
        return html`
            <div class="container typography-body" @click="${this._clickHandler}">
                <div class="check-container">
                    <div class="check">${this._getCheck()}</div>
                    ${this.noInk ? null : html`<obap-ripple extend="2" ?has-focus="${this.hasFocus}"></obap-ripple>`}
                </div>
                ${this.label ? html`<div class="label">${this.label}</div>` : null}
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

        this.hasFocus = false;
        e.preventDefault();
        e.stopPropagation();
    }
}

window.customElements.define('obap-check', ObapCheck);
