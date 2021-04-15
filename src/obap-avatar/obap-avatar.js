/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';

export class ObapAvatar extends ObapElement {
    static get styles() {
        return [css`
            :host {
                --obap-avatar-size: 40px;
                --obap-avatar-background-color: var(--obap-text-icon-color, rgba(0, 0, 0, 0.38));
                display: block;
                overflow: hidden;
                border-radius: var(--obap-border-radius-circle, 50%);
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                width: var(--obap-avatar-size, 40px);
                height: var(--obap-avatar-size, 40px);
                background-color: var(--obap-avatar-background-color);
            }

            img {
                width: 100%;
                height: 100%;
            }
        `];
    }

    static get properties() {
        return {
            src: {
                type: String
            }
        }
    }

    constructor() {
        super();
        this.src = '';
    }
    
    render() {
        return html`<div class="container">
            ${this.src ? html`<img src="${this.src}"/>` : null}
        </div>`;
    }
}

window.customElements.define('obap-avatar', ObapAvatar);
