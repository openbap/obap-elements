/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame } from '@open-wc/testing';
import './test-element.js';
import '../src/obap-ripple/obap-ripple.js';

describe('obap-ripple', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <test-element>
                <obap-ripple></obap-ripple>
            </test-element>
        `);

        await expect(el.items[0]).shadowDom.to.be.accessible();
    });

    it('sets active to true on mouse down', async () => {
        const el = await fixture(html`
            <test-element>
                <obap-ripple></obap-ripple>
            </test-element>
        `);

        await nextFrame();
        const ripple = el.items[0];
        ripple._handleMouseDownEvent();
        expect(ripple.active).to.equal(true);
    });

    it('does not set active to true on mouse down if no-ink is true', async () => {
        const el = await fixture(html`
            <test-element>
                <obap-ripple no-ink></obap-ripple>
            </test-element>
        `);

        await nextFrame();
        const ripple = el.items[0];
        ripple._handleMouseDownEvent();
        expect(ripple.active).to.equal(false);
    });

    it('sets active to false on mouse up', async () => {
        const el = await fixture(html`
            <test-element>
                <obap-ripple></obap-ripple>
            </test-element>
        `);

        await nextFrame();
        const ripple = el.items[0];
        ripple._handleMouseDownEvent();
        expect(ripple.active).to.equal(true);
        ripple._handleMouseUpEvent();
        expect(ripple.active).to.equal(false);
    });

    it('sets active to false on mouse leave', async () => {
        const el = await fixture(html`
            <test-element>
                <obap-ripple></obap-ripple>
            </test-element>
        `);

        await nextFrame();
        const ripple = el.items[0];
        ripple._handleMouseDownEvent();
        expect(ripple.active).to.equal(true);
        ripple._handleMouseLeaveEvent();
        expect(ripple.active).to.equal(false);
    });

    /*
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
    */
});