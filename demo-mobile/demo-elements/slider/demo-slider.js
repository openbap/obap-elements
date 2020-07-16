/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../../src/obap-element/obap-element.js';
import { body } from '../../../src/obap-styles/obap-typography.js';
import '../../../src/obap-slider/obap-slider.js';
import '../../../src/obap-check/obap-check.js';
import '../../demo-mobile-app/demo-panel.js';

export class DemoSlider extends ObapElement {
    static get styles() {
        return [body, css`
            :host {
                display: block;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                height: 100%;
                padding: 6px 8px 8px 8px;
                box-sizing: border-box;
            }

            .options {
                display: grid;
                width: 100%;
                grid-template-columns: 1fr 1fr 1fr;
                grid-template-rows: 1fr 1fr;
                grid-column-gap: 24px;
                grid-row-gap: 8px;
            }

            demo-panel {
                margin-bottom: 8px;
            }

            obap-slider {
                margin: 16px 8px 8px 8px;
            }
        `];
    }

    static get properties() {
        return {
            value: {
                type: Number
            },

            startValue: {
                type: Number
            },

            endValue: {
                type: Number
            },

            stops: {
                type: Array
            },

            range: {
                type: Boolean
            },

            discrete: {
                type: Boolean
            },

            showStartLabel: {
                type: Boolean
            },

            showEndLabel: {
                type: Boolean
            },

            showStartIcon: {
                type: Boolean
            },

            showEndIcon: {
                type: Boolean
            },

            showStopLabels: {
                type: Boolean
            },

            showFloatingLabel: {
                type: Boolean
            },

            updateObject: {
                type: Object
            }
        }
    }

    constructor() {
        super();
        this.value = 50;
        this.startValue = 40;
        this.endValue = 60;
        this.stops = [0, 25, 50, 75, 100];
        this.range = false;
        this.discrete = false;
        this.showStopLabels = false;
        this.showFloatingLabel = false;
        this.showStartLabel = false;
        this.showEndLabel = false;
        this.showStartIcon = false;
        this.showEndIcon = false;
        this.updateObject = {
            value: this.value,
            startValue: this.startValue,
            endValue: this.endValue
        }
    }

    render() {
        return html`
            <div class="container">
                <demo-panel>
                    <div class="options">
                        <obap-check name="range" label="Range" @obap-item-selected-change="${this._optionChange}"></obap-check>
                        <obap-check name="discrete" label="Discrete" @obap-item-selected-change="${this._optionChange}"></obap-check>
                        <obap-check name="stop-labels" label="Stop Labels" @obap-item-selected-change="${this._optionChange}"></obap-check>
                        <obap-check name="floating-label" label="Floating Label" @obap-item-selected-change="${this._optionChange}"></obap-check>

                        <obap-check name="start-label" label="Start Label" @obap-item-selected-change="${this._optionChange}"></obap-check>
                        <obap-check name="end-label" label="End Label" @obap-item-selected-change="${this._optionChange}"></obap-check>
                        <obap-check name="start-icon" label="Start Icon" @obap-item-selected-change="${this._optionChange}"></obap-check>
                        <obap-check name="end-icon" label="End Icon" @obap-item-selected-change="${this._optionChange}"></obap-check>
                    </div>
                </demo-panel>

                <demo-panel>
                    <obap-slider min-value="0" max-value="100" value="${this.value}" start-value="${this.startValue}" end-value="${this.endValue}" 
                                 .stops="${this.stops}" start-icon="app:android" end-icon="app:face"
                                 ?range="${this.range}" ?discrete="${this.discrete}" ?show-stop-labels="${this.showStopLabels}"
                                 ?show-floating-label="${this.showFloatingLabel}" ?show-start-label="${this.showStartLabel}" ?show-end-label="${this.showEndLabel}"
                                 ?show-start-icon="${this.showStartIcon}" ?show-end-icon="${this.showEndIcon}" @obap-slider-change="${this._sliderChange}">
                    </obap-slider>
                </demo-panel>

                <demo-panel>
                    <div class="typography-body">
                        ${this.range ? html`<span>Start Value = ${this.updateObject.startValue}, End Value = ${this.updateObject.endValue}</span>` :
                                       html`<span>Value = ${this.updateObject.value}</span>`}
                    </div>
                </demo-panel>
            </div>
        `;
    }

    _optionChange(e) {
        const option = e.detail.name;
        const selected = e.detail.selected;
        
        switch (option) {
            case 'range': {
                this.range = selected;
                break;
            }

            case 'discrete': {
                this.discrete = selected;
                break;
            }

            case 'stop-labels': {
                this.showStopLabels = selected;
                break;
            }

            case 'floating-label': {
                this.showFloatingLabel = selected;
                break;
            }

            case 'start-label': {
                this.showStartLabel = selected;
                break;
            }

            case 'end-label': {
                this.showEndLabel = selected;
                break;
            }

            case 'start-icon': {
                this.showStartIcon = selected;
                break;
            }

            case 'end-icon': {
                this.showEndIcon = selected;
                break;
            }
        }
    }

    _sliderChange(e) {
        this.updateObject = e.detail;
    }
}

window.customElements.define('demo-slider', DemoSlider);