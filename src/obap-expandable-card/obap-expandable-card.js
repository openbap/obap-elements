/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { body } from '../obap-styles/obap-typography.js';
import '../obap-icon/obap-icon.js';
import '../obap-collapse-container/obap-vertical-collapse-container.js'

/**
 * A Material Design card that expands to display additional content.
 */
export class ObapExpandableCard extends ObapElement {
    static get styles() {
        return [body, css`
            :host {
                --obap-expandable-card-color: var(--obap-on-surface-color, rgba(0, 0, 0, 0.87));
                --obap-expandable-card-background-color: var(--obap-surface-color, white);
                display: block;
                color: var(--obap-expandable-card-color);
                background: var(--obap-expandable-card-background-color);
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            obap-icon {
                --obap-icon-fill-color: var(-obap-expandable-card-color);
                --obap-icon-width: 20px;
                --obap-icon-height: 20px;
                margin: 0 12px;
            }

            obap-icon.chevron {
                transition: 0.25s ease-out;
                -webkit-transform: rotate(0deg);
                -moz-transform: rotate(0deg);
                transform: rotate(0deg);
            }

            obap-icon.chevron[opened] {
                -webkit-transform: rotate(180deg);
                -moz-transform: rotate(180deg);
                transform: rotate(180deg);
            }

            .title-container {
                height: 40px;
                display: flex;
                align-items: center;
                cursor: pointer;
            }

            .label {
                flex: 1;
            }
        `];
    }

    static get properties() {
        return {
            icon: {
                type: String,
                attribute: 'icon'
            },

            label: {
                type: String,
                attribute: 'label'
            },

            opened: {
                type: Boolean,
                attribute: 'opened',
                reflect: true
            },

            hideExpander: {
                type: Boolean,
                attribute: 'hide-expander',
            }
        }
    }

    constructor() {
        super();
        this.icon = '';
        this.label = '';
        this.opened = false;
        this.hideExpander = false;
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title-container" @click="${this.toggle}">
                    ${this.icon ? html`<obap-icon class="icon" icon="${this.icon}"></obap-icon>` : null}
                    <div class="label typography-body">${this.label}</div>
                    ${this.hideExpander ? null : html`<obap-icon class="chevron" ?opened="${this.opened}" icon="core:chevron-down"></obap-icon>`}
                </div>
                <obap-vertical-collapse-container ?opened="${this.opened}">
                    <slot></slot>
                </obap-vertical-collapse-container>
            </div>
        `;
    }

    toggle() {
        this.opened = !this.opened;
    }
}

window.customElements.define('obap-expandable-card', ObapExpandableCard);
