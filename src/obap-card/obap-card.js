/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { title, subtitle, body } from '../obap-styles/obap-typography.js';
import '../obap-material/obap-material.js';

export class ObapCard extends ObapElement {
    static get styles() {
        return [title, subtitle, body, css`
            :host {
                --obap-card-outline-color: var(--obap-divider-on-surface-color, rgba(0, 0, 0, 0.20));
                display: block;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            obap-material {
                padding: 0;
                height: 100%;
                border-radius: 3px;
                box-sizing: border-box;
                background: var(--obap-surface-color, white);
            }

            obap-material[outlined] {
                border: 1px solid var(--obap-card-outline-color);
            }

            .container {
                height: 100%;
                display: flex;
                flex-direction: column;
            }

            .container > * {
                margin: 8px 16px 0 16px;
            }

            .title {
                color: var(--obap-text-primary-color, rgba(0, 0, 0, 0.87));
            }

            .subtitle {
                color: var(--obap-text-secondary-color, rgba(0, 0, 0, 0.54));
            }

            .content {
                flex: 1;
                color: var(--obap-text-secondary-color, rgba(0, 0, 0, 0.54));
            }
            
            .actions {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: stretch;
                margin-left: 8px;
                margin-right: 8px;
            }

            .action-slot {
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            .action-slot > ::slotted(*) {
                margin-right: 8px;
            }

            .action-slot > ::slotted(*:last-child) {
                margin-right: 0;
            }

            .container > :last-child {
                margin-bottom: 8px;
            }

            .container > :first-child {
                margin-top: 16px;
            }

            .media {
                margin-left: 0;
                margin-right: 0;
            }

            .media:first-child {
                margin-top: 0 !important;
            }
        `];
    }

    static get properties() {
        return {
            elevated: {
                type: Boolean,
                attribute: 'elevated'
            },

            outlined: {
                type: Boolean,
                attribute: 'outlined'
            },

            heading: {
                type: String,
                attribute: 'heading'
            },

            subHeading: {
                type: String,
                attribute: 'sub-heading'
            }
        }
    }

    constructor() {
        super();
        this.heading = '';
        this.subHeading = '';
        this.elevated = false;
        this.outlined = false;
    }

    render() {
        return html`
            <obap-material elevation="${this.elevated ? 1 : 0}" ?outlined="${this.outlined}">
                <div class="container">
                    ${this.heading ? html`<div class="title typography-title">${this.heading}</div>` : null}
                    ${this.subHeading ? html`<div class="subtitle typography-subtitle">${this.subHeading}</div>` : null}
                    <div class="media"><slot name="media"></slot></div>
                    <div class="content typography-body"><slot></slot></div>
                    <div class="actions">
                        <div class="action-slot"><slot name="action-left"></slot></div>
                        <div class="action-slot"><slot name="action-right"></slot></div>
                    </div>
                </div>
            </obap-material>
        `;
    }
}

window.customElements.define('obap-card', ObapCard);
