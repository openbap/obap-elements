/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, defineCE, unsafeStatic, oneEvent } from '@open-wc/testing';
import { ObapElement, css } from '../src/obap-element/obap-element.js';

const tagName = defineCE(
    class extends ObapElement {
        static get styles() {
            return [css`
                :host {
                    --obap-test-color: #FFFFFF;
                    display: block;
                }
            `];
        }
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

    it('provides a css variable value', async () => {
        const el = await fixture(html`
            <${tag}></${tag}>
        `);

        await nextFrame();
        const cs = window.getComputedStyle(el);
        const val = el.getCssVariableValue(cs, '--obap-test-color', 'unknown').trim();
        

        expect(val).to.equal('#FFFFFF');
    });

    it('provides a default value if a css variable value does not exist', async () => {
        const el = await fixture(html`
            <${tag}></${tag}>
        `);

        await nextFrame();
        const cs = window.getComputedStyle(el);
        const val = el.getCssVariableValue(cs, '--obap-test-font', 'unknown').trim();
        

        expect(val).to.equal('unknown');
    });

    it('can fire a message', async () => {
        const el = await fixture(html`
            <${tag}></${tag}>
        `);

        await nextFrame();
        setTimeout(() => el.fireMessage('test-message'));
        let result = await oneEvent(el, 'test-message');

        expect(result).to.not.equal(null);
    });
});