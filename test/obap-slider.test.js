/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, oneEvent, nextFrame } from '@open-wc/testing';
import '../src/obap-slider/obap-slider.js';

describe('obap-slider', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-slider></obap-slider>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

    it('can be created', async () => {
        const el = await fixture(html`
            <obap-slider></obap-slider>
        `);

        expect(el).to.not.equal(null);
    });

    it('creates stops', async () => {
        const stops = [0, 25, 50, 75, 100];

        const el = await fixture(html`
            <obap-slider min-value="0" max-value="100" value="25" .stops="${stops}"></obap-slider>
        `);

        await nextFrame();
        const stopItems = el.renderRoot.querySelectorAll('.stop');
        const stopLabels = el.renderRoot.querySelectorAll('.stop-label');

        expect(stopItems.length).to.equal(5);
        expect(stopLabels.length).to.equal(0);
    });

    it('creates stop labels', async () => {
        const stops = [0, 25, 50, 75, 100];

        const el = await fixture(html`
            <obap-slider min-value="0" max-value="100" value="25" .stops="${stops}" show-stop-labels></obap-slider>
        `);

        await nextFrame();
        const stopItems = el.renderRoot.querySelectorAll('.stop');
        const stopLabels = el.renderRoot.querySelectorAll('.stop-label');

        expect(stopItems.length).to.equal(5);
        expect(stopLabels.length).to.equal(5);
    });

    it('creates stops for range', async () => {
        const stops = [0, 25, 50, 75, 100];

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100" start-value="25" end-value="50" .stops="${stops}"></obap-slider>
        `);

        await nextFrame();
        const stopItems = el.renderRoot.querySelectorAll('.stop');
        const stopLabels = el.renderRoot.querySelectorAll('.stop-label');

        expect(stopItems.length).to.equal(5);
        expect(stopLabels.length).to.equal(0);
    });

    it('creates stop labels for range', async () => {
        const stops = [0, 25, 50, 75, 100];

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100" start-value="25" end-value="50" .stops="${stops}" show-stop-labels></obap-slider>
        `);

        await nextFrame();
        const stopItems = el.renderRoot.querySelectorAll('.stop');
        const stopLabels = el.renderRoot.querySelectorAll('.stop-label');

        expect(stopItems.length).to.equal(5);
        expect(stopLabels.length).to.equal(5);
    });

    it('creates a thumb and floating label', async () => {
        const stops = [0, 25, 50, 75, 100];

        const el = await fixture(html`
            <obap-slider min-value="0" max-value="100" value="25" .stops="${stops}" show-floating-label></obap-slider>
        `);

        await nextFrame();
        const thumbs = el.renderRoot.querySelectorAll('.thumb');
        const labels = el.renderRoot.querySelectorAll('.balloon');

        expect(thumbs.length).to.equal(1);
        expect(labels.length).to.equal(1);
    });

    it('creates two thumbs and floating labels for a range', async () => {
        const stops = [0, 25, 50, 75, 100];

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100" start-value="25" end-value="50" .stops="${stops}" show-floating-label></obap-slider>
        `);

        await nextFrame();
        const thumbs = el.renderRoot.querySelectorAll('.thumb');
        const labels = el.renderRoot.querySelectorAll('.balloon');

        expect(thumbs.length).to.equal(2);
        expect(labels.length).to.equal(2);
    });

    it('creates end icons and labels', async () => {
        const stops = [0, 25, 50, 75, 100];

        const el = await fixture(html`
            <obap-slider range min-value="0" max-value="100" value="50" .stops="${stops}" show-start-label show-end-label show-start-icon show-end-icon start-icon="android" end-icon="android"></obap-slider>
        `);

        await nextFrame();
        const icons = el.renderRoot.querySelectorAll('.end-icon');
        const labels = el.renderRoot.querySelectorAll('.end-label');
        expect(icons.length).to.equal(2);
        expect(labels.length).to.equal(2);
    });

});