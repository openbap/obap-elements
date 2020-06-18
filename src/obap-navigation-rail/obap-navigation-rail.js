/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapSelectorController } from '../obap-selector/obap-selector-controller.js';
import { hostElevation } from '../obap-styles/obap-elevation.js';
import '../obap-button/obap-button.js';
import './obap-navigation-rail-item.js';

/**
 * A Material Design Navigation Rail element.
 */
export class ObapNavigationRail extends ObapSelectorController(ObapElement) {
    static get styles() {
        return [hostElevation, css` 
            :host {
                --obap-navigation-rail-color: rgba(255, 255, 255, 0.7);
                --obap-navigation-rail-active-color: var(--obap-on-primary-color, white);
                --obap-navigation-rail-background-color: var(--obap-primary-color, #5c6bc0);
                --obap-navigation-rail-action-color: var(--obap-on-accent-color, white);
                --obap-navigation-rail-action-background-color: var(--obap-accent-color, #ec407a);
                --obap-navigation-rail-background-color: var(--obap-primary-color, #5c6bc0);

                --obap-navigation-rail-badge-color: var(--obap-primary-color, #5c6bc0);
                --obap-navigation-rail-badge-background-color: var(--obap-on-primary-color, white);

                --obap-navigation-rail-item-size: 72px;

                display: inline-block;
                position: relative;
                width: var(--obap-navigation-rail-item-size);
                min-width: var(--obap-navigation-rail-item-size);
                height: 100%;
                color: var(--obap-navigation-rail-color);
                background: var(--obap-navigation-rail-background-color);
                overflow: hidden;
            }

            :host([expanded]) {
                width: auto;
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
                align-items: center;
            }

            .action {
                height: 72px;
                padding: 0 16px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: start;
            }

            .action-button {
                --obap-button-ripple-color: var(--obap-navigation-rail-action-color);
                --obap-button-color: var(--obap-navigation-rail-action-color);
                --obap-button-background-color: var(--obap-navigation-rail-action-background-color);
            }
        `];
    }

    static get properties() {
        return {
            collapsible: {
                type: Boolean,
                attribute: 'collapsible',
                reflect: true
            },

            expanded: {
                type: Boolean,
                attribute: 'expanded',
                reflect: true
            },

            actionIcon: {
                type: String,
                attribute: 'action-icon'
            },

            actionLabel: {
                type: String,
                attribute: 'action-label'
            },

            elevation: {
                type: Number,
                attribute: 'elevation',
                reflect: true
            }
        }
    }

    constructor() {
        super();

        this.collapsible = false;
        this.expanded = false;
        this.actionIcon = '';
        this.actionLabel = '';
        this.elevation = 0;
        this._boundHandleMouseEnterEvent = this._handleMouseEnterEvent.bind(this);
        this._boundHandleMouseLeaveEvent = this._handleMouseLeaveEvent.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('mouseenter', this._boundHandleMouseEnterEvent);
        this.addEventListener('mouseleave', this._boundHandleMouseLeaveEvent);
    }

    disconnectedCallback() {
        this.removeEventListener('mouseenter', this._boundHandleMouseEnterEvent);
        this.removeEventListener('mouseleave', this._boundHandleMouseLeaveEvent);
        super.disconnectedCallback();
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            if ((propName === 'items') || (propName === 'collapsible') || (propName === 'expanded')) {
                this._updateItems();
            }
        });
    }
    
    render() { 
        return html`
            ${this.actionIcon ? this._renderAction(this.actionIcon, this.actionLabel) : null}
            <div class="container">
                <slot></slot>
            </div>
        `;
    }

    _renderAction(actionIcon, actionLabel) {
        return html`
            <div class="action">
                <obap-button @click="${this._handleActionClick}" class="action-button" round raised icon="${actionIcon}" label="${this.expanded ? this.actionLabel : ''}"></obap-button>
            </div>
        `;
    }

    _updateItems() {
        this.items.forEach((item) => {
            item._collapsible = this.collapsible;
            item._expanded = this.expanded;
        });
    }

    _handleMouseEnterEvent(e) {
        if (this.collapsible) {
            this.expanded = true;
        }
    }

    _handleMouseLeaveEvent(e) {
        if (this.collapsible) {
            this.expanded = false;
        }
    }

    _handleActionClick() {
        this.dispatchEvent(new CustomEvent('obap-navigation-rail-action', {
            bubbles: true,
            composed: true,
            detail: {
                selectedIndex: this.selectedIndex,
                selectedItem: this.items[this.selectedIndex]
            }
        }));
    }
}

window.customElements.define('obap-navigation-rail', ObapNavigationRail);