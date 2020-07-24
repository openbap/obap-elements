/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapInputElement } from '../obap-input-element/obap-input-element.js';
import { button } from '../obap-styles/obap-typography.js';
import { hostElevation2, hostElevation6 } from '../obap-styles/obap-elevation.js';
import '../obap-ripple/obap-ripple.js';
import '../obap-icon/obap-icon.js';

/**
A Material Design button that allows you to create regular, floating action and icon buttons.
 
## Usage

```javascript
import '@obap/obap-elements/obap-button/obap-button.js';

<!-- Regular Button -->
<obap-button label="normal"></obap-button>
<obap-button label="raised" raised></obap-button>
<obap-button label="toggle" toggle></obap-button>
<obap-button label="disabled" disabled></obap-button>

<!-- Regular Button with Icon -->
<obap-button label="raised" icon="android" raised></obap-button>

<!-- Icon Button -->
<obap-button round icon="android"></obap-button>

<!-- FAB -->
<obap-button round icon="android" raised></obap-button>

<!-- 'Pill' Button -->
<obap-button round label="normal" raised></obap-button>
<obap-button round label="normal" icon="android" raised></obap-button>
<obap-button round label="raised" raised></obap-button>
<obap-button round label="raised" icon="android" raised></obap-button>
```
 */
export class ObapButton extends ObapInputElement {
    static get styles() {
        return [button, hostElevation2, hostElevation6, css`
            :host {
                --obap-button-color: var(--obap-text-primary-color, rgba(0, 0, 0, 0.87));
                --obap-button-outline-color: var(--obap-text-primary-color, rgba(0, 0, 0, 0.87));
                --obap-button-disabled-color: var(--obap-text-disabled-color, rgba(0, 0, 0, 0.38));
                --obap-button-split-color: var(--obap-text-disabled-color, rgba(0, 0, 0, 0.38));
                --obap-button-background-color: var(--obap-surface-color,#FFFFFF);
                --obap-button-disabled-background-color: transparent;
                --obap-button-ripple-color: var(--obap-text-disabled-color, rgba(0, 0, 0, 0.38));
                --obap-button-outline-size: 1px;
                
                display: inline-block;
                position: relative;
                box-sizing: border-box;
                overflow: hidden;
                user-select: none;
                cursor: pointer;
                outline: 0;
                border-radius: 3px;
                color: var(--obap-button-color);
                background: var(--obap-button-background-color);
                min-width: 64px;
                height: 32px;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
                box-shadow: none;
                color: var(--obap-button-disabled-color);
                background: var(--obap-button-disabled-background-color);
            }

            :host([round]) {
                border-radius: 20px;
            }

            :host([outline]) {
                border: var(--obap-button-outline-size) solid var(--obap-button-outline-color);
            }

            .container {
                display: inline-flex;
                flex-direction: row;
                justify-content: center;
                align-content: center;
                align-items: center;
                box-sizing: border-box;
                height: 100%;
                width: 100%;
                padding: 11px 10px 9px 10px;
            }

            :host([round]) {
                min-width: 40px;
                height: 40px;
            }

            obap-ripple {
                --obap-ripple-color: var(--obap-button-ripple-color);
                border-radius: inherit;
            }

            div[has-icon] {
                margin-left: 6px;
            }

            :host([round]) * > div[has-icon] {
                margin-right: 4px;
            }
        `];
    }

    static get properties() {
        return {
            /**
             * Whether or not the button is raised (has a dropshadow).
             */
            raised: {
                type: Boolean,
                attribute: 'raised',
                reflect: true
            },

            /**
             * Whether or not to show a ripple when clicked.
             */
            noInk: {
                type: Boolean,
                attribute: 'no-ink',
                reflect: true
            },

            /**
             * Whether or not the button corners are rounded (50% of height).
             */
            round: {
                type: Boolean,
                attribute: 'round',
                reflect: true
            },

            /**
             * Whether or not the button has an outline.
             */
            outline: {
                type: Boolean,
                attribute: 'outline',
                reflect: true
            },

            /**
             * Whether or not the button is a toggle button.
             */
            toggle: {
                type: Boolean,
                attribute: 'toggle',
                reflect: true
            },

            /**
             * The text to display in button.
             */
            label: {
                type: String,
                attribute: 'label'
            },

            /**
             * The icon to display in the button (to the left of the label).
             */
            icon: {
                type: String,
                attribute: 'icon'
            },

            /**
             * Whether or not the button is selected, if it's a toggle button.
             */
            selected: {
                type: Boolean,
                attribute: 'selected',
                reflect: true
            }
        }
    }

    constructor() {
        super();
        this.raised = false;
        this.noInk = false;
        this.round = false;
        this.toggle = false;
        this.selected = false;
        this.outline = false;
        this.icon = '';
        this.label = '';
        this.role = 'button';

        this._boundHandleMouseUpEvent = this._handleMouseUpEvent.bind(this);
        this._boundHandleMouseDownEvent = this._handleMouseDownEvent.bind(this);
        this._boundHandleTouchStartEvent = this._handleTouchStartEvent.bind(this);
        this._boundHandleTouchEndEvent = this._handleTouchEndEvent.bind(this);

        this.addEventListener('mousedown', this._boundHandleMouseDownEvent);
        this.addEventListener('mouseup', this._boundHandleMouseUpEvent);

        this.addEventListener('touchstart', this._boundHandleTouchStartEvent);
        this.addEventListener('touchend', this._boundHandleTouchEndEvent);
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            switch (propName) {
                case 'raised': {
                    this.raised ? this.setAttribute('elevation', 2) : this.removeAttribute('elevation');
                    break;
                }

                case 'label': {
                    this.setAttribute('aria-label', this._getAriaLabel());
                    break;
                }

                case 'icon': {
                    this.setAttribute('aria-label', this._getAriaLabel());
                    break;
                }
            }
        });
    }

    _getAriaLabel() {
        return this.label ? this.label : this.icon;
    }

    render() {
        return html`
            <div class="container typography-button">
                ${this.icon ? html`<obap-icon icon="${this.icon}"></obap-icon>` : null}
                ${this.label ? html`<div ?has-icon="${this.icon !== ''}">${this.label}</div>` : null} 
            </div>
            ${this.noInk ? null : html`<obap-ripple ?has-focus="${this.selected}"></obap-ripple>`}
        `;
    }

    _handleMouseDownEvent(e) {
        e.preventDefault();
        this._handleDown();
    }

    _handleMouseUpEvent(e) {
        e.preventDefault();
        this._handleUp();
    }

    _handleTouchStartEvent(e) {
        e.preventDefault();
        this._handleDown();
    }

    _handleTouchEndEvent(e) {
        e.preventDefault();
        this._handleUp();
        this.click();
    }

    _handleDown() {
        if (this.raised) {
            if (this.toggle) {
                this.selected = !this.selected;
                this.selected ? this.setAttribute('elevation', 6) : this.setAttribute('elevation', 2);
            } else {
                this.setAttribute('elevation', 6);
            }  
        } else {
            if (this.toggle) {
                this.selected = !this.selected;
            }
        }
    }

    _handleUp() {
        if ((this.raised) && (!this.toggle)) {
            this.setAttribute('elevation', 2);
        }
    }
}

window.customElements.define('obap-button', ObapButton);