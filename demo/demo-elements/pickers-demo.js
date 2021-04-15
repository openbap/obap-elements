/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import { elevation1 } from '../../src/obap-styles/obap-elevation.js';
import '../../src/obap-tabs/obap-tabs.js';
import '../../src/obap-pages/obap-pages.js';
import '../../src/obap-selector/obap-selector-container.js';
import '../../src/obap-pickers/obap-color-picker.js';
import '../../src/obap-pickers/obap-date-picker.js';
import '../../src/obap-pickers/obap-date-time-picker.js';
import '../../src/obap-pickers/obap-month-picker.js';
import '../../src/obap-pickers/obap-time-picker.js';
import '../../src/obap-pickers/obap-year-picker.js';

export class PickersDemo extends ObapElement {
    static get styles() {
        return [elevation1, css`
            :host {
                display: block;
                height: 100%;
            }
    
            .container {
                height: 100%;
            }

            obap-selector-container {
                height: 100%;
                display: flex;
                flex-direction: column;
            }

            obap-tabs {
                margin-bottom: 8px;
            }

            obap-pages {
                flex: 1;
            }

            obap-pages > div {
                height: 100%;
                padding: 24px;
                box-sizing: border-box;
                background-color: #F0F0F0;
            }

            .todo {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: silver;
                font-size: 20px;
            }
        `];
    }

    static get properties() {
        return {
            predefinedColors: {
                type: Array
            }
        }
    }

    constructor() {
        super();
        this.predefinedColors = ['red', 'green', 'blue', 'yellow', 'pink', 'white', 'black', 'orange', 'purple'];
    }
    
    render() {
        return html`
            <div class="container">
                <obap-selector-container selected-index="5">
                    <obap-tabs class="elevation-1" scroll hide-scroll-buttons>
                        <obap-tab>Date</obap-tab>
                        <obap-tab>Time</obap-tab>
                        <obap-tab>Date-Time</obap-tab>
                        <obap-tab>Month</obap-tab>
                        <obap-tab>Year</obap-tab>
                        <obap-tab>Color</obap-tab>
                    </obap-tabs>
                    <obap-pages>
                        <div class="todo">Date Picker still to be implemented.</div>
                        <div class="todo">Time Picker still to be implemented.</div>
                        <div class="todo">Date-Time Picker still to be implemented.</div>
                        <div class="todo">Month Picker still to be implemented.</div>
                        <div class="todo">Year Picker still to be implemented.</div>

                        <div>
                            <obap-color-picker class="elevation-1" .predefinedColors="${this.predefinedColors}"></obap-color-picker>
                        </div>
                    </obap-pages>
                </obap-selector-container>
            </div>
        `;
    }
}

window.customElements.define('pickers-demo', PickersDemo);