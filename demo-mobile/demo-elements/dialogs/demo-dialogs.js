/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../../../src/obap-element/obap-element.js';
import { subtitle } from '../../../src/obap-styles/obap-typography.js';
import '../../../src/obap-button/obap-button.js';
import '../../../src/obap-dialog/obap-dialog.js';
import '../../demo-mobile-app/demo-panel.js';

export class DemoDialogs extends ObapElement {
    static get styles() {
        return [subtitle, css`
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

            obap-button {
                --obap-button-ripple-color: var(--obap-on-primary-color);
                --obap-button-color: var(--obap-on-primary-color);
                --obap-button-background-color: var(--obap-primary-color);
            }

            .action {
                margin-left: 8px;
            }

            .container {
                height: 100%;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
            }

            .caption {
                padding: 8px;
            }

            .content {
                width: 70vw;
                height: 40vh;
                margin: 0 8px;
                background: #E0E0E0;
            }

            .child-content {
                width: 50vw;
                height: 10vh;
                margin: 0 8px;
                background: #E0E0E0;
            }

            .actions {
                display: flex;
                flex-direction: row-reverse;
                padding: 8px;
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

            <demo-panel>
                <div class="container">
                    <obap-button raised label="Plain" @click="${this._showPlainDialog}"></obap-button>
                    <obap-button raised label="Modal" @click="${this._showModalDialog}"></obap-button>
                    <obap-button raised label="Nested" @click="${this._showNestedDialog}"></obap-button>
                </div>
            </demo-panel>
        `;
    }

    _renderCaption(caption) {
        return html`
            <div class="caption typography-subtitle">${caption}</div>
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
                <obap-button class="action" raised label="cancel" dialog-dismiss @click="${this._handleCancel}"></obap-button>
                <obap-button class="action" raised label="ok" dialog-confirm></obap-button>
            </div>
        `;
    }

    _renderNestedActions() {
        return html`
            <div class="actions">
                <obap-button class="action" raised label="cancel" dialog-dismiss @click="${this._handleCancel}"></obap-button>
                <obap-button class="action" raised label="ok" dialog-confirm></obap-button>
                <obap-button class="action" raised label="child" @click="${this._showChildDialog}"></obap-button>
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

window.customElements.define('demo-dialogs', DemoDialogs);