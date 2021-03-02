/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { ObapCompositeHostedApplicationDialogController } from '../../../../src/obap-composite-hosted-application/obap-composite-hosted-application-dialog-controller.js';
import { html, css, LitElement } from 'lit-element';

export class App1View1DialogContent extends ObapCompositeHostedApplicationDialogController(LitElement) {
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
            
            .content {
                white-space: nowrap;
                color: var(--obap-accent-color, black);
            }
        `];
    }

    static get properties() {
        return {
            actions: {
                type: Array
            }
        }
    }

    constructor() {
        super();
    
        this.actions = [
            {
                key: 'ok',
                label: 'ok',
                raised: true,
                highlight: true,
                dismiss: true
            },
            {
                key: 'cancel',
                label: 'cancel',
                raised: false,
                highlight: false,
                dismiss: true
            },
            {
                key: 'child',
                label: 'child',
                raised: true,
                highlight: false,
                dismiss: false
            },
            {
                key: 'message',
                label: 'message',
                raised: true,
                highlight: false,
                dismiss: false
            }

        ];

        this.dialogId = 'app-1-view-1-dialog';
        this.caption = 'Hello World';
        this.getDialogResult = this.getDialogResult;
    }

    render() { 
        return html`
            <div class="content">DIALOG CONTENT DIALOG CONTENT DIALOG CONTENT DIALOG CONTENT DIALOG CONTENT</div>
            <div class="content">${JSON.stringify(this.customData)}</div>
        `;
    }

    onDialogAction(action) {
        console.log(`DIALOG ACTION '${action}' WAS INVOKED`);

        if (action === 'child') {
            this.showDialog('app-1-view-1-dialog-child', './apps/app-1/views/app-1-view-1-dialog-child.html', { bar: 'foo' }, (result) => {
                console.log('*** SHOW CHILD DIALOG CALLBACK ***');
                console.log(result);
            });
        } else {
            this.showMessageDialog('Question', 'Do you really want to do this?', [
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
                console.log(`*** CHILD MESSAGE DIALOG DISMISSED: ${action} ***`);
            });
        }
    }

    getDialogResult(action) {
        return {
            result: `This is the custom result for '${action}'`
        } 
    }
}

window.customElements.define('app-1-view-1-dialog-content', App1View1DialogContent);
