# obap-material

A Material Design container that looks like a lifted piece of paper.

## Usage

```javascript
import '@obap/obap-elements/obap-material/obap-material.js';

<obap-material elevation="2">
   <!-- Slotted Content -->
</obap-material>
```

## Properties

| Property    | Attribute   | Type      | Default | Description                                      |
|-------------|-------------|-----------|---------|--------------------------------------------------|
| `disabled`  | `disabled`  | `Boolean` | "false" | If true, the button will be disabled.            |
| `elevation` | `elevation` | `Number`  | "1"     | The Material elevation shadow. Allowed values: 0, 1, 2, 3, 4, 6, 8, 12, 16, 24. |
| `role`      | `role`      | `String`  | "null"  | The ARIA role of the element.                    |

## Slots

| Name | Description  |
|------|--------------|
| `-`  | Default slot |
