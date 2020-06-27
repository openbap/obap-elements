/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { elevation24 } from '../obap-styles/obap-elevation.js';
import './obap-backdrop.js';

/**
 * A Material Design dialog that can be modal or non-modal.
 */
export class ObapDialog extends ObapElement {
    static get styles() {
        return [elevation24, css`
            :host {
                display: none;
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background: none;
            }

            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            :host([opened]) {
                display: flex;
            }

            .container {
                background: white;
            }
        `];
    }

    get opened() {
        return this._opened;
    }

    set opened(value) {
        let oldValue = this._opened;

        requestAnimationFrame(() => {
            this._opened = value;
            this.requestUpdate('opened', oldValue);

            if (!this.modal) {
                if (this._opened) {
                    window.addEventListener('click', this._boundHandleDocumentClickEvent, false);
                } else {
                    window.removeEventListener('click', this._boundHandleDocumentClickEvent);
                }
            }

            if (!this.noCancelOnEscKey) {
                if (this._opened) {
                    window.addEventListener('keydown', this._boundHandleGlobalKeyPressEvent, false);
                } else {
                    window.removeEventListener('keydown', this._boundHandleGlobalKeyPressEvent);
                }
            }

            let event = new CustomEvent('obap-dialog-opened-changed', {
                detail: {
                    opened: this._opened
                },
                bubbles: true,
                composed: true
            });

            this.dispatchEvent(event);
        });
    }

    static get properties() {
        return {
            opened: {
                type: Boolean,
                attribute: 'opened',
                reflect: true
            },

            modal: {
                type: Boolean,
                attribute: 'modal'
            },

            noCancelOnEscKey: {
                type: Boolean,
                attribute: 'no-cancel-on-esc-key'
            }
        }
    }

    constructor() {
        super();
        this._opened = false;
        this._backdrop = null;
        this.modal = false;
        this.noCancelOnEscKey = false;
        this._boundHandleDocumentClickEvent = this._handleDocumentClickEvent.bind(this);
        this._boundHandleGlobalKeyPressEvent = this._handleGlobalKeyPressEvent.bind(this);
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            if ((propName === 'opened') && (oldValue !== this.opened)) {
                this._updateBackdrop();
            }
        });
    }

    render() {
        return html`
            <div class="container elevation-24" @click="${this._handleClick}">
                <slot></slot>
            </div>       
        `;
    }

    open() {
        this.opened = true;
    }

    close() {
        this.opened = false;
    }

    _updateBackdrop() {
        this._backdrop = document.body.querySelector('obap-backdrop') || document.body.appendChild(document.createElement('obap-backdrop'));

        requestAnimationFrame(() => {
            this.opened ? this.style.zIndex = this._backdrop.show(this) : this._backdrop.hide(this);
        });
    }

    _handleClick(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        const endIndex = path.indexOf(this);

        for (let i = 0; i < endIndex; i++) {
            var target = path[i];

            if (target.hasAttribute && (target.hasAttribute('dialog-confirm') || target.hasAttribute('dialog-dismiss'))) {
                this.opened = false;
                e.stopPropagation();
                break;
            }
        }
    }

    _handleDocumentClickEvent(e) {
        const path = e.path || (e.composedPath && e.composedPath());

        if (path.indexOf(this) === -1) {
            this.opened = false;
            e.stopPropagation();
        }
    }

    _handleGlobalKeyPressEvent(e) {
        if ((e.key === 'Escape') && (this._backdrop) && (this._backdrop.isOnTop(this))) {
            this.opened = false;
            e.stopImmediatePropagation();
        }
    }
}

window.customElements.define('obap-dialog', ObapDialog);