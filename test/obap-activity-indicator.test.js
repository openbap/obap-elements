/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, oneEvent } from '@open-wc/testing';
import '../src/obap-activity-indicator/obap-activity-indicator.js';

describe('obap-activity-indicator', () => {
    /*
    it('passes the a11y audit (circular)', async () => {
        const el = await fixture(html`
            <obap-activity-indicator></obap-activity-indicator>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    
    it('passes the a11y audit (linear)', async () => {
        const el = await fixture(html`
            <obap-activity-indicator activity-type="linear"></obap-activity-indicator>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

    it('passes the a11y audit (linear)', async () => {
        const el = await fixture(html`
            <obap-activity-indicator activity-type="typing"></obap-activity-indicator>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

    it('creates an indeterminate circular progress by default', async () => {
        const el = await fixture(html`
            <obap-activity-indicator></obap-activity-indicator>
        `);

        await nextFrame();
        const progress = el.renderRoot.querySelector('obap-circular-progress');

        expect(progress).to.not.equal(null);
        expect(progress.indeterminate).to.equal(true);
    });

    it('creates an indeterminate linear progress', async () => {
        const el = await fixture(html`
            <obap-activity-indicator activity-type="linear"></obap-activity-indicator>
        `);

        await nextFrame();
        const progress = el.renderRoot.querySelector('obap-linear-progress');

        expect(progress).to.not.equal(null);
        expect(progress.indeterminate).to.equal(true);
    });

    it('creates an indeterminate typing progress', async () => {
        const el = await fixture(html`
            <obap-activity-indicator activity-type="typing"></obap-activity-indicator>
        `);

        await nextFrame();
        const progress = el.renderRoot.querySelector('div.typing-indicator');

        expect(progress).to.not.equal(null);
        expect(progress.hasAttribute('round')).to.equal(true);
    });

    it('creates an indeterminate equalizer progress', async () => {
        const el = await fixture(html`
            <obap-activity-indicator activity-type="equalizer"></obap-activity-indicator>
        `);

        await nextFrame();
        const progress = el.renderRoot.querySelector('div.typing-indicator');

        expect(progress).to.not.equal(null);
        expect(progress.hasAttribute('round')).to.equal(false);
    });
});