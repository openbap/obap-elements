/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { subtitle } from '../obap-styles/obap-typography.js';
import { hostElevation } from '../obap-styles/obap-elevation.js';

/**
A Material Design top app bar that only supports a basic single height layout. The application title is set using the `caption` property/attribute, while actions can be anything, although a round flat button with an icon is what you'll usually use. Actions can be positioned using the left and right slots.
 
## Usage

```javascript
import '@obap/obap-elements/obap-top-app-bar/obap-top-app-bar.js';
import '@obap/obap-elements/obap-button/obap-button.js';

<obap-top-app-bar caption="Demo Application">
    <obap-button slot="left" round icon="menu"></obap-button>
    <obap-button slot="right" round icon="face"></obap-button>
    <obap-button slot="right" round icon="more-vert"></obap-button>
</obap-top-app-bar>
```
 */
export class ObapTopAppBar extends ObapElement {
    static get styles() {
        return [subtitle, hostElevation, css`
            :host {
                display: block;
                --obap-top-app-bar-color: var(--obap-on-primary-color, white);
                --obap-top-app-bar-inactive-color: var(--obap-on-primary-inactive-color, rgba(255, 255, 255, 0.7));
                --obap-top-app-bar-background-color: var(--obap-primary-color, #5c6bc0);

                color: var(--obap-top-app-bar-color);
                background: var(--obap-top-app-bar-background-color);

                height: 48px;
            }

            .container {
                height: 100%;
                margin: 0 8px 0 8px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
            }

            .caption {
                display: flex;
                flex: 1;
                margin: 0 8px;
                align-items: center;
            }

            .actions {
                display: flex;
                align-items: center;
            }

            ::slotted(obap-button) {
                --obap-button-color: var(--obap-top-app-bar-color);
                --obap-button-disabled-color: var(--obap-top-app-bar-inactive-color);
                --obap-button-split-color: var(--obap-top-app-bar-inactive-color);
                --obap-button-background-color: transparent;
                --obap-button-disabled-background-color: transparent;
                --obap-button-ripple-color: var(--obap-top-app-bar-color);
            }
        `];
    }

    static get properties() {
        return {
            /**
             * The display caption.
             */
            caption: {
                type: String,
                attribute: 'caption'
            },

            elevation: {
                type: Number,
                attribute: 'elevation',
                reflect: true
            }
        }
    }

    constructor() {
        super();
        this.caption = '';
        this.elevation = 0;
    }

    render() {
        return html` 
            <div class="container">
                <div class="actions"><slot name="left"></slot></div>
                <div class="caption typography-subtitle">${this.caption}</div>
                <div class="actions"><slot name="right"></slot></div>
            </div>
      `;
    }
}

window.customElements.define('obap-top-app-bar', ObapTopAppBar);