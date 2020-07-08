/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import { caption } from '../../src/obap-styles/obap-typography.js';

export class DemoBox extends ObapElement {
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
                color: var(--obap-text-primary-color);
            }

            .label {
                margin-top: 8px;
                line-height: auto;
                text-align: center;
            }

            .content {
                display: flex;
                justify-content: center;
                flex: 1;
            }
        `];
    }

    static get properties() {
        return {
            label: {
                type: String,
                attribute: 'label'
            }
        }
    }

    constructor() {
        super();
        this.label = '';
    }
    
    render() {
        return html`
            <div class="container">
                <div class="content"><slot></slot></div>
                ${this.label ? html`<div class="typography-caption label">${this.label}</div>` : null}
            </div>
        `;
    }
}

window.customElements.define('demo-box', DemoBox);
