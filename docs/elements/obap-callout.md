# obap-callout

`<obap-callout>` is a speech bubble element that appears on hover and focus when the user hovers over an element (defaults to above the element) with the cursor or with the keyboard. It will anchor to the element specified in the for attribute, or, if that doesn't exist the immediate previous sibling, failing that, the parent node containing it. It inherits all the `obap-attached-element` positioning propeties (anchor, inset, shift, offsetX and offsetY). It also has a positional arrow direction that can be set. You can also position it as a normal element by setting `fixed` to `true`.

## Usage

```javascript
import '@obap/obap-elements/obap-callout/obap-callout.js';

<!-- Positions based on id -->
<div>
    <div id="ib_1"></div>
    <obap-callout>callout</obap-callout>
</div>

<!-- Positions to previous sibling (div) -->
<div>
    <div class="sibling"></div>
    <obap-callout>callout</obap-callout>
</div>

<!-- Positions to the parent -->
<div class="parent">
    <obap-callout>callout</obap-callout>
</div>

<!-- No anchor (regular inline element) -->
<div>
    <obap-callout fixed>callout</obap-callout>
</div>

<!-- Positioning -->
<obap-callout anchor="middle-top" arrow-position="bottom">callout</obap-callout>
<obap-callout anchor="middle-bottom" arrow-position="top">callout</obap-callout>
<obap-callout anchor="middle-left" arrow-position="right">callout</obap-callout>
<obap-callout anchor="middle-right" arrow-position="left">callout</obap-callout>
```

**Mixins:** ObapAttachedElementMixin

## Properties

| Property        | Attribute        | Modifiers | Type      | Default      | Description                           |
|-----------------|------------------|-----------|-----------|--------------|---------------------------------------|
| `anchor`        | `anchor`         |           | `string`  | "middle-top" |                                       |
| `arrowPosition` | `arrow-position` |           | `string`  | "bottom"     |                                       |
| `disabled`      | `disabled`       |           | `Boolean` | "false"      | If true, the button will be disabled. |
| `elevated`      | `elevated`       |           | `boolean` | false        |                                       |
| `fixed`         | `fixed`          |           | `boolean` | false        |                                       |
| `for`           | `for`            |           | `string`  | ""           |                                       |
| `inset`         | `inset`          |           | `string`  | "out"        |                                       |
| `offsetX`       | `offset-x`       |           | `number`  | 0            |                                       |
| `offsetY`       | `offset-y`       |           | `number`  | 0            |                                       |
| `role`          | `role`           |           | `String`  | "null"       | The ARIA role of the element.         |
| `shift`         | `shift`          |           | `string`  | "none"       |                                       |
| `targetElement` |                  | readonly  |           |              |                                       |
| `triggerTime`   | `trigger-time`   |           | `number`  | 500          |                                       |

## Methods

| Method | Type       |
|--------|------------|
| `hide` | `(): void` |
| `show` | `(): void` |

## Slots

| Name | Description  |
|------|--------------|
| `-`  | Default slot |
