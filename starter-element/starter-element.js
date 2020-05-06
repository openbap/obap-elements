/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../src/obap-element/obap-element.js';

export class ObapStarterElement extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }
        `];
    }

    static get properties() {
        return {

        }
    }

    constructor() {
        super();
    
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
        return html`<div class="container">starter-element</div>`;
    }
}

window.customElements.define('starter-element', ObapStarterElement);
