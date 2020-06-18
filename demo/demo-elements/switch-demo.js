/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-switch/obap-switch.js';

export class SwitchDemo extends ObapElement {
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
                flex-direction: column;
                align-items:flex-start;
                padding: 0;
                margin-bottom: 8px;
            }

            obap-switch {
                margin-bottom: 16px;

            }

            .custom-colors {
                --obap-switch-label-color: cornflowerblue;
                --obap-switch-selected-label-color: yellow; 
                --obap-switch-track-color: yellow;
                --obap-switch-selected-track-color: cornflowerblue;
                --obap-switch-thumb-color: cornflowerblue;
                --obap-switch-selected-thumb-color: yellow;
            }

        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Normal Switches</div>
                <div class="row">
                    <obap-switch></obap-switch>
                    <obap-switch disabled checked></obap-switch>
                </div>


                <div class="title">Labeled Switches</div>
                <div class="row">
                    <obap-switch left-label="am" right-label="pm"></obap-switch>
                    <obap-switch left-label="yes" right-label="no"></obap-switch>
                    <obap-switch left-label="yes" right-label="no" disabled checked></obap-switch>
                </div>

                <div class="title">Custom Colors</div>
                <div class="row">
                    <obap-switch left-label="thing one" right-label="thing two" class="custom-colors"></obap-switch>
                    <obap-switch class="custom-colors"></obap-switch>
                </div>
            </div>
        `;
    }
}

window.customElements.define('switch-demo', SwitchDemo);