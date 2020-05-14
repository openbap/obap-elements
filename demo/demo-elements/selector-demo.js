/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import { body, caption } from '../../src/obap-styles/obap-typography.js';
import '../../src/obap-selector/obap-selector.js';
import '../../src/obap-icon/obap-icon.js';
import '../../src/obap-callout/obap-callout.js';

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

            obap-selector.grid {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                grid-template-rows: repeat(5, 1fr);
                gap: 4px;
                padding: 8px;
                width: auto;
            }

            .grid-item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                cursor: pointer;
            }

            .grid-item[selected] {
                background: var(--obap-primary-color);
                color: var(--obap-on-primary-color);
            }

            .grid-item:hover {
                background: var(--obap-primary-light-color);
                color: var(--obap-on-primary-color);
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

            div[no-select] {
                color: var(--obap-text-disabled-color);
                pointer-events: none;
            }

            div[other-month] {
                color: var(--obap-text-disabled-color);
            }

            div[day] {
                color: var(--obap-primary-color);
                font-weight: 500;
            }

            div[popup] {
                text-decoration: underline;
            }

            .callout-content {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              min-width: 64px;
            }

            obap-icon {
                margin-bottom: 4px;
            }

            obap-callout {
              --obap-callout-color: var(--obap-on-primary-color);
              --obap-callout-background-color: var(--obap-primary-light-color);
            }
        `];
    }

    static get properties() {
        return {
            items: {
                type: Array
            },

            numberItems: {
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

        this.numberItems = ['S', 'M', 'T', 'W', 'T', 'F', 'S', '29', '30'];

        for (let i = 1; i <= 31; i++) {
            this.numberItems.push(i);
        }

        this.numberItems.push(1);
        this.numberItems.push(2);
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
                        <obap-selector selected-index="${this.selectedItem}"  selector-type="multi" @obap-item-selected="${this._multiItemSelectionChanged}" @obap-item-deselected="${this._multiItemSelectionChanged}">
                            ${this.items.map(item => html`<div .item="${item}" class="item typography-body" ?selected="${item.selected}">${item.caption}</div>`)}
                        </obap-selector>
                        <div class="description typography-caption">${this.multiItems}</div>
                    </div>

                    <div class="selector-item">
                        <div class="description typography-caption">Range Select</div>
                        <obap-selector  selector-type="range" @obap-item-selected="${this._multiItemSelectionChanged}" @obap-item-deselected="${this._multiItemSelectionChanged}">
                            ${this.items.map(item => html`<div .item="${item}" class="item typography-body">${item.caption}</div>`)}
                        </obap-selector>
                        <div class="description typography-caption">${this.multiItems}</div>
                    </div>

                    <div class="selector-item">
                        <div class="description typography-caption">Single Select Grid</div>
                        <obap-selector class="grid">
                            ${this.numberItems.map((item, index) => this._renderItem(item, index))}
                        </obap-selector>
                    </div>

                    <div class="selector-item">
                        <div class="description typography-caption">Multi Select Grid</div>
                        <obap-selector class="grid"  selector-type="multi">
                            ${this.numberItems.map((item, index) => this._renderItem(item, index))}
                        </obap-selector>
                    </div>

                    <div class="selector-item">
                        <div class="description typography-caption">Range Select Grid</div>
                        <obap-selector class="grid"  selector-type="range" range-length="7">
                            ${this.numberItems.map((item, index) => this._renderItem(item, index))}
                        </obap-selector>
                    </div>
                </div>
            </div>
        `;
    }

    _renderItem(item, index) {
        if (index === 30) {
            return html`
                <div class="grid-item typography-caption" tabindex="0" popup ?day="${index < 7}" ?no-select="${index < 7}" ?other-month="${(index > 6 && (index < 9)) || index > 39}">
                    <obap-callout elevated anchor="middle-top" arrow-position="bottom" offset-y="-2">
                        <div class="callout-content typography-caption"><obap-icon icon="android"></obap-icon><div>Android Day</div></div>
                    </obap-callout>
                    ${item}
                </div>
                `;
        }

        return html`<div class="grid-item typography-caption" tabindex="0" ?day="${index < 7}" ?no-select="${index < 7}" ?other-month="${(index > 6 && (index < 9)) || index > 39}">${item}</div>`;
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