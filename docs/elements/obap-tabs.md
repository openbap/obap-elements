# obap-tabs

**Mixins:** ObapSelectableMixin

## Properties

| Property        | Attribute        | Type      | Default   | Description                                      |
|-----------------|------------------|-----------|-----------|--------------------------------------------------|
| `disabled`      | `disabled`       | `Boolean` | "false"   | If true, the button will be disabled.            |
| `fill`          | `fill`           | `boolean` | false     |                                                  |
| `items`         | `items`          | `array`   | "[]"      | (readonly) - The list of items from which a selection can be made. |
| `role`          | `role`           | `String`  | "tablist" | The ARIA role of the element.                    |
| `selectedIndex` | `selected-index` | `Number`  | "1"       | Gets or sets the selected element index.         |
| `selectorType`  | `selector-type`  | `string`  | "single"  | The type of selection allowed. Can be 'single' (default), 'multi' and 'range'. The last two are provided by the respective mixins. |
| `toggles`       | `toggles`        | `boolean` | false     | In single select mode, setting this to true deselects the item if you select it a second time. |

## Methods

| Method    | Type                     | Description                                      |
|-----------|--------------------------|--------------------------------------------------|
| `indexOf` | `(item: Object): number` | Gets the index of an element, if it's a child of the selection list.<br /><br />**item**: The item for which to find the index. |
| `select`  | `(index: any): void`     |                                                  |
