/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapSelectorController } from '../obap-selector/obap-selector-controller.js';
import { button } from '../obap-styles/obap-typography.js';
import '../obap-scroll-container/obap-scroll-container.js'
import './obap-tab.js';

export class ObapTabs extends ObapSelectorController(ObapElement) {
    static get styles() {
        return [button, css`
            :host {
                display: block;
                position: relative;
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

            .container {
                --obap-scroll-container-color: var(--obap-tabs-color);
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
            },

            scroll: {
                type: Boolean,
                attribute: 'scroll'
            },

            hideScrollButtons: {
                type: Boolean,
                attribute: 'hide-scroll-buttons'
            }
        };
    }

    constructor() {
        super();
        this.role = 'tablist';
        this.itemRole = 'tab';
        this.fill = false;
        this.scroll = false;
        this.hideScrollButtons = false;
        this.enterSelects = true;
    }

    render() {
        return html`
            <obap-scroll-container class="container typography-button" ?fill="${this.fill}" ?disable-scrolling="${this.scroll === false}"
                                   ?hide-buttons="${this.hideScrollButtons}" mini-buttons>
                <slot></slot>
            </obap-scroll-container>
        `;
    }
}

window.customElements.define('obap-tabs', ObapTabs);
