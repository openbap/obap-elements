/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, defineCE, unsafeStatic } from '@open-wc/testing';
import '../src/obap-check/obap-check.js';

describe('obap-check', () => {
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-check label="label"></obap-check>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

    it('has a tabindex of 0 if enabled', async () => {
        const el = await fixture(html`
            <obap-check label="label"></obap-check>
        `);

        await nextFrame();
        expect(el.tabIndex).to.equal(0);
    });

    it('has a tabindex of -1 if disabled', async () => {
        const el = await fixture(html`
            <obap-check label="label" disabled></obap-check>
        `);

        await nextFrame();
        expect(el.tabIndex).to.equal(-1);
        el.disabled = false;
        await nextFrame();
        expect(el.tabIndex).to.equal(0);
    });

    it('has a ripple if no-ink is false', async () => {
        const el = await fixture(html`
            <obap-check label="label"></obap-check>
        `);

        await nextFrame();
        const ripple = el.renderRoot.querySelector('obap-ripple');
        expect(ripple).to.not.equal(null);
    });

    it('does not have a ripple if no-ink is true', async () => {
        const el = await fixture(html`
            <obap-check label="label" no-ink></obap-check>
        `);

        await nextFrame();
        const ripple = el.renderRoot.querySelector('obap-ripple');
        expect(ripple).to.equal(null);
    });

    it('has no svg element if not selected or indeterminate', async () => {
        const el = await fixture(html`
            <obap-check label="label"></obap-check>
        `);

        await nextFrame();
        const svg = el.renderRoot.querySelector('svg');
        expect(svg).to.equal(null);
    });

    it('has a svg element if selected', async () => {
        const el = await fixture(html`
            <obap-check label="label" selected></obap-check>
        `);

        await nextFrame();
        const svg = el.renderRoot.querySelector('svg');
        expect(svg).to.not.equal(null);
    });

    it('has a svg element if indeterminate', async () => {
        const el = await fixture(html`
            <obap-check label="label" indeterminate></obap-check>
        `);

        await nextFrame();
        const svg = el.renderRoot.querySelector('svg');
        expect(svg).to.not.equal(null);
    });

    it('selects the element when clicked', async () => {
        const el = await fixture(html`
            <obap-check label="label"></obap-check>
        `);

        el._clickHandler(new Event('click'));
        expect(el.selected).to.equal(true);
    });

    it('deselects the element when clicked a second time', async () => {
        const el = await fixture(html`
            <obap-check label="label"></obap-check>
        `);

        el._clickHandler(new Event('click'));
        expect(el.selected).to.equal(true);

        el._clickHandler(new Event('click'));
        expect(el.selected).to.equal(false);
    });

    it('removes indeterminate flag when selected', async () => {
        const el = await fixture(html`
            <obap-check label="label" indeterminate></obap-check>
        `);

        expect(el.indeterminate).to.equal(true);
        el._clickHandler(new Event('click'));
        expect(el.selected).to.equal(true);
        expect(el.indeterminate).to.equal(false);
    });

    it('sets hasFocus to true when it receives focus', async () => {
        const el = await fixture(html`
            <obap-check label="label"></obap-check>
        `);

        expect(el.hasFocus).to.equal(false);
        el._handleFocusEvent();
        expect(el.hasFocus).to.equal(true);
    });

    it('leaves hasFocus as false when disabled', async () => {
        const el = await fixture(html`
            <obap-check label="label" disabled></obap-check>
        `);

        expect(el.hasFocus).to.equal(false);
        el._handleFocusEvent();
        expect(el.hasFocus).to.equal(false);
    });
});