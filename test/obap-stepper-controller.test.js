/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { fixture, expect, nextFrame, defineCE, unsafeStatic, oneEvent } from '@open-wc/testing';
import { html, css, svg, ObapElement } from '../src/obap-element/obap-element.js';
import { ObapStepperController } from '../src/obap-stepper/obap-stepper-controller.js';
import '../src/obap-stepper/obap-stepper-step.js';

class TestStepper extends ObapStepperController(ObapElement) {
    render() {
        return html`<slot name="step"></slot>`;
    }
}

window.customElements.define('test-stepper', TestStepper);

class TestErrorStepper extends ObapStepperController(ObapElement) {
    render() {
        return html`<slot></slot>`;
    }
}

window.customElements.define('test-error-stepper', TestErrorStepper);

describe('obap-stepper-step', () => {
    it('sets the default properties', async () => {  
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step></obap-stepper-step>
                <obap-stepper-step></obap-stepper-step>
            </test-stepper>
        `);

        await nextFrame();
        const step = el.steps[1];

        expect(step).to.not.equal(null);

        expect(step.selected).to.equal(false);
        expect(step.visited).to.equal(false);
        expect(step.editable).to.equal(false);
        expect(step.optional).to.equal(false);
        expect(step.error).to.equal(false);
        expect(step.name).to.equal('');
        expect(step.label).to.equal('');
        expect(step.subLabel).to.equal('');
        expect(step.errorLabel).to.equal('');
        expect(step.icon).to.equal('');
        expect(step.slot).to.equal('step');
    });

    it('selects the first step by default', async () => {  
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step></obap-stepper-step>
                <obap-stepper-step></obap-stepper-step>
            </test-stepper>
        `);

        await nextFrame();
        const step0 = el.steps[0];
        const step1 = el.steps[1];

        expect(step0).to.not.equal(null);
        expect(step1).to.not.equal(null);

        expect(step0.selected).to.equal(true);
        expect(step0.visited).to.equal(true);

        expect(step1.selected).to.equal(false);
        expect(step1.visited).to.equal(false);
    });

    it('can select the next step', async () => {  
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step></obap-stepper-step>
                <obap-stepper-step></obap-stepper-step>
            </test-stepper>
        `);

        await nextFrame();
        const step0 = el.steps[0];
        const step1 = el.steps[1];

        expect(step1.selectable).to.equal(true);
    });

    it('cannot select visited step', async () => {  
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step></obap-stepper-step>
                <obap-stepper-step></obap-stepper-step>
            </test-stepper>
        `);

        await nextFrame();
        el.nextStep();
        await nextFrame();

        const step0 = el.steps[0];
        const step1 = el.steps[1];

        expect(step0.selectable).to.equal(false);
    });

    it('can select visited step if editable', async () => {  
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step editable></obap-stepper-step>
                <obap-stepper-step></obap-stepper-step>
            </test-stepper>
        `);

        await nextFrame();
        el.nextStep();
        await nextFrame();

        const step0 = el.steps[0];
        const step1 = el.steps[1];

        expect(step0.selectable).to.equal(true);
    });

    it('can select visited step if optional', async () => {  
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step optional></obap-stepper-step>
                <obap-stepper-step></obap-stepper-step>
            </test-stepper>
        `);

        await nextFrame();
        el.nextStep();
        await nextFrame();

        const step0 = el.steps[0];
        const step1 = el.steps[1];

        expect(step0.selectable).to.equal(true);
    });

    it('can select visited step if errored', async () => {  
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step></obap-stepper-step>
                <obap-stepper-step></obap-stepper-step>
            </test-stepper>
        `);

        await nextFrame();
        const step0 = el.steps[0];
        const step1 = el.steps[1];
        el.nextStep();
        await nextFrame();
        expect(step0.selectable).to.equal(false);
        step0.error = true;
        await nextFrame();
        expect(step0.selectable).to.equal(true);
    });
});

describe('obap-stepper-controller', () => {
    it('sets the default properties', async () => {  
        const el = await fixture(html`
            <test-stepper>
            </test-stepper>
        `);

        await nextFrame();

        expect(el.linear).to.equal(false);
        expect(el.canCancel).to.equal(true);
        expect(el.selected).to.equal(-1);
        expect(el.steps).to.not.equal(null);
        expect(el.steps.length).to.equal(0);
        expect(el.optionalText).to.equal('Optional');
        expect(el.backText).to.equal('Back');
        expect(el.cancelText).to.equal('Cancel');
        expect(el.continueText).to.equal('Continue');
        expect(el.finishText).to.equal('Finish');
        expect(el.errorText).to.equal('Error');
        expect(el.summaryPosition).to.equal('top');
    });

    it('sets the steps', async () => {  
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step name="step-1" label="Step 1" sub-label="step 1"><div class="step-content">Step 1</div></obap-stepper-step>
                <obap-stepper-step name="step-2" label="Step 2" sub-label="step 2"><div class="step-content">Step 2</div></obap-stepper-step>
                <obap-stepper-step name="step-3" label="Step 3" sub-label="step 3"><div class="step-content">Step 3</div></obap-stepper-step>
            </test-stepper>
        `);

        await nextFrame();

        expect(el.steps.length).to.equal(3);
    });

    it('does not throw an exception if a step slot is not defined', async () => { 
        const el = await fixture(html`
            <test-error-stepper>
                <obap-stepper-step></obap-stepper-step>
                <obap-stepper-step></obap-stepper-step>
            </test-error-stepper>
        `);

        await nextFrame();

        expect(el).to.not.equal(null);
        expect(el.steps.length).to.equal(0);
    });

    it('does not throw an exception if no steps are defined', async () => {  
        const el = await fixture(html`
            <test-stepper>
            </test-stepper>
        `);

        await nextFrame();

        expect(el).to.not.equal(null);
        expect(el.steps.length).to.equal(0);
    });

    it('allows steps to be removed', async () => {
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step></obap-stepper-step>
            </test-stepper>
        `);

        await nextFrame();
        expect(el.steps.length).to.equal(1);
        el.removeChild(el.steps[0]);
        await nextFrame();
        expect(el.steps.length).to.equal(0);
    });

    it('disables steps if disabled', async () => {
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step></obap-stepper-step>
                <obap-stepper-step></obap-stepper-step>
            </test-stepper>
        `);

        await nextFrame();
        const step0 = el.steps[0];
        const step1 = el.steps[1];

        expect(step0.disabled).to.equal(false);
        expect(step1.disabled).to.equal(false);

        el.disabled = true;
        await nextFrame();

        expect(step0.disabled).to.equal(true);
        expect(step1.disabled).to.equal(true);

        el.disabled = false;
        await nextFrame();

        expect(step0.disabled).to.equal(false);
        expect(step1.disabled).to.equal(false);
    });

    it('gets a step from an index', async () => {
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step name="one"></obap-stepper-step>
                <obap-stepper-step name="two"></obap-stepper-step>
            </test-stepper>
        `);

        await nextFrame();
        const step0 = el.getStep(0);
        const step1 = el.getStep(1);
        const step2 = el.getStep(2);

        expect(step0).to.not.equal(null);
        expect(step1).to.not.equal(null);
        expect(step2).to.equal(null);

        expect(step0.name).to.equal('one');
        expect(step1.name).to.equal('two');
    });

    it('sets a step from an index', async () => {
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step name="one"></obap-stepper-step>
                <obap-stepper-step name="two"></obap-stepper-step>
                <obap-stepper-step name="three"></obap-stepper-step>
                <obap-stepper-step name="four"></obap-stepper-step>
                <obap-stepper-step name="five"></obap-stepper-step>
            </test-stepper>
        `);

        await nextFrame();
        expect(el.selected).to.equal(0);

        el.setStep(0);
        await nextFrame();
        expect(el.selected).to.equal(0);

        el.setStep(1);
        await nextFrame();
        expect(el.selected).to.equal(1);
    });

    it('can abort setting a step', async () => {
        const el = await fixture(html`
            <test-stepper linear @obap-stepper-step-can-change="${(e) => { 
                    if (e.detail.newStepIndex === 2) e.preventDefault();
                }
            }">
                <obap-stepper-step name="one"></obap-stepper-step>
                <obap-stepper-step name="two"></obap-stepper-step>
                <obap-stepper-step name="three"></obap-stepper-step>
                <obap-stepper-step name="four"></obap-stepper-step>
                <obap-stepper-step name="five"></obap-stepper-step>
            </test-stepper>
        `);

        await nextFrame();
        expect(el.selected).to.equal(0);

        el.setStep(2);
        await nextFrame();
        expect(el.selected).to.equal(0);
    });

    it('fires event on step change', async () => {
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step name="one"></obap-stepper-step>
                <obap-stepper-step name="two"></obap-stepper-step>
                <obap-stepper-step name="three"></obap-stepper-step>
                <obap-stepper-step name="four"></obap-stepper-step>
                <obap-stepper-step name="five"></obap-stepper-step>
            </test-stepper>
        `);

        await nextFrame();
        setTimeout(() => el.setStep(1));

        const { detail } = await oneEvent(el, 'obap-stepper-step-change');
        await nextFrame();
        expect(el.selected).to.equal(1);
        expect(detail).to.not.equal(null);
        expect(detail.newStepIndex).to.equal(1);
        expect(detail.newStepName).to.equal('two');
    });

    it('does not error if "nextStep" or "previousStep" are called if there are no steps', async () => {
        const el = await fixture(html`
            <test-stepper>
            </test-stepper>
        `);

        await nextFrame();
        expect(el.selected).to.equal(-1);
        el.nextStep();
        expect(el.selected).to.equal(-1);
        el.previousStep();
        expect(el.selected).to.equal(-1);
    });

    it('skips inaccessible steps on "nextStep"', async () => {
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step name="one"></obap-stepper-step>
                <obap-stepper-step name="two"></obap-stepper-step>
                <obap-stepper-step name="three"></obap-stepper-step>
            </test-stepper>
        `);

        await nextFrame();
        el.setStep(1);
        el.setStep(0);
        el.nextStep();

        await nextFrame();
        expect(el.selected).to.equal(2);
        el.steps[1].optional = true;
        el.setStep(1);
        el.nextStep();
        expect(el.selected).to.equal(1);
    });
 
    it('skips inaccessible steps on "previousStep"', async () => {
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step name="one"></obap-stepper-step>
                <obap-stepper-step name="two"></obap-stepper-step>
                <obap-stepper-step name="three"></obap-stepper-step>
                <obap-stepper-step name="four"></obap-stepper-step>
            </test-stepper>
        `);

        await nextFrame();
        el.setStep(2);
        el.nextStep();

        expect(el.selected).to.equal(3);
        el.previousStep();
        expect(el.selected).to.equal(1);

        el.setStep(1);
        el.previousStep();
        expect(el.selected).to.equal(1);
    });

    it('resets and fires event on cancel', async () => {
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step name="one"></obap-stepper-step>
                <obap-stepper-step name="two"></obap-stepper-step>
                <obap-stepper-step name="three" error></obap-stepper-step>
            </test-stepper>
        `);

        await nextFrame();
        const step0 = el.getStep(0);
        const step1 = el.getStep(1);
        const step2 = el.getStep(2);

        el.setStep(1);
        el.setStep(2);

        expect(step0.visited).to.equal(true);
        expect(step1.visited).to.equal(true);
        expect(step2.visited).to.equal(true);
        expect(step2.error).to.equal(true);

        setTimeout(() => el.cancel());

        const { detail } = await oneEvent(el, 'obap-stepper-cancel');
        await nextFrame();

        expect(detail).to.not.equal(null);
        expect(step0.visited).to.equal(true);
        expect(step1.visited).to.equal(false);
        expect(step2.visited).to.equal(false);
        expect(step2.error).to.equal(false);
    });

    it('can finish when all steps are visited', async () => {
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step name="one"></obap-stepper-step>
                <obap-stepper-step name="two"></obap-stepper-step>
                <obap-stepper-step name="three"></obap-stepper-step>
            </test-stepper>
        `);

        expect(el.selected).to.equal(0);
        expect(el.canFinish()).to.equal(false);

        el.nextStep();
        expect(el.selected).to.equal(1);
        expect(el.canFinish()).to.equal(false);

        el.nextStep();
        expect(el.selected).to.equal(2);
        expect(el.canFinish()).to.equal(true);
    });

    it('can finish when all non-optional steps are visited', async () => {
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step name="one"></obap-stepper-step>
                <obap-stepper-step name="two"></obap-stepper-step>
                <obap-stepper-step name="three" optional></obap-stepper-step>
            </test-stepper>
        `);

        expect(el.selected).to.equal(0);
        expect(el.canFinish()).to.equal(false);

        el.nextStep();
        expect(el.selected).to.equal(1);
        expect(el.canFinish()).to.equal(true);
    });

    it('cannot finish when all steps are visited and there is an error', async () => {
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step name="one"></obap-stepper-step>
                <obap-stepper-step name="two"></obap-stepper-step>
                <obap-stepper-step name="three"></obap-stepper-step>
            </test-stepper>
        `);

        expect(el.selected).to.equal(0);
        expect(el.canFinish()).to.equal(false);

        el.nextStep();
        expect(el.selected).to.equal(1);
        expect(el.canFinish()).to.equal(false);

        el.nextStep();
        expect(el.selected).to.equal(2);
        expect(el.canFinish()).to.equal(true);

        el.steps[1].error = true;
        expect(el.canFinish()).to.equal(false);
    });

    it('returns the correct value from "finish()"', async () => {
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step name="one"></obap-stepper-step>
                <obap-stepper-step name="two" error></obap-stepper-step>
                <obap-stepper-step name="three"></obap-stepper-step>
            </test-stepper>
        `);

        el.nextStep();
        el.nextStep();
        expect(el.finish()).to.equal(false);

        el.steps[1].error = false;
        expect(el.finish()).to.equal(true);
    });

    it('fires an event from "finish()"', async () => {
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step name="one"></obap-stepper-step>
                <obap-stepper-step name="two"></obap-stepper-step>
                <obap-stepper-step name="three"></obap-stepper-step>
            </test-stepper>
        `);

        el.nextStep();
        el.nextStep();

        setTimeout(() => el.finish());
        const { detail } = await oneEvent(el, 'obap-stepper-finish');
        await nextFrame();

        expect(detail).to.not.equal(null);
    });

    it('correctly determines if it can move back a step', async () => {
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step name="one"></obap-stepper-step>
                <obap-stepper-step name="two"></obap-stepper-step>
                <obap-stepper-step name="three"></obap-stepper-step>
            </test-stepper>
        `);

        expect(el.canMoveBack()).to.equal(false);
        el.nextStep();
        expect(el.canMoveBack()).to.equal(false);

        el.steps[0].optional = true;
        expect(el.canMoveBack()).to.equal(true);
    });

    it('correctly determines if it can move forward a step', async () => {
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step name="one" optional></obap-stepper-step>
                <obap-stepper-step name="two"></obap-stepper-step>
                <obap-stepper-step name="three"></obap-stepper-step>
            </test-stepper>
        `);

        expect(el.canMoveForward()).to.equal(true);
        el.nextStep();
        expect(el.canMoveForward()).to.equal(true);
        el.nextStep();
        expect(el.canMoveForward()).to.equal(false);
        
        el.setStep(0);
        expect(el.canMoveForward()).to.equal(false);
        expect(el.selected).to.equal(0);
        
        el.steps[2].optional = true;
        expect(el.canMoveForward()).to.equal(true);
    });

    it('determines if steps have custom icons', async () => {
        const el = await fixture(html`
            <test-stepper>
                <obap-stepper-step name="one" icon="android"></obap-stepper-step>
                <obap-stepper-step name="two" icon="android"></obap-stepper-step>
                <obap-stepper-step name="three" icon="android"></obap-stepper-step>
            </test-stepper>
        `);

        expect(el.hasCustomIcons).to.equal(true);
    });
});