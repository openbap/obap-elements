/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame } from '@open-wc/testing';
import './test-element.js';
import '../src/obap-badge/obap-badge.js';

describe('obap-badge', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <test-element>
                <div id="target"></div>
                <obap-badge for="target" label="badge"></obap-badge>
            </test-element>
        `);

        await expect(el.items[1]).shadowDom.to.be.accessible();
    });

    it('uses the icon first if provided', async () => {
        const el = await fixture(html`
            <obap-badge icon="android" label="badge"></obap-badge>
        `);

        await nextFrame();
        const icon = el.renderRoot.querySelector('obap-icon');

        expect(icon).to.not.equal(null);
    });

    it('uses the label if no icon is provided', async () => {
        const el = await fixture(html`
            <obap-badge label="badge"></obap-badge>
        `);

        await nextFrame();
        const icon = el.renderRoot.querySelector('obap-icon');

        expect(icon).to.equal(null);
    });
});