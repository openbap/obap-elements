/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, oneEvent, nextFrame } from '@open-wc/testing';
import '../src/obap-selector/obap-selector.js';

describe('obap-selector', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-selector></obap-selector>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

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
            <obap-selector selector-type="multi">
                <div val="0" selected></div>
                <div val="1" selected></div>
                <div val="2"></div>
            </obap-selector>
        `);

        expect(el.selectedItems.length).to.equal(2);
    });

    it('allows multi-selection toggle', async () => {
        const el = await fixture(html`
            <obap-selector  selector-type="multi">
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
            <obap-selector  selector-type="multi" selected-index="0">
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
            <obap-selector  selector-type="multi">
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

    it('prevents item selection via the "obap-item-selecting" event', async () => {
        const el = await fixture(html`
            <obap-selector selected-index="1">
                <div val="0"></div>
                <div val="1"></div>
                <div val="2"></div>
            </obap-selector>
        `);

        await nextFrame();
        expect(el.selectedIndex).to.equal(1); 

        el._fireEvent = function(name, detail, cancelable) {
            if ((name === 'obap-item-selecting') && (detail.newIndex === 2)) return false;

            return true;
        }

        el.selectedIndex = 2;

        await nextFrame();
        expect(el.selectedIndex).to.equal(1);

        el.selectedIndex = 0;
        await nextFrame();
        expect(el.selectedIndex).to.equal(0);
    });

    it('can toggle single select items if flag is set', async () => {
        const el = await fixture(html`
            <obap-selector toggles>
                <div val="0"></div>
                <div val="1"></div>
                <div val="2"></div>
            </obap-selector>
        `);

        el.selectedIndex = 1;
        await nextFrame();
        expect(el.selectedIndex).to.equal(1); 

        el.selectedIndex = 1;
        await nextFrame();
        expect(el.selectedIndex).to.equal(-1); 
    });

    it('cannot toggle single select items if flag is not set', async () => {
        const el = await fixture(html`
            <obap-selector>
                <div val="0"></div>
                <div val="1"></div>
                <div val="2"></div>
            </obap-selector>
        `);

        el.selectedIndex = 1;
        await nextFrame();
        expect(el.selectedIndex).to.equal(1); 

        el.selectedIndex = 1;
        await nextFrame();
        expect(el.selectedIndex).to.equal(1); 
    });

    // RANGE SELECT
    it('can select ranges via start and end index', async () => {
        const el = await fixture(html`
            <obap-selector selector-type="range">
                <div val="0"></div>
                <div val="1"></div>
                <div val="2"></div>
                <div val="3"></div>
                <div val="4"></div>
            </obap-selector>
        `);

        el.startIndex = 1;
        el.endIndex = 3;
        await nextFrame();
        expect(el.selectedItems.length).to.equal(3); 
    });

    it('can select ranges via select method', async () => {
        const el = await fixture(html`
            <obap-selector selector-type="range">
                <div val="0"></div>
                <div val="1"></div>
                <div val="2"></div>
                <div val="3"></div>
                <div val="4"></div>
            </obap-selector>
        `);

        el.select(1);
        el.select(3);
        await nextFrame();
        expect(el.selectedItems.length).to.equal(3); 
    });

    it('selects a single item if an end index is not provided', async () => {
        const el = await fixture(html`
            <obap-selector selector-type="range">
                <div val="0"></div>
                <div val="1"></div>
                <div val="2"></div>
                <div val="3"></div>
                <div val="4"></div>
            </obap-selector>
        `);

        el.startIndex = 1;
        await nextFrame();
        expect(el.selectedItems.length).to.equal(1); 
    });

    it('selects a single item if only s single selection is made', async () => {
        const el = await fixture(html`
            <obap-selector selector-type="range">
                <div val="0"></div>
                <div val="1"></div>
                <div val="2"></div>
                <div val="3"></div>
                <div val="4"></div>
            </obap-selector>
        `);

        el.select(1);
        await nextFrame();
        expect(el.selectedItems.length).to.equal(1); 
    });

    it('selects nothing if the same item is selected twice', async () => {
        const el = await fixture(html`
            <obap-selector selector-type="range">
                <div val="0"></div>
                <div val="1"></div>
                <div val="2"></div>
                <div val="3"></div>
                <div val="4"></div>
            </obap-selector>
        `);

        el.select(1);
        el.select(1);
        await nextFrame();
        expect(el.selectedItems.length).to.equal(0); 
    });

    it('a third selection removes the range and selects just the third item', async () => {
        const el = await fixture(html`
            <obap-selector selector-type="range">
                <div val="0"></div>
                <div val="1"></div>
                <div val="2"></div>
                <div val="3"></div>
                <div val="4"></div>
            </obap-selector>
        `);

        el.select(1);
        el.select(3);
        el.select(4);
        await nextFrame();
        expect(el.selectedItems.length).to.equal(1); 
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

    it('can select a range if the ctrl key is down', async () => {
        const el = await fixture(html`
            <obap-selector selector-type="range" range-length="5">
                <div val="0"></div>
                <div val="1"></div>
                <div val="2"></div>
                <div val="3"></div>
                <div val="4"></div>
                <div val="5"></div>
                <div val="6"></div>
                <div val="7"></div>
                <div val="8"></div>
                <div val="9"></div>
            </obap-selector>
        `);
        el._ctrl = true;

        el.select(7);
        await nextFrame();
        expect(el.selectedItems.length).to.equal(5); 
    });

    it('can select a partial range if the ctrl key is down', async () => {
        const el = await fixture(html`
            <obap-selector selector-type="range" range-length="5">
                <div val="0"></div>
                <div val="1"></div>
                <div val="2"></div>
                <div val="3"></div>
                <div val="4"></div>
                <div val="5"></div>
                <div val="6"></div>
                <div val="7"></div>
                <div val="8"></div>
            </obap-selector>
        `);
        el._ctrl = true;

        el.select(7);
        await nextFrame();
        expect(el.selectedItems.length).to.equal(4); 
    });

    it('cannot select an invalid range if the ctrl key is down', async () => {
        const el = await fixture(html`
            <obap-selector selector-type="range" range-length="5">
                <div val="0"></div>
                <div val="1"></div>
                <div val="2"></div>
                <div val="3"></div>
                <div val="4"></div>
                <div val="5"></div>
                <div val="6"></div>
                <div val="7"></div>
                <div val="8"></div>
                <div val="9"></div>
            </obap-selector>
        `);
        el._ctrl = true;

        el.select(-10);
        await nextFrame();
        expect(el.selectedItems.length).to.equal(1); 
    });
});