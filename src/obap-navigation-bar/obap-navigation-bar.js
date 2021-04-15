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

                --obap-navigation-bar-normal-size: 72px;
                --obap-navigation-bar-no-label-size: 56px;
                --obap-navigation-bar-collapsed-size: 48px;
                
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
                min-width: var(--obap-navigation-bar-normal-size);
                height: 100%;
                display: flex;
                flex-direction: column;
            }

            .left-container[no-labels] {
                min-width: var(--obap-navigation-bar-no-label-size);
            }

            .left-container[horizontal] {
                min-width: var(--obap-navigation-bar-collapsed-size);
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
                min-width: var(--obap-navigation-bar-normal-size);
                height: var(--obap-navigation-bar-normal-size);
                box-sizing: border-box;
                padding: 8px;
                cursor: pointer;
            }

            .item-container[no-labels] {
                min-width: var(--obap-navigation-bar-no-label-size);
                height: var(--obap-navigation-bar-no-label-size);
            }

            .horizontal-item-container {
                display: flex;
                align-items: center;
                justify-content: center;
                min-width: var(--obap-navigation-bar-collapsed-size);
                height: var(--obap-navigation-bar-collapsed-size);
                box-sizing: border-box;
                padding: 8px;
                cursor: pointer;
            }

            .horizontal-item-container[open] {
                justify-content: flex-start;
                padding-left: calc(12px + (var(--obap-navigation-bar-collapsed-size) - 48px) / 2);
            }

            .item-container > *, .horizontal-item-container > * {
                pointer-events: none;
            }

            .item-container[selected], .horizontal-item-container[selected] {
                color: var(--obap-navigation-bar-active-color, white);
            }

            .item-container:hover, .horizontal-item-container:hover {
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
                border-radius: var(--obap-border-radius-normal, 3px);
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

            .horizontal-item-icon {
                --obap-icon-width: 24px;
                --obap-icon-height: 24px;
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

            .horizontal-item-label {
                margin-left: 16px;
                margin-right: 16px;
                flex: 1;
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

            hideTitle: {
                type: Boolean,
                attribute: 'hide-title'
            },

            hideLabels: {
                type: Boolean,
                attribute: 'hide-labels'
            },

            hideIcons: {
                type: Boolean,
                attribute: 'hide-icons'
            },

            collapsible: {
                type: Boolean
            },

            horizontal: {
                type: Boolean
            },

            selectedItem: {
                type: Object
            },

            selectedSubItem: {
                type: Object
            },

            open: {
                type: Boolean
            },

            hovering: {
                type: Boolean
            }
        }
    }

    get items() {
        return this._items;
    }

    set items(value) {
        const oldValue = this.items;

        if (oldValue !== value) {
            this._items = value;

            this.requestUpdate('items', oldValue);

            if (this.selectedIndex > -1) {
                const oldIndex = this.selectedIndex;
                this.selectedIndex = -1;
                this.selectedIndex = oldIndex;
            }
        }
    }

    get selectedItem() {
        return this._selectedItem;
    }

    get selectedSubItem() {
        return this._selectedSubItem;
    }

    get selectedIndex() {
        return this._selectedIndex;
    }

    set selectedIndex(value) {
        if (this.selectedIndex !== value) {
            const oldValue = this.selectedIndex;
            this._selectedIndex = value;
            this.requestUpdate('selectedIndex', oldValue);

            if ((this._selectedIndex > -1) && (this._selectedIndex < this.items.length)) {
                
                const oldItem = this.selectedItem;
                this._selectedItem = this.items[this._selectedIndex];
                this.requestUpdate('selectedItem', oldItem);

                //this.selectedSubIndex = this._selectedItem.subIndex;

                
                if (this._selectedItem.subIndex === undefined) {
                    if (this._selectedItem.items && this._selectedItem.items.length > 0) {
                        this.selectedSubIndex = 0;
                    } else {
                        this.selectedSubIndex = -1;
                    }
                } else {
                    this.selectedSubIndex = this._selectedItem.subIndex;
                }
                
            }

            this._fireSelectionChangeMessage();
        }
    }

    get selectedSubIndex() {
        return this._selectedSubIndex;
    }

    set selectedSubIndex(value) {
        if (this.selectedSubIndex !== value) {
            const oldValue = this.selectedSubIndex;
            this._selectedSubIndex = value;
            this.requestUpdate('selectedSubIndex', oldValue);

            if ((this.selectedItem) && (this._selectedSubIndex > -1) && (this.selectedItem.items) && (this._selectedSubIndex < this.selectedItem.items.length)) {
                const oldItem = this.selectedSubItem;
                this._selectedSubItem = this.selectedItem.items[this._selectedSubIndex];
                this.selectedItem.subIndex = this._selectedSubIndex;
                this.requestUpdate('selectedSubItem', oldItem);
            }

            this._fireSelectionChangeMessage();
        }
    }

    get hovering() {
        return this._hovering;
    }

    constructor() {
        super();
        this.role = 'navigation';
        this.elevation = 0;
        this._selectedIndex = -1;
        this._selectedSubIndex = -1;
        this._selectedItem = null;
        this._selectedSubItem = null;
        this._items = [];
        this.hideTitle = false;
        this.hideLabels = false;
        this.hideIcons = false;
        this.collapsible = false;
        this.horizontal = false;
        this.open = false;
        this._hovering = false;
    }

    connectedCallback() {
        super.connectedCallback();
        this.setAttribute('aria-label', 'Navigation');
    }

    /*
    select(index, subIndex, resetPreviousSubIndex = false) {
        if (resetPreviousSubIndex && this.selectedItem) {
            this.selectedItem.subIndex = -1;
        }

        this.selectedIndex = index;
        this.selectedSubIndex = subIndex;

        //this.requestUpdate();
    }
    */

    render() {
        return html`
            <div class="container" @mouseleave="${this._onMouseLeave}" role="presentation">
                <div class="left-container" ?no-labels="${this.hideLabels}" ?horizontal="${this.horizontal}" @mouseenter="${this._onMouseEnter}" role="presentation">
                    <slot></slot>
                    <obap-selector role="tablist" selected-index="${this.selectedIndex}" @obap-item-selected="${this._itemSelected}">
                        ${this.items.filter(item => !item.bottom).map(item => this._renderItem(item))}
                        <div class="spacer" no-select role="presentation"></div>
                        ${this.items.filter(item => item.bottom).map(item => this._renderItem(item))}
                    </obap-selector>  
                </div>

                ${this._renderRightContainer()}
            </div>
        `;
    }

    _renderRightContainer() {
        if (this.hovering && this.selectedItem && this.selectedItem.items && this.selectedItem.items.length > 0) {
            return html`
                <div class="right-container" role="presentation">
                    ${!this.hideTitle ? html`<div class="typography-subtitle right-container-title" role="presentation">${this.selectedItem.label}</div>` : null}
                    <obap-selector role="tablist" selected-index="${this.selectedSubIndex}" @obap-item-selected="${this._subItemSelected}">
                        ${this.selectedItem.items ? this.selectedItem.items.filter(item => !item.bottom).map(item => this._renderSubItem(item)) : null}
                        <div class="spacer" no-select role="presentation"></div>
                        ${this.selectedItem.items ? this.selectedItem.items.filter(item => item.bottom).map(item => this._renderSubItem(item)) : null}
                    </obap-selector>  
                </div>
            `;
        }

        return null;
    }

    _renderItem(item) {
        if (this.horizontal) {
            return html`
                <div class="horizontal-item-container" ?open="${!this._hideItemLabel()}" role="tab">
                    <obap-icon class="horizontal-item-icon" icon="${ifDefined(item.icon)}" src="${ifDefined(item.iconSrc)}"></obap-icon>
                    <div ?hidden="${this._hideItemLabel(this.hovering)}" class="horizontal-item-label typography-body">${item.label}</div>
                </div>
            `;
        }
        return html`
            <div class="item-container" ?no-labels="${this.hideLabels}" role="tab">
                <obap-icon class="item-icon" icon="${ifDefined(item.icon)}" src="${ifDefined(item.iconSrc)}"></obap-icon>
                ${!this.hideLabels ? html`<div class="item-label typography-caption">${item.label}</div>` : null}
            </div>
        `;
    }

    _renderSubItem(item) {
        return html`
            <div class="sub-item-container" ?hide-item="${item.noNavigation}" role="tab">
                ${!this.hideIcons && (item.icon || item.iconSrc) ? html`<obap-icon class="sub-item-icon" icon="${ifDefined(item.icon)}" src="${ifDefined(item.iconSrc)}"></obap-icon>` : null}
                <div class="sub-item-label typography-body">${item.label}</div>
            </div>
        `;
    }

    _hideItemLabel() {
        if (this.collapsible) {
            return !this.hovering;
        }

        return !this.open;
    }

    _onMouseEnter() {
        this._hovering = true;
        this.requestUpdate('hovering', false);
    }

    _onMouseLeave() {
        this._hovering = false;
        this.requestUpdate('hovering', true);
    }

    _itemSelected(e) {
        this.selectedIndex = e.detail.index;
    }

    _subItemSelected(e) {
        this.selectedSubIndex = e.detail.index;
    }

    _fireSelectionChangeMessage() {
        requestAnimationFrame(() => {
            if (this.selectedItem) {
                const msg =  {
                    index: this.selectedIndex,
                    subIndex: this.selectedSubIndex
                }

                this.fireMessage('obap-navigation-bar-change', msg);
            }
        });
    }
}

window.customElements.define('obap-navigation-bar', ObapNavigationBar);
