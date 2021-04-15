/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { caption } from '../obap-styles/obap-typography.js';
import '../obap-icon/obap-icon.js';
import '../obap-tooltip/obap-tooltip';

/**
 * A button for obap-toolbar.
 */
export class ObapToolbarButton extends ObapElement {
    static get styles() {
        return [caption, css`
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
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                height: 100%;
                width: 100%;
                box-sizing: border-box;
                padding: 8px;
            }

            .container[label-position="left"] {
                flex-direction: row-reverse;
            }

            .container[label-position="right"] {
                flex-direction: row;
            }

            .container[label-position="top"] {
                flex-direction: column-reverse;
            }

            .container[label-position="left"] > obap-icon {
                margin-left: 8px;
            }

            .container[label-position="right"] > obap-icon {
                margin-right: 8px;
            }

            obap-icon {
                flex: 1;
            }
        `];
    }

    static get properties() {
        return {
            label: {
                type: String
            },

            tooltip: {
                type: String
            },

            icon: {
                type: String
            },

            // left, right, top, bottom (default)
            labelPosition: {
                type: String,
                attribute: 'label-position'
            }
        }
    }

    constructor() {
        super();
        this.role = 'button';
        this.label = '';
        this.tooltip = '';
        this.icon = '';
        this.labelPosition = 'bottom'
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            if ((propName === 'label') || (propName === 'icon')) {
                this.setAttribute('aria-label', this.label ? this.label : this.icon);
            }
        });
    }
    
    render() {
        return html`
            <div class="container" label-position="${this.labelPosition}">
                ${this.icon ? html`<obap-icon icon="${this.icon}"></obap-icon>` : null}
                ${this.label ? html`<span class="typography-caption">${this.label}</span>` : null}
            </div>
            ${this.tooltip ? html`<obap-tooltip>${this.tooltip}</obap-tooltip>` : null}
        `;
    }
}

window.customElements.define('obap-toolbar-button', ObapToolbarButton);
