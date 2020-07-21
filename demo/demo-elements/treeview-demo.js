/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-treeview/obap-treeview.js';

export class TreeviewDemo extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: 100%;
            }
    
            .container {
                display: flex;
                flex-direction: column;
                height: 100%;
            }

            .title {
                padding: 4px 8px;
                margin-bottom: 8px;
                color: var(--obap-on-primary-color);
                background: var(--obap-primary-color);
            }

            .row {
                flex: 1;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
            }

            obap-treeview {
                width: 100%;
                height: 100%;
                outline: 1px dotted lightgrey;
            }
        `];
    }

    static get properties() {
        return {
            items: {
                type: Array
            }
        }
    }

    constructor() {
        super();
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
                <div class="title">Treeview</div>
                <div class="row">
                    <obap-treeview label="root" .items="${this.items}" select-mode="multiple">
                    </obap-treeview>
                </div>
            </div>
        `;
    }
}

window.customElements.define('treeview-demo', TreeviewDemo);