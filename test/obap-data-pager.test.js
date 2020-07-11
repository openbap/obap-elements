/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, oneEvent, nextFrame } from '@open-wc/testing';
import '../src/obap-data-pager/obap-data-pager.js';

describe('obap-data-pager', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-data-pager></obap-data-pager>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

    it('can be created', async () => {
        const el = await fixture(html`
            <obap-data-pager>
            </obap-data-pager>
        `);

        expect(el).to.not.equal(null);
    });
});