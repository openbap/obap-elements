/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
/**
 A container that synchronises multiple selectors. It should contain more than one (two is typical) selectors (elements that include `ObapSelectorController` or `ObapMultiSelectorController`) whose `selectedIndex` you wish to synchronise. You can set the initial selected index on the container, which will then be set on the appropriate children. Changing the selected index on a child (say, by clicking on a tab), will be reflected by the container and any other selectable children. All light DOM children are considered for selection (not just immediate children), so they can be nested like the `obap-tabs` element, which is contained in a `obap-material` container.

 Note: You shouldn't set the selected index on a child directly; only use the container for changing the selected index.

 ## Usage

```html
import '@obap/obap-elements/obap-selector/obap-selector-container.js';
import '@obap/obap-elements/obap-tabs/obap-tabs.js';
import '@obap/obap-elements/obap-pages/obap-pages.js';
import '@obap/obap-elements/obap-material/obap-material.js';

<obap-selector-container selected-index="0">
    <obap-material>
        <obap-tabs>
            <obap-tab>Tab 1</obap-tab>
            <obap-tab>Tab 2</obap-tab>
            <obap-tab>Tab 3</obap-tab>
        </obap-tabs>
    </obap-material>
    <obap-pages>
        <div>Page 1</div>
        <div>Page 2</div>
        <div>Page 3</div>
    </obap-pages>
</obap-selector-container>
```
 */
export class ObapSelectorContainer extends ObapElement {
    static get styles() {
        return [css`
            :host {
                display: block;
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
            Gets or sets the selected element index.
            @type {Number}
            @default -1
            */
            selectedIndex: {
                type: Number,
                attribute: 'selected-index'
            }
        }
    }

    constructor() {
        super();
        this.selectedIndex = -1;
        this._items = [];
        this._selectable = true;
        this._boundHandleSlotChangeEvent = this._handleSlotChangeEvent.bind(this);
        this._boundHandleItemSelectedEvent = this._handleItemSelectedEvent.bind(this);
        this.renderRoot.addEventListener('slotchange', this._boundHandleSlotChangeEvent);
        this.addEventListener('obap-item-selected', this._boundHandleItemSelectedEvent);
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            if (propName === 'selectedIndex') {
                this._updateSelectors();
            }
        });
    }

    render() {
        return html`<slot></slot>`;
    }

    _handleItemSelectedEvent(e) {
        if (this._items.indexOf(e.target) > -1) {
            this.selectedIndex = e.detail.index;
            e.stopPropagation();
            e.preventDefault();
        }
    }

    _handleSlotChangeEvent(e) {
        this._items =  [...this.querySelectorAll('*')].filter((el) => {
            return (el.nodeType === 1) && (el._selectable);
        });  

        this._updateSelectors();
    }

    _updateSelectors() {
        this._items.forEach(item => item.selectedIndex = this.selectedIndex);
    }
}

window.customElements.define('obap-selector-container', ObapSelectorContainer);
