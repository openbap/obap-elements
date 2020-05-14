/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapAttachedElementMixin } from '../obap-attached-element/obap-attached-element-mixin.js';

/**
`<obap-callout>` is a speech bubble element that appears on hover and focus when the user hovers over an element (defaults to above the element) with the cursor or with the keyboard. It will anchor to the element specified in the for attribute, or, if that doesn't exist the immediate previous sibling, failing that, the parent node containing it. It inherits all the `obap-attached-element` positioning propeties (anchor, inset, shift, offsetX and offsetY). It also has a positional arrow direction that can be set. You can also position it as a normal element by setting `fixed` to `true`.

## Usage

```javascript
import '@obap/obap-elements/obap-callout/obap-callout.js';

<!-- Positions based on id -->
<div>
    <div id="ib_1"></div>
    <obap-callout>callout</obap-callout>
</div>

<!-- Positions to previous sibling (div) -->
<div>
    <div class="sibling"></div>
    <obap-callout>callout</obap-callout>
</div>

<!-- Positions to the parent -->
<div class="parent">
    <obap-callout>callout</obap-callout>
</div>

<!-- No anchor (regular inline element) -->
<div>
    <obap-callout fixed>callout</obap-callout>
</div>

<!-- Positioning -->
<obap-callout anchor="middle-top" arrow-position="bottom">callout</obap-callout>
<obap-callout anchor="middle-bottom" arrow-position="top">callout</obap-callout>
<obap-callout anchor="middle-left" arrow-position="right">callout</obap-callout>
<obap-callout anchor="middle-right" arrow-position="left">callout</obap-callout>
```
@slot - - Default slot
 */
export class ObapCallout extends ObapAttachedElementMixin(ObapElement) {
    static get styles() {
        return [css`
            :host {
                --obap-callout-color: var(--obap-on-primary-color, #FFFFFF);
                --obap-callout-background-color: var(--obap-primary-light-color, #8e99f3);
                --obap-callout-arrow-size: 6px;
                --obap-callout-arrow-position: 50%;

                display: block;
                position: absolute;
                pointer-events: none;
                box-sizing: border-box;
                user-select: none;
                z-index: 1000;
                opacity: 0;
            }

            :host([elevated]) {
                filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.14))
						drop-shadow(0 1px 3px rgba(0, 0, 0, 0.12));
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

            :host([anchor="none"]) {
                position: inherit;
            }

            :host([fixed]) {
                z-index: inherit;
            }

            .container {
                position: relative;
                color: var(--obap-callout-color);
                background: var(--obap-callout-background-color);
                border-radius: 3px;
                padding: 8px;
                margin: var(--obap-callout-arrow-size);
            }

            .container[arrow-position="left"]:after {
                content: '';
                position: absolute;
                left: 0;
                top: var(--obap-callout-arrow-position);
                width: 0;
                height: 0;
                border: var(--obap-callout-arrow-size) solid transparent;
                border-right-color: var(--obap-callout-background-color);
                border-left: 0;
                margin-top: calc(var(--obap-callout-arrow-size) * -1);
                margin-left: calc(var(--obap-callout-arrow-size) * -1);
            }

            .container[arrow-position="right"]:after {
                content: '';
                position: absolute;
                right: 0;
                top: var(--obap-callout-arrow-position);
                width: 0;
                height: 0;
                border: var(--obap-callout-arrow-size) solid transparent;
                border-left-color: var(--obap-callout-background-color);
                border-right: 0;
                margin-top: calc(var(--obap-callout-arrow-size) * -1);
                margin-right: calc(var(--obap-callout-arrow-size) * -1);
            }

            .container[arrow-position="top"]:after {
                content: '';
                position: absolute;
                top: 0;
                left: var(--obap-callout-arrow-position);
                width: 0;
                height: 0;
                border: var(--obap-callout-arrow-size) solid transparent;
                border-bottom-color: var(--obap-callout-background-color);
                border-top: 0;
                margin-left: calc(var(--obap-callout-arrow-size) * -1);
                margin-top: calc(var(--obap-callout-arrow-size) * -1);
            }

            .container[arrow-position="bottom"]:after {
                content: '';
                position: absolute;
                bottom: 0;
                left: var(--obap-callout-arrow-position);
                width: 0;
                height: 0;
                border: var(--obap-callout-arrow-size) solid transparent;
                border-top-color: var(--obap-callout-background-color);
                border-bottom: 0;
                margin-left: calc(var(--obap-callout-arrow-size) * -1);
                margin-bottom: calc(var(--obap-callout-arrow-size) * -1);
            }
        `];
    }

    static get properties() {
        return {
            // left (default), right, top, bottom
            arrowPosition: {
                type: String,
                attribute: 'arrow-position'
            },

            fixed: {
                type: Boolean,
                attribute: 'fixed',
                reflect: true
            },

            elevated: {
                type: Boolean,
                attribute: 'elevated',
                reflect: true
            },

            triggerTime: {
                type: Number,
                attribute: 'trigger-time'
            }
        }
    }

    constructor() {
        super();
        this.arrowPosition = 'bottom';
        this.fixed = false;
        this.anchor = "middle-top";
        this.elevated = false;
        this.inset = 'out';
        this._showing = false;
        this.triggerTime = 500;

        this._boundHandleMouseEnterEvent = this._handleMouseEnterEvent.bind(this);
        this._boundHandleMouseLeaveEvent = this._handleMouseLeaveEvent.bind(this);
        this._boundHandleFocusEvent = this._handleFocusEvent.bind(this);
        this._boundHandleBlurEvent = this._handleBlurEvent.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();

        if (this.targetElement && this.anchor !== 'none' && !this.fixed) {
            this.targetElement.addEventListener('mouseenter', this._boundHandleMouseEnterEvent);
            this.targetElement.addEventListener('mouseleave', this._boundHandleMouseLeaveEvent);
            this.targetElement.addEventListener('focus', this._boundHandleFocusEvent);
            this.targetElement.addEventListener('blur', this._boundHandleBlurEvent);
        }
    }

    disconnectedCallback() {
        if (this.targetElement && this.anchor !== 'none' && !this.fixed) {
            this.targetElement.removeEventListener('mouseenter', this._boundHandleMouseEnterEvent);
            this.targetElement.removeEventListener('mouseleave', this._boundHandleMouseLeaveEvent);
            this.targetElement.removeEventListener('focus', this._boundHandleFocusEvent);
            this.targetElement.removeEventListener('blur', this._boundHandleBlurEvent);
        }

        super.disconnectedCallback();
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            if (((propName === 'anchor') && (this.anchor === 'none')) || ((propName === 'fixed') && (this.fixed))) {
                this.show();
            }
        });
    }

    render() {
        return html`
            <div class="container" arrow-position="${this.arrowPosition}"><slot></slot></div>
        `;
    }

    show() {
        this._showing = true;

        setTimeout(() => {
            if (this._showing) {
                this.setAttribute('is-visible', null);
            }
        }, (this.anchor === 'none' || this.fixed) ? 0 : this.triggerTime);
        
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
        if (this.anchor === 'none' || this.fixed) return;

        if (!this._showing) {
            this.show();
        } else {
            this.hide();
        }
    }

    _handleBlurEvent(e) {
        if (this.anchor === 'none' || this.fixed) return;

        this.hide();
    }
}

window.customElements.define('obap-callout', ObapCallout);