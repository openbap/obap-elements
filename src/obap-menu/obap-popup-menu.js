/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapMenuController } from './obap-menu-controller.js';
import { ObapAttachedElementController } from '../obap-attached-element/obap-attached-element-controller.js';
import '../obap-icon/obap-icon.js';

export class ObapPopupMenu extends ObapMenuController(ObapAttachedElementController(ObapElement)) {
    static get styles() {
        return [css`
            :host {
                --obap-menu-height: 24px;
                --obap-menu-color: var(--obap-on-primary-color, #FFFFFF);
                --obap-menu-background-color: var(--obap-primary-dark-color, #26418f);
                --obap-menu-active-color: var(--obap-on-primary-color, #FFFFFF);
                --obap-menu-active-background-color: var(--obap-primary-color, #5c6bc0);
                --obap-menu-disabled-color: var(--obap-on-primary-inactive-color, rgba(255, 255, 255, 0.7));
                --obap-menu-disabled-background-color: var(--obap-primary-dark-color, #26418f);
                --obap-menu-separator-color: rgba(255, 255, 255, 0.5);

                display: block;
                position: absolute;
                color: var(--obap-menu-color);
                background: var(--obap-menu-background-color);
                box-sizing: border-box;
                padding: 8px 1px;
                outline: none;
                box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
                0 1px 10px 0 rgba(0, 0, 0, 0.12),
                0 2px 4px -1px rgba(0, 0, 0, 0.4);
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
                height: 100%;
            }

            .item {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 24px;
                cursor: pointer;
                color: var(--obap-menu-color);
                background: var(--obap-menu-background-color);
                white-space: nowrap;
                height: var(--obap-menu-height);
            }

            .item-icons {
                padding-left: 32px;
            }

            *[ignore] {
                pointer-events: none;
            }

            :host([over]) > .container > .item[active], 
            :host([over]) > .container > .item:hover {
                color: var(--obap-menu-active-color);
                background: var(--obap-menu-active-background-color);
            }

            .item[disabled] {
                pointer-events: none;
                cursor: default;
                color: var(--obap-menu-disabled-color);
                background: var(--obap-menu-disabled-background-color);
            }

            .text-content {
                display: flex;
                justify-content: space-between;
                flex: 1;
            }

            .shortcut {
                margin-left: 48px;
            }

            .separator {
                height: 1px;
                margin: 4px 8px;
                background: var(--obap-menu-separator-color);
                pointer-events: none;
            }

            .separator:last-child {
                display: none;
            }

            .icon-right {
                margin-right: -20px;
                width: 16px;
                height: 16px;
            }

            .icon-left {
                margin-left: -24px;
                margin-right: 10px;
                width: 14px;
                height: 14px;
            }
        `];
    }

    constructor() {
        super();
        this.anchor = 'bottom-left';
        this.inset = 'out';
        this.shift = 'right';
    }

    /*
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this._resizeLabels();
    }
    */
    
    render() {
        return html`
            <div class="container">
                ${this.items.map((item) => this._renderItem(item))}
            </div>
        `;
    }

    _renderItem(item) {
        const hasItems = item.items && item.items.length > 0;

        return html`
            <div class="item ${this.hasIcons ? 'item-icons' : ''}" ?disabled="${item.disabled}" .item="${item}" ?active="${item === this.activeItem}" @click="${(e) => this.select(e.target.item)}" @mouseenter="${this._mouseEnterItem}">
                ${(item === this.activeItem && hasItems > 0) ? html`
                    <obap-popup-menu .items="${item.items}" .parentMenu="${this}" anchor="top-right" inset="out" shift="down" offset-x="-1" offset-y="-8"></obap-popup-menu>
                ` : null}

                ${(item.toggles && item.toggleOn) ? html`<obap-icon ignore class="icon-left" icon="core:check"></obap-icon>` : null}
                ${(item.icon && !item.toggles) ? html`<obap-icon ignore class="icon-left" icon="${item.icon}"></obap-icon>` : null}

                <div ignore class="text-content">
                    ${(item.label && item.label.length > 0) ? html`<span class="label">${item.label}</span>` : null}
                    ${(item.shortcut && item.shortcut.label && item.shortcut.label.length > 0) ? html`<span class="shortcut">${item.shortcut.label}</span>` : null}
                </div>
                ${hasItems ? html`<obap-icon ignore class="icon-right" icon="core:chevron-right"></obap-icon>` : null}
            </div>

            ${item.separator ? html`<div class="separator"></div>` : null}
        `
    }

    _resizeLabels() {
        const labels = [...this.renderRoot.querySelectorAll('.label')];
        const widths = labels.map((label) => label.clientWidth);
        const maxWidth = Math.max(...widths);

        labels.forEach((label) => {
            label.style.width = maxWidth + "px";
        });
    }

    _mouseEnterItem(e) {
        this.activeItem = e.target.item;
    }

   
}

window.customElements.define('obap-popup-menu', ObapPopupMenu);
