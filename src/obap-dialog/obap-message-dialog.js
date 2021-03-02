/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { title } from '../obap-styles/obap-typography';
import '../obap-button/obap-button.js';
import './obap-dialog.js';

/**
 * A Material Design dialog for displaying simple messages and options.
 */
export class ObapMessageDialog extends ObapElement {
    static get styles() {
        return [title, css`
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
            }

            .caption {
                padding: 16px;
            }

            .content {
                flex: 1;
                padding: 0 16px 24px 16px;
            }

            .actions {
                display: flex;
                flex-direction: row-reverse;
                padding: 0 16px 16px 16px;
            }

            .action {
                margin-left: 4px;
            }

            .action[highlight] {
                --obap-button-ripple-color: var(--obap-on-primary-color, #FFFFFF);
                --obap-button-color: var(--obap-on-primary-color, #FFFFFF);
                --obap-button-background-color: var(--obap-primary-color, #5c6bc0);
            }
        `];
    }

    static get properties() {
        return {
            opened: {
                type: Boolean
            },

            caption: {
                type: String
            },

            message: {
                type: String
            },

            actions: {
                type: Array
            }
        }
    }

    constructor() {
        super();
        this.opened = false;
        this.caption = '';
        this.message = '';
        this.actions = [];
    }

    open() {
        this.opened = true;
    }

    close() {
        this.opened = false;
    }

    render() {
        return html`
            <obap-dialog modal ?opened="${this.opened}">
                <div class="container">
                    ${[this._renderCaption(), this._renderContent(), this._renderActions()]}
                </div>
            </obap-dialog>
        `;
    }

    _renderCaption() {
        return this.caption ? html`
            <div class="caption typography-title">${this.caption}</div>
        ` : null;
    }

    _renderContent() {
        return this.message ? html`
            <div class="content">${this.message} </div>
        ` : null;
    }

    _renderActions() {
        return (this.actions && this.actions.length > 0) ? html`
            <div class="actions">
                ${this.actions.map(action => html`
                    <obap-button @click="${this._onAction}" label="${action.label}" ?raised="${action.raised}" action-key="${action.key}" ?highlight="${action.highlight}" dialog-dismiss class="action"></obap-button>
                `)}
            </div>
        ` : null;
    }

    _onAction(e) {
        const el = e.target;
        
        this.close();

        if (el.hasAttribute('action-key')) {
            const key = el.getAttribute('action-key');
            this.fireMessage('obap-message-dialog-action', { action: key });
        }
    }
}

window.customElements.define('obap-message-dialog', ObapMessageDialog);
