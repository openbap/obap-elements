/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, oneEvent } from '@open-wc/testing';
import '../src/obap-markdown-viewer/obap-markdown-viewer.js';

describe('obap-markdown-viewer', () => {
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-markdown-viewer></obap-markdown-viewer>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

    it('can be created', async () => {
        const el = await fixture(html`
            <obap-markdown-viewer></obap-markdown-viewer>
        `);

        expect(el).to.not.equal(null);
    });

    it('supports attribute markdown', async () => {
        const el = await fixture(html`
            <obap-markdown-viewer markdown="# Heading"></obap-markdown-viewer>
        `);

        const heading = el.renderRoot.getElementById('heading');
        expect(heading).to.not.equal(null);
        expect(heading.tagName).to.equal('H1');
        expect(heading.innerText).to.equal('Heading');
    });

    it('supports script markdown', async () => {
        const el = await fixture(html`
            <obap-markdown-viewer>
                <script type="text/markdown">
                    # Heading
                </script>
            </obap-markdown-viewer>
        `);

        const heading = el.renderRoot.getElementById('heading');
        expect(heading).to.not.equal(null);
        expect(heading.tagName).to.equal('H1');
        expect(heading.innerText).to.equal('Heading');
    });

    it('ignores invalid slotted elements', async () => {
        const el = await fixture(html`
            <obap-markdown-viewer>
                <div>
                    # Heading
                </div>
            </obap-markdown-viewer>
        `);

        const heading = el.renderRoot.getElementById('heading');
        expect(heading).to.equal(null);
    });

    it('supports markdown files', async () => {
        const el = await fixture(html`
            <obap-markdown-viewer>
                
            </obap-markdown-viewer>
        `);

        expect(el.markdown).to.equal('');
        el._setMarkdownFile('./helpers/obap-markdown-viewer.txt');
        await nextFrame();
        expect(el.markdown).to.equal('');

        el._setMarkdownFile('./helpers/obap-markdown-viewer.md');
        await nextFrame();
        expect(el.markdown).to.not.equal(null);

        el._setMarkdownFile(window.location.origin + 'helpers/obap-markdown-viewer.md');
        await nextFrame();
        expect(el.markdown).to.not.equal(null);
    });

    it('sets a src', async () => {
        const el = await fixture(html`
            <obap-markdown-viewer src="test">
                
            </obap-markdown-viewer>
        `);
        
        await nextFrame();
        expect(el.src).to.equal('test');

        el.src = 'test';

        await nextFrame();
        expect(el.src).to.equal('test');
    });
});