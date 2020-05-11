# obap-pages

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

**Mixins:** ObapSelectableMixin

## Properties

| Property        | Attribute        | Type      | Default              | Description                                      |
|-----------------|------------------|-----------|----------------------|--------------------------------------------------|
| `disabled`      | `disabled`       | `Boolean` | "false"              | If true, the button will be disabled.            |
| `items`         | `items`          | `array`   | "[]"                 | (readonly) - The list of items from which a selection can be made. |
| `role`          | `role`           | `String`  | "null"               | The ARIA role of the element.                    |
| `selectedClass` |                  | `string`  | "obap-page-selected" |                                                  |
| `selectedIndex` | `selected-index` | `Number`  | "1"                  | Gets or sets the selected element index.         |

## Methods

| Method    | Type                     | Description                                      |
|-----------|--------------------------|--------------------------------------------------|
| `indexOf` | `(item: Object): number` | Gets the index of an element, if it's a child of the selection list.<br /><br />**item**: The item for which to find the index. |
| `select`  | `(index: any): void`     |                                                  |

## Slots

| Name | Description  |
|------|--------------|
| `-`  | Default slot |