/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';

/**
 * A Material Design desktop date-time picker.     
 */
export class ObapDateTimePicker extends ObapElement {
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
        return html`<div class="container">obap-date-time-picker</div>`;
    }
}

window.customElements.define('obap-date-time-picker', ObapDateTimePicker);
