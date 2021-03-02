/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-input-outline/obap-input-outline.js';

export class InputOutlineDemo extends ObapElement {
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

            obap-input-outline {
                width: 200px;
                margin: 16px;
                --obap-input-outline-label-offset: 4px;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Outline Type</div>
                <div class="row">
                    <obap-input-outline label="none" type="none"></obap-input-outline>
                    <obap-input-outline label="underline" type="underline"></obap-input-outline>
                    <obap-input-outline label="outline" float type="outline"></obap-input-outline>
                    <obap-input-outline label="conventional" type="conventional"></obap-input-outline>
                </div>

                <div class="title">Label Style</div>
                <div class="row">
                    <obap-input-outline label="float" float type="outline"></obap-input-outline>
                    <obap-input-outline label="no float" no-float type="outline"></obap-input-outline>
                </div>
            </div>
        `;
    }
}

window.customElements.define('input-outline-demo', InputOutlineDemo);