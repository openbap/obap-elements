# obap-check

A Material Design checkbox.

## Usage

```javascript
import '@obap/obap-elements/obap-check/obap-check.js';

<!-- Unselected -->
<obap-button label="unselected"></obap-button>

<!-- Selected -->
<obap-button label="selected" selected></obap-button>

<!-- Indeterminate -->
<obap-button label="indeterminate" indeterminate></obap-button>

<!-- Disabled -->
<obap-button label="disabled" disabled></obap-button>
```

## Properties

| Property        | Attribute       | Type      | Default    | Description                           |
|-----------------|-----------------|-----------|------------|---------------------------------------|
| `disabled`      | `disabled`      | `Boolean` | "false"    | If true, the button will be disabled. |
| `hasFocus`      | `has-focus`     | `boolean` | false      |                                       |
| `indeterminate` | `indeterminate` | `boolean` | false      |                                       |
| `label`         | `label`         | `string`  |            |                                       |
| `name`          | `name`          | `string`  |            |                                       |
| `noInk`         | `no-ink`        | `boolean` | false      |                                       |
| `role`          | `role`          | `String`  | "checkbox" | The ARIA role of the element.         |
| `selected`      | `selected`      | `boolean` | false      |                                       |
| `tabIndex`      |                 | `number`  | 0          |                                       |

## Events

| Event                       |
|-----------------------------|
| `obap-item-selected-change` |
