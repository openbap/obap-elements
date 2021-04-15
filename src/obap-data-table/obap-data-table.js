/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { repeat } from 'lit-html/directives/repeat.js';
import { styleMap } from 'lit-html/directives/style-map';
import { ObapDataTableController } from './obap-data-table-controller.js';
import { ExcelExporter } from './exporters/ExcelExporter.js';
import { CsvExporter } from './exporters/CsvExporter.js';
import { body } from '../obap-styles/obap-typography.js';
import '../obap-data-table-layout/obap-data-table-layout.js';
import './obap-data-table-header-cell.js';
import './obap-data-table-body-cell.js';
import './obap-data-table-selector-cell.js';
import './obap-data-table-expander-cell.js';
import './obap-data-table-action-cell.js';
import './obap-data-table-group-header-cell.js';

/*
*/
export class ObapDataTable extends ObapDataTableController(ObapElement) {
    static get styles() {
        return [body, css`
            :host {
                --obap-data-table-background-color: #FFFFFF;
                --obap-data-table-hover-background-color: #F1F1F1;
                --obap-data-table-fixed-background-color: #F1F1F1;
                --obap-data-table-selected-background-color: #F1F1F1;
                --obap-data-table-true-color: rgba(0, 0, 0, 0.87);
                --obap-data-table-false-color: rgba(0, 0, 0, 0.87);
                --obap-data-table-row-height: 32px;

                --obap-data-table-loading-color: var(--obap-primary-light-color, #8e99f3);
                --obap-data-table-loading-animation-duration: 3s;

                display: flex;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            :host([loading]) {
                pointer-events: none;
            }

            obap-data-table-layout {
                --obap-data-table-layout-detail-border-width: 0 0 0 1px;

                --obap-data-table-layout-header-action-left-border-width: 0 1px 1px 0;
                --obap-data-table-layout-header-fixed-left-border-width: 0 1px 1px 0;
                --obap-data-table-layout-header-scroll-border-width: 0 0 1px 0;
                --obap-data-table-layout-header-fixed-right-border-width: 0 0 1px 1px;
                --obap-data-table-layout-header-action-right-border-width: 0 0 1px 0;

                --obap-data-table-layout-body-action-left-border-width: 0 1px 0 0;
                --obap-data-table-layout-body-fixed-left-border-width: 0 1px 0 0;
                --obap-data-table-layout-body-scroll-border-width: 0 0 0 0;
                --obap-data-table-layout-body-fixed-right-border-width: 0 0 0 1px;
                --obap-data-table-layout-body-action-right-border-width: 0 0 0 0;

                /*--obap-data-table-layout-footer-action-left-border-width: 0 1px 0 0;*/
                /*--obap-data-table-layout-footer-fixed-left-border-width: 0 0 1px 0;*/
                /*--obap-data-table-layout-footer-scroll-border-width: 0 0 1px 0;*/
                /*--obap-data-table-layout-footer-fixed-right-border-width: 0 1px 0 1px;*/
                /*--obap-data-table-layout-footer-action-right-border-width: 0 1px 0 1px;*/
                
                --obap-data-table-layout-background-color: var(--obap-data-table-fixed-background-color);

                --obap-data-table-layout-header-action-left-color: inherit;
                --obap-data-table-layout-header-fixed-left-color: inherit;
                --obap-data-table-layout-header-action-left-background-color: var(--obap-data-table-fixed-background-color);

                --obap-data-table-layout-body-action-left-color: inherit;
                --obap-data-table-layout-body-fixed-left-color: inherit;
                --obap-data-table-layout-body-action-left-background-color: var(--obap-data-table-fixed-background-color);

                --obap-data-table-layout-header-scroll-color: inherit;
                --obap-data-table-layout-header-scroll-background-color: var(--obap-data-table-fixed-background-color);

                --obap-data-table-layout-body-scroll-color: inherit;
                --obap-data-table-layout-body-scroll-background-color: var(--obap-data-table-background-color);
                --obap-data-table-layout-body-scroll-background-color: transparent;
            }

            obap-data-table-body-cell {
                height: var(--obap-data-table-row-height);
            }

            table {
                border-spacing: 0; 
                color: rgba(0, 0, 0, 0.87);
            }

            .table-fixed {
                table-layout: fixed;
                width: 100%;
            }

            tr {
                height: var(--obap-data-table-row-height);
                min-height: var(--obap-data-table-row-height);
                max-height: var(--obap-data-table-row-height);
                line-height: var(--obap-data-table-row-height);
            }

            tr[collapsed] {
                height: 0;
                line-height: 0 !important;
                visibility: hidden;
            }

            th, td {
                position: relative;
                padding: 0;
                box-sizing: border-box;
                overflow: hidden;
                border-right: 1px solid transparent;
            }

            .header-row {
                background: var(--obap-data-table-fixed-background-color);
            }

            .body-scroll-row {
                background: var(--obap-data-table-background-color);
            }

            .body-scroll-row:hover {
                background: var(--obap-data-table-hover-background-color);
            }

            td {
                border-bottom: 1px solid var(--obap-data-table-layout-border-color);
            }

            .table-action-right {
                border-right: 1px solid var(--obap-data-table-layout-border-color);
            }

            .action-spacer {
                width: 32px;
                height: calc(var(--obap-data-table-row-height) + 1px);
            }

            tr:last-of-type > td {
                border-bottom: none;
            }

            td:not(:first-child) > obap-data-table-expander-cell {
                border-left: 1px solid var(--obap-data-table-layout-border-color);
            }

            .group-column {
                height: calc(var(--obap-data-table-row-height) + 1px);
            }

            .group-column[right-border] {
                border-right: 1px solid var(--obap-data-table-layout-border-color);
            }

            .group-column[bottom-border] {
                border-bottom: 1px solid var(--obap-data-table-layout-border-color);
            }

            div[align-bottom-spacer] {
                display: flex;
                flex-direction: column-reverse;
                justify-content: flex-end;
                align-items: flex-start;
                height: 100%;
            }

            div[align-bottom-spacer]:after {
               content: '';
               flex: 1;
               border-bottom: 1px solid var(--obap-data-table-layout-border-color);
               width: 100%;
            }

            th[last-in-group]:not(:last-child), td[last-in-group]:not(:last-child), th[right-border]:not(:last-child), td[right-border]:not(:last-child) {
                border-right: 1px solid var(--obap-data-table-layout-border-color);
            }

            .resizer {
                position: absolute;
                top: 0;
                right: 0;
                width: 3px;
                cursor: col-resize;
                user-select: none;
                background: var(--obap-data-table-layout-border-color);
                height: 100%;
                z-index: 2;
                opacity: 0;
            }

            tr[selected-row] {
                background: var(--obap-data-table-selected-background-color);
            }

            .detail-section {
                height: 100%;
                box-sizing: border-box;

                color: var(--obap-data-table-layout-detail-color);
                background: var(--obap-data-table-layout-detail-background-color);
                /*
                border-top: var(--obap-data-table-layout-detail-border-color);
                border-style: var(--obap-data-table-layout-detail-border-style);
                border-width: var(--obap-data-table-layout-detail-border-width);
                border-color: var(--obap-data-table-layout-detail-border-color);
                */
            }

            .resizer:hover, .resizer[dragging] {
                opacity: 1;
            }

            .blank-check {
                width: 32px;
            }

            .virtual-row-top, .virtual-row-bottom {
                /*
                height: 100px;
                */
            }
        `];
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        requestAnimationFrame(() => this._resizeHeaderCells());
    }

    render() {
        return html`
            <obap-data-table-layout role="presentation" id="layout" class="typography-body" @obap-data-table-vertical-scroll="${this._tableVerticalScroll}" @obap-data-table-column-resize="${this._columnResize}" @obap-data-table-row-toggle="${this._rowToggle}" @obap-data-table-row-selected="${this._rowCheck}" @obap-data-table-layout-size-changed="${() => requestAnimationFrame(() => this._resizeHeaderCells())}">
                ${this._renderLeftActions()}

                ${this.displayColumns.fixedLeft.length > 0 ? html`
                    <div class="header-fixed-left" slot="header-fixed-left" role="presentation">
                        <table role="presentation">
                            ${this._renderDataHeader(true, 'header-fixed-left-row', this.displayColumns.fixedLeft)}
                        </table>
                    </div>

                    <div class="body-fixed-left" slot="body-fixed-left" role="presentation">
                        <div class="virtual-row-top" role="presentation"></div>
                        <table @click="${this._onRowClick}" role="presentation">
                            ${this._renderDataHeader(false, 'header-fixed-left-row', this.displayColumns.fixedLeft)}
                            ${this._renderDataBody('body-fixed-left-row', this.displayColumns.fixedLeft, true)}
                        </table>
                        <div class="virtual-row-bottom" role="presentation"></div>
                    </div>
                ` : null}

                ${this.displayColumns.scroll.length > 0 ? html`
                    <div class="header-scroll" slot="header-scroll" role="presentation">
                        <table role="presentation">
                            ${this._renderDataHeader(true, 'header-scroll-row', this.displayColumns.scroll)}
                        </table>
                    </div>

                    <div class="body-scroll" slot="body-scroll" role="presentation">
                        <div class="virtual-row-top" role="presentation"></div>
                        <table @click="${this._onRowClick}" id="mainTable" role="presentation">
                            ${this._renderDataHeader(false, 'header-scroll-row', this.displayColumns.scroll)}
                            ${this._renderDataBody('body-scroll-row', this.displayColumns.scroll, false)}
                        </table>
                        <div class="virtual-row-bottom" role="presentation"></div>
                    </div>
                ` : null}

                ${this.displayColumns.fixedRight.length > 0 ? html`
                    <div class="header-fixed-right" slot="header-fixed-right" role="presentation">
                        <table role="presentation">
                            ${this._renderDataHeader(true, 'header-fixed-right-row', this.displayColumns.fixedRight)}
                        </table>
                    </div>

                    <div class="body-fixed-right" slot="body-fixed-right" role="presentation">
                        <div class="virtual-row-top" role="presentation"></div>
                        <table @click="${this._onRowClick}" role="presentation">
                            ${this._renderDataHeader(false, 'header-fixed-right-row', this.displayColumns.fixedRight)}
                            ${this._renderDataBody('body-fixed-right-row', this.displayColumns.fixedRight, true)}
                        </table>
                        <div class="virtual-row-bottom" role="presentation"></div>
                    </div>
                ` : null}

                ${this._renderRightActions()}
                ${this._renderDetailSection(this.activeRow)}
            </obap-data-table-layout>
        `;
    }

    _rowToggle(e) {
        this.toggleRow(e.detail.row);
        requestAnimationFrame(() => this._resizeDetailRow(e.detail.row));
    }

    _columnResize(e) {
        e.detail.column.width = e.detail.width;
        this.requestUpdate('columns', []);
        requestAnimationFrame(() => this._resizeHeaderCells());
    }

    _resizeDetailRow(row) {
        const rowIndex = this.displayRows.indexOf(row);
        const detailCells = [...this.renderRoot.querySelectorAll(`.detail-cell[row-index="${rowIndex}"`)];

        if (detailCells.length > 0) {
            const contentCell = detailCells.filter((cell) => cell.hasAttribute('has-content'))[0];
            const nonContentCells = detailCells.filter((cell) => !cell.hasAttribute('has-content'));

            nonContentCells.forEach((cell) => {
                cell.style.height = (contentCell.clientHeight + 1) + 'px';
            });
        }

        this.updateLayout();
    }

    _renderDetailRow(row, rowIndex, count, showContent) {
        if (this.hasDetailRowTemplate && this.rowExpanded(row)) {
            return html`<tr role="row" aria-rowindex="${rowIndex}" aria-selected="${this.isRowSelected(row)}" class="detail-row"><td row-index="${rowIndex}" class="detail-cell" ?has-content="${showContent}" colspan="${count}">${showContent ? this.detailRowTemplate(row) : null}</td></tr>`;
        }
    }
   
    _renderDetailSection(row) {
        if (this.hasDetailSectionTemplate && row) {
            return html`<div class="detail-section" slot="detail">${this.detailSectionTemplate(row)}</div>`;
        }

        return null;
    }

    _renderRightActions() {
        const hasColumnActions = (this.columnActions && this.columnActions.length > 0);
        const hasRowActions = (this.rowActions && this.rowActions.length > 0);

        if ((!this.loading) &&  (hasColumnActions || hasRowActions)) {
            return html`
                <div slot="header-action-right">
                    <table class="table-action-right">
                        ${this._renderActionRightHeader(hasColumnActions)}
                    </table>
                </div>  

                <div slot="body-action-right">
                    <div class="virtual-row-top"></div>
                    <table class="table-action-right">
                        ${this._renderActionRightBody(hasRowActions)}
                    </table>
                    <div class="virtual-row-bottom"></div>
                </div>
            `;
        }
        return null;
    }

    _renderActionRightHeader(show) {
        return html`
            <thead role="presentation">
                <tr role="row">
                    ${show ? html`
                        <th>
                            <obap-data-table-action-cell .actions="${this.columnActions}"></obap-data-table-action-cell>
                        </th>
                    ` : html`<div class="action-spacer"></div>`}
                </tr>
            </thead>
        `;
    }

    _renderActionRightBody(show) {
        return html`
            <tbody role="presentation">
                ${repeat(this.displayRows, (row) => row[this.idField], (row, rowIndex) => html`
                    <tr role="row" aria-rowindex="${rowIndex}" aria-selected="${this.isRowSelected(row)}">
                        ${show ? html`
                            <td><obap-data-table-action-cell .row="${row}" .actions="${this.rowActions}"></obap-data-table-action-cell></td>
                        ` : html`<div class="action-spacer"></div>`}
                    </tr>
                    ${this._renderDetailRow(row, rowIndex, 2, false)}
                `)}
            </tbody>
        `;
    }

    _renderLeftActions() {
        if ((!this.loading) && ((this.selectionMode === 'single') || (this.selectionMode === 'multiple') || (this.hasDetailRowTemplate))) {
            return html`
                <div ?align-bottom-spacer="${(this.headerDepth > 1) && (this.selectionMode === 'multiple')}" slot="header-action-left">
                    ${this._renderActionLeftHeader(this.selectionMode)}
                </div>  

                <div slot="body-action-left">
                    <div class="virtual-row-top"></div>
                    <table>
                        ${this._renderActionLeftBody()}
                    </table>
                    <div class="virtual-row-bottom"></div>
                </div>
            `;
        }

        return null;
    }

    _renderActionLeftHeader(mode) {
        switch (mode) {
            case 'single': {
                return html`
                    <thead role="presentation">
                        <tr role="row">
                            <th class="blank-check"></th>
                        </tr>
                    </thead>
                `;
            }

            case 'multiple': {
                return html`
                    <thead role="presentation">
                        <tr role="row">
                            <th>
                                <obap-data-table-selector-cell ?indeterminate="${(this.selectedRows.length > 0) && (this.selectedRows.length < this.rows.length)}" ?selected="${(this.selectedRows.length === this.rows.length) && (this.rows.length > 0)}" ?disabled="${this.rows.length === 0}"></obap-data-table-selector-cell>
                            </th>
                        </tr>
                    </thead>
                `;
            }

            default: {
                return null;
            }
        }
    }

    _renderActionLeftBody() {
        return html`
            <tbody role="presentation">
                ${repeat(this.displayRows, (row) => row[this.idField], (row, rowIndex) => html`
                    <tr role="row" aria-rowindex="${rowIndex}" aria-selected="${this.isRowSelected(row)}">
                        ${(this.selectionMode === 'single' || this.selectionMode === 'multiple') ? html`
                                <td><obap-data-table-selector-cell row-index="${rowIndex}" ?selected="${this.effectiveSelectedRows.indexOf(row) > -1}"></obap-data-table-selector-cell></td>
                            ` : null
            }

                        ${this.hasDetailRowTemplate ? html`
                            <td><obap-data-table-expander-cell .row="${row}" ?expanded="${this.rowExpanded(row)}"></obap-data-table-expander-cell></td>
                            ` : null
            }
                    </tr>
                    ${this._renderDetailRow(row, rowIndex, 2, false)}
                `)}
            </tbody>
        `;
    }

    _renderDataHeader(visible, rowClass, columns) {
        const resizable = this.columnSizing === 'resizable';
        const canHaveSize = this.columnSizing === 'fixed' || this.columnSizing === 'resizable';

        return html`
            <thead>
                ${(visible && (columns.length > 1)) ? this._renderGroupHeaders(columns) : null}
                <tr role="row" class="${rowClass}" ?collapsed="${!visible}">
                    ${columns[this.headerDepth - 1].map((column, index) => {
            const styles = styleMap({
                width: (canHaveSize && column.width) ? column.width : null
            });

            return html`
                            <th ?last-in-group="${column._lastInGroup}" .columnIndex="${column._internalIndex}" ?right-border="${this.showColumnLines && !column._lastInGroup}">
                                ${resizable ? html`
                                    <div class="resizer" @mousedown="${this._handleColumnResizeStart}" @touchstart="${this._handleColumnResizeStart}"></div>
                                ` : null}
                                <obap-data-table-header-cell .column="${column}" ?sorted="${column._internalIndex === this.sortIndex}" ?visible="${visible}"
                                                            ?sort-descending="${this.sortDescending}" column-index="${column._internalIndex}"
                                                            @click="${(visible && column.sortable) ? this._onColumnClick : null}"
                                                            style=${styles} ?no-hover="${this._columnDragging}">
                                </obap-data-table-header-cell>
                            </th>
                        `
        })}
                </tr>
            </thead>
        `;
    }

    _renderGroupHeaders(columns) {
        const groupsColumns = columns.slice(0, columns.length - 1);

        return groupsColumns.map((columns, index) => {
            const lastGroup = index === groupsColumns.length - 1;
            const columnCount = columns.length - 1;

            return html`<tr role="row">
                ${columns.map((column, index) => {
                const rightBorder = (index !== columnCount) && ((columns[index + 1].label) || (column.label));

                return html`
                        <th class="group-column" ?bottom-border="${column.label || lastGroup}" ?right-border="${rightBorder}" colspan="${column.childCount}">
                            <obap-data-table-group-header-cell label="${column.label}"></obap-data-table-group-header-cell>
                        </th>
                    `;
            })}
            </tr>`;
        });
    }

    _renderDataBody(rowClass, columns, fixed) {
        const columnCount = columns[this.headerDepth - 1].length;
        const showActive = !fixed && this.showActiveRow;

        if (this.loading) {
            return html`
                <tbody>
                    ${repeat(this.displayRows, (row, rowIndex) => html`
                        <tr role="row" aria-rowindex="${rowIndex}" aria-selected="${this.isRowSelected(row)}" .row="${row}" class="${rowClass}">${columns[this.headerDepth - 1].map((column) => this._renderBodyCell(column, row))}</tr>
                    `)}
                </tbody>
            `;
        }

        return html`
            <tbody>
                ${repeat(this.displayRows, (row) => row[this.idField], (row, rowIndex) => html`
                    <tr role="row" aria-rowindex="${rowIndex}" aria-selected="${this.isRowSelected(row)}" ?selected-row="${showActive && row === this.activeRow}" .row="${row}" class="${rowClass}">${columns[this.headerDepth - 1].map((column) => this._renderBodyCell(column, row))}</tr>
                    ${this._renderDetailRow(row, rowIndex, columnCount, !fixed)}
                `)}
            </tbody>
        `;
    }

    _renderBodyCell(column, row) {
        const canHaveSize = this.columnSizing === 'fixed' || this.columnSizing === 'resizable';

        const styles = styleMap({
            width: (canHaveSize && column.width) ? column.width : null
        });

        return html`
            <td ?last-in-group="${column._lastInGroup}" ?right-border="${this.showColumnLines && !column._lastInGroup}">
                <obap-data-table-body-cell ?loading="${this.loading}" style=${styles} .column="${column}" .row="${row}" .value="${this.loading ? null : row[column.field]}" false-icon="${column.falseIcon}" true-icon="${column.trueIcon}"></obap-data-table-body-cell>
            </td>
        `;
    }

    _resizeHeaderCells() {
        this._syncHeaderCells('header-fixed-left-row');
        this._syncHeaderCells('header-scroll-row');
        this._syncHeaderCells('header-fixed-right-row');
    }

    _syncHeaderCells(className) {
        const visibleRow = this.renderRoot.querySelector(`tr.${className}:not([collapsed])`);
        const invisibleRow = this.renderRoot.querySelector(`tr.${className}[collapsed]`);

        if (visibleRow && invisibleRow) {
            const visibleCells = visibleRow.querySelectorAll('th');
            const invisibleCells = invisibleRow.querySelectorAll('th');

            for (let i = 0; i < invisibleCells.length; i++) {
                const width = invisibleCells[i].getBoundingClientRect().width + 'px';
                visibleCells[i].style.width = width;
                visibleCells[i].style.minWidth = width;
            }
        }
    }

    _onColumnClick(e) {
        this.sortColumn(e.target.columnIndex);
    }

    _onRowClick(e) {
        const row = e.target.row;

        if (row) {
            if (this.activeRow !== row) {
                const oldValue = this.activeRow;
                this._activeRow = row;
                this.requestUpdate('activeRow', oldValue);
            }
        }
    }

    _rowCheck(e) {
        e.preventDefault();

        const target = e.target;
        const selected = e.detail.selected;

        if (target.hasAttribute('row-index')) {
            const rowIndex = Number(target.getAttribute('row-index'));
            (selected) ? this.selectRow(rowIndex) : this.deselectRow(rowIndex);
        } else {
            if (!target.indeterminate) {
                (selected) ? this.selectAllRows() : this.deselectAllRows();
            } else if (target.selected && target.indeterminate) {
                this.selectAllRows();
            }
        }

        this.requestUpdate();
    }

    _tableVerticalScroll(e) {
        this.verticalScrollInfo = e.detail;
        console.log(e.detail);
        // Set the sizes of the virtual rows.
        // TODO

        // Update the display rows.
        //this._setDisplayRows();
    }

    exportToExcel(fileName = 'data.xlsx') {
        const data = this._buildExportData();

        const exporter = new ExcelExporter();
        exporter.export(fileName, data.columns, data.rows);
    }

    exportToCsv(fileName = 'data.csv') {
        const data = this._buildExportData();

        const exporter = new CsvExporter();
        exporter.export(fileName, data.columns, data.rows, ';');
    }

    _buildExportData() {
        let columns = [];
        let rows = [];

        // Columns.
        if (this.displayColumns.fixedLeft.length > 0) {
            columns.push(...this.displayColumns.fixedLeft[this.displayColumns.fixedLeft.length - 1])
        }

        if (this.displayColumns.scroll.length > 0) {
            columns.push(...this.displayColumns.scroll[this.displayColumns.scroll.length - 1])
        }

        if (this.displayColumns.fixedRight.length > 0) {
            columns.push(...this.displayColumns.fixedRight[this.displayColumns.fixedRight.length - 1])
        }

        columns = columns.filter((column) => column.field);

        // Rows.
        this.sortedRows.forEach((row) => {
            rows.push(columns.map((column) => row[column.field]));
        });

        return {
            columns: columns,
            rows: rows
        }
    }
}

window.customElements.define('obap-data-table', ObapDataTable);