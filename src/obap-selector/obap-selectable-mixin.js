/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
/**
@element ObapSelectableMixin

@prop {Array}  [items=[]] 
*/
export const ObapSelectableMixin = (superClass) =>
    class ObapSelectableMixinComponent extends superClass {
        get selectedIndex() {
            return this._selectedIndex;
        }

        set selectedIndex(value) {
            const oldValue = this.selectedIndex;

            if (oldValue != value) {
                this._selectedIndex = value;
                this._changeSelection(this.selectedIndex, oldValue);
                this.requestUpdate('selectedIndex', oldValue);
            }
        }

        get items() {
            return this._items;
        }

        set items(value) {
            throw '"items" is read only';
        }

        static get properties() {
            return {
                /**
                Gets or sets the selected element index.
                @type {Number}
                @default -1
                */
                selectedIndex: {
                    type: Number,
                    attribute: 'selected-index',
                    hasChanged(newVal, oldVal) {
                        return newVal !== oldVal;
                    }
                },

                /**
                (readonly) - The list of items from which a selection can be made.
                @default []
                */
                items: {
                    type: Array
                }
            }
        }

        constructor() {
            super();

            this._boundHandleSelectionEvent = this._handleSelectionEvent.bind(this);
            this._boundHandleSlotChangeEvent = this._handleSlotChangeEvent.bind(this);
            this._selectedIndex = -1;
            this._items = [];
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

        select(index) {
            this.selectedIndex = index;
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
 
            let items = slot.assignedNodes({ flatten: true }).filter((el) => {
                return (el.nodeType === 1) && (!el.hasAttribute('no-select'));
            });

            const oldItems = this._items;
            this._items = items;
            this._changeSelection(this.selectedIndex, -1);
            this.requestUpdate('items', oldItems);
        }

        _handleSlotChangeEvent(e) {
            this._populateItems();
        }

        _handleSelectionEvent(e) {
            this._changeSelection(this.items.indexOf(e.target), this.selectedIndex);
        }

        _deselectItem(index) {
            const item = this.items[index];

            if (!item) {
                return true;
            }

            if (this._fireEvent('obap-item-deselecting', {item: item, index: index}, true)) {
                item.removeAttribute('selected');
                this._fireEvent('obap-item-deselected', {item: item, index: index}, false);

                return true;
            } else {
                return false;
            }
        }

        _selectItem(index) {
            const item = this.items[index];

            if (!item) {
                return true;
            }

            if (this._fireEvent('obap-item-selecting', {item: item, index: index}, true)) {
                item.setAttribute('selected', '');
                this._fireEvent('obap-item-selected', {item: item, index: index}, false);
                return true;
            } else {
                return false;
            }
        }

        _changeSelection(newIndex, oldIndex) {
            if ((newIndex === -1) || (this.items.length === 0) || (newIndex === oldIndex)) {
                return;
            }

            if (this._deselectItem(oldIndex) && this._selectItem(newIndex)) {
                this.selectedIndex = newIndex;
            }
        }

        _fireEvent(name, detail, cancelable) {
            const event = new CustomEvent(name, {
                bubbles: true,
                composed: true,
                cancelable: cancelable,
                detail: detail
            });

            return this.dispatchEvent(event);
        }
    };