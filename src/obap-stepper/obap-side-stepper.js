/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapStepperController } from './obap-stepper-controller.js';
import { body, caption } from '../obap-styles/obap-typography.js';
import '../obap-icon/obap-icon.js';
import '../obap-badge/obap-badge.js';
import '../obap-selector/obap-selector.js';
import '../obap-selector/obap-selector-container.js';
import './obap-stepper-step.js';

/**
 * A Material Design 'Side' Stepper (wizard). Step labels are on the left.
 */
export class ObapSideStepper extends ObapStepperController(ObapElement) {
    static get styles() {
        return [body, caption, css`
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

            obap-icon {
                width: 14px;
                height: 14px;
            }

            obap-pages {
                flex: 1;
                height: 100%;
                background: var(--obap-surface-color, #FFFFFF);
            }

            .main-container {
                height: 100%;
                display: flex;
                flex-direction: column;
            }

            .container {
                flex: 1;
                display: flex;
            }

            .right-container {
                flex: 1;
                display: flex;
                flex-direction: column;
            }

            .left-container {
                background: var(--obap-surface-color, #FFFFFF);
                padding: 16px 4px;
                margin-right: 2px;
            }

            .navigator {
                position: relative;
                display: flex;
                flex-direction: column;
            }

            .pages {
                flex: 1;
                display: flex;
                flex-direction: column;
            }

            .pages > ::slotted(*) {
                margin: 0 0 2px 0;
            }

            .pages[summary-position="bottom"] {
                flex-direction: column-reverse;
            }

            .pages[summary-position="bottom"] > ::slotted(*) {
                margin: 2px 0 0 0;
            }

            .pages[summary-position="left"] {
                flex-direction: row;
            }

            .pages[summary-position="left"] > ::slotted(*) {
                margin: 0 2px 0 0;
            }

            .pages[summary-position="right"] {
                flex-direction: row-reverse;
            }

            .pages[summary-position="right"] > ::slotted(*) {
                margin: 0 0 0 2px;
            }

            .actions {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 48px;
                padding: 0 8px;
                margin-top: 2px;
                background: var(--obap-surface-color, #FFFFFF);
            }

            .line {
                position: absolute;
                left: 20px;
                top: 0;
                width: 1px;
                margin: 32px 0;
                height: calc(100% - 32px);
                background: var(--obap-divider-on-surface-color, rgba(0, 0, 0, 0.20));
            }

            .line[custom-icons] {
                left: 23px;
            }

            .header-item {
                display: flex;
                flex-direction: row;
                height: 40px;
                align-items: center;
                cursor: pointer;
                padding: 0 8px;
                margin-bottom: 32px;
                background: var(--obap-surface-color, #FFFFFF);
                z-index: 1;
            }

            .header-item:last-of-type {
                margin-bottom: 0;
            }

            .header-item[disabled] {
                pointer-events: none;
            }

            .header-item > * {
                pointer-events: none;
            }

            .badge {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                color: var(--obap-on-primary-color, #FFFFFF);
                background: var(--obap-inactive-color, #9E9E9E);
                margin-right: 8px;
            }

            .badge[visited] {
                background: var(--obap-primary-color, #5c6bc0);
            }

            .badge[selected] {
                background: var(--obap-primary-dark-color, #26418f);
            }

            .badge[error] {
                background: transparent;
            }

            .button {
                --obap-button-color: var(--obap-on-primary-color, white);
                --obap-button-disabled-color: var(--obap-text-disabled-color, rgba(0, 0, 0, 0.38));
                --obap-button-disabled-background-color: transparent;
            }

            .button-continue {
                --obap-button-background-color: var(--obap-primary-color, #5c6bc0);
            }

            .button-finish {
                --obap-button-background-color: var(--obap-accent-color, #ec407a);
            }

            .header-sub-label {
                color: var(--obap-text-secondary-color, rgba(0, 0, 0, 0.54));
            }

            .header-label[selected] {
                font-weight: 500;
            }

            .header-labels > *[error] {
                color: var(--obap-error-color, #e53935);
            }

            obap-icon[error] {
                width: 24px;
                height: 24px;
                --obap-icon-fill-color: var(--obap-error-color, #e53935);
            }

            obap-icon[large] {
                --obap-icon-width: 32px;
                --obap-icon-height: 32px;
                --obap-icon-fill-color: var(--obap-text-secondary-color, rgba(0, 0, 0, 0.54));
                width: 32px;
                height: 32px;
            }

            .icon-container {
                margin-right: 16px;
            }

            obap-badge {
                --obap-badge-color: var(--obap-on-primary-color, #FFFFFF);
                --obap-badge-background-color: var(--obap-inactive-color, #9E9E9E);
                --obap-badge-border-width: 2px;
                --obap-badge-size: 22px;
                --obap-badge-icon-size: 75%;
            }

            obap-badge[visited] {
                --obap-badge-background-color: var(--obap-primary-color, #5c6bc0);
            }

            obap-badge[selected] {
                --obap-badge-background-color: var(--obap-primary-dark-color, #26418f);
            }

            obap-badge[error] {
                --obap-badge-color: var(--obap-on-error-color, #FFFFFF);
                --obap-badge-background-color: var(--obap-error-color, #e53935);
            }
        `];
    }

    constructor() {
        super();
        this.summaryPosition = 'right';
    }

    render() {
        return html`
            <div class="main-container">
                <obap-selector-container class="container" selected-index="0">
                    <div class="left-container">
                        <obap-selector class="navigator" @obap-item-selected="${this._stepSelected}">
                            <div no-select class="line" ?custom-icons="${this.hasCustomIcons}"></div>
                            ${this.steps.map((step, index) => this._renderHeaderItem(step, index))}
                        </obap-selector>
                    </div>
    
                    <div class="right-container">
                        <div class="pages" summary-position="${this.summaryPosition}">
                            <slot name="summary"></slot>
                            <obap-pages selected-index="${this.selected}"><slot name="step"></slot></obap-pages>
                        </div>

                        
                    </div>
                    
                </obap-selector-container>
                <div class="actions">
                    ${this._renderActions()}
                </div>
            </div>
        `;
    }

    _renderHeaderItem(step, index) {
        return html`
            <div class="header-item" ?disabled="${this.disabled || step.disabled || !step.selectable}">
                ${step.icon ? this._renderHeaderIcon(step, index) : this._renderHeaderBadge(step, index)}
                ${this._renderHeaderLabels(step)}
            </div>
        `;
    }

    _renderHeaderIcon(step, index) {
        return html`
            <div class="icon-container">
                <obap-icon large icon="${step.icon}"></obap-icon>
                ${this._renderHeaderIconBadge(step, index)}
            </div>
        `;
    }

    _renderHeaderIconBadge(step, index) {
        if (step.error) {
            return html`<obap-badge elevation="2" error ?selected="${step.selected}" offset-x="-2" offset-y="2" label="!"></obap-badge>`;
        } else if (step.selected || !step.visited) {
            return html`<obap-badge elevation="2" ?selected="${step.selected}" ?visited="${step.visited}" offset-x="-2" offset-y="2" label="${index + 1}"></obap-badge>`;
        } else if (step.editable || step.optional) {
            return html`<obap-badge elevation="2" ?selected="${step.selected}" ?visited="${step.visited}" offset-x="-2" offset-y="2" icon="core:edit"></obap-badge>`;
        } else {
            return html`<obap-badge elevation="2" ?selected="${step.selected}" ?visited="${step.visited}" offset-x="-2" offset-y="2" icon="core:check"></obap-badge>`;
        }
    }

    _renderHeaderBadge(step, index) {
        if (step.error) {
            return html`<div class="badge" error ?selected="${step.selected}"><obap-icon error icon="core:error"></obap-icon></div>`;
        } else if (step.selected || !step.visited) {
            return html`<div class="badge" ?selected="${step.selected}" ?visited="${step.visited}">${index + 1}</div>`;
        } else if (step.editable || step.optional) {
            return html`<div class="badge" ?selected="${step.selected}" ?visited="${step.visited}"><obap-icon icon="core:edit"></obap-icon></div>`;
        } else {
            return html`<div class="badge" ?selected="${step.selected}" ?visited="${step.visited}"><obap-icon icon="core:check"></obap-icon></div>`;
        }
    }

    _renderHeaderLabels(step) {
        if (step.error) {
            return html`
                <div class="header-labels" error>
                    <div error class="typography-body header-label" ?selected="${step.selected}">${step.label}</div>
                    <div error class="typography-caption header-sub-label">${step.errorLabel ? step.errorLabel : this.errorText}</div>
                </div>
            `;
        }

        return html`
            <div class="header-labels">
                <div class="typography-body header-label" ?selected="${step.selected}">${step.label}</div>
                <div class="typography-caption header-sub-label">${step.optional ? this.optionalText : step.subLabel}</div>
            </div>
        `;
    }

    _renderActions() {
        return html`
          <div>
            <obap-button label="${this.backText}" ?disabled="${this.disabled || !this.canMoveBack()}" @click="${() => this.previousStep()}"></obap-button>
          </div>
          <div>
            <obap-button label="${this.cancelText}" ?disabled="${this.disabled || !this.canCancel}" @click="${() => this.cancel()}"></obap-button>
            <obap-button label="${this.continueText}" raised class="button button-continue" ?disabled="${this.disabled || !this.canMoveForward()}" @click="${() => this.nextStep()}"></obap-button>
            <obap-button label="${this.finishText}" raised class="button button-finish" ?disabled="${this.disabled || !this.canFinish()}" @click="${() => this.finish()}"></obap-button>
          </div>
        `;
    }

    _stepSelected(e) {
        this.setStep(e.detail.index);
    }
}

window.customElements.define('obap-side-stepper', ObapSideStepper);