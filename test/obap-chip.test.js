/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, defineCE, unsafeStatic, oneEvent } from '@open-wc/testing';
import '../src/obap-chip/obap-chip.js';

describe('obap-chip', () => {
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-chip></obap-chip>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

    it('sets an icon if specified', async () => {
        const el = await fixture(html`
            <obap-chip icon="android"></obap-chip>
        `);

        const icon = el.shadowRoot.querySelector('obap-icon');
        expect(icon).to.not.equal(null);
        expect(icon.icon).to.equal('android');
    });

    it('does not create an icon element if no icon is specified', async () => {
        const el = await fixture(html`
            <obap-chip></obap-chip>
        `);

        const icon = el.shadowRoot.querySelector('obap-icon');
        expect(icon).to.equal(null);
    });

    it('sets a check icon', async () => {
        const el = await fixture(html`
            <obap-chip toggle selected show-check></obap-chip>
        `);

        const icon = el.shadowRoot.querySelector('svg');
        expect(icon).to.not.equal(null);
    });

    it('sets an remove icon if specified', async () => {
        const el = await fixture(html`
            <obap-chip removable></obap-chip>
        `);

        const icon = el.shadowRoot.querySelector('svg');
        expect(icon).to.not.equal(null);
    });

    it('does not create an remove icon element if not specified', async () => {
        const el = await fixture(html`
            <obap-chip></obap-chip>
        `);

        const icon = el.shadowRoot.querySelector('svg');
        expect(icon).to.equal(null);
    });

    it('fires a remove event', async () => {
        const el = await fixture(html`
            <obap-chip removable></obap-chip>
        `);

        const div = el.shadowRoot.querySelector('div.icon');

        setTimeout(() => div.click());

        const { detail } = await oneEvent(el, 'obap-chip-remove');

        expect(detail).to.not.equal(null);
        expect(detail.item).to.equal(el);
    });

    it('fires a click event', async () => {
        const el = await fixture(html`
            <obap-chip></obap-chip>
        `);

        const div = el.shadowRoot.querySelector('div.container');

        setTimeout(() => div.click());

        const { detail } = await oneEvent(el, 'obap-chip-click');

        expect(detail).to.not.equal(null);
    });

    it('toggles selected state on click', async () => {
        const el = await fixture(html`
            <obap-chip toggle></obap-chip>
        `);

        const div = el.shadowRoot.querySelector('div.container');
        expect(el.selected).to.equal(false);

        setTimeout(() => div.click());

        const { detail1 } = await oneEvent(el, 'obap-chip-click');

        expect(detail1).to.not.equal(null);
        expect(el.selected).to.equal(true);

        setTimeout(() => div.click());

        const { detail2 } = await oneEvent(el, 'obap-chip-click');

        expect(detail2).to.not.equal(null);
        expect(el.selected).to.equal(false);
    });
});
