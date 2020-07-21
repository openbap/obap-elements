/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
/**
Provides comon functionality for treeview items.
*/
export const ObapTreeviewItemController = (superClass) =>
    class ObapTreeviewItemControllerComponent extends superClass {
        static get properties() {
            return {
                label: {
                    type: String,
                    attribute: 'label'
                },

                icon: {
                    type: String,
                    attribute: 'icon'
                },

                open: {
                    type: Boolean,
                    attribute: 'open'
                },

                root: {
                    type: Boolean,
                    attribute: 'root'
                },

                items: {
                    type: Array
                },

                // none (default), single, multiple
                selectMode: {
                    type: String,
                    attribute: 'select-mode'
                },

                selectLeafOnly: {
                    type: Boolean,
                    attribute: 'select-leaf-only'
                },

                openIcon: {
                    type: String,
                    attribute: 'open-icon'
                },

                closeIcon: {
                    type: String,
                    attribute: 'close-icon'
                },

                item: {
                    type: Object
                },

                selected: {
                    type: Boolean,
                    attribute: 'selected',
                    reflect: true
                },

                indeterminate: {
                    type: Boolean,
                    attribute: 'indeterminate',
                    reflect: true
                }
            }
        }

        get selectLeafOnly() {
            return this._selectLeafOnly;
        }

        set selectLeafOnly(value) {
            const oldValue = this.selectLeafOnly;
            
            if (oldValue !== value) {
                this.selected = false;
                this._selectLeafOnly = value;
                
                this.requestUpdate('selectLeafOnly', oldValue);
            }
        }

        get selectMode() {
            return this._selectMode;
        }

        set selectMode(value) {
            const oldValue = this.selectMode;
            
            if (oldValue !== value) {
                this.selected = false;
                this._selectMode = value;
                
                this.requestUpdate('selectMode', oldValue);
            }
        }

        get selected() {
            return this._selected;
        }

        set selected(value) {
            if (this.selectLeafOnly && this.items && (this.items.length > 0)) return;
            
            const oldValue = this.selected;

            if (oldValue !== value) {
                this._selected = value;

                if (this.item) {
                    this.item.selected = this._selected;

                    if (this.selectMode === 'multiple') {
                        this._setChildItemState(this._selected);
                    }
                }

                this.requestUpdate('selected', oldValue);
                if (this._selectionSource) {
                    this.fireMessage('obap-treeview-selection-change', {
                        source: this.item,
                        sourceElement: this,
                        selected: this._selected
                    });
                }
            }
        }

        constructor() {
            super();

            this.label = '';
            this._icon = '';
            this.open = false;
            this.items = [];
            this.item = null;
            this._selectMode = 'none';
            this._selectLeafOnly = false;
            this.openIcon = '';
            this.closeIcon = '';
            this.root = false;
            this.selected = false;
            this.indeterminate = false;
        }

        select() {
            this._selectionSource = true;
            this.selected = true;
            this._selectionSource = false;
        }

        deselect() {
            this._selectionSource = true;
            this.selected = false;
            this._selectionSource = false;
        }

        expand() {
            this.open = true;
        }

        collapse() {
            this.open = false;
        }

        expandAll() {
            this.expand();
            requestAnimationFrame(() => this.renderRoot.querySelectorAll('obap-treeview-item').forEach((item) => item.expandAll()));
        }

        collapseAll() {
            this.collapse();
            requestAnimationFrame(() => this.renderRoot.querySelectorAll('obap-treeview-item').forEach((item) => item.collapseAll()));
        }

        _setChildItemState(selected) {
            const children = this.renderRoot.querySelectorAll('obap-treeview-item');
            children.forEach((child) => child.selected = selected);
            requestAnimationFrame(() => this._getParentItem()._setParentItemState());
        }

        _setParentItemState() {
            const totalCount = this.items.length;
            const selectedCount = this.items.filter((item) => item.selected && !item.indeterminate).length;
            const indeterminateCount = this.items.filter((item) => item.indeterminate && !item.selected).length;

            if ((selectedCount === 0) && (indeterminateCount === 0)) {
                this.selected = false;
                this.indeterminate = false;
            } else if (selectedCount === totalCount) {
                this.selected = true;
                this.indeterminate = false;
            } else {
                this.indeterminate = true; 
            }

            if (this.item) {
                this.item.indeterminate = this.indeterminate;
                this.item.selected = this.selected;
            }

            const parentItem = this._getParentItem();

            if (parentItem && parentItem._setParentItemState) {
                requestAnimationFrame(() => parentItem._setParentItemState());
            }
        }

        _getParentItem() {
            return this.parentElement.getRootNode().host;
        }
    };