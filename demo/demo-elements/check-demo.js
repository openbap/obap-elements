/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-check/obap-check.js';

export class CheckDemo extends ObapElement {
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

            obap-check {
                margin: 16px;
            }

            .red {
                --obap-check-selected-color: red;
                --obap-check-indeterminate-color: red;
                --obap-check-unselected-color: red;
                --obap-check-ripple-color: magenta;
            }

            .green {
                --obap-check-selected-color: green;
                --obap-check-indeterminate-color: green;
                --obap-check-unselected-color: green;
                --obap-check-ripple-color: green;
            }

            .magenta {
                --obap-check-selected-color: magenta;
                --obap-check-indeterminate-color: magenta;
                --obap-check-unselected-color: green;
                --obap-check-ripple-color: green;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Normal Checkboxes</div>
                <div class="row">
                    <obap-check label="unselected"></obap-check>
                    <obap-check label="selected" selected></obap-check>
                    <obap-check label="indeterminate" indeterminate></obap-check>
                </div>

                <div class="title">Disabled Checkboxes</div>
                <div class="row">
                    <obap-check label="unselected" disabled></obap-check>
                    <obap-check label="selected" selected disabled></obap-check>
                    <obap-check label="indeterminate" indeterminate disabled></obap-check>
                </div>

                <div class="title">Custom Colors</div>
                <div class="row">
                    <obap-check class="red" label="unselected"></obap-check>
                    <obap-check class="green" label="selected" selected></obap-check>
                    <obap-check class="magenta" label="indeterminate" indeterminate></obap-check>
                </div>
            </div>
        `;
    }
}

window.customElements.define('check-demo', CheckDemo);