/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapSelectController } from  '../obap-select-container/obap-select-controller.js';
import { body } from '../obap-styles/obap-typography.js';
import '../obap-select-container/obap-select-container.js';
import '../obap-selector/obap-selector.js';

/**
 * A single option dropdown selector.
 */
export class ObapSelect extends ObapSelectController(ObapElement) {
    static get styles() {
        return [body, css`
            :host {
                display: inline-block;
                outline: 0;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                height: 32px;
            }

            obap-select-container {
                height: 100%;
            }

            obap-selector {
                background: var(--obap-surface-color, #FFFFFF);
                cursor: pointer;
            }

            .item {
                height: 24px;
                padding: 0 8px;
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            .item > * {
                pointer-events: none;
            }

            .item:hover {
                background: var(--obap-selection-color, #E0E0E0);
            }

            .item[active] {
                background: var(--obap-selection-color, #E0E0E0);
            }

            :host(:not([multi])) > * .item[selected] {
                color: var(--obap-on-primary-color, #FFFFFF);
                background: var(--obap-primary-color, #5c6bc0);
            }

            .check-container {
                height: 14px;
                width: 14px;
                margin-left: -4px;
                padding-right: 4px;
            }

            .check {
                display: none;
                height: 14px;
                width: 14px;
                user-select: none;
                stroke: var(--obap-text-icon-color, rgba(0, 0, 0, 0.38));
                fill: var(--obap-text-icon-color, rgba(0, 0, 0, 0.38));
            }

            .item[selected] > * .check {
                display: block;
            }
        `];
    }

    static get properties() {
        return {
            selectedIndex: {
                type: Number,
                attribute: 'selected-index'
            },

            items: {
                type: Array
            },

            selectedItemIndexes: {
                type: Array
            },

            multi: {
                type: Boolean,
                attribute: 'multi',
                reflect: true
            }
        } 
    }
    
    constructor() {
        super();
        this.role = 'combobox';
        this.selectedIndex = -1;
        this.items = [];
        this.selectedItemIndexes = [];
        this.multi = false;
    }

    connectedCallback() {
        super.connectedCallback();

        this.setAttribute('aria-autocomplete', 'none');
        this.setAttribute('aria-haspopup', true);
        this.setAttribute('aria-readonly', true);
        this.setAttribute('aria-expanded', false);
        this.setAttribute('aria-owns', 'selector');
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        this._selector = this.renderRoot.getElementById('selector');

        changedProperties.forEach((oldValue, propName) => {
            if (propName === 'opened') {
                this.setAttribute('aria-expanded', this.opened);
            }

            if (propName === 'label') {
                this.setAttribute('aria-label', this.label ? this.label : 'Select');
            }

            if (propName === 'selectedIndex') {
                if (this.selectedIndex !== -1) {
                    this._updateValue();
                    this.requestUpdate();
                }

                if (this.selectedIndex !== oldValue) {
                    this.fireMessage('obap-select-changed', {
                        selectedIndex: this.selectedIndex,
                        selectedIndexes: this.selectedItemIndexes
                    });
                }
            }
        });
    }
    
    render() {
        return html`
            <div class="container typography-body">
                <obap-select-container id="select-container" value="${this.value}" label="${this.label}" icon="${this.icon}" border-style="${this.borderStyle}" 
                                    ?no-float-label="${this.noFloatLabel}" ?opened="${this.opened}" @obap-select-action="${this._handleAction}">
                    <div role="presentation">
                        <obap-selector id="selector" role="listbox" aria-label="${this.label}" aria-multiselectable="${this.multi}" selector-type="${this.multi ? 'multi' : 'single'}" @obap-item-selected="${this._handleItemClick}" @obap-item-deselected="${this._handleItemClick}">
                            ${this.items.map((item, index) => html`
                                <div role="option" aria-selected="${this._isSelected(index)}" class="item" ?selected="${this._isSelected(index)}">
                                    ${this._renderCheck()}
                                    <div>${item}</div>
                                </div>
                            `)}
                        </obap-selector>
                    </div>
                </obap-select-container>
            </div>
        `;
    }

    _isSelected(index) {
        return this.multi ? this.selectedItemIndexes.indexOf(index) > -1 : index === this.selectedIndex;
    }

    _renderCheck() {
        if (this.multi) {
            return html`
                <div class="check-container">
                    <svg class="check" viewBox="0 0 24 24"><g><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></g></svg>
                </div>
            `;
        } else {
            return null;
        }
    }

    _handleItemClick(e) {
        e.stopPropagation();
        const container = this.renderRoot.getElementById('select-container');
        container.opened = false;
        this.selectedIndex = e.detail.index;

        if (this.multi) {
            this.selectedItemIndexes = this._selector.selectedItems;
            this._updateValue();
        } else {
            this.selectedItemIndexes = [this.selectedIndex];
        }
    }   

    _updateValue() {
        if (this.multi) {
            this.value = this.items.filter((item, index) => this._selector.selectedItems.indexOf(index) > -1).join(', ');
        } else {
            this.value = this.items[this.selectedIndex];
        }
    }

    _handleAction(e) {
        const action = e.detail.action;

        switch (action) {
            case 'move-up': {
                this._selector.activatePrevious();
                break;
            }

            case 'move-down': {
                this._selector.activateNext();
                break;
            }

            case 'select': {
                this._selector.select(this._selector.activeIndex);
                this._selector.activeIndex = -1;
                break;
            }

            case 'closed': {
                this._selector.activeIndex = -1;
                break;
            }
        }
    }
}

window.customElements.define('obap-select', ObapSelect);
