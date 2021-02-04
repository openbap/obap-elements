/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-linear-progress/obap-linear-progress.js';

export class LinearProgressDemo extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
            }
    
            .container {
                height: 100%;
            }

            .title {
                padding: 4px 8px;
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
            }

            obap-linear-progress {
                margin: 32px 8px;
                width: 300px;
                box-sizing: border-box;
            }

            .row {
              padding: 0;
            }

            .custom-duration {
                --obap-linear-progress-indeterminate-duration: 5s;
            }

            .custom-colors {
                --obap-linear-progress-backround-color: aqua;
                --obap-linear-progress-primary-color: green;
                --obap-linear-progress-secondary-color: magenta;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Normal</div>
                <div class="row">
                    <obap-linear-progress value="33"></obap-linear-progress>
                </div>

                <div class="title">Indeterminate</div>
                <div class="row">
                    <obap-linear-progress indeterminate></obap-linear-progress>
                </div>

                <div class="title">Secondary Progress</div>
                <div class="row">
                    <obap-linear-progress value="30" secondary-value="50"></obap-linear-progress>
                </div>

                <div class="title">Disabled Normal</div>
                <div class="row">
                    <obap-linear-progress disabled value="30" secondary-value="50"></obap-linear-progress>
                </div>

                <div class="title">Disabled Indeterminate</div>
                <div class="row">
                    <obap-linear-progress disabled indeterminate></obap-linear-progress>
                </div>

                <div class="title">Custom Duration</div>
                <div class="row">
                    <obap-linear-progress class="custom-duration" indeterminate></obap-linear-progress>
                </div>

                <div class="title">Custom Colors</div>
                <div class="row">
                    <obap-linear-progress value="30" secondary-value="50" class="custom-colors"></obap-linear-progress>
                </div>
            </div>
        `;
    }
}

window.customElements.define('linear-progress-demo', LinearProgressDemo);