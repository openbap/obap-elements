/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapThemeController } from './obap-theme-controller.js';

export class ObapTheme extends ObapThemeController(ObapElement) {
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
    
    render() {
        return html`<slot></slot>`;
    }
}

window.customElements.define('obap-theme', ObapTheme);
