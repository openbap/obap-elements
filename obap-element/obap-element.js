import { html, css, svg, LitElement } from 'lit-element';

export class ObapElement extends LitElement {
    static get properties() {
        return {
        };
    }

    constructor() {
        super();
        console.log('obap-element')
    }
}

export { html, css, svg, ObapElement } 
