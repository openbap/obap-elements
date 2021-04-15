/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import {ObapTreeviewItemController} from './obap-treeview-item-controller.js';
import {classMap} from 'lit-html/directives/class-map.js';
import '../obap-icon/obap-icon.js';
import '../obap-check/obap-check.js';

/**
 * A Material Design heirarchical treeview.
 */
export class ObapTreeviewItem extends ObapTreeviewItemController(ObapElement) {
    static get styles() {
        return [css`
            :host {
                display: block;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .arrow-icon {
                width: 16px;
                height: 16px;
                cursor: pointer;
            }

            .custom-icon {
                width: 16px;
                height: 16px;
                margin-right: 4px;
            }

            obap-treeview-item[indent] {
                margin-left: 16px;
            }

            .top {
                display: flex;
                align-items: center;
                height: 24px;
            }

            .label {
                margin-left: 2px;
                padding: 2px 4px;
            }

            .label-select:hover {
                background: #E0E0E0;
            }

            .label-select {
                cursor: pointer;
            }

            .label[selected] {
                color: var(--obap-on-primary-color, #FFFFFF);
                background: var(--obap-primary-color, #5c6bc0);
            }

            .items {
                display: none;
            }

            .items[open] {
                display: block;
            }

            .icon {
                width: 16px;
                height: 16px;
                margin-right: 2px;
            }

            .check {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        `];
    }

    render() {
        return html`<div class="container">
            <div class="top">
                <div class="icon" @click="${this._handleItemClick}">
                    ${this._renderOpenCloseIcon()}
                </div>
                ${(this.icon) ? html`<obap-icon class="custom-icon" icon="${this.icon}"></obap-icon>` : null}
                <div class="check">
                    ${this._renderCheck()}
                </div>
                ${this._renderlabel()}
            </div>
            <div class="items" ?open="${this.open}">
                ${this._renderItems()}
            </div>
        </div>`;
    }

    _renderlabel() {
        let selectable = (this.selectMode === 'single');

        if (selectable) {
            if (this.selectLeafOnly && this.items && (this.items.length > 0)) {
                selectable = false;
            }
        }

        const classes = {'label-select' : selectable};

        return this.label ? html`
            <div class="${classMap(classes)} label" ?selected="${this.selected && this.selectMode === 'single'}" @click="${this.selectMode === 'single' ? this._handleItemSelected : null}">${this.label}</div>
        ` : null
    }

    _renderItems() {
        if ((this.items) && (this.items.length > 0)) {
            return this.items.map((item) => html`
                <obap-treeview-item ?indent="${this.label}" label="${item.label ? item.label : ''}" .items="${item.items}" select-mode="${this.selectMode}" 
                                    ?select-leaf-only="${this.selectLeafOnly}" icon="${item.icon ? item.icon : ''}" .item="${item}" ?selected="${item.selected}"
                                    open-icon="${item.openIcon ? item.openIcon : this.openIcon}" close-icon="${item.closeIcon ? item.closeIcon : this.closeIcon}"
                >
                </obap-treeview-item>`)
        }

        return null;
    }

    _renderOpenCloseIcon() {
        if ((this.items) && (this.items.length > 0)) {
            let icon = '';

            if (this.open) {
                icon = this.openIcon ? this.openIcon : 'core:arrow-drop-down';
            } else {
                icon = this.closeIcon ? this.closeIcon : 'core:arrow-drop-right';
            }

            return html`<obap-icon class="arrow-icon" icon="${icon}"></obap-icon>`
        }

        return null;
    }

    _renderCheck() {
        if (this.selectMode === 'multiple') {
            if (this.selectLeafOnly) {
                return (!this.items || this.items.length === 0) ? this._renderSingleCheck() : null;
            } else {
                return this._renderSingleCheck();
            }
        }

        return null;
    }

    _renderSingleCheck() {
        return html`<obap-check @obap-item-selected="${this._handleItemSelected}" no-ink ?selected="${this.selected}" ?indeterminate="${this.indeterminate}" name="${this.label}" aria-label="${this.label}"></obap-check>`;
    }

    _handleItemClick(e) {
        if ((this.items) && (this.items.length > 0)) {
            this.open = !this.open
        }
    }

    _handleItemSelected(e) {
        this._selectionSource = true;

        if (this.selectMode === 'single') {
            if (this.selectLeafOnly) {
                if (!this.items || (this.items.length === 0)) {
                    this.selected = !this.selected;
                }
            } else {
                this.selected = !this.selected;
            }
        } else {
            this.selected = e.detail.selected;
        }
        
        this._selectionSource = false;
    }
}

window.customElements.define('obap-treeview-item', ObapTreeviewItem);