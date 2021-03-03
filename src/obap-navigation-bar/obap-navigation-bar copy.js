/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import '../obap-selector/obap-selector.js';
import '../obap-icon/obap-icon.js';
import { hostElevation } from '../obap-styles/obap-elevation.js';
import { body, caption, subtitle } from '../obap-styles/obap-typography.js';
/**
 * A Material Design navigation bar for view and sub-view based applications.
 */
export class ObapNavigationBar extends ObapElement {
    static get styles() {
        return [hostElevation, body, caption, subtitle, css`
            :host {
                
                --obap-navigation-bar-color: rgba(255, 255, 255, 0.7);
                --obap-navigation-bar-active-color: var(--obap-on-primary-color, white);
                --obap-navigation-bar-background-color: var(--obap-primary-color, #5c6bc0);
                --obap-navigation-bar-selected-background-color: var(--obap-selection-color, #E0E0E0);

                --obap-navigation-bar-badge-color: var(--obap-primary-color, #5c6bc0);
                --obap-navigation-bar-badge-background-color: var(--obap-on-primary-color, white);
                
                display: block;
                
                height: 100%;
                color: var(--obap-navigation-bar-color, rgba(255, 255, 255, 0.7));
                background: var(--obap-navigation-bar-background-color, #5c6bc0);
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                height: 100%;
                display: flex;
            }

            .left-container {
                min-width: 72px;
                height: 100%;
                display: flex;
                flex-direction: column;
            }

            .right-container {
                flex: 1;
                display: flex;
                flex-direction: column;
                height: 100%;
                min-width: 144px;
                box-sizing: border-box;
                padding: 8px;
                background: var(--obap-surface-color, #FFFFFF);
                color: var(--obap-on-surface-color, rgba(0, 0, 0, 0.87));
            }

            .item-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                min-width: 72px;
                height: 72px;
                box-sizing: border-box;
                padding: 8px;
                cursor: pointer;
            }

            .item-container > * {
                pointer-events: none;
            }

            .item-container[selected] {
                color: var(--obap-navigation-bar-active-color, white);
            }

            .sub-item-container {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 32px;
                box-sizing: border-box;
                padding: 0 8px;
                cursor: pointer;
                border-radius: 3px;
            }

            .sub-item-container > * {
                pointer-events: none;
            }

            .sub-item-container[selected] {
                /*color: var(--obap-navigation-bar-active-color, white);*/
                background: var(--obap-navigation-bar-selected-background-color, #E0E0E0);
            }

            .sub-item-container[hide-item] {
                display: none;
            }

            .spacer {
                flex: 1;
                pointer-events: none;
            }

            obap-selector {
                flex: 1;
                display: flex;
                flex-direction: column;
            }

            .item-icon {
                --obap-icon-width: 24px;
                --obap-icon-height: 24px;
                flex: 1;
            }

            .item-icon[large-icon] {
                --obap-icon-width: 32px;
                --obap-icon-height: 32px;
            }

            .sub-item-label {
                flex: 1;
            }

            .sub-item-icon {
                margin-right: 8px;
            }

            .right-container-title {
                border-bottom: 1px solid var(--obap-divider-on-surface-color, rgba(0, 0, 0, 0.20));
                margin-bottom: 8px;
            }
        `];
    }

    static get properties() {
        return {
            elevation: {
                type: Number,
                attribute: 'elevation',
                reflect: true
            },

            selectedIndex: {
                type: Number,
                attribute: 'selected-index'
            },

            selectedSubIndex: {
                type: Number,
                attribute: 'selected-sub-index'
            },

            items: {
                type: Array
            },

            hideLabels: {
                type: Boolean,
                attribute: 'hide-labels'
            },

            hideIcons: {
                type: Boolean,
                attribute: 'hide-icons'
            },

            selectedItem: {
                type: Object
            },

            selectedSubItem: {
                type: Object
            }
        }
    }

    get selectedItem() {
        return this._selectedItem;
    }

    get selectedSubItem() {
        return this._selectedSubItem;
    }

    constructor() {
        super();
        this.elevation = 0;
        this.selectedIndex = -1;
        this.selectedSubIndex = -1;
        this._selectedItem = null;
        this._selectedSubItem = null;
        this.items = [];
        this.hideLabels = false;
        this.hideIcons = false;
    }

    connectedCallback() {
        super.connectedCallback();

    }

    disconnectedCallback() {

        super.disconnectedCallback();
    }

    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);

    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            if ((propName === 'items') || (propName === 'selectedIndex')) {
                const oldItem = this.selectedItem;
                this._selectedItem = this.items[this.selectedIndex];
                this.requestUpdate('selectedItem', oldItem);
            } else if (propName === 'selectedSubIndex' && this.selectedItem && this.selectedItem.items) {
                const oldItem = this.selectedSubItem;
                this._selectedSubItem = this.selectedItem.items[this.selectedItem.selectedIndex];
                this.requestUpdate('selectedSubItem', oldItem);
            } 
        });
    }


    render() {
        return html`
            <div class="container">
                <div class="left-container">
                    <slot></slot>
                    <obap-selector selected-index="${this.selectedIndex}" @obap-item-selected="${this._itemSelected}">
                        ${this.items.filter(item => !item.bottom).map(item => this._renderItem(item))}
                        <div class="spacer" no-select></div>
                        ${this.items.filter(item => item.bottom).map(item => this._renderItem(item))}
                    </obap-selector>  
                </div>

                ${this._renderRightContainer()}
            </div>
        `;
    }

    _renderRightContainer() {
        if (this.selectedItem && this.selectedItem.items && this.selectedItem.items.length > 0) {
            return html`
                <div class="right-container">
                    <div class="typography-subtitle right-container-title">${this.selectedItem.label}</div>
                    <obap-selector selected-index="${this._getSelectedItemChildIndex(this.selectedSubIndex)}" @obap-item-selected="${this._subItemSelected}">
                        ${this.selectedItem.items ? this.selectedItem.items.filter(item => !item.bottom).map(item => this._renderSubItem(item)) : null}
                        <div class="spacer" no-select></div>
                        ${this.selectedItem.items ? this.selectedItem.items.filter(item => item.bottom).map(item => this._renderSubItem(item)) : null}
                    </obap-selector>  
                </div>
            `;
        }

        return null;
    }

    _renderItem(item) {
        return html`
            <div class="item-container">
                <obap-icon class="item-icon" ?large-icon="${this.hideLabels}" icon="${ifDefined(item.icon)}" src="${ifDefined(item.iconSrc)}"></obap-icon>
                ${!this.hideLabels ? html`<div class="item-label typography-caption">${item.label}</div>` : null}
            </div>
        `;
    }

    _renderSubItem(item) {
        return html`
            <div class="sub-item-container" ?hide-item="${item.noNavigation}">
                ${!this.hideIcons && (item.icon || item.iconSrc) ? html`<obap-icon class="sub-item-icon" icon="${ifDefined(item.icon)}" src="${ifDefined(item.iconSrc)}"></obap-icon>` : null}
                <div class="sub-item-label typography-body">${item.label}</div>
            </div>
        `;
    }

    _getSelectedItemChildIndex(subIndex) {
        let index = -1;
        
        if (this.selectedItem) {
            index = subIndex;

            if ((index === undefined) || (index === null) || (index < 0) || (index > this.selectedItem.items.length - 1)) {
                if ((this.selectedItem.items) && (this.selectedItem.items.length > 0)) {
                    index = 0;
                } else {
                    index = -1;
                }
            }

            this.selectedItem.selectedIndex = index;
        }
        
        return index;
    }

    _itemSelected(e) {
        this.selectedIndex = e.detail.index;
        this._fireSelectionChangeMessage();
    }

    _subItemSelected(e) {
        this.selectedItem.selectedIndex = e.detail.index;
        this.selectedSubIndex = this.selectedItem.selectedIndex;
        this._fireSelectionChangeMessage();
    }

    _fireSelectionChangeMessage() {
        requestAnimationFrame(() => {
            if (this.selectedItem) {
                const msg =  {
                    index: this.selectedIndex,
                    subIndex: (this.selectedItem.selectedIndex !== undefined && this.selectedItem.selectedIndex !== null) ? this.selectedItem.selectedIndex : -1
                }

                this.fireMessage('obap-navigation-bar-change', msg);
            }
        });
    }
}

window.customElements.define('obap-navigation-bar', ObapNavigationBar);
