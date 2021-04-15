/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapAttachedElementController } from '../obap-attached-element/obap-attached-element-controller.js';
import '../obap-icon/obap-icon.js';
import { caption } from '../obap-styles/obap-typography.js';
import { hostElevation } from '../obap-styles/obap-elevation.js';

/**
`<obap-badge>` is a circular text badge that is displayed on the top right corner (default) of an element, representing a status or a notification. It will  anchor to the element specified in the for attribute, or, if that doesn't exist the immediate previous sibling, failing that, the parent node containing it. It inherits all the `obap-attached-element` positioning propeties (anchor, inset, shift, offsetX and offsetY).

## Usage

```javascript
import '@obap/obap-elements/obap-badge/obap-badge.js';

<!-- Anchors based on id -->
<div>
    <div id="ib_1"></div>
    <obap-badge label="3" for="ib_1"></obap-badge>
</div>

<!-- Anchors to previous sibling (div) -->
<div>
    <div class="sibling"></div>
    <obap-badge label="3"></obap-badge>
</div>

<!-- Anchors to the parent -->
<div class="parent">
    <obap-badge label="3"></obap-badge>
</div>
```
 */
export class ObapBadge extends ObapAttachedElementController(ObapElement) {
    static get styles() {
        return [caption, hostElevation, css`
            :host {
                --obap-badge-color: var(--obap-on-primary-color, #FFFFFF);
                --obap-badge-border-color: var(--obap-on-primary-color, #FFFFFF);
                --obap-badge-disabled-color: var(--obap-text-disabled-color, rgba(0, 0, 0, 0.38));
                --obap-badge-background-color: var(--obap-primary-color, #5c6bc0);
                --obap-badge-icon-size: 82%;
                --obap-badge-border-width: 0px;
                --obap-badge-size: 20px;

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: absolute;
                pointer-events: none;
                font-size: 11px;
               
                overflow: hidden;
                user-select: none;
                width: calc(var(--obap-badge-size) + var(--obap-badge-border-width));
                height: calc(var(--obap-badge-size) + var(--obap-badge-border-width));
                border-radius: var(--obap-border-radius-circle, 50%);
                color: var(--obap-badge-color);
                background: var(--obap-badge-background-color);
                border: var(--obap-badge-border-width) solid var(--obap-badge-border-color);

                box-sizing: border-box;
                padding-top: 2px;
            }

            :host([anchor="none"]) {
                position: inherit;
            }

            :host([hidden]) {
                display: none !important;
            }

            :host([disabled]) {
                pointer-events: none;
                background: var(--obap-badge-disabled-color);
            }

            obap-icon {
                margin-top: -2px;
                --obap-icon-width: calc(var(--obap-badge-icon-size) + var(--obap-badge-border-width));
                --obap-icon-height: calc(var(--obap-badge-icon-size) + var(--obap-badge-border-width));
            }

            .container {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                line-height: 100%;
            }
        `];
    }

    static get properties() {
        return {
            icon: {
                type: String,
                attribute: 'icon'
            },

            label: {
                type: String,
                attribute: 'label'
            }
        }
    }

    constructor() {
        super();
        this.anchor = 'top-right';
        this.icon = '';
        this.label = '';
    }

    render() {
        if (this.icon !== '') {
            return html`<obap-icon icon="${this.icon}"></obap-icon>`;
        } else {
            return html`${this.label}`;
        }
    }
}

window.customElements.define('obap-badge', ObapBadge);