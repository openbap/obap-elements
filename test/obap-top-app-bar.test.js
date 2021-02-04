/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, defineCE, unsafeStatic, oneEvent } from '@open-wc/testing';
import '../src/obap-top-app-bar/obap-top-app-bar.js';
import '../src/obap-icons/obap-standard-icons.js';
import '../src/obap-button/obap-button.js';

describe('obap-top-app-bar', () => {
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-top-app-bar caption="Demo Application">
                <obap-button slot="left" round icon="menu"></obap-button>
                <obap-button slot="right" round icon="face"></obap-button>
                <obap-button slot="right" round icon="more-vert"></obap-button>
            </obap-top-app-bar>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

    it('sets the caption', async () => {
        const el = await fixture(html`
            <obap-top-app-bar caption="Demo Application">
                <obap-button slot="left" round icon="menu"></obap-button>
                <obap-button slot="right" round icon="face"></obap-button>
                <obap-button slot="right" round icon="more-vert"></obap-button>
            </obap-top-app-bar>
        `);

        const innerText = el.renderRoot.querySelector('.caption').innerText;

        expect(innerText).to.equal('Demo Application');
    });
});