/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, defineCE, unsafeStatic } from '@open-wc/testing';
import { LitElement } from 'lit-element';
import { ObapThemeableMixin } from '../src/obap-styles/obap-themeable-mixin.js';
import { theme } from '../src/obap-styles/obap-theme.js';

const tagName = defineCE(
    class extends ObapThemeableMixin(LitElement) {
        constructor() {
            super();
        }
    },
);

const tagNameNSD = defineCE(
    class extends ObapThemeableMixin(LitElement) {
        constructor() {
            super();
        }

        createRenderRoot() {
            return this;
        }
    },
);

const tag = unsafeStatic(tagName);
const tagNSD = unsafeStatic(tagNameNSD);

describe('obap-theme', () => {
    it('has the default theme', async () => {
        const el = await fixture(html`
            <${tag}></${tag}>
        `);

        expect(el.hasTheme('default')).to.equal(true);
    });

    it('has 1 theme', async () => {
        const el = await fixture(html`
            <${tag}></${tag}>
        `);

        expect(el.getThemeNames().length).to.equal(1);
    });

    it('initial theme is null', async () => {
        const el = await fixture(html`
            <${tag}></${tag}>
        `);

        expect(el.theme).to.equal(null);
    });

    it('can set default theme property', async () => {
        const el = await fixture(html`
            <${tag}></${tag}>
        `);

        el.theme = 'default';
        expect(el.theme).to.equal('default');
    });

    it('can set default theme via attribute', async () => {
        const el = await fixture(html`
            <${tag} theme="default"></${tag}>
        `);

        expect(el.theme).to.equal('default');
    });

    it('an invalid theme sets theme to null', async () => {
        const el = await fixture(html`
            <${tag} theme="default"></${tag}>
        `);

        el.theme = 'invalid';
        expect(el.theme).to.equal(null);
    });

    it('can create a new theme', async () => {
        theme.create('test1', '#8d6e63', '#5f4339', '#be9c91', '#FFCA28', '#FAFAFA');
        expect(theme.hasTheme('test1')).to.equal(true);
    });

    it('can apply a new theme', async () => {
        const el = await fixture(html`
            <${tag}></${tag}>
        `);

        theme.create('test2', '#8d6e63', '#5f4339', '#be9c91', '#FFCA28');
        expect(theme.hasTheme('test2')).to.equal(true);
        el.theme = 'test2';
        expect(el.theme).to.equal('test2');
    });

    it('returns false when applying a theme that does not exist', async () => {
        expect(theme.apply('no')).to.equal(false);
    });

    it('can apply theme to root document', async () => {
        theme.apply('default');
        expect(document.documentElement.style.getPropertyValue('--obap-primary-color')).to.not.equal('');
    });

    it('can remove theme from root document', async () => {
        theme.apply('default');
        expect(document.documentElement.style.getPropertyValue('--obap-primary-color')).to.not.equal('');
        theme.clear(null, true);
        expect(document.documentElement.style.getPropertyValue('--obap-primary-color')).to.equal('');
    });

    it('can apply theme to element shadow root', async () => {
        const el = await fixture(html`
            <${tag}></${tag}>
        `);

        el.theme = 'default';
        expect(el.shadowRoot.host.style.getPropertyValue('--obap-primary-color')).to.not.equal('');
    });

    it('can remove theme from element shadow root', async () => {
        const el = await fixture(html`
            <${tag}></${tag}>
        `);

        el.theme = 'default';
        expect(el.shadowRoot.host.style.getPropertyValue('--obap-primary-color')).to.not.equal('');
        el.theme = null;
        expect(el.shadowRoot.host.style.getPropertyValue('--obap-primary-color')).to.equal('');
    });

    it('can set theme property to the same value without error', async () => {
        const el = await fixture(html`
            <${tag}></${tag}>
        `);

        el.theme = 'default';
        expect(el.theme).to.equal('default');

        el.theme = 'default';
        expect(el.theme).to.equal('default');
    });

    it('can not set theme if there is no shadow root', async () => {
        const el = await fixture(html`
            <${tagNSD}></${tagNSD}>
        `);

        el.theme = 'default';
        expect(el.theme).to.equal(null);
    });
});