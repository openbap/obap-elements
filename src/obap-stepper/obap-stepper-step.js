/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';

export class ObapStepperStep extends ObapElement {
    static get styles() {
        return css`
            :host {
                display: block;
                height: 100%;
            }

            :host([hidden]) {
                display: none !important;
            }

            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                height: 100%;
            }
        `;
    }

    static get properties() {
        return {
            name: {
                type: String,
                attribute: 'name'
            },

            label: {
                type: String,
                attribute: 'label'
            },

            subLabel: {
                type: String,
                attribute: 'sub-label'
            },

            // Optional icon used only by the side-stepper.
            icon: {
                type: String,
                attribute: 'icon'
            },

            errorLabel: {
                type: String,
                attribute: 'error-label'
            },

            selected: {
                type: Boolean,
                attribute: 'selected',
                reflect: true
            },

            selectable: {
                type: Boolean,
                attribute: 'selectable',
                reflect: true
            },

            error: {
                type: Boolean,
                attribute: 'error',
                reflect: true
            },

            editable: {
                type: Boolean,
                attribute: 'editable'
            },

            optional: {
                type: Boolean,
                attribute: 'optional'
            },

            visited: {
                type: Boolean
            }
        }
    }

    constructor() {
        super();

        this.selected = false;
        this.visited = false;
        this.editable = false;
        this.optional = false;
        this.error = false;
        this.name = '';
        this.label = '';
        this.subLabel = '';
        this.errorLabel = '';
        this.icon = '';
        this.slot = 'step'; 
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        const props = [];

        changedProperties.forEach((oldValue, propName) => {
            props.push(propName);
        });

        this.fireMessage('obap-stepper-step-state-change', {
            stepName: this.name,
            props: props
        });
    }

    render() {
        return html`
            <div class="container">
                <slot></slot>
            </div>
        `;
    }

    get selectable() {
        if ((this.visited && !this.selected && !this.editable && !this.optional && !this.error)) {
            return false;
        }

        return true;
    }
}

window.customElements.define('obap-stepper-step', ObapStepperStep);