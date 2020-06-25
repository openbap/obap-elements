/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, oneEvent } from '@open-wc/testing';
import '../src/obap-sparkline/obap-sparkline.js';

describe('obap-bar-sparkline', () => {
    it('passes the a11y audit', async () => {
        const values = [10, 9, 5, 2, 9, 11];

        const el = await fixture(html`
            <obap-bar-sparkline .values="${values}"></obap-bar-sparkline>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

    it('renders nothing if there are no values', async () => {     
        const el = await fixture(html`
            <obap-bar-sparkline></obap-bar-sparkline>
        `);

        await nextFrame();
        const container = el.renderRoot.querySelector('.container');

        expect(el).to.not.equal(null);
        expect(container).to.equal(null);
    });

    it('can have positive values only', async () => {
        const values = [10, 9, 5, 2, 9, 11];
       
        const el = await fixture(html`
            <obap-bar-sparkline .values="${values}"></obap-bar-sparkline>
        `);

        await nextFrame();
        const rects = el.renderRoot.querySelectorAll('rect');

        expect(el).to.not.equal(null);
        expect(rects.length).to.equal(6);
    });

    it('can have negative values only', async () => {
        const values = [-10, -9, -5, -2, -9, -11];
       
        const el = await fixture(html`
            <obap-bar-sparkline .values="${values}"></obap-bar-sparkline>
        `);

        await nextFrame();
        const rects = el.renderRoot.querySelectorAll('rect');

        expect(el).to.not.equal(null);
        expect(rects.length).to.equal(6);
    });

    it('can have positive and negative values', async () => {
        const values = [-10, 9, -5, 2, 9, 11];
       
        const el = await fixture(html`
            <obap-bar-sparkline .values="${values}"></obap-bar-sparkline>
        `);

        await nextFrame();
        const rects = el.renderRoot.querySelectorAll('rect');

        expect(el).to.not.equal(null);
        expect(rects.length).to.equal(6);
    });

});

describe('obap-winloss-sparkline', () => {
    it('passes the a11y audit', async () => {
        const values = [10, 9, 5, 2, 9, 11];

        const el = await fixture(html`
            <obap-winloss-sparkline .values="${values}"></obap-winloss-sparkline>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

    it('renders nothing if there are no values', async () => {     
        const el = await fixture(html`
            <obap-winloss-sparkline></obap-winloss-sparkline>
        `);

        await nextFrame();
        const container = el.renderRoot.querySelector('.container');

        expect(el).to.not.equal(null);
        expect(container).to.equal(null);
    });

    it('can have positive values only', async () => {
        const values = [10, 9, 5, 2, 9, 11];
       
        const el = await fixture(html`
            <obap-winloss-sparkline .values="${values}"></obap-winloss-sparkline>
        `);

        await nextFrame();
        const rects = el.renderRoot.querySelectorAll('rect');

        expect(el).to.not.equal(null);
        expect(rects.length).to.equal(6);
    });

    it('can have negative values only', async () => {
        const values = [-10, -9, -5, -2, -9, -11];
       
        const el = await fixture(html`
            <obap-winloss-sparkline .values="${values}"></obap-winloss-sparkline>
        `);

        await nextFrame();
        const rects = el.renderRoot.querySelectorAll('rect');

        expect(el).to.not.equal(null);
        expect(rects.length).to.equal(6);
    });

    it('can have positive and negative values', async () => {
        const values = [-10, 9, -5, 2, 9, 11];
       
        const el = await fixture(html`
            <obap-winloss-sparkline .values="${values}"></obap-winloss-sparkline>
        `);

        await nextFrame();
        const rects = el.renderRoot.querySelectorAll('rect');

        expect(el).to.not.equal(null);
        expect(rects.length).to.equal(6);
    });

    it('supports stretched markers', async () => {
        const values = [-10, 9, -5, 2, 9, 11];
       
        const el = await fixture(html`
            <obap-winloss-sparkline .values="${values}" stretch></obap-winloss-sparkline>
        `);

        await nextFrame();
        const rects = el.renderRoot.querySelectorAll('rect');

        expect(el).to.not.equal(null);
        expect(rects.length).to.equal(6);
    });
});

describe('obap-line-sparkline', () => {
    it('passes the a11y audit', async () => {
        const values = [10, 9, 5, 2, 9, 11];

        const el = await fixture(html`
            <obap-line-sparkline .values="${values}"></obap-line-sparkline>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

    it('renders nothing if there are no values', async () => {     
        const el = await fixture(html`
            <obap-line-sparkline></obap-line-sparkline>
        `);

        await nextFrame();
        const container = el.renderRoot.querySelector('.container');

        expect(el).to.not.equal(null);
        expect(container).to.equal(null);
    });

    it('can have positive values only', async () => {
        const values = [10, 9, 5, 2, 9, 11];
       
        const el = await fixture(html`
            <obap-line-sparkline .values="${values}" show-markers></obap-line-sparkline>
        `);

        await nextFrame();
        const circles = el.renderRoot.querySelectorAll('circle');

        expect(el).to.not.equal(null);
        expect(circles.length).to.equal(6);
    });

    it('can have negative values only', async () => {
        const values = [-10, -9, -5, -2, -9, -11];
       
        const el = await fixture(html`
            <obap-line-sparkline .values="${values}" show-markers></obap-line-sparkline>
        `);

        await nextFrame();
        const circles = el.renderRoot.querySelectorAll('circle');

        expect(el).to.not.equal(null);
        expect(circles.length).to.equal(6);
    });

    it('can have positive and negative values', async () => {
        const values = [-10, 9, -5, 2, 9, 11];
       
        const el = await fixture(html`
            <obap-line-sparkline .values="${values}" show-markers></obap-line-sparkline>
        `);

        await nextFrame();
        const circles = el.renderRoot.querySelectorAll('circle');

        expect(el).to.not.equal(null);
        expect(circles.length).to.equal(6);
    });

    it('can display markers', async () => {
        const values = [-10, 9, -5, 2, 9, 11];
       
        const el = await fixture(html`
            <obap-line-sparkline .values="${values}" show-markers></obap-line-sparkline>
        `);

        await nextFrame();
        const circles = el.renderRoot.querySelectorAll('circle');

        expect(el).to.not.equal(null);
        expect(circles.length).to.equal(6);
    });

    it('can display a line', async () => {
        const values = [-10, 9, -5, 2, 9, 11];
       
        const el = await fixture(html`
            <obap-line-sparkline .values="${values}" show-line></obap-line-sparkline>
        `);

        await nextFrame();
        const polyline = el.renderRoot.querySelectorAll('polyline');

        expect(el).to.not.equal(null);
        expect(polyline.length).to.equal(1);
    });

    it('can display an area', async () => {
        const values = [-10, 9, -5, 2, 9, 11];
       
        const el = await fixture(html`
            <obap-line-sparkline .values="${values}" show-area></obap-line-sparkline>
        `);

        await nextFrame();
        const polygon = el.renderRoot.querySelectorAll('polygon');

        expect(el).to.not.equal(null);
        expect(polygon.length).to.equal(1);
    });
});

describe('obap-pie-sparkline', () => {
    it('passes the a11y audit', async () => {
        const values = [10, 9, 5, 2, 9, 11];

        const el = await fixture(html`
            <obap-pie-sparkline .values="${values}"></obap-pie-sparkline>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

    it('renders nothing if there are no values', async () => {     
        const el = await fixture(html`
            <obap-pie-sparkline></obap-pie-sparkline>
        `);

        await nextFrame();
        const container = el.renderRoot.querySelector('.container');

        expect(el).to.not.equal(null);
        expect(container).to.equal(null);
    });

    it('creates a sector for each positive value', async () => {
        const values = [10, 9, 5, 2, 9, 11];
       
        const el = await fixture(html`
            <obap-pie-sparkline .values="${values}"></obap-pie-sparkline>
        `);

        await nextFrame();
        const sectors = el.renderRoot.querySelectorAll('path.wedge');

        expect(el.values.length).to.equal(6);
        expect(sectors.length).to.equal(6);
    });

    it('ignores negative values or zero', async () => {
        const values = [10, 9, -5, 2, 0, 11];
       
        const el = await fixture(html`
            <obap-pie-sparkline .values="${values}"></obap-pie-sparkline>
        `);

        await nextFrame();
        const sectors = el.renderRoot.querySelectorAll('path.wedge');

        expect(el.values.length).to.equal(6);
        expect(sectors.length).to.equal(4);
    });

    it('supports custom sector colors', async () => {
        const values = [10, 9, 5, 2, 9, 11, 7];
        const colors = ['red', 'green', 'blue'];
       
        const el = await fixture(html`
            <obap-pie-sparkline .values="${values}" .colors="${colors}"></obap-pie-sparkline>
        `);

        await nextFrame();
        const sectors = el.renderRoot.querySelectorAll('path.wedge');
        const separators = el.renderRoot.querySelectorAll('path.outline');

        expect(el.values.length).to.equal(7);
        expect(sectors.length).to.equal(7);
        expect(separators.length).to.equal(7);
    });

    it('can hide separators', async () => {
        const values = [10, 9, 5, 2, 9, 11, 7];
       
        const el = await fixture(html`
            <obap-pie-sparkline .values="${values}" hide-separators></obap-pie-sparkline>
        `);

        await nextFrame();
        const sectors = el.renderRoot.querySelectorAll('path.wedge');
        const separators = el.renderRoot.querySelectorAll('path.outline');

        expect(el.values.length).to.equal(7);
        expect(sectors.length).to.equal(7);
        expect(separators.length).to.equal(0);
    });

    it('can hide separators via property', async () => {
        const values = [10, 9, 5, 2, 9, 11, 7];
       
        const el = await fixture(html`
            <obap-pie-sparkline .values="${values}"></obap-pie-sparkline>
        `);

        await nextFrame();
        let sectors = el.renderRoot.querySelectorAll('path.wedge');
        let separators = el.renderRoot.querySelectorAll('path.outline');

        expect(el.values.length).to.equal(7);
        expect(sectors.length).to.equal(7);
        expect(separators.length).to.equal(7);

        el.hideSeparators = true;

        await nextFrame();
        sectors = el.renderRoot.querySelectorAll('path.wedge');
        separators = el.renderRoot.querySelectorAll('path.outline');

        expect(el.values.length).to.equal(7);
        expect(sectors.length).to.equal(7);
        expect(separators.length).to.equal(0);
    });
});

describe('obap-bullet-sparkline', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-bullet-sparkline></obap-bullet-sparkline>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

    it('renders nothing if there are no values', async () => {     
        const el = await fixture(html`
            <obap-bullet-sparkline></obap-bullet-sparkline>
        `);

        await nextFrame();

        expect(el).to.not.equal(null);
    });
});