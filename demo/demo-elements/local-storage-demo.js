/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import { obapLocalStorage } from '../../src/obap-local-storage/obap-local-storage.js';
import '../../src/obap-button/obap-button.js';

export class LocalStorageDemo extends ObapElement {
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

            .item-row {
              display: flex;
              flex-direction: column;
              padding: 0;
            }

            .instructions {
                margin-bottom: 8px;
            }

            obap-button {
                margin: 8px 16px 16px 16px;
                --obap-button-color: var(--obap-on-primary-color);
                --obap-button-background-color: var(--obap-primary-color);
            }
        `];
    }

    static get properties() {
        return {
            results: {
                type: Array
            }
        }
    }

    constructor() {
        super();
        this.results = [];
        this._boundHandleLocalStorageChangedEvent = this._handleLocalStorageChangedEvent.bind(this);
    }
 
    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('obap-local-storage-changed', this._boundHandleLocalStorageChangedEvent);
    }
 
    disconnectedCallback() {
        window.removeEventListener('obap-local-storage-changed', this._boundHandleLocalStorageChangedEvent);
        super.disconnectedCallback();
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Local Storage Demo</div>
                <div class="row">
                    <div class="instructions">You need to run two instances of this page in different browser tabs to see the storage change notifications for local storage changes that don't use the helper method (changes aren't observed on the same page).</div>
                </div>

                <div class="title">Add items directly to local storage</div>
                <div class="row">
                    <obap-button label="Add" raised @click="${this._addItem}"></obap-button>
                    <obap-button label="Modify" raised @click="${this._modifyItem}"></obap-button>
                    <obap-button label="Remove" raised @click="${this._removeItem}"></obap-button>
                    <obap-button label="Clear" raised @click="${this._clearStorage}"></obap-button>
                </div>

                <div class="title">Add items to local storage using helper method (for local notifications)</div>
                <div class="row">
                    <obap-button label="Add" raised @click="${this._addItemLocal}"></obap-button>
                    <obap-button label="Modify" raised @click="${this._modifyItemLocal}"></obap-button>
                    <obap-button label="Remove" raised @click="${this._removeItemLocal}"></obap-button>
                    <obap-button label="Clear" raised @click="${this._clearStorageLocal}"></obap-button>
                </div>

                <div class="title">Events</div>
                <div class="item-row">
                    ${this.results.map(item => html`<div>${item}</div>`)}
                </div>
            </div>
        `;
    }

    _handleLocalStorageChangedEvent(e) {
        this.results.push(JSON.stringify(e.detail));
        this.requestUpdate();
    }
 
    _addItem() {
        window.localStorage.setItem('temp_key', 'Item Add');
    }
     
    _modifyItem() {
        window.localStorage.setItem('temp_key', 'Item Modify');
    }
     
    _removeItem() {
        window.localStorage.removeItem('temp_key');
    }
     
    _clearStorage() {
        window.localStorage.clear();
    }
     
    _addItemLocal() {
        obapLocalStorage.modify('temp_key', 'Item Add');
    }
     
    _modifyItemLocal() {
        obapLocalStorage.modify('temp_key', 'Item Modify');
    }
     
    _removeItemLocal() {
        obapLocalStorage.remove('temp_key');
    }
     
    _clearStorageLocal() {
        obapLocalStorage.clear();
    }
}

window.customElements.define('local-storage-demo', LocalStorageDemo);