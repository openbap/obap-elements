/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { caption, body } from '../obap-styles/obap-typography.js';

/**
 * An outline element to create a notch that is used in outlined textfields and select elements.
 */
export class ObapInputOutline extends ObapElement {
    static get styles() {
        return [caption, body, css`
            :host {
                display: block;
                --obap-input-outline-label-color: var(--obap-text-secondary-color, rgba(0, 0, 0, 0.54));
                --obap-input-outline-border-color: var(--obap-divider-on-surface-color, rgba(0, 0, 0, 0.20));
                --obap-input-outline-border-size: 1px;
                --obap-input-outline-label-left-offset: 4px;
                --obap-input-outline-label-right-offset: 4px;
                height: 32px;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            :host([type="conventional"]) {
                height: auto;
            }

            .container {
                position: relative;
                display: flex;
                width: 100%;
                height: 100%;
            }

            .conventional-container {
                width: 100%;
            }

            .border-conventional {
                position: relative;
                display: flex;
                align-items: center;
                flex: 1;
                border: var(--obap-input-outline-border-size) solid var(--obap-input-outline-border-color);
                border-radius: 3px;
      
                height: 32px;
                padding: 0 4px;
                box-sizing: border-box;
            }

            .border {
                border-color: var(--obap-input-outline-border-color);
                border-style: solid; 
            }

            .leading {
                padding-left: 4px;
                border-width: var(--obap-input-outline-border-size) 0 var(--obap-input-outline-border-size) var(--obap-input-outline-border-size);
                border-top-left-radius: 3px;
                border-bottom-left-radius: 3px;
            }

            .notch {
                display: flex;
                align-items: center;
                border-width: var(--obap-input-outline-border-size) 0 var(--obap-input-outline-border-size) 0;
                border-radius: 0;
            }

            .notch[float] {
                border-width: 0 0 var(--obap-input-outline-border-size) 0;
            }

            .line {
                flex: 1;
                position: relative;
                display: flex;
                align-items: center;
                border-radius: 0;
                padding: 0 4px;
            }

            .underline {
                border-width: 0 0 var(--obap-input-outline-border-size) 0;
            }

            .noline {
                border-width: 0;
            }

            .trailing {
                flex: 1;
                padding-right: 4px; 
                border-width: var(--obap-input-outline-border-size) var(--obap-input-outline-border-size) var(--obap-input-outline-border-size) 0;
                border-top-right-radius: 3px;
                border-bottom-right-radius: 3px;
            }

            .label {
                pointer-events: none;
                padding: 0 var(--obap-input-outline-label-right-offset) 0 var(--obap-input-outline-label-left-offset);
                transition-delay: 0s, 0s;
                transition-duration: 0.15s, 0.15s;
                transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1), cubic-bezier(0.4, 0, 0.2, 1);
                color: var(--obap-input-outline-label-color);
            }

            .label[float] {
                padding: 0 4px;
                /*margin-top: 12.5%;*/
                margin-top: 5px;
                transform: translate(0, -100%);
            }

            .label[float-underline] {
                padding: 0 4px;
                margin-top: 0;
                transform: translate(0, -100%);
            }

            .label[float][no-float], .label[float-underline][no-float], .label:not([float])[no-placeholder] {
                display: none;
            }

            .label-conventional {
                margin-bottom: 4px;
                color: var(--obap-input-outline-label-color);
            }

            .slot-content {
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                padding: 0 8px;
            }
        `];
    }

    static get properties() {
        return {
            label: {
                type: String
            },

            float: {
                type: Boolean
            },

            noFloat: {
                type: Boolean,
                attribute: 'no-float'
            },

            noPlaceholder: {
                type: Boolean,
                attribute: 'no-placeholder'
            },

            // none, underline, outline, conventional
            type: {
                type: String,
                reflect: true
            },

            conventional: {
                type: Boolean
            }
        }
    }

    constructor() {
        super();
        this.label = '';
        this.float = false;
        this.noFloat = false;
        this.noPlaceholder = false;
        this.type = 'underline';
        this.conventional = false;
    }
    
    render() {
        switch (this.type) {
            case 'outline': {
                return this._renderOutline();
            }

            case 'underline': {
                return this._renderUnderline();
            }

            case 'conventional': {
                return this._renderConventional();
            }

            default: {
                return this._renderNone(); 
            }
        }
    }

    _renderConventional() {
        return html`
            <div class="container">
                <div class="conventional-container">
                    ${this.label ? html`<div class="label-conventional typography-body">${this.label}</div>` : null}
                    <div class="border-conventional"><slot></slot></div>
                </div>
            </div>
        `;
    }

    _renderOutline() {
        return html`
            <span class="container">
                <span class="border leading"></span>
                <span class="border notch" ?float="${this.float}">
                    ${this.label ? html`<span class="label ${this.float ? 'typography-caption' : 'typography-body'}" ?float="${this.float}" ?no-float="${this.noFloat}" ?no-placeholder="${this.noPlaceholder}">${this.label}</span>` : null}
                </span>
                <div class="slot-content"><slot></slot></div>
                <span class="border trailing"></span>
            </span>
        `;
    }

    _renderUnderline() {
        return html`
            <span class="container">
                <span class="border line underline" ?float="${this.float}">
                    ${this.label ? html`<span class="label ${this.float ? 'typography-caption' : 'typography-body'}" ?float-underline="${this.float}" ?no-float="${this.noFloat}" ?no-placeholder="${this.noPlaceholder}">${this.label}</span>` : null}
                </span>
                <div class="slot-content"><slot></slot></div>
            </span>
        `;
    }

    _renderNone() {
        return html`
            <span class="container">
                <span class="border line noline" ?float="${this.float}">
                    ${this.label ? html`<span class="label ${this.float ? 'typography-caption' : 'typography-body'}" ?float-underline="${this.float}" ?no-float="${this.noFloat}" ?no-placeholder="${this.noPlaceholder}">${this.label}</span>` : null}
                </span>
                <div class="slot-content"><slot></slot></div>
            </span>
        `;
    }
}

window.customElements.define('obap-input-outline', ObapInputOutline);
