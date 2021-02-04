/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-layout/obap-position-layout.js';
import '../../src/obap-layout/obap-row-layout.js';
import '../../src/obap-layout/obap-column-layout.js';

export class LayoutDemo extends ObapElement {
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
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
            }

            .row {
              margin: 8px 0;
            }

            .row-flex {
                display: inline-flex;
                margin: 8px 0;
            }

            .item {
                width: 16px;
                height: 16px;
                outline: 1px solid yellow;
                background: cornflowerblue;
            }

            .child-item {
                width: 16px;
                height: 16px;
                background: cornflowerblue;
            }

            obap-position-layout {
                width: 100px;
                height: 100px;
                outline: 1px dotted lightgrey;
                margin: 8px;
            }

            obap-row-layout, obap-column-layout {
                outline: 1px dotted lightgrey;
                margin: 8px;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Position</div>
                <div class="row-flex">
                    <obap-position-layout padding="8"><div class="child-item"></div></obap-position-layout>
                </div>

                <div class="title">Row</div>
                <div class="row">
                    <obap-row-layout gap="2" padding="8">${this._renderItems(10)}</obap-row-layout>
                    <obap-row-layout gap="8" padding="2">${this._renderItems(10)}</obap-row-layout>
                    <obap-row-layout gap="8" padding="2" reverse>${this._renderItems(10)}</obap-row-layout>
                </div>

                <div class="title">Column</div>
                <div class="row-flex">
                    <obap-column-layout gap="2" padding="8">${this._renderItems(10)}</obap-column-layout>
                    <obap-column-layout gap="8" padding="2">${this._renderItems(10)}</obap-column-layout>
                </div>
            </div>
        `;
    }

    _renderItems(count) {
        const items = [];

        for (let i = 0; i < count; i++) {
            items.push(html`<div class="item"></div>`);
        }

        return items;
    }
}

window.customElements.define('layout-demo', LayoutDemo);