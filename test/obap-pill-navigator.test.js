/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, defineCE, unsafeStatic } from '@open-wc/testing';
import '../src/obap-pill-navigator/obap-pill-navigator.js';

describe('obap-pill-navigator', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-pill-navigator></obap-pill-navigator>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

    it('sets the default count to zero', async () => {
        const el = await fixture(html`
            <obap-pill-navigator></obap-pill-navigator>
        `);

        await nextFrame();

        expect(el.count).to.equal(0);
    });

    it('sets the count property from the count attribute', async () => {
        const el = await fixture(html`
            <obap-pill-navigator count="5"></obap-pill-navigator>
        `);

        await nextFrame();

        expect(el.count).to.equal(5);
    });

    it('sets the selected property from the selected attribute', async () => {
        const el = await fixture(html`
            <obap-pill-navigator count="5" selected="1"></obap-pill-navigator>
        `);

        await nextFrame();

        expect(el.selected).to.equal(1);
    });

    it('creates the same number of pills as count', async () => {
        const el = await fixture(html`
            <obap-pill-navigator count="5"></obap-pill-navigator>
        `);

        await nextFrame();

        const pills = el.renderRoot.querySelectorAll('div.pill');
        expect(pills.length).to.equal(5);
    });

    it('sets the selected property when a pill is clicked', async () => {
        const el = await fixture(html`
            <obap-pill-navigator count="5" selected="0"></obap-pill-navigator>
        `);

        await nextFrame();

        expect(el.selected).to.equal(0);
        const pills = el.renderRoot.querySelectorAll('div.pill');
        pills[2].click();

        await nextFrame();

        expect(el.selected).to.equal(2);
    });

    it('sets the selected attribute on a selected pill', async () => {
        const el = await fixture(html`
            <obap-pill-navigator count="5" selected="0"></obap-pill-navigator>
        `);

        await nextFrame();

        const pills = el.renderRoot.querySelectorAll('div.pill');
        expect(pills[0].hasAttribute('selected')).to.equal(true);
        expect(pills[2].hasAttribute('selected')).to.equal(false);

        pills[2].click();

        await nextFrame();

        expect(pills[0].hasAttribute('selected')).to.equal(false);
        expect(pills[2].hasAttribute('selected')).to.equal(true);
    });

    it('sets the selected property correctly via the navigation methods', async () => {
        const el = await fixture(html`
            <obap-pill-navigator count="5" selected="0"></obap-pill-navigator>
        `);

        await nextFrame();

        expect(el.selected).to.equal(0);

        el.next();
        expect(el.selected).to.equal(1);

        el.previous();
        expect(el.selected).to.equal(0);

        el.last();
        expect(el.selected).to.equal(4);

        el.next();
        expect(el.selected).to.equal(4);

        el.first();
        expect(el.selected).to.equal(0);

        el.previous();
        expect(el.selected).to.equal(0);
    });

    it('sets the selected property correctly via the navigation methods if count is 0', async () => {
        const el = await fixture(html`
            <obap-pill-navigator></obap-pill-navigator>
        `);

        await nextFrame();

        expect(el.selected).to.equal(-1);

        el.next();
        expect(el.selected).to.equal(-1);

        el.previous();
        expect(el.selected).to.equal(-1);

        el.last();
        expect(el.selected).to.equal(-1);

        el.first();
        expect(el.selected).to.equal(-1);
    });

    it('cannot navigate if disabled', async () => {
        const el = await fixture(html`
            <obap-pill-navigator count="5" selected="3"></obap-pill-navigator>
        `);

        await nextFrame();

        expect(el.selected).to.equal(3);
        el.disabled = true;

        await nextFrame();

        el.selected = 2;
        expect(el.selected).to.equal(3);

        el.next();
        expect(el.selected).to.equal(3);

        el.previous();
        expect(el.selected).to.equal(3);

        el.last();
        expect(el.selected).to.equal(3);
        
        el.first();
        expect(el.selected).to.equal(3);
    });
});