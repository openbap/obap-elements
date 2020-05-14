/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import { elevation1 } from '../../src/obap-styles/obap-elevation.js';
import { caption } from '../../src/obap-styles/obap-typography.js';
import '../../src/obap-icon/obap-icon.js';
import '../../src/obap-tabs/obap-tabs.js';
import '../../src/obap-pages/obap-pages.js';
import '../../src/obap-callout/obap-callout.js';
import '../../src/obap-selector/obap-selector-container.js';
import { getIconNames, getIconGroups } from  '../../src/obap-icons/obap-core-icons.js';
import '../../src/obap-icons/obap-standard-icons.js';
import '../../src/obap-icons/obap-av-icons.js';
import '../../src/obap-icons/obap-communication-icons.js';
import '../../src/obap-icons/obap-device-icons.js';
import '../../src/obap-icons/obap-editor-icons.js';
import '../../src/obap-icons/obap-hardware-icons.js';
import '../../src/obap-icons/obap-image-icons.js';
import '../../src/obap-icons/obap-maps-icons.js';
import '../../src/obap-icons/obap-notification-icons.js';
import '../../src/obap-icons/obap-social-icons.js';
import '../../src/obap-icons/obap-places-icons.js';

export class IconsDemo extends ObapElement {
    static get styles() {
        return [elevation1, caption, css`
            :host {
                display: block;
            }
    
            .container {
                height: 100%;
            }

            .title {
                padding: 4px 8px;
                margin-bottom: 8px;
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
                text-transform: capitalize;
            }

            .icon-group {
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 8px;
            }

            .icon-container {
                padding: 4px;
                margin: 4px;
                background: white;
                color: var(--obap-text-secondary-color, rgba(0, 0, 0, 0.54));
                cursor: pointer;
            }

            obap-tabs {
                margin-bottom: 8px;
            }

            obap-selector-container {
                margin-bottom: 24px;
            }

            obap-callout {
              --obap-callout-color: var(--obap-on-primary-color);
              --obap-callout-background-color: var(--obap-primary-light-color);
            }

            .callout-content {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              min-width: 64px;
            }
        `];
    }

    static get properties() {
        return {
            groups: { type: Array },
            selectedTabIndex: { type: Number }
        }
    }

    constructor() {
        super();
        this.groups = getIconGroups();
        this.selectedTabIndex = 0;
    }

    render() {
        return html`
            <div class="container">
                <obap-selector-container selected-index="${this.selectedTabIndex}">
                    <obap-tabs class="elevation-1">
                        ${this.groups.map(group => html`<obap-tab>${group}</obap-tab>`)}
                    </obap-tabs>
                    <obap-pages>
                        ${this.groups.map(group => html`
                            <div class="icon-group">
                                ${getIconNames(group).map(icon => html`
                                    <div class="icon-container" tabindex="0">
                                        <obap-callout elevated anchor="middle-top" arrow-position="bottom" offset-y="-2">
                                            <div class="callout-content typography-caption">${icon}</div>
                                        </obap-callout>

                                        <obap-icon icon="${icon}"></obap-icon>
                                    </div>
                                `)}
                            </div>
                        `)}
                    </obap-pages>
                </obap-selector-container>
            </div>
        `;
    }
}

window.customElements.define('icons-demo', IconsDemo);