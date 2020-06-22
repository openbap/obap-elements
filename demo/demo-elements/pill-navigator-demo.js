/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-pill-navigator/obap-pill-navigator.js';

export class PillNavigatorDemo extends ObapElement {
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
            }

            .row {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              align-items: center;
              padding: 16px;
            }

            .custom {
                --obap-pill-color: white;
                --obap-pill-hover-color: white;
                --obap-pill-selected-color: mediumseagreen;

                --obap-pill-border-color: lightgrey;
                --obap-pill-hover-border-color: mediumseagreen;
                --obap-pill-selected-border-color: mediumseagreen;

                --obap-pill-border-size: 1px;
                --obap-pill-hover-border-size: 2px;
                --obap-pill-selected-border-size: 0;

                --obap-pill-size: 12px;
                --obap-pill-selected-size: 16px;
                --obap-pill-separation: 8px;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Default Style</div>
                <div class="row">
                    <obap-pill-navigator count="5" selected="0"></obap-pill-navigator>
                </div>

                <div class="title">Disabled</div>
                <div class="row">
                    <obap-pill-navigator count="5" selected="0" disabled></obap-pill-navigator>
                </div>

                <div class="title">Custom Style</div>
                <div class="row">
                    <obap-pill-navigator class="custom" count="5" selected="0"></obap-pill-navigator>
                </div>
            </div>
        `;
    }
}

window.customElements.define('pill-navigator-demo', PillNavigatorDemo);