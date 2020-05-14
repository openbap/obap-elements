/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-tooltip/obap-tooltip.js';

export class TooltipDemo extends ObapElement {
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
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
            }

            .row {
              display: flex;
              flex-direction: row;
              align-items: center;
              padding: 16px;
            }

            .button {
                margin: 8px 32px 8px 0;
                height: 40px;
                width: 40px;
                cursor: pointer;
                background: lightgrey;
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
                    <div class="button" tabindex="0"></div>
                    <obap-tooltip>tooltip</obap-tooltip>
                </div>

                <div class="title">Custom Colors</div>
                <div class="row">
                    <div class="button" tabindex="0"></div>
                    <obap-tooltip class="tooltip-1">tooltip</obap-tooltip>

                    <div class="button" tabindex="0"></div>
                    <obap-tooltip class="tooltip-2">tooltip</obap-tooltip>

                    <div class="button" tabindex="0"></div>
                    <obap-tooltip class="tooltip-3">tooltip</obap-tooltip>

                    <div class="button" tabindex="0"></div>
                    <obap-tooltip class="tooltip-4">tooltip</obap-tooltip>
                </div>

                <div class="title">Custom Position (can use any obap-attached-element properties)</div>
                <div class="row">
                    <div class="button" tabindex="0"></div>
                    <obap-tooltip anchor="middle-top">tooltip</obap-tooltip>

                    <div class="button" tabindex="0"></div>
                    <obap-tooltip anchor="middle-bottom">tooltip</obap-tooltip>

                    <div class="button" tabindex="0"></div>
                    <obap-tooltip anchor="middle-right">tooltip</obap-tooltip>

                    <div class="button" tabindex="0"></div>
                    <obap-tooltip anchor="middle-left">tooltip</obap-tooltip>

                    <div class="button" tabindex="0"></div>
                    <obap-tooltip anchor="center">tooltip</obap-tooltip>
                </div>

                <div class="title">Custom Styling (probably don't do this)</div>
                <div class="row">
                    <div class="button" tabindex="0"></div>
                    <obap-tooltip offset-y="8" class="dodgy-tooltip"><div class="dodgy-tooltip-item"><obap-icon icon="android"></obap-icon><div>Don't do this!</div></div></obap-tooltip>
                </div>
            </div>
        `;
    }
}

window.customElements.define('tooltip-demo', TooltipDemo);