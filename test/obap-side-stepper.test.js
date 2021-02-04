/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, oneEvent, nextFrame } from '@open-wc/testing';
import '../src/obap-stepper/obap-side-stepper.js';
import '../src/obap-icons/obap-standard-icons.js';

describe('obap-side-stepper', () => {
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-side-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one"></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two"></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" sub-label="step three"></obap-stepper-step>
            </obap-side-stepper>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

    it('renders an error header if a step has an error', async () => {  
        const el = await fixture(html`
           <obap-side-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one"></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two" error error-label="test error"></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" sub-label="step three"></obap-stepper-step>
            </obap-side-stepper>
        `);

        await nextFrame();
        const errorBadge = el.renderRoot.querySelector('div.badge[error]');
        const errorLabels = el.renderRoot.querySelector('div.header-labels[error]');

        expect(errorBadge).to.not.equal(null);
        expect(errorLabels).to.not.equal(null);
    });

    it('renders the step index on the header badge', async () => {  
        const el = await fixture(html`
           <obap-side-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one"></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two"></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" sub-label="step three"></obap-stepper-step>
            </obap-side-stepper>
        `);

        await nextFrame();
        const badges = el.renderRoot.querySelectorAll('div.badge');
        
        expect(badges.length).to.equal(3);
        expect(badges[0].innerText).to.equal('1');
        expect(badges[1].innerText).to.equal('2');
        expect(badges[2].innerText).to.equal('3');
    });

    it('renders an edit icon on the header badge', async () => {  
        const el = await fixture(html`
           <obap-side-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one" editable></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two" optional></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" sub-label="step three"></obap-stepper-step>
            </obap-side-stepper>
        `);

        await nextFrame();
        el.nextStep();
        el.nextStep();
        await nextFrame();

        const badges = el.renderRoot.querySelectorAll('obap-icon[icon="core:edit"]');
        expect(badges.length).to.equal(2);
    });

    it('renders an check icon on the header badge', async () => {  
        const el = await fixture(html`
           <obap-side-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one"></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two"></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" sub-label="step three"></obap-stepper-step>
            </obap-side-stepper>
        `);

        await nextFrame();
        el.nextStep();
        el.nextStep();
        await nextFrame();

        const badges = el.renderRoot.querySelectorAll('obap-icon[icon="core:check"]');
        expect(badges.length).to.equal(2);
    });

    it('displays a custom error label', async () => {  
        const el = await fixture(html`
           <obap-side-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one" error></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two" error error-label="test error"></obap-stepper-step>
            </obap-side-stepper>
        `);

        await nextFrame();

        const errors = el.renderRoot.querySelectorAll('div.header-sub-label[error]');
        expect(errors.length).to.equal(2);
        expect(errors[0].innerText).to.equal('Error');
        expect(errors[1].innerText).to.equal('test error');
    });

    it('has action buttons', async () => {  
        const el = await fixture(html`
           <obap-side-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one"></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two"></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" sub-label="step three"></obap-stepper-step>
            </obap-side-stepper>
        `);

        await nextFrame();

        const buttons = el.renderRoot.querySelectorAll('obap-button');
        expect(buttons.length).to.equal(4);

        expect(buttons[0].getAttribute('label')).to.equal(el.backText);
        expect(buttons[1].getAttribute('label')).to.equal(el.cancelText);
        expect(buttons[2].getAttribute('label')).to.equal(el.continueText);
        expect(buttons[3].getAttribute('label')).to.equal(el.finishText);
    });

    it('can navigate via the back button', async () => {  
        const el = await fixture(html`
           <obap-side-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one" editable></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two" editable></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" sub-label="step three" editable></obap-stepper-step>
            </obap-side-stepper>
        `);

        await nextFrame();

        const buttons = el.renderRoot.querySelectorAll('obap-button');

        expect(buttons.length).to.equal(4);
        expect(buttons[0].hasAttribute('disabled')).to.equal(true);
        expect(el.selected).to.equal(0);
        el.nextStep();
        await nextFrame();

        expect(el.selected).to.equal(1);
        expect(buttons[0].hasAttribute('disabled')).to.equal(false);

        buttons[0].click();
        await nextFrame();

        expect(buttons[0].hasAttribute('disabled')).to.equal(true);
        expect(el.selected).to.equal(0);
    });

    it('can cancel via the cancel button', async () => {  
        const el = await fixture(html`
           <obap-side-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one" editable></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two" editable></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" sub-label="step three" editable></obap-stepper-step>
            </obap-side-stepper>
        `);

        await nextFrame();

        const buttons = el.renderRoot.querySelectorAll('obap-button');

        expect(buttons.length).to.equal(4);
        expect(buttons[0].hasAttribute('disabled')).to.equal(true);
        expect(el.selected).to.equal(0);
        el.nextStep();
        await nextFrame();

        el.nextStep();
        await nextFrame();

        expect(el.selected).to.equal(2);
        expect(buttons[0].hasAttribute('disabled')).to.equal(false);

        buttons[1].click();
        await nextFrame();

        expect(buttons[0].hasAttribute('disabled')).to.equal(true);
        expect(el.selected).to.equal(0);
    });

    it('can navigate via the next button', async () => {  
        const el = await fixture(html`
           <obap-side-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one" editable></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two" editable></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" sub-label="step three" editable></obap-stepper-step>
            </obap-side-stepper>
        `);

        await nextFrame();

        const buttons = el.renderRoot.querySelectorAll('obap-button');

        expect(buttons.length).to.equal(4);
        expect(buttons[2].hasAttribute('disabled')).to.equal(false);
        expect(el.selected).to.equal(0);

        buttons[2].click();
        await nextFrame();

        expect(el.selected).to.equal(1);
        expect(buttons[2].hasAttribute('disabled')).to.equal(false);

        buttons[2].click();
        await nextFrame();

        expect(el.selected).to.equal(2);
        expect(buttons[2].hasAttribute('disabled')).to.equal(true);
    });

    it('can finish via the finish button', async () => {  
        const el = await fixture(html`
           <obap-side-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one"></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two"></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" sub-label="step three"></obap-stepper-step>
            </obap-side-stepper>
        `);

        await nextFrame();

        const buttons = el.renderRoot.querySelectorAll('obap-button');

        expect(buttons.length).to.equal(4);
        expect(buttons[3].hasAttribute('disabled')).to.equal(true);
        expect(el.selected).to.equal(0);

        el.nextStep();
        el.nextStep();
        await nextFrame();

        expect(buttons[3].hasAttribute('disabled')).to.equal(false);
        
        setTimeout(() => buttons[3].click());
        const { detail } = await oneEvent(el, 'obap-stepper-finish');
        await nextFrame();

        expect(detail).to.not.equal(null);
    });

    it('creates custom icons, if specified', async () => {  
        const el = await fixture(html`
           <obap-side-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one" icon="android"></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two" icon="face"></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" sub-label="step three" icon="bug-report"></obap-stepper-step>
            </obap-side-stepper>
        `);

        await nextFrame();

        expect(el.hasCustomIcons).to.equal(true);
    });

    it('creates badges if custom icons are specified', async () => {  
        const el = await fixture(html`
           <obap-side-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one" icon="android" error></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two" icon="face" editable></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" sub-label="step three" icon="bug-report" optional></obap-stepper-step>
                <obap-stepper-step name="step-4" label="Step Four" sub-label="step four" icon="bug-report"></obap-stepper-step>
                <obap-stepper-step name="step-5" label="Step Five" sub-label="step five" icon="bug-report"></obap-stepper-step>
            </obap-side-stepper>
        `);

        await nextFrame();
        el.nextStep();
        el.nextStep();
        el.nextStep();
        el.nextStep();
        await nextFrame();

        const badges = el.renderRoot.querySelectorAll('obap-badge');

        expect(badges.length).to.equal(5);
        expect(badges[0].label).to.equal('!');
        expect(badges[1].icon).to.equal('core:edit');
        expect(badges[2].icon).to.equal('core:edit');
        expect(badges[3].icon).to.equal('core:check');
        expect(badges[4].label).to.equal('5');
    });
});