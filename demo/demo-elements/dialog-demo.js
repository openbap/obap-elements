/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../src/obap-element/obap-element.js';
import { title } from '../../src/obap-styles/obap-typography.js';
import '../../src/obap-dialog/obap-dialog.js';
import '../../src/obap-button/obap-button.js';

export class DialogDemo extends ObapElement {
    static get styles() {
        return [title, css`
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

            .caption {
                padding: 8px;
            }

            .content {
                width: 600px;
                height: 400px;
                margin: 0 8px;
                background: #E0E0E0;
            }

            .child-content {
                width: 300px;
                height: 200px;
                margin: 0 8px;
                background: #E0E0E0;
            }

            .actions {
                display: flex;
                flex-direction: row-reverse;
                padding: 8px;
            }

            obap-button {
                margin-left: 8px;
                --obap-button-ripple-color: var(--obap-on-primary-color);
                --obap-button-color: var(--obap-on-primary-color);
                --obap-button-background-color: var(--obap-primary-color);
            }
        `];
    }

    render() {
        return html`
            <obap-dialog id="plain-dialog">
                ${this._renderCaption('Plain Dialog')}
                ${this._renderContent()}
                ${this._renderActions()}
            </obap-dialog>

            <obap-dialog id="modal-dialog" modal>
                ${this._renderCaption('Modal Dialog')}
                ${this._renderContent()}
                ${this._renderActions()}
            </obap-dialog>

            <obap-dialog id="nested-dialog" modal>
                ${this._renderCaption('Nested Dialog')}
                ${this._renderContent()}
                ${this._renderNestedActions()}
            </obap-dialog>

            <obap-dialog id="child-dialog" modal>
                ${this._renderCaption('Child Dialog')}
                ${this._renderChildContent()}
                ${this._renderActions()}
            </obap-dialog>

            <div class="container">
                <div class="title">Demo</div>
                <div class="row">
                    <obap-button raised label="plain dialog" @click="${this._showPlainDialog}"></obap-button>
                    <obap-button raised label="modal dialog" @click="${this._showModalDialog}"></obap-button>
                    <obap-button raised label="nested dialog" @click="${this._showNestedDialog}"></obap-button>
                </div>
            </div>
        `;
    }

    _renderCaption(caption) {
        return html`
            <div class="caption typography-title">${caption}</div>
        `;
    }

    _renderContent() {
        return html`
            <div class="content"></div>
        `;
    }

    _renderChildContent() {
        return html`
            <div class="child-content"></div>
        `;
    }

    _renderActions() {
        return html`
            <div class="actions">
                <obap-button raised label="cancel" dialog-dismiss @click="${this._handleCancel}"></obap-button>
                <obap-button raised label="ok" dialog-confirm></obap-button>
            </div>
        `;
    }

    _renderNestedActions() {
        return html`
            <div class="actions">
                <obap-button raised label="cancel" dialog-dismiss @click="${this._handleCancel}"></obap-button>
                <obap-button raised label="ok" dialog-confirm></obap-button>
                <obap-button raised label="child" @click="${this._showChildDialog}"></obap-button>
            </div>
        `;
    }

    _showPlainDialog() {
        const dlg = this.renderRoot.getElementById('plain-dialog');
        dlg.open();
    }

    _showModalDialog() {
        const dlg = this.renderRoot.getElementById('modal-dialog');
        dlg.open();
    }

    _showNestedDialog() {
        const dlg = this.renderRoot.getElementById('nested-dialog');
        dlg.open();
    }

    _showChildDialog() {
        const dlg = this.renderRoot.getElementById('child-dialog');
        dlg.open();
    }

    _handleCancel() {
        //console.log('CANCEL');
    }
}

window.customElements.define('dialog-demo', DialogDemo);