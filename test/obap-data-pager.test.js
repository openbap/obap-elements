/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, oneEvent, nextFrame } from '@open-wc/testing';
import '../src/obap-data-pager/obap-data-pager.js';

describe('obap-data-pager', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-data-pager></obap-data-pager>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

    it('can be created', async () => {
        const el = await fixture(html`
            <obap-data-pager>
            </obap-data-pager>
        `);

        expect(el).to.not.equal(null);
        expect(el.count).to.equal(0);
        expect(el.rowsPerPageOptions.length).to.equal(3);

        expect(el.positionLabel).to.equal('{0} - {1} of {2}');
        expect(el.page).to.equal(1);

        await nextFrame();
        const select = el.renderRoot.querySelector('obap-select');
        expect(select).to.not.equal(null);
    });

    it('uses the first page size option, if provided', async () => {
        const el = await fixture(html`
            <obap-data-pager>
            </obap-data-pager>
        `);
        
        expect(el.pageSize).to.equal(10);
    });

    it('uses the default page size if none are provided', async () => {
        const rowsPerPageOptions = [];

        const el = await fixture(html`
            <obap-data-pager .rowsPerPageOptions="${rowsPerPageOptions}" count="100" default-page-size="15">
            </obap-data-pager>
        `);

        await nextFrame();
        
        expect(el.pageSize).to.equal(15);
    });

    it('does not display a selector if only one page size option is provided', async () => {
        const el = await fixture(html`
            <obap-data-pager>
            </obap-data-pager>
        `);

        el.rowsPerPageOptions = [10];
        await nextFrame();
        expect(el.pageSize).to.equal(10);
        const select = el.renderRoot.querySelector('obap-select');
        expect(select).to.equal(null);
    });

    it('can go to the next and previous pages', async () => {
        const el = await fixture(html`
            <obap-data-pager count="250">
            </obap-data-pager>
        `);

        expect(el.pageSize).to.equal(10);
        expect(el.page).to.equal(1);
        expect(el.pageCount).to.equal(25);
        expect(el.startItem).to.equal(1);
        expect(el.endItem).to.equal(10);

        el.nextPage();
        await nextFrame();

        expect(el.page).to.equal(2);
        expect(el.startItem).to.equal(11);
        expect(el.endItem).to.equal(20);

        el.previousPage();
        await nextFrame();

        expect(el.page).to.equal(1);
        expect(el.startItem).to.equal(1);
        expect(el.endItem).to.equal(10);
    });

    it('can set a page directly', async () => {
        const el = await fixture(html`
            <obap-data-pager count="250">
            </obap-data-pager>
        `);

        expect(el.pageSize).to.equal(10);
        expect(el.page).to.equal(1);
        expect(el.pageCount).to.equal(25);
        expect(el.startItem).to.equal(1);
        expect(el.endItem).to.equal(10);

        el.page = 3;
        await nextFrame();

        expect(el.page).to.equal(3);
        expect(el.startItem).to.equal(21);
        expect(el.endItem).to.equal(30);
    });

    it('cannot go back a page if on the first page', async () => {
        const el = await fixture(html`
            <obap-data-pager count="250">
            </obap-data-pager>
        `);

        expect(el.pageSize).to.equal(10);
        expect(el.page).to.equal(1);
        expect(el.pageCount).to.equal(25);
        expect(el.startItem).to.equal(1);
        expect(el.endItem).to.equal(10);

        el.previousPage();
        await nextFrame();

        expect(el.page).to.equal(1);
        expect(el.startItem).to.equal(1);
        expect(el.endItem).to.equal(10);
    });

    it('cannot go forward a page if on the last page', async () => {
        const el = await fixture(html`
            <obap-data-pager count="250">
            </obap-data-pager>
        `);

        el.page = 25;
        await nextFrame();

        expect(el.page).to.equal(25);
        expect(el.startItem).to.equal(241);
        expect(el.endItem).to.equal(250);

        el.nextPage();
        await nextFrame();

        expect(el.page).to.equal(25);
        expect(el.startItem).to.equal(241);
        expect(el.endItem).to.equal(250);
    });

    it('has a partial last page if necessary', async () => {
        const el = await fixture(html`
            <obap-data-pager count="255">
            </obap-data-pager>
        `);

        expect(el.pageSize).to.equal(10);
        expect(el.page).to.equal(1);
        expect(el.pageCount).to.equal(26);
        expect(el.startItem).to.equal(1);
        expect(el.endItem).to.equal(10);

        el.page = 26;
        await nextFrame();

        expect(el.page).to.equal(26);
        expect(el.startItem).to.equal(251);
        expect(el.endItem).to.equal(255);
    });
});