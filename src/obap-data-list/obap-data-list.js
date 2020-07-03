
/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { repeat } from 'lit-html/directives/repeat.js';
import {classMap} from 'lit-html/directives/class-map.js';
import { caption, body } from '../obap-styles/obap-typography.js';
import { ObapDataTableController } from '../obap-data-table-layout/obap-data-table-controller.js';
import '../obap-data-table-layout/obap-data-table-layout.js';
import '../obap-icon/obap-icon.js';
import '../obap-check/obap-check.js';

/**
 * A simple Material Design data table with minimal features which is suitable for small data sets (performance will be an issue if you have a large number of rows). The following features are supported:
 * 
 * Fixed header and scrollable rows.
 * Text, number, boolean, enum and action columns.
 * Value prefixes and suffixes.
 * Simple action columns.
 * Row selection (none, single and multiple).
 * Column sorting.
 * Optional icons for booelan columns
 * 
 * If you need a more feature rich data grid or need to support a large number of rows (more than about 100) then use 'obap-data-table'.
 * 
 * ## Usage
 * 
 * ```javascript
 * let columns = [
 *     { label: '', field: '', type: '', suffix: '', prefix: '', actionLabel: '', trueIcon: '', falseIcon: '', sortable: true }
 * ];
 * 
 * let rows = [
 * 
 * ]
 * 
 * <obap-data-list .columns="${columns}" .rows="${rows}">
 * 
 * </obap-data-list>
 * ```
 */
export class ObapDataList extends ObapDataTableController(ObapElement) {
    static get styles() {
        return [caption, body, css`
            :host {
                --obap-data-list-background-color: var(--obap-surface---obap-data-list-action-color, #FFFFFF);
                --obap-data-list-fixed-background-color: #EEEEEE;
                --obap-data-list-action-color: var(--obap-primary-color, #5c6bc0);
                --obap-data-list-disabled-action-color: var(--obap-text-disabled-color, rgba(0, 0, 0, 0.38));
                --obap-data-list-true-color: var(--obap-text-primary-color, rgba(0, 0, 0, 0.87));
                --obap-data-list-false-color: var(--obap-text-primary-color, rgba(0, 0, 0, 0.87));
                --obap-data-list-row-height: 32px;
                display: block;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            obap-icon {
                width: 14px;
                height: 14px;
            }

            obap-data-table-layout {
                --obap-data-table-layout-header-fixed-left-border-width: 0 1px 1px 0;
                --obap-data-table-layout-header-scroll-border-width: 0 0 1px 0;
                --obap-data-table-layout-header-fixed-right-border-width: 0 0 1px 1px;

                --obap-data-table-layout-body-fixed-left-border-width: 0 1px 0 0;
                --obap-data-table-layout-footer-fixed-left-border-width: 1px 1px 0 0;
                
                /*
                --obap-data-table-layout-background-color: var(--obap-data-list-fixed-background-color);

                --obap-data-table-layout-header-fixed-left-color: inherit;
                --obap-data-table-layout-header-fixed-left-background-color: var(--obap-data-list-fixed-background-color);

                --obap-data-table-layout-body-fixed-left-color: inherit;
                --obap-data-table-layout-body-fixed-left-background-color: var(--obap-data-list-fixed-background-color);

                --obap-data-table-layout-header-scroll-color: inherit;
                --obap-data-table-layout-header-scroll-background-color: var(--obap-data-list-fixed-background-color);

                --obap-data-table-layout-body-scroll-color: inherit;
                --obap-data-table-layout-body-scroll-background-color: var(--obap-data-list-background-color);
                */
                height: 100%;
            }

            table {
                border-spacing: 0;
                color: var(--obap-text-primary-color, rgba(0, 0, 0, 0.87));
            }

            tr {
                height: var(--obap-data-list-row-height);
                line-height: var(--obap-data-list-row-height);
            }

            th, td {
                padding: 0 20px;
                margin: 0;
                box-sizing: border-box;
            }

            th {
                font-weight: 500;
            }

            th[sortable] {
                cursor: pointer;
            }

            td {
                border-bottom: 1px solid var(--obap-divider-on-surface-color, rgba(0, 0, 0, 0.20));
            }

            tr:last-of-type > td {
                border-bottom: 0;
            }     

            .header-cell-container {
                display: flex;
                flex-direction: row;
                align-items: center;
                pointer-events: none;
            }

            .header-cell-icon {
                margin: 0 4px 2px -18px;
                opacity: 0;
            }

            .header-cell-icon[active], th:hover .header-cell-icon {
                opacity: 1;
            }

            .header-cell-label {
                flex: 1;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .header-cell-label[type="number"] {
                text-align: right;
            }

            .header-cell-label[type="boolean"], .header-cell-label[type="action"] {
                text-align: center;
            }

            .body-cell-container {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                text-overflow: ellipsis;
                white-space: nowrap;
                min-height: var(--obap-data-list-row-height);
                height: var(--obap-data-list-row-height);
            }

            .body-cell-container[type="number"] {
                justify-content: flex-end;
            }

            .body-cell-container[type="boolean"] {
                justify-content: center;
            }

            .body-cell-container[type="action"] {
                justify-content: center;
                color: var(--obap-data-list-action-color);
                text-transform: uppercase;
                font-weight: 500;
                cursor: pointer;
            }

            .body-cell-icon {
                fill: var(--obap-data-list-false-color);
            }

            .body-cell-icon[is-true] {
                fill: var(--obap-data-list-true-color);
            }

            .collapse {
                height: 0;
                min-height: 0;
                line-height: 0;
                overflow: hidden;
            }

            .compact {
                padding: 0 0 0 8px;
            }
        `];
    }

    static get properties() {
        return {
            falseIcon: {
                type: String,
                attribute: 'false-icon'
            },

            trueIcon: {
                type: String,
                attribute: 'true-icon'
            }
        }
    }

    constructor() {
        super();
        this.falseIcon = 'core:cross';
        this.trueIcon = 'core:check';
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        this._scrollHeaderContainer = this.renderRoot.getElementById('scroll-header-container');
        this._fixedBodyContainer = this.renderRoot.getElementById('fixed-body-container');
        requestAnimationFrame(() => this._resizeHeaderCells());
    }

    render() {
        return html`
            <obap-data-table-layout @obap-data-table-layout-size-changed="${() => requestAnimationFrame(() => this._resizeHeaderCells())}">
                ${(this.selectionMode === 'multiple') ? 
                html`
                    <div class="header-fixed-left" slot="header-fixed-left">
                        <table id="header-fixed-table">
                            ${this._renderFixedHeader(true)}
                        </table>
                    </div>  
                    <div class="body-fixed-left" slot="body-fixed-left">
                        <table id="body-fixed-table">
                            ${this._renderFixedBody()}
                        </table>
                    </div>
                ` : null
                }

                <div id="header-scroll" class="header-scroll" slot="header-scroll">
                    <table id="header-scroll-table">
                        ${this._renderScrollHeader(true)}
                    </table>
                </div> 

                <div class="body-scroll" slot="body-scroll">
                    <table id="body-scroll-table">
                        ${this._renderScrollHeader(false)}
                        ${this._renderScrollBody()}
                    </table>
                </div> 
            </obap-data-table-layout>
        `;
    }

    _renderScrollHeader(visible) {
        const id = visible ? 'visible-header' : 'invisible-header';
        let classes = { collapse: !visible };

        return html`
            <thead>
                <tr id="${id}" class=${classMap(classes)}>
                    ${this.columns.map((column, index) => this._renderHeaderCell(column, index, visible))}
                </tr>
            </thead>
        `;
    }

    _renderFixedHeader(visible) {
        const id = visible ? 'visible-header' : 'invisible-header';
        let classes = { collapse: !visible, 'header-cell-container': true };

        return html`
            <thead>
                <tr class=${classMap(classes)}>
                    <th class="compact">
                        <div class=${classMap(classes)} style="pointer-events: all;"><obap-check no-ink></obap-check></div>
                    </th>
                </tr>
            </thead>
        `;
    }

    _renderScrollBody() {
        return html`
            <tbody>
                ${repeat(this.sortedRows, (row) => row[this.idField], (row, rowIndex) => html`
                    <tr>${this.columns.map((column, columnIndex) => this._renderBodyCell(column, row, columnIndex, rowIndex))}</tr>
                `)}
            </tbody>
        `;
    }

    _renderFixedBody() {
        return html`
            <tbody>
                ${repeat(this.sortedRows, (row) => row[this.idField], (row, rowIndex) => html`
                    <tr>
                        <td class="compact"><div class="body-cell-container"><obap-check no-ink></obap-check></div></td>
                    </tr>
                `)}
            </tbody>
        `;
    }

    _renderHeaderCell(column, index, visible) {
        let classes = { 'header-cell-container': true, collapse: !visible };

        return html`
            <th .columnIndex="${column.sortable ? index : -1}" ?sortable="${column.sortable}" @click="${visible ? this._onColumnClick : null}">
                <div class=${classMap(classes)}>
                    ${column.sortable ? html`<obap-icon class="header-cell-icon" ?active="${index === this.sortIndex}" icon="${this._getSortIcon(column, index)}"></obap-icon>` : null}
                    <div type="${column.type}" class="header-cell-label">${column.label}</div>
                </div>
            </th>
        `;
    }

    _renderBodyCell(column, row, columnIndex, rowIndex) {
        const value = row[column.field];

        if ((column.field) && ((value === undefined) || (value === null))) {
            return html`<td></td>`;
        }

        switch (column.type) {
            case 'boolean': {
                return html`
                    <td>
                        <div class="body-cell-container" type="${column.type}">
                            <obap-icon class="body-cell-icon" ?is-true="${value}" icon="${value ? this.trueIcon : this.falseIcon}"></obap-icon>
                        </div>
                    </td>`;
            }

            case 'action': {
                return html`
                    <td>
                        <div class="body-cell-container" type="${column.type}" .columnIndex="${columnIndex}" .rowIndex="${rowIndex}" @click="${this._onActionClick}">
                            ${column.actionLabel}
                        </div>
                    </td>`;
            }

            default: {
                return html`
                    <td>
                        <div class="body-cell-container" type="${column.type}">
                            ${column.prefix + value + column.suffix}
                        </div>
                    </td>`;
            }
        }
    }

    _getSortIcon(column, index) {
        if (column.sortable) {
            if (this.sortIndex === index) {
                return this.sortDescending ? 'core:arrow-down' : 'core:arrow-up';
            }

            return 'core:arrow-up';
        }

        return '';
    }

    _onActionClick(e) {
        this._fireEvent('obap-data-list-action', {
            rowIndex: e.target.rowIndex,
            columnIndex: e.target.columnIndex
        });
    }
    
    _onColumnClick(e) {
        const columnIndex = e.target.columnIndex;

        if (columnIndex > -1) {
            if (columnIndex === this.sortIndex) {
                this.sortDescending = !this.sortDescending;
            } else {
                this.sortIndex = columnIndex;
                this.sortDescending = false;
            }
        }
    }

    _resizeHeaderCells() {
        const visibleCells = this.renderRoot.getElementById('visible-header').querySelectorAll('.header-cell-container');
        const invisibleCells = this.renderRoot.getElementById('invisible-header').querySelectorAll('.header-cell-container');

        for (let i = 0; i < invisibleCells.length; i++) {
            visibleCells[i].style.width = invisibleCells[i].clientWidth + 'px';
        }
    }
}

window.customElements.define('obap-data-list', ObapDataList);