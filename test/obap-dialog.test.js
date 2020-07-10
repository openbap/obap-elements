/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, oneEvent } from '@open-wc/testing';
import '../src/obap-dialog/obap-dialog.js';
import '../src/obap-button/obap-button.js';

describe('obap-dialog', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-dialog></obap-dialog>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

    it('can open and close using methods', async () => {
        const el = await fixture(html`
            <obap-dialog></obap-dialog>
        `);

        expect(el.opened).to.equal(false);
        el.open();

        await nextFrame();

        expect(el.opened).to.equal(true);
        el.close();

        await nextFrame();

        expect(el.opened).to.equal(false);
    });

    it('can open and close using opened property', async () => {
        const el = await fixture(html`
            <obap-dialog></obap-dialog>
        `);

        expect(el.opened).to.equal(false);
        el.opened = true;

        await nextFrame();

        expect(el.opened).to.equal(true);
        el.opened = false;

        await nextFrame();

        expect(el.opened).to.equal(false);
    });

    it('cannot be opened more than once', async () => {
        const el = await fixture(html`
            <obap-dialog></obap-dialog>
        `);

        expect(el.opened).to.equal(false);
        el.opened = true;
        el.opened = true;

        await nextFrame();

        expect(el.opened).to.equal(true);
    });

    it('cannot be closed more than once', async () => {
        const el = await fixture(html`
            <obap-dialog></obap-dialog>
        `);

        expect(el.opened).to.equal(false);
        el.opened = false;
        el.opened = false;

        await nextFrame();

        expect(el.opened).to.equal(false);
    });

    it('creates a backdrop', async () => {
        const el = await fixture(html`
            <obap-dialog modal></obap-dialog>
        `);

        let backdrop = null;

        await nextFrame();
        backdrop = document.body.querySelectorAll('obap-backdrop');
        expect(backdrop.length).to.equal(1);
    });

    it('can be dismissed', async () => {
        const el = await fixture(html`
            <obap-dialog modal>
                <obap-button label="button" dialog-dismiss></obap-button>
            </obap-dialog>
        `);

        await nextFrame();
        const button = el.querySelector('obap-button');
        el.open();

        await nextFrame();
        expect(el.opened).to.equal(true);
        button.click();

        await nextFrame();
        expect(el.opened).to.equal(false);
    });

    it('can be confirmed', async () => {
        const el = await fixture(html`
            <obap-dialog modal>
                <obap-button label="button" dialog-confirm></obap-button>
            </obap-dialog>
        `);

        await nextFrame();
        const button = el.querySelector('obap-button');
        el.open();

        await nextFrame();
        expect(el.opened).to.equal(true);
        button.click();

        await nextFrame();
        expect(el.opened).to.equal(false);
    });

    it('can be dismissed by clicking outside if not modal, but not inside', async () => {
        const el = await fixture(html`
            <obap-dialog>
                <obap-button label="button"></obap-button>
            </obap-dialog>
        `);

        await nextFrame();
        const button = el.querySelector('obap-button');
        el.open();

        await nextFrame();
        expect(el.opened).to.equal(true);
        button.click();

        await nextFrame();
        expect(el.opened).to.equal(true);

        el.click();

        await nextFrame();
        expect(el.opened).to.equal(true);

        window.document.body.click();

        await nextFrame();
        expect(el.opened).to.equal(false);
    });

    it('cannot be dismissed by clicking outside if modal', async () => {
        const el = await fixture(html`
            <obap-dialog modal>
                <obap-button label="button"></obap-button>
            </obap-dialog>
        `);

        await nextFrame();
        const button = el.querySelector('obap-button');
        el.open();

        await nextFrame();
        expect(el.opened).to.equal(true);
        button.click();

        await nextFrame();
        expect(el.opened).to.equal(true);

        el.click();

        await nextFrame();
        expect(el.opened).to.equal(true);

        window.document.body.click();

        await nextFrame();
        expect(el.opened).to.equal(true);
    });

    
    it('can create child dialogs', async () => {
        const el = await fixture(html`
            <div>
                <obap-dialog id="one" modal>
                    <obap-button label="button"></obap-button>
                </obap-dialog>

                <obap-dialog id="two" modal>
                </obap-dialog>
            </div>
        `);

        let backdrop = null;

        await nextFrame();

        const button = el.querySelector('obap-button');
        const dlg1 = el.querySelector('#one');
        const dlg2 = el.querySelector('#two');

        expect(button).to.not.equal(null);
        expect(dlg1).to.not.equal(null);
        expect(dlg2).to.not.equal(null);

        dlg1.open();

        await nextFrame();

        expect(dlg1.opened).to.equal(true);
        expect(dlg2.opened).to.equal(false);

        dlg2.open();

        await nextFrame();

        expect(dlg1.opened).to.equal(true);
        expect(dlg2.opened).to.equal(true);

        dlg2.close();

        await nextFrame();

        expect(dlg1.opened).to.equal(true);
        expect(dlg2.opened).to.equal(false);

        dlg1.close();

        await nextFrame();

        expect(dlg1.opened).to.equal(false);
        expect(dlg2.opened).to.equal(false);
    });
    

    it('fires an event when opened is changed to true', async () => {
        const el = await fixture(html`
            <obap-dialog modal>
            </obap-dialog>
        `);

        await nextFrame();

        setTimeout(() => el.opened = true);
        const { detail } = await oneEvent(el, 'obap-dialog-opened-changed');
        await nextFrame();

        expect(detail).to.not.equal(null);
        expect(detail.opened).to.equal(true);
    });

    it('fires an event when opened is changed to false', async () => {
        const el = await fixture(html`
            <obap-dialog modal opened>
            </obap-dialog>
        `);

        await nextFrame();

        setTimeout(() => el.opened = false);
        const { detail } = await oneEvent(el, 'obap-dialog-opened-changed');
        await nextFrame();

        expect(detail).to.not.equal(null);
        expect(detail.opened).to.equal(false);
    });

    it('can be dismissed with the esc key', async () => {
        const el = await fixture(html`
            <obap-dialog modal>
            </obap-dialog>
        `);

        await nextFrame();
        el.open();

        await nextFrame();
        expect(el.opened).to.equal(true);

        window.dispatchEvent(new KeyboardEvent('keydown',{'key':'Escape'}));

        await nextFrame();
        expect(el.opened).to.equal(true);
    });

    it('cannot be dismissed with the esc key if "noCancelOnEscKey" is true', async () => {
        const el = await fixture(html`
            <obap-dialog modal no-cancel-on-esc-key>
            </obap-dialog>
        `);

        await nextFrame();
        el.open();

        await nextFrame();
        expect(el.opened).to.equal(true);

        window.dispatchEvent(new KeyboardEvent('keydown',{'key':'Escape'}));

        await nextFrame();
        expect(el.opened).to.equal(true);
    });

    it('is dismissed on navigation event', async () => {
        const el = await fixture(html`
            <obap-dialog modal>
            </obap-dialog>
        `);

        await nextFrame();
        el.open();

        await nextFrame();
        expect(el.opened).to.equal(true);

        el._handleOnPopStateEvent();

        await nextFrame();
        expect(el.opened).to.equal(false);
    });
});