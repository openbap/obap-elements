/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-select/obap-select.js';

export class SelectDemo extends ObapElement {
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
              align-items: flex-start;
              justify-content: flex-start;
            }

            obap-select {
                margin-bottom: 4px;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Demo</div>
                <div class="row">
                    <obap-select border-style="underline" filled></obap-select>
                    <obap-select border-style="outline"></obap-select>
                </div>
            </div>
        `;
    }
}

window.customElements.define('select-demo', SelectDemo);