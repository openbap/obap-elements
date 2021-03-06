/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-data-pager/obap-data-pager.js';

export class DataPagerDemo extends ObapElement {
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
              flex-wrap: wrap;
              align-items: center;
              padding: 0;
            }
        `];
    }

    static get properties() {
        return {
            options: {
                type: Array
            }
        }
    }

    constructor() {
        super();
        this.options = [15];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Default Page Size Options</div>
                <div class="row" @obap-data-pager-change="${this._onChange}">
                    <obap-data-pager count="100"></obap-data-pager>
                </div>

                <div class="title">Fixed Page Size</div>
                <div class="row" @obap-data-pager-change="${this._onChange}">
                    <obap-data-pager .rowsPerPageOptions="${this.options}" count="150"></obap-data-pager>
                </div>
            </div>
        `;
    }

    _onChange(e) {
        console.log(e.detail);
    }
}

window.customElements.define('data-pager-demo', DataPagerDemo);