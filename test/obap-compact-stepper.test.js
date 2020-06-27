/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect, nextFrame, oneEvent } from '@open-wc/testing';
import '../src/obap-stepper/obap-compact-stepper.js';

describe('obap-compact-stepper', () => {
    it('passes the a11y audit', async () => {
        const el = await fixture(html`
            <obap-compact-stepper></obap-compact-stepper>
        `);

        await expect(el).shadowDom.to.be.accessible();
    });

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
});