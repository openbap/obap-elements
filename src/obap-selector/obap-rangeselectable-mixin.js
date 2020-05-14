/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { ObapMultiSelectableMixin } from './obap-multiselectable-mixin.js';

/**
 * `ObapRangeSelectableMixin`
 * 
 * @param {*} superClass 
 */
export const ObapRangeSelectableMixin = (superClass) =>
    class ObapRangeSelectableMixinComponent extends ObapMultiSelectableMixin(superClass) {
        static get properties() {
            return {
                /**
                The starting index of the range to select.
                */
                startIndex: {
                    type: Number,
                    attribute: 'start-index'
                },

                /**
                The end index of the range to select.
                */
                endIndex: {
                    type: Number,
                    attribute: 'end-index'
                },

                /**
                If this is set to a value greater than zero, then the user can select the range of that length with a single click by holding down the 'ctrl' key.
                */
                rangeLength: {
                    type: Number,
                    attribute: 'range-length'
                }
            }
        }

        constructor() {
            super();

            this.startIndex = -1;
            this.endIndex = -1;
            this.rangeLength = -1;
        }

        updated(changedProperties) {
            super.updated(changedProperties);

            if (this.selectorType === 'range') {
                changedProperties.forEach((oldValue, propName) => {
                    if ((propName === 'items') || (propName === 'startIndex') || (propName === 'endIndex')) {
                        this._selectRange();
                    }
                });
            }
        }

        select(index) {
            switch (this.selectorType) {
                case 'range': {
                    this._rangeItemSelected(index);
                    break;
                }

                default: {
                    super.select(index);
                }
            }
        }

        _changeSelection(newIndex, oldIndex) {
            switch (this.selectorType) {
                case 'range': {
                    this._rangeItemSelected(newIndex);
                    break;
                }

                default: {
                    super._changeSelection(newIndex, oldIndex);
                }
            }
        }

        _rangeItemSelected(index) {
            if ((this._ctrl) && (this.rangeLength > 0)) {
                const bc = index % this.rangeLength;
                const ac = this.rangeLength - bc - 1;
                let si = index - bc;
                let ei = index + ac;

                if (si < 0) si = 0;
                if (ei > this.items.length - 1) ei = this.items.length - 1;

                this.startIndex = si;
                this.endIndex = ei;
                return;
            }

            if ((this.startIndex < 0) && (this.endIndex < 0)) {
                this.startIndex = index;
                return;
            }

            if ((this.startIndex > -1) && (this.endIndex < 0)) {
                if (this.startIndex === index) {
                    this.startIndex = -1;
                } else {
                    this.endIndex = index;
                }

                return;
            }

            this.startIndex = index;
            this.endIndex = -1;
        }

        _selectRange() {
            const newItems = [];

            if ((this.startIndex > -1) && (this.endIndex > -1) && (this.startIndex !== this.endIndex)) {
                const min = Math.min(this.startIndex, this.endIndex);
                const max = Math.max(this.startIndex, this.endIndex);

                for (let i = min; i <= max; i++) {
                    newItems.push(i);
                }
            } else if (this.startIndex > -1) {
                newItems.push(this.startIndex);
            }

            this.selectedItems = newItems;

            for (let j = 0; j < this.items.length; j++) {
                if (this.selectedItems.indexOf(j) > -1) {
                    this._selectItem(j)
                } else {
                    this._deselectItem(j);
                }
            }
        }
    };