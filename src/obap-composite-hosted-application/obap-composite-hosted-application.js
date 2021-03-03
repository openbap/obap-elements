/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapCompositeHostedApplicationController } from './obap-composite-hosted-application-controller.js';
import './obap-composite-hosted-view.js';
import '../obap-pages/obap-pages.js';

window.applicationHost = null;

export class ObapCompositeHostedApplication extends ObapCompositeHostedApplicationController(ObapElement) {
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
            }
        `];
    }

    static get properties() {
        return {
            contentIndex: {
                type: Number,
                attribute: 'content-index'
            }
        }
    }

    get views() {
        return this._views;
    }

    constructor() {
        super();

        this.contentIndex = -1;
        this._views = [];
        this._boundHandleSlotChangeEvent = this._handleSlotChangeEvent.bind(this);
        this.renderRoot.addEventListener('slotchange', this._boundHandleSlotChangeEvent);
        window.applicationHost = this;
    }

    render() {
        return html`
            <obap-pages class="container" selected-index="${this.contentIndex}">
                <slot></slot>
            </obap-pages>
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
        console.log(`${this.viewId} ACTIVATED: AppId = ${appId}, viewId = ${viewId}`);

        if ((!this.views) || (this.views.length === 0)) return;

        let viewSet = false;

        for (let index = 0; index < this.views.length; index++) {
            if (this.views[index].viewId === viewId) {
                this.contentIndex = index;
                viewSet = true;
                break;
            }
        }

        // Can't find an appropriate view.
        if (!viewSet) {
            // Look for a default view.
            let viewIndex = this.views.findIndex((item) => item.default);

            // There isn't a default so use the first one.
            if (viewIndex === -1) {
                viewIndex = 0;
            }

            this.contentIndex = viewIndex;
        }

        if (this.contentIndex > -1) {
            this.views[this.contentIndex].onViewActivated(appId, viewId);
        }

        this.fireMessage('view-activated', { appId: appId, viewId: viewId });
    }

    onViewDeactivated(appId, viewId) {
        //console.log(`${this.applicationId} DEACTIVATED: AppId = ${appId}, viewId = ${viewId}`);
        if (this.contentIndex > -1) {
            this.views[this.contentIndex].onViewDeactivated(appId, viewId);
        }
        this.fireMessage('view-deactivated', { appId: appId, viewId: viewId });
    }

    onViewThemeChanged() {
        //console.log(`${this.viewId} THEME CHANGED TO ${this.theme}`);
        if (this.contentIndex > -1) {
            this.views[this.contentIndex].onViewThemeChanged();
        }
    }

    onViewLocaleChanged() {
        //console.log(`${this.applicationId} LOCALE CHANGED`);
        if (this.contentIndex > -1) {
            this.views[this.contentIndex].onViewLocaleChanged();
        }
    }

    _handleSlotChangeEvent(e) {
        let slot = this.renderRoot.querySelector('slot');

        if (!slot) {
            return;
        }

        const nodes = slot.assignedNodes({ flatten: true }).filter((el) => {
            return ((el.nodeType === 1) && (el.tagName === 'OBAP-COMPOSITE-HOSTED-VIEW'));
        });

        this._views = [...nodes];
    }
}

window.customElements.define('obap-composite-hosted-application', ObapCompositeHostedApplication);
