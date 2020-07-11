/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../../src/obap-element/obap-element.js';
import '../../../src/obap-button/obap-button.js';
import '../../demo-mobile-app/demo-panel.js';

export class DemoButtonsFab extends ObapElement {
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
                    <obap-button round icon="app:android"></obap-button>
                    <obap-button round icon="app:android" outline></obap-button>
                    <obap-button round icon="app:polymer" raised></obap-button>
                    <obap-button round icon="app:styles" no-ink raised></obap-button>
                    <obap-button round icon="app:charts" toggle raised></obap-button>
                    <obap-button round icon="app:buttons" disabled raised></obap-button>
                </div>
            </demo-panel>

            <demo-panel>
                <div class="container">
                    <obap-button round label="Flat" icon="app:android"></obap-button>
                    <obap-button round label="Outline" icon="app:android" outline></obap-button>
                    <obap-button round label="Raised" icon="app:polymer" raised></obap-button>
                    <obap-button round label="No Ink" icon="app:styles" no-ink raised></obap-button>
                    <obap-button round label="Toggle" icon="app:charts" toggle raised></obap-button>
                    <obap-button round label="Disabled" icon="app:buttons" disabled raised></obap-button>
                </div>
            </demo-panel>
        `;
    }
}

window.customElements.define('demo-buttons-fab', DemoButtonsFab);