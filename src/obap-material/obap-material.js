/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { hostElevation } from '../obap-styles/obap-elevation.js';

/**
A Material Design container that looks like a lifted piece of paper.

## Usage

```javascript
import '@obap/obap-elements/obap-material/obap-material.js';

<obap-material elevation="2">
    <!-- Slotted Content -->
</obap-material>
```

@prop {Number} [elevation=1] - The Material elevation shadow. Allowed values: 0, 1, 2, 3, 4, 6, 8, 12, 16, 24.

@slot - - Default slot
 */
export class ObapMaterial extends ObapElement {
    static get styles() {
        return [hostElevation, css`
            :host {
                display: block;
                border-radius: 3px;
                box-sizing: border-box;
                padding: 24px;
                background: var(--obap-surface-color, #FFFFFF);
                color: var(--obap-on-surface-color, rgba(black, 0.87));
            }
        `];
    }

    static get properties() {
        return {
            elevation: {
                type: Number,
                attribute: 'elevation',
                reflect: true
            }
        };
    }

    constructor() {
        super();
        this.elevation = 1;
    }

    render() {
        return html`<slot></slot>`;
    }
}

window.customElements.define('obap-material', ObapMaterial);