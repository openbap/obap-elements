/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapSelectorController } from '../obap-selector/obap-selector-controller.js';
import { button } from '../obap-styles/obap-typography.js';
import './obap-tab.js';

export class ObapTabs extends ObapSelectorController(ObapElement) {
    static get styles() {
        return [button, css`
            :host {
                display: block;
                --obap-tabs-color: var(--obap-on-primary-color, #FFFFFF);
                --obap-tabs-inactive-color: var(--obap-on-primary-inactive-color, rgba(255, 255, 255, 0.7));
                --obap-tabs-disabled-color: var(--obap-text-disabled-color, rgba(0, 0, 0, 0.38));
                --obap-tabs-background-color: var(--obap-primary-color, #5c6bc0);
                --obap-tabs-ripple-color: var(--obap-tabs-inactive-color);

                color: var(--obap-tabs-color);
                background: var(--obap-tabs-background-color);
                height: 40px; 
            }

            :host([hidden]) {
                display: none !important;
            }

            :host([disabled]) {
                pointer-events: none;
                background: var(--obap-tabs-disabled-color);
            }

            .container[fill] > ::slotted(obap-tab) {
                flex: 1;
            }

            ::slotted(obap-tab) {
                color: var(--obap-tabs-inactive-color);
                border-bottom: 2px transparent solid;
            }

            ::slotted(obap-tab[selected]) {
                color: var(--obap-tabs-color);
                border-bottom: 2px var(--obap-tabs-color) solid;
            }

            .container {
                display: flex;
                flex-direction: row;
                height: 100%;
            }
        `];
    }

    static get properties() {
        return {
            fill: {
                type: Boolean,
                attribute: 'fill'
            }
        };
    }

    constructor() {
        super();
        this.role = 'tablist';
        this.fill = false;
        this.enterSelects = true;
    }

    render() {
        return html`
            <div class="container typography-button" ?fill="${this.fill}">
                <slot></slot>
            </div>
        `;
    }
}

window.customElements.define('obap-tabs', ObapTabs);
