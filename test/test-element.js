/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, LitElement } from 'lit-element';

export class TestElement extends LitElement {
    static get styles() {
        return css`
            :host {
                display: block;
            }
        `;
    }
    
    static get properties() {
        return {
            items: {
                type: Array
            }
        }
    }

    render() {
        return html`<slot></slot>`;
    }

    constructor() {
        super();
        this.items = [];
        this._boundHandleSlotChangeEvent = this._handleSlotChangeEvent.bind(this);
        this.renderRoot.addEventListener('slotchange', this._boundHandleSlotChangeEvent);
    }

    _handleSlotChangeEvent() {
        let slot = this.renderRoot.querySelector('slot');
        if (!slot) return;

        let items = slot.assignedNodes({ flatten: true }).filter((el) => {
            return el.nodeType === 1;
        });

        this.items = items;
        this.requestUpdate();
    }
}

customElements.define('test-element', TestElement);
