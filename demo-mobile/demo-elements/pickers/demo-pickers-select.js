/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../../src/obap-element/obap-element.js';
import '../../../src/obap-select/obap-select.js';
import '../../demo-mobile-app/demo-panel.js';

export class DemoPickersSelect extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: 100%;
                padding: 8px;
                box-sizing: border-box;
                overflow: hidden;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            demo-panel {
                margin-bottom: 8px;
            }

            demo-panel:last-of-type {
                margin-bottom: 0;
            }

            .container {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
       
                grid-gap: 16px;
                justify-items: stretch;
                padding: 8px 8px 16px 8px;
            }
        `];
    }

    static get properties() {
        return {
            items: {
                type: Array
            },

            multiItems: {
                type: Array
            }
        } 
    }

    constructor() {
        super();
        this.items = ['one', 'two', 'three', 'four', 'five'];
        this.multiItems = ['one', 'two', 'three'];
    }

    render() {
        return html`
            <demo-panel label="Normal">
                <div class="container">
                    <obap-select border-style="none" .items="${this.items}"></obap-select>
                    <obap-select border-style="underline" .items="${this.items}"></obap-select>
                    <obap-select border-style="outline" .items="${this.items}"></obap-select>
                </div>
            </demo-panel>

            <demo-panel label="Label">
                <div class="container">
                    <obap-select no-float-label label="select" border-style="none" .items="${this.items}"></obap-select>
                    <obap-select no-float-label label="select" border-style="underline" .items="${this.items}"></obap-select>
                    <obap-select no-float-label label="select" border-style="outline" .items="${this.items}"></obap-select>
                </div>
            </demo-panel>

            <demo-panel label="Floating Label">
                <div class="container">
                    <obap-select label="select" border-style="none" .items="${this.items}"></obap-select>
                    <obap-select label="select" border-style="underline" .items="${this.items}"></obap-select>
                    <obap-select label="select" border-style="outline" .items="${this.items}"></obap-select>
                </div>
            </demo-panel>

            <demo-panel label="Icon">
                <div class="container">
                    <obap-select icon="app:android" label="select" border-style="none" .items="${this.items}"></obap-select>
                    <obap-select icon="app:android" label="select" border-style="underline" .items="${this.items}"></obap-select>
                    <obap-select icon="app:android" label="select" border-style="outline" .items="${this.items}"></obap-select>
                </div>
            </demo-panel>

            <demo-panel label="Multi Select">
                <div class="container">
                    <obap-select icon="app:android" label="select" multi border-style="outline" .items="${this.multiItems}"></obap-select>
                </div>
            </demo-panel>
        `; 
    }
}

window.customElements.define('demo-pickers-select', DemoPickersSelect);