/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { ObapCompositeHostedApplicationDialogController } from '../../../../src/obap-composite-hosted-application/obap-composite-hosted-application-dialog-controller.js';
import { html, css, LitElement } from 'lit-element';

export class App1View1DialogChildContent extends ObapCompositeHostedApplicationDialogController(LitElement) {
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
            }
        ];

        this.dialogId = 'app-1-view-1-dialog-child';
        this.caption = 'Child Dialog';
        this.getDialogResult = this.getDialogResult;
    }

    render() { 
        return html`
            <div class="content">CHILD CONTENT</div>
            <div class="content">${JSON.stringify(this.customData)}</div>
        `;
    }

    onDialogAction(action) {
        console.log(`CHILD DIALOG ACTION '${action}' WAS INVOKED`);
    }

    getDialogResult(action) {
        return {
            result: `This is the custom result for child '${action}'`
        } 
    }
}

window.customElements.define('app-1-view-1-dialog-child-content', App1View1DialogChildContent);
