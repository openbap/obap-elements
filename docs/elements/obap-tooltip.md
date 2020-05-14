# obap-tooltip

`<obap-tooltip>` is a label that appears on hover and focus when the user hovers over an element (defaults to below the element) with the cursor or with the keyboard. It will anchor to the element specified in the for attribute, or, if that doesn't exist the immediate previous sibling, failing that, the parent node containing it. It inherits all the `obap-attached-element` positioning propeties (anchor, inset, shift, offsetX and offsetY).

## Usage

```javascript
import '@obap/obap-elements/obap-tooltip/obap-tooltip.js';

<!-- Positions based on id -->
<div>
    <div id="ib_1"></div>
    <obap-tooltip>tooltip</obap-tooltip>
</div>

<!-- Positions to previous sibling (div) -->
<div>
    <div class="sibling"></div>
    <obap-tooltip>tooltip</obap-tooltip>
</div>

<!-- Positions to the parent -->
<div class="parent">
    <obap-tooltip>tooltip</obap-tooltip>
</div>
`

**Mixins:** ObapAttachedElementMixin

## Properties

| Property        | Attribute      | Modifiers | Type      | Default         | Description                           |
|-----------------|----------------|-----------|-----------|-----------------|---------------------------------------|
| `anchor`        | `anchor`       |           | `string`  | "middle-bottom" |                                       |
| `disabled`      | `disabled`     |           | `Boolean` | "false"         | If true, the button will be disabled. |
| `for`           | `for`          |           | `string`  | ""              |                                       |
| `inset`         | `inset`        |           | `string`  | "out"           |                                       |
| `offsetX`       | `offset-x`     |           | `number`  | 0               |                                       |
| `offsetY`       | `offset-y`     |           | `number`  | 0               |                                       |
| `role`          | `role`         |           | `String`  | "null"          | The ARIA role of the element.         |
| `shift`         | `shift`        |           | `string`  | "none"          |                                       |
| `targetElement` |                | readonly  |           |                 |                                       |
| `triggerTime`   | `trigger-time` |           | `number`  | 500             |                                       |

## Methods

| Method | Type       |
|--------|------------|
| `hide` | `(): void` |
| `show` | `(): void` |

## Slots

| Name | Description  |
|------|--------------|
| `-`  | Default slot |
