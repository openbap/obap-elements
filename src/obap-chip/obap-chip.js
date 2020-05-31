/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, svg, ObapElement } from '../obap-element/obap-element.js';
import { body } from '../obap-styles/obap-typography.js';
import '../obap-icon/obap-icon.js';
/**
 * A Material Design chip element.
 */
export class ObapChip extends ObapElement {
    static get styles() {
        return [body, css`
            :host {
                --obap-chip-color: var(--obap-text-secondary-color, rgba(0, 0, 0, 0.54));
                --obap-chip-background-color: var(--obap-block-color, #ECECEC);

                --obap-chip-selected-color: var(--obap-on-primary-color, #FFFFFF);
                --obap-chip-selected-background-color: var(--obap-primary-light-color, #5d638f);

                display: inline-block;
                height: 24px;
                border-radius: 12px;
                color: var(--obap-chip-color);
                background: var(--obap-chip-background-color);
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            :host([toggle]) {
                cursor: pointer;
            }

            :host([selected]) {
                color: var(--obap-chip-selected-color);
                background: var(--obap-chip-selected-background-color);
            }

            obap-icon {
                --obap-icon-width: 16px;
                --obap-icon-height: 16px;
            }

            .container {
                display: inline-flex;
                flex-direction: row;
                justify-content: center;
                align-content: center;
                align-items: center;
                box-sizing: border-box;
                min-width: 64px;
                height: 24px;
                padding: 4px 6px;
            }

            .label {
                margin: 0 6px;
            }

            .icon {
                width: 16px;
                height: 16px;
                user-select: none;
                fill: var(--obap-chip-color);
                cursor: pointer;
            }

            :host([selected]) * > .icon {
                fill: var(--obap-chip-selected-color);
            }
        `];
    }

    static get properties() {
        return {
            /**
            * The text to display in button.
            */
            label: {
                type: String,
                attribute: 'label'
            },

            /**
             * The icon to display in the button (to the left of the label).
             */
            icon: {
                type: String,
                attribute: 'icon'
            },

            /**
             * Whether or not the chip has a remove icon.
             */
            removable: {
                type: Boolean,
                attribute: 'removable'
            },

            /**
             * Whether or not the chip behaves as a toggle.
             */
            toggle: {
                type: Boolean,
                attribute: 'toggle',
                reflect: true
            },

            /**
             * Whether or not the chip is selected, if it's a toggle chip.
             */
            selected: {
                type: Boolean,
                attribute: 'selected',
                reflect: true
            },

            /**
             * Whether or not to display a check icon, if it's a toggle chip.
             */
            showCheck: {
                type: Boolean,
                attribute: 'show-check',
                reflect: true
            }
        }
    }

    constructor() {
        super();
        this.icon = '';
        this.label = '';
        this.removable = false;
        this.toggle = false;
        this.selected = false;
        this.showCheck = false;
    }

    connectedCallback() {
        super.connectedCallback();

    }

    disconnectedCallback() {

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
            <div class="container typography-body" @click="${this._onClickhandler}">
                ${this._getLeftIcon(this.icon, this.toggle, this.selected, this.showCheck)}
                <div class="label">${this.label}</div>
                ${this._getRightIcon(this.removable)}
            </div>
        `;
    }

    _getLeftIcon(icon, toggle, selected, showCheck) {
        if (toggle && selected && showCheck) {
            return html`<div class="icon"><svg viewBox="0 0 24 24"><g><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></g></svg></div>`
        }
        return icon ? html`<obap-icon icon="${icon}"></obap-icon>` : null;
    }

    _getRightIcon(removable) {
        return removable ? html`<div class="icon" @click="${this._onRemoveClickHandler}"><svg viewBox="0 0 24 24"><g><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></g></svg></div>` : null;
    }

    _onRemoveClickHandler(e) {
        e.preventDefault();

        const event = new CustomEvent('obap-chip-remove', {
            detail: {
                item: this
            },
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(event);
    }

    _onClickhandler(e) {
        e.preventDefault();

        if (this.toggle) {
            this.selected = !this.selected;
        }
        
        const event = new CustomEvent('obap-chip-click', {
            detail: {
                selected: this.selected
            },
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(event);
    }
}

window.customElements.define('obap-chip', ObapChip);

// <g id="check"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></g>

// <g id="cancel"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></g>
