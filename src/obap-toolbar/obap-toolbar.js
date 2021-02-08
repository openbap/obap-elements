/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import './obap-toolbar-button.js';

/**
 * A traditional style toolbar.
 */
export class ObapToolbar extends ObapElement {
    static get styles() {
        return [css`
            :host {
                /*
                --obap-toolbar-color: var(--obap-on-primary-color, #FFFFFF);
                --obap-toolbar-background-color: var(--obap-primary-color, #5c6bc0);
                --obap-toolbar-inactive-color: var(--obap-on-primary-inactive-color, rgba(255, 255, 255, 0.7));
                --obap-toolbar-disabled-color: var(--obap-text-disabled-color, rgba(0, 0, 0, 0.38));
                --obap-toolbar-size: 64px;
                */
                
                /*--obap-toolbar-ripple-color: var(--obap-toolbar-inactive-color);*/
                display: block;
                overflow: hidden;

                height: 64px;
                width: auto;
                
                color: var(--obap-toolbar-inactive-color, var(--obap-on-primary-inactive-color, rgba(255, 255, 255, 0.7)));
                background: var(--obap-toolbar-background-color, var(--obap-primary-color, #5c6bc0));
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            :host([vertical]) {
                width: 64px;
                height: auto;
            }

            .container {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: stretch;
                width: 100%;
                height: 100%;
            }

            .container[vertical] {
                flex-direction: column;
            }

            ::slotted(obap-toolbar-button) {
                color: var(--obap-toolbar-inactive-color, var(--obap-on-primary-inactive-color, rgba(255, 255, 255, 0.7)));
            }

            ::slotted(obap-toolbar-button[disabled]) {
                color: var(--obap-toolbar-disabled-color, var(--obap-text-disabled-color, rgba(0, 0, 0, 0.38)));
            }

            ::slotted(obap-toolbar-button:hover) {
                color: var(--obap-toolbar-color, var(--obap-on-primary-color, #FFFFFF));
            }
        `];
    }

    static get properties() {
        return {
            vertical: {
                type: Boolean,
                reflect: true
            }
        }
    }

    constructor() {
        super();
    
        this.vertical = false;
    }

    render() {
        return html`
            <div class="container" ?vertical="${this.vertical}">
                <slot></slot>
            </div>
        `;
    }
}

window.customElements.define('obap-toolbar', ObapToolbar);
