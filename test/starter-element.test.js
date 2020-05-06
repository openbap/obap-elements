import { html, fixture, expect, nextFrame } from '@open-wc/testing';
import '../starter-element/starter-element.js';

describe('starter-element', () => {
    it('has the default text', async () => {
        const el = await fixture(html`
            <starter-element></starter-element>
        `);

        const div = el.renderRoot.querySelector('.container');

        expect(div.innerHTML).to.equal('starter-element');
    });

    it('can set the disabled state', async () => {
        const el = await fixture(html`
            <starter-element disabled></starter-element>
        `);

        el.disabled = true;
        expect(el.disabled).to.equal(true);

        el.disabled = false;
        expect(el.disabled).to.equal(false);
    });
    
    it('reflects the disabled property to the attribute', async () => {
        const el = await fixture(html`
            <starter-element></starter-element>
        `);

        el.disabled = true;
        await nextFrame();
        expect(el.hasAttribute('disabled')).to.equal(true);

        el.disabled = false;
        await nextFrame();
        expect(el.hasAttribute('disabled')).to.equal(false);
    });

    it('sets the disabled property from the attribute', async () => {
        const el = await fixture(html`
            <starter-element disabled></starter-element>
        `);

        expect(el.disabled).to.equal(true);
    });

    it('reflects the disabled state to the aria-disabled attribute', async () => {
        const el = await fixture(html`
            <starter-element></starter-element>
        `);

        el.disabled = true;
        await nextFrame();
        expect(el.getAttribute('aria-disabled')).to.equal('true');

        el.disabled = false;
        await nextFrame();
        expect(el.getAttribute('aria-disabled')).to.equal('false');
    });

    it('reflects the role property to the attribute', async () => {
        const el = await fixture(html`
            <starter-element></starter-element>
        `);

        el.role = 'button';
        await nextFrame();
        expect(el.getAttribute('role')).to.equal('button');
    });

    it('sets the role property from the attribute', async () => {
        const el = await fixture(html`
            <starter-element role="button"></starter-element>
        `);

        expect(el.role).to.equal('button');
    });

    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <starter-element></starter-element>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
});