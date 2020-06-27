/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, defineCE, unsafeStatic } from '@open-wc/testing';
import '../src/obap-button/obap-button.js';

describe('obap-button', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-button icon="android"></obap-button>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

    it('sets the elevation attribute to "2" when raised', async () => {
        const el = await fixture(html`
            <obap-button label="label" raised></obap-button>
        `);

        await nextFrame();
        expect(el.getAttribute('elevation')).to.equal('2');
    });

    it('has a ripple if no-ink is false', async () => {
        const el = await fixture(html`
            <obap-button label="label"></obap-button>
        `);

        await nextFrame();
        const ripple = el.renderRoot.querySelector('obap-ripple');
        expect(ripple).to.not.equal(null);
    });

    it('does not have a ripple if no-ink is true', async () => {
        const el = await fixture(html`
            <obap-button label="label" no-ink></obap-button>
        `);

        await nextFrame();
        const ripple = el.renderRoot.querySelector('obap-ripple');
        expect(ripple).to.equal(null);
    });

    it('sets the elevation attribute to "6" on mousedown when raised', async () => {
        const el = await fixture(html` 
            <obap-button label="label" raised></obap-button>
        `);

        el._handleMouseDownEvent(new Event('click'));
        await nextFrame();
        expect(el.getAttribute('elevation')).to.equal('6');
    });

    it('sets the elevation attribute to "6" on mousedown when raised and toggle', async () => {
        const el = await fixture(html`
            <obap-button label="label" raised toggle></obap-button>
        `);

        el._handleMouseDownEvent(new Event('click'));
        await nextFrame();
        expect(el.getAttribute('elevation')).to.equal('6');
        expect(el.selected).to.equal(true);
    });

    it('sets the elevation attribute to "2" on  second mousedown when raised and toggle', async () => {
        const el = await fixture(html`
            <obap-button label="label" raised toggle></obap-button>
        `);

        el._handleMouseDownEvent(new Event('click'));
        await nextFrame();
        expect(el.getAttribute('elevation')).to.equal('6');
        expect(el.selected).to.equal(true);

        el._handleMouseDownEvent(new Event('click'));
        await nextFrame();
        expect(el.getAttribute('elevation')).to.equal('2');
        expect(el.selected).to.equal(false);
    });

    it('only toggles the selected property when not raised', async () => {
        const el = await fixture(html`
            <obap-button label="label" toggle></obap-button>
        `);

        el._handleMouseDownEvent(new Event('click'));
        await nextFrame();
        expect(el.hasAttribute('elevation')).to.equal(false);
        expect(el.selected).to.equal(true);

        el._handleMouseDownEvent(new Event('click'));
        await nextFrame();
        expect(el.hasAttribute('elevation')).to.equal(false);
        expect(el.selected).to.equal(false);
    });

    it('has no elevation attribute on mousedown when not raised', async () => {
        const el = await fixture(html`
            <obap-button label="label"></obap-button>
        `);

        el._handleMouseDownEvent(new Event('click'));
        await nextFrame();
        expect(el.hasAttribute('elevation')).to.equal(false);
    });

    it('has no elevation attribute on mouseup when not raised', async () => {
        const el = await fixture(html`
            <obap-button label="label"></obap-button>
        `);

        el._handleMouseUpEvent(new Event('click'));
        await nextFrame();
        expect(el.hasAttribute('elevation')).to.equal(false);
    });

    it('sets the elevation attribute back to "2" on mouseup', async () => {
        const el = await fixture(html`
            <obap-button label="label" raised></obap-button>
        `);

        el._handleMouseDownEvent(new Event('click'));
        await nextFrame();
        expect(el.getAttribute('elevation')).to.equal('6');

        el._handleMouseUpEvent(new Event('click'));
        await nextFrame();
        expect(el.getAttribute('elevation')).to.equal('2');
    });

    it('sets the hasFocus property correctly when it receives and loses focus', async () => {
        const el = await fixture(html`
            <obap-button label="label"></obap-button>
        `);

        el._handleFocusEvent();
        await nextFrame();
        expect(el.hasFocus).to.equal(true);

        el._handleBlurEvent();
        await nextFrame();
        expect(el.hasFocus).to.equal(false);
    });

    it('supports touch events', async () => {
        const el = await fixture(html`
            <obap-button label="label" raised></obap-button>
        `);

        el._handleTouchStartEvent(new Event('touchstart'));
        await nextFrame();
        expect(el.getAttribute('elevation')).to.equal('6');

        el._handleTouchEndEvent(new Event('touchend'));
        await nextFrame();
        expect(el.getAttribute('elevation')).to.equal('2');
    });
});