/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../../src/obap-element/obap-element.js';
import '../../../src/obap-circular-progress/obap-circular-progress.js';
import '../../demo-mobile-app/demo-panel.js';

export class DemoProgressIndicatorsCircular extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                height: 100%;
                padding: 6px 8px 8px 8px;
                box-sizing: border-box;
            }

            .row {
                padding-top: 8px;
                display: flex;
                justify-content: space-between;
            }
        `];
    }

    render() {
        return html`
            <div class="container">
                <demo-panel>
                    <div class="row">
                        <demo-box label="Normal">
                            <obap-circular-progress value="70"></obap-circular-progress>
                        </demo-box>

                        <demo-box label="Secondary">
                            <obap-circular-progress value="50" secondary-value="70"></obap-circular-progress>
                        </demo-box>

                        <demo-box label="Disabled">
                            <obap-circular-progress disabled value="50" secondary-value="70"></obap-circular-progress>
                        </demo-box>

                        <demo-box label="Icon">
                            <obap-circular-progress value="70" icon="app:android"></obap-circular-progress>
                        </demo-box>

                        <demo-box label="Indeterminate">
                            <obap-circular-progress indeterminate></obap-circular-progress>
                        </demo-box>
                    </div>
                </demo-panel>
            </div>
        `;
    }
}

window.customElements.define('demo-progress-indicators-circular', DemoProgressIndicatorsCircular);