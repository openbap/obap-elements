/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapAttachedElementMixin } from '../obap-attached-element/obap-attached-element-mixin.js';

export class ObapAttachedElement extends ObapAttachedElementMixin(ObapElement) {
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
        `];
    }

    render() {
        return html`<slot></slot>`;
    }
}

window.customElements.define('obap-attached-element', ObapAttachedElement);