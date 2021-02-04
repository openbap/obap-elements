/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import { body } from '../../src/obap-styles/obap-typography.js';
import  '../../src/obap-material/obap-material.js';
import  './demo-box.js';

export class DemoPanel extends ObapElement {
    static get styles() {
        return [body, css`
            :host {
                --demo-panel-padding: 8px;
                display: block;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                padding: var(--demo-panel-padding);
                color: var(--obap-text-primary-color);
                background: var(--obap-surface-color);
            }

            .label {
                margin-bottom: 8px;
                font-weight: 500;
            }

            .content {
                flex: 1;
                width: 100%;
            }
        `];
    }

    static get properties() {
        return {
            label: {
                type: String,
                attribute: 'label'
            },

            elevation: {
                type: Number,
                attribute: 'elevation'
            }
        }
    }

    constructor() {
        super();
        this.label = '';
        this.elevation = 1;
    }
    
    render() {
        return html`
            <obap-material class="container" elevation="${this.elevation}">
                ${this.label ? html`<div class="typography-body label">${this.label}</div>` : null}
                <div class="content"><slot></slot></div>
            </obap-material>
        `;
    }
}

window.customElements.define('demo-panel', DemoPanel);
