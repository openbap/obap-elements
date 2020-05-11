/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, defineCE, unsafeStatic } from '@open-wc/testing';
import { ObapElement } from '../src/obap-element/obap-element.js';

const tagName = defineCE(
    class extends ObapElement {
        constructor() {
            super();
        }
    },
);

const tag = unsafeStatic(tagName);

describe('obap-element', () => {
    it('can set the disabled state', async () => {
        const el = await fixture(html`
            <${tag} disabled></${tag}>
        `);

        el.disabled = true;
        expect(el.disabled).to.equal(true);

        el.disabled = false;
        expect(el.disabled).to.equal(false);
    });

    it('reflects the disabled property to the attribute', async () => {
        const el = await fixture(html`
            <${tag}></${tag}>
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
            <${tag} disabled></${tag}>
        `);

        expect(el.disabled).to.equal(true);
    });

    it('reflects the disabled state to the aria-disabled attribute', async () => {
        const el = await fixture(html`
            <${tag}></${tag}>
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
            <${tag}></${tag}>
        `);

        el.role = 'button';
        await nextFrame();
        expect(el.getAttribute('role')).to.equal('button');
    });

    it('sets the role property from the attribute', async () => {
        const el = await fixture(html`
            <${tag} role="button"></${tag}>
        `);

        expect(el.role).to.equal('button');
    });

    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <${tag}></${tag}>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
});