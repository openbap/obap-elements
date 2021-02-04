/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame } from '@open-wc/testing';
import '../src/obap-sparkline/obap-sparkline.js';

describe('obap-bar-sparkline', () => {
    it('renders nothing if there are no values', async () => {     
        const el = await fixture(html`
            <obap-bar-sparkline></obap-bar-sparkline>
        `);

        await nextFrame();
        const container = el.renderRoot.querySelector('svg');

        expect(el).to.not.equal(null);
        expect(container.childElementCount).to.equal(0);
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
    it('renders nothing if there are no values', async () => {     
        const el = await fixture(html`
            <obap-winloss-sparkline></obap-winloss-sparkline>
        `);

        await nextFrame();
        const container = el.renderRoot.querySelector('svg');

        expect(el).to.not.equal(null);
        expect(container.childElementCount).to.equal(0);
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
    it('renders nothing if there are no values', async () => {     
        const el = await fixture(html`
            <obap-line-sparkline></obap-line-sparkline>
        `);

        await nextFrame();
        const container = el.renderRoot.querySelector('svg');

        expect(el).to.not.equal(null);
        expect(container.childElementCount).to.equal(0);
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
    it('renders nothing if there are no values', async () => {     
        const el = await fixture(html`
            <obap-pie-sparkline></obap-pie-sparkline>
        `);

        await nextFrame();
        const container = el.renderRoot.querySelector('svg');

        expect(el).to.not.equal(null);
        expect(container.childElementCount).to.equal(0);
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
    it('renders nothing if there are no values', async () => {     
        const el = await fixture(html`
            <obap-bullet-sparkline></obap-bullet-sparkline>
        `);

        await nextFrame();

        expect(el).to.not.equal(null);
    });

    it('creates a rectange for each range', async () => {
        const percentageRanges = [40, 70, 85, 100];
       
        const el = await fixture(html`
            <obap-bullet-sparkline .percentageRanges="${percentageRanges}"></obap-bullet-sparkline>
        `);

        await nextFrame();
        const ranges = el.renderRoot.querySelectorAll('rect.range');

        expect(ranges.length).to.equal(4);
    });
});

describe('obap-percentage-sparkline', () => {
    it('sets value property from attribute', async () => {     
        const el = await fixture(html`
            <obap-percentage-sparkline value="25"></obap-percentage-sparkline>
        `);

        await nextFrame();

        expect(el.value).to.equal(25);
    });
});
