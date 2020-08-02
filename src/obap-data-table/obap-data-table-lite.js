/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { repeat } from 'lit-html/directives/repeat.js';
import { body } from '../obap-styles/obap-typography.js';
import { ObapDataTableController } from './obap-data-table-controller.js';
import '../obap-data-table-layout/obap-data-table-layout.js';
import './obap-data-table-header-cell.js';
import './obap-data-table-body-cell.js';
import './obap-data-table-selector-cell.js';

/**
 * A simple Material Design data table with minimal features which is suitable for small data sets (performance will be an issue if you have a large number of rows). The following features are supported:
 * 
 * Fixed header and scrollable rows.
 * Text, number, boolean, and action columns.
 * Custom value formatting.
 * Custom cell rendering.
 * Simple action columns.
 * Row selection (none, single and multiple).
 * Column sorting.
 * Optional icons for boolean columns
 * 
 * If you need a more feature rich data grid or need to support a large number of rows (more than about 100) then use 'obap-data-table'.
 * 
 * ## Usage
 * 
 * ```javascript
 * let columns = [
 *     { label: '', field: '', type: '', actionLabel: '', trueIcon: '', falseIcon: '', sortable: true }
 * ];
 * 
 * let rows = [
 * 
 * ]
 *
 * <obap-data-table-lite .columns="${columns}" .rows="${rows}">
 * 
 * </obap-data-table-lite>
 * ```
 */
export class ObapDataTableLite extends ObapDataTableController(ObapElement) {
    static get styles() {
        return [body, css`
            :host {
                --obap-data-table-background-color: var(--obap-surface-color, #FFFFFF);
                --obap-data-table-hover-background-color: #F5F5F5;
                --obap-data-table-fixed-background-color: #F5F5F5;
                --obap-data-table-action-color: var(--obap-primary-color, #5c6bc0);
                --obap-data-table-disabled-action-color: var(--obap-text-disabled-color, rgba(0, 0, 0, 0.38));
                --obap-data-table-true-color: var(--obap-text-primary-color, rgba(0, 0, 0, 0.87));
                --obap-data-table-false-color: var(--obap-text-primary-color, rgba(0, 0, 0, 0.87));
                --obap-data-table-row-height: 32px;
                display: block;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            obap-data-table-layout {
                --obap-data-table-layout-header-action-left-border-width: 0 1px 1px 0;
                --obap-data-table-layout-header-scroll-border-width: 0 0 1px 0;
                --obap-data-table-layout-header-action-right-border-width: 0 0 1px 1px;

                --obap-data-table-layout-body-action-left-border-width: 0 1px 0 0;
                --obap-data-table-layout-footer-action-left-border-width: 1px 1px 0 0;
                
                --obap-data-table-layout-background-color: var(--obap-data-table-fixed-background-color);

                --obap-data-table-layout-header-action-left-color: inherit;
                --obap-data-table-layout-header-action-left-background-color: var(--obap-data-table-fixed-background-color);

                --obap-data-table-layout-body-action-left-color: inherit;
                --obap-data-table-layout-body-action-left-background-color: var(--obap-data-table-fixed-background-color);

                --obap-data-table-layout-header-scroll-color: inherit;
                --obap-data-table-layout-header-scroll-background-color: var(--obap-data-table-fixed-background-color);

                --obap-data-table-layout-body-scroll-color: inherit;
                --obap-data-table-layout-body-scroll-background-color: var(--obap-data-table-background-color);
                
                height: 100%;
            }

            table {
                border-spacing: 0; 
                color: var(--obap-text-primary-color, rgba(0, 0, 0, 0.87));
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
                padding: 0;
                box-sizing: border-box;
            }

            .header-row {
                background: var(--obap-data-table-fixed-background-color);
            }

            .body-row {
                background: var(--obap-data-table-background-color);
            }

            .body-row:hover {
                background: var(--obap-data-table-hover-background-color);
            }

            td {
                border-bottom: 1px solid var(--obap-divider-on-surface-color, rgba(0, 0, 0, 0.20));
            }

            tr:last-of-type > td {
                border-bottom: none;
            }
        `];
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        requestAnimationFrame(() => this._resizeHeaderCells());
    }

    render() {
        return html`
            <obap-data-table-layout class="typography-body" @obap-item-selected="${this._rowCheck}" @obap-data-table-layout-size-changed="${() => requestAnimationFrame(() => this._resizeHeaderCells())}">
                ${this._renderSelectors()}

                <div class="header-scroll" slot="header-scroll">
                    <table>
                        ${this._renderScrollHeader(true)}
                    </table>
                </div>

                <div class="body-scroll" slot="body-scroll">
                    <table>
                        ${this._renderScrollHeader(false)}
                        ${this._renderScrollBody()}
                    </table>
                </div>
            
            </obap-data-table-layout>
        `;
    }

    _renderSelectors() {
        if ((this.selectionMode === 'single') || (this.selectionMode === 'multiple')) {
            return html`
                <div slot="header-action-left">
                    ${this.selectionMode === 'multiple' ? html`
                        <table>
                            ${this._renderActionLeftHeader()}
                        </table>
                    ` : null
                }
                </div>  

                <div slot="body-action-left">
                    <table>
                        ${this._renderActionLeftBody()}
                    </table>
                </div>
            `;
        }

        return null;
    }

    _renderActionLeftHeader() {
        return html`
            <thead>
                <tr>
                    <th>
                        <obap-data-table-selector-cell ?indeterminate="${(this.selectedRows.length > 0) && (this.selectedRows.length < this.rows.length)}" ?selected="${this.selectedRows.length === this.rows.length}"></obap-data-table-selector-cell>
                    </th>
                </tr>
            </thead>
        `;
    }

    _renderActionLeftBody() {
        return html`
            <tbody>
                ${repeat(this.sortedRows, (row) => row[this.idField], (row, rowIndex) => html`
                    <tr>
                        <td><obap-data-table-selector-cell row-index="${rowIndex}" ?selected="${this.effectiveSelectedRows.indexOf(row) > -1}"></obap-data-table-selector-cell></td>
                    </tr>
                `)}
            </tbody>
        `;
    }

    _renderScrollHeader(visible) {
        return html`
            <thead>
                <tr class="header-row" ?collapsed="${!visible}">
                    ${this.columns.map((column, index) => html`
                        <th>
                            <obap-data-table-header-cell .column="${column}" ?sorted="${index === this.sortIndex}" ?visible="${visible}"
                                                         ?sort-descending="${this.sortDescending}" column-index="${index}"
                                                         @click="${(visible && column.sortable) ? this._onColumnClick : null}">
                            </obap-data-table-header-cell>
                        </th>
                    `)}
                </tr>
            </thead>
        `;
    }

    _renderScrollBody() {
        return html`
            <tbody>
                ${repeat(this.sortedRows, (row) => row[this.idField], (row) => html`
                    <tr class="body-row">${this.columns.map((column) => this._renderBodyCell(column, row))}</tr>
                `)}
            </tbody>
        `;
    }

    _renderBodyCell(column, row) {
        return html`
            <td>
                <obap-data-table-body-cell .column="${column}" .row="${row}" .value="${row[column.field]}" false-icon="${column.falseIcon}" true-icon="${column.trueIcon}"></obap-data-table-body-cell>
            </td>
        `;
    }

    _resizeHeaderCells() {
        const visibleCells = this.renderRoot.querySelector('tr.header-row:not([collapsed])').querySelectorAll('th');
        const invisibleCells = this.renderRoot.querySelector('tr.header-row[collapsed]').querySelectorAll('th');

        for (let i = 0; i < invisibleCells.length; i++) {
            visibleCells[i].style.width = invisibleCells[i].clientWidth + 'px';
            visibleCells[i].style.minWidth = invisibleCells[i].clientWidth + 'px';
        }
    }

    _onColumnClick(e) {
        this.sortColumn(e.target.columnIndex);
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
}

window.customElements.define('obap-data-table-lite', ObapDataTableLite);
