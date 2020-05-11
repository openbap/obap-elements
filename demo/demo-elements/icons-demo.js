/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-icon/obap-icon.js';
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
        return [css`
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
                color: var(--obap-text-secondary-color, black);
                cursor: pointer;
            }
        `];
    }

    static get properties() {
        return {
            groups: { type: Array }
        }
    }

    constructor() {
        super();
        this.groups = getIconGroups();
    }

    render() {
        return html`
            <div class="container">
                ${this.groups.map(group => html`
                    <div class="title">${group}</div>
                    <div class="icon-group">
                        ${getIconNames(group).map(icon => html`
                            <div class="icon-container">
                                <obap-icon icon="${icon}" tabindex="0" title="${icon}"></obap-icon>
                            </div>
                        `)}
                    </div>
                `)}
            </div>
        `;
    }
}

window.customElements.define('icons-demo', IconsDemo);