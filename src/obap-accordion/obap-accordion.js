/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapMultiSelectorController } from '../obap-selector/obap-multi-selector-controller.js';
import '../obap-expandable-card/obap-expandable-card.js';
/**
 * An expandable card list.
 */
export class ObapAccordion extends ObapMultiSelectorController(ObapElement) {
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

    constructor() {
        super();
        this.selectedAttribute = 'open';
    }
    
    render() {
        return html`<slot></slot>`;
    }
}

window.customElements.define('obap-accordion', ObapAccordion);
