/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, oneEvent } from '@open-wc/testing';
import '../src/obap-data-list/obap-data-list.js';

 let columns = [
    { label: 'Dessert (100g serving)', field: 'dessert',   type: 'text',    suffix: '',  prefix: '',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
    { label: 'Price',                  field: 'price',     type: 'number',  suffix: '',  prefix: '$', actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true, decimals: 2  },
    { label: 'Calories',               field: 'calories',  type: 'number',  suffix: '',  prefix: '',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
    { label: 'Fat (g)',                field: 'fat',       type: 'number',  suffix: '',  prefix: '',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
    { label: 'Carbs (g)',              field: 'carbs',     type: 'number',  suffix: '',  prefix: '',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
    { label: 'Protein (g)',            field: 'protein',   type: 'number',  suffix: '',  prefix: '',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
    { label: 'Sodium (mg)',            field: 'sodium',    type: 'number',  suffix: '',  prefix: '',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: false },
    { label: 'Calcium (%)',            field: 'calcium',   type: 'number',  suffix: '%', prefix: '',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
    { label: 'Iron (%)',               field: 'iron',      type: 'number',  suffix: '%', prefix: '',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: false },
    { label: 'In Stock',               field: 'available', type: 'boolean', suffix: '',  prefix: '',  actionLabel: '',    trueIcon: '', falseIcon: '', sortable: true  },
    { label: 'Add to Cart',            field: '',          type: 'action',  suffix: '',  prefix: '',  actionLabel: 'Add', trueIcon: '', falseIcon: '', sortable: false }
];

let rows = [
    { id: 0, dessert: 'Frozen yoghurt'    , price: '4.50', calories: '159', fat: '6.0',  carbs: '24', protein: '4.0', sodium: '87',  calcium: '14', iron: '1',   available: true  },
    { id: 1, dessert: 'Ice cream sandwich', price: '3.99', calories: '237', fat: '9.0',  carbs: '37', protein: '4.3', sodium: '129', calcium: '8',  iron: '1',  available: true  },
    { id: 2, dessert: 'Eclair'            , price: '2.99', calories: '262', fat: '16.0', carbs: '24', protein: '6.0', sodium: '337', calcium: '6',  iron: '7',  available: false },
    { id: 3, dessert: 'Cupcake'           , price: '2.50', calories: '305', fat: '3.7',  carbs: '67', protein: '4.3', sodium: '413', calcium: '3',  iron: '8',  available: true  },
    { id: 4, dessert: 'Gingerbread'       , price: '1.75', calories: '356', fat: '16.0', carbs: '49', protein: '3.9', sodium: '327', calcium: '7',  iron: '16', available: true  },
    { id: 5, dessert: 'Jelly bean'        , price: '0.35', calories: '375', fat: '0.0',  carbs: '94', protein: '0.0', sodium: '50',  calcium: '0',  iron: '0',  available: true  },
    { id: 6, dessert: 'Lollipop'          , price: '0.50', calories: '392', fat: '0.2',  carbs: '98', protein: '0.0', sodium: '38',  calcium: '0',  iron: '2',  available: false },
    { id: 7, dessert: 'Honeycomb'         , price: '1.45', calories: '408', fat: '3.2',  carbs: '87', protein: '6.5', sodium: '562', calcium: '0',  iron: '45', available: false },
    { id: 8, dessert: 'Donut'             , price: '0.99', calories: '452', fat: '25.0', carbs: '51', protein: '4.9', sodium: '326', calcium: '2',  iron: '22', available: true  },
    { id: 9, dessert: 'KitKat'            , price: '0.99', calories: '518', fat: '26.0', carbs: '65', protein: '7.0', sodium: '54',  calcium: '12',  available: true  }
];  

describe('obap-data-list', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-data-list></obap-data-list>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

    it('can be created', async () => {     
        const el = await fixture(html`
            <obap-data-list .columns="${columns}" .rows="${rows}"></obap-data-list>
        `);

        await nextFrame();

        expect(el).to.not.equal(null);
        expect(el.selectionMode).to.equal('none');
    });

    it('supports single select mode', async () => {     
        const el = await fixture(html`
            <obap-data-list .columns="${columns}" .rows="${rows}" selection-mode="single"></obap-data-list>
        `);

        await nextFrame();
        const checkBoxes = el.renderRoot.querySelectorAll('obap-check');

        expect(el.selectionMode).to.equal('single');
        expect(checkBoxes.length).to.equal(10);
    });

    it('supports multi select mode', async () => {     
        const el = await fixture(html`
            <obap-data-list .columns="${columns}" .rows="${rows}" selection-mode="multiple"></obap-data-list>
        `);

        await nextFrame();
        const checkBoxes = el.renderRoot.querySelectorAll('obap-check');

        expect(el.selectionMode).to.equal('multiple');
        expect(checkBoxes.length).to.equal(11);
    });

    it('displays sort icons', async () => {     
        const el = await fixture(html`
            <obap-data-list .columns="${columns}" .rows="${rows}" selection-mode="multiple" sort-index="1" sort-descending></obap-data-list>
        `);

        await nextFrame();
        
        let downIcons = el.renderRoot.querySelectorAll('obap-icon[icon="core:arrow-down"]');
        let upIcons = el.renderRoot.querySelectorAll('obap-icon[icon="core:arrow-up"]');

        expect(el.sortIndex).to.equal(1);
        expect(el.sortDescending).to.equal(true);
        expect(downIcons.length).to.equal(2);
        expect(upIcons.length).to.equal(0);

        el.sortDescending = false;

        await nextFrame();
        
        downIcons = el.renderRoot.querySelectorAll('obap-icon[icon="core:arrow-down"]');
        upIcons = el.renderRoot.querySelectorAll('obap-icon[icon="core:arrow-up"]');

        expect(el.sortIndex).to.equal(1);
        expect(el.sortDescending).to.equal(false);
        expect(downIcons.length).to.equal(0);
        expect(upIcons.length).to.equal(2);
    });

    it('sorts by clicking on columns', async () => {     
        const el = await fixture(html`
            <obap-data-list .columns="${columns}" .rows="${rows}"></obap-data-list>
        `);

        await nextFrame();
        const columnList = [...el.renderRoot.querySelectorAll('th[sortable]')].filter((c) => c.columnIndex > -1);

        expect(columnList.length).to.equal(8);

        columnList[2].click();
        await nextFrame();

        expect(el.sortIndex).to.equal(2);
        expect(el.sortDescending).to.equal(false);

        columnList[2].click();
        await nextFrame();

        expect(el.sortIndex).to.equal(2);
        expect(el.sortDescending).to.equal(true);

        columnList[1].click();
        await nextFrame();

        expect(el.sortIndex).to.equal(1);
        expect(el.sortDescending).to.equal(false);
    });

    it('ignores invalid columns', async () => {     
        const el = await fixture(html`
            <obap-data-list .columns="${columns}" .rows="${rows}"></obap-data-list>
        `);

        await nextFrame();
        
        expect(el.sortIndex).to.equal(-1);
        expect(el.sortDescending).to.equal(false);

        el._onColumnClick({ target: {
            columnIndex: -1
        }});

        expect(el.sortIndex).to.equal(-1);
        expect(el.sortDescending).to.equal(false);
    });

    it('invokes actions', async () => {     
        const el = await fixture(html`
            <obap-data-list .columns="${columns}" .rows="${rows}"></obap-data-list>
        `);

        await nextFrame();
        const actionList = [...el.renderRoot.querySelectorAll('.body-cell-container[type="action"]')];

        expect(actionList.length).to.equal(10);
 
        setTimeout(() => actionList[1].click());

        const { detail } = await oneEvent(el, 'obap-data-action');
        expect(detail).to.not.equal(null);

        expect(detail.rowIndex).to.equal(1);
        expect(detail.columnIndex).to.equal(10);
    });

    it('selects multiple rows by checking checkboxes in multiple mode', async () => {     
        const el = await fixture(html`
            <obap-data-list .columns="${columns}" .rows="${rows}" selection-mode="multiple"></obap-data-list>
        `);

        await nextFrame();
        const checkList = [...el.renderRoot.querySelectorAll('obap-check')];

        expect(el.selectedRows.length).to.equal(0);
        expect(checkList.length).to.equal(11);
        checkList[0].indeterminate = false;

        checkList[0].selected = true;
        expect(el.selectedRows.length).to.equal(10);
        checkList[0].indeterminate = false;

        checkList[0].selected = false;
        expect(el.selectedRows.length).to.equal(0);

        checkList[1].selected = true;
        expect(el.selectedRows.length).to.equal(1);
        checkList[0].indeterminate = true;

        checkList[2].selected = true;
        expect(el.selectedRows.length).to.equal(2);
        checkList[0].indeterminate = true;

        checkList[2].selected = false;
        expect(el.selectedRows.length).to.equal(1);
        checkList[0].indeterminate = true;

        checkList[1].selected = false;
        expect(el.selectedRows.length).to.equal(0);
        checkList[0].indeterminate = false;

        checkList[0].selected = true;
        checkList[0].indeterminate = false;

        checkList[1].selected = false;
        checkList[0].indeterminate = true;
    });

    it('selects a single by checking checkboxes in single mode', async () => {     
        const el = await fixture(html`
            <obap-data-list .columns="${columns}" .rows="${rows}" selection-mode="single"></obap-data-list>
        `);

        await nextFrame();
        const checkList = [...el.renderRoot.querySelectorAll('obap-check')];

        expect(el.selectedRows.length).to.equal(0);
        expect(checkList.length).to.equal(10);

        checkList[0].selected = true;
        expect(el.selectedRows.length).to.equal(1);

        checkList[1].selected = true;
        expect(el.selectedRows.length).to.equal(1);

        checkList[0].selected = false;
        expect(el.selectedRows.length).to.equal(1);

        checkList[1].selected = false;
        expect(el.selectedRows.length).to.equal(0);
    });

    it('ignores multiple selected items in single mode', async () => { 
        const selectedRows = [rows[0], rows[1], rows[2]];

        const el = await fixture(html`
            <obap-data-list .columns="${columns}" .rows="${rows}" selection-mode="single" .selectedRows="${selectedRows}"></obap-data-list>
        `);

        await nextFrame();
        const checkList = [...el.renderRoot.querySelectorAll('obap-check')];

        expect(el.selectedRows.length).to.equal(3);
        expect(checkList[0].selected).to.equal(true);
        expect(checkList[1].selected).to.equal(false);
        expect(checkList[2].selected).to.equal(false);

        checkList[1].selected = true;
        expect(el.selectedRows.length).to.equal(1);
    });
});
