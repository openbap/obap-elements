/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
/**
@element ObapSelectorController

@prop {Array}  [items=[]] 
*/
export const ObapSelectorController = (superClass) =>
    class ObapSelectorControllerComponent extends superClass {
        get selectedIndex() {
            return this._selectedIndex;
        }

        set selectedIndex(value) {
            const oldValue = this.selectedIndex;

            if ((oldValue != value) || (this.toggles)) {
                this._selectedIndex = value;
                this._changeSelection(this._selectedIndex, oldValue);
                this.activeIndex = -1;
                this.requestUpdate('selectedIndex', oldValue);
            }
        }

        get activeIndex() {
            return this._activeIndex;
        }

        set activeIndex(value) {
            const oldValue = this.activeIndex;

            if (oldValue != value) {
                if ((oldValue > -1) && (oldValue <= this.items.length - 1)) {
                    this.items[oldValue].removeAttribute(this.activeAttribute);
                }

                if ((value >= -1) && (value <= this.items.length - 1)) {
                    this._activeIndex = value;

                    if (value !== -1) {
                        this.items[value].setAttribute(this.activeAttribute, '');
                    }
                }

                this.requestUpdate('activeIndex', oldValue);
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
                    },
                    reflect: true
                },

                /**
                Gets or sets the active element index, which is used for display purposes.
                @type {Number}
                @default -1
                */
                activeIndex: {
                    type: Number,
                    attribute: 'active-index'
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
                },

                /**
                If true, items are selected on enter.
                */
                enterSelects: {
                    type: Boolean,
                    attribute: 'enter-selects'
                },

                /**
                The attribute to indicate selections.
                */
                selectedAttribute: {
                    type: String,
                    attribute: 'selected-attribute'
                },

                /**
                The attribute to indicate the active item.
                */
                activeAttribute: {
                    type: String,
                    attribute: 'active-attribute'
                },

                /**
                Disables mouse, touch and keyboard selection.
                */
                disableManualSelection: {
                    type: Boolean,
                    attribute: 'disable-manual-selection'
                }
            }
        }

        constructor() {
            super();

            this._boundHandleSelectionEvent = this._handleSelectionEvent.bind(this);
            this._boundHandleSlotChangeEvent = this._handleSlotChangeEvent.bind(this);
            this._boundHandleEnterEvent = this._handleEnterEvent.bind(this);
            this._activeIndex = -1;
            this._selectedIndex = -1;
            this._selectable = true;
            this._items = [];
            this._ctrl = false;
            this.toggles = false;
            this.disableManualSelection = false;
            this.enterSelects = false;
            this.selectorType = 'single';
            this.selectedAttribute = 'selected';
            this.activeAttribute = 'active';
        }

        updated(changedProperties) {
            super.updated(changedProperties);

            changedProperties.forEach((oldValue, propName) => {
                if ((propName === 'disabled') && (oldValue !== this.disabled)) {
                    this.items.forEach((item) => {
                        item.disabled = this.disabled;
                    });
                } else if ((propName === 'disableManualSelection') && (oldValue !== this.disableManualSelection)) {
                    this.disableManualSelection ? this._disableSelectionEventHandlers() : this._enableSelectionEventHandlers();
                }
            });
        }

        connectedCallback() {
            super.connectedCallback();
            this._enableSelectionEventHandlers();
            this.renderRoot.addEventListener('slotchange', this._boundHandleSlotChangeEvent);
        }

        disconnectedCallback() {
            this._disableSelectionEventHandlers();
            this.renderRoot.removeEventListener('slotchange', this._boundHandleSlotChangeEvent);
            super.disconnectedCallback();
        }

        _enableSelectionEventHandlers() {
            if ((!this.disableManualSelection) && (!this._selectionHandlersConnected)) {
                this.addEventListener('click', this._boundHandleSelectionEvent);
                this.addEventListener('keydown', this._boundHandleEnterEvent, { capture: true });
                this._selectionHandlersConnected = true;
            }
        }

        _disableSelectionEventHandlers() {
            if (this._selectionHandlersConnected) {
                this.removeEventListener('click', this._boundHandleSelectionEvent);
                this.removeEventListener('keydown', this._boundHandleEnterEvent);
            }
        }

        select(index) {
            this.selectedIndex = index;
        }

        activate(index) {
            this.activeIndex = index;
        }

        activateNext() {
            if (this.items.length > 0) {
                let newValue = this.activeIndex + 1;

                if (newValue <= this.items.length - 1) {
                    this.activeIndex = newValue;
                } else {
                    this.activeIndex = 0;
                }
            }
        }

        activatePrevious() {
            if (this.items.length > 0) {
                let newValue = this.activeIndex - 1;

                if (newValue < 0) {
                    this.activeIndex = this.items.length - 1;
                } else {
                    this.activeIndex = newValue;
                }
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

            let items = slot.assignedNodes({ flatten: true }).filter((el) => {
                return (el.nodeType === 1) && (!el.hasAttribute('no-select'));
            });

            if (this.disabled) {
                items.forEach((item) => {
                    item.disabled = this.disabled;
                });
            }

            const oldItems = this._items;
            this._items = items;
            this._changeSelection(this.selectedIndex, -1);
            this.requestUpdate('items', oldItems);
        }

        _handleSlotChangeEvent(e) {
            this._populateItems();
        }

        _handleSelectionEvent(e) {
            let index = this.items.indexOf(e.target);

            if (index > -1) {
                this._ctrl = e.ctrlKey;
                this.select(index);
                //e.stopPropagation();
                //e.stopImmediatePropagation();
                //e.preventDefault();
                this._ctrl = false;
            }
        }

        _handleEnterEvent(e) {

            switch (e.key) {
                case 'Enter': {
                    if (this.enterSelects) {
                        const index = this.indexOf(e.target);

                        if ((index > -1) && (!e.target.disabled)) {
                            this.select(index);
                        }
                    }

                    break;
                }

                /*
                case 'ArrowUp': {
                    if (this.items.length > 0) {
                        let newValue = this.activeIndex - 1;

                        if (newValue < 0) {
                            this.activeIndex = 0;
                        } else {
                            this.activeIndex = newValue;
                        }
                    }

                    break;
                }

                case 'ArrowDown': {
                    if (this.items.length > 0) {
                        let newValue = this.activeIndex + 1;

                        if (newValue <= this.items.length - 1) {
                            this.activeIndex = newValue;
                        } else {
                            this.activeIndex = 0;
                        }
                    }

                    break;
                }
                */
            }
        }

        _deselectItem(index) {
            if (index === -1) {
                this.items.forEach(item => item.removeAttribute(this.selectedAttribute));
            } else {
                const item = this.items[index];

                if (item) {
                    item.removeAttribute(this.selectedAttribute);
                    this.fireMessage('obap-item-deselected', { item: item, index: index }, false);
                }
            }
        }

        _selectItem(index) {
            const item = this.items[index];

            if (item) {
                item.setAttribute(this.selectedAttribute, '');
                this.fireMessage('obap-item-selected', { item: item, index: index }, false);
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

            const item = this.items[newIndex];

            if (this.fireMessage('obap-item-selecting', { newIndex: newIndex, oldIndex: oldIndex, item: item }, true)) {
                this._deselectItem(oldIndex);
                this._selectItem(newIndex);
                this._selectedIndex = newIndex;
            } else {
                this._selectedIndex = oldIndex;
            }
        }
    };