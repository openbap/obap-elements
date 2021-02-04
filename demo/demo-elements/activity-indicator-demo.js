/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-activity-indicator/obap-activity-indicator.js';

export class ActivityIndicatorDemo extends ObapElement {
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

            obap-activity-indicator {
                margin: 16px;
            }

            obap-activity-indicator[mini][activity-type="linear"] {
                width: 120px;
            }

            .custom {
                --obap-activity-indicator-color: red;
                --obap-activity-indicator-background-color: transparent;
                --obap-activity-indicator-track-color: aqua;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Normal</div>
                <div class="row">
                    <obap-activity-indicator></obap-activity-indicator>
                    <obap-activity-indicator activity-type="typing"></obap-activity-indicator>
                    <obap-activity-indicator activity-type="equalizer"></obap-activity-indicator>
                    <obap-activity-indicator activity-type="linear"></obap-activity-indicator>
                </div>

                <div class="title">Elevated</div>
                <div class="row">
                    <obap-activity-indicator elevation="2"></obap-activity-indicator>
                    <obap-activity-indicator activity-type="typing" elevation="2"></obap-activity-indicator>
                    <obap-activity-indicator activity-type="equalizer" elevation="2"></obap-activity-indicator>
                    <obap-activity-indicator activity-type="linear" elevation="2"></obap-activity-indicator>
                </div>

                <div class="title">Mini</div>
                <div class="row">
                    <obap-activity-indicator mini elevation="2"></obap-activity-indicator>
                    <obap-activity-indicator mini activity-type="typing" elevation="2"></obap-activity-indicator>
                    <obap-activity-indicator mini activity-type="equalizer" elevation="2"></obap-activity-indicator>
                    <obap-activity-indicator mini activity-type="linear" elevation="2"></obap-activity-indicator>
                </div>

                <div class="title">Custom</div>
                <div class="row">
                    <obap-activity-indicator class="custom"></obap-activity-indicator>
                    <obap-activity-indicator activity-type="typing" class="custom"></obap-activity-indicator>
                    <obap-activity-indicator activity-type="equalizer" class="custom"></obap-activity-indicator>
                    <obap-activity-indicator activity-type="linear" class="custom"></obap-activity-indicator>
                </div>
            </div>
        `;
    }
}

window.customElements.define('activity-indicator-demo', ActivityIndicatorDemo);