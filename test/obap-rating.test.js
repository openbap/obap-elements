/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, oneEvent } from '@open-wc/testing';
import '../src/obap-rating/obap-rating.js';

describe('obap-rating', () => {
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-rating></obap-rating>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

    it('sets the rating from attributes', async () => {
        const el = await fixture(html`
            <obap-rating count="5" rating="3"></obap-rating>
        `);

        await nextFrame();

        expect(el.count).to.equal(5);
        expect(el.rating).to.equal(3);
    });

    it('sets the rating from properties', async () => {
        const el = await fixture(html`
            <obap-rating></obap-rating>
        `);
        
        el.count = 5;
        el.rating = 3;

        await nextFrame();

        expect(el.count).to.equal(5);
        expect(el.rating).to.equal(3);
    });

    it('ignores invalid ratings', async () => {
        const el = await fixture(html`
            <obap-rating count="5"></obap-rating>
        `);

        el.rating = -1;

        await nextFrame();

        expect(el.rating).to.equal(0);
    });

    it('create rating stars', async () => {
        const el = await fixture(html`
            <obap-rating count="5" rating="0"></obap-rating>
        `);

        await nextFrame();
        const stars = el.renderRoot.querySelectorAll('div.item');

        expect(stars.length).to.equal(5);
    });

    it('sets rating on star click', async () => {
        const el = await fixture(html`
            <obap-rating count="5" rating="0"></obap-rating>
        `);

        await nextFrame();
        const stars = el.renderRoot.querySelectorAll('div.item');
        stars[1].click();

        await nextFrame();

        expect(el.rating).to.equal(2);

        stars[1].click();

        await nextFrame();

        expect(el.rating).to.equal(1);
    });

    it('sets half rating on star click', async () => {
        const el = await fixture(html`
            <obap-rating count="5" rating="0" allow-half></obap-rating>
        `);

        await nextFrame();
        const stars = el.renderRoot.querySelectorAll('div.item');
        stars[1].click();

        await nextFrame();

        expect(el.rating).to.equal(1.5);

        stars[1].click();

        await nextFrame();

        expect(el.rating).to.equal(2);

        stars[1].click();

        await nextFrame();

        expect(el.rating).to.equal(1);

        stars[0].click();

        await nextFrame();

        expect(el.rating).to.equal(0.5);
    });

    it('supports hearts', async () => {
        const el = await fixture(html`
            <obap-rating count="5" rating="2.5" allow-half heart></obap-rating>
        `);

        await nextFrame();
        expect(el.heart).to.equal(true);
    });

    it('fires an event on rating change', async () => {
        const el = await fixture(html`
            <obap-rating count="5" rating="0"></obap-rating>
        `);

        setTimeout(() => el.rating = 1);
        const { detail } = await oneEvent(el, 'obap-rating-change');
        await nextFrame();

        expect(detail).to.not.equal(null);
        expect(detail.oldValue).to.equal(0);
        expect(detail.newValue).to.equal(1);
    });
});