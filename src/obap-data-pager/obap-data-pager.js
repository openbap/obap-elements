/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { body } from '../obap-styles/obap-typography.js';
import '../obap-button/obap-button.js';
import '../obap-select/obap-select.js';

/**
 * A page switcher element for tables with a lot of data.
 */
export class ObapDataPager extends ObapElement {
    static get styles() {
        return [body, css`
            :host {
                display: block;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            obap-button[mini] {
                height: 32px;
                width: 32px;
                min-height: 32px;
                min-width: 32px;
                border-radius: 16px;
            }

            obap-select {
                margin-top: 2px;
            }

            .container {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .inner-container {
                display: flex;
                align-items: center;
                height: 100%;
                line-height: 100%;
            }

            .left {
                margin-right: 32px;
            }

            .right {
                margin-left: 32px;
            }
        `];
    }

    static get properties() {
        return {
            rowsPerPageLabel: {
                type: String,
                attribute: 'rows-per-page-label'
            },

            rowsPerPageCounts: {
                type: Array,
                attribute: 'rows-per-page-counts'
            },

            positionLabel: {
                type: String,
                attribute: 'position-label'
            },

            count: {
                type: Number,
                attribute: 'count'
            },

            page: {
                type: Number,
                attribute: 'page'
            },

            defaultPageSize: {
                type: Number,
                attribute: 'default-page-size'
            },

            startItem: {
                type: Number
            },

            endItem: {
                type: Number
            },

            pageCount: {
                type: Number
            },

            pageSize: {
                type: Number
            }
        }
    }

    get startItem() {
        return this._startItem;
    }

    get endItem() {
        return this._endItem;
    }

    get pageCount() {
        return this._pageCount;
    }

    get pageSize() {
        return this._pageSize;
    }

    constructor() {
        super();
        this.rowsPerPageLabel = 'Rows per page:';
        this.rowsPerPageCounts = [10, 25, 50];
        this.positionLabel = '{0} - {1} of {2}';
        this.count = 0;
        this.page = 1;
        this.defaultPageSize = 25;
        this._startItem = 0;
        this._endItem = 0;
        this._pageCount = 0;
        this._pageSize = 0;
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            if (propName === 'rowsPerPageCounts') {
                if (this.rowsPerPageCounts.length === 1) {
                    this._pageSize = this.rowsPerPageCounts[0];
                }
            }
            if ((propName === 'pageSize') || (propName === 'count')) {
                this.page = 1;
            }

            if ((propName === 'pageSize') || (propName === 'count') || (propName === 'page') || (propName === 'defaultPageSize')) {
                this._updateValues();
            }
        });
    }
    
    render() {
        return html`
            <div class="container typography-body">
                ${this._renderPageCountSelector()}
                <div class="inner-container">${this._format(this.positionLabel, [this.startItem, this.endItem, this.count])}</div>
                <div class="inner-container right">
                    <obap-button round mini icon="core:chevron-left" @click="${this.previousPage}" ?disabled="${this.page <= 1}"></obap-button>
                    <obap-button round mini icon="core:chevron-right" @click="${this.nextPage}" ?disabled="${this.page >= this.pageCount}"></obap-button>
                </div>
            </div>`;
    }

    _renderPageCountSelector() {
        if (this.rowsPerPageCounts && this.rowsPerPageCounts.length > 0) {
            if (this.rowsPerPageCounts.length > 1) {
                return html`
                    <div class="inner-container left">
                        <div>${this.rowsPerPageLabel}</div>
                        <obap-select border-style="none" .items="${this.rowsPerPageCounts}" selected-index="0" @obap-select-changed="${this._rowsPerPageChanged}"></obap-select>
                    </div>
                `;
            } else {
                return html`
                    <div class="inner-container left">
                        <div>${this.rowsPerPageLabel} ${this._pageSize}</div>
                    </div>
                `;
            }
        }

        return null;
    }

    previousPage() {
        if (this.page > 1) {
            this.page = this.page - 1;
        }
    }

    nextPage() {
        if (this.page < this.pageCount) {
            this.page = this.page + 1;
        }
    }

    _updateValues() {
        if (this.pageSize <= 0) {
            this._pageSize = this.defaultPageSize;
        }

        this._pageCount = Math.ceil(this.count / this.pageSize);

        if ((this.pageCount > 0) && (this.page > 0) && (this.page <= this.pageCount)) {
            this._startItem = ((this.page - 1) * this.pageSize) + 1;
            this._endItem = this._startItem +  this.pageSize - 1;

            if (this._endItem > this.count) {
                this._endItem = this.count;
            }
        }

        this.requestUpdate();
    }

    _rowsPerPageChanged(e) {
        const oldValue = this._pageSize;
        this._pageSize = this.rowsPerPageCounts[e.detail.selectedIndex];
        this.requestUpdate('pageSize', oldValue);
    }

    _format(value, params) {
        if (params) {
            for (var i = 0; i < params.length; i++) {
                value = value.replace(new RegExp("\\{" + i + "\\}", "gi"), params[i]);
            }
        }

        return value;
    }
}

window.customElements.define('obap-data-pager', ObapDataPager);