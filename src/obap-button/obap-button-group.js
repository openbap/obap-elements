/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapSelectorController } from '../obap-selector/obap-selector-controller.js';
import './obap-button.js';

class ObapButtonGroup extends ObapSelectorController(ObapElement) {
    static get styles() {
        return css`
            :host {
                display: block;
            }

            :host[hidden] {
                display: none;
            }
        `;
    }

    constructor() {
        super();
        this.enterSelects = true;
    }

    render() {
        return html`<slot></slot>`;
    }
}

customElements.define('obap-button-group', ObapButtonGroup);