/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, LitElement } from 'lit-element';
import { obapFetch } from '../../src/obap-fetch/obap-fetch.js';
import '../../src/obap-composite-application/obap-composite-application.js';
import '../../src/obap-icons/obap-standard-icons.js';

class DemoApp extends LitElement {
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
        `];
    }

    static get properties() {
        return {
           applications: {
               type: Array
           }
        }
    }

    constructor() {
        super();
        this.applications = [];
        this._getDetails(); 
    }

    render() {
        return html`
            <obap-composite-application .items="${this.applications}" elevation="2" @obap-composite-application-change="${this._onApplicationChange}"></obap-composite-application>
        `;
    }

    async _getDetails() {
        const result = await obapFetch('./applications.json', 'GET', null, false, null);
        this.applications = result;
        //console.log(result);
    }

    _onApplicationChange(e) {
        //console.log(e.detail);
    }
}

window.customElements.define('demo-app', DemoApp);