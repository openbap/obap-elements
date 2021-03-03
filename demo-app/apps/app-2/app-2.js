import { html, css, LitElement } from 'lit-element';
import { ObapCompositeHostedApplicationController } from '../../../src/obap-composite-hosted-application/obap-composite-hosted-application-controller.js';

export class App2 extends ObapCompositeHostedApplicationController(LitElement) {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: 100%
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            
            container {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-size: 24px;
                background: aqua;
            }
        `];
    }

    constructor() {
        super();

        this.viewId = 'my-application';
    }

    render() {
        return html`
            <div class="container">
                <slot></slot>
            </div>
        `;
    }

    onViewMessage(message){
        // Custom View Message.
    }

    onViewInitialized(appId, viewId) {
       // View Initialized.
       console.log(`${this.viewId} INITIALIZED: AppId = ${appId}, viewId = ${viewId}`);
    }

    onViewActivated(appId, viewId) {
        // View Activated.
        console.log(`${this.viewId} ACTIVATED: AppId = ${appId}, viewId = ${viewId}`);
    }

    onViewDeactivated(appId, viewId) {
        // View Deactivated.
        console.log(`${this.viewId} DEACTIVATED: AppId = ${appId}, viewId = ${viewId}`);
    }
}

window.customElements.define('app-2', App2);