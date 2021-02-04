/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-circular-progress/obap-circular-progress.js';

export class CircularProgressDemo extends ObapElement {
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

            .row {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              align-items: center;
              padding: 0;
            }

            obap-circular-progress {
                margin: 24px;
            }

            .custom-duration {
                --obap-circular-progress-indeterminate-duration: 5s;
            }

            .custom-colors {
                --obap-circular-progress-size: 72px;
                --obap-circular-progress-stroke-width: 16px;
                --obap-circular-progress-backround-color: aqua;
                --obap-circular-progress-primary-color: green;
                --obap-circular-progress-secondary-color: magenta;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Normal</div>
                <div class="row">
                    <obap-circular-progress value="33"></obap-circular-progress>
                </div>

                <div class="title">Icon</div>
                <div class="row">
                    <obap-circular-progress indeterminate icon="settings"></obap-circular-progress>
                </div>

                <div class="title">Indeterminate</div>
                <div class="row">
                    <obap-circular-progress indeterminate></obap-circular-progress>
                </div>

                <div class="title">Secondary Progress</div>
                <div class="row">
                    <obap-circular-progress value="30" secondary-value="50"></obap-circular-progress>
                </div>

                <div class="title">Disabled Normal</div>
                <div class="row">
                    <obap-circular-progress disabled value="30" secondary-value="50"></obap-circular-progress>
                </div>

                <div class="title">Custom Duration</div>
                <div class="row">
                    <obap-circular-progress class="custom-duration" indeterminate></obap-circular-progress>
                </div>

                <div class="title">Custom Colors and Size</div>
                <div class="row">
                    <obap-circular-progress value="30" secondary-value="50" class="custom-colors" icon="settings"></obap-circular-progress>
                </div>
            </div>
        `;
    }
}

window.customElements.define('circular-progress-demo', CircularProgressDemo);