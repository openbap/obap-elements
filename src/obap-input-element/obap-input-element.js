/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, svg, ObapElement } from '../obap-element/obap-element.js';

class ObapInputElement extends ObapElement {
    static get properties() {
        return {
            name: {
                type: String,
                attribute: 'name',
                reflect: true
            },

            hasFocus: {
                type: Boolean,
                attribute: 'has-focus',
                reflect: true
            },
        }
    }

    constructor() {
        super();
        this.hasFocus = false;
        this.tabIndex = 0;
        this._boundHandleFocusEvent = this._handleFocusEvent.bind(this);
        this._boundHandleBlurEvent = this._handleBlurEvent.bind(this);
        this.addEventListener('focus', this._boundHandleFocusEvent);
        this.addEventListener('blur', this._boundHandleBlurEvent);
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            if (propName === 'disabled') {
                this.disabled ?  this.tabIndex = -1 :  this.tabIndex = 0;
            }
        });
    }

    _handleFocusEvent(e) {
        if (!this.disabled) {
            this.hasFocus = true;
        }
    }

    _handleBlurEvent(e) {
        this.hasFocus = false;
    }
}

export { html, css, svg, ObapInputElement } 