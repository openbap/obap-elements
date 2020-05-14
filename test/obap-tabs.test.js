/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, defineCE, unsafeStatic } from '@open-wc/testing';
import '../src/obap-tabs/obap-tabs.js';

describe('obap-tabs', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-tabs></obap-tabs>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

    it('adds slotted children to items', async () => {
        const el = await fixture(html`
            <obap-tabs>
                <obap-tab></obap-tab>
                <obap-tab></obap-tab>
            </obap-tabs>
        `);

        expect(el.items.length).to.equal(2);
    });

    it('sets the correct roles', async () => {
        const el = await fixture(html`
            <obap-tabs>
                <obap-tab></obap-tab>
                <obap-tab></obap-tab>
            </obap-tabs>
        `);

        expect(el.role).to.equal('tablist');
        expect(el.items[0].role).to.equal('tab');
    });
});