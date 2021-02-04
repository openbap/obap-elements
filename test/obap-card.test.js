/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame } from '@open-wc/testing';
import '../src/obap-card/obap-card.js';

describe('obap-card', () => {
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-card></obap-card>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

    it('sets elevated to false by default', async () => {
        const el = await fixture(html`
            <obap-card></obap-card>
        `);

        expect(el.elevated).to.equal(false);
    });

    it('sets outlined to false by default', async () => {
        const el = await fixture(html`
            <obap-card></obap-card>
        `);

        expect(el.outlined).to.equal(false);
    });

    it('sets elevated via attribute', async () => {
        const el = await fixture(html`
            <obap-card elevated></obap-card>
        `);

        expect(el.elevated).to.equal(true);
    });

    it('sets outlined via attribute', async () => {
        const el = await fixture(html`
            <obap-card outlined></obap-card>
        `);

        expect(el.outlined).to.equal(true);
    });

    it('sets dom if heading specified', async () => {
        const el = await fixture(html`
            <obap-card heading="test"></obap-card>
        `);
        await nextFrame();

        const div = el.renderRoot.querySelector('.title');
        expect(div).to.not.equal(null);
    });

    it('sets dom if sub heading specified', async () => {
        const el = await fixture(html`
            <obap-card sub-heading="test"></obap-card>
        `);
        await nextFrame();

        const div = el.renderRoot.querySelector('.subtitle');
        expect(div).to.not.equal(null);
    });

    it('sets no dom if heading not specified', async () => {
        const el = await fixture(html`
            <obap-card></obap-card>
        `);
        await nextFrame();

        const div = el.renderRoot.querySelector('.title');
        expect(div).to.equal(null);
    });

    it('sets no dom if sub heading not specified', async () => {
        const el = await fixture(html`
            <obap-card></obap-card>
        `);
        await nextFrame();

        const div = el.renderRoot.querySelector('.subtitle');
        expect(div).to.equal(null);
    });
});