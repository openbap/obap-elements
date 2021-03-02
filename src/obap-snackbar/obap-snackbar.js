/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { elevation4 } from '../obap-styles/obap-elevation.js';
import { body } from '../obap-styles/obap-typography.js';
import '../obap-button/obap-button.js';

window._obapSnackbarQueue = window._obapSnackbarQueue || [];

window.obapSnackbarEnqueue = window.obapSnackbarEnqueue || function(el) {
    window._obapSnackbarQueue.push(el);

    if (window._obapSnackbarQueue.length > 0) {
        window._obapSnackbarQueue[0]._show();
    }
}

window.obapSnackbarDequeue = window.obapSnackbarDequeue || function(el) {
    const index = window._obapSnackbarQueue.indexOf(el);

    if (index !== -1) {
        window._obapSnackbarQueue.splice(index, 1);
    }

    if (window._obapSnackbarQueue.length > 0) {
        window._obapSnackbarQueue[0]._show();
    }
}

/**
 * A popup toast notification element.
 */
export class ObapSnackbar extends ObapElement {
    static get styles() {
        return [body, elevation4, css`
            :host {
                /* --obap-snackbar-action-color */
                display: block;
                position: fixed;
                bottom: 0%;
                left: 50%;
                transform: translate(-50%, -24px);
                z-index: 100;
                opacity: 0;
                transition: opacity 0.6s;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            :host([open]) {
                opacity: 1;
            }

            .container {
                height: 100%;
                min-height: 48px;
                max-width: calc(100vw - 48px);
                display: flex;
                align-items: center;
                background: var(--obap-notification-color, #323232);
                color: var(--obap-on-notification-color, rgba(255, 255, 255, 0.87));
                border-radius: 5px;
                padding: 8px 16px;
                box-sizing: border-box;
            }

            obap-button {
                margin-left: 16px;
                margin-right: -8px;
                --obap-button-background-color: transparent;
                --obap-button-color: var(--obap-snackbar-action-color, #FFEB3B);
                --obap-button-ripple-color: var(--obap-snackbar-action-color, #FFEB3B);
            }

            .message {
                flex: 1;
            }
        `];
    }

    static get properties() {
        return {
            open: {
                type: Boolean,
                reflect: true
            },

            message: {
                type: String
            },

            timeout: {
                type: Number
            },

            action: {
                type: String
            },

            removed: {
                type: Boolean
            }
        }
    } 

    get open() {
        return this._open;
    }

    get removed() {
        return this._removed;
    }

    constructor() {
        super();
        this._open = false;
        this.message = '';
        this.action = '';
        this.timeout = 4000;
        this._removed = true;
    }

    show() {
        window.obapSnackbarEnqueue(this);
    }

    _show() {
        if (!this.open) {
            this._open = true;
            this._removed = false;
            this.requestUpdate('open', false);
            this.requestUpdate('removed', true);

            if (!this.action) {
                setTimeout(() => {
                    this.hide();
                }, this.timeout);
            }
        }
    }

    hide() {
        if (this.open) {
            this._open = false;
            this.requestUpdate('open', true);

            setTimeout(() => {
                this._removed = true;
                this.requestUpdate('removed', false);
                window.obapSnackbarDequeue(this);
                this.fireMessage('obap-snackbar-dismissed', null);
            }, 600);
        }
    }
    
    render() {
        if (!this.removed) {
            return html`
                <div class="container elevation-4">
                    <div class="message typography-body">${this.message}</div>
                    ${this.action ? html`<obap-button @click="${this._onActionClick}" label="${this.action}"></obap-button>` : null}
                </div>
            `;
        }

        return null;
    }

    _onActionClick(e) {
        this.hide();
        
    }
}

window.customElements.define('obap-snackbar', ObapSnackbar);