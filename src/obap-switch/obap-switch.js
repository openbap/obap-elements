/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, svg, ObapElement } from '../obap-element/obap-element.js';
import { button } from '../obap-styles/obap-typography.js';

export class ObapSwitch extends ObapElement {
    static get styles() {
        return [button, css`
            :host {
                --obap-switch-checked-track-color: var(--obap-on-primary-color, white);
                --obap-switch-checked-track-background-color: var(--obap-primary-light-color, #8e99f3);
                --obap-switch-unchecked-track-color: var(--obap-on-surface-color, rgba(0, 0, 0, 0.87));
                --obap-switch-unchecked-track-background-color: #EFEFEF;
                --obap-switch-checked-thumb-background-color: var(--obap-primary-color, #5c6bc0);
                --obap-switch-unchecked-thumb-background-color: var(--obap-surface-color, white);

                --obap-switch-disabled-color: #CCCCCC;
                --obap-switch-disabled-background-color: #EEEEEE;

                --obap-switch-height: 24px;
                display: inline-block;
                overflow: hidden;
                cursor: pointer;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
                --obap-switch-checked-track-color: var(--obap-switch-disabled-color);
                --obap-switch-checked-track-background-color: var(--obap-switch-disabled-background-color);
                --obap-switch-unchecked-track-color: var(--obap-switch-disabled-color);
                --obap-switch-unchecked-track-background-color:var(--obap-switch-disabled-background-color);
                --obap-switch-checked-thumb-background-color: var(--obap-switch-disabled-color);
                --obap-switch-unchecked-thumb-background-color: var(--obap-switch-disabled-color);
            }

            .container {
                display: flex;
                flex-direction: row;
                height: var(--obap-switch-height);
                position: relative;
                overflow: hidden;
                color: var(--obap-switch-checked-track-color);
                background: var(--obap-switch-checked-track-background-color);
                border-radius: var(--obap-switch-height);
                padding: 0 0 0 8px;
            }

            .container[position="left"] {
                color: var(--obap-switch-unchecked-track-color);
                background: var(--obap-switch-unchecked-track-background-color);
                flex-direction: row-reverse;
                padding: 0 8px 0 0;
            }

            .container[has-track] {
                background: transparent;
            }

            .content {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                min-width: calc((var(--obap-switch-height) / 2) - 4px);
                width: 100%;
            }

            .marker {
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: 2px;
                min-width: calc(var(--obap-switch-height) - 4px);
                min-height: calc(var(--obap-switch-height) - 4px);
                border-radius: 50%;
                background: var(--obap-switch-checked-thumb-background-color);
                z-index: 2;
            }

            .marker[position="left"] {
                background: var(--obap-switch-unchecked-thumb-background-color);
            }

            .marker[elevate] {
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 1px 5px 0 rgba(0, 0, 0, 0.12),
                0 3px 1px -2px rgba(0, 0, 0, 0.2);
            }

            .track {
                position: absolute;
                border-radius: 7px;
                height: 14px;
                width: calc(100% - 8px);
                left: 4px;
                top: calc((var(--obap-switch-height) / 2) - 7px);
                background: var(--obap-switch-checked-track-background-color);
            }

            .track[position="left"] {
                background: var(--obap-switch-unchecked-track-background-color);
            }
        `];
    }

    static get properties() {
        return {
            checked: {
                type: Boolean,
                attribute: 'checked',
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

    constructor() {
        super();
        this.checked = false;
        this.leftLabel = '';
        this.rightLabel = '';
    }

    render() {
        return html`
            <div class="container typography-button" ?has-track="${!this._hideTrack()}" position="${this.checked ? 'right' : 'left'}" @click="${this._toggleClick}">
                <div class="track" ?hidden="${this._hideTrack()}" position="${this.checked ? 'right' : 'left'}"></div>
                <div class="content">${this.checked ? this.rightLabel : this.leftLabel}</div>
                <div class="marker" ?elevate="${!this._hideTrack()}" position="${this.checked ? 'right' : 'left'}"></div>
            </div>
        `;
    }

    _toggleClick() {
        this.checked = !this.checked;
        
        const event = new CustomEvent('change', {
            detail: {
                checked: this.checked,
                name: this.name
            },
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(event);
    }

    _hideTrack() {
        return this.leftLabel || this.rightLabel;
    }
}

window.customElements.define('obap-switch', ObapSwitch);
