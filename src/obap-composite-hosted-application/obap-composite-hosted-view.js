/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { elevation1 } from '../obap-styles/obap-elevation.js';
import '../obap-selector/obap-selector-container.js';
import '../obap-tabs/obap-tabs.js';
import './obap-composite-hosted-view-content.js';

export class ObapCompositeHostedView extends ObapElement {
    static get styles() {
        return [elevation1, css`
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

            obap-pages {
                flex: 1;
            }

            obap-tabs {
                margin-bottom: 4px;
            }
        `];
    }

    static get properties() {
        return {
            viewId: {
                type: String,
                attribute: 'view-id',
                reflect: true
            },

            label: {
                type: String
            },

            default: {
                type: Boolean
            },

            contentItems: {
                type: Array
            },

            contentIndex: {
                type: Number,
                attribute: 'content-index'
            }
        }
    }

    get contentItems() {
        return this._contentItems;
    }

    constructor() {
        super();
        this.viewId = '';
        this.label = '';
        this.default = false;
        this.contentIndex = -1;
        this._contentItems = [];
        this._boundHandleSlotChangeEvent = this._handleSlotChangeEvent.bind(this);
        this.renderRoot.addEventListener('slotchange', this._boundHandleSlotChangeEvent);
    }

    connectedCallback() {
        super.connectedCallback();

    }

    disconnectedCallback() {

        super.disconnectedCallback();
    }

    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);

    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
 
        });
    }
    
    render() {
        return html`
            <obap-selector-container class="container" selected-index="${this.contentIndex}">
                ${this._renderTabs()}
                <obap-pages>
                    <slot></slot>
                </obap-pages>
            </obap-selector-container>
        `;
    }

    _renderTabs() {
        return (this.contentItems && this.contentItems.length > 1) ? html`
            <obap-tabs class="elevation-1" scroll hide-scroll-buttons>
                ${this.contentItems.map(item => html`<obap-tab>${item.label}</obap-tab>`)}
            </obap-tabs>
        ` : null;
    }

    onViewActivated(appId, viewId) {
        //console.log(`CONTENT ACTIVATED: AppId = ${appId}, viewId = ${viewId}`);
        this.contentItems.forEach(item => {
            item.onViewActivated(appId, viewId);
        });
    }

    onViewDeactivated(appId, viewId) {
        //console.log(`CONTENT DEACTIVATED: AppId = ${appId}, viewId = ${viewId}`);
        this.contentItems.forEach(item => {
            item.onViewDeactivated(appId, viewId);
        });
    }

    onViewThemeChanged() {
        //console.log(`${this.viewId} THEME CHANGED TO ${this.theme}`);
        this.contentItems.forEach(item => {
            item.onViewThemeChanged();
        });
    }

    onViewLocaleChanged() {
        //console.log(`${this.applicationId} LOCALE CHANGED`);
        this.contentItems.forEach(item => {
            item.onViewLocaleChanged();
        });
    }

    _handleSlotChangeEvent(e) {
        let slot = this.renderRoot.querySelector('slot');

        if (!slot) {
            return;
        }

        const nodes = slot.assignedNodes({ flatten: true }).filter((el) => {
            return ((el.nodeType === 1) && (el.tagName === 'OBAP-COMPOSITE-HOSTED-VIEW-CONTENT'));
        });

        const oldValue = this.contentItems;
        this._contentItems = [...nodes];
        this.requestUpdate('contentItems', oldValue);

        if (this.contentItems.length > 0) {
            this.contentIndex = 0;
        }
    }
}

window.customElements.define('obap-composite-hosted-view', ObapCompositeHostedView);
