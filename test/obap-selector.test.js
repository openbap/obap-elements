/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, oneEvent, nextFrame } from '@open-wc/testing';
import '../src/obap-selector/obap-selector.js';

describe('obap-selector', () => {
    it('adds slotted children to items', async () => {
        const el = await fixture(html`
            <obap-selector>
                <div></div>
                <div></div>
            </obap-selector>
        `);

        expect(el).lightDom.to.equal(`
            <div></div>
            <div></div>
        `);

        expect(el.items.length).to.equal(2);
    });
    
    it('selects an item', async () => {
        const el = await fixture(html`
            <obap-selector>
                <div val="0"></div>
                <div val="1"></div>
            </obap-selector>
        `);

        const index = 1;
        el.select(index);
        const item = el.items[index];

        expect(el.selectedIndex).to.equal(index);
        expect(item.getAttribute('val')).to.equal(index.toString());
    });

    it('selects an item by index directly', async () => {
        const el = await fixture(html`
            <obap-selector>
                <div val="0"></div>
                <div val="1"></div>
            </obap-selector>
        `);

        const index = 1;
        el.selectedIndex = index;
        let item = el.items[index];

        expect(el.selectedIndex).to.equal(index);
        expect(item.getAttribute('val')).to.equal(index.toString());
    });

    it('can return index of item', async () => {
        const el = await fixture(html`
            <obap-selector>
                <div val="0"></div>
                <div val="1"></div>
            </obap-selector>
        `);

        const index = 1;
        const item = el.items[index];

        expect(el.indexOf(item)).to.equal(index);
    });

    it('can select an initial item', async () => {
        const el = await fixture(html`
            <obap-selector selected-index="1">
                <div val="0"></div>
                <div val="1"></div>
            </obap-selector>
        `);

        expect(el.selectedIndex).to.equal(1);
    });

    it('uses an attribute to indicate selection', async () => {
        const el = await fixture(html`
            <obap-selector selected-index="1">
                <div val="0"></div>
                <div val="1"></div>
            </obap-selector>
        `);

        const index = 1;
        const item = el.items[index];
        expect(item.hasAttribute('selected')).to.equal(true);
    });

    it('can select an item via click event', async () => {
        const el = await fixture(html`
            <obap-selector selected-index="0">
                <div val="0"></div>
                <div val="1"></div>
            </obap-selector>
        `);

        expect(el.selectedIndex).to.equal(0);
        el.items[1].click();
        expect(el.selectedIndex).to.equal(1);
    });

    // MULTI-SELECT 
    it('allows multi-selection', async () => {
        const el = await fixture(html`
            <obap-selector multi>
                <div val="0" selected></div>
                <div val="1" selected></div>
                <div val="2"></div>
            </obap-selector>
        `);

        expect(el.selectedItems.length).to.equal(2);
    });

    it('allows multi-selection toggle', async () => {
        const el = await fixture(html`
            <obap-selector multi>
                <div val="0" selected></div>
                <div val="1" selected></div>
                <div val="2"></div>
            </obap-selector>
        `);

        expect(el.selectedItems.length).to.equal(2);
        el.select(el.selectedItems[1]);
        expect(el.selectedItems.length).to.equal(1);
    });

    it('allows multi-selection toggle with a selected item index', async () => {
        const el = await fixture(html`
            <obap-selector multi selected-index="0">
                <div val="0"></div>
                <div val="1" selected></div>
                <div val="2" selected></div>
                <div val="3"></div>
            </obap-selector>
        `);

        expect(el.selectedItems.length).to.equal(3);
    });

    it('sorts multi-selection indices', async () => {
        const el = await fixture(html`
            <obap-selector multi>
                <div val="0"></div>
                <div val="1"></div>
                <div val="2"></div>
            </obap-selector>
        `);
        
        el.select(2);
        expect(el.selectedItems.length).to.equal(1);

        el.select(1);
        expect(el.selectedItems.length).to.equal(2);

        el.select(0);
        expect(el.selectedItems.length).to.equal(3);

        expect(el.selectedItems.join(',')).to.equals('0,1,2');
    });

    // EXCEPTIONS 
    it('throws an exception if items property is set directly', async () => {
        const el = await fixture(html`
            <obap-selector>
                <div></div>
                <div></div>
            </obap-selector>
        `);

        expect(() => el.items = []).to.throw('"items" is read only');
    });
});