/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../../src/obap-element/obap-element.js';
import '../../../src/obap-icon/obap-icon.js';
import { getIconNames, getIconGroups } from  '../../../src/obap-icons/obap-core-icons.js';
import '../../demo-mobile-app/demo-panel.js';

export class DemoStylesIconography extends ObapElement {
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

            .container {
                height: 100%;
                padding: 6px 8px 8px 8px;
                box-sizing: border-box;
            }

            .inner-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(32px, 1fr) );
                grid-gap: 16px;
                justify-items: center;
            }

            demo-panel {
                margin-bottom: 8px;
            }

            demo-panel:last-of-type {
                margin-bottom: 0;
            }


            obap-icon {
                --obap-icon-fill-color: var(--obap-text-secondary-color);
            }
        `];
    }

    render() {
        return html`
            <div class="container">
                ${getIconGroups().map(group => html`
                <demo-panel label="${group}">
                    <div class="inner-container">
                        ${getIconNames(group).map(icon => html`
                                    <obap-icon icon="${icon}" title="${icon}"></obap-icon>
                        `)}
                    </div>
                </demo-panel>
                `)}
            </div>
        `;
    }
}

window.customElements.define('demo-styles-iconography', DemoStylesIconography);
