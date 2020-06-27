/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapStepperController } from './obap-stepper-controller.js';
import { body, subtitle } from '../obap-styles/obap-typography.js';
import '../obap-pages/obap-pages.js';
import '../obap-icon/obap-icon.js';
import '../obap-button/obap-button.js';
import '../obap-linear-progress/obap-linear-progress.js';
import './obap-stepper-step.js';

/**
 * A compact Material Design Stepper (wizard) where the only the active label is displayed.
 */
export class ObapCompactStepper extends ObapStepperController(ObapElement) {
    static get styles() {
        return [body, subtitle, css`
            :host {
                display: block;
                background: var(--obap-window-color, #E0E0E0);
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            obap-pages {
                flex: 1;
                height: 100%;
                background: var(--obap-surface-color, #FFFFFF);
            }

            obap-icon {
                margin: 0 8px;
                width: 16px;
                height: 16px;
                fill: var(--obap-error-color, #e53935);
            }

            obap-linear-progress[error] {
                --obap-linear-progress-primary-color: #e53935;
            }

            .container {
                display: flex;
                flex-direction: column;
                height: 100%;
            }

            .container > ::slotted(*) {
                margin-bottom: 2px;
            }

            .header {
                display: flex;
                align-items: center;
                height: 48px;
                margin-bottom: 2px;
                padding: 0 16px;
                background: var(--obap-surface-color, #FFFFFF);
            }

            .label {
                flex: 1;
            }

            .header-right {
                display: flex;
            }

            .content {
                flex: 1;
                background: var(--obap-surface-color, #FFFFFF);
            }

            .footer {
                display: flex;
                align-items: center;
                height: 48px;
                margin-top: 2px;
                padding: 0 8px;
                background: var(--obap-surface-color, #FFFFFF);
            }

            .footer-section {
                display: flex;
                align-items: center;
            }

            .navigator {
                flex: 1;
                padding: 4px;
            }
        `];
    }
    
    render() {
        const step = this.steps[this.selected];
        const errored = this.steps.filter((step) => step.error).length > 0;

        return html`
            <div class="container">
                ${this._renderHeader(this.selected, step)}

                <slot name="summary"></slot>

                <div class="content">
                    <obap-pages><slot name="step"></slot></obap-pages>
                </div>

                ${this._renderFooter(this.selected, errored)}
            </div>
        `;
    }

    _renderHeader(selected, step) {
        return step ? html`
            <div class="header">
                <div class="label typography-subtitle">${step.label}</div>
                ${step.error ? html`<obap-icon icon="core:error"></obap-icon>` : null}
                <div class="typography-body">${selected + 1}/${this.steps.length}</div>
            </div>
        ` : null;
    }

    _renderFooter(selected, errored) {
        return html`
            <div class="footer">
                <div class="footer-section">
                    <obap-button round icon="core:cross" ?disabled="${this.disabled || !this.canCancel}" @click="${() => this.cancel()}"></obap-button>
                    <obap-button round icon="core:chevron-left" ?disabled="${this.disabled || !this.canMoveBack()}" @click="${() => this.previousStep()}"></obap-button>
                </div>
                <div class="navigator">${this._renderNavigator(selected, errored)}</div>
                <div class="footer-section">
                    <obap-button round icon="core:chevron-right" ?disabled="${this.disabled || !this.canMoveForward()}" @click="${() => this.nextStep()}"></obap-button>
                    <obap-button round icon="core:check" ?disabled="${this.disabled || !this.canFinish()}" @click="${() => this.finish()}"></obap-button>
                </div>
            </div>
        `;
    }

    _renderNavigator(selected, errored) {
        return html`
            <obap-linear-progress ?error="${errored}" max="${this.steps.length}" value="${selected + 1}"></obap-linear-progress>
        `;
    }
}

window.customElements.define('obap-compact-stepper', ObapCompactStepper);
