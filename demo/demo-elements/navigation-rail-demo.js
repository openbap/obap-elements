/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-navigation-rail/obap-navigation-rail.js';

export class NavigationRailDemo extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: 100%;
            }

            obap-navigation-rail {
                height: 100%;
            }

            .container {
                display: flex;
                flex-direction: column;
                height: 100%;
            }

            .title {
                padding: 4px 8px;
                margin-bottom: 8px;
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
            }

            .row {
                flex: 1;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Navigation Rail</div>
                <div class="row">
                    <obap-navigation-rail selected-index="0" action-icon="add" action-label="Compose" collapsible
                                          @obap-navigation-rail-action="${this._handleAction}" @obap-item-selected="${this._handleSelection}">
                        <obap-navigation-rail-item icon="inbox" label="Inbox"></obap-navigation-rail-item>
                        <obap-navigation-rail-item icon="star-border" label="Starred"></obap-navigation-rail-item>
                        <obap-navigation-rail-item icon="send" label="Sent"></obap-navigation-rail-item>
                        <obap-navigation-rail-item icon="delete" label="Trash"></obap-navigation-rail-item>
                        <obap-navigation-rail-item icon="info-outline" label="Spam"></obap-navigation-rail-item>
                        <obap-navigation-rail-item icon="drafts" label="Drafts"></obap-navigation-rail-item>
                    </obap-navigation-rail>
                </div>
            </div>
        `;
    }

    _handleAction(e) {
        //console.log(e);
    }

    _handleSelection(e) {
        //console.log(e);
    }
}

window.customElements.define('navigation-rail-demo', NavigationRailDemo);