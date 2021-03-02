/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import '../../src/obap-snackbar/obap-snackbar.js';
import '../../src/obap-button/obap-button.js';

export class SnackbarDemo extends ObapElement {
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

            obap-button {
                --obap-button-ripple-color: var(--obap-on-primary-color);
                --obap-button-color: var(--obap-on-primary-color);
                --obap-button-background-color: var(--obap-primary-color);
                margin-right: 16px;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <div class="title">Demo</div>
                <div class="row">
                    <obap-button raised label="Normal" @click="${this._showNormal}"></obap-button>
                    <obap-button raised label="Action" @click="${this._showAction}"></obap-button>
                    <obap-snackbar id="snackbar-normal" message="This is a normal message."></obap-snackbar>
                    <obap-snackbar id="snackbar-action" message="This is an action message." action="Dismiss" @obap-snackbar-dismissed="${this._dismissAction}"></obap-snackbar>
                </div>
            </div>
        `;
    }

    _showNormal() {
        const sb = this.renderRoot.getElementById('snackbar-normal');
        sb.show();
    }

    _showAction() {
        const sb = this.renderRoot.getElementById('snackbar-action');
        sb.show();
    }

    _dismissAction() {
        console.log('Snackbar Dismissed');
    }
}

window.customElements.define('snackbar-demo', SnackbarDemo);