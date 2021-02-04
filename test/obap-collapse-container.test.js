/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, defineCE, unsafeStatic, oneEvent } from '@open-wc/testing';
import '../src/obap-collapse-container/obap-vertical-collapse-container.js';
import '../src/obap-collapse-container/obap-horizontal-collapse-container.js';

// VERTICAL
describe('obap-vertical-collapse-container', () => {
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-vertical-collapse-container>
            </obap-vertical-collapse-container>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

    it('toggles opened state', async () => {
        const el = await fixture(html`
            <obap-vertical-collapse-container>
            </obap-vertical-collapse-container>
        `);

        await expect(el.opened).to.equal(false);
        el.toggle();
        await expect(el.opened).to.equal(true);
        el.toggle();
        await expect(el.opened).to.equal(false);
    });
});

// HORIZONTAL
describe('obap-horizontal-collapse-container', () => {
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-horizontal-collapse-container>
            </obap-horizontal-collapse-container>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

    it('toggles opened state', async () => {
        const el = await fixture(html`
            <obap-horizontal-collapse-container>
            </obap-horizontal-collapse-container>
        `);

        await expect(el.opened).to.equal(false);
        el.toggle();
        await expect(el.opened).to.equal(true);
        el.toggle();
        await expect(el.opened).to.equal(false);
    });
});
