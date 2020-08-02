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

                selectedRows: {
                    type: Array
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
                }
            }
        }

        constructor() {
            super();
            this.columns = [];
            this.rows = [];
            this.selectedRows = [];
            this.selectionMode = 'none';
            this.idField = 'id';
            this.sortIndex = -1;
            this.sortDescending = false;
        }

        get sortedRows() {
            if (this.sortIndex > -1) {
                this._sortField = this.columns[this.sortIndex].field;
                this._sortType = this.columns[this.sortIndex].type;

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

            return this.rows;
        }

        get effectiveSelectedRows() {
            return this.selectionMode === 'multiple' ? this.selectedRows : (this.selectedRows.length > 0) ? [this.selectedRows[0]] : [];
        }

        sortColumn(columnIndex) {
            if ((columnIndex > -1) && (columnIndex < this.columns.length)) {
                if (columnIndex === this.sortIndex) {
                    this.sortDescending = !this.sortDescending;
                } else {
                    this.sortIndex = columnIndex;
                    this.sortDescending = false;
                }
            }
        }

        selectRow(index) {
            if (this.selectionMode === 'none') return;
            if (this.selectionMode === 'single') this.selectedRows.length = 0;

            const row = this.rows[index];

            if ((row) && (this.selectedRows.indexOf(row) === -1)) {
                this.selectedRows.push(row);
                this.fireMessage('obap-data-selection-changed');
            }
        }

        deselectRow(index) {
            if (this.selectionMode === 'none') return;

            const row = this.rows[index];

            if (row) {
                const existingIndex = this.selectedRows.indexOf(row);

                if (existingIndex !== -1) {
                    if (this.selectionMode === 'single') {
                        this.selectedRows.length = 0;
                    } else {
                        this.selectedRows.splice(existingIndex, 1);
                    }

                    this.fireMessage('obap-data-selection-changed');
                }
            }
        }

        selectAllRows() {
            if (this.selectionMode !== 'multiple') return;
            this.selectedRows = [...this.rows];
            this.fireMessage('obap-data-selection-changed');
        }

        deselectAllRows() {
            this.selectedRows.length = 0;
            this.fireMessage('obap-data-selection-changed');
        }

        compareAsc(a, b) {
            let av = a[this._sortField];
            let bv = b[this._sortField];

            if (av < bv) return -1;
            if (av > bv) return 1;
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
    };