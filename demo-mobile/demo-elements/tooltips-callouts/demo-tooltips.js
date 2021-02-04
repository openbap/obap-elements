/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../../src/obap-element/obap-element.js';
import '../../../src/obap-button/obap-button.js';
import '../../../src/obap-tooltip/obap-tooltip.js';
import '../../demo-mobile-app/demo-panel.js';

export class DemoTooltips extends ObapElement {
    static get styles() {
        return [css`
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
                padding: 8px 8px 24px 8px;
            }

            .tooltip-1 {
                --obap-tooltip-color: white;
                --obap-tooltip-background-color: cornflowerblue;
            }

            .tooltip-2 {
                --obap-tooltip-color: orange;
                --obap-tooltip-background-color: purple;
            }

            .tooltip-3 {
                --obap-tooltip-color: yellow;
                --obap-tooltip-background-color: black;
            }

            .tooltip-4 {
                --obap-tooltip-color: red;
                --obap-tooltip-background-color: silver;
            }
        `];
    }

    render() {
        return html`
            <demo-panel label="Normal Style">
                <div class="container">
                    <obap-button raised label="Bottom" tabindex="0"></obap-button>
                    <obap-tooltip anchor="middle-bottom" offset-y="4">tooltip</obap-tooltip>

                    <obap-button raised label="Left" tabindex="0"></obap-button>
                    <obap-tooltip anchor="middle-left" offset-x="-4">tooltip</obap-tooltip>

                    <obap-button raised label="Right" tabindex="0"></obap-button>
                    <obap-tooltip anchor="middle-right" offset-x="4">tooltip</obap-tooltip>

                    <obap-button raised label="Top" tabindex="0"></obap-button>
                    <obap-tooltip anchor="middle-top" offset-y="-4">tooltip</obap-tooltip>
                </div>
            </demo-panel>

            <demo-panel label="Custom Styling">
                <div class="container">
                    <obap-button raised label="Button" tabindex="0"></obap-button>
                    <obap-tooltip class="tooltip-1" anchor="middle-bottom" offset-y="4">tooltip</obap-tooltip>

                    <obap-button raised label="Button" tabindex="0"></obap-button>
                    <obap-tooltip class="tooltip-2" anchor="middle-bottom" offset-y="4">tooltip</obap-tooltip>

                    <obap-button raised label="Button" tabindex="0"></obap-button>
                    <obap-tooltip class="tooltip-3" anchor="middle-bottom" offset-y="4">tooltip</obap-tooltip>

                    <obap-button raised label="Button" tabindex="0"></obap-button>
                    <obap-tooltip class="tooltip-4" anchor="middle-bottom" offset-y="4">tooltip</obap-tooltip>
                </div>
            </demo-panel>
        `;
    }
}

window.customElements.define('demo-tooltips', DemoTooltips);