/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, svg, ObapInputElement } from '../obap-input-element/obap-input-element.js';
import '../obap-ripple/obap-ripple.js';

export class ObapTab extends ObapInputElement {
    static get styles() {
        return css`
            :host {
                --obap-tab-padding: 3px 16px 0 16px;
                display: block;
                position: relative;
                user-select: none;
                outline: 0;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }
    
            .container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: var(--obap-tab-padding);
                cursor: pointer;
                height: 100%;
                box-sizing: border-box;
            }

            .bar {
                position: absolute;
                width: 100%;
                height: 2px;
                left: 0;
                bottom: 0;
                background-color: var(--obap-tabs-color);
                -webkit-transform: scaleX(0);
                -ms-transform: scaleX(0);
                transform: scaleX(0);
                -webkit-transition: -webkit-transform 0.2s ease-in;
                transition: transform 0.2s ease-in;
            }

            .bar[selected]:not([disabled]) {
                -webkit-transform: scaleX(1);
                -ms-transform: scaleX(1);
                transform: scaleX(1);
            }

            obap-ripple {
                --obap-ripple-color: var(--obap-tabs-ripple-color);
            }
      `;
    }

    static get properties() {
        return {
            noInk: {
                type: Boolean,
                attribute: 'no-ink',
                reflect: true
            },

            selected: {
                type: Boolean,
                attribute: 'selected',
                reflect: true
            }
        }
    }

    get selected() {
        return this._selected;
    }

    set selected(value) {
        const oldValue = this.selected;

        if (oldValue !== value) {
            this._selected = value;
            this.requestUpdate('selected', oldValue);
            this.setAttribute('aria-selected', value);
        }
    }

    constructor() {
        super();
        this.role = 'tab';
        this.noInk = false;
    }

    render() {
        return html`
            <div class="container">
                <slot></slot>
                ${this.noInk ? null : html`<obap-ripple ?has-focus="${this.hasFocus && !this.selected}"></obap-ripple>`}
                <div class="bar" ?selected="${this.selected}" ?disabled="${this.disabled}"></div>
            </div>
        `;
    }
}

window.customElements.define('obap-tab', ObapTab);