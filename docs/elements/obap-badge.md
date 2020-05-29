# obap-badge

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

**Mixins:** ObapAttachedElementController

## Properties

| Property        | Attribute  | Modifiers | Type      | Default     | Description                           |
|-----------------|------------|-----------|-----------|-------------|---------------------------------------|
| `anchor`        | `anchor`   |           | `string`  | "top-right" |                                       |
| `disabled`      | `disabled` |           | `Boolean` | "false"     | If true, the button will be disabled. |
| `for`           | `for`      |           | `string`  | ""          |                                       |
| `icon`          | `icon`     |           | `string`  | ""          |                                       |
| `inset`         | `inset`    |           | `string`  | "none"      |                                       |
| `label`         | `label`    |           | `string`  | ""          |                                       |
| `offsetX`       | `offset-x` |           | `number`  | 0           |                                       |
| `offsetY`       | `offset-y` |           | `number`  | 0           |                                       |
| `role`          | `role`     |           | `String`  | "null"      | The ARIA role of the element.         |
| `shift`         | `shift`    |           | `string`  | "none"      |                                       |
| `targetElement` |            | readonly  |           |             |                                       |
