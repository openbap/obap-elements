/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';

class ObapBaseCollapseContainer extends ObapElement {
    static get properties() {
        return {
            opened: {
                type: Boolean,
                attribute: 'opened',
                reflect: true
            }
        }
    }

    constructor() {
        super();
        this.opened = false;
    }
    
    render() {
        return html`<slot></slot>`;
    }

    toggle() {
        this.opened = !this.opened;
    }
}

export {html, css, ObapBaseCollapseContainer}