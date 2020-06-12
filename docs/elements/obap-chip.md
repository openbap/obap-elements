# obap-chip

A Material Design chip element.

## Properties

| Property    | Attribute    | Type      | Default | Description                                      |
|-------------|--------------|-----------|---------|--------------------------------------------------|
| `disabled`  | `disabled`   | `Boolean` | "false" | If true, the button will be disabled.            |
| `icon`      | `icon`       | `string`  | ""      | The icon to display in the button (to the left of the label). |
| `label`     | `label`      | `string`  | ""      | The text to display in button.                   |
| `removable` | `removable`  | `boolean` | false   | Whether or not the chip has a remove icon.       |
| `role`      | `role`       | `String`  | "null"  | The ARIA role of the element.                    |
| `selected`  | `selected`   | `boolean` | false   | Whether or not the chip is selected, if it's a toggle chip. |
| `showCheck` | `show-check` | `boolean` | false   | Whether or not to display a check icon, if it's a toggle chip. |
| `toggle`    | `toggle`     | `boolean` | false   | Whether or not the chip behaves as a toggle.     |

## Events

| Event              |
|--------------------|
| `obap-chip-click`  |
| `obap-chip-remove` |
