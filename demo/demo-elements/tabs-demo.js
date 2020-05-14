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
                margin-bottom: 8px;
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">obap-tabs</div>
                <div class="tab-container">
                    <obap-tabs selected-index="0" @obap-item-selected="${this._tabSelected}" class="elevation-1">
                        <obap-tab>Tab 1</obap-tab>
                        <obap-tab>Tab 2</obap-tab>
                        <obap-tab>Tab 3</obap-tab>
                        <obap-tab>Tab 4</obap-tab>
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