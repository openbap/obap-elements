/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapInputElement } from '../obap-input-element/obap-input-element.js';
import { caption, body } from '../obap-styles/obap-typography.js';
import '../obap-icon/obap-icon.js';
import '../obap-input-outline/obap-input-outline.js';

/**
 * A Material Design text field with a floating label.
 */
export class ObapTextfield extends ObapInputElement {
    static get styles() {
        return [caption, body, css`
            :host {
                --obap-textfield-color: var(--obap-text-primary-color, rgba(0, 0, 0, 0.87));
                --obap-textfield-error-color: var(--obap-error-color, #e53935);
                --obap-textfield-label-color: var(--obap-text-secondary-color, rgba(0, 0, 0, 0.54));
                --obap-textfield-background-color: var(--obap-surface-color, #FFFFFF);
                --obap-textfield-border-color: var(--obap-divider-on-surface-color, rgba(0, 0, 0, 0.20));
                --obap-textfield-active-border-color: var(--obap-primary-color, #5c6bc0);
                --obap-textfield-border-size: 1px;
                --obap-textfield-active-border-size: 1px; 

                display: block;
                
                outline: none;
                color: var(--obap-textfield-color);
                background: var(--obap-textfield-background-color);
            }

            :host([has-focus]) {
                --obap-textfield-border-color: var(--obap-textfield-active-border-color);
                --obap-textfield-border-size: var(--obap-textfield-active-border-size);
            }

            :host(:not([has-focus])[invalid]) {
                --obap-textfield-border-color: var(--obap-textfield-error-color);
                --obap-textfield-label-color: var(--obap-textfield-error-color);
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                height: 32px;
                border-bottom: var(--obap-textfield-border-size) solid var(--obap-textfield-border-color);
                padding: 0 8px;
            }

            .container[outline] {
                border: var(--obap-textfield-border-size) solid var(--obap-textfield-border-color);
                border-radius: 3px;
            }

            .helper-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: var(--obap-textfield-label-color);
                padding: 4px 8px;
            }

            label {
                position: absolute;
                flex: 1;
                left: 4px;
                padding: 0 4px;
                top: 25%;
                transition: left 0.15s cubic-bezier(0.4, 0, 0.2, 1), top 0.15s cubic-bezier(0.4, 0, 0.2, 1), font-size 0.15s cubic-bezier(0.4, 0, 0.2, 1);
                pointer-events: none;
                color: var(--obap-textfield-label-color);
            }

            label[float] {
                top: 0;
                transform: translate(0, -50%);
                background: var(--obap-textfield-background-color);
            }

            label:not([float])[has-icon] {
                left: 28px;
            }

            :host([has-focus]) label {
                color: var(--obap-textfield-active-border-color);
            }

            input {
                background: transparent;
                border: none;
                box-shadow: none;
                height: 100%;
                outline: none;
                padding: 0;
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

            type: {
                type: String
            },

            required: {
                type: Boolean
            },

            outline: {
                type: Boolean
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
            }
        }
    }

    constructor() {
        super();

        this.type = 'text';
        this.value = '';
        this.label = '';
        this.outline = false;
        this.required = false;
        this.startIcon = '';
        this.endIcon = '';
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
                <div class="container typography-body" ?outline="${this.outline}">
                    ${this._getIcon(this.startIcon, 'start-icon')}
                    <input
                        id="input"
                        aria-labelledby="label"
                        type="${this.type}"
                        ?required="${this.required}"
                        .value="${this.value}"
                        @change="${this._handleChange}"
                        @input="${this._handleInput}"
                        @focus="${this._handleInputFocusEvent}" 
                        @blur="${this._handleInputBlurEvent}"
                    />
                    ${this._getIcon(this.endIcon, 'end-icon')}
                    <label class="${this.value || this.hasFocus ? 'typography-caption' : 'typography-body'}" id="label" ?has-icon="${this.startIcon}" ?float="${this.value || this.hasFocus}">${this.label}</label>
                </div>
                <div class="helper-container typography-caption">
                    <div>Helper Text</div>
                    <div>25 / 50</div>
                </div>
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
        this.dispatchEvent(
            new CustomEvent("change", { bubbles: true, composed: true })
        );
    }

    _handleInput(e) {
        this.value = e.target.value;
        this.dispatchEvent(
            new CustomEvent("input", { bubbles: true, composed: true })
        );
    }

    _handleInputFocusEvent(e) {
        this.hasFocus = true;
        this.renderRoot.getElementById('input').focus();
    }

    _handleInputBlurEvent(e) {
        this.hasFocus = false;
        this.renderRoot.getElementById('input').blur();
    }
}

window.customElements.define('obap-textfield', ObapTextfield);
