/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, oneEvent } from '@open-wc/testing';
import '../src/obap-linear-progress/obap-linear-progress.js';


describe('obap-linear-progress', () => {
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-linear-progress></obap-linear-progress>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

    it('displays primary and secondary bars', async () => {
        const el = await fixture(html`
            <obap-linear-progress value="10" secondary-value="20"></obap-linear-progress>
        `);

        await nextFrame();
        const primaryBar = el.renderRoot.querySelector('.primary');
        const secondaryBar = el.renderRoot.querySelector('.secondary');

        expect(el.value).to.equal(10);
        expect(el.secondaryValue).to.equal(20);
        expect(primaryBar).to.not.equal(null);
        expect(secondaryBar).to.not.equal(null);
    });

    it('does no create bars if values are 0', async () => {
        const el = await fixture(html`
            <obap-linear-progress value="0" secondary-value="0"></obap-linear-progress>
        `);

        await nextFrame();
        const primaryBar = el.renderRoot.querySelector('.primary');
        const secondaryBar = el.renderRoot.querySelector('.secondary');

        expect(el.value).to.equal(0);
        expect(el.secondaryValue).to.equal(0);
        expect(primaryBar).to.equal(null);
        expect(secondaryBar).to.equal(null);
    });

    it('displays an indeterminate bar', async () => {
        const el = await fixture(html`
            <obap-linear-progress indeterminate></obap-linear-progress>
        `);

        await nextFrame();
        const indeterminateBar = el.renderRoot.querySelector('.indeterminate');

        expect(indeterminateBar).to.not.equal(null);
    });

    it('does not display an indeterminate bar when disabled', async () => {
        const el = await fixture(html`
            <obap-linear-progress indeterminate disabled></obap-linear-progress>
        `);

        await nextFrame();
        const indeterminateBar = el.renderRoot.querySelector('.indeterminate');

        expect(indeterminateBar).to.equal(null);
    });
});