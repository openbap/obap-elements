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



/*
import '../obap-elements.js';

describe('ObapElements', () => {
    it('has a default title "Hey there" and counter 5', async () => {
        const el = await fixture(html`
      <obap-elements></obap-elements>
    `);

        expect(el.title).to.equal('Hey there');
        expect(el.counter).to.equal(5);
    });

    it('increases the counter on button click', async () => {
        const el = await fixture(html`
      <obap-elements></obap-elements>
    `);
        el.shadowRoot.querySelector('button').click();

        expect(el.counter).to.equal(6);
    });

    it('can override the title via attribute', async () => {
        const el = await fixture(html`
      <obap-elements title="attribute title"></obap-elements>
    `);

        expect(el.title).to.equal('attribute title');
    });
});
*/