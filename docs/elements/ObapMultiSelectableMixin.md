# ObapMultiSelectableMixin

**Mixins:** ObapMultiSelectableMixin, ObapSelectableMixin

## Properties

| Property            | Attribute            | Type      | Default         | Description                                      |
|---------------------|----------------------|-----------|-----------------|--------------------------------------------------|
| `disableSelection`  | `disable-selection`  | `boolean` | false           | Set to true to prevent any selection.            |
| `items`             | `items`              | `array`   | "[]"            | (readonly) - The list of items from which a selection can be made. |
| `multi`             | `multi`              | `boolean` | false           | If true, multiple selections are allowed..       |
| `selected`          | `selected`           | `String`  | "1"             | Gets or sets the selected element. The default is to use the index of the item. |
| `selectedAttribute` | `selected-attribute` | `string`  | null            | The attribute to set on elements when selected.  |
| `selectedClass`     | `selected-class`     | `string`  | "obap-selected" | The class to set on elements when selected.      |
| `selectedItem`      | `selectedItem`       | `Object`  | "null"          | (readonly) - The currently selected item.        |
| `selectedItemIndex` | `selectedItemIndex`  | `number`  | "1"             | (readonly) - The index of the currently selected item. |
| `selectedItems`     | `selected-items`     | `array`   | []              | Returns an array of currently selected items.    |

## Methods

| Method           | Type                     | Description                                      |
|------------------|--------------------------|--------------------------------------------------|
| `indexOf`        | `(item: Object): number` | Gets the index of an element, if it's a child of the selection list.<br /><br />**item**: The item for which to find the index. |
| `select`         | `(value: any): void`     |                                                  |
| `selectIndex`    | `(index: any): void`     |                                                  |
| `selectNext`     | `(): void`               |                                                  |
| `selectPrevious` | `(): void`               |                                                  |

## Events

| Event                   |
|-------------------------|
| `obap-item-deselected`  |
| `obap-item-deselecting` |
| `obap-item-selected`    |
| `obap-item-selecting`   |
