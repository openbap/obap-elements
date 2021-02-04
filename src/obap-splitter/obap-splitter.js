/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';

/**
 * A splitter element that resizes its adjacent siblings relative to each other.
 */
export class ObapSplitter extends ObapElement {
    static get styles() {
        return [css`
            :host {
                --obap-splitter-color: transparent;
                --obap-splitter-handle-color: #9E9E9E;
                --obap-splitter-size: 4px;
                --obap-splitter-handle-size: 24px;
                display: block;
                overflow: hidden;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            :host([orientation="vertical"]) > .container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: var(--obap-splitter-size);
                height: 100%;
                cursor: ew-resize;
                background: var(--obap-splitter-color);
                overflow: hidden;
            }

            :host([orientation="horizontal"]) > .container {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: var(--obap-splitter-size);
                cursor: ns-resize;
                background: var(--obap-splitter-color);
                overflow: hidden;
            }

            :host([orientation="vertical"]) > .container > .handle {
                pointer-events: none;
                width: 50%;
                height: var(--obap-splitter-handle-size);
                background: var(--obap-splitter-handle-color);
            }

            :host([orientation="horizontal"]) > .container > .handle {
                pointer-events: none;
                width: var(--obap-splitter-handle-size);
                height: 50%; 
                background: var(--obap-splitter-handle-color);
            }
        `];
    }

    static get properties() {
        return {
            // horizontal, vertical (default).
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
        this.orientation = 'vertical';
        this.showHandle = false;

        this._resizerContent_1 = null;
        this._resizerContent_2 = null;
        this._resizing = false;

        this._boundHandleResizeStart = this._handleResizeStart.bind(this);
        this._boundHandleResizeStep = this._handleResizeStep.bind(this);
        this._boundHandleResizeEnd = this._handleResizeEnd.bind(this);
        this._boundHandleDoubleClick = this._handleDoubleClick.bind(this);

        document.addEventListener('mousemove', this._boundHandleResizeStep);
        document.addEventListener('mouseup', this._boundHandleResizeEnd);
        document.addEventListener('touchmove', this._boundHandleResizeStep);
        document.addEventListener('touchend', this._boundHandleResizeEnd);
    }

    render() {
        return html`
            <div class="container" @dblclick="${this._boundHandleDoubleClick}" @mousedown="${this._boundHandleResizeStart}" @touchstart="${this._boundHandleResizeStart}">
                ${this.showHandle ? html`<div class="handle"></div>` : null}
            </div>`;
    }

    _handleDoubleClick(e) {
        const resizerContent_1 = this.previousElementSibling;
        const resizerContent_2 = this.nextElementSibling;

        if (this.orientation === 'horizontal') {
            let resizerContentSize_1 = resizerContent_1.getBoundingClientRect().height;
            let resizerContentSize_2 = resizerContent_2.getBoundingClientRect().height;
            const sum = resizerContentSize_1 + resizerContentSize_2;

            if (resizerContentSize_1 === 0) {
                resizerContent_1.style.height = sum + 'px';
                resizerContent_2.style.height = '0px';
            } else if (resizerContentSize_2 === 0) {
                resizerContent_1.style.height = '0px';
                resizerContent_2.style.height = sum + 'px';
            } else if (resizerContentSize_1 <= resizerContentSize_2) {
                resizerContent_1.style.height = '0px';
                resizerContent_2.style.height = sum + 'px';
            } else {
                resizerContent_1.style.height = sum + 'px';
                resizerContent_2.style.height = '0px';
            }
        } else {
            let resizerContentSize_1 = resizerContent_1.getBoundingClientRect().width;
            let resizerContentSize_2 = resizerContent_2.getBoundingClientRect().width;
            const sum = resizerContentSize_1 + resizerContentSize_2;

            if (resizerContentSize_1 === 0) {
                resizerContent_1.style.width = sum + 'px';
                resizerContent_2.style.width = '0px';
            } else if (resizerContentSize_2 === 0) {
                resizerContent_1.style.width = '0px';
                resizerContent_2.style.width = sum + 'px';
            } else if (resizerContentSize_1 <= resizerContentSize_2) {
                resizerContent_1.style.width = '0px';
                resizerContent_2.style.width = sum + 'px';
            } else {
                resizerContent_1.style.width = sum + 'px';
                resizerContent_2.style.width = '0px';
            }
        }
    }

    _handleResizeStart(e) {
        this._resizerContent_1 = this.previousElementSibling;
        this._resizerContent_2 = this.nextElementSibling;
        this._resizing = true;

        if (this.orientation === 'horizontal') {
            this._resizerContentSize_1 = this._resizerContent_1.getBoundingClientRect().height;
            this._resizerContentSize_2 = this._resizerContent_2.getBoundingClientRect().height;
            this._resizerOffset = (e.type === 'touchstart') ? e.changedTouches[0].pageY : e.pageY;
        } else {
            this._resizerContentSize_1 = this._resizerContent_1.getBoundingClientRect().width;
            this._resizerContentSize_2 = this._resizerContent_2.getBoundingClientRect().width;
            this._resizerOffset = (e.type === 'touchstart') ? e.changedTouches[0].pageX : e.pageX;
        }
    }

    _handleResizeStep(e) {
        if (this._resizing) {
            const oldSize_1 = this._resizerContentSize_1;
            const oldSize_2 = this._resizerContentSize_2;

            if (this.orientation === 'horizontal') {
                const py = (e.type === 'touchmove') ? e.changedTouches[0].pageY : e.pageY;
                const dy = py - this._resizerOffset;

                this._resizerOffset = py;

                this._resizerContentSize_1 = this._resizerContentSize_1 + dy;
                this._resizerContentSize_2 = this._resizerContentSize_2 - dy;

                if ((this._resizerContentSize_1 >= -1) && (this._resizerContentSize_2 >= -1)) {
                    this._resizerContent_1.style.height = this._resizerContentSize_1 + 'px';
                    this._resizerContent_2.style.height = this._resizerContentSize_2 + 'px';
                } else {
                    this._resizerContentSize_1 = oldSize_1;
                    this._resizerContentSize_2 = oldSize_2;
                }
            } else {
                const px = (e.type === 'touchmove') ? e.changedTouches[0].pageX : e.pageX;
                const dx = px - this._resizerOffset;

                this._resizerOffset = px;

                this._resizerContentSize_1 = this._resizerContentSize_1 + dx;
                this._resizerContentSize_2 = this._resizerContentSize_2 - dx;

                if ((this._resizerContentSize_1 >= -1) && (this._resizerContentSize_2 >= -1)) {
                    this._resizerContent_1.style.width = this._resizerContentSize_1 + 'px';
                    this._resizerContent_2.style.width = this._resizerContentSize_2 + 'px';
                } else {
                    this._resizerContentSize_1 = oldSize_1;
                    this._resizerContentSize_2 = oldSize_2;
                }
            }
        }
    }

    _handleResizeEnd(e) {
        this._resizerContent_1 = null;
        this._resizerContent_2 = null;
        this._resizing = false;
    }
}

window.customElements.define('obap-splitter', ObapSplitter);
