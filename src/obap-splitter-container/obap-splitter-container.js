/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import '../obap-splitter/obap-splitter.js';
/**
 * A horizontal or vertical container with a splitter that allows two content areas to be resized.
 */
export class ObapSplitterContainer extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: flex;
                overflow: hidden;
                user-select: none;
                align-items: stretch;
            }

            :host([orientation="vertical"]) {
                flex-direction: column;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }
        `];
    }

    static get properties() {
        return {
            // horizontal (default), vertical.
            orientation: {
                type: String,
                attribute: 'orientation',
                reflect: true
            },

            showHandle: {
                type: Boolean,
                attribute: 'show-handle'
            }
        }
    }

    constructor() {
        super();
        this._processedChildren = false;
        this.orientation = 'horizontal';
        this.showHandle = false;
        this._boundHandleSlotChangeEvent = this._handleSlotChangeEvent.bind(this);
        this.renderRoot.addEventListener('slotchange', this._boundHandleSlotChangeEvent);
    }

    render() {
        return html`<slot></slot>`;
    }

    _handleSlotChangeEvent(e) {
        if (this._processedChildren) return;

        let slot = this.renderRoot.querySelector('slot');

        let items = slot.assignedNodes({ flatten: true }).filter((el) => {
            return (el.nodeType === 1) && (el.tagName !== 'OBAP-SPLITTER');
        });

        for (let i = 0; i < items.length - 1; i++) {
            const item = items[i];
            item.parentNode.insertBefore(this._createSplitterNode(), item.nextSibling);
        }

        this._processedChildren = true;
    }

    _createSplitterNode() {
        const splitter = document.createElement('obap-splitter');
        splitter.orientation = this.orientation === 'vertical' ? 'horizontal' : 'vertical';
        splitter.showHandle = this.showHandle;
        return splitter;
    }
}

window.customElements.define('obap-splitter-container', ObapSplitterContainer);