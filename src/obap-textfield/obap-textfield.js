/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapInputElement } from '../obap-input-element/obap-input-element.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { caption } from '../obap-styles/obap-typography.js';
import '../obap-icon/obap-icon.js';
import '../obap-input-outline/obap-input-outline.js';
import '../obap-tooltip/obap-tooltip.js';

/**
 * A Material Design text field with a floating label.
 */
export class ObapTextfield extends ObapInputElement {
    static get styles() {
        return [caption, css`
            :host {
                --obap-textfield-color: var(--obap-text-primary-color, rgba(0, 0, 0, 0.87));
                --obap-textfield-error-color: var(--obap-error-color, #e53935);
                --obap-textfield-label-color: var(--obap-text-secondary-color, rgba(0, 0, 0, 0.54));
                --obap-textfield-background-color: transparent;
                --obap-textfield-border-color: var(--obap-divider-on-surface-color, rgba(0, 0, 0, 0.20));
                --obap-textfield-disabled-color: var(--obap-text-disabled-color, rgba(0, 0, 0, 0.38));
                --obap-textfield-active-border-color: var(--obap-primary-color, #5c6bc0);
                --obap-textfield-border-size: 1px;
                --obap-textfield-active-border-size: 2px; 

                display: block;
                
                outline: none;
                color: var(--obap-textfield-color);
                background: var(--obap-textfield-background-color);
            }

            :host([has-focus]) {
                --obap-textfield-border-color: var(--obap-textfield-active-border-color);
                --obap-textfield-label-color: var(--obap-textfield-active-border-color);
                --obap-textfield-border-size: var(--obap-textfield-active-border-size);
            }

            :host([invalid]) {
                --obap-textfield-border-color: var(--obap-textfield-error-color);
                --obap-textfield-label-color: var(--obap-textfield-error-color);
                --obap-textfield-border-size: var(--obap-textfield-active-border-size);
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
                --obap-textfield-border-color: var(--obap-textfield-disabled-color);
                --obap-textfield-label-color: var(--obap-textfield-disabled-color);
            }

            .container {
                height: 32px;
                display: flex;
                align-items: center;
            }

            .helper-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: var(--obap-textfield-label-color);
                padding: 0 8px;
                width: 100%;
                box-sizing: border-box;
                min-height: 18px;
            }

            .helper-text {
                flex: 1;
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            input {
                flex: 1;
                background: transparent;
                border: none;
                box-shadow: none;
                height: 100%;
                width: 100%;
                outline: none;
                padding: 0;
            }

            obap-input-outline {
                --obap-input-outline-label-color: var(--obap-textfield-label-color);
                --obap-input-outline-border-color: var(--obap-textfield-border-color);
                --obap-input-outline-border-size: var(--obap-textfield-border-size);
            }

            obap-input-outline[has-start-icon] {
                --obap-input-outline-label-left-offset: 28px;
            }

            obap-input-outline[has-end-icon] {
                --obap-input-outline-label-right-offset: 28px;
            }

            obap-icon {
                color: var(--obap-textfield-label-color);
            }

            .start-icon {
                margin-right: 4px;
            }

            .end-icon {
                margin-left: 4px;
            }
        `];
    }

    static get properties() {
        return {
            label: {
                type: String
            },

            value: {
                type: String
            },

            helperText: {
                type: String,
                attribute: 'helper-text'
            },

            validationMessage: {
                type: String,
                attribute: 'validation-message'
            },

            _defaultValidationMessage: {
                type: String
            },

            minLength: {
                type: Number,
                attribute: 'min-length'
            },

            maxLength: {
                type: Number,
                attribute: 'max-length'
            },

            min: {
                type: Number
            },

            max: {
                type: Number
            },

            // 'text' (default), 'password', 'email', 'number', 'search', 'tel', 'url'
            type: {
                type: String
            },

            pattern: {
                type: String
            },

            required: {
                type: Boolean
            },

            // none, underline, outline
            outlineStyle: {
                type: String,
                attribute: 'outline-style'
            },

            startIcon: {
                type: String,
                attribute: 'start-icon'
            },

            endIcon: {
                type: String,
                attribute: 'end-icon'
            },

            invalid: {
                type: Boolean,
                reflect: true
            },

            autoValidate: {
                type: Boolean,
                attribute: 'auto-validate'
            },

            noFloat: {
                type: Boolean,
                attribute: 'no-float'
            },

            noTooltip: {
                type: Boolean,
                attribute: 'no-tooltip'
            },

            noPlaceholder: {
                type: Boolean,
                attribute: 'no-placeholder'
            },

            charCounter: {
                type: Boolean,
                attribute: 'char-counter'
            }
        }
    }

    get type() {
        return this._type;
    }

    set type(value) {
        const oldValue = this.type;

        if (oldValue !== value) {

            if (this._allowedTypes.indexOf(value) > -1) {
                this._type = value;
            } else {
                this._type = 'text';
            }

            this.requestUpdate('type', oldValue);
        }
    }

    constructor() {
        super();

        this._type = 'text';
        this.value = '';
        this.label = '';
        this.helperText = '';
        this.validationMessage= '';
        this._defaultValidationMessage = '';
        this.outlineStyle = 'underline';
        this.required = false;
        this.noFloat = false;
        this.noPlaceholder = false;
        this.startIcon = '';
        this.endIcon = '';
        this.pattern = '';
        this.minLength = 0;
        this.maxLength = 0;
        this.min = null;
        this.max = null;
        this.charCounter = false;
        this.autoValidate = false;
        this.noTooltip = false;

        this._allowedTypes = ['text', 'password', 'email', 'number', 'search', 'tel', 'url'];
    }

    connectedCallback() {
        super.connectedCallback();

    }

    disconnectedCallback() {

        super.disconnectedCallback();
    }

    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);

    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            if (propName === 'hasFocus') {
                this.hasFocus ? this.renderRoot.getElementById('input').focus() : this.renderRoot.getElementById('input').blur();
            }
        });
    }

    render() {
        return html`
            <div class="parent-container">
                <obap-input-outline type="${this.outlineStyle}" label="${this.label}" ?float="${this.value || this.hasFocus}" ?no-float="${this.noFloat}" ?no-placeholder="${this.noPlaceholder}" ?has-start-icon="${this.startIcon}" ?has-end-icon="${this.endIcon}">
                    <div class="container">
                        ${this._getIcon(this.startIcon, 'start-icon')}
                        <input
                            id="input"
                            aria-labelledby="label"
                            .type="${this.type}"
                            ?required="${this.required}"
                            .value="${this.value}"
                            pattern="${ifDefined((this.pattern && this.pattern.length > 0) ? this.pattern : undefined)}"
                            minLength="${ifDefined((this.minLength > -1) ? this.minLength : undefined)}"
                            maxLength="${ifDefined((this.maxLength > 0) ? this.maxLength : undefined)}"
                            min="${ifDefined((this.min !== null) ? this.min : undefined)}"
                            max="${ifDefined((this.max !== null) ? this.max : undefined)}"
                            @change="${this._handleChange}"
                            @input="${this._handleInput}"
                            @focus="${this._handleInputFocusEvent}" 
                            @blur="${this._handleInputBlurEvent}"
                            title=""
                        />
                        ${this._getIcon(this.endIcon, 'end-icon')}
                    </div>
                    ${this._renderTooltip()}
                </obap-input-outline>

                ${this._renderHelper()}
            </div>
            
        `;
    }

    _renderTooltip() {
        let text = '';

        if (!this.noTooltip) {
            if (this.invalid) {
                if (this.validationMessage) {
                    text = this.validationMessage;
                } else if (this._defaultValidationMessage) {
                    text = this._defaultValidationMessage;
                }
            } 
            /*
            else if (this.helperText) {
                text = this.helperText;
            }
            */
        }

        if (text) {
            return html`
                <obap-tooltip offset-y="2">${text}</obap-tooltip>
            `;
        }
        
        return null;
    }

    _renderHelper() {
        if (this.invalid && (this.validationMessage || this._defaultValidationMessage)) {
            return html`
                <div class="helper-container typography-caption">
                    <div class="helper-text">${this.validationMessage ? this.validationMessage : this._defaultValidationMessage}</div>
                </div>
            `;
        }

        if ((this.helperText || this.charCounter)) {
            return html`
                <div class="helper-container typography-caption">
                    <div class="helper-text">${this.helperText}</div>

                    ${this.charCounter ? 
                        ((this.maxLength > 0) ? html`
                            <div>${this.value.length} / ${this.maxLength}</div>
                        ` : html`
                            <div>${this.value.length}</div>
                        `) : null
                    }
                </div>
            `;
        }

        return html`
            <div class="helper-container typography-caption">
            </div>
        `;
    }

    _getIcon(name, className) {
        if ((name) && (name.trim() !== '')) {
            return html`<obap-icon icon="${name}" class="${className}"></obap-icon>`
        }

        return null;
    }

    _handleChange(e) {
        this.value = e.target.value;
        //e.target.reportValidity();
        this.validate();
        this.dispatchEvent(
            new CustomEvent("change", { bubbles: true, composed: true })
        );
    }

    _handleInput(e) {
        this.value = e.target.value;
        //e.target.reportValidity();
        this.validate();
        this.dispatchEvent(
            new CustomEvent("input", { bubbles: true, composed: true })
        );
    }

    _handleInputFocusEvent(e) {
        //this.validate();
        this.hasFocus = true;
        this.renderRoot.getElementById('input').focus();
    }

    _handleInputBlurEvent(e) {
        //this.validate();
        this.hasFocus = false;
        this.renderRoot.getElementById('input').blur();
    }

    validate() {
        const input = this.renderRoot.getElementById('input');

        if (input && input.willValidate) {
            if (input.checkValidity()) {
                this._defaultValidationMessage = null;
                this.invalid = false;
            } else {
                this._defaultValidationMessage = input.validationMessage;
                this.invalid = true;
            }
        } else {
            this._defaultValidationMessage = null;
            this.invalid = false;
        }
    }
}

window.customElements.define('obap-textfield', ObapTextfield);
