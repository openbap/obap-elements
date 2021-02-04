/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapApplicationContentController } from './obap-application-content-controller.js';

export class ObapApplicationContent extends ObapApplicationContentController(ObapElement) {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: 100%;
            }

            .container {
                height: 100%;
            }
        `];
    }

    render() {
        return html`
            <div class="container">
                <slot></slot>
            </div>
        `;
    }
}

window.customElements.define('obap-application-content', ObapApplicationContent);