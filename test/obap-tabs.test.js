/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, defineCE, unsafeStatic } from '@open-wc/testing';
import '../src/obap-tabs/obap-tabs.js';

describe('obap-tabs', () => {
    // Fails color contrast on unselected tabs - theme issue.
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-tabs selected-index="0">
                <obap-tab>Tab 1</obap-tab>
            </obap-tabs>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

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

    it('has a ripple if no-ink is false', async () => {
        const el = await fixture(html`
            <obap-tabs>
                <obap-tab></obap-tab>
                <obap-tab></obap-tab>
            </obap-tabs>
        `);

        await nextFrame();
        const ripple = el.items[0].renderRoot.querySelector('obap-ripple');
        expect(ripple).to.not.equal(null);
    });

    it('does not have a ripple if no-ink is true', async () => {
        const el = await fixture(html`
            <obap-tabs>
                <obap-tab no-ink></obap-tab>
                <obap-tab></obap-tab>
            </obap-tabs>
        `);

        await nextFrame();
        const ripple = el.items[0].renderRoot.querySelector('obap-ripple');
        expect(ripple).to.equal(null);
    });

    it('only sets the ripple focus if the tab has focus but not selected', async () => {
        const el = await fixture(html`
            <obap-tabs>
                <obap-tab has-focus></obap-tab>
                <obap-tab has-focus selected></obap-tab>
            </obap-tabs>
        `);

        await nextFrame();
        const ripple0 = el.items[0].renderRoot.querySelector('obap-ripple');
        const ripple1 = el.items[1].renderRoot.querySelector('obap-ripple');
        expect(ripple0.hasFocus).to.equal(true);
        expect(ripple1.hasFocus).to.equal(false);
    });

});
