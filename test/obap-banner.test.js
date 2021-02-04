/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, oneEvent } from '@open-wc/testing';
import '../src/obap-banner/obap-banner.js';

describe('obap-banner', () => {
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-banner></obap-banner>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

    it('can be created', async () => {     
        const el = await fixture(html`
            <obap-banner></obap-banner>
        `);

        await nextFrame();

        expect(el).to.not.equal(null);
    });

    it('has no icon by default', async () => {     
        const el = await fixture(html`
            <obap-banner></obap-banner>
        `);

        await nextFrame();
        const icon = el.renderRoot.querySelector('obap-icon');

        expect(icon).to.equal(null);
    });

    it('can have an icon', async () => {     
        const el = await fixture(html`
            <obap-banner icon="core:chevron-left"></obap-banner>
        `);

        await nextFrame();
        const icon = el.renderRoot.querySelector('obap-icon[icon="core:chevron-left"]');

        expect(icon).to.not.equal(null);
    });

    it('has no actions by default', async () => {     
        const el = await fixture(html`
            <obap-banner></obap-banner>
        `);

        await nextFrame();
        const actions = el.renderRoot.querySelectorAll('obap-button');

        expect(actions.length).to.equal(0);
    });

    it('can have actions', async () => {     
        const el = await fixture(html`
            <obap-banner dismiss-action="cancel" confirm-action="ok"></obap-banner>
        `);

        await nextFrame();
        const actions = el.renderRoot.querySelectorAll('obap-button');

        expect(actions.length).to.equal(2);
    });

    it('can have just a dismiss action', async () => {     
        const el = await fixture(html`
            <obap-banner dismiss-action="cancel"></obap-banner>
        `);

        await nextFrame();
        const actions = el.renderRoot.querySelectorAll('obap-button');

        expect(actions.length).to.equal(1);
        expect(actions[0].label).to.equal('cancel');
    });

    it('can have just a confirm action', async () => {     
        const el = await fixture(html`
            <obap-banner confirm-action="ok"></obap-banner>
        `);

        await nextFrame();
        const actions = el.renderRoot.querySelectorAll('obap-button');

        expect(actions.length).to.equal(1);
        expect(actions[0].label).to.equal('ok');
    });

    it('fires a confirm event', async () => {     
        const el = await fixture(html`
            <obap-banner confirm-action="ok"></obap-banner>
        `);

        await nextFrame();
        const actions = el.renderRoot.querySelectorAll('obap-button');

        setTimeout(() => actions[0].click());

        const result = await oneEvent(el, 'obap-banner-confirm');

        expect(result).to.not.equal(null);
    });

    it('fires a dismiss event', async () => {     
        const el = await fixture(html`
            <obap-banner dismiss-action="cancel"></obap-banner>
        `);

        await nextFrame();
        const actions = el.renderRoot.querySelectorAll('obap-button');

        setTimeout(() => actions[0].click());

        const result = await oneEvent(el, 'obap-banner-dismiss');

        expect(result).to.not.equal(null);
    });
});