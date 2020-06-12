/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, defineCE, unsafeStatic, oneEvent } from '@open-wc/testing';
import '../src/obap-icons/obap-standard-icons.js';
import '../src/obap-navigation-rail/obap-navigation-rail.js';

describe('obap-navigation-rail', () => {
    // Fails color contrast test.
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-navigation-rail selected-index="0" action-icon="add" action-label="Compose">
                        <obap-navigation-rail-item icon="inbox" label="Inbox"></obap-navigation-rail-item>
                        <obap-navigation-rail-item icon="star-border" label="Starred"></obap-navigation-rail-item>
                        <obap-navigation-rail-item icon="send" label="Sent"></obap-navigation-rail-item>
                        <obap-navigation-rail-item icon="delete" label="Trash"></obap-navigation-rail-item>
                        <obap-navigation-rail-item icon="info-outline" label="Spam"></obap-navigation-rail-item>
                        <obap-navigation-rail-item icon="drafts" label="Drafts"></obap-navigation-rail-item>
            </obap-navigation-rail>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

    it('sets the correct items', async () => {
        const el = await fixture(html`
            <obap-navigation-rail selected-index="0">
                        <obap-navigation-rail-item icon="inbox" label="Inbox"></obap-navigation-rail-item>
                        <obap-navigation-rail-item icon="star-border" label="Starred"></obap-navigation-rail-item>
                        <obap-navigation-rail-item icon="send" label="Sent"></obap-navigation-rail-item>
                        <obap-navigation-rail-item icon="delete" label="Trash"></obap-navigation-rail-item>
                        <obap-navigation-rail-item icon="info-outline" label="Spam"></obap-navigation-rail-item>
                        <obap-navigation-rail-item icon="drafts" label="Drafts"></obap-navigation-rail-item>
            </obap-navigation-rail>
        `);

        await nextFrame();

        expect(el.items.length).to.equal(6);
    });

    it('does not create an action item', async () => {
        const el = await fixture(html`
            <obap-navigation-rail selected-index="0">
                        <obap-navigation-rail-item icon="inbox" label="Inbox"></obap-navigation-rail-item>
            </obap-navigation-rail>
        `);

        await nextFrame();
        const action = el.renderRoot.querySelector('obap-button.action-button');

        expect(action).to.equal(null);
    });

    it('create an action item', async () => {
        const el = await fixture(html`
            <obap-navigation-rail selected-index="0" action-icon="add" action-label="Compose">
                <obap-navigation-rail-item icon="inbox" label="Inbox"></obap-navigation-rail-item>
            </obap-navigation-rail>
        `);

        await nextFrame();
        const action = el.renderRoot.querySelector('obap-button.action-button');

        expect(action).to.not.equal(null);
    });

    it('expands and collapses on mouse enter and leave', async () => {
        const el = await fixture(html`
            <obap-navigation-rail selected-index="0" collapsible>
                <obap-navigation-rail-item icon="inbox" label="Inbox"></obap-navigation-rail-item>
            </obap-navigation-rail>
        `);

        await nextFrame();
        expect(el.clientWidth).to.equal(72);
        expect(el.collapsed).to.equal(true);

        el._handleMouseEnterEvent();

        await nextFrame();
        expect(el.clientWidth).to.not.equal(72);
        expect(el.collapsed).to.equal(false);

        el._handleMouseLeaveEvent();

        await nextFrame();
        expect(el.clientWidth).to.equal(72);
        expect(el.collapsed).to.equal(true);

    });

    it('ignores mouse enter and leave if not collapsible', async () => {
        const el = await fixture(html`
            <obap-navigation-rail selected-index="0">
                <obap-navigation-rail-item icon="inbox" label="Inbox"></obap-navigation-rail-item>
            </obap-navigation-rail>
        `);

        await nextFrame();
        expect(el.clientWidth).to.equal(72);
        expect(el.collapsed).to.equal(true);

        el._handleMouseEnterEvent();

        await nextFrame();
        expect(el.clientWidth).to.equal(72);
        expect(el.collapsed).to.equal(true);

        el._handleMouseLeaveEvent();

        await nextFrame();
        expect(el.clientWidth).to.equal(72);
        expect(el.collapsed).to.equal(true);
    });

    it('hides action item label if collapsed', async () => {
        const el = await fixture(html`
            <obap-navigation-rail selected-index="0" action-icon="add" action-label="Compose" collapsible collapsed>
                <obap-navigation-rail-item icon="inbox" label="Inbox"></obap-navigation-rail-item>
            </obap-navigation-rail>
        `);

        await nextFrame();
        expect(el.clientWidth).to.equal(72);
        expect(el.collapsed).to.equal(true);

        const action = el.renderRoot.querySelector('obap-button.action-button');

        expect(action.label).to.equal('');
    });

    it('shows action item label if not collapsed', async () => {
        const el = await fixture(html`
            <obap-navigation-rail selected-index="0" action-icon="add" action-label="Compose" collapsible>
                <obap-navigation-rail-item icon="inbox" label="Inbox"></obap-navigation-rail-item>
            </obap-navigation-rail>
        `);

        await nextFrame();
        el._handleMouseEnterEvent();
        await nextFrame();

        const action = el.renderRoot.querySelector('obap-button.action-button');

        expect(action.label).to.equal('Compose');
    });

    it('dispatches message on action click', async () => {
        const el = await fixture(html`
            <obap-navigation-rail selected-index="0" action-icon="add" action-label="Compose">
                <obap-navigation-rail-item icon="inbox" label="Inbox"></obap-navigation-rail-item>
            </obap-navigation-rail>
        `);

        const action = el.renderRoot.querySelector('obap-button.action-button');
        setTimeout(() => action.click());

        const { detail } = await oneEvent(el, 'obap-navigation-rail-action');

        expect(detail).to.not.equal(null);
    });

    it('only displays an icon if collapsed', async () => {
        const el = await fixture(html`
            <obap-navigation-rail selected-index="0" collapsible collapsed>
                <obap-navigation-rail-item icon="inbox" label="Inbox"></obap-navigation-rail-item>
            </obap-navigation-rail>
        `);

        await nextFrame();
        const item = el.items[0];
        const icon = item.renderRoot.querySelector('obap-icon');
        const label = item.renderRoot.querySelector('div.label');

        expect(icon).to.not.equal(null);
        expect(label).to.equal(null);
    });

    it('displays an icon and label if not collapsed', async () => {
        const el = await fixture(html`
            <obap-navigation-rail selected-index="0" collapsible>
                <obap-navigation-rail-item icon="inbox" label="Inbox"></obap-navigation-rail-item>
            </obap-navigation-rail>
        `);

        el.collapsed = false;

        await nextFrame();
        const item = el.items[0];
        const icon = item.renderRoot.querySelector('obap-icon');
        const label = item.renderRoot.querySelector('div.label');

        expect(icon).to.not.equal(null);
        expect(label).to.not.equal(null);
    });

    it('displays no icon if collapsed and no icon defined', async () => {
        const el = await fixture(html`
            <obap-navigation-rail selected-index="0" collapsible collapsed>
                <obap-navigation-rail-item label="Inbox"></obap-navigation-rail-item>
            </obap-navigation-rail>
        `);

        await nextFrame();
        const item = el.items[0];
        const icon = item.renderRoot.querySelector('obap-icon');
        const label = item.renderRoot.querySelector('div.label');

        expect(icon).to.equal(null);
        expect(label).to.equal(null);
    });

    it('displays no icon not collapsed and no icon defined', async () => {
        const el = await fixture(html`
            <obap-navigation-rail selected-index="0" collapsible>
                <obap-navigation-rail-item label="Inbox"></obap-navigation-rail-item>
            </obap-navigation-rail>
        `);

        el.collapsed = false;

        await nextFrame();
        const item = el.items[0];
        const icon = item.renderRoot.querySelector('obap-icon');
        const label = item.renderRoot.querySelector('div.label');

        expect(icon).to.equal(null);
        expect(label).to.not.equal(null);
    });

    it('displays no label not collapsed and no label defined', async () => {
        const el = await fixture(html`
            <obap-navigation-rail selected-index="0" collapsible>
                <obap-navigation-rail-item icon="inbox"></obap-navigation-rail-item>
            </obap-navigation-rail>
        `);

        el.collapsed = false;

        await nextFrame();
        const item = el.items[0];
        const icon = item.renderRoot.querySelector('obap-icon');
        const label = item.renderRoot.querySelector('div.label');

        expect(icon).to.not.equal(null);
        expect(label).to.equal(null);
    });

    it('displays an icon and label', async () => {
        const el = await fixture(html`
            <obap-navigation-rail selected-index="0">
                <obap-navigation-rail-item icon="inbox" label="Inbox"></obap-navigation-rail-item>
            </obap-navigation-rail>
        `);

        await nextFrame();
        const item = el.items[0];
        const icon = item.renderRoot.querySelector('obap-icon');
        const label = item.renderRoot.querySelector('div.label');

        expect(icon).to.not.equal(null);
        expect(label).to.not.equal(null);
    });

    it('displays no icon if no icon defined', async () => {
        const el = await fixture(html`
            <obap-navigation-rail selected-index="0" >
                <obap-navigation-rail-item label="Inbox"></obap-navigation-rail-item>
            </obap-navigation-rail>
        `);

        await nextFrame();
        const item = el.items[0];
        const icon = item.renderRoot.querySelector('obap-icon');
        const label = item.renderRoot.querySelector('div.label');

        expect(icon).to.equal(null);
        expect(label).to.not.equal(null);
    });

    it('displays no label if no label defined', async () => {
        const el = await fixture(html`
            <obap-navigation-rail selected-index="0">
                <obap-navigation-rail-item icon="inbox"></obap-navigation-rail-item>
            </obap-navigation-rail>
        `);

        await nextFrame();
        const item = el.items[0];
        const icon = item.renderRoot.querySelector('obap-icon');
        const label = item.renderRoot.querySelector('div.label');

        expect(icon).to.not.equal(null);
        expect(label).to.equal(null);
    });
});