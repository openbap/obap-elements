/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { caption, body } from '../obap-styles/obap-typography.js';
import '../obap-icon/obap-icon.js';

/**
 * A Material Design Navigation Rail item.
 */
export class ObapNavigationRailItem extends ObapElement {
    static get styles() {
        return [caption, body, css`
            :host {
                display: block;
                width: var(--obap-navigation-rail-item-size, 72px);
                height: var(--obap-navigation-rail-item-size, 72px);
                background: transparent;
                color: var(--obap-navigation-rail-color);
                cursor: pointer;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            :host(:hover) * > obap-icon, :host([selected]) * > obap-icon {
                --obap-icon-fill-color: var(--obap-navigation-rail-active-color);
            }

            :host(:hover) * > .label, :host([selected]) * > .label {
                color: var(--obap-navigation-rail-active-color);
            }

            :host([_collapsible]:not(_collapsed)) {
                width: 100%;
            }

            obap-icon {
                --obap-icon-fill-color: var(--obap-navigation-rail-color);
                --obap-icon-width: 24px;
                --obap-icon-height: 24px;
                margin: 0 calc((var(--obap-navigation-rail-item-size) - 24px) / 2);
            }

            .container {
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .vertical {
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .horizontal {
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: start;
            }

            .horizontal-label {
                margin-left: -8px;
                margin-right: 24px;
            }

            .vertical-label {
                margin-top: 4px;
            }
        `];
    }

    static get properties() {
        return {
            icon: {
                type: String,
                attribute: 'icon'
            },

            label: {
                type: String,
                attribute: 'label'
            },

            _collapsible: {
                type: Boolean,
                attribute: '_collapsible',
                reflect: true
            },

            _collapsed: {
                type: Boolean,
                attribute: '_collapsed',
                reflect: true
            }
        }
    }

    constructor() {
        super();
        this.icon = '';
        this.label = '';
        this._collapsible = false;
        this._collapsed = false;
    }
    
    render() {
        return html`
            <div class="container">
                ${this._collapsible ? this._renderCollapsible(this._collapsed, this.icon, this.label) : this._renderNormal(this.icon, this.label)}    
            </div>
        `;
    }

    _renderCollapsible(collapsed, icon, label) {
        return collapsed ? 
            html`${icon ? html`<obap-icon icon="${icon}"></obap-icon>` : null}` : 
            html`
                <div class="horizontal">
                    ${icon ? html`<obap-icon icon="${icon}"></obap-icon>` : null}
                    ${label ? html`<div class="label horizontal-label typography-body">${label}</div>` : null}
                </div>
            `;
    }

    _renderNormal(icon, label) {
        return html`
            <div class="vertical">
                ${icon ? html`<obap-icon icon="${icon}"></obap-icon>` : null}
                ${label ? html`<div class="label vertical-label typography-caption">${label}</div>` : null}
            </div>
        `;
    }
}

window.customElements.define('obap-navigation-rail-item', ObapNavigationRailItem);