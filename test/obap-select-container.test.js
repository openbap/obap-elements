/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, oneEvent } from '@open-wc/testing';
import '../src/obap-select-container/obap-select-container.js';

describe('obap-select-controller', () => {
    it('sets the default properties', async () => {
        const el = await fixture(html`
            <obap-select-container></obap-select-container>
        `);

        await nextFrame();

        expect(el.label).to.equal('');
        expect(el.icon).to.equal('');
        expect(el.value).to.equal('');
        expect(el.borderStyle).to.equal('none');
        expect(el.noFloatLabel).to.equal(false);
        expect(el.opened).to.equal(false);
    });

    it('fires messages when opened and closed', async () => {
        const el = await fixture(html`
            <obap-select-container></obap-select-container>
        `);

        await nextFrame();

        setTimeout(() => el.opened = true);
        let result = await oneEvent(el, 'obap-select-action');
        await nextFrame();
        expect(result.detail.action).to.equal('opened');

        setTimeout(() => el.opened = false);
        result = await oneEvent(el, 'obap-select-action');
        await nextFrame();
        expect(result.detail.action).to.equal('closed');
    });

    it('does nothing if opened and closed twice', async () => {
        const el = await fixture(html`
            <obap-select-container></obap-select-container>
        `);

        await nextFrame();

        el.opened = true;
        expect(el.opened).to.equal(true);

        el.opened = true;
        expect(el.opened).to.equal(true);

        el.opened = false;
        expect(el.opened).to.equal(false);

        el.opened = false;
        expect(el.opened).to.equal(false);
    });
});

describe('obap-select-container', () => {
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-select-container></obap-select-container>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

    it('can be created', async () => {
        const el = await fixture(html`
            <obap-select-container></obap-select-container>
        `);

        await nextFrame();

        expect(el).to.not.equal(null);
    });

    it('displays an icon', async () => {
        const el = await fixture(html`
            <obap-select-container icon="android"></obap-select-container>
        `);

        await nextFrame();
        const icons = el.renderRoot.querySelectorAll('obap-icon');

        expect(icons.length).to.equal(1);
    });

    it('displays a label', async () => {
        const el = await fixture(html`
            <obap-select-container label="android"></obap-select-container>
        `);

        await nextFrame();
        const labels = el.renderRoot.querySelectorAll('div.floating-label');

        expect(labels.length).to.equal(1);
        expect(labels[0].innerText).to.equal('android');
    });

    it('does not display a label if noFloatLabel', async () => {
        const el = await fixture(html`
            <obap-select-container no-float-label label="android" value="value"></obap-select-container>
        `);

        await nextFrame();
        const labels = el.renderRoot.querySelectorAll('div.floating-label');

        expect(labels.length).to.equal(0);
    });

    it('closes on mouse click', async () => {
        const el = await fixture(html`
            <obap-select-container></obap-select-container>
        `);

        setTimeout(() => el.click());
        await nextFrame();
        expect(el.opened).to.equal(false);

        el.opened = true;
        expect(el.opened).to.equal(true);
        await nextFrame();

        setTimeout(() => el.click());
        await nextFrame();
        expect(el.opened).to.equal(false);
    });

    it('opens on click', async () => {
        const el = await fixture(html`
            <obap-select-container></obap-select-container>
        `);

        await nextFrame();
        expect(el.opened).to.equal(false);
        const container = el.renderRoot.querySelector('.selected-container');

        setTimeout(() => container.click());
        await nextFrame();
        expect(el.opened).to.equal(true);

        setTimeout(() => container.click());
        await nextFrame();
        expect(el.opened).to.equal(false);
    });

    it('closes on escape key', async () => {
        const el = await fixture(html`
            <obap-select-container></obap-select-container>
        `);

        el.opened = true;
        await nextFrame();
        expect(el.opened).to.equal(true);


        setTimeout(() => window.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Escape' })));
        await nextFrame();
        expect(el.opened).to.equal(false);

        setTimeout(() => window.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Escape' })));
        await nextFrame();
        expect(el.opened).to.equal(false);
    });

    it('opens on arrow down key', async () => {
        const el = await fixture(html`
            <obap-select-container></obap-select-container>
        `);

        el.opened = false;
        await nextFrame();
        expect(el.opened).to.equal(false);

        const ev = new KeyboardEvent('keydown', { 'key': 'ArrowDown' });
        ev.composedPath = function () {
            return [el.getRootNode().host];
        }

        el._handleGlobalKeyPressEvent(ev);
        await nextFrame();
        expect(el.opened).to.equal(true);

    });

    it('fires navigation events on arrow up, down and enter keys', async () => {
        const el = await fixture(html`
            <obap-select-container></obap-select-container>
        `);

        const evDown = new KeyboardEvent('keydown', { 'key': 'ArrowDown' });
        evDown.composedPath = function () {
            return [el.getRootNode().host];
        }

        const evUp = new KeyboardEvent('keydown', { 'key': 'ArrowUp' });
        evUp.composedPath = function () {
            return [el.getRootNode().host];
        }

        const evEnter = new KeyboardEvent('keydown', { 'key': 'Enter' });
        evEnter.composedPath = function () {
            return [el.getRootNode().host];
        }

        el.opened = true;
        await nextFrame();
        expect(el.opened).to.equal(true);

        setTimeout(() => el._handleGlobalKeyPressEvent(evDown));
        let result = await oneEvent(el, 'obap-select-action');
        await nextFrame();
        expect(result.detail.action).to.equal('move-down');

        setTimeout(() => el._handleGlobalKeyPressEvent(evUp));
        result = await oneEvent(el, 'obap-select-action');
        await nextFrame();
        expect(result.detail.action).to.equal('move-up');

        setTimeout(() => el._handleGlobalKeyPressEvent(evEnter));
        result = await oneEvent(el, 'obap-select-action');
        await nextFrame();
        expect(result.detail.action).to.equal('select');
    });

    it('does not fire navigation events on arrow up, down and enter keys if not from element', async () => {
        const el = await fixture(html`
           <obap-select-container></obap-select-container>
       `);

        const evDown = new KeyboardEvent('keydown', { 'key': 'ArrowDown' });
        evDown.composedPath = function () {
            return [];
        }

        const evUp = new KeyboardEvent('keydown', { 'key': 'ArrowUp' });
        evUp.composedPath = function () {
            return [];
        }

        const evEnter = new KeyboardEvent('keydown', { 'key': 'Enter' });
        evEnter.composedPath = function () {
            return [];
        }

        el.opened = true;
        await nextFrame();
        expect(el.opened).to.equal(true);

        el._handleGlobalKeyPressEvent(evDown);
        el._handleGlobalKeyPressEvent(evUp);
        el._handleGlobalKeyPressEvent(evEnter);
        expect(el.opened).to.equal(true);
    });

    it('does not fire navigation events on arrow up, down and enter keys if not open', async () => {
        const el = await fixture(html`
       <obap-select-container></obap-select-container>
   `);

        const evUp = new KeyboardEvent('keydown', { 'key': 'ArrowUp' });
        evUp.composedPath = function () {
            return [el.getRootNode().host];
        }

        const evEnter = new KeyboardEvent('keydown', { 'key': 'Enter' });
        evEnter.composedPath = function () {
            return [el.getRootNode().host];
        }

        await nextFrame();
        expect(el.opened).to.equal(false);

        el._handleGlobalKeyPressEvent(evUp);
        el._handleGlobalKeyPressEvent(evEnter);
        expect(el.opened).to.equal(false);
    });
});