/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../../src/obap-element/obap-element.js';
import '../../../src/obap-check/obap-check.js';
import '../../../src/obap-radio/obap-radio-group.js';
import '../../../src/obap-radio/obap-radio.js';
import '../../../src/obap-switch/obap-switch.js';
import '../../demo-mobile-app/demo-panel.js';

export class DemoSelection extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: 100%;
                padding: 8px;
                box-sizing: border-box;
                overflow: hidden;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            demo-panel {
                margin-bottom: 8px;
            }

            demo-panel:last-of-type {
                margin-bottom: 0;
            }

            obap-radio {
                margin-right: 16px;
            }

            obap-radio:last-of-type {
                margin-right: 0;
            }
            
            .container {
                height: 100%;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                margin-top: 4px;
            }
        `];
    }

    render() {
        return html`
            <demo-panel label="Check">
                <div class="container">
                    <obap-check label="unselected"></obap-check>
                    <obap-check label="selected" selected></obap-check>
                    <obap-check label="indeterminate" indeterminate></obap-check>
                    <obap-check label="disabled" selected disabled></obap-check>
                </div>
            </demo-panel>

            <demo-panel label="Radio">
                <div class="container">
                    <obap-radio-group selected-index="0">
                        <obap-radio label="One"></obap-radio>
                        <obap-radio label="Two"></obap-radio>
                        <obap-radio label="Three"></obap-radio>
                        <obap-radio label="Four"></obap-radio>
                    </obap-radio-group>
                </div>
            </demo-panel>

            <demo-panel label="Switch">
                <div class="container">
                    <obap-switch></obap-switch>
                    <obap-switch disabled checked></obap-switch>
                    <obap-switch left-label="am" right-label="pm"></obap-switch>
                    <obap-switch left-label="am" right-label="pm" disabled checked></obap-switch>
                </div>
            </demo-panel>
        `;
    }
}

window.customElements.define('demo-selection', DemoSelection);