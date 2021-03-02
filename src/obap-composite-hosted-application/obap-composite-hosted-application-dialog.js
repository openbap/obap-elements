/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapCompositeHostedApplicationDialogController } from './obap-composite-hosted-application-dialog-controller.js'
/**
 * TODO
 */
export class ObapCompositeHostedApplicationDialog extends ObapCompositeHostedApplicationDialogController(ObapElement) {
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

            .container {
                width: 100%;
                height: 100%;
            }
        `];
    }
    
    render() {
        return html`
            <div class="container">
                <slot></slot>
            </div>
        `;
    }

    onDialogAction(action) {
        this.fireMessage('dialog-action', { action: action });
    }
}

window.customElements.define('obap-composite-hosted-application-dialog', ObapCompositeHostedApplicationDialog);
