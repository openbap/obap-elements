/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, svg, LitElement } from 'lit-element';
/**
`ObapElement` is a LitElement decendent class that's used as the base class for all the OBAP elements.
 
## Usage

You simply use `ObapElement` as your base class, rather than `LitElement` or `HTMLElement`.

```javascript
import { html, css, ObapElement } from '@obap/obap-elements/obap-element/obap-element.js';

export class MyElement extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }
        `];
    }

    constructor() {
        super();
        this.disabled = false;
        this.role = 'button';
    }
}

window.customElements.define('my-element', MyElement);
```
 @element ObapElement
 @prop {Boolean}  [disabled=false] - If true, the button will be disabled.
 @prop {String} [role=null] - The ARIA role of the element.
 */
class ObapElement extends LitElement {
    get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        const oldval = this.disabled;

        if (value !== oldval) {
            this._disabled = value;
            value ? this.setAttribute('aria-disabled', 'true') : this.setAttribute('aria-disabled', 'false');
            this.requestUpdate('disabled', oldval);
        }
    }

    static get properties() {
        return {
            disabled: {
                type: Boolean,
                attribute: 'disabled',
                reflect: true
            },

            role: {
                type: String,
                attribute: 'role',
                reflect: true
            }
        }
    }

    constructor() {
        super();
        this._disabled = false;
        this.role = null;
    }
}

//window.customElements.define('obap-element', ObapElement);

export { html, css, svg, ObapElement } 
