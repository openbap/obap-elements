/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapMenuController } from './obap-menu-controller.js';
import { body } from '../obap-styles/obap-typography.js';
import './obap-popup-menu.js';

export class ObapMenu extends ObapMenuController(ObapElement) {
    static get styles() {
        return [body, css`
            :host {
                --obap-menu-bar-height: 24px;
                --obap-menu-bar-color: var(--obap-on-primary-color, #FFFFFF);
                --obap-menu-bar-background-color: var(--obap-primary-color, #5c6bc0);
                --obap-menu-bar-active-color: var(--obap-on-primary-color, #FFFFFF);
                --obap-menu-bar-active-background-color: var(--obap-primary-light-color, #8e99f3);
                --obap-menu-bar-disabled-color: var(--obap-on-primary-inactive-color, rgba(255, 255, 255, 0.7));
                --obap-menu-bar-disabled-background-color: var(--obap-primary-color, #5c6bc0);

                display: block;
                height: var(--obap-menu-bar-height);
                color: var(--obap-menu-bar-color);
                background: var(--obap-menu-bar-background-color);
                outline: none;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                display: flex;
                height: 100%;
            }

            .item {
                position: relative;
                display: flex;
                align-items: center;
                white-space: nowrap;
                padding: 0 8px;
                color: var(--obap-menu-bar-color);
                background: var(--obap-menu-bar-background-color);
            }

            *[ignore] {
                pointer-events: none;
            }

            .item[active], .item:hover {
                color: var(--obap-menu-bar-active-color);
                background: var(--obap-menu-bar-active-background-color);
            }

            .item[disabled] {
                pointer-events: none;
                color: var(--obap-menu-bar-disabled-color);
                background: var(--obap-menu-bar-disabled-background-color);
            }
        `];
    }

    constructor() {
        super();
        this.role = 'menubar';
    }

    connectedCallback() {
        super.connectedCallback();
        this.setAttribute('aria-label', 'Menu Bar');
    }
    
    render() {
        return html`
            <div class="container typography-body">
                ${this.items.map((item) => this._renderItem(item))}
            </div>
        `;
    }

    _renderItem(item) {
        const hasItems = item.items && item.items.length > 0;
        const showPopup = item === this.activeItem && hasItems > 0;

        return html`
            <div role="menuitem" aria-haspopup="${showPopup}" aria-expanded="${showPopup}" aria-label="${item.label}" class="item" ?disabled="${item.disabled}" .item="${item}" ?active="${item === this.activeItem}" @click="${(e) => this.select(e.target.item)}" @mouseenter="${this._mouseEnterItem}">
                ${(showPopup) ? html`
                    <obap-popup-menu aria-label="${item.label}" .items="${item.items}" .parentMenu="${this}"></obap-popup-menu>
                ` : null}

                <span ignore>${item.label}</span>
            </div>
        `
    }

    _mouseEnterItem(e) {
        if (this.focused) {
            this.activeItem = e.target.item;
        } 
    }
}

window.customElements.define('obap-menu', ObapMenu);
