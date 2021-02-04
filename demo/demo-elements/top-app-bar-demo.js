/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-top-app-bar/obap-top-app-bar.js';
import '../../src/obap-button/obap-button.js';

export class TopAppBarDemo extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
            }

            obap-top-app-bar {
                margin-bottom: 24px;
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
              padding: 0;
            }

            .custom-1 {
                --obap-top-app-bar-color: #ffeb3b;
                --obap-top-app-bar-inactive-color: #ffff72;
                --obap-top-app-bar-background-color: #5f4339;
            }

            .custom-2 {
                --obap-top-app-bar-background-color: var(--obap-accent-color);
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Default</div>
                <div class="row">
                    <obap-top-app-bar caption="Demo Application">
                        <obap-button slot="left" round icon="menu"></obap-button>
                        <obap-button slot="right" round icon="face"></obap-button>
                        <obap-button slot="right" round icon="more-vert"></obap-button>
                    </obap-top-app-bar>
                </div>

                <div class="title">Custom Colors</div>
                <div class="row">
                    <obap-top-app-bar class="custom-1" caption="Demo Application">
                        <obap-button slot="left" round icon="menu"></obap-button>
                        <obap-button slot="right" round icon="face"></obap-button>
                        <obap-button slot="right" round icon="more-vert"></obap-button>
                    </obap-top-app-bar>

                    <obap-top-app-bar class="custom-2" caption="Demo Application">
                        <obap-button slot="left" round icon="menu"></obap-button>
                        <obap-button slot="right" round icon="face"></obap-button>
                        <obap-button slot="right" round icon="more-vert"></obap-button>
                    </obap-top-app-bar>
                </div>
            </div>
        `;
    }
}

window.customElements.define('top-app-bar-demo', TopAppBarDemo);