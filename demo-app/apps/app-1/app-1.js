import { html, css, LitElement } from 'lit-element';
import { ObapCompositeHostedApplicationController } from '../../../src/obap-composite-hosted-application/obap-composite-hosted-application-controller.js';

export class App1 extends ObapCompositeHostedApplicationController(LitElement) {
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
    }

    onViewActivated(appId, viewId) {
        // View Activated.
    }

    onViewDeactivated(appId, viewId) {
        // View Deactivated.
    }
}

window.customElements.define('app-1', App1);