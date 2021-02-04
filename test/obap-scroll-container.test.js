/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame } from '@open-wc/testing';
import '../src/obap-scroll-container/obap-scroll-container.js';
import './test-element.js';

describe('obap-scroll-container', () => {
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-scroll-container></obap-scroll-container>>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

    it('calculates if there no overflow', async () => {
        const el = await fixture(html`
        <obap-scroll-container style="width: 100px; height: 32px;">
            <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
        </obap-scroll-container>
    `);

        await nextFrame();
        expect(el._hasOverflow).to.equal(false);
    });

    it('calculates if there is overflow', async () => {
        const el = await fixture(html`
            <obap-scroll-container style="width: 100px; height: 32px;">
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
            </obap-scroll-container>
        `);

        await nextFrame();
        expect(el._hasOverflow).to.equal(true);
    });

    it('returns the correct horizontal icon names', async () => {
        const el = await fixture(html`
            <obap-scroll-container style="width: 100px; height: 32px;">
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
            </obap-scroll-container>
        `);

        await nextFrame();
        expect(el._getIconName(true)).to.equal('core:chevron-left');
        expect(el._getIconName(false)).to.equal('core:chevron-right');
    });

    it('returns the correct vertical icon names', async () => {
        const el = await fixture(html`
            <obap-scroll-container vertical style="width: 100px; height: 32px;">
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
            </obap-scroll-container>
        `);

        await nextFrame();
        expect(el._getIconName(true)).to.equal('core:chevron-up');
        expect(el._getIconName(false)).to.equal('core:chevron-down');
    });

    /* Horizontal Scrolling */
    it('can scroll right (smooth) - horizontal', async () => {
        const el = await fixture(html`
            <obap-scroll-container style="width: 100px; height: 32px;">
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
            </obap-scroll-container>
        `);

        await nextFrame();
        el._scrollRight();
        await nextFrame();
        expect(el._container.scrollLeft).to.not.equal(0);
    });

    it('can scroll right (item) - horizontal', async () => {
        const el = await fixture(html`
            <obap-scroll-container item-step style="width: 100px; height: 32px;">
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
            </obap-scroll-container>
        `);

        await nextFrame();
        el._scrollRight();
        await nextFrame();
        expect(el._container.scrollLeft).to.equal(64);
    });

    it('can disable scroll right - horizontal', async () => {
        const el = await fixture(html`
            <obap-scroll-container disable-scrolling style="width: 100px; height: 32px;">
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
            </obap-scroll-container>
        `);

        await nextFrame();
        el._scrollRight();
        await nextFrame();
        expect(el._container.scrollLeft).to.equal(0);
    });

    it('can scroll left (smooth) - horizontal', async () => {
        const el = await fixture(html`
            <obap-scroll-container style="width: 100px; height: 32px;">
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
            </obap-scroll-container>
        `);

        await nextFrame();
        el._scrollRight();
        await nextFrame();
        expect(el._container.scrollLeft).to.not.equal(0);
        el._scrollLeft();
        await nextFrame();
        expect(el._container.scrollLeft).to.equal(0);
    });


    it('can scroll right (item) - horizontal', async () => {
        const el = await fixture(html`
            <obap-scroll-container item-step style="width: 100px; height: 32px;">
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
            </obap-scroll-container>
        `);

        await nextFrame();
        el._scrollRight();
        await nextFrame();
        expect(el._container.scrollLeft).to.equal(64);
        el._scrollLeft();
        await nextFrame();
        expect(el._container.scrollLeft).to.equal(0);
    });

    it('can disable scroll Left - horizontal', async () => {
        const el = await fixture(html`
            <obap-scroll-container style="width: 100px; height: 32px;">
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
            </obap-scroll-container>
        `);

        await nextFrame();
        el._scrollRight();
        await nextFrame();
        expect(el._container.scrollLeft).to.not.equal(0);
        el.disableScrolling = true;
        el._scrollLeft();
        await nextFrame();
        expect(el._container.scrollLeft).to.not.equal(0);
    });

    /* Vertical Scrolling */
    it('can scroll right (smooth) - vertical', async () => {
        const el = await fixture(html`
            <obap-scroll-container vertical style="width: 100px; height: 32px;">
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
            </obap-scroll-container>
        `);

        await nextFrame();
        el._scrollRight();
        await nextFrame();
        expect(el._container.scrollTop).to.not.equal(0);
    });

    it('can scroll right (item) - vertical', async () => {
        const el = await fixture(html`
            <obap-scroll-container vertical item-step style="width: 100px; height: 32px;">
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
            </obap-scroll-container>
        `);

        await nextFrame();
        el._scrollRight();
        await nextFrame();
        expect(el._container.scrollTop).to.equal(32);
    });

    it('can disable scroll right - vertical', async () => {
        const el = await fixture(html`
            <obap-scroll-container vertical disable-scrolling style="width: 100px; height: 32px;">
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
            </obap-scroll-container>
        `);

        await nextFrame();
        el._scrollRight();
        await nextFrame();
        expect(el._container.scrollTop).to.equal(0);
    });

    it('can scroll left (smooth) - vertical', async () => {
        const el = await fixture(html`
            <obap-scroll-container vertical style="width: 100px; height: 32px;">
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
            </obap-scroll-container>
        `);

        await nextFrame();
        el._scrollRight();
        await nextFrame();
        expect(el._container.scrollTop).to.not.equal(0);
        el._scrollLeft();
        await nextFrame();
        expect(el._container.scrollTop).to.equal(0);
    });


    it('can scroll right (item) - vertical', async () => {
        const el = await fixture(html`
            <obap-scroll-container vertical item-step style="width: 100px; height: 32px;">
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
            </obap-scroll-container>
        `);

        await nextFrame();
        el._scrollRight();
        await nextFrame();
        expect(el._container.scrollTop).to.equal(32);
        el._scrollLeft();
        await nextFrame();
        expect(el._container.scrollTop).to.equal(0);
    });

    it('can disable scroll Left - vertical', async () => {
        const el = await fixture(html`
            <obap-scroll-container vertical style="width: 100px; height: 32px;">
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
            </obap-scroll-container>
        `);

        await nextFrame();
        el._scrollRight();
        await nextFrame();
        expect(el._container.scrollTop).to.not.equal(0);
        el.disableScrolling = true;
        el._scrollLeft();
        await nextFrame();
        expect(el._container.scrollTop).to.not.equal(0);
    });

    /* Misc */
    it('can abort scroll', async () => {
        const el = await fixture(html`
            <obap-scroll-container style="width: 100px; height: 32px;">
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
                <div style="width: 64px; height: 32px; min-width: 64px; min-height: 32px;"></div>
            </obap-scroll-container>
        `);

        await nextFrame();
        el._scrollRight();
        el._holdJob = false;
        await nextFrame();
        expect(el._container.scrollLeft).to.not.equal(0);
    });

    it('does not scroll if there are no children', async () => {
        const el = await fixture(html`
            <obap-scroll-container item-step style="width: 100px; height: 32px;">
            </obap-scroll-container>
        `);

        await nextFrame();
        el._scrollRight();
        await nextFrame();
        expect(el._container.scrollLeft).to.equal(0);
    });
});