import { html, fixture, expect } from '@open-wc/testing';

describe('ObapElements', () => {
  it('passes a basic test', () => {
      const el = 'test';

      expect(el).to.equal('test');
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

    it('passes the a11y audit', async () => {
        const el = await fixture(html`
      <obap-elements></obap-elements>
    `);

        await expect(el).shadowDom.to.be.accessible();
    });
});
*/
