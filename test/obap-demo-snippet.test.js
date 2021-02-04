/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, oneEvent } from '@open-wc/testing';
import '../src/obap-demo-snippet/obap-demo-snippet.js';
import '../src/obap-button/obap-button.js';

describe('obap-demo-snippet', () => {
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-demo-snippet></obap-demo-snippet>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

    it('can be created', async () => {
        const el = await fixture(html`
            <obap-demo-snippet></obap-demo-snippet>
        `);

        expect(el).to.not.equal(null);
    });

    it('has a copy button by default', async () => {
        const el = await fixture(html`
            <obap-demo-snippet></obap-demo-snippet>
        `);

        await nextFrame();

        const button = el.renderRoot.getElementById('copy-button');

        expect(button).to.not.equal(null);
    });

    it('can disable the copy button', async () => {
        const el = await fixture(html`
            <obap-demo-snippet disable-copy></obap-demo-snippet>
        `);

        await nextFrame();

        const button = el.renderRoot.getElementById('copy-button');

        expect(button).to.equal(null);
    });

    it('can display a demo template', async () => {
        const el = await fixture(html`
            <obap-demo-snippet>
                <template>
                    <obap-button></obap-button>
                </template>
            </obap-demo-snippet>
        `);

        await nextFrame();

        expect(el._codeSnippet.indexOf('obap-button')).to.not.equal(-1);
    });

    it('ignores non template content', async () => {
        const el = await fixture(html`
            <obap-demo-snippet>
                <obap-button></obap-button>
            </obap-demo-snippet>
        `);

        await nextFrame();
        
        expect(el._codeSnippet.indexOf('obap-button')).to.equal(-1);
    });

    it('can copy code to the clipboard', async () => {
        const el = await fixture(html`
            <obap-demo-snippet>
                <template>
                    <obap-button></obap-button>
                </template>
            </obap-demo-snippet>
        `);

        await nextFrame();
        el._copyToClipboard();
        await nextFrame();
        expect(el).to.not.equal(null);
    });

    it('handles copy errors', async () => {
        const el = await fixture(html`
            <obap-demo-snippet>
                <template>
                    <obap-button></obap-button>
                </template>
            </obap-demo-snippet>
        `);

        document.execCommand = function(command) {
            throw 'fake error';
        };

        await nextFrame();
        el._copyToClipboard();
        await nextFrame();
        expect(el).to.not.equal(null);
    });

    it('resets the copy button state', async () => {
        const el = await fixture(html`
            <obap-demo-snippet tabindex="0">
                <template>
                    <obap-button></obap-button>
                </template>
            </obap-demo-snippet>
        `);

        await nextFrame();

        const copyButton = el.renderRoot.getElementById('copy-button');

        expect(copyButton).to.not.equal(null);
        copyButton.label = 'test';
        el._resetCopyButtonState();
        expect(copyButton.label.toLowerCase()).to.equal('copy');
    });
});