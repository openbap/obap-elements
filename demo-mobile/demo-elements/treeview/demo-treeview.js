/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../../src/obap-element/obap-element.js';
import { body } from '../../../src/obap-styles/obap-typography.js';
import '../../../src/obap-treeview/obap-treeview.js';
import '../../../src/obap-check/obap-check.js';
import '../../../src/obap-button/obap-button.js';
import '../../../src/obap-radio/obap-radio-group.js';
import '../../demo-mobile-app/demo-panel.js';

export class DemoTreeview extends ObapElement {
    static get styles() {
        return [body, css`
            :host {
                display: block;
                height: 100%;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                display: flex;
                flex-direction: column;
                height: 100%;
                padding: 6px 8px 8px 8px;
                box-sizing: border-box;
            }

            .options {
                display: flex;
            }

            demo-panel {
                margin-bottom: 8px;
            }

            demo-panel:last-of-type {
                flex: 1;
                margin-bottom: 0;
            }

            obap-button {
                --obap-button-ripple-color: var(--obap-on-primary-color);
                --obap-button-color: var(--obap-on-primary-color);
                --obap-button-background-color: var(--obap-primary-color);
                margin-right: 24px;
            }

            obap-treeview {
                height: 100%;
            }

            obap-radio-group {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
            }
        `];
    }

    static get properties() {
        return {
            items: {
                type: Array
            },

            selectMode: {
                type: String
            },

            leafOnly: {
                type: Boolean
            }
        }
    }

    constructor() {
        super();
        this.selectMode = 'none';
        this.leafOnly = false;
        this.items = [
            {
                label: 'Cats',
                items: [
                    {
                        label: 'Siamese'
                    },
                    {
                        label: 'Persian'
                    },
                    {
                        label: 'Sphynx'
                    }
                ]
            },
            {
                label: 'Dogs',
                selected: false,
                /*
                openIcon: 'core:check',
                closeIcon: 'core:cross',
                */
                items: [
                    {
                        label: 'Poodle'
                    },
                    {
                        label: 'Bulldog',
                        items: [
                            {
                                label: 'English'
                            },
                            {
                                label: 'French'
                            }
                        ]
                    },
                    {
                        label: 'Dalmation'
                    },
                    {
                        label: 'Labrador'
                    }
                ]
            },
            {
                label: 'Unicorns',
                items: [
                    {
                        label: 'Pegasus'
                    },
                    {
                        label: 'Rainbow'
                    },
                    {
                        label: 'Narwhal'
                    }
                ]
            }
        ];
    }

    render() {
        return html`
            <div class="container">
                <demo-panel label="Selection Mode">
                    <obap-radio-group name="selection-mode" selected-index="0" @obap-item-selected="${this._radioChange}">
                        <obap-radio label="None"></obap-radio>
                        <obap-radio label="Single"></obap-radio>
                        <obap-radio label="Multiple"></obap-radio>
                        <obap-check name="leaf" label="Leaf Only" @obap-item-selected="${this._optionChange}"></obap-check>
                    </obap-radio-group>
                    
                </demo-panel>

                <demo-panel>
                    <div class="options">
                        <obap-button raised label="Expand All" @click="${this._expandAll}"></obap-button>
                        <obap-button raised label="Collapse All" @click="${this._collapseAll}"></obap-button>
                    </div>
                </demo-panel>
    

                <demo-panel>
                    <obap-treeview id="treeview" label="Pets" .items="${this.items}" select-mode="${this.selectMode}" ?select-leaf-only="${this.leafOnly}"
                                   @obap-treeview-selection-change="${this._handleTreeviewChange}">
                    </obap-treeview>
                </demo-panel>
            </div>
        `;
    }

    _radioChange(e) {
        const index = e.detail.index;

        switch (index) {
            case 0: {
                this.selectMode = 'none';
                break;
            }

            case 1: {
                this.selectMode = 'single';
                break;
            }

            case 2: {
                this.selectMode = 'multiple';
                break;
            }
        }
    }

    _expandAll() {
        this.renderRoot.getElementById('treeview').expandAll();
    }

    _collapseAll() {
        this.renderRoot.getElementById('treeview').collapseAll();
    }

    _optionChange(e) {
        const option = e.detail.name;
        const selected = e.detail.selected;

        switch (option) {
            case 'leaf': {
                this.leafOnly = selected;
                break;
            }
        }
    }

    _handleTreeviewChange(e) {
        //console.log(e.detail);
    }
}

window.customElements.define('demo-treeview', DemoTreeview);