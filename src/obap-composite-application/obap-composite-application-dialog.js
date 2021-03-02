/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { title } from '../obap-styles/obap-typography';
import '../obap-button/obap-button.js';
import '../obap-dialog/obap-dialog.js';

export class ObapCompositeApplicationDialog extends ObapElement {
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

            iframe {
                padding: 0;
                margin: 0;
                border: none;
                width: 300px;
                height: 200px;
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

            actions: {
                type: Array
            },

            content: {
                type: String
            },

            dialogId: {
                type: String,
                attribute: 'dialog-id',
                reflect: true
            },

            correlationId: {
                type: String,
                attribute: 'correlation-id',
            },

            initiatorId: {
                type: String,
                attribute: 'initiator-id',
            },

            contentWidth: {
                type: String,
                attribute: 'content-width'
            },

            contentHeight: {
                type: String,
                attribute: 'content-height'
            },

            customData: {
                type: Object
            }
        }
    }

    constructor() {
        super();
    
        this.opened = false;
        this.caption = '';
        this.actions = [];
        this.content = null;
        this._lastActionKey = null;
        this.dialogId = '';
        this.correlationId = '';
        this.initiatorId = ''; 
        this.contentWidth = '0px';
        this.contentHeight = '0px';
        this.customData = null;
    }

    onDismiss(callback = null) {
        this._dismissCallback = callback;
        return this;
    }

    open() {
        this.opened = true;
    }

    close() {
        this.opened = false;
    }

    render() {
        return html`
            <obap-dialog ?hidden="${!this.opened}" ?opened="${this.opened}" modal @obap-dialog-opened-changed="${this._openChanged}">
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
        return html`
            <div class="content">
                ${this.content ? html`<iframe style="width: ${this.contentWidth}; height: ${this.contentHeight};" title="${this.caption}" id="contentFrame" src="${this.content}"></iframe>` : null}
            </div>
        `;
    }

    _renderActions() {
        return (this.actions && this.actions.length > 0) ? html`
            <div class="actions">
                ${this.actions.map(action => html`
                    <obap-button @click="${this._onAction}" label="${action.label}" ?raised="${action.raised}" action-key="${action.key}" ?highlight="${action.highlight}" ?dialog-dismiss="${action.dismiss}" class="action"></obap-button>
                `)}
            </div>
        ` : null;
    }

    _openChanged(e) {
        this.opened = e.detail.opened; 

        if (!this.opened) {
            if (this._dismissCallback) {
                this._dismissCallback(this._lastActionKey);
            }
            
            this.actions = [];
            this._dismissCallback = null;
        }
    }

    _onAction(e) {
        const el = e.target;

        if (el.hasAttribute('action-key')) {
            const key = el.getAttribute('action-key');
            this._lastActionKey = key;

            if (!el.hasAttribute('dialog-dismiss')) {
                if (this.sendActionKeyPress) {
                    this.sendActionKeyPress(key);
                }
            }
        }
    }
}

window.customElements.define('obap-composite-application-dialog', ObapCompositeApplicationDialog);
