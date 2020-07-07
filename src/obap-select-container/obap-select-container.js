/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, svg, ObapElement } from '../obap-element/obap-element.js';
import { ObapSelectController } from  './obap-select-controller.js';
/**
 * A generic popup selection container.
 */
export class ObapSelectContainer extends ObapSelectController(ObapElement) {
    static get styles() {
        return [css`
            :host {
                --obap-select-color: var(--obap-text-primary-color, rgba(0, 0, 0, 0.87));
                --obap-select-background-color: var(--obap-surface-color, #FFFFFF);
                --obap-select-border-color: var(--obap-divider-on-surface-color, rgba(0, 0, 0, 0.20));
                --obap-select-fill-color: #FAFAFA;

                display: block;
                color: var(--obap-select-color);
                background: var(--obap-select-background-color);
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            :host([border-style="outline"]) {
                border: 1px solid var(--obap-select-border-color);
                border-radius: 3px;
            }

            :host([border-style="underline"]) {
                border-bottom: 1px solid var(--obap-select-border-color);
            }

            :host([filled]) {
                background: var(--obap-select-fill-color);
            }

            svg {
                fill: var(--obap-text-icon-color, rgba(0, 0, 0, 0.38));
            }

            .container {
                position: relative;
            }

            .selected-container {
                display: flex;
                align-items: center;
                cursor: pointer;
            }

            .selected-content {
                flex: 1;
                margin: 0 8px;
            }

            .selection-content {
                position: absolute;
                z-index: 2;
                background: aqua;
                left: 0;
                top: 100%;
                min-width: 100%;
                display: none;
                box-sizing: border-box;
                padding: 4px 8px;
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
        `];
    }

    static get properties() {
        return {
            
        }
    }

    constructor() {
        super();
        this._boundHandleWindowClickEvent = this._handleWindowClickEvent.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('click', this._boundHandleWindowClickEvent);
    }

    disconnectedCallback() {
        window.removeEventListener('click', this._boundHandleWindowClickEvent);
        super.disconnectedCallback();
    }

    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);

    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            //
        });
    }

    render() {
        return html`
            <div class="container">
                <div class="selected-container" @click="${this._openContent}">
                    <div class="selected-content"><slot name="selected"></slot></div>
                    <div class="icon">
                        <svg ?opened="${this.opened}" viewBox="0 0 24 24"><g><path d="M7 10l5 5 5-5z"/></g></svg>
                    </div>
                </div>
                
                <div id="selection-content" class="selection-content" ?opened="${this.opened}" @click="${this._handleContentClick}">
                    <slot></slot>
                </div>
            </div>`;
    }

    _openContent(e) {
        e.preventDefault();
        e.stopPropagation();
        this.opened = !this.opened;

        if (this.opened) {
            requestAnimationFrame(() => this.renderRoot.getElementById('selection-content').focus());
        }
        
    }

    _handleContentClick(e) {
        //e.stopPropagation();
    }

    _handleWindowClickEvent(e) {
        if (this.opened) {
           this.opened = false;
            //console.log(e.target);
        }
    }
}

window.customElements.define('obap-select-container', ObapSelectContainer);
