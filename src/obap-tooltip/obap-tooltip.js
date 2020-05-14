/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapAttachedElementMixin } from '../obap-attached-element/obap-attached-element-mixin.js';
import { caption } from '../obap-styles/obap-typography.js';

/**
`<obap-tooltip>` is a label that appears on hover and focus when the user hovers over an element (defaults to below the element) with the cursor or with the keyboard. It will anchor to the element specified in the for attribute, or, if that doesn't exist the immediate previous sibling, failing that, the parent node containing it. It inherits all the `obap-attached-element` positioning propeties (anchor, inset, shift, offsetX and offsetY).

## Usage

```javascript
import '@obap/obap-elements/obap-tooltip/obap-tooltip.js';

<!-- Positions based on id -->
<div>
    <div id="ib_1"></div>
    <obap-tooltip>tooltip</obap-tooltip>
</div>

<!-- Positions to previous sibling (div) -->
<div>
    <div class="sibling"></div>
    <obap-tooltip>tooltip</obap-tooltip>
</div>

<!-- Positions to the parent -->
<div class="parent">
    <obap-tooltip>tooltip</obap-tooltip>
</div>
`
@slot - - Default slot
 */
export class ObapTooltip extends ObapAttachedElementMixin(ObapElement) {
    static get styles() {
        return [caption, css`
            :host {
                --obap-tooltip-color: #FFFFFF;
                --obap-tooltip-background-color: rgba(97, 97, 97, 0.85);
                display: block;
                position: absolute;
                pointer-events: none;
                box-sizing: border-box;
                overflow: hidden;
                user-select: none;
                border-radius: 2px;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.75s cubic-bezier(0.4, 0, 0.2, 1);
                padding: 2px 4px;
                color: var(--obap-tooltip-color);
                background: var(--obap-tooltip-background-color);
            }

            :host([anchor="none"]) {
                position: inherit;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            :host([is-visible]) {
                opacity: 1.0;
            }
        `];
    }

    static get properties() {
        return {
            triggerTime: {
                type: Number,
                attribute: 'trigger-time'
            }
        }
    }

    constructor() {
        super();
        this.anchor = 'middle-bottom';
        this.inset = 'out';
        this.triggerTime = 500;
        this._showing = false;

        this._boundHandleMouseEnterEvent = this._handleMouseEnterEvent.bind(this);
        this._boundHandleMouseLeaveEvent = this._handleMouseLeaveEvent.bind(this);
        this._boundHandleFocusEvent = this._handleFocusEvent.bind(this);
        this._boundHandleBlurEvent = this._handleBlurEvent.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();

        if (this.targetElement) {
            this.targetElement.addEventListener('mouseenter', this._boundHandleMouseEnterEvent);
            this.targetElement.addEventListener('mouseleave', this._boundHandleMouseLeaveEvent);
            this.targetElement.addEventListener('focus', this._boundHandleFocusEvent);
            this.targetElement.addEventListener('blur', this._boundHandleBlurEvent);
        }
    }

    disconnectedCallback() {
        if (this.targetElement) {
            this.targetElement.removeEventListener('mouseenter', this._boundHandleMouseEnterEvent);
            this.targetElement.removeEventListener('mouseleave', this._boundHandleMouseLeaveEvent);
            this.targetElement.removeEventListener('focus', this._boundHandleFocusEvent);
            this.targetElement.removeEventListener('blur', this._boundHandleBlurEvent);
        }

        super.disconnectedCallback();
    }

    render() {
        return html`<div class="typography-caption"><slot></slot></div>`;
    }

    show() {
        this._showing = true;

        setTimeout(() => {
            if (this._showing) {
                this.setAttribute('is-visible', null);
            }
        }, this.triggerTime);
        
    }

    hide() {
        this._showing = false;
        this.removeAttribute('is-visible');
    }

    _handleMouseEnterEvent(e) {
        this.show();
    }

    _handleMouseLeaveEvent(e) {
        this.hide();
    }

    _handleFocusEvent(e) {
        if (!this._showing) {
            this.show();
        } else {
            this.hide();
        }
    }

    _handleBlurEvent(e) {
        this.hide();
    }
}

window.customElements.define('obap-tooltip', ObapTooltip);
