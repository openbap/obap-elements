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

            if ((oldValue != value) || (this.toggles)) {
                this._selectedIndex = value;
                this._changeSelection(this._selectedIndex, oldValue);
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
                },

                /**
                In single select mode, setting this to true deselects the item if you select it a second time.
                */
                toggles: {
                    type: Boolean,
                    attribute: 'toggles'
                },

                /**
                The type of selection allowed. Can be 'single' (default), 'multi' and 'range'. The last two are provided by the respective mixins.
                 */
                selectorType: {
                    type: String,
                    attribute: 'selector-type'
                }
            }
        }

        constructor() {
            super();

            this._boundHandleSelectionEvent = this._handleSelectionEvent.bind(this);
            this._boundHandleSlotChangeEvent = this._handleSlotChangeEvent.bind(this);
            this._selectedIndex = -1;
            this._selectable = true;
            this._items = [];
            this._ctrl = false;
            this.toggles = false;
            this.selectorType = 'single';
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
            this._ctrl = e.ctrlKey;
            this.select(this.items.indexOf(e.target));
            e.stopPropagation();
            this._ctrl = false;
        }

        _deselectItem(index) {
            const item = this.items[index];

            if (item) {
                item.removeAttribute('selected');
                this._fireEvent('obap-item-deselected', {item: item, index: index}, false);
            }
        }

        _selectItem(index) {
            const item = this.items[index];

            if (item) {
                item.setAttribute('selected', '');
                this._fireEvent('obap-item-selected', {item: item, index: index}, false);
            }
        }

        _changeSelection(newIndex, oldIndex) {
            if ((newIndex === -1) || (this.items.length === 0)) {
                return;
            }

            if (newIndex === oldIndex) {
                this._deselectItem(oldIndex);
                this._selectedIndex = -1;
                
                return;
            }

            if (this._fireEvent('obap-item-selecting', {newIndex: newIndex, oldIndex: oldIndex}, true)) {
                this._deselectItem(oldIndex);
                this._selectItem(newIndex);
                this._selectedIndex = newIndex;
            } else {
                this._selectedIndex = oldIndex;
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