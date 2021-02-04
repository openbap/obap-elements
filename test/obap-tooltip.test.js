/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame } from '@open-wc/testing';
import './test-element.js';
import '../src/obap-tooltip/obap-tooltip.js';

describe('obap-tooltip', () => {
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <test-element>
                <div id="target"></div>
                <obap-tooltip for="target">tooltip</obap-tooltip>
            </test-element>
        `);

        await expect(el.items[1]).shadowDom.to.be.accessible();
    });
    */

    it('has a target element', async () => {
        const el = await fixture(html`
            <test-element>
                <div id="target"></div>
                <obap-tooltip for="target">tooltip</obap-tooltip>
            </test-element>
        `);

        await nextFrame();
        const tooltip = el.querySelector('obap-tooltip');

        expect(tooltip).to.not.equal(null);
        expect(tooltip.targetElement).to.not.equal(null);
    });

    it('has slotted content', async () => {
        const el = await fixture(html`
            <obap-tooltip anchor="none">tooltip</obap-tooltip>
        `);

        await nextFrame();

        expect(el.innerHTML).to.equal('tooltip');
    });

    it('sets to visible on show', async () => {
        const el = await fixture(html`
            <obap-tooltip anchor="none" trigger-time="0">tooltip</obap-tooltip>
        `);

        await nextFrame();
        el.show();
        expect(el._showing).to.equal(true);
    });

    it('sets to hidden on hide', async () => {
        const el = await fixture(html`
            <obap-tooltip anchor="none">tooltip</obap-tooltip>
        `);
        el.show();
        el.hide();
        expect(el._showing).to.equal(false);
    });

    it('sets to visible on focus', async () => {
        const el = await fixture(html`
            <obap-tooltip anchor="none">tooltip</obap-tooltip>
        `);

        el._handleFocusEvent();

        expect(el._showing).to.equal(true);
    });

    it('toggles visible on focus', async () => {
        const el = await fixture(html`
            <obap-tooltip anchor="none">tooltip</obap-tooltip>
        `);

        el._showing = true;
        el._handleFocusEvent();

        expect(el._showing).to.equal(false);
    });

    it('can abort showing', async () => {
        const el = await fixture(html`
            <obap-tooltip anchor="none" trigger-time="0">tooltip</obap-tooltip>
        `);

        el.show();
        el._showing = false;
        expect(el._showing).to.equal(false);
    });

    it('sets to visible on touch', async () => {
        const el = await fixture(html`
            <obap-tooltip anchor="none">tooltip</obap-tooltip>
        `);

        el._handleTouchStartEvent();

        expect(el._showing).to.equal(true);
        expect(el._touching).to.equal(true);
    });
});
