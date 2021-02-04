/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../../src/obap-element/obap-element.js';
import { caption, body } from '../../../src/obap-styles/obap-typography.js';
import '../../../src/obap-button/obap-button.js';
import '../../../src/obap-icon/obap-icon.js';
import '../../../src/obap-callout/obap-callout.js';
import '../../demo-mobile-app/demo-panel.js';

export class DemoCallouts extends ObapElement {
    static get styles() {
        return [caption, body, css`
            :host {
                display: block;
                position: relative;
                height: 100%;
                padding: 8px;
                box-sizing: border-box;
                overflow: hidden;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            demo-panel {
                margin-bottom: 8px;
            }

            demo-panel:last-of-type {
                margin-bottom: 0;
            }

            obap-button {
                --obap-button-ripple-color: var(--obap-on-primary-color);
                --obap-button-color: var(--obap-on-primary-color);
                --obap-button-background-color: var(--obap-primary-color);
            }

            .container {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                gap: 16px;
                justify-items: center;
                padding: 8px 8px 16px 8px;
            }

            .callout-content {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .offset {
                margin-bottom: 4px;
            }

            obap-callout.custom {
                --obap-callout-color: var(--obap-primary-color);
                --obap-callout-background-color: var(--obap-surface-color);
            }
        `];
    }

    render() {
        return html`
            <demo-panel label="Normal Style">
                <div class="container">
                    <obap-button raised label="Top" tabindex="0"></obap-button>
                    <obap-callout anchor="middle-top" arrow-position="bottom" offset-y="-2">
                        <div class="callout-content typography-body">
                            <div>callout</div>
                        </div>
                    </obap-callout>

                    <obap-button raised label="Left" tabindex="0"></obap-button>
                    <obap-callout anchor="middle-left" arrow-position="right" offset-x="-2">
                        <div class="callout-content typography-body">
                            <div>callout</div>
                        </div>
                    </obap-callout>

                    <obap-button raised label="Right" tabindex="0"></obap-button>
                    <obap-callout anchor="middle-right" arrow-position="left" offset-x="2">
                        <div class="callout-content typography-body">
                            <div>callout</div>
                        </div>
                    </obap-callout>

                    <obap-button raised label="Bottom" tabindex="0"></obap-button>
                    <obap-callout anchor="middle-bottom" arrow-position="top" offset-y="2">
                        <div class="callout-content typography-body">
                            <div>callout</div>
                        </div>
                    </obap-callout>
                </div>
            </demo-panel>

            <demo-panel label="Custom Styling">
                <div class="container">
                    <obap-button raised label="Elevated" tabindex="0"></obap-button>
                    <obap-callout anchor="middle-top" arrow-position="bottom" offset-y="-2" elevated>
                        <div class="callout-content typography-body">
                            <div>callout</div>
                        </div>
                    </obap-callout>

                    <obap-button raised label="Icon" tabindex="0"></obap-button>
                    <obap-callout anchor="middle-top" arrow-position="bottom" offset-y="-2" elevated>
                        <div class="callout-content typography-body">
                            <obap-icon icon="app:android"></obap-icon>
                        </div>
                    </obap-callout>

                    <obap-button raised label="Mixed" tabindex="0"></obap-button>
                    <obap-callout anchor="middle-top" arrow-position="bottom" offset-y="-2" elevated>
                        <div class="callout-content typography-body">
                            <obap-icon class="offset" icon="app:android"></obap-icon>
                            <div>callout</div>
                        </div>
                    </obap-callout>

                    <obap-button raised label="Color" tabindex="0"></obap-button>
                    <obap-callout class="custom" anchor="middle-top" arrow-position="bottom" offset-y="-2" elevated>
                        <div class="callout-content typography-body">
                            <obap-icon class="offset" icon="app:android"></obap-icon>
                            <div>callout</div>
                        </div>
                    </obap-callout>
                </div>
            </demo-panel>
        `;
    }
}

window.customElements.define('demo-callouts', DemoCallouts);