/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { scaleOpacityAnimation } from '../obap-animation/obap-animation.js'; 
import './obap-backdrop.js';

/**
 * A Material Design dialog that can be modal or non-modal.
 */
export class ObapDialog extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: none;
                position: fixed;
                left: 50%;
                top: 50%;
                transform-origin: center;
                transform: translate(-50%, -50%);
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background: none;
                overflow: hidden;
                border-radius: var(--obap-border-radius-normal, 3px);
                box-sizing: border-box;
                box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
                            0 9px 46px 8px rgba(0, 0, 0, 0.12),
                            0 11px 15px -7px rgba(0, 0, 0, 0.4);
             }

            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            :host([full-screen]) {
                width: 100vw;
                height: 100vh;
                box-shadow: none;
            }

            .container {
                background: var(--obap-surface-color, #FFFFFF);
                width: 100%;
                height: 100%;
                box-sizing: border-box;
            }
        `];
    }

    get opened() {
        return this._opened;
    }

    set opened(value) {
        requestAnimationFrame(() => {
            let oldValue = this._opened;
            if (value === oldValue) return;

            this._opened = value;

            if (this.opened) {
                this._actionKey = null;
                window.addEventListener('popstate', this._boundHandleOnPopStateEvent);
                scaleOpacityAnimation(this, 0, 1, 0, 1, () => this.style.display = 'flex', null, this.animationDuration);
            } else {
                window.removeEventListener('popstate', this._boundHandleOnPopStateEvent);
                scaleOpacityAnimation(this, 1, 0, 1, 0, null, () => this.style.display = 'none', this.animationDuration);
            }

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

            this.fireMessage('obap-dialog-opened-changed', { opened: this._opened, actionKey: this._actionKey });
            this.requestUpdate('opened', oldValue);
        });
    }

    static get properties() {
        return {
            opened: {
                type: Boolean,
                reflect: true
            },

            modal: {
                type: Boolean
            },

            fullScreen: {
                type: Boolean,
                attribute: 'full-screen',
                reflect: true
            },

            noCancelOnEscKey: {
                type: Boolean,
                attribute: 'no-cancel-on-esc-key'
            },

            animationDuration: {
                type: Number,
                attribute: 'animation-duration'
            }
        }
    }

    get modal() {
        return this._modal;
    }

    set modal(value) {
        const oldValue = this.modal;

        if (oldValue !== value) {
            this._modal = value;
            this.requestUpdate('modal', oldValue);
            this.setAttribute('aria-modal', value);
        }
    }

    constructor() {
        super();
        this.role = 'dialog';
        this._opened = false;
        this._actionKey = null;
        this._backdrop = null;
        this.modal = false;
        this.fullScreen = false;
        this.noCancelOnEscKey = false;
        this.animationDuration = 280;
        this._boundHandleDocumentClickEvent = this._handleDocumentClickEvent.bind(this);
        this._boundHandleGlobalKeyPressEvent = this._handleGlobalKeyPressEvent.bind(this);
        this._boundHandleOnPopStateEvent = this._handleOnPopStateEvent.bind(this);
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
            <div class="container" @click="${this._handleClick}">
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
        if (this.modal) {
            this._backdrop = document.body.querySelector('obap-backdrop') || document.body.appendChild(document.createElement('obap-backdrop'));
            this._backdrop.animationDuration = this.animationDuration;

            requestAnimationFrame(() => {
                this.opened ? this.style.zIndex = this._backdrop.show(this) : this._backdrop.hide(this);
            });
        } else {
            this.style.zIndex = 103;
        }
    }

    _handleClick(e) {
        const path = e.composedPath();
        const endIndex = path.indexOf(this);

        for (let i = 0; i < endIndex; i++) {
            var target = path[i];

            if (target.hasAttribute && (target.hasAttribute('dialog-confirm') || target.hasAttribute('dialog-dismiss'))) {
                this.opened = false;

                if (target.hasAttribute('action-key')) {
                    this._actionKey = target.getAttribute('action-key');
                }

                e.stopPropagation();
                break;
            }
        }
    }

    _handleDocumentClickEvent(e) {
        const path = e.composedPath();

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

    _handleOnPopStateEvent(e) {
        this.opened = false;
    }
}

window.customElements.define('obap-dialog', ObapDialog);