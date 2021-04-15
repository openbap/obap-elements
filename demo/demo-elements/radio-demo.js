/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-radio/obap-radio-group.js';
import '../../src/obap-radio/obap-radio.js'; 

export class RadioDemo extends ObapElement {
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
                margin-bottom: 8px;
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

            obap-radio {
                margin: 16px;
            }

            .red {
                --obap-radio-selected-color: red;
                --obap-radio-ripple-color: red;
            }

            .green {
                --obap-radio-selected-color: green;
                --obap-radio-ripple-color: green;
            }

            .magenta {
                --obap-radio-selected-color: magenta;
                --obap-radio-ripple-color: magenta;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Normal Radio Buttons</div>
                <div class="row">
                    <obap-radio-group selected-index="0"> 
                        <obap-radio label="One"></obap-radio>
                        <obap-radio label="Two"></obap-radio>
                        <obap-radio label="Three"></obap-radio>
                    </obap-radio-group>
                </div>

                <div class="title">Disabled Radio Buttons</div>
                <div class="row">
                    <obap-radio-group selected-index="0" disabled>
                        <obap-radio label="One"></obap-radio>
                        <obap-radio label="Two"></obap-radio>
                        <obap-radio label="Three"></obap-radio>
                    </obap-radio-group>
                </div>

                <div class="title">Custom Radio Buttons</div>
                <div class="row">
                    <obap-radio-group selected-index="0">
                        <obap-radio class="red" label="One"></obap-radio>
                        <obap-radio class="green" label="Two"></obap-radio>
                        <obap-radio class="magenta" label="Three"></obap-radio>
                    </obap-radio-group>
                </div>
            </div>
        `;
    }
}

window.customElements.define('radio-demo', RadioDemo);