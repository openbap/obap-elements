/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame } from '@open-wc/testing';
import '../src/obap-material/obap-material.js';

describe('obap-material', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-material></obap-material>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

    it('can set the elevation via attribute', async () => {
        const el = await fixture(html`
            <obap-material elevation="2"></obap-material>
        `);

        expect(el.elevation).to.equal(2);
    });

    it('sets the default elevation to 1', async () => {
        const el = await fixture(html`
            <obap-material></obap-material>
        `);

        expect(el.elevation).to.equal(1);
    });

    it('can set the elevation via property and reflects to attribute', async () => {
        const el = await fixture(html`
            <obap-material></obap-material>
        `);

        el.elevation = 2;
        await nextFrame();
        expect(el.elevation).to.equal(2);
        expect(el.getAttribute('elevation')).to.equal('2');
    });
});