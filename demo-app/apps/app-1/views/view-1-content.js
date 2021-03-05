/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, LitElement } from 'lit-element';
import { ObapCompositeHostedApplicationContentController } from '../../../../src/obap-composite-hosted-application/obap-composite-hosted-application-content-controller.js';
import '../../../../src/obap-check/obap-check.js';

export class View1Content extends ObapCompositeHostedApplicationContentController(LitElement) {
    static get styles() {
        return [css`
            :host {
                display: block;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }
        `];
    }

    render() { 
        return html`
            <div class="container">
                Application 1 - View 1
                <button @click="${this._buttonClick}">GO</button>
                <button @click="${this._dialogButtonClick}">Dialog</button>
                <button @click="${this._snackbarButtonClick}">Snackbar</button>
                <button @click="${this._snackbarActionButtonClick}">Snackbar Action</button>
                <button @click="${this._messageDialogButtonClick}">Message Dialog</button>
                <obap-check label="Test Check"><</obap-check>
            </div>
        `;
    }

    constructor() {
        super();

        this.addEventListener('view-activated', (e) => {
            console.log('uuu')
            console.log(e.detail);
        });
    }

    _buttonClick() {
        this.navigateTo('app-1', 'app-1-view-hidden');
        this.sendViewMessage('test-message', {}, -1);
    }

    _dialogButtonClick() {
        this.showDialog('app-1-view-1-dialog', './apps/app-1/views/app-1-view-1-dialog.html', { foo: 'bar' },  (result) => {
            console.log('*** SHOW DIALOG CALLBACK ***');
            console.log(result);
        });
    }

    _snackbarButtonClick() {
        this.showSnackbar('This is a message.', 3000);
    }

    _snackbarActionButtonClick() {
        this.showActionSnackbar('This is an action message.', 'dismiss', () => {
            console.log('*** ACTION SNACKBAR DISMISSED ***');
        });
    }

    _messageDialogButtonClick() {
        this.showMessageDialog('Confirmation', 'Do you really want to do this?', [
            {
                key: 'yes',
                label: 'yes',
                raised: true,
                highlight: true
            },
            {
                key: 'no',
                label: 'no',
                raised: false,
                highlight: false
            }
        ], (action) => {
            console.log(`*** MESSAGE DIALOG DISMISSED: ${action} ***`);
        });
    }
}

window.customElements.define('view-1-content', View1Content);
