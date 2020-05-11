# obap-selector

`ObapSelector` is an element that allows you to manage a list of elements that can be selected. Clicking on a element selects it, and in the case of a multi select list, a second click deselects it. The `selected` property indicates which element is selected and defaults to the index. The default is single select and you can enable multi select mode with the `multi` attribute. The collection of selected items is contained in the `selectedItems` array property.

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

<obap-selector selected="0">
    <div class="item">One</div>
    <div class="item">Two</div>
    <div class="item">Three</div>
    <div class="separator" no-select></div>
    <div class="item">Four</div>
    <div class="item"Five</div>
</obap-selector>
```

**Mixins:** ObapMultiSelectableMixin, ObapSelectableMixin

## Properties

| Property        | Attribute        | Type      | Default | Description                                      |
|-----------------|------------------|-----------|---------|--------------------------------------------------|
| `disabled`      | `disabled`       | `Boolean` | "false" | If true, the button will be disabled.            |
| `items`         | `items`          | `array`   | "[]"    | (readonly) - The list of items from which a selection can be made. |
| `multi`         | `multi`          | `boolean` | false   | If true, multiple selections are allowed..       |
| `role`          | `role`           | `String`  | "null"  | The ARIA role of the element.                    |
| `selectedIndex` | `selected-index` | `Number`  | "1"     | Gets or sets the selected element index.         |
| `selectedItems` | `selected-items` | `array`   | []      | Returns an array of currently selected items.    |

## Methods

| Method    | Type                     | Description                                      |
|-----------|--------------------------|--------------------------------------------------|
| `indexOf` | `(item: Object): number` | Gets the index of an element, if it's a child of the selection list.<br /><br />**item**: The item for which to find the index. |
| `select`  | `(index: any): void`     |                                                  |

## Slots

| Name | Description  |
|------|--------------|
| `-`  | Default slot |
