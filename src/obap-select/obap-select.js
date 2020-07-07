/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapSelectController } from  '../obap-select-container/obap-select-controller.js';
import '../obap-select-container/obap-select-container.js';

/**
 * A single option dropdown selector.
 */
export class ObapSelect extends ObapSelectController(ObapElement) {
    static get styles() {
        return [css`
            :host {
                display: inline-block;
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
        return html`<div class="container">
            <obap-select-container id="select-container" label="${this.label}" border-style="${this.borderStyle}" ?filled="${this.filled}" 
                                   ?float-label="${this.floatLabel}" ?opened="${this.opened}">
                <div slot="selected">obap-select</div>
                <div @click="${this._handleItemClick}">items</div>
            </obap-select-container>
        </div>`;
    }

    _handleItemClick(e) {
        e.stopPropagation();
        console.log('XXX');

        const container = this.renderRoot.getElementById('select-container');
        container.opened = false;
    }
}

window.customElements.define('obap-select', ObapSelect);
