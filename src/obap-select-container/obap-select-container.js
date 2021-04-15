/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, svg, ObapElement } from '../obap-element/obap-element.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { ObapSelectController } from './obap-select-controller.js';
import { body, caption } from '../obap-styles/obap-typography.js';
import '../obap-icon/obap-icon.js';
/**
 * A generic popup selection container.
 */
export class ObapSelectContainer extends ObapSelectController(ObapElement) {
    static get styles() {
        return [body, caption, css`
            :host {
                --obap-select-color: var(--obap-text-primary-color, rgba(0, 0, 0, 0.87));
                --obap-select-background-color: var(--obap-surface-color, #FFFFFF);
                --obap-select-border-color: var(--obap-divider-on-surface-color, rgba(0, 0, 0, 0.20));
                --obap-select-active-border-color: var(--obap-primary-color, #5c6bc0);
                --obap-select-border-size: 1px;
                --obap-select-active-border-size: 1px;

                display: block;
                color: var(--obap-select-color);
                background: var(--obap-select-background-color);
                outline: 0;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            :host(:focus) {
                --obap-select-border-color: var(--obap-select-active-border-color);
                --obap-select-border-size: var(--obap-select-active-border-size);
            }

            .selected-container[border-style="outline"] {
                border: var(--obap-select-border-size) solid var(--obap-select-border-color);
                border-radius: var(--obap-border-radius-normal, 3px);
            }

            .selected-container[border-style="underline"] {
                border-bottom: var(--obap-select-border-size) solid var(--obap-select-border-color);
            }

            svg {
                fill: var(--obap-text-icon-color, rgba(0, 0, 0, 0.38));
            }

            :host(:focus)  * > svg {
                fill: var(--obap-select-active-border-color);
            }

            :host(:focus) * > .floated {
                color: var(--obap-select-active-border-color);
            }

            .container {
                position: relative;
                height: 100%;
            }

            .selected-container {
                position: relative;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                height: 100%;
                cursor: pointer;
            }

            .selected-content {
                flex: 1;
                margin: 0 8px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }

            .selection-content {
                position: absolute;
                z-index: 2;
                left: 0;
                top: calc(100% + 2px);
                min-width: 100%;
                display: none;
                box-sizing: border-box;

                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                            0 1px 5px 0 rgba(0, 0, 0, 0.12),
                            0 3px 1px -2px rgba(0, 0, 0, 0.2);
            }

            .selection-content[opened] {
                display: block;
            }

            .icon {
                width: 24px;
                height: 24px;
            }

            obap-icon {
                --obap-icon-fill-color: var(--obap-text-icon-color, rgba(0, 0, 0, 0.38));
                --obap-icon-width: 14px;
                --obap-icon-height: 14px;
                margin-left: 8px;
            }

            :host(:focus)  * > obap-icon {
                --obap-icon-fill-color: var(--obap-select-active-border-color);
            }

            svg {
                transition: 0.15s ease-out;
                -webkit-transform: rotate(0deg);
                -moz-transform: rotate(0deg);
                transform: rotate(0deg);
            }

            svg[opened] {
                -webkit-transform: rotate(180deg);
                -moz-transform: rotate(180deg);
                transform: rotate(180deg);
            }

            .floating-label {
                position: absolute;
                left: 4px;
                top: 50%;
                transform: translate(0, -50%);
                padding: 0 4px;
                pointer-events: none;
                color: var(--obap-text-secondary-color, rgba(0, 0, 0, 0.54));
                background: var(--obap-select-background-color);
                transition: top 0.15s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .floated {
                top: -2px;
                width: auto;
                font-weight: 500;
                line-height: 11px;
            }

            .float-icon {
                left: 24px;
            }
        `];
    }

    constructor() {
        super();
        this.tabIndex = 0;
        this._boundHandleGlobalKeyPressEvent = this._handleGlobalKeyPressEvent.bind(this);
        this._boundCloseOnEvent = this._closeOnEvent.bind(this);
        this.addEventListener('blur', this._boundCloseOnEvent);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('click', this._boundCloseOnEvent);
        window.addEventListener('keydown', this._boundHandleGlobalKeyPressEvent, false);
    }

    disconnectedCallback() {
        window.removeEventListener('click', this._boundCloseOnEvent);
        window.removeEventListener('keydown', this._boundHandleGlobalKeyPressEvent);
        super.disconnectedCallback();
    }

    render() {
        return html`
            <div class="container">
                <div class="selected-container" border-style="${this.borderStyle}" @click="${this._openContent}">
                    ${this.icon ? html`<obap-icon icon="${this.icon}"></obap-icon>` : null}
                    <div class="selected-content">${this.value}</div>
                    <div class="icon">
                        <svg ?opened="${this.opened}" viewBox="0 0 24 24"><g><path d="M7 10l5 5 5-5z"/></g></svg>
                    </div>
                    ${this._renderLabel()}
                    <input hidden aria-hidden="true" type="text" aria-autocomplete="none" aria-controls="selection-content" aria-label="${this.label ? this.label : 'Select'}">
                </div>

                <div id="selection-content" class="selection-content" ?opened="${this.opened}">
                    <slot></slot>
                </div>
            </div>`;
    }

    _renderLabel() {
        if ((this.noFloatLabel && this.value) || !this.label) return null;
        
        let classes = { 'floating-label': true, floated: this.value, 'typography-caption': this.value, 'typography-body': !this.value, 'float-icon': (!this.value && this.icon) };

        return html`
            <div class=${classMap(classes)}>${this.label}</div>
        `;
    }

    _openContent(e) {
        e.preventDefault();
        e.stopPropagation();
        this.opened = !this.opened;

        if (this.opened) {
            requestAnimationFrame(() => this.renderRoot.getElementById('selection-content').focus());
        }
    }

    _closeOnEvent(e) {
        if (this.opened) {
            this.opened = false;
        }
    }

    _handleGlobalKeyPressEvent(e) {
        switch (e.key) {
            case 'Escape': {
                if (this.opened) {
                    this.opened = false;
                    e.stopImmediatePropagation();

                    break;
                }
            }

            case 'ArrowDown': {
                const path = e.composedPath();

                if (path.indexOf(this.getRootNode().host) > -1) {
                    if (this.opened) {
                        this.fireMessage('obap-select-action', { action: 'move-down' });
                    } else {
                        this.opened = true;
                    }

                    e.stopImmediatePropagation();
                }

                break;
            }

            case 'ArrowUp': {
                const path = e.composedPath();

                if (path.indexOf(this.getRootNode().host) > -1) {
                    if (this.opened) {
                        this.fireMessage('obap-select-action', { action: 'move-up' });
                    }

                    e.stopImmediatePropagation();
                }

                break;
            }

            case 'Enter': {
                const path = e.composedPath();

                if (path.indexOf(this.getRootNode().host) > -1) {
                    if (this.opened) {
                        this.fireMessage('obap-select-action', { action: 'select' });
                        this.opened = false;
                    }

                    e.stopImmediatePropagation();
                }

                break;
            }
        }
    }
}

window.customElements.define('obap-select-container', ObapSelectContainer);
