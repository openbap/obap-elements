/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import '../obap-selector/obap-selector.js';
/**
 * A navigation element that uses small circles as navigation items (like on a carousel).
 */
export class ObapPillNavigator extends ObapElement {
    static get styles() {
        return [css`
            :host {
                --obap-pill-color: var(--obap-block-color, #ECECEC);
                --obap-pill-hover-color: var(--obap-block-color, #ECECEC);
                --obap-pill-selected-color: var(--obap-primary-color, #5c6bc0);
                --obap-pill-border-color: var(--obap-block-color, #ECECEC);
                --obap-pill-hover-border-color: var(--obap-block-color, #ECECEC);
                --obap-pill-selected-border-color: var(--obap-primary-color, #5c6bc0);
                --obap-pill-disabled-color: #E0E0E0;
                --obap-pill-border-size: 0;
                --obap-pill-hover-border-size: 0;
                --obap-pill-selected-border-size: 0;
                --obap-pill-size: 12px;
                --obap-pill-hover-size: 12px;
                --obap-pill-selected-size: 12px;
                --obap-pill-separation: 4px;
                display: block;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            :host([readonly]) {
                pointer-events: none;
            }

            :host([disabled]) > .container > .pill {
                width: var(--obap-pill-size);
                height: var(--obap-pill-size);
                background: var(--obap-pill-disabled-color);
                border: none;
            }

            .container {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .pill {
                width: var(--obap-pill-size);
                height: var(--obap-pill-size);
                margin-right: var(--obap-pill-separation);
                background: var(--obap-pill-color);
                border-radius: 50%;
                border: var(--obap-pill-border-size) solid var(--obap-pill-border-color);
                box-sizing: border-box;
                cursor: pointer;
            }

            .pill:hover {
                width: var(--obap-pill-hover-size);
                height: var(--obap-pill-hover-size);
                background: var(--obap-pill-hover-color);
                border: var(--obap-pill-hover-border-size) solid var(--obap-pill-hover-border-color);
            }

            .pill[selected] {
                width: var(--obap-pill-selected-size);
                height: var(--obap-pill-selected-size);
                background: var(--obap-pill-selected-color);
                border: var(--obap-pill-selected-border-size) solid var(--obap-pill-selected-border-color);
                cursor: default;
            }

            .pill:last-of-type {
                margin-right: 0;
            }
        `];
    }

    static get properties() {
        return {
            count: {
                type: Number,
                attribute: 'count'
            },

            selected: {
                type: Number,
                attribute: 'selected'
            },

            readonly: {
                type: Boolean,
                attribute: 'readonly',
                reflect: true
            },

            disabledPills: {
                type: Array,
                attribute: 'disabled-pills'
            }
        }
    }

    get selected() {
        return this._selected;
    }

    set selected(value) {
        const oldValue = this.selected;

        if ((oldValue !== value) && (!this.disabled)) {
            this._selected = value;
            this.fireMessage('obap-pill-navigator-change', { oldValue: oldValue, newValue: this._selected });
            this.requestUpdate('selected', oldValue);
        }
    }

    constructor() {
        super();
        this.count = 0;
        this.readonly = false;
        this.disabledPills = [];
        this._selected = -1;
    }
    
    render() {
        return html`
            <obap-selector class="container" selected-index="${this.selected}" @obap-item-selected="${this._selectedHandler}">
                ${[...Array(this.count)].map((_, index) => html`<div class="pill" ?no-select="${this.disabledPills.indexOf(index) > -1}"></div>`)}
            </obap-selector>
        `;
    }

    next() {
        if ((!this.disabled) && (this.selected < this.count - 1)) {
            this.selected += 1;
        }
    }

    previous() {
        if ((!this.disabled) && (this.selected > 0)) {
            this.selected -= 1;
        }
    }

    first() {
       if ((!this.disabled) && (this.count > 0)) {
           this.selected = 0;
       }
    }

    last() {
        if ((!this.disabled) && (this.count > 0)) {
            this.selected = this.count - 1;
        }
    }

    _selectedHandler(e) {
        this.selected = e.detail.index;
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
    }
}

window.customElements.define('obap-pill-navigator', ObapPillNavigator);