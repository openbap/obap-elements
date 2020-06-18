/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, oneEvent, nextFrame } from '@open-wc/testing';
import '../src/obap-stepper/obap-horizontal-stepper.js';

describe('obap-horizontal-stepper', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-horizontal-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one"></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two"></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" sub-label="step three"></obap-stepper-step>
            </obap-horizontal-stepper>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

    it('renders an error header if a step has an error', async () => {  
        const el = await fixture(html`
           <obap-horizontal-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one"></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two" error error-label="test error"></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" sub-label="step three"></obap-stepper-step>
            </obap-horizontal-stepper>
        `);

        await nextFrame();
        const errorBadge = el.renderRoot.querySelector('div.badge[error]');
        const errorLabels = el.renderRoot.querySelector('div.header-labels[error]');

        expect(errorBadge).to.not.equal(null);
        expect(errorLabels).to.not.equal(null);
    });

    it('renders the step index on the header badge', async () => {  
        const el = await fixture(html`
           <obap-horizontal-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one"></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two"></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" sub-label="step three"></obap-stepper-step>
            </obap-horizontal-stepper>
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
           <obap-horizontal-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one" editable></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two" optional></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" sub-label="step three"></obap-stepper-step>
            </obap-horizontal-stepper>
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
           <obap-horizontal-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one"></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two"></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" sub-label="step three"></obap-stepper-step>
            </obap-horizontal-stepper>
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
           <obap-horizontal-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one" error></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two" error error-label="test error"></obap-stepper-step>
            </obap-horizontal-stepper>
        `);

        await nextFrame();

        const errors = el.renderRoot.querySelectorAll('div.header-sub-label[error]');
        expect(errors.length).to.equal(2);
        expect(errors[0].innerText).to.equal('Error');
        expect(errors[1].innerText).to.equal('test error');
    });

    it('has action buttons', async () => {  
        const el = await fixture(html`
           <obap-horizontal-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one"></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two"></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" sub-label="step three"></obap-stepper-step>
            </obap-horizontal-stepper>
        `);

        await nextFrame();

        const buttons = el.renderRoot.querySelectorAll('obap-button');
        expect(buttons.length).to.equal(4);

        expect(buttons[0].label).to.equal(el.backText);
        expect(buttons[1].label).to.equal(el.cancelText);
        expect(buttons[2].label).to.equal(el.continueText);
        expect(buttons[3].label).to.equal(el.finishText);
    });

    it('can navigate via the back button', async () => {  
        const el = await fixture(html`
           <obap-horizontal-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one" editable></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two" editable></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" sub-label="step three" editable></obap-stepper-step>
            </obap-horizontal-stepper>
        `);

        await nextFrame();

        const buttons = el.renderRoot.querySelectorAll('obap-button');

        expect(buttons.length).to.equal(4);
        expect(buttons[0].disabled).to.equal(true);
        expect(el.selected).to.equal(0);
        el.nextStep();
        await nextFrame();

        expect(el.selected).to.equal(1);
        expect(buttons[0].disabled).to.equal(false);

        buttons[0].click();
        await nextFrame();

        expect(buttons[0].disabled).to.equal(true);
        expect(el.selected).to.equal(0);
    });

    it('can cancel via the cancel button', async () => {  
        const el = await fixture(html`
           <obap-horizontal-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one" editable></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two" editable></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" sub-label="step three" editable></obap-stepper-step>
            </obap-horizontal-stepper>
        `);

        await nextFrame();

        const buttons = el.renderRoot.querySelectorAll('obap-button');

        expect(buttons.length).to.equal(4);
        expect(buttons[0].disabled).to.equal(true);
        expect(el.selected).to.equal(0);
        el.nextStep();
        await nextFrame();

        el.nextStep();
        await nextFrame();

        expect(el.selected).to.equal(2);
        expect(buttons[0].disabled).to.equal(false);

        buttons[1].click();
        await nextFrame();

        expect(buttons[0].disabled).to.equal(true);
        expect(el.selected).to.equal(0);
    });

    it('can navigate via the next button', async () => {  
        const el = await fixture(html`
           <obap-horizontal-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one" editable></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two" editable></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" sub-label="step three" editable></obap-stepper-step>
            </obap-horizontal-stepper>
        `);

        await nextFrame();

        const buttons = el.renderRoot.querySelectorAll('obap-button');

        expect(buttons.length).to.equal(4);
        expect(buttons[2].disabled).to.equal(false);
        expect(el.selected).to.equal(0);

        buttons[2].click();
        await nextFrame();

        expect(el.selected).to.equal(1);
        expect(buttons[2].disabled).to.equal(false);

        buttons[2].click();
        await nextFrame();

        expect(el.selected).to.equal(2);
        expect(buttons[2].disabled).to.equal(true);
    });

    it('can finish via the finish button', async () => {  
        const el = await fixture(html`
           <obap-horizontal-stepper>
                <obap-stepper-step name="step-1" label="Step One" sub-label="step one"></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" sub-label="step two"></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" sub-label="step three"></obap-stepper-step>
            </obap-horizontal-stepper>
        `);

        await nextFrame();

        const buttons = el.renderRoot.querySelectorAll('obap-button');

        expect(buttons.length).to.equal(4);
        expect(buttons[3].disabled).to.equal(true);
        expect(el.selected).to.equal(0);

        el.nextStep();
        el.nextStep();
        await nextFrame();

        expect(buttons[3].disabled).to.equal(false);
        
        setTimeout(() => buttons[3].click());
        const { detail } = await oneEvent(el, 'obap-stepper-finish');
        await nextFrame();

        expect(detail).to.not.equal(null);
    });
});