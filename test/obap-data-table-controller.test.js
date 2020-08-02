/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { fixture, expect, nextFrame, oneEvent } from '@open-wc/testing';
import { html, css, svg, ObapElement } from '../src/obap-element/obap-element.js';
import { ObapDataTableController } from '../src/obap-data-table/obap-data-table-controller.js';

let columns = [
    { label: 'Dessert (100g serving)', field: 'dessert',   type: 'text',    suffix: '',  prefix: '',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
    { label: 'Price',                  field: 'price',     type: 'number',  suffix: '',  prefix: '$', actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
    { label: 'Calories',               field: 'calories',  type: 'number',  suffix: '',  prefix: '',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
    { label: 'Fat (g)',                field: 'fat',       type: 'number',  suffix: '',  prefix: '',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
    { label: 'Carbs (g)',              field: 'carbs',     type: 'number',  suffix: '',  prefix: '',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
    { label: 'Protein (g)',            field: 'protein',   type: 'number',  suffix: '',  prefix: '',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
    { label: 'Sodium (mg)',            field: 'sodium',    type: 'number',  suffix: '',  prefix: '',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
    { label: 'Calcium (%)',            field: 'calcium',   type: 'number',  suffix: '%', prefix: '',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
    { label: 'Iron (%)',               field: 'iron',      type: 'number',  suffix: '%', prefix: '',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
    { label: 'In Stock',               field: 'available', type: 'boolean', suffix: '',  prefix: '',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true },
    { label: 'Add to Cart',            field: '',          type: 'action',  suffix: '',  prefix: '',  actionLabel: 'Add', trueIcon: '', falseIcon: '', sortable: false }
];

let rows = [
    { id: 0, dessert: 'Frozen Yoghurt'    , price: 4.50, calories: 159, fat: 6.0,  carbs: 24, protein: 4.0, sodium: 87,  calcium: 14, iron: 1,  available: true  },
    { id: 1, dessert: 'Ice Cream Sandwich', price: 3.99, calories: 237, fat: 9.0,  carbs: 37, protein: 4.3, sodium: 129, calcium: 8,  iron: 1,  available: true  },
    { id: 2, dessert: 'Eclair'            , price: 2.99, calories: 262, fat: 16.0, carbs: 24, protein: 6.0, sodium: 337, calcium: 6,  iron: 7,  available: false },
    { id: 3, dessert: 'Cupcake'           , price: 2.50, calories: 305, fat: 3.7,  carbs: 67, protein: 4.3, sodium: 413, calcium: 3,  iron: 8,  available: true  },
    { id: 4, dessert: 'Gingerbread'       , price: 1.75, calories: 356, fat: 16.0, carbs: 49, protein: 3.9, sodium: 327, calcium: 7,  iron: 16, available: true  },
    { id: 5, dessert: 'Jelly Bean'        , price: 0.35, calories: 375, fat: 0.0,  carbs: 94, protein: 0.0, sodium: 50,  calcium: 0,  iron: 0,  available: true  },
    { id: 6, dessert: 'Lollipop'          , price: 0.50, calories: 392, fat: 0.2,  carbs: 98, protein: 0.0, sodium: 38,  calcium: 0,  iron: 2,  available: false },
    { id: 7, dessert: 'Honeycomb'         , price: 1.45, calories: 408, fat: 3.2,  carbs: 87, protein: 6.5, sodium: 562, calcium: 0,  iron: 45, available: false },
    { id: 8, dessert: 'Donut'             , price: 0.99, calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: 2,  iron: 22, available: true  },
    { id: 9, dessert: 'KitKat'            , price: 0.99, calories: 518, fat: 26.0, carbs: 65, protein: 7.0, sodium: 54,  calcium: 12, iron: 6,  available: true  },

    { id: 0, dessert: 'Frozen Yoghurt'    , price: 4.50, calories: 159, fat: 6.0,  carbs: 24, protein: 4.0, sodium: 87,  calcium: 14, iron: 1,  available: true  },
    { id: 1, dessert: 'Ice Cream Sandwich', price: 3.99, calories: 237, fat: 9.0,  carbs: 37, protein: 4.3, sodium: 129, calcium: 8,  iron: 1,  available: true  },
    { id: 2, dessert: 'Eclair'            , price: 2.99, calories: 262, fat: 16.0, carbs: 24, protein: 6.0, sodium: 337, calcium: 6,  iron: 7,  available: false },
    { id: 3, dessert: 'Cupcake'           , price: 2.50, calories: 305, fat: 3.7,  carbs: 67, protein: 4.3, sodium: 413, calcium: 3,  iron: 8,  available: true  },
    { id: 4, dessert: 'Gingerbread'       , price: 1.75, calories: 356, fat: 16.0, carbs: 49, protein: 3.9, sodium: 327, calcium: 7,  iron: 16, available: true  },
    { id: 5, dessert: 'Jelly Bean'        , price: 0.35, calories: 375, fat: 0.0,  carbs: 94, protein: 0.0, sodium: 50,  calcium: 0,  iron: 0,  available: true  },
    { id: 6, dessert: 'Lollipop'          , price: 0.50, calories: 392, fat: 0.2,  carbs: 98, protein: 0.0, sodium: 38,  calcium: 0,  iron: 2,  available: false },
    { id: 7, dessert: 'Honeycomb'         , price: 1.45, calories: 408, fat: 3.2,  carbs: 87, protein: 6.5, sodium: 562, calcium: 0,  iron: 45, available: false },
    { id: 8, dessert: 'Donut'             , price: 0.99, calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: 2,  iron: 22, available: true  },
    { id: 9, dessert: 'KitKat'            , price: 0.99, calories: 518, fat: 26.0, carbs: 65, protein: 7.0, sodium: 54,  calcium: 12, iron: 6,  available: true  }
]; 

let selectedRowsSingle = rows.filter((row, index) => index % 2 === 0);
let selectedRowsMultiple = rows.filter((row, index) => index % 2 === 0);

class TestDataTableController extends ObapDataTableController(ObapElement) {
    
}

window.customElements.define('test-data-table-controller', TestDataTableController);

describe('obap-data-table-controller', () => {
    it('can set columns and rows', async () => {  
        const el = await fixture(html`
            <test-data-table-controller .columns="${columns}" .rows="${rows}">
            </test-data-table-controller>
        `);

        await nextFrame();

        expect(el).to.not.equal(null);
        expect(el.columns.length).to.equal(11);
        expect(el.rows.length).to.equal(20);
    });

    it('does not sort by default', async () => {  
        const el = await fixture(html`
            <test-data-table-controller .columns="${columns}" .rows="${rows}">
            </test-data-table-controller>
        `);

        await nextFrame();

        expect(el.rows[0].dessert).to.equal('Frozen Yoghurt');
        let sortedRows = el.sortedRows;
        expect(el.rows[0].dessert).to.equal('Frozen Yoghurt');
    });

    it('can sort by text fields', async () => {  
        const el = await fixture(html`
            <test-data-table-controller .columns="${columns}" .rows="${rows}" sort-index="0">
            </test-data-table-controller>
        `);

        await nextFrame();

        let sortedRows = el.sortedRows;
        expect(el.rows[0].dessert).to.equal('Cupcake');

        el.sortDescending = true;

        sortedRows = el.sortedRows;
        expect(el.rows[0].dessert).to.equal('Lollipop');

        el.sortDescending = false;

        sortedRows = el.sortedRows;
        expect(el.rows[0].dessert).to.equal('Cupcake');
    });

    it('can sort by number fields', async () => {  
        const el = await fixture(html`
            <test-data-table-controller .columns="${columns}" .rows="${rows}" sort-index="1">
            </test-data-table-controller>
        `);

        await nextFrame();

        let sortedRows = el.sortedRows;
        expect(el.rows[0].price).to.equal(0.35);

        el.sortDescending = true;

        sortedRows = el.sortedRows;
        expect(el.rows[0].price).to.equal(4.50);

        el.sortDescending = false;

        sortedRows = el.sortedRows;
        expect(el.rows[0].price).to.equal(0.35);
    });

    it('can sort by boolean fields', async () => {  
        const el = await fixture(html`
            <test-data-table-controller .columns="${columns}" .rows="${rows}" sort-index="9">
            </test-data-table-controller>
        `);

        await nextFrame();

        let sortedRows = el.sortedRows;
        expect(el.rows[0].available).to.equal(false);

        el.sortDescending = true;

        sortedRows = el.sortedRows;
        expect(el.rows[0].available).to.equal(true);

        el.sortDescending = false;

        sortedRows = el.sortedRows;
        expect(el.rows[0].available).to.equal(false);
    });

    it('can fire events', async () => {  
        const el = await fixture(html`
            <test-data-table-controller>
            </test-data-table-controller>
        `);

        await nextFrame();

        setTimeout(() => el.fireMessage('test-event', {}));

        const { detail } = await oneEvent(el, 'test-event');

        expect(detail).to.not.equal(null);

    });

    it('can select all rows if selection mode is multiple only', async () => {  
        const el = await fixture(html`
            <test-data-table-controller .columns="${columns}" .rows="${rows}">
            </test-data-table-controller>
        `);

        await nextFrame();

        el.selectionMode = 'none';
        el.selectAllRows();
        expect(el.selectedRows.length).to.equal(0);

        el.selectionMode = 'single';
        el.selectAllRows();
        expect(el.selectedRows.length).to.equal(0);

        el.selectionMode = 'multiple';
        el.selectAllRows();
        expect(el.selectedRows.length).to.equal(20);

        el.deselectAllRows();
        expect(el.selectedRows.length).to.equal(0);
    });

    it('ignores row selection if selection mode is none', async () => {  
        const el = await fixture(html`
            <test-data-table-controller .columns="${columns}" .rows="${rows}" selection-mode="none">
            </test-data-table-controller>
        `);

        await nextFrame();

        el.selectRow(1);
        expect(el.selectedRows.length).to.equal(0);

        el.deselectRow(1);
        expect(el.selectedRows.length).to.equal(0);
    });

    it('only allows a single row to be selected if selection mode is none', async () => {  
        const el = await fixture(html`
            <test-data-table-controller .columns="${columns}" .rows="${rows}" selection-mode="single">
            </test-data-table-controller>
        `);

        await nextFrame();

        el.selectRow(1);
        expect(el.selectedRows.length).to.equal(1);

        el.selectRow(2);
        expect(el.selectedRows.length).to.equal(1);

        el.deselectRow(1);
        expect(el.selectedRows.length).to.equal(1);

        el.deselectRow(2);
        expect(el.selectedRows.length).to.equal(0);
    });

    it('only allows multiple rows to be selected if selection mode is multiple', async () => {  
        const el = await fixture(html`
            <test-data-table-controller .columns="${columns}" .rows="${rows}" selection-mode="multiple">
            </test-data-table-controller>
        `);

        await nextFrame();

        el.selectRow(1);
        expect(el.selectedRows.length).to.equal(1);

        el.selectRow(2);
        expect(el.selectedRows.length).to.equal(2);

        el.deselectRow(1);
        expect(el.selectedRows.length).to.equal(1);

        el.deselectRow(2);
        expect(el.selectedRows.length).to.equal(0);
    });

    it('does not error if invalid selection indices are used', async () => {  
        const el = await fixture(html`
            <test-data-table-controller .columns="${columns}" .rows="${rows}" selection-mode="multiple">
            </test-data-table-controller>
        `);

        await nextFrame();

        el.selectRow(30);
        expect(el.selectedRows.length).to.equal(0);

        el.deselectRow(30);
        expect(el.selectedRows.length).to.equal(0);
    });

    it('fires a selection changed event', async () => {  
        const el = await fixture(html`
            <test-data-table-controller .columns="${columns}" .rows="${rows}" selection-mode="multiple">
            </test-data-table-controller>
        `);

        await nextFrame();

        setTimeout(() => el.selectRow(1));
        let e = await oneEvent(el, 'obap-data-selection-changed');
        await nextFrame();
        expect(e).to.not.equal(null);

        setTimeout(() => el.deselectRow(1));
        e = await oneEvent(el, 'obap-data-selection-changed');
        await nextFrame();
        expect(e).to.not.equal(null);

        setTimeout(() => el.selectAllRows());
        e = await oneEvent(el, 'obap-data-selection-changed');
        await nextFrame();
        expect(e).to.not.equal(null);

        setTimeout(() => el.deselectAllRows());
        e = await oneEvent(el, 'obap-data-selection-changed');
        await nextFrame();
        expect(e).to.not.equal(null);
    });

    it('returns the effective selected rows in single selection mode', async () => {  
        const el = await fixture(html`
            <test-data-table-controller .columns="${columns}" .rows="${rows}" .selectedRows="${selectedRowsSingle}" selection-mode="single">
            </test-data-table-controller>
        `);

        await nextFrame();

        const result = el.effectiveSelectedRows;
        expect(result).to.not.equal(null);
        expect(result.length).to.equal(1);
    });

    it('returns no effective selected rows in single selection mode', async () => {  
        const el = await fixture(html`
            <test-data-table-controller .columns="${columns}" .rows="${rows}" selection-mode="single">
            </test-data-table-controller>
        `);

        await nextFrame();

        const result = el.effectiveSelectedRows;
        expect(result).to.not.equal(null);
        expect(result.length).to.equal(0);
    });

    it('returns the effective selected rows in multiple selection mode', async () => {  
        const el = await fixture(html`
            <test-data-table-controller .columns="${columns}" .rows="${rows}" .selectedRows="${selectedRowsMultiple}" selection-mode="multiple">
            </test-data-table-controller>
        `);

        await nextFrame();

        const result = el.effectiveSelectedRows;
        expect(result).to.not.equal(null);
        expect(result.length).to.equal(10);
    });

    it('sets sort parameters', async () => {  
        const el = await fixture(html`
            <test-data-table-controller .columns="${columns}" .rows="${rows}">
            </test-data-table-controller>
        `);

        await nextFrame();

        el.sortColumn(0);
        expect(el.sortIndex).to.equal(0);
        expect(el.sortDescending ).to.equal(false);

        el.sortColumn(0);
        expect(el.sortIndex).to.equal(0);
        expect(el.sortDescending ).to.equal(true);

        el.sortColumn(1);
        expect(el.sortIndex).to.equal(1);
        expect(el.sortDescending ).to.equal(false);

        el.sortColumn(-1);
        expect(el.sortIndex).to.equal(1);
        expect(el.sortDescending ).to.equal(false);

        el.sortColumn(11);
        expect(el.sortIndex).to.equal(1);
        expect(el.sortDescending ).to.equal(false);
    });
});

