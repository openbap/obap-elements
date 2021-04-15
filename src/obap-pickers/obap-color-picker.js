/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { elevation1 } from '../obap-styles/obap-elevation.js';
import { HSLAtoHSVA, HSVAtoHSLA, HSLAtoRGBA, HSLAToHexA } from '../obap-styles/obap-color-converters.js';
import '../obap-tabs/obap-tabs.js';
import '../obap-pages/obap-pages.js';
import '../obap-selector/obap-selector-container.js';
import '../obap-slider/obap-slider.js';
import '../obap-slider/obap-2d-slider.js';
import '../obap-textfield/obap-textfield.js';

/**
 * A Material Design desktop color picker.     
 */
export class ObapColorPicker extends ObapElement {
    static get styles() {
        return [elevation1, css`
            :host {
                display: block;
                border-radius: var(--obap-border-radius-normal, 3px);
                overflow: hidden;
                /*width: 232px;*/
                width: 288px;
                background-color: var(--obap-surface-color, #FFFFFF);
                box-sizing: border-box;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                display: flex;
                flex-direction: column;
                padding: 16px;
            }

            .selector {
                width: 256px;
                height: 192px;
                /*
                width: 306px;
                height: 180px;
                */
                margin-bottom: 8px;
                box-sizing: border-box;
            }

            .sliders {
                display: grid;
                grid-template-columns: 1fr auto;
                grid-template-rows: 1fr 1fr;
                grid-template-areas: "slider-h color-value" 
                                     "slider-a color-value";
                padding-left: 0px;
                margin-bottom: 8px;
            }

            .swatches {
                display: grid;
                grid-template-columns: 24px 24px 24px 24px 24px 24px 24px 24px 24px;
                grid-gap: 5px;
                margin-top: 8px;
                padding: 6px 1px 1px 0px;
            }

            .swatch {
                display: inline-block;
                width: 24px;
                height: 24px;
                border-radius: var(--obap-border-radius-circle, 50%);
                box-sizing: border-box;
                border: 1px solid rgba(0, 0, 0, 0.10);
            }

            .value-page {
                padding-top: 16px;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                grid-gap: 8px;
            }

            obap-select-container {
                display: flex;
                flex-direction: column;
            }

            obap-tabs {
                --obap-tabs-color: var(--obap-primary-color);
                --obap-tabs-background-color: transparent;
                height: 24px;
            }

            obap-slider {
                height: 10px;
                --obap-slider-track-height: 10px;
                --obap-slider-thumb-resting-size: 14px;
                --obap-slider-active-track-color: transparent;
                --obap-slider-thumb-color: var(--obap-surface-color, #FFFFFF);
                --obap-slider-thumb-border-color: var(--obap-divider-on-surface-color, rgba(0, 0, 0, 0.20));
                --obap-slider-callout-background-color: var(--obap-primary-color, #5c6bc0);
                --obap-slider-callout-color: var(--obap-on-primary-color);
            }

            obap-2d-slider {
                width: 100%;
                height: 100%;
                background-image: linear-gradient(to top, #000 0%, transparent 100%), linear-gradient(to right, #fff 0%, transparent 100%);  
            }

            #slider-h {
                grid-area: slider-h;
                --obap-slider-inactive-track-color: linear-gradient(90deg, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(0, 100%, 50%));
                margin: 4px 0;
            }

            #slider-a {
                grid-area: slider-a;
                border-radius: 9999px;
                margin: 3px 0;
                background: repeating-conic-gradient(#E0E0E0 0% 25%, transparent 0% 50%) 50% / 8px 8px;
            }

            .color-value-container {
                grid-area: color-value;
                height: 32px;
                width: 32px;
                margin: 2px 0 4px 12px;
                box-sizing: border-box;
                overflow: hidden;
                outline: 1px solid #E0E0E0;
                background: repeating-conic-gradient(#E0E0E0 0% 25%, transparent 0% 50%) 50% / 32px 32px
            }

            #color-value {
                width: 100%;
                height: 100%;
                overflow: hidden;
            }

            .hex-text-field {
                grid-column: 1/-1;
            }
        `];
    }

    static get properties() {
        return {
            predefinedColors: {
                type: Array
            },

            hslaValue: {
                type: Object
            },

            hsvaValue: {
                type: Object
            },

            rgbaValue: {
                type: Object
            },

            hexValue: {
                type: String
            }
        }
    }

    
    get hslaValue() {
        return this._hslaValue;
    }

    set hslaValue(value) {
        const oldValue = this._hslaValue;
        let valueChanged = false;

        if (!oldValue) {
            valueChanged = true;
        } else if (value) {
            if ((oldValue.h !== value.h) || (oldValue.s !== value.s) || (oldValue.l !== value.l) || (oldValue.a !== value.a)) {
                valueChanged = true;
            }
        }

        if (valueChanged) {
            this._hslaValue = value;
            this.hsvaValue = HSLAtoHSVA(value.h, value.s, value.l, value.a);
            this.rgbaValue = HSLAtoRGBA(value.h, value.s, value.l, value.a);
            this.hexValue = HSLAToHexA(value.h, value.s, value.l, value.a);
            this.requestUpdate('hslaValue', null);
        }
    }

    constructor() {
        super();
        this.predefinedColors = [];
        this.hslaValue = this._createHSLAValue(219, 79, 66, 0.5)
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            if (propName === 'hslaValue') {
                this._updateAlphaSliderStyle(oldValue, this.hslaValue);
                this._updateSLSliderStyle(oldValue, this.hslaValue);
                this._updateColorValueStyle(oldValue, this.hslaValue);
            }
        });
    }

    render() {
        return html`
            <div class="container">
                <div class="selector">
                    <obap-2d-slider id="slider-sl" x-value="${this.hsvaValue.s}" y-value="${100.0 - this.hsvaValue.v}" @obap-2d-slider-change="${this._handleSVChange}"></obap-2d-slider>
                </div>
                <div class="sliders">
                    <obap-slider id="slider-h" min-value="0" max-value="360" value="${this.hslaValue.h}" show-floating-label @obap-slider-change="${this._handleHueChange}" disable-thumb-expand></obap-slider>
                    <obap-slider id="slider-a" min-value="0" max-value="1" value="${this.hslaValue.a}" show-floating-label floating-label-decimal-points="1" @obap-slider-change="${this._handleOpacityChange}" disable-thumb-expand></obap-slider>
                    <div class="color-value-container">
                        <div id="color-value"></div>
                    </div>
                </div>
                <div class="values">
                    <obap-selector-container selected-index="0">
                        <obap-tabs fill>
                            <obap-tab>HEX</obap-tab>
                            <obap-tab>RGBA</obap-tab>
                            <obap-tab>HSLA</obap-tab>
                        </obap-tabs>
                        <obap-pages>
                            <div class="value-page">
                                <obap-textfield label="Hex" class="hex-text-field" outline-style="outline" no-placeholder no-float no-helper value="${this.hexValue}"></obap-textfield>
                            </div>
                            <div class="value-page">
                                <obap-textfield label="R" outline-style="outline" no-placeholder no-float no-helper value="${this.rgbaValue.r}"></obap-textfield>
                                <obap-textfield label="G"  outline-style="outline" no-placeholder no-float no-helper value="${this.rgbaValue.g}"></obap-textfield>
                                <obap-textfield label="B"  outline-style="outline" no-placeholder no-float no-helper value="${this.rgbaValue.b}"></obap-textfield>
                                <obap-textfield label="A"  outline-style="outline" no-placeholder no-float no-helper value="${this.rgbaValue.a}"></obap-textfield>
         
                            </div>
                            <div class="value-page">
                                <obap-textfield label="H"  outline-style="outline" no-placeholder no-float no-helper value="${this.hslaValue.h}"></obap-textfield>
                                <obap-textfield label="S"  outline-style="outline" no-placeholder no-float no-helper value="${this.hslaValue.s}"></obap-textfield>
                                <obap-textfield label="L"  outline-style="outline" no-placeholder no-float no-helper value="${this.hslaValue.l}"></obap-textfield>
                                <obap-textfield label="A"  outline-style="outline" no-placeholder no-float no-helper value="${this.hslaValue.a}"></obap-textfield>
                            </div>
                        </obap-pages>
                    </obap-selector-container>
                </div>
                ${(this.predefinedColors && this.predefinedColors.length > 0) ? this._renderSwatches() : null}
            </div>
        `;
    }

    _renderSwatches() {
        return html`
            <div class="swatches">
                ${this.predefinedColors.map(color => html`<div class="swatch" style="background-color: ${color};"></div>`)}
            </div>
        `;
    }

    _updateAlphaSliderStyle(oldColor, newColor) {
        if ((!oldColor) || (oldColor.h !== newColor.h) || (oldColor.s !== newColor.s) || (oldColor.l !== newColor.l)) {
            const el = this.renderRoot.getElementById('slider-a');
            el.style.setProperty('--obap-slider-inactive-track-color', `linear-gradient(90deg, hsla(${newColor.h}, ${newColor.s}%, ${newColor.l}%, 0), hsla(${newColor.h}, ${newColor.s}%, ${newColor.l}%, 1)`);   
        }
    }

    _updateSLSliderStyle(oldColor, newColor) {
        if ((!oldColor) || (oldColor.h !== newColor.h)) {
            const el = this.renderRoot.getElementById('slider-sl');
            el.style.backgroundColor = `hsl(${newColor.h}, 100%, 50%)`;
        }
    }

    _updateColorValueStyle(oldColor, newColor) {
        if ((!oldColor) || (oldColor.h !== newColor.h) || (oldColor.s !== newColor.s) || (oldColor.l !== newColor.l) || (oldColor.a !== newColor.a)) {
            const el = this.renderRoot.getElementById('color-value');
            el.style.backgroundColor = `hsla(${newColor.h}, ${newColor.s}%, ${newColor.l}%, ${newColor.a})`;
        }
    }

    _handleOpacityChange(e) {
        const newValue = parseFloat(e.detail.value.toFixed(2));

        if (this.hslaValue.a !== newValue) {
            this.hslaValue = this._createHSLAValue(this.hslaValue.h, this.hslaValue.s, this.hslaValue.l, newValue);
        }
    }

    _handleHueChange(e) {
        const newValue = parseFloat(e.detail.value.toFixed(2));

        if (this.hslaValue.h !== newValue) {
            this.hslaValue = this._createHSLAValue(newValue, this.hslaValue.s, this.hslaValue.l, this.hslaValue.a);
        }
    }

    _handleSVChange(e) {
        const values = e.detail;
        const newValue = HSVAtoHSLA(this.hslaValue.h, values.x, 100.0 - values.y, this.hslaValue.a);
        this.hslaValue = newValue;
    }

    _createHSLAValue(h, s, l, a) {
        return { h: h, s: s, l: l, a: a};
    }
}

window.customElements.define('obap-color-picker', ObapColorPicker);
