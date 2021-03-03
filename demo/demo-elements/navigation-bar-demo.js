/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-navigation-bar/obap-navigation-bar.js';
import '../../src/obap-material/obap-material.js';

export class NavigationBarDemo extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: 100%;
            }
    
            .container {
                height: 100%;
                display: flex;
                flex-direction: column;
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
                align-items: stretch;
                padding: 0;
            }

            .logo {
                height: 72px;
                background: lightyellow;
            }

            .app-content {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                flex: 1;
                margin-left: 8px;
                color: silver;
                font-size: 24px;
            }

            obap-navigation-bar {
                
            }
        `];
    }

    static get properties() {
        return {
            items: {
                type: Array
            },

            selectedItemDetail: {
                type: Object
            }
        }
    }

    constructor() {
        super();

        this.selectedItemDetail = null;

        this.items = [
            {
                label: 'Home',
                icon: 'standard:home'
            },
            {
                label: 'App One',
                icon: 'standard:android',
                items: [
                    {
                        label: 'View 1',
                        icon: 'standard:cloud-queue',
                        id: 0
                    },
                    {
                        label: 'View 2',
                        icon: 'standard:cloud-queue',
                        id: 1
                    },
                    {
                        label: 'View 3',
                        icon: 'standard:cloud-queue',
                        id: 2
                    }
                ]
            },
            {
                label: 'App Two',
                icon: 'standard:face',
                items: [
                    {
                        label: 'View 4',
                        icon: 'standard:cloud-queue',
                        id: 3
                    },
                    {
                        label: 'View 5',
                        icon: 'standard:cloud-queue',
                        id: 4
                    },
                    {
                        label: 'View 6',
                        icon: 'standard:cloud-queue',
                        id: 5
                    }
                ]
            },
            {
                label: 'App Three',
                icon: 'standard:https',
                items: [
                    {
                        label: 'View 7',
                        icon: 'standard:cloud-queue',
                        id: 6
                    },
                    {
                        label: 'View 8',
                        icon: 'standard:cloud-queue',
                        id: 7
                    },
                    {
                        label: 'View 9',
                        icon: 'standard:cloud-queue',
                        id: 8
                    }
                ]
            },
            {
                label: 'App Four',
                icon: 'standard:bug-report',
                items: [
                    {
                        label: 'View 10',
                        icon: 'standard:cloud-queue',
                        id: 9
                    },
                    {
                        label: 'View 11',
                        icon: 'standard:cloud-queue',
                        id: 10
                    },
                    {
                        label: 'View 12',
                        icon: 'standard:cloud-queue',
                        id: 11
                    }
                ]
            },
            {
                label: 'Options',
                icon: 'standard:settings',
                bottom: true,
                items: [
                    {
                        label: 'Option 1',
                        icon: 'standard:cloud-queue',
                        id: 12
                    },
                    {
                        label: 'Option 2',
                        icon: 'standard:cloud-queue',
                        id: 13
                    },
                    {
                        label: 'Option 3',
                        icon: 'standard:cloud-queue',
                        id: 14
                    }
                ]
            }
        ];
    }

    render() {
        return html`
            <div class="container">
                <div class="row">
                    <obap-navigation-bar hide-icons .items="${this.items}" elevation="4" selected-index="0" @obap-navigation-bar-change="${this._selectionChanged}">
                        
                    </obap-navigation-bar> 
                    <obap-material class="app-content" elevation="4">
                        ${this._renderAppTitle()}
                    </obap-material>
                </div>
            </div>
        `;
    }

    _renderAppTitle() {
        if (this.selectedItemDetail) {
            const appLabel = this.items[this.selectedItemDetail.index].label;
            const viewLabel = (this.selectedItemDetail.subIndex > -1) ? ' : ' + this.items[this.selectedItemDetail.index].items[this.selectedItemDetail.subIndex].label : '';
        
            return html`<div>${appLabel + viewLabel}</div>`;
        }

        return null;

        // ${this.selectedItemDetail ? html`<div>${this.items[this.selectedItemDetail.index].label} : ${this.items[this.selectedItemDetail.index].items[this.selectedItemDetail.subIndex].label}</div>` : null}
                    
    }

    _selectionChanged(e) {
        //console.log(e.detail)
        if ((!this.selectedItemDetail) || (this.selectedItemDetail.index !== e.detail.index) || (this.selectedItemDetail.subIndex !== e.detail.subIndex)) {
            this.selectedItemDetail = {
                index: e.detail.index,
                subIndex: e.detail.subIndex,
                id: e.detail.id
            }
        }
    }
}

window.customElements.define('navigation-bar-demo', NavigationBarDemo);