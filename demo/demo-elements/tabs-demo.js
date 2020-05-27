/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import { elevation1 } from '../../src/obap-styles/obap-elevation.js';
import '../../src/obap-tabs/obap-tabs.js';

export class TabsDemo extends ObapElement {
    static get styles() {
        return [elevation1, css`
            :host {
                display: block;
            }
    
            .container {
                height: 100%;
            }

            .title {
                padding: 4px 8px;
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
            }

            obap-tabs {
                margin-bottom: 24px;
            }

            .custom-tabs {
                --obap-tabs-color: var(--obap-primary-color);
                --obap-tabs-inactive-color: var(--obap-primary-light-color);
                --obap-tabs-background-color: #E0E0E0;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Regular Tabs</div>
                <div class="tab-container">
                    <obap-tabs selected-index="0" @obap-item-selected="${this._tabSelected}" class="elevation-1">
                        <obap-tab>Tab 1</obap-tab>
                        <obap-tab>Tab 2</obap-tab>
                        <obap-tab>Tab 3</obap-tab>
                        <obap-tab>Tab 4</obap-tab>
                        <obap-tab>Tab 5</obap-tab>
                    </obap-tabs>
                </div>

                <div class="title">Fill Tabs</div>
                <div class="tab-container">
                    <obap-tabs fill selected-index="0" @obap-item-selected="${this._tabSelected}" class="elevation-1">
                        <obap-tab>Tab 1</obap-tab>
                        <obap-tab>Tab 2</obap-tab>
                        <obap-tab>Tab 3</obap-tab>
                        <obap-tab>Tab 4</obap-tab>
                        <obap-tab>Tab 5</obap-tab>
                    </obap-tabs>
                </div>

                <div class="title">Custom Colors</div>
                <div class="tab-container">
                    <obap-tabs class="custom-tabs" selected-index="0" @obap-item-selected="${this._tabSelected}" class="elevation-1">
                        <obap-tab>Tab 1</obap-tab>
                        <obap-tab>Tab 2</obap-tab>
                        <obap-tab>Tab 3</obap-tab>
                        <obap-tab>Tab 4</obap-tab>
                        <obap-tab>Tab 5</obap-tab>
                    </obap-tabs>
                </div>

                <div class="title">Disabled Tabs</div>
                <div class="tab-container">
                    <obap-tabs disabled selected-index="0" @obap-item-selected="${this._tabSelected}" class="elevation-1">
                        <obap-tab>Tab 1</obap-tab>
                        <obap-tab>Tab 2</obap-tab>
                        <obap-tab>Tab 3</obap-tab>
                        <obap-tab>Tab 4</obap-tab>
                        <obap-tab>Tab 5</obap-tab>
                    </obap-tabs>
                </div>

                <div class="title">Individual Disabled Tabs</div>
                <div class="tab-container">
                    <obap-tabs selected-index="0" @obap-item-selected="${this._tabSelected}" class="elevation-1">
                        <obap-tab>Tab 1</obap-tab>
                        <obap-tab>Tab 2</obap-tab>
                        <obap-tab disabled>Tab 3</obap-tab>
                        <obap-tab disabled>Tab 4</obap-tab>
                        <obap-tab>Tab 5</obap-tab>
                    </obap-tabs>
                </div>
            </div>
        `;
    }

    _tabSelected(e) {
        //console.log(e)
    }
}

window.customElements.define('tabs-demo', TabsDemo);