/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import { body, caption } from '../../src/obap-styles/obap-typography.js';
import '../../src/obap-selector/obap-selector.js';

export class SelectorDemo extends ObapElement {
    static get styles() {
        return [body, caption, css`
            :host {
                display: block;
            }
    
            .container {
                height: 100%;
            }

            .title {
                padding: 4px 8px;
                margin-bottom: 8px;
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
            }

            .item {
                padding: 4px;
                cursor: pointer;
            }

            .item[selected] {
                background: var(--obap-selection-color);
                color: var(--obap-on-selection-color);
            }

            obap-selector {
                width: 200px;
                border: 1px solid var(--obap-divider-on-surface-color);
            }

            .selector-container {
                display: flex;
            }

            .selector-item {
                display: flex;
                flex-direction: column;
                margin-right: 16px;
            }

            .description {
                padding: 4px;
            }
        `];
    }

    static get properties() {
        return {
            items: {
                type: Array
            },

            selectedItem: {
                type: Number
            },

            currentItem: {
                type: String
            },

            previousItem: {
                type: String
            },

            multiItems: {
                type: String
            }
        }
    }

    constructor() {
        super();

        this.selectedItem = 0;
        this.currentItem = 'null';
        this.previousItem = 'null';
        this.multiItems = '';

        this.items = [
            { caption: "Item 1", selected: false },
            { caption: "Item 2", selected: true },
            { caption: "Item 3", selected: true },
            { caption: "Item 4", selected: false },
            { caption: "Item 5", selected: false }
        ];
    }

    render() {
        return html`
            <div class="container">
                <div class="title">Selector</div>
                <div class="selector-container">
                    <div class="selector-item">
                        <div class="description typography-caption">Single Select</div>
                        <obap-selector selected-index="${this.selectedItem}" @obap-item-selected="${this._itemSelected}" @obap-item-deselected="${this._itemDeselected}">
                            ${this.items.map(item => html`<div class="item typography-body">${item.caption}</div>`)}
                        </obap-selector>
                        <div class="description typography-caption">${`${this.previousItem} -> ${this.currentItem}`}</div>
                    </div>

                    <div class="selector-item">
                        <div class="description typography-caption">Multi Select</div>
                        <obap-selector selected-index="${this.selectedItem}" multi @obap-item-selected="${this._multiItemSelectionChanged}" @obap-item-deselected="${this._multiItemSelectionChanged}">
                            ${this.items.map(item => html`<div .item="${item}" class="item typography-body" ?selected="${item.selected}">${item.caption}</div>`)}
                        </obap-selector>
                        <div class="description typography-caption">${this.multiItems}</div>
                    </div>
                </div>
            </div>
        `;
    }

    _itemSelected(e) {
        if (e.detail.index === -1) {
            this.currentItem = 'null';
        } else {
            this.currentItem = this.items[e.detail.index].caption;
        }
    }

    _itemDeselected(e) {
        if (e.detail.index === -1) {
            this.previousItem = 'null';
        } else {
            this.previousItem = this.items[e.detail.index].caption;
        }
    }

    _multiItemSelectionChanged(e) {
        this.multiItems = e.target.selectedItems.map((index) => {return this.items[index].caption}).join(', ');
    }
}

window.customElements.define('selector-demo', SelectorDemo);