/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, oneEvent } from '@open-wc/testing';
import '../src/obap-stepper/obap-compact-stepper.js';

describe('obap-compact-stepper', () => {
    /*
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-compact-stepper></obap-compact-stepper>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });
    */

    it('can be created', async () => {     
        const el = await fixture(html`
            <obap-compact-stepper>
                <obap-stepper-step name="step-1" label="Step One"></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two"></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three"></obap-stepper-step>
            </obap-compact-stepper>
        `);

        await nextFrame();

        expect(el).to.not.equal(null);
        expect(el.steps.length).to.equal(3);
    });

    it('displays an error icon if the current step has an error', async () => {     
        const el = await fixture(html`
            <obap-compact-stepper>
                <obap-stepper-step name="step-1" label="Step One" error></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two"></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three"></obap-stepper-step>
            </obap-compact-stepper>
        `);

        await nextFrame();

        const error = el.renderRoot.querySelectorAll('obap-icon[icon="core:error"]');
        expect(error.length).to.equal(1);
    });

    it('has action buttons', async () => {  
        const el = await fixture(html`
            <obap-compact-stepper>
                <obap-stepper-step name="step-1" label="Step One"></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two"></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three"></obap-stepper-step>
            </obap-compact-stepper>
        `);

        await nextFrame();

        const buttons = el.renderRoot.querySelectorAll('obap-button');
        expect(buttons.length).to.equal(4);

        expect(buttons[0].icon).to.equal('core:cross');
        expect(buttons[1].icon).to.equal('core:chevron-left');
        expect(buttons[2].icon).to.equal('core:chevron-right');
        expect(buttons[3].icon).to.equal('core:check');
    });

    
    it('can navigate via the back button', async () => {  
        const el = await fixture(html`
            <obap-compact-stepper>
                <obap-stepper-step name="step-1" label="Step One" editable></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" editable></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" editable></obap-stepper-step>
            </obap-compact-stepper>
        `);

        await nextFrame();

        const buttons = el.renderRoot.querySelectorAll('obap-button');

        expect(buttons.length).to.equal(4);
        expect(buttons[1].disabled).to.equal(true);
        expect(el.selected).to.equal(0);
        el.nextStep();
        await nextFrame();

        expect(el.selected).to.equal(1);
        expect(buttons[1].disabled).to.equal(false);

        buttons[1].click();
        await nextFrame();

        expect(buttons[1].disabled).to.equal(true);
        expect(el.selected).to.equal(0);
    });

    it('can cancel via the cancel button', async () => {  
        const el = await fixture(html`
            <obap-compact-stepper>
                <obap-stepper-step name="step-1" label="Step One" editable></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" editable></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" editable></obap-stepper-step>
            </obap-compact-stepper>
        `);

        await nextFrame();

        const buttons = el.renderRoot.querySelectorAll('obap-button');

        expect(buttons.length).to.equal(4);
        expect(buttons[1].disabled).to.equal(true);
        expect(el.selected).to.equal(0);
        el.nextStep();
        await nextFrame();

        el.nextStep();
        await nextFrame();

        expect(el.selected).to.equal(2);
        expect(buttons[1].disabled).to.equal(false);

        buttons[0].click();
        await nextFrame();

        expect(buttons[1].disabled).to.equal(true);
        expect(el.selected).to.equal(0);
    });

    it('can navigate via the next button', async () => {  
        const el = await fixture(html`
            <obap-compact-stepper>
                <obap-stepper-step name="step-1" label="Step One" editable></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" editable></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" editable></obap-stepper-step>
            </obap-compact-stepper>
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
            <obap-compact-stepper>
                <obap-stepper-step name="step-1" label="Step One" editable></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step Two" editable></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step Three" editable></obap-stepper-step>
            </obap-compact-stepper>
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