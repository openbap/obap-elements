/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-status-label/obap-status-label.js';

export class StatusLabelDemo extends ObapElement {
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

            obap-status-label {
                margin-right: 8px;
                color: white;
            }

            obap-status-label[label="small"] {
                background: #EC407A;
            }

            obap-status-label[label="medium"] {
                background:#1E88E5;
            }

            obap-status-label[label="large"] {
                background:#43A047;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Demo</div>
                <div class="row">
                    <obap-status-label label="small"></obap-status-label>
                    <obap-status-label label="medium"></obap-status-label>
                    <obap-status-label label="large"></obap-status-label>
                </div>
            </div>
        `;
    }
}

window.customElements.define('status-label-demo', StatusLabelDemo);