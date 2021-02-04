/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, oneEvent, nextFrame } from '@open-wc/testing';
import '../src/obap-selector/obap-selector-container.js';
import '../src/obap-tabs/obap-tabs.js';
import '../src/obap-pages/obap-pages.js';
import '../src/obap-material/obap-material.js';

describe('obap-selector-container', () => {
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-selector-container></obap-selector-container>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

    it('adds selectable slotted children to items', async () => {
        const el = await fixture(html`
            <obap-selector-container>
                <div>not a selector</div>
                <obap-tabs>
                    <obap-tab>Tab 1</obap-tab>
                    <obap-tab>Tab 2</obap-tab>
                    <obap-tab>Tab 3</obap-tab>
                </obap-tabs>
                <obap-pages>
                    <div>Page 1</div>
                    <div>Page 2</div>
                    <div>Page 3</div>
                </obap-pages>
                <div>not a selector</div>
            </obap-selector-container>
        `);

        expect(el._items.length).to.equal(2);
    });   

    it('adds nested selectable slotted children to items', async () => {
        const el = await fixture(html`
            <obap-selector-container>
                <obap-material>
                    <obap-tabs>
                        <obap-tab>Tab 1</obap-tab>
                        <obap-tab>Tab 2</obap-tab>
                        <obap-tab>Tab 3</obap-tab>
                    </obap-tabs>
                </obap-material>
                <obap-pages>
                    <div>Page 1</div>
                    <div>Page 2</div>
                    <div>Page 3</div>
                </obap-pages>
                <div>not a selector</div>
            </obap-selector-container>
        `);

        expect(el._items.length).to.equal(2);
    });   

    it('sets the selected index correctly via container property', async () => {
        const el = await fixture(html`
            <obap-selector-container>
                <obap-tabs>
                    <obap-tab>Tab 1</obap-tab>
                    <obap-tab>Tab 2</obap-tab>
                    <obap-tab>Tab 3</obap-tab>
                </obap-tabs>
                <obap-pages>
                    <div>Page 1</div>
                    <div>Page 2</div>
                    <div>Page 3</div>
                </obap-pages>
            </obap-selector-container>
        `);

        await nextFrame();
        expect(el._items.length).to.equal(2);
        el.selectedIndex = 1;
        await nextFrame();

        expect(el._items[0].selectedIndex).to.equal(1);
        expect(el._items[1].selectedIndex).to.equal(1);
    });   

    it('sets the selected index correctly via container attribute', async () => {
        const el = await fixture(html`
            <obap-selector-container selected-index="1">
                <obap-tabs>
                    <obap-tab>Tab 1</obap-tab>
                    <obap-tab>Tab 2</obap-tab>
                    <obap-tab>Tab 3</obap-tab>
                </obap-tabs>
                <obap-pages>
                    <div>Page 1</div>
                    <div>Page 2</div>
                    <div>Page 3</div>
                </obap-pages>
            </obap-selector-container>
        `);

        await nextFrame();
        expect(el._items.length).to.equal(2);
        await nextFrame();

        expect(el._items[0].selectedIndex).to.equal(1);
        expect(el._items[1].selectedIndex).to.equal(1);
    });     
});