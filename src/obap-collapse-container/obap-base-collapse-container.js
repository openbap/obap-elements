/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';

class ObapBaseCollapseContainer extends ObapElement {
    static get properties() {
        return {
            open: {
                type: Boolean,
                attribute: 'open',
                reflect: true
            }
        }
    }

    constructor() {
        super();
        this.open = false;
    }
    
    render() {
        return html`<slot></slot>`;
    }

    toggle() {
        this.open = !this.open;
    }
}

export {html, css, ObapBaseCollapseContainer}