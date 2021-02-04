/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame } from '@open-wc/testing';
import './test-element.js';
import '../src/obap-callout/obap-callout.js';

describe('obap-callout', () => {
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <test-element>
                <div id="target"></div>
                <obap-callout for="target">callout</obap-callout>
            </test-element>
        `);

        await expect(el.items[1]).shadowDom.to.be.accessible();
    });
    */

    it('has slotted content', async () => {
        const el = await fixture(html`
            <obap-callout>callout</obap-callout>
        `);

        await nextFrame();

        expect(el.innerHTML).to.equal('callout');
    });

    it('sets to visible on show', async () => {
        const el = await fixture(html`
            <obap-callout trigger-time="0">callout</obap-callout>
        `);

        await nextFrame();
        el.show();
        expect(el._showing).to.equal(true);
    });

    it('sets to hidden on hide', async () => {
        const el = await fixture(html`
            <obap-callout>callout</obap-callout>
        `);
        el.show();
        el.hide();
        expect(el._showing).to.equal(false);
    });

    it('sets to visible on focus', async () => {
        const el = await fixture(html`
            <obap-callout>callout</obap-callout>
        `);

        el._handleFocusEvent();

        expect(el._showing).to.equal(true);
    });

    it('does not set showing flag if fixed on focus', async () => {
        const el = await fixture(html`
            <obap-callout fixed>callout</obap-callout>
        `);

        expect(el._showing).to.equal(true);
        el._handleFocusEvent();
        expect(el._showing).to.equal(true);
    });
    
    it('toggles visible on focus', async () => {
        const el = await fixture(html`
            <obap-callout>callout</obap-callout>
        `);

        el._showing = true;
        el._handleFocusEvent();

        expect(el._showing).to.equal(false);
    });

    it('can abort showing', async () => {
        const el = await fixture(html`
            <obap-callout fixed trigger-time="0">callout</obap-callout>
        `);

        el.show();
        el._showing = false;
        expect(el._showing).to.equal(false);
    });

    it('handles touch events', async () => {
        const el = await fixture(html`
            <obap-callout>callout</obap-callout>
        `);

        expect(el._touching).to.equal(false);
        el._handleTouchStartEvent();
        expect(el._touching).to.equal(true);
    });

    it('does not hide if fixed', async () => {
        const el = await fixture(html`
            <obap-callout fixed>callout</obap-callout>
        `);

        el._showing = true;
        el.hide();
        expect(el._showing).to.equal(true);
    });

    it('ignores touch events if fixed', async () => {
        const el = await fixture(html`
            <obap-callout fixed>callout</obap-callout>
        `);

        expect(el._touching).to.equal(false);
        el._handleTouchStartEvent();
        expect(el._touching).to.equal(false);
    });
});
