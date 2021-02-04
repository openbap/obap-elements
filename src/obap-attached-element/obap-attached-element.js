/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapAttachedElementController } from './obap-attached-element-controller.js';

export class ObapAttachedElement extends ObapAttachedElementController(ObapElement) {
    static get styles() {
        return [css`
            :host {
                display: block;
                position: absolute;
                user-select: none;
            }

            :host([hidden]) {
                display: none !important;
            }

            :host([disabled]) {
                pointer-events: none;
            }

            :host([anchor="none"]) {
                position: inherit;
            }
        `];
    }

    render() {
        return html`<slot></slot>`;
    }
}

window.customElements.define('obap-attached-element', ObapAttachedElement);