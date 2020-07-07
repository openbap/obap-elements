/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapApplicationController } from './obap-application-controller.js';
import { body } from '../obap-styles/obap-typography.js';
import '../obap-button/obap-button.js';
import '../obap-top-app-bar/obap-top-app-bar.js';
import '../obap-icon/obap-icon.js'; 
import './obap-application-view.js';
import '../obap-pages/obap-pages.js';
import '../obap-material/obap-material.js';
/**
 * A view based mobile application framework.
 */
export class ObapMobileApplication extends ObapApplicationController(ObapElement) {
    static get styles() {
        return [body, css`
            :host {
                display: block;
                box-sizing: border-box;
                background: var(--obap-window-color, #FAFAFA);
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            obap-top-app-bar {
                margin-bottom: 0;
            }

            .app-icon {
                margin: 8px 4px 8px 8px;
            }

            .container {
                display: flex;
                flex-direction: column;
                height: 100%;
            }

            .app-container {
                flex: 1;
                display: flex;
                flex-direction: column;
                height: 100%;
            }

            .app-pages {
                flex: 1;
                height: 100%;
            }

            .navigator {
                height: 100%;
                margin-top: 8px;
                box-sizing: border-box;
                overflow-y: auto;
            }

            .view-pages {
                height: 100%;
                overflow: hidden;
                /*padding: 8px 8px 8px 8px;*/
                box-sizing: border-box;
            }

            .navigator-item {
                display: flex;
                align-items: center;
                margin: 0 8px 8px 8px;
                padding: 8px;
                cursor: pointer;
            }

            .navigator-item:last-of-type {
                margin-bottom: 0;
            }

            .navigator-icon {
                margin-right: 8px;
                fill: var(--obap-text-icon-color, rgba(0, 0, 0, 0.38));
                pointer-events: none;
            }

            .navigator-label {
                color: var(--obap-text-primary-color, rgba(0, 0, 0, 0.87));
                pointer-events: none;
            }
        `];
    }

    static get properties() {
        return {
            _navigatorIndex: {
                type: Number
            }
        }
    }

    constructor() {
        super();
        this._navigatorIndex = 0;
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
            //
        });
    }
    
    render() {
        return html`
            <div class="container">
                <obap-top-app-bar caption="${this.getEffectiveDisplayTitle()}" elevation="2">
                    ${this._getToolBarIcon(this.icon)}
                </obap-top-app-bar>

                <div class="app-container">
                    <obap-pages class="app-pages" selected-index="${this._navigatorIndex}">
                        <div class="navigator">${this._renderNavigator()}</div>
                        <obap-pages class="view-pages" selected-index="${this.selectedViewIndex}"><slot></slot></obap-pages>
                    </obap-pages>
                </div>
            </div>`;
    }

    _renderNavigator() {
        return html`
            <div>
                ${this.views.map((view, index) => html`
                    <obap-material elevation="1" class="navigator-item" index="${index}" @click="${this._navigatorClick}">
                        ${view.icon ? html`<obap-icon class="navigator-icon" icon="${view.icon}"></obap-icon>` : null}
                        <div class="navigator-label typography-body">${view.label}</div>
                    </obap-material>
                `)}
            </div>`;
    }

    _getToolBarIcon(icon) {
        return (this._navigatorIndex > 0) ?
            html`<obap-button round slot="left" icon="core:arrow-left" @click="${this._showNavigator}"></obap-button>` :
            icon ? html`<obap-icon class="app-icon" slot="left" icon="${icon}"></obap-icon>` : null;
    }

    _navigatorClick(e) {
        const index = e.target.getAttribute('index');

        if (index !== null) {
            this.selectedViewIndex = index;
            this._navigatorIndex = 1;
        }
    }

    _showNavigator(e) {
        this._navigatorIndex = 0;
        this.showDefaultView();
    }

    getEffectiveDisplayTitle() {
        return (this._navigatorIndex === 0) ? this.label : this.getSelectedView().label;
    }
}

window.customElements.define('obap-mobile-application', ObapMobileApplication);
