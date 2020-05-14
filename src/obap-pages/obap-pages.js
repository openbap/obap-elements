/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapSelectableMixin } from '../obap-selector/obap-selectable-mixin.js';

/**
A content switcher.  

## Usage

```javascript
import '@obap/obap-elements/obap-pages/obap-pages.js';

<obap-pages selected-index="0">
    <div>Page 1</div>
    <div>Page 2</div>
    <div>Page 3</div>
</obap-pages>
```

@slot - - Default slot
 */
export class ObapPages extends ObapSelectableMixin(ObapElement) {
    static get styles() {
        return css`
            :host {
                display: block;
            }

            :host > ::slotted(:not(slot):not([selected])) {
                display: none !important;
            }
        `;
    }

    render() {
        return html`<slot></slot>`;
    }
}

window.customElements.define('obap-pages', ObapPages);