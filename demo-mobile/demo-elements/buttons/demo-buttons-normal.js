/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../../src/obap-element/obap-element.js';
import '../../../src/obap-button/obap-button.js';
import '../../demo-mobile-app/demo-panel.js';

export class DemoButtonsNormal extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: 100%;
                padding: 6px 8px 8px 8px;
                box-sizing: border-box;
                overflow: hidden;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                grid-auto-rows: auto;
                grid-row-gap: 16px;
                grid-column-gap: 8px;
                justify-items: left;
            }

            demo-panel {
                margin-bottom: 8px;
            }

            demo-panel:last-of-type {
                margin-bottom: 0;
            }
        `];
    }

    render() {
        return html`
            <demo-panel>
                <div class="container">
                    <obap-button label="Flat"></obap-button>
                    <obap-button label="Outline" outline></obap-button>
                    <obap-button label="Raised" raised></obap-button>
                    <obap-button label="No Ink" no-ink raised></obap-button>
                    <obap-button label="Toggle" toggle raised></obap-button>
                    <obap-button label="Disabled" disabled raised></obap-button>
                </div>
            </demo-panel>

            <demo-panel>
                <div class="container">
                    <obap-button label="Flat" icon="app:android"></obap-button>
                    <obap-button label="Outline" icon="app:android" outline></obap-button>
                    <obap-button label="Raised" icon="app:polymer" raised></obap-button>
                    <obap-button label="No Ink" icon="app:styles" no-ink raised></obap-button>
                    <obap-button label="Toggle" icon="app:charts" toggle raised></obap-button>
                    <obap-button label="Disabled" icon="app:buttons" disabled raised></obap-button>
                </div>
            </demo-panel>
        `;
    }
}

window.customElements.define('demo-buttons-normal', DemoButtonsNormal);