/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { ObapSelectorController } from './obap-selector-controller.js';

export const ObapMultiSelectorController = (superClass) =>
    class ObapMultiSelectorControllerComponent extends ObapSelectorController(superClass) {
        static get properties() {
            return {
                /**
                Returns an array of currently selected items.
                */
                selectedItems: {
                    type: Array,
                    attribute: 'selected-items'
                }
            }
        }

        constructor() {
            super();

            this.selectedItems = [];
        }
        
        updated(changedProperties) {
            super.updated(changedProperties);

            changedProperties.forEach((oldValue, propName) => {
                if ((propName === 'items') && (this.selectorType === 'multi')) {
                    this._preselectItems();
                }
            });
        }

        select(index) {
            if (this.selectorType === 'multi') {
                this._toggleSelected(index);
            } else {
                super.select(index);
            }
        }

        _changeSelection(newIndex, oldIndex) {
            if (this.selectorType === 'multi') {
                this._toggleSelected(newIndex);
            } else {
                super._changeSelection(newIndex, oldIndex);
            }
        }

        _toggleSelected(index) {
            const items = [...this.selectedItems];
            const i = items.indexOf(index);

            (i === -1) ? items.push(index) : items.splice(i, 1);
            items.sort((a, b) => a - b);
            this.selectedItems = items;
            (i === -1) ? this._selectItem(index) : this._deselectItem(index);
        }

        _preselectItems() {
            const items = [];

            this.items.forEach((item, index) => {
                if (item.hasAttribute(this.selectedAttribute)) {
                    items.push(index);
                }
            });

            if ((this.selectedIndex > -1) && (this.selectedItems.indexOf(this.selectedIndex) === -1)) {
                items.push(this.selectedIndex);
            }

            items.sort((a, b) => a - b);
            this.selectedItems = items;
            this.selectedItems.forEach((item) => this._selectItem(item));
        }
    };