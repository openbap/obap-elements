/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-tooltip/obap-tooltip.js';
import '../../src/obap-button/obap-button.js';

export class TooltipDemo extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
            }
    
            .container {
                height: 100%;
                position: relative;
            }

            .title {
                padding: 4px 8px;
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
            }

            .row {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              align-items: center;
              padding: 16px;
            }

            .button {
                margin: 8px 32px 8px 0;
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

            .dodgy-tooltip {
                --obap-tooltip-color: white;
                --obap-tooltip-background-color: transparent;
                padding: 0;
                border-radius: 5px;
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 1px 5px 0 rgba(0, 0, 0, 0.12),
                0 3px 1px -2px rgba(0, 0, 0, 0.2);
            }

            .dodgy-tooltip-item {
                display: flex;
                align-items: center;
                font-size: 16px;
                background: cornflowerblue;
                opacity: 0.8;
                padding: 16px;
            }

            obap-icon {
                margin-right: 8px;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Regular Tooltips</div>
                <div class="row">
                    <obap-button class="button" raised label="button" tabindex="0"></obap-button>
                    <obap-tooltip offset-y="4">tooltip</obap-tooltip>
                </div>

                <div class="title">Custom Colors</div>
                <div class="row">
                    <obap-button class="button" raised label="button" tabindex="0"></obap-button>
                    <obap-tooltip class="tooltip-1" offset-y="4">tooltip</obap-tooltip>

                    <obap-button class="button" raised label="button" tabindex="0"></obap-button>
                    <obap-tooltip class="tooltip-2" offset-y="4">tooltip</obap-tooltip>

                    <obap-button class="button" raised label="button" tabindex="0"></obap-button>
                    <obap-tooltip class="tooltip-3" offset-y="4">tooltip</obap-tooltip>

                    <obap-button class="button" raised label="button" tabindex="0"></obap-button>
                    <obap-tooltip class="tooltip-4" offset-y="4">tooltip</obap-tooltip>
                </div>

                <div class="title">Custom Position (can use any obap-attached-element properties)</div>
                <div class="row">
                    <obap-button class="button" raised label="button" tabindex="0"></obap-button>
                    <obap-tooltip anchor="middle-top" offset-y="-4">tooltip</obap-tooltip>

                    <obap-button class="button" raised label="button" tabindex="0"></obap-button>
                    <obap-tooltip anchor="middle-bottom" offset-y="4">tooltip</obap-tooltip>

                    <obap-button class="button" raised label="button" tabindex="0"></obap-button>
                    <obap-tooltip anchor="middle-right" offset-x="4">tooltip</obap-tooltip>

                    <obap-button class="button" raised label="button" tabindex="0"></obap-button>
                    <obap-tooltip anchor="middle-left" offset-x="-4">tooltip</obap-tooltip>

                    <obap-button class="button" raised label="button" tabindex="0"></obap-button>
                    <obap-tooltip anchor="center">tooltip</obap-tooltip>
                </div>

                <div class="title">Custom Styling (probably don't do this)</div>
                <div class="row">
                    <obap-button class="button" raised label="button" tabindex="0"></obap-button>
                    <obap-tooltip offset-y="8" class="dodgy-tooltip"><div class="dodgy-tooltip-item"><obap-icon icon="android"></obap-icon><div>Don't do this!</div></div></obap-tooltip>
                </div>
            </div>
        `;
    }
}

window.customElements.define('tooltip-demo', TooltipDemo);