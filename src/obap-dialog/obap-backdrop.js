/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { css, ObapElement } from '../obap-element/obap-element.js';
import { opacityAnimation } from '../obap-animation/obap-animation.js';
/**
 * A semi-opaque backdrop for modal elements, such as dialogs.
 */
export class ObapBackdrop extends ObapElement {
    static get styles() {
        return [css`
            :host {
                --obap-backdrop-color: #000000;
                --obap-backdrop-opacity: 0.35;
                
                display: none;
                position: fixed;
                left: 0;
                top: 0;
                width: 100vw;
                height: 100vh;
                background: var(--obap-backdrop-color);
                pointer-events: none;
            }
    
            :host([visible]) {
                pointer-events: auto;
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

            animationDuration: {
                type: Number,
                attribute: 'animation-duration'
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
        this._visible = false;
        this.animationDuration = 280;
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

            if (this.visible && this._count === 1) {
                opacityAnimation(this, 0, this.opacity, () => this.style.display = 'block', null, this.animationDuration);
            }
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

        if ((this.visible) && (this._count === 0)) {
            opacityAnimation(this, this.opacity, 0, null, () => {
                this.style.display = 'none';

                if (this._count === 0) {
                    this.parentNode.removeChild(this);
                }
            }, this.animationDuration);
        }
    }

    isOnTop(el) {
        const index = this._items.indexOf(el);
        return (index === this._items.length - 1);
    }

    get opacity() {
        const cs = getComputedStyle(this);
        return this.getCssVariableValue(cs, '--obap-backdrop-opacity', 0.6);
    }
}

window.customElements.define('obap-backdrop', ObapBackdrop);
