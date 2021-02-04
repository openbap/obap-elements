/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-tabs/obap-tabs.js';
import '../../src/obap-pages/obap-pages.js';
import '../../src/obap-material/obap-material.js';
import '../../src/obap-selector/obap-selector-container.js';
import '../../src/obap-stepper/obap-horizontal-stepper.js'; 
import '../../src/obap-stepper/obap-side-stepper.js'; 
import '../../src/obap-stepper/obap-compact-stepper.js'; 

export class StepperDemo extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: calc(100% + 16px);
                margin: -8px;
                box-sizing: border-box;
                background: var(--obap-window-color, #E0E0E0);
            }
    
            .container {
                height: 100%;
            }

            obap-selector-container {
                display: flex;
                flex-direction: column;
                height: 100%;
            }

            obap-pages {
                flex: 1;
            }

            obap-tabs {
                margin-bottom: 2px;
            }

            .page {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100%;
            }

            .page > * {
                height: 100%;
                width: 100%;
            }

            .step-content {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: var(--obap-text-secondary-color);
            }

            .summary {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background: lightyellow;
                color: var(--obap-text-secondary-color);
                padding: 56px;
            }

            .compact {
                width: 300px;
                height: 600px;
            }

            obap-compact-stepper {
                width: 100%;
                height: 100%;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <obap-selector-container selected-index="0">
                    <obap-tabs>
                        <obap-tab>Horizontal</obap-tab>
                        <obap-tab>Side</obap-tab>
                        <obap-tab>Compact</obap-tab>
                        <obap-tab>Vertical</obap-tab>
                    </obap-tabs>

                    <obap-pages>
                        <div class="page">
                            <obap-horizontal-stepper>${this._renderSteps()}</obap-horizontal-stepper>
                        </div>
                        <div class="page">
                            <obap-side-stepper>${this._renderSteps()}</obap-side-stepper>
                        </div>
                        <div class="page">
                            <obap-material class="compact" elevation="1">
                                <obap-compact-stepper>${this._renderSteps()}</obap-compact-stepper>
                            </obap-material>
                        </div>
                        <div class="page">Vertical</div>
                    </obap-pages>
                </obap-selector-container>
            </div>
        `;
    }

    _renderSteps() {
        return html`
            <div class="summary" slot="summary">Summary</div>
            <obap-stepper-step icon="android" name="select-campaign-settings" label="Select campaign settings" sub-label="Configure the campaign"><div class="step-content">Select campaign settings</div></obap-stepper-step>
            <obap-stepper-step icon="android" name="create-an-ad-group" label="Create an ad group" optional><div class="step-content">Create an ad group</div></obap-stepper-step>
            <obap-stepper-step error icon="android" name="create-an-ad" label="Create an ad" sub-label="Configure an ad from scratch" optional editable><div class="step-content">Create an ad</div></obap-stepper-step>
            <obap-stepper-step icon="android" name="schedule-campaign" label="Schedule campaign" sub-label="Set when the campaign runs" editable><div class="step-content">Schedule campaign</div></obap-stepper-step>
        `;
    }
}

window.customElements.define('stepper-demo', StepperDemo);