import { html, css, svg, LitElement } from 'lit-element';

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
        this.role = '';
    }
}

export { html, css, svg, ObapElement } 
