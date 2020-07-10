/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, oneEvent } from '@open-wc/testing';
import '../src/obap-select/obap-select.js';

describe('obap-select', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-select></obap-select>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

    it('can be created', async () => { 
        const items = ['a', 'b', 'c'];

        const el = await fixture(html`
            <obap-select .items="${items}"></obap-select>
        `);

        await nextFrame();

        expect(el).to.not.equal(null);
        expect(el.items.length).to.equal(3);
    });

    it('can select an item by clicking on it in single mode', async () => { 
        const items = ['a', 'b', 'c'];

        const el = await fixture(html`
            <obap-select .items="${items}"></obap-select>
        `);

        await nextFrame();

        const itemElements = el.renderRoot.querySelectorAll('.item');

        expect(el).to.not.equal(null);
        expect(el.items.length).to.equal(3);
        expect(itemElements.length).to.equal(3);
        expect(el.selectedIndex).to.equal(-1);

        itemElements[0].click();
        await nextFrame();
        expect(el.selectedIndex).to.equal(0);
    });

    it('can select an item by clicking on it in mult mode', async () => { 
        const items = ['a', 'b', 'c'];

        const el = await fixture(html`
            <obap-select multi .items="${items}"></obap-select>
        `);

        await nextFrame();

        const itemElements = el.renderRoot.querySelectorAll('.item');

        expect(el).to.not.equal(null);
        expect(el.items.length).to.equal(3);
        expect(itemElements.length).to.equal(3);
        expect(el.selectedIndex).to.equal(-1);
        expect(el.selectedItemIndexes.length).to.equal(0);

        itemElements[0].click();
        await nextFrame();
        expect(el.selectedIndex).to.equal(0);
        expect(el.selectedItemIndexes.length).to.equal(1);
    });

    it('handles navigation events', async () => { 
        const items = ['a', 'b', 'c'];

        const el = await fixture(html`
            <obap-select multi .items="${items}"></obap-select>
        `);

        el.opened = true;
        await nextFrame();

        const evDown = new CustomEvent('obap-select-action', { detail: { action: 'move-down' } });
        const evUp = new CustomEvent('obap-select-action', { detail: { action: 'move-up' } });
        const evSelect = new CustomEvent('obap-select-action', { detail: { action: 'select' } });
        const evClosed = new CustomEvent('obap-select-action', { detail: { action: 'closed' } });

        setTimeout(() => el.dispatchEvent(evDown));
        let result = await oneEvent(el, 'obap-select-action');
        await nextFrame();
        expect(result.detail.action).to.equal('move-down');
        el._selector.activeIndex = 0;

        setTimeout(() => el.dispatchEvent(evUp));
        result = await oneEvent(el, 'obap-select-action');
        await nextFrame();
        expect(result.detail.action).to.equal('move-up');
        el._selector.activeIndex = 2;

        setTimeout(() => el.dispatchEvent(evSelect));
        result = await oneEvent(el, 'obap-select-action');
        await nextFrame();
        expect(result.detail.action).to.equal('select');
        el.selectedIndex = 2;
        el._selector.activeIndex = -1;

        setTimeout(() => el.dispatchEvent(evClosed));
        result = await oneEvent(el, 'obap-select-action');
        await nextFrame();
        expect(result.detail.action).to.equal('closed');
        el._selector.activeIndex = -1;
    });

    it('handles navigation events directly', async () => { 
        const items = ['a', 'b', 'c'];

        const el = await fixture(html`
            <obap-select multi .items="${items}"></obap-select>
        `);

        el.opened = true;
        await nextFrame();

        const evDown = new CustomEvent('obap-select-action', { detail: { action: 'move-down' } });
        const evUp = new CustomEvent('obap-select-action', { detail: { action: 'move-up' } });
        const evSelect = new CustomEvent('obap-select-action', { detail: { action: 'select' } });
        const evClosed = new CustomEvent('obap-select-action', { detail: { action: 'closed' } });


        el._handleAction(evDown);
        expect(el._selector.activeIndex).to.equal(0);

        el._handleAction(evUp);
        expect(el._selector.activeIndex).to.equal(2);

        el._handleAction(evSelect);
        expect(el.selectedIndex).to.equal(2);
        expect(el._selector.activeIndex).to.equal(-1);

        el._handleAction(evDown);
        expect(el._selector.activeIndex).to.equal(0);

        el._handleAction(evClosed);
        expect(el._selector.activeIndex).to.equal(-1);
    });
});