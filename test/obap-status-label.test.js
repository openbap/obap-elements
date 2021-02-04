/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, oneEvent } from '@open-wc/testing';
import '../src/obap-status-label/obap-status-label.js';

describe('status-label', () => {
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-status-label></obap-status-label>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

    it('sets label property from attribute', async () => {     
        const el = await fixture(html`
            <obap-status-label label="test"></obap-status-label>
        `);

        await nextFrame();

        expect(el.label).to.equal('test');
    });

    it('sets label attribute from property', async () => {     
        const el = await fixture(html`
            <obap-status-label label="one"></obap-status-label>
        `);

        await nextFrame();

        expect(el.label).to.equal('one');
        el.label = 'two';

        await nextFrame();

        expect(el.label).to.equal('two');
    });
});