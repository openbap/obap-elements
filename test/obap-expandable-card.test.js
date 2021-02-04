/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, defineCE, unsafeStatic, oneEvent } from '@open-wc/testing';
import '../src/obap-expandable-card/obap-expandable-card.js';
import '../src/obap-icons/obap-standard-icons.js';

describe('obap-expandable-card', () => {
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-expandable-card>
            </obap-expandable-card>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

    it('toggles opened state', async () => {
        const el = await fixture(html`
            <obap-expandable-card>
            </obap-expandable-card>
        `);

        await expect(el.opened).to.equal(false);
        el.toggle();
        await expect(el.opened).to.equal(true);
        el.toggle();
        await expect(el.opened).to.equal(false);
    });

    it('sets the label', async () => {
        const el = await fixture(html`
            <obap-expandable-card label="test">
            </obap-expandable-card>
        `);

        await nextFrame();

        const item = el.renderRoot.querySelector('div.label');
        await expect(item).to.not.equal(null);
        await expect(item.innerText).to.equal('test');
    });

    it('sets the icon', async () => {
        const el = await fixture(html`
            <obap-expandable-card icon="android">
            </obap-expandable-card>
        `);

        await nextFrame();

        const item = el.renderRoot.querySelector('obap-icon.icon');
        await expect(item).to.not.equal(null);
        await expect(item.icon).to.equal('android');
    });

    it('sets no icon if the icon is not specified', async () => {
        const el = await fixture(html`
            <obap-expandable-card>
            </obap-expandable-card>
        `);

        await nextFrame();

        const item = el.renderRoot.querySelector('obap-icon.icon');
        await expect(item).to.equal(null);
    });

    it('sets the expander', async () => {
        const el = await fixture(html`
            <obap-expandable-card>
            </obap-expandable-card>
        `);

        await nextFrame();

        const item = el.renderRoot.querySelector('obap-icon.chevron');
        await expect(item).to.not.equal(null);
        await expect(item.icon).to.equal('core:chevron-down');
    });

    it('hides the chevron', async () => {
        const el = await fixture(html`
            <obap-expandable-card hide-expander>
            </obap-expandable-card>
        `);

        await nextFrame();

        const item = el.renderRoot.querySelector('obap-icon.chevron');
        await expect(item).to.equal(null);
    });
});
