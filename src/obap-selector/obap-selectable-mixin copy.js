/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
/**
@element ObapSelectableMixin
  

@prop {String}  [selectedClass=obap-selected] - 
@prop {Array}  [items=[]] 
@prop {Boolean} [disableSelection=false] - 
@prop {Object} [selectedItem=null] - 
@prop {Number} [selectedItemIndex=null] - 
*/
export const ObapSelectableMixin = (superClass) =>
    class ObapSelectableMixinComponent extends superClass {
        get selected() {
            return this.__selected;
        }

        set selected(value) {
            const oldValue = this.selected;

            if (oldValue != value) {
                this.__selected = parseInt(value);
                this._changeSelection(this.items[this.selected]);
                this.requestUpdate('selected', oldValue);
            }
        }

        get items() {
            return this.__items;
        }

        set items(value) {
            throw '"items" is read only';
        }

        get selectedItem() {
            return this.__selectedItem;
        }

        set selectedItem(value) {
            throw '"selectedItem" is read only';
        }

        get selectedItemIndex() {
            return this.__selectedItemIndex;
        }

        set selectedItemIndex(value) {
            throw '"selectedItemIndex" is read only';
        }

        static get properties() {
            return {
                /**
                Gets or sets the selected element. The default is to use the index of the item.
                @type {String}
                @default -1
                */
                selected: {
                    type: String,
                    attribute: 'selected',
                    hasChanged(newVal, oldVal) {
                        return newVal !== oldVal;
                    }
                },

                /**
                The attribute to set on elements when selected.
                */
                selectedAttribute: {
                    type: String,
                    attribute: 'selected-attribute'
                },

                /**
                The class to set on elements when selected.
                */
                selectedClass: {
                    type: String,
                    attribute: 'selected-class'
                },

                /**
                (readonly) - The list of items from which a selection can be made.
                @default []
                */
                items: {
                    type: Array
                },

                /**
                Set to true to prevent any selection.
                */
                disableSelection: {
                    type: Boolean,
                    attribute: 'disable-selection'
                },

                /**
                (readonly) - The currently selected item.
                @type {Object}
                @default null
                */
                selectedItem: {
                    type: Object
                },

                /**
                (readonly) - The index of the currently selected item.
                @default -1
                */
                selectedItemIndex: {
                    type: Number
                }
            }
        }

        constructor() {
            super();

            this._boundHandleSelectionEvent = this._handleSelectionEvent.bind(this);
            this._boundHandleSlotChangeEvent = this._handleSlotChangeEvent.bind(this);
            this.disableSelection = false;
            this.__selected = null;
            this.selectedAttribute = null;
            this.selectedClass = "obap-selected";
            this.__selectedItem = null;
            this.__selectedItemIndex = -1;
            this.__items = [];
        }

        connectedCallback() {
            super.connectedCallback();
            this.addEventListener('click', this._boundHandleSelectionEvent);
            this.renderRoot.addEventListener('slotchange', this._boundHandleSlotChangeEvent);
        }

        disconnectedCallback() {
            this.removeEventListener('click', this._boundHandleSelectionEvent);
            this.renderRoot.removeEventListener('slotchange', this._boundHandleSlotChangeEvent);
            super.disconnectedCallback();
        }

        select(value) {
            this.selected = value;
        }

        selectIndex(index) {
            this._changeSelection(this.items[index]);
        }

        selectNext() {
            if (this.selectedItemIndex < this.items.length - 1) {
                this.selectIndex(this.selectedItemIndex + 1);
            }
        }

        selectPrevious() {
            if (this.selectedItemIndex > 0) {
                this.selectIndex(this.selectedItemIndex - 1);
            }
        }

        /**
         Gets the index of an element, if it's a child of the selection list.
         *
         * @param {Object} item - The item for which to find the index.
         */
        indexOf(item) {
            return this.items.indexOf(item);
        }

        _populateItems() {
            let slot = this.renderRoot.querySelector('slot');
            if (!slot) return;

            let items = slot.assignedNodes({ flatten: true }).filter((el) => {
                return (el.nodeType === 1) && (!el.hasAttribute('no-select'));
            });

            items.forEach((item, index) => {
                if (index == this.selected) {
                    this._changeSelection(item);
                } else {
                    if (this.selectedAttribute) {
                        item.removeAttribute(this.selectedAttribute);
                    }

                    if (this.selectedClass) {
                        item.classList.remove(this.selectedClass);
                    }
                }
            });

            this.__items = items;
            this._changeSelection(this.items[this.selected]);
            this.requestUpdate();
        }

        _handleSlotChangeEvent(e) {
            this._populateItems();
        }

        _handleSelectionEvent(e) {
            if (this.disableSelection) {
                e.stopPropagation();
                return;
            }

            let target = e.target;

            while (target && target !== this) {
                let i = this.items.indexOf(target);

                if (i >= 0) {
                    let item = this.items[i];
                    this._changeSelection(item);
                    e.stopPropagation();
                    return;
                }

                target = target.parentNode;
            }
        }

        _deselectItem(item) {
            let index = this.items.indexOf(item);

            if (index === -1) {
                return true;
            }

            const deselectingEvent = new CustomEvent('obap-item-deselecting', {
                bubbles: true,
                composed: true,
                cancelable: true,
                detail: {
                    item: item,
                    index: index
                }
            });

            if (this.dispatchEvent(deselectingEvent)) {
                if (this.selectedAttribute) {
                    item.removeAttribute(this.selectedAttribute);
                }

                if (this.selectedClass) {
                    item.classList.remove(this.selectedClass);
                }

                this.dispatchEvent(new CustomEvent('obap-item-deselected', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        item: item,
                        index: index
                    }
                }));

                return true;
            } else {
                return false;
            }
        }

        _selectItem(item) {
            let index = this.items.indexOf(item);

            if (index === -1) {
                return true;
            }

            const selectingEvent = new CustomEvent('obap-item-selecting', {
                bubbles: true,
                composed: true,
                cancelable: true,
                detail: {
                    item: item,
                    index: index
                }
            });

            if (this.dispatchEvent(selectingEvent)) {
                if (this.selectedAttribute) {
                    item.setAttribute(this.selectedAttribute, '');
                }

                if (this.selectedClass) {
                    item.classList.add(this.selectedClass);
                }

                this.__selectedItem = item;
                this.__selectedItemIndex = index;

                this.dispatchEvent(new CustomEvent('obap-item-selected', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        item: this.selectedItem,
                        index: this.selectedItemIndex
                    }
                }));

                return true;
            } else {
                return false;
            }
        }

        _changeSelection(item) {
            if ((item === null) || (item === this.selectedItem) || this.items.length === 0) {
                return;
            };

            // Deselect old item.
            if (this.selectedItem) {
                if (!this._deselectItem(this.selectedItem)) {
                    return;
                }
            }

            // Select new item.
            let newSelected = this.items.indexOf(item);

            if (newSelected !== -1) {
                if (this._selectItem(item)) {
                    this.selected = newSelected;
                }
            } else {
                if (this._selectItem(null)) {
                    this.selected = -1;
                }
            }
        }
    };