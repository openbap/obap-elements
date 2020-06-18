/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, oneEvent, nextFrame } from '@open-wc/testing';
import '../src/obap-switch/obap-switch.js';

describe('obap-switch', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-switch></obap-switch>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

    it('fires a change event on click', async () => {
        const el = await fixture(html`
            <obap-switch></obap-switch>
        `);

        const div = el.shadowRoot.querySelector('div.container');

        setTimeout(() => div.click());

        const { detail } = await oneEvent(el, 'change');

        expect(detail).to.not.equal(null);
    });

    it('toggles checked state on click', async () => {
        const el = await fixture(html`
            <obap-switch></obap-switch>
        `);

        const div = el.shadowRoot.querySelector('div.container');
        expect(el.selected).to.equal(false);

        
        setTimeout(() => div.click());

        const { detail1 } = await oneEvent(el, 'change');

        expect(detail1).to.not.equal(null);
        expect(el.selected).to.equal(true);

        setTimeout(() => div.click());

        const { detail2 } = await oneEvent(el, 'change');

        expect(detail2).to.not.equal(null);
        expect(el.selected).to.equal(false);
    });

    it('displays label only if left and right label is set', async () => {
        const el = await fixture(html`
            <obap-switch left-label="left" right-label="right"></obap-switch>
        `);

        await nextFrame();

        const div = el.shadowRoot.querySelector('div.container');

        expect(div.hasAttribute('has-label')).to.equal(true);
    });

    it('displays the right label when not selected', async () => {
        const el = await fixture(html`
            <obap-switch left-label="left" right-label="right"></obap-switch>
        `);

        await nextFrame();

        const div = el.shadowRoot.querySelector('div.label');

        expect(div.innerText.toLowerCase()).to.equal('right');
    });

    it('displays the left label when selected', async () => {
        const el = await fixture(html`
            <obap-switch left-label="left" right-label="right"></obap-switch>
        `);

        const container = el.shadowRoot.querySelector('div.container');
        setTimeout(() => container.click());

        await nextFrame();

        const div = el.shadowRoot.querySelector('div.label');

        expect(div.innerText.toLowerCase()).to.equal('left');
    });
});