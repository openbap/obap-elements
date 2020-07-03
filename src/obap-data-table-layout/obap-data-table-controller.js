/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
/**
Provides some common functionality for creating data tables. 
*/
export const ObapDataTableController = (superClass) =>
    class ObapDataTableControllerComponent extends superClass {
        static get properties() {
            return {
                columns: {
                    type: Array,
                    attribute: 'columns'
                },

                rows: {
                    type: Array,
                    attribute: 'rows'
                },

                idField: {
                    type: String,
                    attribute: 'id-field'
                },

                // 'none' (default), 'single', 'multiple'.
                selectionMode: {
                    type: String,
                    attribute: 'selection-mode'
                },

                sortIndex: {
                    type: Number,
                    attribute: 'sort-index'
                },

                sortDescending: {
                    type: Boolean,
                    attribute: 'sort-descending'
                },
            }
        }

        constructor() {
            super();
            this.columns = [];
            this.rows = [];
            this.selectionMode = 'none';
            this.idField = 'id';
            this.sortIndex = -1;
            this.sortDescending = false;
        }

        get sortedRows() {  
            if (this.sortIndex > -1) {
                this._sortField = this.columns[this.sortIndex].field;
                this._sortType = this.columns[this.sortIndex].type;
    
                if (this._sortField) {
                    switch (this._sortType) {
                        case 'number': {
                            this.sortDescending ? this.rows.sort(this.compareNumberDesc.bind(this)) : this.rows.sort(this.compareNumberAsc.bind(this));
                            break;
                        }
    
                        case 'boolean': {
                            this.sortDescending ? this.rows.sort(this.compareBooleanDesc.bind(this)) : this.rows.sort(this.compareBooleanAsc.bind(this));
                            break;
                        }
    
                        default: {
                            this.sortDescending ? this.rows.sort(this.compareDesc.bind(this)) : this.rows.sort(this.compareAsc.bind(this));
                        }
                    }
                }
            }
    
            return this.rows;
        }

        compareAsc(a, b) {
            let av = a[this._sortField];
            let bv = b[this._sortField];
    
            if (av < bv) return -1;
            if (av > bv) return 1
            return 0;
        }
    
        compareDesc(a, b) {
            let av = a[this._sortField];
            let bv = b[this._sortField];
    
            if (av < bv) return 1;
            if (av > bv) return -1;
            return 0;
        }
    
        compareNumberAsc(a, b) {
            let av = Number(a[this._sortField]);
            let bv = Number(b[this._sortField]);
    
            if (av < bv) return -1;
            if (av > bv) return 1;
            return 0;
        }
    
        compareNumberDesc(a, b) {
            let av = Number(a[this._sortField]);
            let bv = Number(b[this._sortField]);
    
            if (av < bv) return 1;
            if (av > bv) return -1;
            return 0;
        }
    
        compareBooleanAsc(a, b) {
            let av = Boolean(a[this._sortField]);
            let bv = Boolean(b[this._sortField]);
    
            if (av < bv) return -1;
            if (av > bv) return 1;
            return 0;
        }
    
        compareBooleanDesc(a, b) {
            let av = Boolean(a[this._sortField]);
            let bv = Boolean(b[this._sortField]);
    
            if (av < bv) return 1;
            if (av > bv) return -1;
            return 0;
        }

        _fireEvent(name, detail) {
            const event = new CustomEvent(name, {
                bubbles: true,
                composed: true,
                detail: detail
            });
    
            return this.dispatchEvent(event);
        }
    };