/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-select/obap-select.js';

export class SelectDemo extends ObapElement {
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
              align-items: center;
              justify-content: flex-start;
              margin: 16px 0;
            }

            obap-select {
                margin-right: 16px;
                min-width: 100px;
            }
        `];
    }

    static get properties() {
        return {
            items: {
                type: Array
            },

            selectedItemIndexes: {
                type: Array
            }
        } 
    }

    constructor() {
        super();
        this.items = ['one', 'two', 'three', 'four', 'five'];
        this.selectedItemIndexes = [1, 2];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Normal</div>
                <div class="row">
                    <obap-select border-style="none" .items="${this.items}"></obap-select>
                    <obap-select border-style="underline" .items="${this.items}"></obap-select>
                    <obap-select border-style="outline" .items="${this.items}"></obap-select>
                </div>

                <div class="title">Label</div>
                <div class="row">
                    <obap-select no-float-label label="select" border-style="none" .items="${this.items}"></obap-select>
                    <obap-select no-float-label label="select" border-style="underline" .items="${this.items}"></obap-select>
                    <obap-select no-float-label label="select" border-style="outline" .items="${this.items}"></obap-select>
                </div>

                <div class="title">Floating Label</div>
                <div class="row">
                    <obap-select label="select" border-style="none" .items="${this.items}"></obap-select>
                    <obap-select label="select" border-style="underline" .items="${this.items}"></obap-select>
                    <obap-select label="select" border-style="outline" .items="${this.items}"></obap-select>
                </div>

                <div class="title">Icon</div>
                <div class="row">
                    <obap-select icon="android" label="select" border-style="none" .items="${this.items}"></obap-select>
                    <obap-select icon="android" label="select" border-style="underline" .items="${this.items}"></obap-select>
                    <obap-select icon="android" label="select" border-style="outline" .items="${this.items}"></obap-select>
                </div>

                <div class="title">Multi Select</div>
                <div class="row">
                    <obap-select icon="android" label="select" multi border-style="outline" .items="${this.items}" .selectedItemIndexes="${this.selectedItemIndexes}"></obap-select>
                </div>

                <div class="title">Disabled</div>
                <div class="row">
                    <obap-select disabled icon="android" label="select" border-style="none" .items="${this.items}"></obap-select>
                    <obap-select disabled icon="android" label="select" border-style="underline" .items="${this.items}"></obap-select>
                    <obap-select disabled icon="android" label="select" border-style="outline" .items="${this.items}"></obap-select>
                </div>
            </div>
        `;
    }
}

window.customElements.define('select-demo', SelectDemo);