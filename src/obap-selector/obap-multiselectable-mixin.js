/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { ObapSelectableMixin } from './obap-selectable-mixin.js';

export const ObapMultiSelectableMixin = (superClass) =>
    class ObapMultiSelectableMixinComponent extends ObapSelectableMixin(superClass) {
        static get properties() {
            return {
                /**
                If true, multiple selections are allowed..
                */
                multi: {
                    type: Boolean,
                    attribute: 'multi',
                    reflect: true
                },

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

            this.multi = false;
            this.selectedItems = [];
        }
        
        updated(changedProperties) {
            super.updated(changedProperties);

            changedProperties.forEach((oldValue, propName) => {
                if ((propName === 'items') && (this.multi)) {
                    this._preselectItems();
                }
            });
        }

        select(index) {
            if (this.multi) {
                this._toggleSelected(index);
            } else {
                super.select(index);
            }
        }

        _changeSelection(newIndex, oldIndex) {
            if (this.multi) {
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
                if (item.hasAttribute('selected')) {
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