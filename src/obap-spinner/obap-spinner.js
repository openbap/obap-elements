/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import '../obap-button/obap-button.js';
import '../obap-tooltip/obap-tooltip.js';
import '../obap-pages/obap-pages.js';

export class ObapSpinner extends ObapElement {
    static get styles() {
        return [css`
            :host {
                --obap-spinner-background-color: var(--obap-surface-color, white);
                --obap-spinner-color: var(--obap-on-surface-color, rgba(0, 0, 0, 0.87));
                --obap-spinner-hover-background-color: var(--obap-surface-color, white);
                --obap-spinner-hover-color: var(--obap-on-surface-color, rgba(0, 0, 0, 0.87));
                --obap-spinner-selection-background-color: var(--obap-primary-color, #5c6bc0);
                --obap-spinner-selection-color: var(--obap-on-primary-color, white);
                --obap-spinner-border-color: rgba(0, 0, 0, 0.2);
                --obap-spinner-ripple-color: var(--obap-text-disabled-color, rgba(0, 0, 0, 0.38));
                --obap-spinner-content-color: var(--obap-on-surface-color, rgba(0, 0, 0, 0.87));
                --obap-spinner-content-background-color: transparent;
                --obap-spinner-border-radius: 3px;
                display: inline-block;
                outline: 0;
                background: var(--obap-spinner-background-color);

                font-size: 0.8125rem;
                line-height: 1.15rem;
                letter-spacing: 0.0179em;
                font-weight: 400;
                -webkit-font-smoothing: antialiased;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                display: flex;
                flex-direction: row;
                align-items: center;
                width: auto;
            }

            .container[layout="vertical"] {
                flex-direction: column;
            }

            .content {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                flex: 1;
                width: 100%;
                height: 100%;
                padding: 4px;
                box-sizing: border-box;
                border-radius: var(--obap-spinner-border-radius);
                border: 1px solid var(--obap-spinner-border-color);
                outline: 0;
                background: var(--obap-spinner-content-background-color);
                color: var(--obap-spinner-content-color);
            }

            .content[compact] {
                padding: 0;
                border: none;
            }

            .content:hover {
                color: var(--obap-spinner-hover-color);
                background: var(--obap-spinner-hover-background-color);
            }

            .content:focus-within {
                background-color: var(--obap-spinner-selection-background-color);
                color: var(--obap-spinner-selection-color);
            }

            .value-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                outline: 0;
            }

            .button-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            obap-button {
                --obap-button-color: var(--obap-spinner-color);
                --obap-button-background-color: transparent;
                --obap-button-ripple-color: var(--obap-spinner-ripple-color);
                width: 24px;
                height: 24px;
                min-height: 24px;
                min-width: 24px;
                margin: 2px;
            }

            input {
                border: none;
                outline: none;
                width: 100%;
                height: 100%;
                /*color: var(--obap-spinner-content-color);*/
                color: inherit;
                caret-color: inherit;
                background: none;
                text-align: center;
                font-size: inherit;
                cursor: pointer;
            }

            input::selection {
                background-color: var(--obap-spinner-selection-background-color);
                color: var(--obap-spinner-selection-color);
            }

            input[type=number] {
                -moz-appearance: textfield;
            }

            input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { 
                -webkit-appearance: none; 
                margin: 0; 
            }
        `];
    }

    static get properties() {
        return {
            // horizontal (default), vertical
            layout: {
                type: String,
                attribute: 'layout',
                reflect: true
            },

            hideButtons: {
                type: Boolean,
                attribute: 'hide-buttons'
            },

            compact: {
                type: Boolean,
                attribute: 'compact',
                reflect: true
            },

            /*
            number: Need to specify min/max. Allows typing values, within range. DEFAULT
            text  : Need to specify array of string values. Allows typing values, within array, with autocomplete.
            custom: Need to provide dom objects as slotted elements. No typing.
            */
            type: {
                type: String,
                attribute: 'type',
                reflect: true
            },

            editable: {
                type: Boolean,
                attribute: 'editable'
            },

            numberLength: {
                type: Number,
                attribute: 'number-length'
            },

            // The selected value (literal for 'number' and index for the others).
            value: {
                type: Number
            },

            minValue: {
                type: Number,
                attribute: 'min-value'
            },

            maxValue: {
                type: Number,
                attribute: 'max-value'
            },

            textValues: {
                type: Array,
                attribute: 'text-values'
            },

            wrapValue: {
                type: Boolean,
                attribute: 'wrap-value'
            },

            /* Labels & Tooltips */
            showTooltips: {
                type: Boolean,
                attribute: 'show-tooltips'
            },

            nextValueLabel: {
                type: String,
                attribute: 'next-value-label'
            },

            previousValueLabel: {
                type: String,
                attribute: 'previous-value-label'
            }
        }
    }

    constructor() {
        super();
        this._boundHandleKeyPressEvent = this._handleKeyPressEvent.bind(this);
        this.layout = 'horizontal';
        this.type = 'number';
        this.hideButtons = false;
        this.editable = false;
        this.wrapValue = false;
        this.value = -1;
        this.numberLength = 0;
        this.minValue = 0;
        this.maxValue = 100;
        this.textValues = [];
        this.showTooltips = false;
        this.nextValueLabel = 'Next value';
        this.previousValueLabel = 'Previous value';
        this._pages = null;
        this.addEventListener('keyup', this._boundHandleKeyPressEvent);
    }

    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this._pages = this.renderRoot.getElementById('pages');
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            if (propName === 'value') {
                if (isNaN(this.value)) {
                    this.value = -1;
                }
            }
        });
    }

    render() {
        return html`
            <div class="container" layout="${this.layout}">
                <div class="button-container">
                   ${this._renderButton('left')}
                   ${this.showTooltips ? html`<obap-tooltip offset-y="16">${this.previousValueLabel}</obap-tooltip>` : null}
                </div>
                <div class="content" ?compact="${this.compact}">${this._renderContent()}</div>
                <div class="button-container">
                    ${this._renderButton('right')}
                    ${this.showTooltips ? html`<obap-tooltip offset-y="16">${this.nextValueLabel}</obap-tooltip>` : null}
                </div>
            </div>
        `;
    }

    _renderButton(position) {
        if (this.hideButtons) return null;

        if (position === 'left') {
            if (this.layout === 'horizontal') {
                return html`<obap-button round ?disabled="${!this._canDec()}" tabindex="0" icon="core:chevron-left" @click="${this._decValue}"></obap-button>`;
            } else {
                return html`<obap-button round ?disabled="${!this._canInc()}" tabindex="0" icon="core:chevron-up" @click="${this._incValue}"></obap-button>`;
            }
        } else {
            if (this.layout === 'horizontal') {
                return html`<obap-button round ?disabled="${!this._canInc()}" tabindex="0" icon="core:chevron-right" @click="${this._incValue}"></obap-button>`;
            } else {
                return html`<obap-button round ?disabled="${!this._canDec()}" tabindex="0" icon="core:chevron-down" @click="${this._decValue}"></obap-button>`;
            }
        }
    }

    _renderContent() {
        switch (this.type) {
            case 'text': {
                return html`<div class="value-container">${this.textValues[this.value]}</div>`;
            }

            case 'custom': {
                return html`
                    <div class="value-container">
                        <obap-pages id="pages" selected-index="${this.value}"><slot></slot></obap-pages>
                    </div>
                `;
            }

            default: { // number
                if (this.editable) {
                    return html`
                        <div class="value-container">
                            <input id="numberInput" tabindex="0" type="number" .value="${this.value.toString().padStart(this.numberLength, '0')}" 
                            @change="${this._handleInputEvent}" @click="${this._handleInputClick}">
                        </div>
                    `;
                }
  
                return html`<div class="value-container">${this.value.toString().padStart(this.numberLength, '0')}</div>`;
            }
        }
    }

    _canDec() {
        if (this.wrapValue) return true;

        switch (this.type) {
            case 'text': {
                return this.value > 0;
            }

            case 'custom': {
                return this.value > 0;
            }

            default: { // number
                return this.value > this.minValue;
            }
        }
    }

    _canInc() {
        if (this.wrapValue) return true;

        switch (this.type) {
            case 'text': {
                return this.value < this.textValues.length - 1;
            }

            case 'custom': {
                return this._pages ? this.value < this._pages.items.length - 1 : false;
            }

            default: { // number
                return this.value < this.maxValue;
            }
        }
    }

    _decValue() {
        let min = 0;
        let max = -1;

        switch (this.type) {
            case 'text': {
                max = this.textValues.length - 1;
                break;
            }

            case 'custom': {
                if (!this._pages) return;
                max = this._pages.items.length - 1;
                break;
            }

            default: { // number
                min = this.minValue;
                max = this.maxValue;
            }
        }

        let newVal = this.value - 1;

        if (newVal < min) {
            if (this.wrapValue) {
                newVal = max;
            } else {
                newVal = this.value;
            }
        }

        if (this.value != newVal) {
            const oldValue = this.value;
            this.value = newVal;
            this.fireMessage('obap-spinner-value-changed', { oldValue: oldValue, newValue: newVal});
        }
    }

    _incValue() {
        let min = 0;
        let max = -1;

        switch (this.type) {
            case 'text': {
                max = this.textValues.length - 1;
                break;
            }

            case 'custom': {
                if (!this._pages) return;
                max = this._pages.items.length - 1;
                break;
            }

            default: { // number
                min = this.minValue;
                max = this.maxValue;
            }
        }

        let newVal = this.value + 1;

        if (newVal > max) {
            if (this.wrapValue) {
                newVal = min;
            } else {
                newVal = this.value;
            }
        }

        if (this.value != newVal) {
            const oldValue = this.value;
            this.value = newVal;
            this.fireMessage('obap-spinner-value-changed', { oldValue: oldValue, newValue: newVal});
        }
    }

    _handleInputClick(e) {
        e.target.select();
    }

    _handleInputEvent(e) {
        const val = e.target.value;

        if ((val >= this.minValue) && (val <= this.maxValue)) {
            const oldValue = this.value;
            this.value = val;
            this.fireMessage('obap-spinner-value-changed', { oldValue: oldValue, newValue: this.value});
        } else if (val !== '') {
            e.target.value = this.value;
        }
    }

    _handleKeyPressEvent(e) {
        if (e.key === 'Enter') {
            const el = this.renderRoot.activeElement;

            if (el && el.tagName === 'OBAP-ICON') {
                el.click();
                e.preventDefault();
                e.stopPropagation();
            }
        }
    }
}

window.customElements.define('obap-spinner', ObapSpinner);