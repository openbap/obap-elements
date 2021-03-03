/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapCompositeHostedApplicationContentController } from './obap-composite-hosted-application-content-controller.js';

export class ObapCompositeHostedViewContent extends ObapElement {
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
                width: 100%;
            }
        `];
    }

    static get properties() {
        return {
           label: {
               type: String
           }
        }
    }

    constructor() {
        super();
        this.label = 'test';
        this._contentItems = [];
        this._boundHandleSlotChangeEvent = this._handleSlotChangeEvent.bind(this);
        this.renderRoot.addEventListener('slotchange', this._boundHandleSlotChangeEvent);
    }

    onViewActivated(appId, viewId) {
        this._contentItems.forEach(item => {
            if (item.onViewActivated) {
                item.onViewActivated(appId, viewId);
            }
        });
    }

    onViewDeactivated(appId, viewId) {
        this._contentItems.forEach(item => {
            if (item.onViewDeactivated) {
                item.onViewDeactivated(appId, viewId);
            }
        });
    }

    onViewThemeChanged() {
        this._contentItems.forEach(item => {
            if (item.onViewThemeChanged) {
                item.onViewThemeChanged(appId, viewId);
            }
        });
    }

    onViewLocaleChanged() {
        this._contentItems.forEach(item => {
            if (item.onViewLocaleChanged) {
                item.onViewLocaleChanged(appId, viewId);
            }
        });
    }
    
    render() {
        return html`
            <div class="container">
                <slot></slot>
            </div>
        `;
    }

    _handleSlotChangeEvent(e) {
        let slot = this.renderRoot.querySelector('slot');

        if (!slot) {
            return;
        }

        const nodes = slot.assignedNodes({ flatten: true }).filter((el) => {
            return ((el.nodeType === 1) && (el.__isViewContentItem));
        });

        this._contentItems = [...nodes];
    }
}

window.customElements.define('obap-composite-hosted-view-content', ObapCompositeHostedViewContent);
