# obap-button

A Material Design button that allows you to create regular, floating action and icon buttons.

## Usage

```javascript
import '@obap/obap-elements/obap-button/obap-button.js';

<!-- Regular Button -->
<obap-button label="normal"></obap-button>
<obap-button label="raised" raised></obap-button>
<obap-button label="toggle" toggle></obap-button>
<obap-button label="disabled" disabled></obap-button>

<!-- Regular Button with Icon -->
<obap-button label="raised" icon="android" raised></obap-button>

<!-- Icon Button -->
<obap-button round icon="android"></obap-button>

<!-- FAB -->
<obap-button round icon="android" raised></obap-button>

<!-- 'Pill' Button -->
<obap-button round label="normal" raised></obap-button>
<obap-button round label="normal" icon="android" raised></obap-button>
<obap-button round label="raised" raised></obap-button>
<obap-button round label="raised" icon="android" raised></obap-button>
```

## Properties

| Property   | Attribute   | Type      | Default  | Description                                      |
|------------|-------------|-----------|----------|--------------------------------------------------|
| `disabled` | `disabled`  | `Boolean` | "false"  | If true, the button will be disabled.            |
| `hasFocus` | `has-focus` | `boolean` | false    |                                                  |
| `icon`     | `icon`      | `string`  | ""       | The icon to display in the button (to the left of the label). |
| `label`    | `label`     | `string`  | ""       | The text to display in button.                   |
| `name`     | `name`      | `string`  |          |                                                  |
| `noInk`    | `no-ink`    | `boolean` | false    | Whether or not to show a ripple when clicked.    |
| `raised`   | `raised`    | `boolean` | false    | Whether or not the button is raised (has a dropshadow). |
| `role`     | `role`      | `String`  | "button" | The ARIA role of the element.                    |
| `round`    | `round`     | `boolean` | false    | Whether or not the button corners are rounded (50% of height). |
| `selected` | `selected`  | `boolean` | false    | Whether or not the button is selected, if it's a toggle button. |
| `tabIndex` |             | `number`  | 0        |                                                  |
| `toggle`   | `toggle`    | `boolean` | false    | Whether or not the button is a toggle button.    |
