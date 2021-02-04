/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-spinner/obap-spinner.js';
import { button } from '../../src/obap-styles/obap-typography.js';

export class SpinnerDemo extends ObapElement {
    static get styles() {
        return [button, css`
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

            obap-spinner {
                margin-right: 48px;
            }

            obap-spinner.am-pm {
                font-weight: 600;
                --obap-spinner-background-color: lightgray;
                --obap-spinner-color: blue;
                --obap-spinner-hover-background-color: lightgray;
                --obap-spinner-hover-color: magenta;
                --obap-spinner-selection-background-color: var(--obap-primary-color, #5c6bc0);
                --obap-spinner-selection-color: var(--obap-on-primary-color, white);
                --obap-spinner-border-color: transparent;
                --obap-spinner-ripple-color: rgba(255, 0, 0, 0.38);
                --obap-spinner-content-color: red;
                --obap-spinner-content-background-color: lightgray;
            }

            obap-spinner[layout="horizontal"] {
                width: 110px;
            }

            obap-spinner[layout="vertical"] {
                width: 50px;
            }

            .am-pm[layout="vertical"] {
                width: 30px;
            }

            .image-spinner[layout="horizontal"] {
                width: 200px;
            }

            .image-spinner[layout="vertical"] {
                width: 140px;
            }
        `];
    }

    static get properties() {
        return {
            numberValue: {
                type: Number
            },

            textValue: {
                type: Number
            },

            customTextValue: {
                type: Number
            },

            customValue: {
                type: Number
            },

            textValues: {
                type: Array
            },

            customTextValues: {
                type: Array
            },

            customValues: {
                type: Array
            },

            showTooltips: {
                type: Boolean
            }
        }
    }

    constructor() {
        super();
        this.showTooltips = false;
        this.numberValue = 6;
        this.textValue = 4;
        this.customTextValue = 0;
        this.customValue = 0;
        this.textValues = ['Bob', 'Carl', 'Dave', 'Jorge', 'Kevin', 'Phil', 'Stuart', 'Tim'];
        this.customTextValues = ['am', 'pm'];
        this.customValues = [];

        for (let i = 1; i <= 14; i++) {
            this.customValues.push(`./images/minions/${i}.png`);
        }
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Numeric Spinner</div>
                <div class="row">
                    <obap-spinner editable type="number" tabindex="0" layout="horizontal" ?show-tooltips="${this.showTooltips}" value="${this.numberValue}" min-value="1" max-value="12" wrap-value></obap-spinner>
                    <obap-spinner type="number" tabindex="0" layout="vertical" ?show-tooltips="${this.showTooltips}" value="${this.numberValue}" min-value="1" max-value="12" wrap-value></obap-spinner>
                </div>

                <div class="title">Text Spinner</div>
                <div class="row">
                    <obap-spinner type="text" tabindex="0" layout="horizontal" ?show-tooltips="${this.showTooltips}" value="${this.textValue}" .textValues="${this.textValues}" wrap-value></obap-spinner>
                    <obap-spinner type="text" tabindex="0" layout="vertical" ?show-tooltips="${this.showTooltips}" value="${this.textValue}" .textValues="${this.textValues}" wrap-value></obap-spinner>    
                </div>

                <div class="title">Custom Spinner</div>
                <div class="row">
                    <obap-spinner class="image-spinner" type="custom" tabindex="0" layout="horizontal" ?show-tooltips="${this.showTooltips}" value="${this.customValue}" wrap-value>
                        ${this.customValues.map((value) => html`<img src="${value}">`)}
                    </obap-spinner>
                    <obap-spinner class="image-spinner" type="custom" tabindex="0" layout="vertical" ?show-tooltips="${this.showTooltips}" value="${this.customValue}" wrap-value>
                        ${this.customValues.map((value) => html`<img src="${value}">`)}
                    </obap-spinner>
                </div>

                <div class="title">Custom Styling</div>
                <div class="row">
                    <obap-spinner class="typography-button am-pm" type="text" tabindex="0" layout="horizontal" ?show-tooltips="${this.showTooltips}" value="${this.customTextValue}" .textValues="${this.customTextValues}" wrap-value></obap-spinner>
                    <obap-spinner class="typography-button am-pm" type="text" tabindex="0" layout="vertical" ?show-tooltips="${this.showTooltips}" value="${this.customTextValue}" .textValues="${this.customTextValues}" wrap-value></obap-spinner>
                </div>
            </div>
        `;
    }
}

window.customElements.define('spinner-demo', SpinnerDemo);