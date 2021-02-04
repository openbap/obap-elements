/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
/**
Provides some common functionality for creating data tables. 
*/
export const ObapDataTableController = (superClass) =>
    class ObapDataTableControllerComponent extends superClass {
        static get properties() {
            return {
                loading: {
                    type: Boolean,
                    attribute: 'loading',
                    reflect: true
                },

                preloadRowCount: {
                    type: Number,
                    attribute: 'preload-row-count'
                },

                columns: {
                    type: Array
                },

                rows: {
                    type: Array
                },

                sortedRows: {
                    type: Array
                },

                displayRows: {
                    type: Array
                },

                selectedRows: {
                    type: Array
                },

                activeRow: {
                    type: Object
                },

                showActiveRow: {
                    type: Boolean,
                    attribute: 'show-active-row'
                },

                expandedRows: {
                    type: Array
                },

                idField: {
                    type: String,
                    attribute: 'id-field'
                },

                showColumnLines: {
                    type: Boolean,
                    attribute: 'show-column-lines'
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

                columnActions: {
                    type: Array
                },

                rowActions: {
                    type: Array
                },

                columnActionsIcon: {
                    type: String,
                    attribute: 'column-actions-icon'
                },

                rowActionsIcon: {
                    type: String,
                    attribute: 'row-actions-icon'
                },

                detailRowTemplate: {
                    type: Object
                },

                hasDetailRowTemplate: {
                    type: Boolean
                },

                detailSectionTemplate: {
                    type: Object
                },

                hasDetailSectionTemplate: {
                    type: Boolean
                },

                displayColumns: {
                    type: Array
                },

                sortColumns: {
                    type: Array
                },

                headerDepth: {
                    type: Number
                },

                // auto (default), fixed, resizable
                columnSizing: {
                    type: String,
                    attribute: 'column-sizing'
                },

                _columnDragging: {
                    type: Boolean
                },

                verticalScrollInfo: {
                    type: Object
                }
            }
        }

        get sortedRows() {
            return this.rows;
        }

        set sortedRows(value) {
            throw 'sortedRows is read only';
        }

        get displayRows() {
            if (this.loading) {
                return new Array(this.preloadRowCount);
            }

            return this._displayRows;
        }

        set displayRows(value) {
            throw 'displayRows is read only';
        }

        get activeRow() {
            return this._activeRow;
        }

        set activeRow(value) {
            throw 'activeRow is read only';
        }

        get headerDepth() {
            return this._headerDepth;
        }

        set headerDepth(value) {
            throw 'headerDepth is read only';
        }

        get displayColumns() {
            return this._displayColumns;
        }

        set displayColumns(value) {
            throw 'displayColumns is read only';
        }

        get columns() {
            return this._columns;
        }

        set columns(value) {
            const oldValue = this.columns;

            if (value !== oldValue) {
                this._columns = value;

                this._columns.forEach((column, index) => {
                    column._internalIndex = index;
                });

                this.updateDisplayColumns();
                this.requestUpdate('columns', oldValue);
            }
        }

        get hasDetailRowTemplate() {
            return this._hasDetailRowTemplate;
        }

        set hasDetailRowTemplate(value) {
            throw 'hasDetailRowTemplate is read only';
        }

        get detailRowTemplate() {
            return this._detailRowTemplate;
        }

        set detailRowTemplate(value) {
            const oldValue = this._detailRowTemplate;

            if (this._isFunction(value)) {
                this._detailRowTemplate = value;
                this._hasDetailRowTemplate = true;
            } else {
                this._detailRowTemplate = null;
                this._hasDetailRowTemplate = false;
                this.expandedRows = [];
            }

            this.requestUpdate('detailRowTemplate', oldValue);
            this.requestUpdate('hasDetailRowTemplate', null);

        }

        get hasDetailSectionTemplate() {
            return this._hasDetailSectionTemplate;
        }

        set hasDetailSectionTemplate(value) {
            throw 'hasDetailSectionTemplate is read only';
        }

        get detailSectionTemplate() {
            return this._detailSectionTemplate;
        }

        set detailSectionTemplate(value) {
            const oldValue = this._detailSectionTemplate;

            if (this._isFunction(value)) {
                this._detailSectionTemplate = value;
                this._hasDetailSectionTemplate = true;
            } else {
                this._detailSectionTemplate = null;
                this._hasDetailSectionTemplate = false;

            }

            this.requestUpdate('detailSectionTemplate', oldValue);
            this.requestUpdate('hasDetailSectionTemplate', null);
        }

        constructor() {
            super();
            this.loading = false;
            this.preloadRowCount = 10;
            this._columns = [];
            this.sortColumns = [];
            this.rows = [];
            this._sortedRows = [];
            this._displayRows = [];
            this.selectedRows = [];
            this.expandedRows = [];
            this._activeRow = null;
            this.selectionMode = 'none';
            this.idField = 'id';
            this.sortIndex = -1;
            this.sortDescending = false;
            this.columnActions = [];
            this.rowActions = [];
            this.columnActionsIcon = '';
            this.rowActionsIcon = '';
            this._detailRowTemplate = null;
            this._hasDetailRowTemplate = false;
            this._detailSectionTemplate = null;
            this._hasDetailSectionTemplate = false;
            this._headerDepth = 0;
            this.columnSizing = 'auto';
            this._columnDragging = false;
            this.verticalScrollInfo = null;
            this.showActiveRow = false;
            this.showColumnLines = false;

            this._displayColumns = {
                fixedLeft: [],
                fixedRight: [],
                scroll: []
            }

            this.columnResizeInfo = {
                offset: undefined,
                currentColumn: undefined,
                currentColumnWidth: undefined,
                currentGridColumn: undefined,
                resizer: undefined,
                resizerSibling: undefined
            }

            this._boundHandleColumnResizeStart = this._handleColumnResizeStart.bind(this);
            this._boundHandleColumnResizeStep = this._handleColumnResizeStep.bind(this);
            this._boundHandleColumnResizeEnd = this._handleColumnResizeEnd.bind(this);

            document.addEventListener('mousemove', this._boundHandleColumnResizeStep);
            document.addEventListener('mouseup', this._boundHandleColumnResizeEnd);

            document.addEventListener('touchmove', this._boundHandleColumnResizeStep);
            document.addEventListener('touchend', this._boundHandleColumnResizeEnd);

            this.updateDisplayColumns();
        }

        updated(changedProperties) {
            super.updated(changedProperties);

            let layoutUpdated = false;

            changedProperties.forEach((oldValue, propName) => {
                if ((propName === 'sortIndex') || (propName === 'sortField') || (propName === 'sortType') || (propName === 'sortDescending') || (propName === 'rows')) {
                    this._sortRows();
                }

                if ((propName === 'sortedRows') || (propName === 'verticalScrollInfo')) {
                    this._updateDisplayRows();
                }

                if ((propName === 'selectionMode') || (propName === 'columnSizing') || (propName === 'columns') || (propName === 'showColumnLines') || (propName === 'loading')) {
                    if (!layoutUpdated) {
                        this.updateLayout(propName);
                        layoutUpdated = true;
                    }
                }
            });
        }

        updateLayout(reason) {
            const layoutElement = this.renderRoot.querySelector('obap-data-table-layout');

            if (layoutElement) {
                requestAnimationFrame(() => layoutElement.updateLayout());
            }
        }

        _handleColumnResizeStart(e) {
            this.columnResizeInfo.resizer = e.target;
            this.columnResizeInfo.resizerSibling = e.target.nextElementSibling;
            this.columnResizeInfo.offset = (e.type === 'touchstart') ? e.changedTouches[0].pageX : e.pageX;

            this.columnResizeInfo.currentColumn = e.target.parentElement;
            this.columnResizeInfo.currentColumnWidth = this.columnResizeInfo.currentColumn.getBoundingClientRect().width;
            this.columnResizeInfo.currentGridColumn = this.sortColumns[this.columnResizeInfo.currentColumn.columnIndex];

            this.columnResizeInfo.resizer.setAttribute('dragging', '');
            this.columnResizeInfo.resizerSibling.setAttribute('dragging', '');
            this._columnDragging = true;
        }

        _handleColumnResizeStep(e) {
            if (this.columnResizeInfo.currentGridColumn) {
                const px = (e.type === 'touchmove') ? e.changedTouches[0].pageX : e.pageX;
                const dx = px - this.columnResizeInfo.offset;

                this.columnResizeInfo.offset = px;
                this.columnResizeInfo.currentColumnWidth = (this.columnResizeInfo.currentColumnWidth + dx);

                let newWidth = Math.max(this.columnResizeInfo.currentColumnWidth, 3);

                if ((this.columnResizeInfo.currentGridColumn.minWidth) && (newWidth < this.columnResizeInfo.currentGridColumn.minWidth)) {
                    newWidth = this.columnResizeInfo.currentGridColumn.minWidth;
                } else if ((this.columnResizeInfo.currentGridColumn.maxWidth) && (newWidth > this.columnResizeInfo.currentGridColumn.maxWidth)) {
                    newWidth = this.columnResizeInfo.currentGridColumn.maxWidth;
                }

                this.columnResizeInfo.currentGridColumn.width = newWidth + 'px';

                this.requestUpdate('columns', []);

                this.updateLayout();
            }
        }

        _handleColumnResizeEnd(e) {
            if (this._columnDragging) {
                this._columnDragging = false;

                if (this.columnResizeInfo && this.columnResizeInfo.resizer) {
                    this.columnResizeInfo.resizer.removeAttribute('dragging');
                    this.columnResizeInfo.resizerSibling.removeAttribute('dragging');
                }

                this.columnResizeInfo = {
                    offset: undefined,
                    currentColumn: undefined,
                    currentColumnWidth: undefined,
                    currentGridColumn: undefined,
                    resizer: undefined,
                    resizerSibling: undefined
                }

                this.requestUpdate('columns', []);
            }
        }

        _updateDisplayRows() {
            //this._displayRows = this.sortedRows.slice(0, 5);
            this._displayRows = this.sortedRows;
            this.requestUpdate('displayRows', []);
        }

        _sortRows() {
            if (this.sortIndex > -1) {
                this._sortField = this.sortColumns[this.sortIndex].field;
                this._sortType = this.sortColumns[this.sortIndex].type;

                if (this._sortParamtersChanged(this.sortIndex, this._sortField, this._sortType, this.sortDescending)) {
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

                    this._previousSortParameters = {
                        index: this.sortIndex,
                        field: this._sortField,
                        type: this._sortType,
                        descending: this.sortDescending
                    }
                }
            }

            this.requestUpdate('sortedRows', []);
            //requestAnimationFrame(() => this.requestUpdate('sortedRows', []));

            return this.rows;
        }

        _sortParamtersChanged(index, field, type, descending) {
            if (!this._previousSortParameters) return true;

            return (index !== this._previousSortParameters.index) || (field !== this._previousSortParameters.field) ||
                (type !== this._previousSortParameters.type) || (descending !== this._previousSortParameters.descending)
        }

        get effectiveSelectedRows() {
            return this.selectionMode === 'multiple' ? this.selectedRows : (this.selectedRows.length > 0) ? [this.selectedRows[0]] : [];
        }

        updateDisplayColumns() {
            if ((!this.columns) || (this.columns.length === 0)) {
                return;
            }

            let effectiveColumns = this.columns;

            this._headerDepth = this._getHeaderDepth(effectiveColumns, 0);
            effectiveColumns = this._shiftColumns(effectiveColumns, 1, this._headerDepth);
            this._calculateHeaderSpans(effectiveColumns);

            const columns = {
                fixedLeft: [],
                fixedRight: [],
                scroll: []
            }

            columns.fixedLeft = this._expandDisplayColumns(effectiveColumns.filter((column) => column.fix === 'left'));
            columns.fixedRight = this._expandDisplayColumns(effectiveColumns.filter((column) => column.fix === 'right'));
            columns.scroll = this._expandDisplayColumns(effectiveColumns.filter((column) => ((column.fix !== 'left') && (column.fix !== 'right'))));

            const oldValue = this.displayColumns;
            this._displayColumns = columns;

            let flatColumns = [];

            if (columns.fixedLeft.length > 0) {
                flatColumns = flatColumns.concat(columns.fixedLeft[this._headerDepth - 1]);
            }

            if (columns.scroll.length > 0) {
                flatColumns = flatColumns.concat(columns.scroll[this._headerDepth - 1]);
            }

            if (columns.fixedRight.length > 0) {
                flatColumns = flatColumns.concat(columns.fixedRight[this._headerDepth - 1]);
            }

            flatColumns.forEach((column, index) => column._internalIndex = index);

            this.sortColumns = flatColumns;

            //console.log(this.sortColumns)
            this.requestUpdate('displayColumns', oldValue);
        }

        _shiftColumns(columns, currentDepth, depth) {
            if ((columns) && (columns.length > 0) && (currentDepth < depth)) {
                currentDepth++

                columns = columns.map((column, index) => {
                    if (!column.columns || column.columns.length === 0) {
                        return { label: '', columns: [column] }
                    }

                    return column;
                });

                columns.forEach((column) => {
                    column.columns = this._shiftColumns(column.columns, currentDepth, depth);
                });
            }

            const leaves = columns.filter((column) => !column.columns || column.columns.length === 0);

            if (leaves.length > 0) {
                leaves[leaves.length - 1]._lastInGroup = true;
            }

            return columns;
        }

        _getHeaderDepth(columns, currentDepth) {
            if ((columns) && (columns.length > 0)) {
                currentDepth++;
                return Math.max(...columns.map((column) => this._getHeaderDepth(column.columns, currentDepth)));
            }

            return currentDepth;
        }


        _expandDisplayColumns(columns) {
            if (!columns || columns.length === 0) return [];
            let childColumns = [];

            columns.forEach((column) => {
                if (column.columns && column.columns.length > 0) {
                    childColumns = childColumns.concat(column.columns);
                }
            });

            if (childColumns.length > 0) {
                return [columns, ...this._expandDisplayColumns(childColumns)];
            }

            return [columns];
        }

        _calculateHeaderSpans(columns) {
            if ((columns) && (columns.length > 0)) {
                columns.forEach((column) => {
                    if ((column.columns) && (column.columns.length > 0)) {
                        this._calculateHeaderSpans(column.columns);
                        column.childCount = column.columns.reduce((count, childColumn) => count + childColumn.childCount, 0);
                    } else {
                        column.childCount = 1;
                    }
                });
            }
        }

        sortColumn(columnIndex) {
            if ((columnIndex > -1) && (columnIndex < this.sortColumns.length)) {
                if (columnIndex === this.sortIndex) {
                    this.sortDescending = !this.sortDescending;
                } else {
                    this.sortIndex = columnIndex;
                    this.sortDescending = false;
                }
            }
        }

        rowExpanded(row) {
            return this.expandedRows.indexOf(row) > -1;
        }

        toggleRow(row) {
            if (row) {
                const existingIndex = this.expandedRows.indexOf(row);

                if (existingIndex !== -1) {
                    this.expandedRows.splice(existingIndex, 1);
                    //this.fireMessage('obap-data-table-selection-changed');
                } else {
                    this.expandedRows.push(row);
                    //this.fireMessage('obap-data-table-selection-changed');
                }

                this.requestUpdate();
            }
        }

        expandRow(index) {
            const row = this.rows[index];

            if ((row) && (this.expandedRows.indexOf(row) === -1)) {
                this.expandedRows.push(row);
                //this.fireMessage('obap-data-table-selection-changed');
            }
        }

        collapseRow(index) {
            const row = this.rows[index];

            if (row) {
                const existingIndex = this.expandedRows.indexOf(row);

                if (existingIndex !== -1) {
                    this.expandedRows.splice(existingIndex, 1);
                    //this.fireMessage('obap-data-table-selection-changed');
                }
            }
        }

        selectRow(index) {
            if (this.selectionMode === 'none') return;
            if (this.selectionMode === 'single') this.selectedRows.length = 0;

            const row = this.rows[index];

            if ((row) && (this.selectedRows.indexOf(row) === -1)) {
                this.selectedRows.push(row);
                this.fireMessage('obap-data-table-selection-changed');
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

                    this.fireMessage('obap-data-table-selection-changed');
                }
            }
        }

        selectAllRows() {
            if (this.selectionMode !== 'multiple') return;
            this.selectedRows = [...this.rows];
            this.fireMessage('obap-data-table-selection-changed');
        }

        deselectAllRows() {
            this.selectedRows.length = 0;
            this.fireMessage('obap-data-table-selection-changed');
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

        /*
        fireMessage(name, detail, cancelable) {
            const event = new CustomEvent(name, {
                bubbles: true,
                composed: true,
                cancelable: cancelable,
                detail: detail
            });

            return this.dispatchEvent(event);
        }
        */

        _isFunction(obj) {
            return !!(obj && obj.constructor && obj.call && obj.apply);
        };
    };