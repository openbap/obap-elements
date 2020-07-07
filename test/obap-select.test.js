/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, oneEvent } from '@open-wc/testing';
import '../src/obap-select/obap-select.js';

describe('obap-select', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-select></obap-select>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

    it('can be created', async () => {     
        const el = await fixture(html`
            <obap-select></obap-select>
        `);

        await nextFrame();

        expect(el).to.not.equal(null);
    });
});