/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';

/**
 * A semi-opaque backdrop for modal elements, such as dialogs.
 */
export class ObapBackdrop extends ObapElement {
    static get styles() {
        return [css`
            :host {
                --obap-backdrop-color: #000000;
                --obap-backdrop-opacity: 0.6;
                
                display: block;
                position: fixed;
                left: 0;
                top: 0;
                width: 100vw;
                height: 100vh;
                background: var(--obap-backdrop-color);
                pointer-events: none;
                transition: opacity 0.25s;
                opacity: 0;
  
            }
    
            :host([visible]) {
                pointer-events: auto;
                opacity: var(--obap-backdrop-opacity);
            }
    
            :host([disabled]) {
                pointer-events: none;
            }
        `];
    }

    static get properties() {
        return {
            visible: {
                type: Boolean,
                attribute: 'visible',
                reflect: true
            },

            _count: {
                type: Number,
                attribute: 'count',
                reflect: true
            }
        }
    }

    constructor() {
        super();
        this.visible = false;
        this._count = 0;
        this._zIndex = 248;
        this._items = [];
    }

    show(el) {
        const index = this._items.indexOf(el);

        if (index === -1) {
            this._items.push(el);
        }
        
        this._count += 1;
        this._zIndex += 2;
        this.style.zIndex = this._zIndex;

        if (el.modal) {
            this.visible = (this._count > 0);
        }
        
        return (this._zIndex + 1);
    }

    hide(el) {
        const index = this._items.indexOf(el);
        this._items.splice(index, 1);

        const topItem = this._items[this._items.length - 1]; 

        this._count -= 1;
        this._zIndex -= 2;
        this.style.zIndex = this._zIndex;

        if (topItem && topItem.modal) {
            this.visible = (this._count > 0);
        }

        if (this._count === 0) {
            this.parentNode.removeChild(this);
        }
    }

    isOnTop(el) {
        const index = this._items.indexOf(el);
        return (index === this._items.length - 1);
    }
}

window.customElements.define('obap-backdrop', ObapBackdrop);
