/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, defineCE, unsafeStatic } from '@open-wc/testing';
import '../src/obap-radio/obap-radio.js';
import '../src/obap-radio/obap-radio-group.js';

describe('obap-radio', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-radio-group>
                <obap-radio label="one"></obap-radio>
                <obap-radio label="two"></obap-radio>
                <obap-radio label="three"></obap-radio>
            </obap-radio-group>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

    
    it('has a ripple if no-ink is false', async () => {
        const el = await fixture(html`
            <obap-radio-group>
                <obap-radio label="one"></obap-radio>
                <obap-radio label="two"></obap-radio>
                <obap-radio label="three"></obap-radio>
            </obap-radio-group>
        `);

        await nextFrame();
        const ripple = el.items[2].renderRoot.querySelector('obap-ripple');
        expect(ripple).to.not.equal(null);
    });

    it('does not a ripple if no-ink is false', async () => {
        const el = await fixture(html`
            <obap-radio-group>
                <obap-radio label="one"></obap-radio>
                <obap-radio label="two"></obap-radio>
                <obap-radio label="three" no-ink></obap-radio>
            </obap-radio-group>
        `);

        await nextFrame();
        const ripple = el.items[2].renderRoot.querySelector('obap-ripple');
        expect(ripple).to.equal(null);
    });

    it('only sets the ripple focus if the tab has focus but not selected', async () => {
        const el = await fixture(html`
            <obap-radio-group>
                <obap-radio label="one" has-focus></obap-radio>
                <obap-radio label="two" has-focus selected></obap-radio>
            </obap-radio-group>
        `);

        await nextFrame();
        const ripple0 = el.items[0].renderRoot.querySelector('obap-ripple');
        const ripple1 = el.items[1].renderRoot.querySelector('obap-ripple');
        expect(ripple0.hasFocus).to.equal(true);
        expect(ripple1.hasFocus).to.equal(false);
    });

    it('selects an item via the group', async () => {
        const el = await fixture(html`
            <obap-radio-group selected-index="2">
                <obap-radio label="one"></obap-radio>
                <obap-radio label="two"></obap-radio>
                <obap-radio label="three"></obap-radio>
            </obap-radio-group>
        `);

        await nextFrame();
        expect(el.items[2].selected).to.equal(true);
    });
/*
    it('does not have a ripple if no-ink is true', async () => {
        const el = await fixture(html`
            <obap-check label="label" no-ink></obap-check>
        `);

        await nextFrame();
        const ripple = el.renderRoot.querySelector('obap-ripple');
        expect(ripple).to.equal(null);
    });
    
    it('has no svg element if not selected or indeterminate', async () => {
        const el = await fixture(html`
            <obap-check label="label"></obap-check>
        `);

        await nextFrame();
        const svg = el.renderRoot.querySelector('svg');
        expect(svg).to.equal(null);
    });

    it('has a svg element if selected', async () => {
        const el = await fixture(html`
            <obap-check label="label" selected></obap-check>
        `);

        await nextFrame();
        const svg = el.renderRoot.querySelector('svg');
        expect(svg).to.not.equal(null);
    });

    it('has a svg element if indeterminate', async () => {
        const el = await fixture(html`
            <obap-check label="label" indeterminate></obap-check>
        `);

        await nextFrame();
        const svg = el.renderRoot.querySelector('svg');
        expect(svg).to.not.equal(null);
    });

    it('selects the element when clicked', async () => {
        const el = await fixture(html`
            <obap-check label="label"></obap-check>
        `);

        el._clickHandler();
        expect(el.selected).to.equal(true);
    });

    it('deselects the element when clicked a second time', async () => {
        const el = await fixture(html`
            <obap-check label="label"></obap-check>
        `);

        el._clickHandler();
        expect(el.selected).to.equal(true);

        el._clickHandler();
        expect(el.selected).to.equal(false);
    });

    it('removes indeterminate flag when selected', async () => {
        const el = await fixture(html`
            <obap-check label="label" indeterminate></obap-check>
        `);

        expect(el.indeterminate).to.equal(true);
        el._clickHandler();
        expect(el.selected).to.equal(true);
        expect(el.indeterminate).to.equal(false);
    });
    */
});