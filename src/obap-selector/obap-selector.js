/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, ObapElement } from '../obap-element/obap-element.js';
import { ObapRangeSelectorController } from './obap-range-selector-controller.js';

/**
 `ObapSelector` is an element that allows you to manage a list of elements that can be selected. Clicking on a element selects it, and in the case of a multi select list, a second click deselects it. A range select list selects a consecutive range of items between 2 clicks  The `selected` property indicates which element is selected and defaults to the index. The default is single select and you can enable multi or range select modes with the `selector-type` attribute. The collection of selected items is contained in the `selectedItems` array property for multi and range selector types.

 The selected item(s) can be styled by providing a selector for the `obap-selected` class, which is set on selected items by default. You can change the class name using the `selected-class` attribute, or you can style based on attribute by providing a selected attribute using the `selected-attribute` property.

 If you want items in the list to be unselectable, such as a divider or heading, add a `no-select` attribute to the element.

 ## Usage

```html
import '@obap/obap-elements/obap-selector/obap-selector.js';

<style>
    .obap-selected {
        background: var(--obap-selection-color);
        color: var(--obap-on-selection-color);
    }
</style>

<!-- Single Select (default) -->
<obap-selector selected-index="0" selector-type="single">
    <div class="item">One</div>
    <div class="item">Two</div>
    <div class="item">Three</div>
    <div class="separator" no-select></div>
    <div class="item">Four</div>
    <div class="item">Five</div>
</obap-selector>

<!-- Multi Select -->
<obap-selector selector-type="multi" .selectedItems="${this.someArray}">
    <div class="item">One</div>
    <div class="item">Two</div>
    <div class="item">Three</div>
    <div class="separator" no-select></div>
    <div class="item">Four</div>
    <div class="item">Five</div>
</obap-selector>

<!-- Range Select -->
<obap-selector selector-type="range" start-index="0" end-index="2">
    <div class="item">One</div>
    <div class="item">Two</div>
    <div class="item">Three</div>
    <div class="separator" no-select></div>
    <div class="item">Four</div>
    <div class="item">Five</div>
</obap-selector>
```

@slot - - Default slot
 */
class ObapSelector extends ObapRangeSelectorController(ObapElement) {
    static get styles() {
        return css`
            :host {
                display: block;
            }

            :host[hidden] {
                display: none;
            }
        `;
    }

    render() {
        return html`<slot></slot>`;
    }
}

customElements.define('obap-selector', ObapSelector);