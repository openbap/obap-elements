/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
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
                transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            }

            :host([extend="1"]) {
                left: -50%;
                top: -50%;
                width: 200%;
                height: 200%;
                border-radius: var(--obap-border-radius-circle, 50%);
            }

            :host([extend="2"]) {
                left: -100%;
                top: -100%;
                width: 300%;
                height: 300%;
                border-radius: var(--obap-border-radius-circle, 50%);
            }

            :host([hidden]) {
                display: none !important;
            }

            :host([disabled]) {
                pointer-events: none;
            }

            :host(:not([active]):not([has-focus])[over]) {
                opacity: 0.10;
            }
            
            :host([active]), :host([has-focus]) {
                opacity: 0.20;
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

            over: {
                type: Boolean,
                attribute: 'over',
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
        this.over = false;
        this._boundHandleMouseUpEvent = this._handleMouseUpEvent.bind(this);
        this._boundHandleMouseDownEvent = this._handleMouseDownEvent.bind(this);
        this._boundHandleMouseEnterEvent = this._handleMouseEnterEvent.bind(this);
        this._boundHandleMouseLeaveEvent = this._handleMouseLeaveEvent.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();

        if (!this.noInk) {
            this.addEventListener('mousedown', this._boundHandleMouseDownEvent);
            this.addEventListener('mouseup', this._boundHandleMouseUpEvent);
            this.addEventListener('mouseenter', this._boundHandleMouseEnterEvent);
            this.addEventListener('mouseleave', this._boundHandleMouseLeaveEvent);
            
            this.addEventListener('touchstart', this._boundHandleMouseDownEvent);
            this.addEventListener('touchend', this._boundHandleMouseUpEvent);
        }
    }

    disconnectedCallback() {
        if (!this.noInk) {
            this.removeEventListener('mousedown', this._boundHandleMouseDownEvent);
            this.removeEventListener('mouseup', this._boundHandleMouseUpEvent);
            this.removeEventListener('mouseenter', this._boundHandleMouseEnterEvent);
            this.removeEventListener('mouseleave', this._boundHandleMouseLeaveEvent);

            this.removeEventListener('touchstart', this._boundHandleMouseDownEvent);
            this.removeEventListener('touchend', this._boundHandleMouseUpEvent);
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

    _handleMouseEnterEvent(e) {
        this.over = true;
    }

    _handleMouseLeaveEvent(e) {
        this.active = false;
        this.over = false;
    }
}

window.customElements.define('obap-ripple', ObapRipple);
