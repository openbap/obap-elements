/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';

export class ObapCompositeApplicationHost extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: 100%;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                height: 100%;
                display: flex;
                flex-direction: column;
            }

            iframe {
                flex: 1;
                border: none;
            }
        `];
    }

    static get properties() {
        return {
            url: {
                type: String
            },

            caption: {
                type: String
            },

            load: {
                type: Boolean
            },

            hostId: {
                type: String,
                attribute: 'host-id'
            }
        }
    }

    get load() {
        return this._load;
    }

    set load(value) {
        // Don't do anything if already loaded.
        if (!this._load) {
            const oldValue = this.load;
            this._load = value;
            this.requestUpdate('load', oldValue);
        }
    }

    constructor() {
        super();
    
        this.url = '';
        this._load = false;
        this.hostId = '';
        this.caption = '';
    }
    
    render() {
        return html`
            <div class="container">
                ${this.load ? html`<iframe style="visibility:hidden;" onload="this.style.visibility = 'visible';" src="${this.url}" title="${this.caption}"></iframe>` : null}
            </div>
        `;
    }
}

window.customElements.define('obap-composite-application-container', ObapCompositeApplicationHost);
