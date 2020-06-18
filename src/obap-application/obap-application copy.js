/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapApplicationController } from './obap-application-controller.js';
import './obap-application-view.js';
import '../obap-pages/obap-pages.js';
import '../obap-navigation-rail/obap-navigation-rail.js';
import '../obap-button/obap-button.js';
import '../obap-top-app-bar/obap-top-app-bar.js';
import '../obap-icon/obap-icon.js';

export class ObapApplication extends ObapApplicationController(ObapElement) {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: 100%;
                padding: 4px;
                box-sizing: border-box;
                background: var(--obap-window-color, #FAFAFA);
            }

            obap-pages {
                height: 100%;
            }

            obap-navigation-rail {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                margin-right: 4px;
                z-index: 5;
            }

            .container {
                display: flex;
                flex-direction: column;
                height: 100%;
            }

            .content-container {
                flex: 1;
                display: flex;
                flex-direction: row;
                position: relative;
            }

            obap-top-app-bar {
                margin-bottom: 4px;
            }

            .view-container {
                flex: 1;
                display: flex;
                flex-direction: row;
                height: 100%;
            }

            .rail-spacer {
                width: 76px;
                color: transparent;
            }

            .page-container {
                flex: 1;
                height: 100%;
            }
        `];
    }

    static get properties() {
        return {

        }
    }

    constructor() {
        super();
    }

    render() {
        let railNavigatorViews = this.getNavigatorViews('rail');
        let fabNavigatorViews = this.getNavigatorViews('fab');
        let fabView = (fabNavigatorViews.length > 0) ? fabNavigatorViews[0] : null;

        return html`
            <div class="container">
                <obap-top-app-bar caption="${this.getEffectiveDisplayTitle()}" elevation="1">
                    ${this._getToolBarIcon(this.icon)}
                </obap-top-app-bar>
                
                <div class="content-container">
                    ${this._showNavigator() ? html`
                        <obap-navigation-rail elevation="1" collapsible selected-index="${this.selectedViewIndex}" 
                                              action-view-name="${fabView ? fabView.name : ''}" action-icon="${fabView ? fabView.icon : ''}" action-label="${fabView ? fabView.label : ''}" @obap-navigation-rail-action="${this._handleFabClick}"
                                              @obap-item-deselecting="${this._handleViewDeselecting}" 
                                              @obap-item-selecting="${this._handleViewSelecting}" 
                                              @obap-item-selected="${this._handleViewSelect}" >
                            ${railNavigatorViews.map(item => html`<obap-navigation-rail-item view-name="${item.name}" label="${item.label}" icon="${item.icon}"></obap-navigation-rail-item>`)}
                        </obap-navigation-rail>
                    ` : null}

                    <div class="view-container">
                        ${this._showNavigator() ? html`
                            <div class="rail-spacer"></div>
                        ` : null}

                        <div class="page-container">
                            <obap-pages selected-index="${this.selectedViewIndex}">
                                <slot></slot>
                            </obap-pages>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    _showNavigator() {
        return ((!this.isModalView()) && (this.navigatorViewCount('rail') > 2));
    }

    _getToolBarIcon(icon) {
        return this.isModalView() ?
            html`<obap-button round slot="left" icon="arrow-back" @click="${(e) => this.showPreviousView()}"></obap-button>` :
            icon ? html`<obap-button round slot="left" icon="${icon}"></obap-button>` : null;
    }

    _handleViewSelect(e) {
        let viewName = e.detail.item.getAttribute('view-name');
        this.showView(viewName);
    }

    _handleViewSelecting(e) {
        if (!this.canViewActivate(e.detail.item.getAttribute('view-name'))) {
            e.preventDefault();
        }
    }

    _handleViewDeselecting(e) {
        if (!this.canViewDeactivate()) {
            e.preventDefault();
        }
    }

    _handleFabClick(e) {
        console.log(e)
        let viewName = e.target.getAttribute('action-view-name');
        this.showView(viewName);
    }
}

window.customElements.define('obap-application', ObapApplication);
