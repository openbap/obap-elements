/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, svg, ObapElement } from '../obap-element/obap-element.js';
import { button } from '../obap-styles/obap-typography.js';

export class ObapSwitch extends ObapElement {
    static get styles() {
        return [button, css`
            :host {
                --obap-switch-label-color: var(--obap-on-surface-color, rgba(0, 0, 0, 0.87));
                --obap-switch-selected-label-color: var(--obap-on-primary-color, white);        
                --obap-switch-track-color: #EFEFEF;
                --obap-switch-selected-track-color: var(--obap-primary-light-color, #8e99f3);
                --obap-switch-thumb-color: var(--obap-surface-color, white);
                --obap-switch-selected-thumb-color: var(--obap-primary-color, #5c6bc0);
                --obap-switch-disabled-color: #CCCCCC;
                --obap-switch-disabled-background-color: #EEEEEE;
                --obap-switch-animation-speed: 0.15s;

                display: inline-block;
                cursor: pointer;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
                --obap-switch-label-color: var(--obap-switch-disabled-color);
                --obap-switch-track-color: var(--obap-switch-disabled-background-color);
                --obap-switch-thumb-color: var(--obap-switch-disabled-background-color);
            }

            .container {
                position: relative;
                height: 24px;
                padding: 5px;
                box-sizing: border-box;
            }

            .container[has-label] {
                padding: 0;
            }

            .track {
                display: flex;
                flex-direction: row-reverse;
                align-items: center;
                height: 100%;
                border-radius: var(--obap-border-radius-pill, 9999px);
                padding: 0 10px 0 26px;
                color: var(--obap-switch-label-color);
                background: var(--obap-switch-track-color);
                transition: all var(--obap-switch-animation-speed) linear;
            }

            .track[selected] {
                flex-direction: row;
                padding: 0 26px 0 10px;
                color: var(--obap-switch-selected-label-color);
                background: var(--obap-switch-selected-track-color);
            }

            .thumb {
                position: absolute;
                top: 2px;
                left: 2px;
                width: 20px;
                height: 20px;
                border-radius: var(--obap-border-radius-circle, 50%);
                background: var(--obap-switch-thumb-color);
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                            0 1px 5px 0 rgba(0, 0, 0, 0.12),
                            0 3px 1px -2px rgba(0, 0, 0, 0.2);

                transition: all var(--obap-switch-animation-speed) linear;
            }

            .thumb[selected] {
                top: 2px;
                left: calc(100% - 22px);
                background: var(--obap-switch-selected-thumb-color);
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                            0 1px 5px 0 rgba(0, 0, 0, 0.12),
                            0 3px 1px -2px rgba(0, 0, 0, 0.2);
            }

            .track:not([has-label]):not([selected]) {
                padding: 0 10px 0 23px;
            }

            .track:not([has-label])[selected] {
                padding: 0 23px 0 10px;
            }
        `];
    }

    static get properties() {
        return {
            selected: {
                type: Boolean,
                attribute: 'selected',
                reflect: true
            },

            leftLabel: {
                type: String,
                attribute: 'left-label'
            },

            rightLabel: {
                type: String,
                attribute: 'right-label'
            }
        }
    }

    get selected() {
        return this._selected;
    }

    set selected(value) {
        const oldValue = this.selected;

        if (oldValue !== value) {
            this._selected = value;
            this.setAttribute('aria-checked', value);
            this.requestUpdate('selected', oldValue);
        }
    }

    constructor() {
        super();
        this.role = 'switch';
        this.selected = false;
        this.leftLabel = '';
        this.rightLabel = '';
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            if ((propName === 'leftLabel') || (propName === 'rightLabel')) {
                if (this.leftLabel && this.rightLabel) {
                    this.setAttribute('aria-label', `${this.leftLabel} ${this.rightLabel}`);
                } else {
                    this.setAttribute('aria-label', 'switch');
                }
            }
        });
    }

    render() {
        const hasLabel = (this.leftLabel && this.rightLabel);

        return html`
            <div class="container" ?has-label="${hasLabel}" @click="${this._toggleClick}">
                <div class="track" ?selected="${this.selected}" ?has-label="${hasLabel}">
                    ${hasLabel ? html`<div class="label typography-button" ?selected="${this.selected}">${this.selected ? this.leftLabel : this.rightLabel}</div>` : null}
                </div>
                <div class="thumb" ?selected="${this.selected}"></div>
            </div>
        `;
    }

    _toggleClick() {
        this.selected = !this.selected;

        this.fireMessage('change', {
            selected: this.selected,
            name: this.name
        });
    }
}

window.customElements.define('obap-switch', ObapSwitch);