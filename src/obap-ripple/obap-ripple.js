/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';

export class ObapRipple extends ObapElement {
    static get styles() {
        return [css`
            :host {
                --obap-ripple-color: var(--obap-text-disabled-color, rgba(0, 0, 0, 0.38));

                display: block;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;

                background: var(--obap-ripple-color);
                opacity: 0;
                transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            }

            :host([extend="1"]) {
                left: -50%;
                top: -50%;
                width: 200%;
                height: 200%;
                border-radius: 50%;
            }

            :host([extend="2"]) {
                left: -100%;
                top: -100%;
                width: 300%;
                height: 300%;
                border-radius: 50%;
            }

            :host([hidden]) {
                display: none !important;
            }

            :host([disabled]) {
                pointer-events: none;
            }

            :host([active]), :host([has-focus]) {
                opacity: 0.40;
            }
        `];
    }

    static get properties() {
        return {
            // Can be 0, 1, 2
            extend: {
                type: Number,
                attribute: 'extend',
                reflect: true
            },

            active: {
                type: Boolean,
                attribute: 'active',
                reflect: true
            },

            hasFocus: {
                type: Boolean,
                attribute: 'has-focus',
                reflect: true
            },

            noInk: {
                type: Boolean,
                attribute: 'no-ink',
                reflect: true
            }
        }
    }

    constructor() {
        super();
        this.extend = 0;
        this.active = false;
        this.hasFocus = false;
        this._boundHandleMouseUpEvent = this._handleMouseUpEvent.bind(this);
        this._boundHandleMouseDownEvent = this._handleMouseDownEvent.bind(this);
        this._boundHandleMouseLeaveEvent = this._handleMouseLeaveEvent.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();

        if (!this.noInk) {
            this.addEventListener('mousedown', this._boundHandleMouseDownEvent);
            this.addEventListener('mouseup', this._boundHandleMouseUpEvent);
            this.addEventListener('mouseleave', this._boundHandleMouseLeaveEvent);
        }
    }

    disconnectedCallback() {
        if (!this.noInk) {
            this.removeEventListener('mousedown', this._boundHandleMouseDownEvent);
            this.removeEventListener('mouseup', this._boundHandleMouseUpEvent);
            this.removeEventListener('mouseleave', this._boundHandleMouseLeaveEvent);
        }
        
        super.disconnectedCallback();
    }

    _handleMouseDownEvent(e) {
        if (!this.noInk) {
            this.active = true;
        }
    }

    _handleMouseUpEvent(e) {
        this.active = false;
    }

    _handleMouseLeaveEvent(e) {
        this.active = false;
        this.hasFocus = false;
    }
}

window.customElements.define('obap-ripple', ObapRipple);
