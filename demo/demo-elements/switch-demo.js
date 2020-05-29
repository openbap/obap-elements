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
              flex-direction: row;
              flex-wrap: wrap;
              align-items: center;
              padding: 0;
              margin-bottom: 8px;
            }

            obap-switch {
                margin-right: 16px;
                width: 56px;
            }

            

            .custom-colors {
                width: 64px;
                --obap-switch-checked-track-color: white;
                --obap-switch-checked-track-background-color: magenta;
                --obap-switch-unchecked-track-color: cornflowerblue;
                --obap-switch-unchecked-track-background-color: yellow;
                --obap-switch-checked-thumb-background-color: yellow;
                --obap-switch-unchecked-thumb-background-color: cornflowerblue;
            }

            .no-label {
                width: auto;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Normal Switches</div>
                <div class="row">
                    <obap-switch class="no-label"></obap-switch>
                    <obap-switch class="no-label" disabled checked></obap-switch>
                </div>


                <div class="title">Labeled Switches</div>
                <div class="row">
                    <obap-switch left-label="am" right-label="pm"></obap-switch>
                    <obap-switch left-label="yes" right-label="no"></obap-switch>
                    <obap-switch left-label="yes" right-label="no" disabled checked></obap-switch>
                </div>

                <div class="title">Custom Colors</div>
                <div class="row">
                    <obap-switch left-label="one" right-label="two" class="custom-colors"></obap-switch>
                    <obap-switch class="custom-colors no-label"></obap-switch>
                </div>
            </div>
        `;
    }
}

window.customElements.define('switch-demo', SwitchDemo);