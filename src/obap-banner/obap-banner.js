/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { body } from '../obap-styles/obap-typography.js';
import '../obap-icon/obap-icon.js';
import '../obap-button/obap-button.js';

/**
 * A Material Design banner/jumbotron element.
 */
export class ObapBanner extends ObapElement {
    static get styles() {
        return [body, css`
            :host {
                --obap-banner-icon-color : var(--obap-text-icon-color, rgba(0, 0, 0, 0.38));
                display: block;
                width: 100%;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            obap-button {
                color: var(--obap-primary-color, #5c6bc0);
            }

            obap-icon {
                --obap-icon-width: 32px;
                --obap-icon-height: 32px;
                --obap-icon-fill-color: var(--obap-banner-icon-color);
                margin: 4px 24px 0 0;
            }

            .container {
                display: flex;
                flex-direction: column;
                padding: 16px 16px 0 16px;
            }

            .content {
                flex: 1;
                display: flex;
            }

            .actions {
                display: flex;
                justify-content: flex-end;
                margin: 8px -8px 8px 8px;
            }

            .text {
                flex: 1;
                color: var(--obap-text-primary-color, rgba(0, 0, 0, 0.87));
            }
        `];
    }

    static get properties() {
        return {
            icon: {
                type: String,
                attribute: 'icon'
            },

            confirmAction: {
                type: String,
                attribute: 'confirm-action'
            },

            dismissAction: {
                type: String,
                attribute: 'dismiss-action'
            }
        }
    }

    constructor() {
        super();
        this.role = 'banner';
        this.icon = '';
        this.confirmAction = '';
        this.dismissAction = '';
    }

    render() {
        return html`
            <div class="container">
                <div class="content">
                    ${this.icon ? html`<obap-icon icon="${this.icon}"></obap-icon>` : null}
                    <div class="text typography-body"><slot></slot></div>
                </div>
                ${this._renderActions()}
            </div>
        `;
    }

    _renderActions() {
        if (this.confirmAction || this.dismissAction) {
            return html`
                <div class="actions">
                    ${this.dismissAction ? html`<obap-button label="${this.dismissAction}" @click="${() => this.fireMessage('obap-banner-dismiss')}"></obap-button>` : null}
                    ${this.confirmAction ? html`<obap-button label="${this.confirmAction}" @click="${() => this.fireMessage('obap-banner-confirm')}"></obap-button>` : null}
                </div>
            `;
        }

        return null;
    }
}

window.customElements.define('obap-banner', ObapBanner);
