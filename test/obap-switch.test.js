/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import '../src/obap-switch/obap-switch.js';

describe('obap-switch', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-switch></obap-switch>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

    it('fires a change event on click', async () => {
        const el = await fixture(html`
            <obap-switch></obap-switch>
        `);

        const div = el.shadowRoot.querySelector('div.container');

        setTimeout(() => div.click());

        const { detail } = await oneEvent(el, 'change');

        expect(detail).to.not.equal(null);
    });

    it('toggles checked state on click', async () => {
        const el = await fixture(html`
            <obap-switch></obap-switch>
        `);

        const div = el.shadowRoot.querySelector('div.container');
        expect(el.checked).to.equal(false);

        
        setTimeout(() => div.click());

        const { detail1 } = await oneEvent(el, 'change');

        expect(detail1).to.not.equal(null);
        expect(el.checked).to.equal(true);

        setTimeout(() => div.click());

        const { detail2 } = await oneEvent(el, 'change');

        expect(detail2).to.not.equal(null);
        expect(el.checked).to.equal(false);
    });
});