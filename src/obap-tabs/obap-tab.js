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
            </div>
        `;
    }
}

window.customElements.define('obap-tab', ObapTab);