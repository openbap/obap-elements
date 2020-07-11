/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../../src/obap-element/obap-element.js';
import '../../demo-mobile-app/demo-panel.js';
import '../../../src/obap-data-pager/obap-data-pager.js';

export class DemoDataPager extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: 100%;
                overflow: hidden;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                height: 100%;
                padding: 8px;
                box-sizing: border-box;
            }
        `];
    }

    render() {
        return html`
            <div class="container">
                <demo-panel>
                    <obap-data-pager count="255"></obap-data-pager>
                </demo-panel>
            </div>
        `;
    }
}

window.customElements.define('demo-data-pager', DemoDataPager);