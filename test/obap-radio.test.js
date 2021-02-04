/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, defineCE, unsafeStatic } from '@open-wc/testing';
import '../src/obap-radio/obap-radio.js';
import '../src/obap-radio/obap-radio-group.js';

describe('obap-radio', () => {
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-radio-group>
                <obap-radio label="one"></obap-radio>
                <obap-radio label="two"></obap-radio>
                <obap-radio label="three"></obap-radio>
            </obap-radio-group>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */
    
    it('has a ripple if no-ink is false', async () => {
        const el = await fixture(html`
            <obap-radio-group>
                <obap-radio label="one"></obap-radio>
                <obap-radio label="two"></obap-radio>
                <obap-radio label="three"></obap-radio>
            </obap-radio-group>
        `);

        await nextFrame();
        const ripple = el.items[2].renderRoot.querySelector('obap-ripple');
        expect(ripple).to.not.equal(null);
    });

    it('does not a ripple if no-ink is false', async () => {
        const el = await fixture(html`
            <obap-radio-group>
                <obap-radio label="one"></obap-radio>
                <obap-radio label="two"></obap-radio>
                <obap-radio label="three" no-ink></obap-radio>
            </obap-radio-group>
        `);

        await nextFrame();
        const ripple = el.items[2].renderRoot.querySelector('obap-ripple');
        expect(ripple).to.equal(null);
    });

    it('only sets the ripple focus if the tab has focus but not selected', async () => {
        const el = await fixture(html`
            <obap-radio-group>
                <obap-radio label="one" has-focus></obap-radio>
                <obap-radio label="two" has-focus selected></obap-radio>
            </obap-radio-group>
        `);

        await nextFrame();
        const ripple0 = el.items[0].renderRoot.querySelector('obap-ripple');
        const ripple1 = el.items[1].renderRoot.querySelector('obap-ripple');
        expect(ripple0.hasFocus).to.equal(true);
        expect(ripple1.hasFocus).to.equal(false);
    });

    it('selects an item via the group', async () => {
        const el = await fixture(html`
            <obap-radio-group selected-index="2">
                <obap-radio label="one"></obap-radio>
                <obap-radio label="two"></obap-radio>
                <obap-radio label="three"></obap-radio>
            </obap-radio-group>
        `);

        await nextFrame();
        expect(el.items[2].selected).to.equal(true);
    });
});