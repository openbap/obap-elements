/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapCompositeHostedApplicationController } from './obap-composite-hosted-application-controller.js';

export class ObapCompositeHostedApplication extends ObapCompositeHostedApplicationController(ObapElement) {
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

            .temp {
                color: var(--obap-accent-color, black);
            }
        `];
    }

    render() {
        return html`
            <div class="container">
                <div class="temp">${this.viewId}</div>
                <slot></slot>
            </div>
        `;
    }

    onViewMessage(message){
        //console.log('HUB MESSAGE CONTROL');
        //console.log(JSON.stringify(message));
        this.fireMessage('view-message', { type: message.type, data: message.body });
    }

    onViewInitialized(appId, viewId) {
        //console.log(`${this.applicationId} INITIALIZED: AppId = ${appId}, viewId = ${viewId}`);
        this.fireMessage('view-initialized', { appId: appId, viewId: viewId });
    }

    onViewActivated(appId, viewId) {
        //console.log(`${this.applicationId} ACTIVATED: AppId = ${appId}, viewId = ${viewId}`);
        this.fireMessage('view-activated', { appId: appId, viewId: viewId });
    }

    onViewDeactivated(appId, viewId) {
        //console.log(`${this.applicationId} DEACTIVATED: AppId = ${appId}, viewId = ${viewId}`);
        this.fireMessage('view-deactivated', { appId: appId, viewId: viewId });
    }

    onViewThemeChanged() {
        //console.log(`${this.viewId} THEME CHANGED TO ${this.theme}`);
    }

    onViewLocaleChanged() {
        //console.log(`${this.applicationId} LOCALE CHANGED`);
    }
}

window.customElements.define('obap-composite-hosted-application', ObapCompositeHostedApplication);
