/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { obapIcons } from '../obap-icons/obap-icons.js';
import '../obap-icons/obap-core-icons.js';

/**
Displays a single svg icon.  

## Usage

```javascript
import '@obap/obap-elements/obap-icons/obap-device-icons.js';
import '@obap/obap-elements/obap-icon/obap-icon.js';

<obap-icon icon="device:bluetooth"></obap-icon>
```
 */
export class ObapIcon extends ObapElement {
    static get styles() {
        return [css`
            :host {
                --obap-icon-fill-color: currentcolor;
                --obap-icon-stroke-color: none;
                --obap-icon-width: 20px;
                --obap-icon-height: 20px;

                display: inline-flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                fill: var(--obap-icon-fill-color);
                stroke: var(--obap-icon-stroke-color);
                width: var(--obap-icon-width);
                height: var(--obap-icon-height);
            }

            svg, img {
                width: var(--obap-icon-width);
                height: var(--obap-icon-height);
            }

            :host([hidden]) {
                display: none !important;
            }

            :host([disabled]) {
                pointer-events: none;
            }
        `];
    }

    static get properties() {
        return {
            /**
            * The name of the icon to use. The name should be of the form: `iconset_name:icon_name`.
            */
            icon: {
                type: String
            },

            src: {
                type: String
            }
        };
    }

    constructor() {
        super();
        this.icon = '';
        this.src = '';
    }

    render() {
        if (this.src && this.src !== 'undefined' && this.src !== 'null') {
            return html`<img alt="${this.icon}" src="${ifDefined(this.src)}">`;
        }

        return obapIcons.get(this.icon);
    }
}

window.customElements.define('obap-icon', ObapIcon);

